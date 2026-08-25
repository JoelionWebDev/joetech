import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { PHONE_NUMBER, CONTACT_EMAIL } from "../../../lib/site";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const ipStore = new Map<string, { count: number; resetAt: number }>();

const RATE = {
  maxRequests: 20,
  windowMs: 60_000,
};

function isRateLimited(ip: string): boolean {
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

const SYSTEM_PROMPT = `You are "Joetech AI Assistant", a professional, confident, and friendly sales and support assistant for Joetech — a full-service digital agency based in Lagos, Nigeria.

ABOUT JOETECH
Joetech is a digital agency that helps small-to-large businesses build, grow, and scale online. We offer:
- Web development (custom websites, e-commerce, landing pages — built with Next.js for speed and SEO)
- Mobile app development (iOS & Android)
- Branding & graphic design (logos, brand identity, marketing materials)
- Video production (brand videos, professional coverage, ads)
- Digital marketing (paid ads on Meta, Google, TikTok; SEO; social media management)
- Chrome extension development
- Tech skills training (teaching web dev, app dev, career growth, content creation using AI)

CONTACT INFORMATION
- Website: www.joetech.name.ng
- Email: ${CONTACT_EMAIL}
- WhatsApp/Phone: ${PHONE_NUMBER}
- YouTube: youtube.com/@joetechstudio
- Location: Lagos, Nigeria
- Hours: Mon–Fri 9am–6pm | Sat 10am–3pm | Sun Closed

YOUR JOB
1. Answer questions about Joetech's services clearly and helpfully.
2. Recommend the right service based on what the visitor describes.
3. When a visitor shows interest (asks about price, timeline, or starting), capture their name, contact info, and project type — then tell them a team member will follow up, or direct them to /contact.
4. Keep responses concise, friendly, and helpful — never pushy or salesy.
5. Use **bold** for emphasis on key terms and contact details.
6. Use short bullet lists when comparing options.
7. For pricing: say pricing varies by scope and offer a free quote consultation.
8. If asked something outside your knowledge, admit it and point them to the contact details.

ROUTING
- If someone needs a quick answer about services → answer directly.
- If someone wants to start a project → capture lead info (name, email/phone, project type) and say a team member will follow up, or link to /contact.
- If someone asks about learning tech → mention our Learn Tech page at joetech.name.ng/learn-tech.
- If someone asks about costs → explain pricing depends on scope and invite them to contact for a custom quote.`.trim();

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "messages must be a non-empty array." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const sanitised = messages
    .slice(-20)
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (sanitised.length === 0) {
    return new Response(
      JSON.stringify({ error: "No valid messages provided." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const groqStream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 600,
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitised],
      stream: true,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of groqStream) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
        } catch (err) {
          console.error("[Joetech Chat Stream]", err);
          controller.enqueue(
            encoder.encode(
              "I'm sorry, I encountered an error generating a response. Please try again in a moment.",
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[Joetech Chat API]", err);
    return new Response(
      JSON.stringify({
        error: "The AI service is temporarily unavailable. Please try again shortly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
