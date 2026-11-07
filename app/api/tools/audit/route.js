import { isRateLimited, getClientIp } from "../../../../lib/rateLimit";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BODY_CHARS = 2_000_000;
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

// Never fetch internal addresses: the tool only audits public websites.
function isPublicHost(hostname) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local")) return false;
  if (/^127\./.test(host) || host === "::1" || host === "[::1]") return false;
  if (/^10\./.test(host) || /^192\.168\./.test(host)) return false;
  const m172 = host.match(/^172\.(\d+)\./);
  if (m172 && Number(m172[1]) >= 16 && Number(m172[1]) <= 31) return false;
  return true;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'");
}

function getAttr(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"),
  );
  return match ? match[1] : null;
}

function extractMeta(html, name) {
  const tags = html.match(/<meta\s[^>]*>/gi) || [];
  for (const tag of tags) {
    const tagName = getAttr(tag, "name");
    if (tagName && tagName.toLowerCase() === name) {
      return getAttr(tag, "content") ?? "";
    }
  }
  return null;
}

// Each check is scored openly: label, what it means, points earned out of
// its maximum, and the plain-English fix. The total is always out of 100.
function runChecks({ html, finalUrl, isHttps, loadTimeMs }) {
  const checks = [];
  const add = (id, label, status, points, maxPoints, detail, fix) =>
    checks.push({ id, label, status, points, maxPoints, detail, fix });

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch
    ? decodeEntities(titleMatch[1].replace(/<[^>]*>/g, "")).trim()
    : "";
  const description = extractMeta(html, "description") ?? "";
  const hasViewport = extractMeta(html, "viewport") !== null;
  const h1Count = (html.match(/<h1(\s[^>]*)?>/gi) || []).length;
  const hasLang = /<html[^>]*\blang\s*=\s*["'][^"']+["']/i.test(html);
  const hasFavicon =
    /<link\s[^>]*rel\s*=\s*["'](?:shortcut\s+icon|icon|apple-touch-icon)["'][^>]*>/i.test(
      html,
    );

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  let imagesMissingAlt = 0;
  for (const tag of imgTags) {
    const alt = getAttr(tag, "alt");
    if (alt === null || alt.trim() === "") imagesMissingAlt += 1;
  }

  const hrefs = [];
  const hrefPattern = /<a\s[^>]*?href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = hrefPattern.exec(html)) !== null) {
    const raw = m[1].trim();
    if (
      !raw ||
      raw.startsWith("#") ||
      raw.startsWith("mailto:") ||
      raw.startsWith("tel:") ||
      raw.startsWith("javascript:")
    )
      continue;
    try {
      hrefs.push(new URL(raw, finalUrl));
    } catch {
      // Ignore hrefs that cannot be resolved.
    }
  }
  let internalLinks = 0;
  let externalLinks = 0;
  let origin = "";
  try {
    origin = new URL(finalUrl).origin;
  } catch {
    origin = "";
  }
  for (const u of hrefs) {
    if (u.protocol !== "http:" && u.protocol !== "https:") continue;
    if (u.origin === origin) internalLinks += 1;
    else externalLinks += 1;
  }

  add(
    "https",
    "Secure connection (HTTPS)",
    isHttps ? "pass" : "fail",
    isHttps ? 10 : 0,
    10,
    isHttps
      ? "Your site loads over HTTPS, so visitors' data is protected."
      : "Your site loads over plain HTTP. Browsers warn visitors about this.",
    "Move the site to HTTPS — most hosts offer a free SSL certificate.",
  );

  if (!title) {
    add(
      "title",
      "Page title",
      "fail",
      0,
      10,
      "No title tag was found. The title is what Google shows in search results.",
      "Add a clear title tag, e.g. what you do and where — under 60 characters.",
    );
  } else if (title.length < 30 || title.length > 60) {
    add(
      "title",
      "Page title",
      "warn",
      5,
      10,
      `Your title is ${title.length} characters: "${title}". Google shows about 30–60 characters.`,
      "Shorten it to under 60 characters, or expand it so it says what you do.",
    );
  } else {
    add(
      "title",
      "Page title",
      "pass",
      10,
      10,
      `Your title is ${title.length} characters: "${title}".`,
      "Your title is fine — leave it as it is.",
    );
  }

  if (!description) {
    add(
      "description",
      "Meta description",
      "fail",
      0,
      10,
      "No meta description was found. This is the short text Google can show under your title in search results.",
      "Write a 50–160 character description that says what the page offers.",
    );
  } else if (description.length < 50 || description.length > 160) {
    add(
      "description",
      "Meta description",
      "warn",
      5,
      10,
      `Your meta description is ${description.length} characters. Google shows about 50–160.`,
      "Trim it to under 160 characters, or expand it so it describes the page.",
    );
  } else {
    add(
      "description",
      "Meta description",
      "pass",
      10,
      10,
      `Your meta description is ${description.length} characters.`,
      "Your meta description is fine — leave it as it is.",
    );
  }

  if (h1Count === 0) {
    add(
      "h1",
      "Main heading (H1)",
      "fail",
      0,
      10,
      "No H1 heading was found. Every page needs one main heading that says what the page is about.",
      "Add one H1 heading with the page's main topic.",
    );
  } else if (h1Count === 1) {
    add(
      "h1",
      "Main heading (H1)",
      "pass",
      10,
      10,
      "Your page has exactly one H1 heading.",
      "Your main heading is fine — leave it as it is.",
    );
  } else {
    add(
      "h1",
      "Main heading (H1)",
      "warn",
      5,
      10,
      `Your page has ${h1Count} H1 headings. A page should have one main heading.`,
      "Keep one H1 and change the others to H2 headings.",
    );
  }

  add(
    "viewport",
    "Mobile-friendly (viewport tag)",
    hasViewport ? "pass" : "fail",
    hasViewport ? 10 : 0,
    10,
    hasViewport
      ? "Your page has a viewport tag, so it can scale properly on phones."
      : "No viewport tag was found — the page may not display properly on phones.",
    "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to the page head.",
  );

  if (imgTags.length === 0) {
    add(
      "alt",
      "Image descriptions (alt text)",
      "pass",
      10,
      10,
      "No images were found on this page, so there is nothing to describe.",
      "Nothing to fix here.",
    );
  } else if (imagesMissingAlt === 0) {
    add(
      "alt",
      "Image descriptions (alt text)",
      "pass",
      10,
      10,
      `All ${imgTags.length} image${imgTags.length === 1 ? "" : "s"} have alt text.`,
      "Your image descriptions are fine — leave them as they are.",
    );
  } else if (imagesMissingAlt < imgTags.length) {
    add(
      "alt",
      "Image descriptions (alt text)",
      "warn",
      5,
      10,
      `${imagesMissingAlt} of ${imgTags.length} images are missing alt text.`,
      "Add a short description to every image's alt text.",
    );
  } else {
    add(
      "alt",
      "Image descriptions (alt text)",
      "fail",
      0,
      10,
      `None of your ${imgTags.length} images have alt text.`,
      "Add a short description to every image's alt text — it helps Google and blind visitors.",
    );
  }

  if (loadTimeMs < 2000) {
    add(
      "speed",
      "Page speed",
      "pass",
      10,
      10,
      `The page loaded in ${(loadTimeMs / 1000).toFixed(1)} seconds.`,
      "Your page speed is fine — leave it as it is.",
    );
  } else if (loadTimeMs < 4000) {
    add(
      "speed",
      "Page speed",
      "warn",
      5,
      10,
      `The page took ${(loadTimeMs / 1000).toFixed(1)} seconds to load. Visitors start leaving after about 3 seconds.`,
      "Compress images and remove anything the page does not need.",
    );
  } else {
    add(
      "speed",
      "Page speed",
      "fail",
      0,
      10,
      `The page took ${(loadTimeMs / 1000).toFixed(1)} seconds to load — most visitors will leave before it finishes.`,
      "Compress images, cut heavy scripts, and ask your host about faster hosting.",
    );
  }

  add(
    "favicon",
    "Favicon (browser tab icon)",
    hasFavicon ? "pass" : "fail",
    hasFavicon ? 5 : 0,
    5,
    hasFavicon
      ? "Your site has a favicon — the small icon in the browser tab."
      : "No favicon was found. The browser tab shows a blank icon.",
    "Add a favicon file and link it in the page head.",
  );

  add(
    "lang",
    "Language tag",
    hasLang ? "pass" : "fail",
    hasLang ? 5 : 0,
    5,
    hasLang
      ? "Your page declares its language, which helps search engines and screen readers."
      : "No language is declared on the page.",
    "Add lang=\"en\" (or your language) to the <html> tag.",
  );

  add(
    "links",
    "Internal links",
    internalLinks > 0 ? "pass" : "warn",
    internalLinks > 0 ? 5 : 0,
    5,
    internalLinks > 0
      ? `Your page links to ${internalLinks} other page${internalLinks === 1 ? "" : "s"} on your own site.`
      : "No links to other pages on your own site were found.",
    "Link to your other pages — your services, contact and blog pages.",
  );

  const score = checks.reduce((sum, c) => sum + c.points, 0);
  const grade =
    score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs work" : "Poor";

  return {
    score,
    grade,
    checks,
    facts: {
      title,
      titleLength: title.length,
      descriptionLength: description.length,
      h1Count,
      imageCount: imgTags.length,
      imagesMissingAlt,
      internalLinks,
      externalLinks,
    },
  };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (
      isRateLimited(`tools-audit:${ip}`, { maxRequests: 5, windowMs: 60_000 })
    ) {
      return json(
        {
          error:
            "Too many requests in a short time — please wait a minute and try again.",
        },
        429,
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request body." }, 400);
    }

    const target = normaliseUrl(body?.url);
    if (!target) {
      return json(
        {
          error:
            "Enter a valid website address, e.g. example.com or https://example.com.",
        },
        400,
      );
    }
    if (!isPublicHost(target.hostname)) {
      return json(
        {
          error:
            "Enter a public website address. Private and local addresses cannot be audited.",
        },
        400,
      );
    }

    const startedAt = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let res;
    try {
      res = await fetch(target.toString(), {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
        },
        signal: controller.signal,
        redirect: "follow",
      });
    } catch (err) {
      clearTimeout(timer);
      if (err?.name === "AbortError") {
        return json(
          { error: "The site took too long to respond (10 second limit)." },
          502,
        );
      }
      return json(
        {
          error:
            "Could not reach that website. Check the address and try again.",
        },
        502,
      );
    } finally {
      clearTimeout(timer);
    }

    const loadTimeMs = Date.now() - startedAt;
    if (!res.ok) {
      return json(
        { error: `The site returned status ${res.status}.` },
        502,
      );
    }
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return json(
        { error: "That address does not return a web page (HTML)." },
        502,
      );
    }

    const fullHtml = await res.text();
    const sizeKb = Math.round(
      Buffer.byteLength(fullHtml, "utf8") / 1024,
    );
    const html = fullHtml.slice(0, MAX_BODY_CHARS);
    const finalUrl = res.url;
    const isHttps = finalUrl.startsWith("https://");

    const { score, grade, checks, facts } = runChecks({
      html,
      finalUrl,
      isHttps,
      loadTimeMs,
    });

    return json({
      url: finalUrl,
      status: res.status,
      loadTimeMs,
      sizeKb,
      score,
      grade,
      checks,
      facts,
    });
  } catch (err) {
    console.error("[Audit API]", err);
    return json(
      {
        error:
          "Something went wrong while auditing the site. Please try again.",
      },
      500,
    );
  }
}
