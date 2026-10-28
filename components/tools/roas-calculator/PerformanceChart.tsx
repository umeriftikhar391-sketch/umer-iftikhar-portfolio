import { formatCurrency } from "@/lib/calculators/format";

type Bar = { label: string; value: number | null; color: string };

/**
 * Diverging horizontal bar chart (no chart library). All bars share one money scale and one currency,
 * so they are directly comparable; negative values extend left of the zero line. Bars with no value are
 * listed as "not calculated" instead of being drawn as zero.
 */
export default function PerformanceChart({ bars, currency, title, description }: { bars: Bar[]; currency: string; title: string; description: string }) {
  const values = bars.map((b) => b.value).filter((v): v is number => v !== null && Number.isFinite(v));
  if (!values.length) return null;
  const max = Math.max(0, ...values);
  const min = Math.min(0, ...values);
  const span = max - min || 1;
  const zero = ((0 - min) / span) * 100;

  return (
    <figure className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <figcaption>
        <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-body">{description}</p>
      </figcaption>
      <div aria-hidden className="mt-6 space-y-4">
        {bars.map((b) => {
          const has = b.value !== null && Number.isFinite(b.value);
          const v = has ? (b.value as number) : 0;
          const width = (Math.abs(v) / span) * 100;
          const left = v >= 0 ? zero : zero - width;
          return (
            <div key={b.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-ink">{b.label}</span>
                <span className={`font-semibold tabular-nums ${v < 0 ? "text-brand-hover" : "text-ink"}`}>{has ? formatCurrency(v, currency) : "Not calculated"}</span>
              </div>
              <div className="relative mt-1.5 h-3 rounded-full bg-slate-100">
                {min < 0 && <span className="absolute inset-y-[-3px] w-px bg-slate-400" style={{ left: `${zero}%` }} />}
                {has && <span className={`absolute inset-y-0 rounded-full ${b.color}`} style={{ left: `${left}%`, width: `${Math.max(width, v === 0 ? 0 : 0.8)}%` }} />}
              </div>
            </div>
          );
        })}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {bars.map((b) => (
            <tr key={b.label}>
              <th scope="row">{b.label}</th>
              <td>{b.value !== null ? formatCurrency(b.value, currency) : "Not calculated"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
