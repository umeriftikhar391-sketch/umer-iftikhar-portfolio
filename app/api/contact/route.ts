import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateLead, type LeadInput } from "@/lib/lead";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function createTransport() {
  const auth = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD };
  if (process.env.SMTP_HOST) {
    const port = Number(process.env.SMTP_PORT || 465);
    return nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth });
  }
  return nodemailer.createTransport({ service: "gmail", auth });
}

function leadEmail(lead: LeadInput) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company || "—"],
    ["Service", lead.service],
    ["Submitted from", lead.source],
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="margin:0 0 16px">New lead from umeriftikhar.online</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#666;width:140px"><b>${k}</b></td><td style="border-bottom:1px solid #eee">${escapeHtml(v)}</td></tr>`)
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Project details</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(lead.message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject details:\n${lead.message}`;
  return { html, text };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam traps: a hidden honeypot field humans never fill, and a minimum time on the form.
  // Bots get a fake success so they don't learn to adapt.
  const elapsed = Date.now() - Number(body.startedAt);
  if (body.website || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ success: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please try again later or message me on WhatsApp." },
      { status: 429 }
    );
  }

  const { lead, errors } = validateLead(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ success: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Contact form: EMAIL_USER / EMAIL_PASSWORD are not configured.");
    return NextResponse.json({ success: false, error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const { html, text } = leadEmail(lead);
    await createTransport().sendMail({
      from: `"Portfolio Leads" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || "umer.iftikhar391@gmail.com",
      replyTo: lead.email,
      subject: `New lead: ${lead.service} | ${lead.name}`,
      html,
      text,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return NextResponse.json({ success: false, error: "Could not send your message. Please try WhatsApp or email instead." }, { status: 500 });
  }
}
