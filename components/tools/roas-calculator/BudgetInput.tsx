"use client";

import { BUDGET_CHIPS, CURRENCIES } from "@/lib/benchmarks/industries";
import { formatCurrency } from "@/lib/calculators/format";
import type { ValueSource } from "@/lib/calculators/state";
import { Field, describedBy, inputClass } from "./ui";

export default function BudgetInput({
  value,
  currency,
  error,
  source,
  onChange,
  onCurrency,
  onBlur,
}: {
  value: string;
  currency: string;
  error?: string;
  source?: ValueSource;
  onChange: (value: string) => void;
  onCurrency: (currency: string) => void;
  onBlur: () => void;
}) {
  return (
    <Field
      id="calc-budget"
      label="What is your monthly advertising budget?"
      error={error}
      hint="Amounts stay in the currency you choose. Nothing is converted."
      source={value ? source ?? "custom" : null}
      required
    >
      <div className="flex gap-2">
        <label htmlFor="calc-currency" className="sr-only">
          Currency
        </label>
        <select
          id="calc-currency"
          value={currency}
          onChange={(e) => onCurrency(e.target.value)}
          className={`${inputClass} select-chevron w-28! shrink-0 appearance-none font-semibold`}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          {...describedBy("calc-budget", error, "hint")}
          type="text"
          inputMode="decimal"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="e.g. 2,500"
          autoComplete="off"
          className={`${inputClass} min-w-0 flex-1`}
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Quick budget options">
        {BUDGET_CHIPS.map((amount) => {
          const active = value.replace(/,/g, "") === String(amount);
          return (
            <button
              key={amount}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(String(amount))}
              className={`min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                active ? "border-brand bg-rose text-brand-hover" : "border-line bg-white text-body hover:border-brand/40 hover:bg-blush"
              }`}
            >
              {formatCurrency(amount, currency)}
            </button>
          );
        })}
      </div>
    </Field>
  );
}
