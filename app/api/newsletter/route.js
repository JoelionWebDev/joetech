import { Resend } from "resend";

const ADMIN_EMAIL = "joetechorg@gmail.com";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sanitized = email.trim().toLowerCase();

    console.log("[Newsletter] New subscriber:", sanitized);

    // Send notification to admin
    if (resend) {
      await resend.emails.send({
        from: "Joetech <noreply@mail.joetech.name.ng>",
        to: [ADMIN_EMAIL],
        subject: "New Newsletter Subscriber",
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${sanitized}</p>
          <p style="margin-top:16px;color:#6b7280;font-size:13px">Signed up via joetech.name.ng</p>
        `,
      });
    }

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
