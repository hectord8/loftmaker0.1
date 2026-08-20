import { Resend } from "resend";

import { site } from "@/data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const projectType = body.projectType?.trim();
    const location = body.location?.trim();
    const message = body.message?.trim();

    // Hidden fields help reduce simple automated submissions.
    if (body.company?.trim()) {
      return Response.json({ success: true });
    }

    if (!name || !email || !phone || !projectType || !location || !message) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return Response.json(
        { error: "The enquiry service is temporarily unavailable. Please call us instead." },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || "Loft Maker London <onboarding@resend.dev>";
    const recipient = process.env.CONTACT_EMAIL || site.email;

    const { error } = await resend.emails.send({
      from,
      to: recipient,
      replyTo: email,
      subject: `New ${projectType} enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project type: ${projectType}`,
        `Location: ${location}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "We could not send your enquiry. Please call or email us instead." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Something went wrong. Please call or email us instead." },
      { status: 500 },
    );
  }
}
