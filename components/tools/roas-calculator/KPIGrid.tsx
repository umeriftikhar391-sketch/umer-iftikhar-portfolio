import { InfoTip } from "./ui";

export type Kpi = {
  label: string;
  value: string;
  caption?: string;
  tone?: "default" | "positive" | "negative" | "accent";
  tip?: { term: string; text: string };
};

const TONE: Record<NonNullable<Kpi["tone"]>, string> = {
  default: "text-ink",
  accent: "text-brand-hover",
  positive: "text-green-700",
  negative: "text-brand-hover",
};

export default function KPIGrid({ items, label }: { items: Kpi[]; label: string }) {
  return (
    <dl aria-label={label} className="grid grid-cols-2 gap-3 xl:grid-cols-3">
      {items.map((k) => (
        <div key={k.label} className="relative min-w-0 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
          <dt className="flex items-center text-xs font-semibold text-slate-500 sm:text-sm">
            <span>{k.label}</span>
            {k.tip && <InfoTip term={k.tip.term}>{k.tip.text}</InfoTip>}
          </dt>
          <dd className={`mt-2 break-words text-xl font-bold tracking-tight sm:text-2xl ${TONE[k.tone ?? "default"]}`}>{k.value}</dd>
          {k.caption && <dd className="mt-1 text-xs leading-5 text-slate-500">{k.caption}</dd>}
        </div>
      ))}
    </dl>
  );
}
