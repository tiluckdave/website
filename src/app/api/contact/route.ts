import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiting (resets on cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // Get IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    project?: string;
    budget?: string;
    timeline?: string;
    referral?: string;
    honeypot?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot check — bots fill this field, humans don't see it
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Validate required fields
  if (!body.name?.trim() || !body.email?.trim() || !body.project?.trim() || !body.budget) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const budgetLabels: Record<string, string> = {
    "under-1000": "Under $1,000",
    "1000-5000": "$1,000 – $5,000",
    "5000-15000": "$5,000 – $15,000",
    "15000-plus": "$15,000+",
    "not-sure": "Not sure yet",
  };

  const timelineLabels: Record<string, string> = {
    asap: "ASAP",
    "1-2-months": "1–2 months",
    "3-plus-months": "3+ months",
    exploring: "No rush, just exploring",
  };

  const emailBody = `
New project inquiry from tiluckdave.in

Name: ${body.name}
Email: ${body.email}
Budget: ${budgetLabels[body.budget] ?? body.budget}
Timeline: ${body.timeline ? (timelineLabels[body.timeline] ?? body.timeline) : "Not specified"}
How they found you: ${body.referral || "Not specified"}

Project description:
${body.project}
`.trim();

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "tiluckdave.in <noreply@tiluckdave.in>",
      to: "hi@tiluckdave.in",
      replyTo: body.email,
      subject: `Project inquiry from ${body.name}`,
      text: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please email me directly at hi@tiluckdave.in" },
      { status: 500 }
    );
  }
}
