"use client";

import { SlidersHorizontal } from "lucide-react";
import type { Objective } from "@/lib/calculators/types";
import type { ValueSource } from "@/lib/calculators/state";
import type { FieldErrors, ForecastFields } from "@/lib/calculators/validations";
import { Field, describedBy, inputClass } from "./ui";

export const TIPS = {
  cpc: { term: "CPC", text: "Cost per click: what you pay, on average, each time someone clicks your ad. Budget ÷ CPC = estimated clicks." },
  cvr: { term: "conversion rate (CVR)", text: "The percentage of clicks that become a lead, purchase or customer, depending on your goal. Clicks × CVR = conversions." },
  aov: { term: "average order value (AOV)", text: "The average revenue from one purchase. Purchases × AOV = estimated revenue." },
  value: { term: "average customer value", text: "The revenue one new customer brings in over the period you want to measure (first order, or lifetime value if you track it consistently)." },
  close: { term: "close rate", text: "The percentage of leads your team turns into paying customers. Leads × close rate = customers." },
  margin: { term: "gross margin", text: "The share of revenue left after the direct cost of delivering what you sold (product cost, fulfilment), before ads, overhead and tax." },
  cpa: { term: "CPA", text: "Cost per acquisition: ad spend divided by the number of acquired customers or purchases. It is not cost per lead, which divides spend by leads." },
  roas: { term: "ROAS", text: "Return on ad spend: revenue divided by ad spend. 3x means ads brought in three times what they cost. It measures revenue, not profit." },
} as const;

type FieldDef = { key: keyof ForecastFields; label: string; suffix?: string; prefix?: boolean; tip: { term: string; text: string }; placeholder: string; hint?: string };

function fieldsFor(objective: Objective): FieldDef[] {
  const defs: FieldDef[] = [
    { key: "cpc", label: "Average cost per click (CPC)", prefix: true, tip: TIPS.cpc, placeholder: "e.g. 1.50" },
    {
      key: "conversionRate",
      label: objective === "leads" ? "Click-to-lead conversion rate" : objective === "purchases" ? "Click-to-purchase conversion rate" : objective === "customers" ? "Click-to-customer conversion rate" : "Conversion rate (optional)",
      suffix: "%",
      tip: TIPS.cvr,
      placeholder: "e.g. 3",
    },
  ];
  if (objective === "purchases") defs.push({ key: "averageOrderValue", label: "Average order value (AOV)", prefix: true, tip: TIPS.aov, placeholder: "e.g. 60" });
  if (objective === "leads") defs.push({ key: "closeRate", label: "Lead-to-customer close rate", suffix: "%", tip: TIPS.close, placeholder: "e.g. 20" });
  if (objective !== "purchases")
    defs.push({
      key: "customerValue",
      label: objective === "traffic" ? "Value per conversion (optional)" : "Average customer value",
      prefix: true,
      tip: TIPS.value,
      placeholder: "e.g. 300",
    });
  defs.push({ key: "grossMargin", label: "Gross profit margin", suffix: "%", tip: TIPS.margin, placeholder: "e.g. 40", hint: "Needed for profit and break-even ROAS." });
  return defs;
}

export default function AdvancedSettings({
  objective,
  currency,
  fields,
  errors,
  valueSource,
  open,
  onToggle,
  onChange,
}: {
  objective: Objective;
  currency: string;
  fields: ForecastFields;
  errors: FieldErrors<ForecastFields>;
  valueSource: Partial<Record<keyof ForecastFields, ValueSource>>;
  open: boolean;
  onToggle: (open: boolean) => void;
  onChange: (key: keyof ForecastFields, value: string) => void;
}) {
  return (
    <details open={open} onToggle={(e) => onToggle((e.currentTarget as HTMLDetailsElement).open)} className="group rounded-2xl border border-line bg-white shadow-card open:border-brand/25">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-4 text-left font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose">
          <SlidersHorizontal aria-hidden className="h-4 w-4 text-brand-hover" />
        </span>
        <span className="flex-1">Advanced Settings — Adjust Your Assumptions</span>
        <span aria-hidden className="text-xl leading-none text-brand-hover transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="grid gap-5 border-t border-line px-5 pb-6 pt-5 sm:grid-cols-2">
        {fieldsFor(objective).map((f) => {
          const id = `calc-${f.key}`;
          const value = fields[f.key];
          return (
            <Field key={f.key} id={id} label={f.label} error={errors[f.key]} hint={f.hint} tip={f.tip} source={value ? valueSource[f.key] ?? "custom" : null}>
              <div className="relative">
                {f.prefix && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{currency}</span>}
                <input
                  {...describedBy(id, errors[f.key], f.hint)}
                  type="text"
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  autoComplete="off"
                  className={`${inputClass} ${f.prefix ? "pl-16" : ""} ${f.suffix ? "pr-10" : ""}`}
                />
                {f.suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{f.suffix}</span>}
              </div>
            </Field>
          );
        })}
      </div>
    </details>
  );
}
