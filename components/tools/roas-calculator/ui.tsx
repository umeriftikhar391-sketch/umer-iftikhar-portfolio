"use client";

import { useId, useState } from "react";
import { Info } from "lucide-react";
import type { ValueSource } from "@/lib/calculators/state";

export const inputClass =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink shadow-[inset_0_1px_2px_rgb(15_23_42/0.04)] outline-none transition-colors placeholder:text-slate-500 hover:border-slate-300 focus:border-brand focus:ring-4 focus:ring-brand/25 focus-visible:outline-none aria-[invalid=true]:border-brand-hover aria-[invalid=true]:bg-blush";

export const cardClass = "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6";

/** Small toggletip: the button reveals an inline explanation (keyboard and screen-reader friendly). */
export function InfoTip({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="inline-flex align-middle">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`What is ${term}?`}
        onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-rose hover:text-brand-hover"
      >
        <Info aria-hidden className="h-4 w-4" />
      </button>
      <span
        id={id}
        role="note"
        hidden={!open}
        className="absolute left-0 right-0 z-20 mt-8 rounded-xl bg-ink px-4 py-3 text-sm font-normal leading-6 text-white shadow-lift"
      >
        {children}
      </span>
    </span>
  );
}

const SOURCE_LABEL: Record<ValueSource | "custom", { text: string; className: string }> = {
  benchmark: { text: "Industry Benchmark", className: "bg-green-50 text-green-800 ring-green-600/20" },
  example: { text: "Illustrative Scenario", className: "bg-amber-50 text-amber-800 ring-amber-600/25" },
  custom: { text: "Your Custom Input", className: "bg-blush text-body ring-line" },
};

export function SourceBadge({ source }: { source: ValueSource | "custom" }) {
  const s = SOURCE_LABEL[source];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ring-1 ring-inset ${s.className}`}>{s.text}</span>;
}

export function Field({
  id,
  label,
  hint,
  error,
  tip,
  source,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  tip?: { term: string; text: React.ReactNode };
  source?: ValueSource | "custom" | null;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
          {required && <span aria-hidden className="text-brand-hover"> *</span>}
          {tip && <InfoTip term={tip.term}>{tip.text}</InfoTip>}
        </label>
        {source && <SourceBadge source={source} />}
      </div>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-brand-hover">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria wiring shared by inputs rendered inside <Field>. */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

/** Accessible radio group rendered as selectable cards. */
export function OptionCards<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  columns = 3,
}: {
  legend: string;
  name: string;
  value: T;
  options: readonly { id: T; title: string; description?: string }[];
  onChange: (value: T) => void;
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2" }[columns];
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className={`grid gap-2 ${cols}`}>
        {options.map((o) => {
          const checked = o.id === value;
          return (
            <label
              key={o.id}
              className={`relative flex min-h-12 cursor-pointer flex-col justify-center rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-hover ${
                checked ? "border-brand bg-blush ring-1 ring-brand" : "border-line bg-white hover:border-slate-300 hover:bg-blush/50"
              }`}
            >
              <input type="radio" name={name} value={o.id} checked={checked} onChange={() => onChange(o.id)} className="sr-only" />
              <span className={`text-[0.9375rem] font-semibold ${checked ? "text-brand-hover" : "text-ink"}`}>{o.title}</span>
              {o.description && <span className="mt-0.5 text-xs leading-5 text-body">{o.description}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
