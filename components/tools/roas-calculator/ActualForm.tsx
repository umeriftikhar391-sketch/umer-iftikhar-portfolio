"use client";

import type { ActualFields, FieldErrors } from "@/lib/calculators/validations";
import { TIPS } from "./AdvancedSettings";
import { Field, describedBy, inputClass } from "./ui";

type Def = { key: keyof ActualFields; label: string; money?: boolean; suffix?: string; required?: boolean; hint?: string; tip?: { term: string; text: string }; placeholder: string };

const REQUIRED: Def[] = [
  { key: "spend", label: "Total ad spend", money: true, required: true, placeholder: "e.g. 3,000", hint: "Spend for the period you are analysing." },
  { key: "revenue", label: "Revenue attributed to these ads", money: true, required: true, placeholder: "e.g. 9,500", hint: "Use the same attribution source you trust (store, CRM or ad platform)." },
];
const PROFIT: Def[] = [
  { key: "acquisitions", label: "Purchases or new customers", placeholder: "e.g. 85", hint: "Needed for CPA." },
  { key: "grossMargin", label: "Gross profit margin", suffix: "%", tip: TIPS.margin, placeholder: "e.g. 40", hint: "Needed for profit and break-even ROAS." },
];
const OPTIONAL: Def[] = [
  { key: "clicks", label: "Clicks", placeholder: "e.g. 2,400" },
  { key: "leads", label: "Leads", placeholder: "e.g. 120" },
  { key: "impressions", label: "Impressions", placeholder: "e.g. 150,000" },
];

export default function ActualForm({
  fields,
  errors,
  currency,
  touched,
  onChange,
  onBlur,
}: {
  fields: ActualFields;
  errors: FieldErrors<ActualFields>;
  currency: string;
  touched: Set<string>;
  onChange: (key: keyof ActualFields, value: string) => void;
  onBlur: (key: keyof ActualFields) => void;
}) {
  const render = (d: Def) => {
    const id = `calc-actual-${d.key}`;
    // Required-field errors appear after the visitor has interacted with the field; format errors appear immediately.
    const error = errors[d.key] && (fields[d.key] || touched.has(d.key)) ? errors[d.key] : undefined;
    return (
      <Field key={d.key} id={id} label={d.label} error={error} hint={d.hint} tip={d.tip} required={d.required} source={fields[d.key] ? "custom" : null}>
        <div className="relative">
          {d.money && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{currency}</span>}
          <input
            {...describedBy(id, error, d.hint)}
            type="text"
            inputMode="decimal"
            required={d.required}
            value={fields[d.key]}
            onChange={(e) => onChange(d.key, e.target.value)}
            onBlur={() => onBlur(d.key)}
            placeholder={d.placeholder}
            autoComplete="off"
            className={`${inputClass} ${d.money ? "pl-16" : ""} ${d.suffix ? "pr-10" : ""}`}
          />
          {d.suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{d.suffix}</span>}
        </div>
      </Field>
    );
  };
  return (
    <div className="space-y-6">
      <fieldset className="space-y-5">
        <legend className="mb-1 text-base font-bold text-ink">Your campaign results</legend>
        <div className="grid gap-5 sm:grid-cols-2">{REQUIRED.map(render)}</div>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-1 text-base font-bold text-ink">For CPA and profit</legend>
        <div className="grid gap-5 sm:grid-cols-2">{PROFIT.map(render)}</div>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-1 text-base font-bold text-ink">
          Optional campaign statistics
        </legend>
        <div className="grid gap-5 sm:grid-cols-3">{OPTIONAL.map(render)}</div>
      </fieldset>
    </div>
  );
}
