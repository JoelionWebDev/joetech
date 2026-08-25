import { Resend } from "resend";
import { CONTACT_EMAIL } from "../../../lib/site";
import { isRateLimited, getClientIp, isValidEmail, escapeHtml } from "../../../lib/rateLimit";

const ADMIN_EMAIL = CONTACT_EMAIL;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  const ip = getClientIp(request);

  if (isRateLimited(`contact:${ip}`, { maxRequests: 5, windowMs: 60_000 })) {
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

    const { name, email, phone, message, service } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Full name is required (min 2 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (
      (phone && typeof phone !== "string") ||
      (service && typeof service !== "string")
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid field types submitted." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Message is required (min 10 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sanitized = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase(),
      phone: phone ? escapeHtml(phone.trim()).slice(0, 50) : "Not provided",
      service: service ? escapeHtml(service.trim()).slice(0, 100) : "Not specified",
      message: message.trim().slice(0, 5000),
    };

    console.log("[Contact] New inquiry:", {
      ...sanitized,
      message: `${sanitized.message.length} chars`,
    });

    if (!resend) {
      console.error("[Contact API] RESEND_API_KEY is not configured — inquiry logged but no email sent.");
      return new Response(
        JSON.stringify({
          error:
            "Our email service is temporarily unavailable. Please reach us directly on WhatsApp or email.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    await resend.emails.send({
      from: "Joetech <info@joetech.name.ng>",
      to: [ADMIN_EMAIL],
      replyTo: sanitized.email,
      subject: `New Contact Inquiry from ${sanitized.name}`,
      html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Name</td><td style="padding:8px">${escapeHtml(sanitized.name)}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Email</td><td style="padding:8px">${escapeHtml(sanitized.email)}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Phone</td><td style="padding:8px">${sanitized.phone}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Service</td><td style="padding:8px">${sanitized.service}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Message</td><td style="padding:8px">${escapeHtml(sanitized.message)}</td></tr>
          </table>
          <p style="margin-top:16px;color:#6b7280;font-size:13px">Sent via joetech.name.ng contact form</p>
        `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully. We'll get back to you within 24 hours." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[Contact API]", err);
    return new Response(
      JSON.stringify({ error: "Internal server error. Please try again or contact us directly." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
