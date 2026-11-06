import { isRateLimited, getClientIp } from "../../../../lib/rateLimit";

const PAGE_TIMEOUT_MS = 10_000;
const LINK_TIMEOUT_MS = 8_000;
const MAX_LINKS = 60;
const CONCURRENCY = 10;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 JoetechLinkChecker/1.0";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function fetchWithTimeout(url, options, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function normaliseUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

async function checkLink(url) {
  try {
    const head = await fetchWithTimeout(
      url,
      {
        method: "HEAD",
        headers: { "User-Agent": USER_AGENT },
        redirect: "follow",
      },
      LINK_TIMEOUT_MS,
    );
    if (head.status === 405 || head.status === 501) {
      const get = await fetchWithTimeout(
        url,
        {
          method: "GET",
          headers: { "User-Agent": USER_AGENT },
          redirect: "follow",
        },
        LINK_TIMEOUT_MS,
      );
      return get.status;
    }
    return head.status;
  } catch {
    try {
      const get = await fetchWithTimeout(
        url,
        {
          method: "GET",
          headers: { "User-Agent": USER_AGENT },
          redirect: "follow",
        },
        LINK_TIMEOUT_MS,
      );
      return get.status;
    } catch {
      return 0;
    }
  }
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`tools-broken-links:${ip}`, { maxRequests: 5, windowMs: 60_000 })) {
      return json(
        { error: "Too many checks in a short time — please wait a minute and try again." },
        429,
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request body." }, 400);
    }

    const pageUrl = normaliseUrl(
      typeof body?.url === "string" ? body.url : "",
    );
    if (!pageUrl) {
      return json(
        {
          error:
            "Enter a valid website address, e.g. example.com or https://example.com/page.",
        },
        400,
      );
    }

    let pageRes;
    try {
      pageRes = await fetchWithTimeout(
        pageUrl,
        {
          headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
          redirect: "follow",
        },
        PAGE_TIMEOUT_MS,
      );
    } catch {
      return json(
        { error: "Could not reach that page. Check the address and try again." },
        502,
      );
    }

    if (!pageRes.ok) {
      return json(
        {
          error: `That page returned status ${pageRes.status}, so its links could not be checked.`,
        },
        502,
      );
    }

    const contentType = pageRes.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return json(
        {
          error:
            "That address is not a web page (no HTML found), so there are no links to check.",
        },
        502,
      );
    }

    let html = "";
    try {
      html = await pageRes.text();
    } catch {
      return json(
        { error: "The page could not be read. Please try again." },
        502,
      );
    }

    const hrefs = new Set();
    // Anchor links only — <link> tags (stylesheets, fonts) and <script>
    // sources are resources, not links a visitor can click.
    const regex = /<a\s[^>]*?href\s*=\s*["']([^"']+)["']/gi;
    let match;
    while ((match = regex.exec(html)) !== null && hrefs.size < MAX_LINKS) {
      const raw = match[1].trim();
      if (
        !raw ||
        raw.startsWith("#") ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:") ||
        raw.startsWith("javascript:")
      ) {
        continue;
      }
      try {
        const resolved = new URL(raw, pageUrl);
        if (
          resolved.protocol !== "http:" &&
          resolved.protocol !== "https:"
        ) {
          continue;
        }
        resolved.hash = "";
        hrefs.add(resolved.toString());
      } catch {
        // Skip hrefs that cannot be resolved to a URL.
      }
    }

    const links = [...hrefs];
    const results = [];
    for (let i = 0; i < links.length; i += CONCURRENCY) {
      const batch = links.slice(i, i + CONCURRENCY);
      const statuses = await Promise.all(
        batch.map((link) => checkLink(link)),
      );
      batch.forEach((link, idx) =>
        results.push({ url: link, status: statuses[idx] }),
      );
    }

    const broken = results.filter((r) => r.status === 0 || r.status >= 400);
    return json({
      pageUrl,
      total: results.length,
      ok: results.length - broken.length,
      broken,
      brokenCount: broken.length,
    });
  } catch (err) {
    console.error("[BrokenLinks API]", err);
    return json(
      { error: "Something went wrong while checking. Please try again." },
      500,
    );
  }
}
