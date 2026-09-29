import { serviceOptions } from "@/lib/services";

export const leadServiceOptions = [...serviceOptions, "Not sure yet"];

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  source: string;
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{7,25}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Validates and normalises a lead. Returns field errors keyed by field name. */
export function validateLead(raw: Record<string, unknown>) {
  const lead: LeadInput = {
    name: clean(raw.name, 100).replace(/[\r\n]+/g, " "),
    email: clean(raw.email, 200),
    phone: clean(raw.phone, 25),
    company: clean(raw.company, 120),
    service: clean(raw.service, 60),
    message: clean(raw.message, 5000),
    source: clean(raw.source, 60) || "unknown",
  };
  const errors: Partial<Record<keyof LeadInput, string>> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(lead.phone)) errors.phone = "Please enter a valid phone number.";
  if (!leadServiceOptions.includes(lead.service)) errors.service = "Please choose a service.";
  if (lead.message.length < 10) errors.message = "Please share a few details about your project (10+ characters).";
  return { lead, errors };
}
