const store = new Map();
let lastSweep = Date.now();

/**
 * Simple fixed-window in-memory rate limiter.
 * Note: on serverless platforms this is per-instance; use Upstash/Redis
 * if strict global limits are needed.
 */
export function isRateLimited(key, { maxRequests = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();

  if (now - lastSweep > windowMs) {
    lastSweep = now;
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) return true;

  entry.count++;
  return false;
}

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
