import Link from "next/link";
import { ArrowUpRight, Calculator } from "lucide-react";
import Reveal from "@/components/Reveal";

const points = ["Forecast clicks, leads, revenue and ROAS", "Find your break-even ROAS", "Free, no email needed"];

/** Short homepage CTA for the free ROAS calculator. */
export default function RoasToolCta() {
  return (
    <section aria-labelledby="roas-tool-cta-heading" className="px-5 py-12 sm:px-6 lg:py-16">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative flex gap-5">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
              <Calculator aria-hidden className="h-7 w-7 text-coral" />
            </span>
            <div>
              <p className="eyebrow bg-transparent text-coral ring-1 ring-coral/40">Free Tool</p>
              <h2 id="roas-tool-cta-heading" className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                What could your ad budget return?
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-300">
                Plan your Meta Ads or Google Ads budget in a minute, or check the real ROAS of a campaign you&apos;re already running.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="/tools/roas-calculator"
            data-cta="home_roas_calculator"
            className="relative mt-8 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3 font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover lg:mt-0"
          >
            Try the ROAS Calculator <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
