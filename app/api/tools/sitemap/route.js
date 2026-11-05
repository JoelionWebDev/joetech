import { isRateLimited, getClientIp } from "../../../../lib/rateLimit";

const MAX_PAGES = 50;
const MAX_DEPTH = 2;
const FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function normaliseUrl(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return null;
    parsed.hash = "";
    return parsed;
  } catch {
    return null;
  }
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) {
      return { ok: false, error: `The site returned status ${res.status}.` };
    }
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return {
        ok: false,
        error: "That address does not return a web page (HTML).",
      };
    }
    const html = await res.text();
    return { ok: true, html, finalUrl: res.url };
  } catch (err) {
    if (err?.name === "AbortError") {
      return {
        ok: false,
        error: "The site took too long to respond (10 second limit).",
      };
    }
    return {
      ok: false,
      error: "Could not reach that website. Check the address and try again.",
    };
  } finally {
    clearTimeout(timer);
  }
}

function extractLinks(html, pageUrl, origin) {
  const links = [];
  const hrefPattern = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
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
      if (resolved.protocol !== "http:" && resolved.protocol !== "https:")
        continue;
      if (resolved.origin !== origin) continue;
      resolved.hash = "";
      links.push(resolved.toString());
    } catch {
      // Ignore hrefs that cannot be resolved.
    }
  }
  return links;
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`tools-sitemap:${ip}`, { maxRequests: 5, windowMs: 60_000 })) {
      return json(
        { error: "Too many requests in a short time — please wait a minute and try again." },
        429,
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request body." }, 400);
    }

    const base = normaliseUrl(body?.url);
    if (!base) {
      return json(
        {
          error:
            "Enter a valid website address, e.g. example.com or https://example.com.",
        },
        400,
      );
    }

    const origin = base.origin;
    const baseUrl = base.toString();
    const found = new Set([baseUrl]);
    const visited = new Set();
    const queue = [{ url: baseUrl, depth: 0 }];
    let crawled = 0;

    while (queue.length > 0 && crawled < MAX_PAGES) {
      const { url, depth } = queue.shift();
      if (visited.has(url)) continue;
      visited.add(url);

      let result;
      try {
        result = await fetchHtml(url);
      } catch {
        continue;
      }
      if (!result.ok) {
        // One bad page never stops the crawl — but if the very first
        // page fails, there is nothing to build a sitemap from.
        if (crawled === 0 && visited.size === 1) {
          return json({ error: result.error }, 502);
        }
        continue;
      }
      crawled += 1;

      if (depth < MAX_DEPTH) {
        const links = extractLinks(
          result.html,
          result.finalUrl || url,
          origin,
        );
        for (const link of links) {
          if (found.size >= MAX_PAGES) break;
          if (!found.has(link)) {
            found.add(link);
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }
    }

    const pages = [...found].sort();
    return json({ pages, count: pages.length, crawled, baseUrl });
  } catch (err) {
    console.error("[Sitemap API]", err);
    return json(
      {
        error:
          "Something went wrong while generating the sitemap. Please try again.",
      },
      500,
    );
  }
}
