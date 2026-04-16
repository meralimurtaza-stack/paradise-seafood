import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, business, message, _hp } = body;

    // Honeypot check — if filled, silently reject
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
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

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Paradise Seafood <noreply@paradiseseafood.co.uk>",
      to: "inquiries@paradiseseafood.co.uk",
      replyTo: email.trim(),
      subject: `New enquiry from ${name.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
          <h2 style="font-size: 22px; margin-bottom: 24px; color: #0C1117;">New Website Enquiry</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #666; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px;">${name.trim()}</td>
            </tr>
            ${business?.trim() ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Business</td><td style="padding: 8px 12px;">${business.trim()}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email.trim()}" style="color: #B89B5E;">${email.trim()}</a></td>
            </tr>
            ${phone?.trim() ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #666; vertical-align: top;">Phone</td><td style="padding: 8px 12px;"><a href="tel:${phone.trim()}" style="color: #B89B5E;">${phone.trim()}</a></td></tr>` : ""}
          </table>

          <div style="background: #f7f5f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="font-weight: 600; color: #666; margin: 0 0 8px;">Message</p>
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message.trim()}</p>
          </div>

          <p style="font-size: 12px; color: #999;">Sent from paradiseseafood.co.uk contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
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
