"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

/**
 * Lead CTA shown after results. Reuses the site's existing LeadForm and /api/contact flow (validation,
 * honeypot, timing check and rate limit already live there). Nothing is sent until the visitor submits.
 */
export default function AuditCTA({ service, summary }: { service: string; summary: string }) {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <section aria-labelledby="calc-cta-heading" className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
      <div className="relative">
        <h2 id="calc-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Want Better Results From Your Ad Budget?
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-slate-300">Get a personalized advertising strategy based on your business, budget, and goals.</p>
        {message === null ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-cta="roas_calculator_audit"
              onClick={() => setMessage(summary)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Get a Free Ads Audit
            </button>
            <Link
              href="/contact"
              data-cta="roas_calculator_contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Umer <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 text-ink">
            <p className="mb-4 flex items-start gap-2 text-sm leading-6 text-slate-300">
              <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              Your calculator selections are pre-filled below so you don&apos;t have to repeat them. Edit anything you like. Nothing is sent until you press the button.
            </p>
            <LeadForm source="roas-calculator" defaultService={service} defaultMessage={message} />
          </div>
        )}
      </div>
    </section>
  );
}
