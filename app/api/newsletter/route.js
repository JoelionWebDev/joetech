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

    // Log to console for now — connect to Google Sheets, Mailchimp, or Resend later
    console.log("[Newsletter] New subscriber:", sanitized);

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
