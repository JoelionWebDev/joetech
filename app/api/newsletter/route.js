import { Resend } from "resend";
import { CONTACT_EMAIL } from "../../../lib/site";
import { isRateLimited, getClientIp, isValidEmail, escapeHtml } from "../../../lib/rateLimit";

const ADMIN_EMAIL = CONTACT_EMAIL;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  const ip = getClientIp(request);

  if (isRateLimited(`newsletter:${ip}`, { maxRequests: 3, windowMs: 60_000 })) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { email } = body ?? {};

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sanitized = escapeHtml(email.trim().toLowerCase());

    console.log("[Newsletter] New subscriber:", sanitized);

    if (!resend) {
      console.error("[Newsletter API] RESEND_API_KEY is not configured — subscription logged but no email sent.");
      return new Response(
        JSON.stringify({ error: "Our email service is temporarily unavailable. Please try again later." }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    await resend.emails.send({
      from: "Joetech <info@joetech.name.ng>",
      to: [ADMIN_EMAIL],
      subject: "New Newsletter Subscriber",
      html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${sanitized}</p>
          <p style="margin-top:16px;color:#6b7280;font-size:13px">Signed up via joetech.name.ng</p>
        `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[Newsletter API]", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
