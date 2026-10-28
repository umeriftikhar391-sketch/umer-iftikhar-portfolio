import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatPercent, formatRoas, formatRoasDelta } from "@/lib/calculators/format";

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export default function BreakEvenAnalysis({
  grossMargin,
  breakEvenRoas,
  roas,
  gap,
  roasLabel = "Projected ROAS",
}: {
  grossMargin: number | null;
  breakEvenRoas: number | null;
  roas: number | null;
  gap: number | null;
  roasLabel?: string;
}) {
  const scaleMax = Math.max(breakEvenRoas ?? 0, roas ?? 0) * 1.25 || 1;
  const pos = (v: number | null) => (v === null ? 0 : Math.min((v / scaleMax) * 100, 100));
  const atBreakEven = gap !== null && Math.abs(gap) < 0.005;
  const below = gap !== null && !atBreakEven && gap < 0;
  return (
    <section aria-labelledby="calc-breakeven-heading" className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h3 id="calc-breakeven-heading" className="text-lg font-bold tracking-tight text-ink">
        What&apos;s Your Break-Even ROAS?
      </h3>
      <p className="mt-1 text-sm leading-6 text-body">
        Break-even ROAS is the return you need just to cover the cost of what you sold plus the ad spend. It equals 1 ÷ your gross
        margin. At a 40% margin you need 2.5x: every 1 spent on ads must bring back 2.5 in revenue before the campaign adds any profit.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Gross margin", formatPercent(grossMargin)],
          ["Break-even ROAS", formatRoas(breakEvenRoas)],
          [roasLabel, formatRoas(roas)],
          ["Difference", formatRoasDelta(gap)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-blush p-3">
            <dt className="text-xs font-semibold text-body">{label}</dt>
            <dd className={`mt-1 text-lg font-bold tabular-nums ${label === "Difference" && below ? "text-brand-hover" : "text-ink"}`}>{value}</dd>
          </div>
        ))}
      </dl>

      {breakEvenRoas !== null && roas !== null && (
        <div aria-hidden className="mt-6">
          <div className="relative h-3 rounded-full bg-slate-100">
            <span className={`absolute inset-y-0 left-0 rounded-full ${below ? "bg-brand/70" : "bg-green-600/80"}`} style={{ width: `${pos(roas)}%` }} />
            <span className="absolute -top-1.5 h-6 w-0.5 rounded bg-ink" style={{ left: `${pos(breakEvenRoas)}%` }} />
          </div>
          <div className="relative mt-2 h-4 text-[0.6875rem] font-semibold text-slate-500">
            <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${Math.min(Math.max(pos(breakEvenRoas), 12), 88)}%` }}>
              Break-even {formatRoas(breakEvenRoas)}
            </span>
          </div>
        </div>
      )}

      {gap !== null && (
        <div className={`mt-5 flex gap-3 rounded-xl p-4 text-sm leading-6 ${below || atBreakEven ? "bg-blush text-ink" : "bg-green-50 text-ink"}`}>
          {below ? <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-hover" /> : <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />}
          <p>
            {atBreakEven
              ? `At these assumptions, your ${lowerFirst(roasLabel)} is exactly at break-even: gross profit would just cover ad spend, leaving nothing for overhead or other costs.`
              : below
              ? `At these assumptions, your ${lowerFirst(roasLabel)} is ${formatRoas(Math.abs(gap))} below break-even, so the ads would not cover their own cost from the gross profit they generate. Look at improving conversion rate, customer value or CPC before increasing budget. Repeat purchases or lifetime value that you have not included could change this picture.`
              : `At these assumptions, your ${lowerFirst(roasLabel)} is ${formatRoas(gap)} above break-even, leaving an estimated contribution margin after ad spend. This is not a guarantee of profit: overhead, salaries, taxes, agency fees, refunds and other costs outside gross margin are not included, and real results vary.`}
          </p>
        </div>
      )}
      {breakEvenRoas === null && <p className="mt-4 text-sm text-slate-500">Add your gross profit margin in the assumptions to see your break-even ROAS.</p>}
    </section>
  );
}
