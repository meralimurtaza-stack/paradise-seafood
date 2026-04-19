import { NextResponse } from "next/server";
import { Resend } from "resend";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // Lazy init — do NOT read env or construct Resend at module scope, so the
  // build does not crash if the key is missing.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured yet" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, business, message } = body;

    // Required field validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone?.trim() ? escapeHtml(phone.trim()) : "";
    const safeBusiness = business?.trim() ? escapeHtml(business.trim()) : "";
    const safeMessage = escapeHtml(message.trim());

    const { error } = await resend.emails.send({
      from: "Paradise Seafood Website <onboarding@resend.dev>",
      to: "meralimurtaza@gmail.com",
      replyTo: email.trim(),
      subject: `New website enquiry from ${name.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
          <h2 style="font-size: 22px; margin-bottom: 24px; color: #0C1117;">New Website Enquiry</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #666; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px;">${safeName}</td>
            </tr>
            ${safeBusiness ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Business</td><td style="padding: 8px 12px;">${safeBusiness}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px;">${safeEmail}</td>
            </tr>
            ${safePhone ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Phone</td><td style="padding: 8px 12px;">${safePhone}</td></tr>` : ""}
          </table>

          <div style="background: #f7f5f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="font-weight: 600; color: #666; margin: 0 0 8px;">Message</p>
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${safeMessage}</p>
          </div>

          <p style="font-size: 12px; color: #999;">Sent from paradiseseafood.co.uk contact form. Reply to this email to respond directly to the sender.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again.", debug: error },
        { status: 500 }
      );
    }

    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        event: "contact_form",
        name: name.trim(),
        email: email.trim(),
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
