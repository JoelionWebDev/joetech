import { Resend } from "resend";
import { CONTACT_EMAIL } from "../../../lib/site";

const ADMIN_EMAIL = CONTACT_EMAIL;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    const { name, email, phone, message, service } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Full name is required (min 2 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required." }),
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
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "Not provided",
      service: service ? service.trim() : "Not specified",
      message: message.trim(),
    };

    console.log("[Contact] New inquiry:", sanitized);

    // Send email notification to admin
    if (resend) {
      await resend.emails.send({
        from: "Joetech <noreply@mail.joetech.name.ng>",
        to: [ADMIN_EMAIL],
        subject: `New Contact Inquiry from ${sanitized.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Name</td><td style="padding:8px">${sanitized.name}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Email</td><td style="padding:8px">${sanitized.email}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Phone</td><td style="padding:8px">${sanitized.phone}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Service</td><td style="padding:8px">${sanitized.service}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Message</td><td style="padding:8px">${sanitized.message}</td></tr>
          </table>
          <p style="margin-top:16px;color:#6b7280;font-size:13px">Sent via joetech.name.ng contact form</p>
        `,
      });
    }

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
