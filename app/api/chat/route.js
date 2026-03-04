/**
 * /app/api/chat/route.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js App Router API route for the Joetech AI chat assistant.
 * Using Groq API (FREE - no billing required)
 *
 * Environment variables required:
 *   GROQ_API_KEY   — your Groq API key (get free at console.groq.com)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

/* ── Groq client (initialised once per cold-start) ───────────────────────── */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* ── Server-side IP rate limiter ─────────────────────────────────────────── */
// Simple in-memory store — for production at scale, swap for Redis/Upstash.
const ipStore = new Map(); // ip → { count, resetAt }

const RATE = {
  maxRequests: 20, // requests allowed per window
  windowMs: 60_000, // 1-minute rolling window
};

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + RATE.windowMs });
    return false;
  }

  if (entry.count >= RATE.maxRequests) return true;

  entry.count++;
  return false;
}

/* ── Joetech system prompt ───────────────────────────────────────────────── */
const SYSTEM_PROMPT = `
You are "Joetech AI Assistant", a professional, confident, and friendly sales assistant for Joetech — a full-service digital agency based in Nigeria.

════════════════════════════════════
CONTACT INFORMATION (answer directly when asked)
════════════════════════════════════
Website:    www.joetech.org.ng
Email:      joetechorg@gmail.com
WhatsApp:   +234 816 709 9131
Phone:      +234 816 709 9131
YouTube:    youtube.com/@joetechstudio
Location:   Lagos, Nigeria
Hours:      Mon–Fri 9am–6pm | Sat 10am–3pm | Sun Closed

NOTE: Replace every value above with your real details before going live.

════════════════════════════════════
SERVICES OFFERED
════════════════════════════════════
- Website development (custom sites, e-commerce, landing pages)
- Mobile app development (iOS & Android)
- Brand videos & professional video coverage
- Graphic design (logos, brand identity, marketing materials)
- Paid ads management (Meta Ads, Google Ads, TikTok Ads)
- Full digital strategy services
- Tech & digital skills training (helping people learn tech)

════════════════════════════════════
HOW TO ANSWER CONTACT QUESTIONS
════════════════════════════════════
- "phone number" / "call you"       → give the Phone number
- "WhatsApp" / "message you"        → give the WhatsApp number
- "email" / "email address"         → give the Email
- "YouTube" / "your channel"        → give the YouTube link
- "location" / "office" / "address" → give the Location
- "working hours" / "when open"     → give the Hours
Always give the ACTUAL detail — never just say "visit our website".

════════════════════════════════════
YOUR GOALS
════════════════════════════════════
1. Answer questions about Joetech services clearly and confidently.
2. Always give real contact details when asked — never dodge the question.
3. Guide every conversation toward booking a consultation or requesting a quote.
4. Be concise — use short bullet points when listing multiple things.
5. Sound professional but warm and approachable.
6. For pricing: do NOT give exact prices. Say pricing varies by scope and invite a free quote.
7. If a question is truly outside your knowledge, say so and point them to the contact details.

════════════════════════════════════
FORMATTING RULES
════════════════════════════════════
- Use **bold** for contact details, service names, and key terms.
- Use short bullet lists when comparing or listing options.
- Keep responses concise — 2 to 4 short paragraphs max.
- Never make up facts about the company.
`.trim();

/* ── POST /api/chat ──────────────────────────────────────────────────────── */
export async function POST(request) {
  /* 1. Rate limiting */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  /* 2. Parse and validate body */
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages must be a non-empty array." },
      { status: 400 },
    );
  }

  // Sanitise: only allow role/content pairs, cap history at 20 turns
  const sanitised = messages
    .slice(-20)
    .filter(
      (m) =>
        ["user", "assistant"].includes(m.role) && typeof m.content === "string",
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) })); // cap per-message length

  if (sanitised.length === 0) {
    return NextResponse.json(
      { error: "No valid messages provided." },
      { status: 400 },
    );
  }

  /* 3. Call Groq API */
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Fast, free, and great for chat
      max_tokens: 500,
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitised],
    });

    const content = completion.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Empty response from AI model.");
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (err) {
    console.error("[Joetech Chat API - Groq]", err);

    return NextResponse.json(
      {
        error:
          "The AI service is temporarily unavailable. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
