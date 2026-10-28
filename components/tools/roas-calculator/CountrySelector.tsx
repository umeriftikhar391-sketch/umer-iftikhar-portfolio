"use client";

import { useMemo } from "react";
import { ISO_COUNTRY_CODES, OTHER_COUNTRY_CODE, PRIMARY_MARKETS } from "@/lib/benchmarks/industries";
import { Field, describedBy, inputClass } from "./ui";

/** All ISO countries with English names, for the "Other Country" search. */
export function useCountryNames() {
  return useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      names = null;
    }
    return ISO_COUNTRY_CODES.map((code) => ({ code, name: names?.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);
}

/** Resolves a typed country name to its ISO code (case-insensitive), or null if it is not a known country. */
export function resolveCountryCode(name: string, countries: { code: string; name: string }[]): string | null {
  const needle = name.trim().toLowerCase();
  if (!needle) return null;
  return countries.find((c) => c.name.toLowerCase() === needle || c.code.toLowerCase() === needle)?.code ?? null;
}

export default function CountrySelector({
  country,
  customCountry,
  customError,
  onCountry,
  onCustom,
  onBlurCustom,
}: {
  country: string;
  customCountry: string;
  customError?: string;
  onCountry: (code: string) => void;
  onCustom: (value: string) => void;
  onBlurCustom: () => void;
}) {
  const countries = useCountryNames();
  return (
    <div className="space-y-4">
      <Field id="calc-country" label="Which country are you targeting?" required>
        <select {...describedBy("calc-country")} value={country} onChange={(e) => onCountry(e.target.value)} className={`${inputClass} select-chevron appearance-none`}>
          {PRIMARY_MARKETS.map((m) => (
            <option key={m.code} value={m.code}>
              {m.name}
            </option>
          ))}
        </select>
      </Field>
      {country === OTHER_COUNTRY_CODE && (
        <Field id="calc-custom-country" label="Search for your country" error={customError} hint="Start typing and pick a country from the list." required>
          <input
            {...describedBy("calc-custom-country", customError, "hint")}
            type="text"
            list="calc-country-list"
            required
            maxLength={60}
            value={customCountry}
            onChange={(e) => onCustom(e.target.value)}
            onBlur={onBlurCustom}
            placeholder="e.g. Germany"
            autoComplete="off"
            className={inputClass}
          />
          <datalist id="calc-country-list">
            {countries.map((c) => (
              <option key={c.code} value={c.name} />
            ))}
          </datalist>
        </Field>
      )}
    </div>
  );
}
