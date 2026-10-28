import { ExternalLink, Info } from "lucide-react";
import type { BenchmarkMatch, ComparisonRow } from "@/lib/benchmarks/benchmark-matcher";
import { formatCurrency, formatPercent, PLACEHOLDER } from "@/lib/calculators/format";

const PLATFORM_NAME = { meta: "Meta Ads", "google-search": "Google Search Ads", "google-display": "Google Display Ads" } as const;

/** Neutral difference wording: "18% higher" / "12% lower". No better/worse judgement without objective context. */
function difference(yours: number | null, benchmark: number) {
  if (yours === null || !Number.isFinite(yours) || benchmark <= 0) return PLACEHOLDER;
  const pct = ((yours - benchmark) / benchmark) * 100;
  if (Math.abs(pct) < 0.5) return "About the same";
  return `${Math.abs(pct).toFixed(0)}% ${pct > 0 ? "higher" : "lower"}`;
}

export function BenchmarkSource({ match }: { match: Extract<BenchmarkMatch, { status: "matched" }> }) {
  const r = match.record;
  return (
    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      <div><dt className="inline font-semibold text-ink">Source: </dt><dd className="inline text-body">{r.sourceName} ({r.sourceCategory})</dd></div>
      <div><dt className="inline font-semibold text-ink">Benchmark year: </dt><dd className="inline text-body">{r.year}</dd></div>
      <div><dt className="inline font-semibold text-ink">Coverage: </dt><dd className="inline text-body">{match.coverageLabel}{match.level !== "country" ? " (broader than your country)" : ""}</dd></div>
      <div><dt className="inline font-semibold text-ink">Platform: </dt><dd className="inline text-body">{PLATFORM_NAME[r.platform]}</dd></div>
      <div><dt className="inline font-semibold text-ink">Last verified: </dt><dd className="inline text-body">{r.verifiedAt}</dd></div>
      <div><dt className="inline font-semibold text-ink">Statistic: </dt><dd className="inline text-body">{r.statistic === "median" ? "Median" : "Average"}</dd></div>
      <div className="sm:col-span-2">
        <dt className="sr-only">Link</dt>
        <dd>
          <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-brand-hover underline decoration-brand/40 underline-offset-4 hover:text-ink">
            View the original research <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
        </dd>
      </div>
      {r.limitations && <p className="text-slate-500 sm:col-span-2">Limitations: {r.limitations}</p>}
    </dl>
  );
}

export default function BenchmarkComparison({ match, rows, currency }: { match: BenchmarkMatch; rows: ComparisonRow[]; currency: string }) {
  return (
    <section aria-labelledby="calc-benchmark-heading" className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h3 id="calc-benchmark-heading" className="text-lg font-bold tracking-tight text-ink">
        How Your Forecast Compares With Industry Benchmarks
      </h3>
      {match.status === "none" ? (
        <div className="mt-4 flex gap-3 rounded-xl bg-blush p-4 text-sm leading-6 text-body">
          <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-hover" />
          <p>
            {match.reason} Your forecast is based on <strong className="text-ink">your own assumptions</strong>, so it shows what your
            numbers imply rather than how they compare with a market average.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">Your assumptions compared with the published industry benchmark</caption>
              <thead>
                <tr className="border-b border-line text-slate-500">
                  <th scope="col" className="py-2 pr-4 font-semibold">Metric</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Your Assumptions</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Published Industry Benchmark</th>
                  <th scope="col" className="py-2 font-semibold">Difference</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  // Your values are always in your currency; the benchmark keeps its published currency.
                  const yours = row.unit === "percent" ? formatPercent(row.yours) : formatCurrency(row.yours, currency);
                  return (
                    <tr key={row.key} className="border-b border-line align-top last:border-0">
                      <th scope="row" className="py-3 pr-4 font-semibold text-ink">{row.label}</th>
                      <td className="py-3 pr-4 tabular-nums text-ink">{yours}</td>
                      <td className="py-3 pr-4 tabular-nums text-ink">{row.unit === "percent" ? formatPercent(row.benchmark) : formatCurrency(row.benchmark, match.record.currency)}</td>
                      <td className="py-3 text-body">{row.comparable && row.yours !== null ? difference(row.yours, row.benchmark) : row.note ?? PLACEHOLDER}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Higher or lower is not automatically better: a higher CPC can still be profitable if conversion rate and customer value are higher.
          </p>
          <div className="mt-5 border-t border-line pt-4">
            <BenchmarkSource match={match} />
          </div>
        </>
      )}
    </section>
  );
}
