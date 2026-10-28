/**
 * Input parsing and validation for the calculator. Pure functions, no runtime imports.
 * Raw form values are strings; parsing never throws and never produces NaN.
 */
import type { Objective } from "./types";

export const LIMITS = {
  budget: { min: 0, max: 100_000_000, label: "Budget" },
  money: { min: 0, max: 100_000_000, label: "Amount" },
  cpc: { min: 0, max: 100_000, label: "CPC" },
  percent: { min: 0, max: 100, label: "Percentage" },
  count: { min: 0, max: 1_000_000_000, label: "Count" },
} as const;

export const CUSTOM_TEXT_MAX = 60;

/** Parses a user-typed number ("1,250.50", " 3 ") into a finite number, or null when empty/invalid. */
export function parseNumber(raw: string | number | null | undefined): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw !== "string") return null;
  const cleaned = raw.trim().replace(/,/g, "");
  if (!cleaned || !/^-?\d*\.?\d+$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

type Rule = { min: number; max: number; label: string };

/**
 * Validates one numeric field. Returns an error message or null.
 * `required` fields must be present; all values must be finite, above `min` (strictly, unless allowZero) and at most `max`.
 */
export function validateNumber(raw: string, rule: Rule, opts: { required?: boolean; allowZero?: boolean; integer?: boolean } = {}): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return opts.required ? `${rule.label} is required.` : null;
  const value = parseNumber(trimmed);
  if (value === null) return `${rule.label} must be a number.`;
  if (value < 0) return `${rule.label} cannot be negative.`;
  if (value === 0 && !opts.allowZero) return `${rule.label} must be greater than zero.`;
  if (value > rule.max) return `${rule.label} must be ${rule.max.toLocaleString("en-US")} or less.`;
  if (opts.integer && !Number.isInteger(value)) return `${rule.label} must be a whole number.`;
  return null;
}

/** Trims a free-text "Other" value; returns the cleaned value or an error. */
export function validateCustomText(raw: string, label: string): { value: string; error: string | null } {
  const value = raw.replace(/\s+/g, " ").trim();
  if (!value) return { value, error: `${label} is required.` };
  if (value.length > CUSTOM_TEXT_MAX) return { value, error: `${label} must be ${CUSTOM_TEXT_MAX} characters or fewer.` };
  if (/[<>{}]/.test(value)) return { value, error: `${label} contains characters that aren't allowed.` };
  return { value, error: null };
}

export type ForecastFields = {
  budget: string;
  cpc: string;
  conversionRate: string;
  averageOrderValue: string;
  customerValue: string;
  closeRate: string;
  grossMargin: string;
};

export type ActualFields = {
  spend: string;
  revenue: string;
  acquisitions: string;
  grossMargin: string;
  clicks: string;
  leads: string;
  impressions: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const pct = (label: string): Rule => ({ ...LIMITS.percent, label });
const money = (label: string): Rule => ({ ...LIMITS.money, label });

/** Field-level validation for the forecast form. Assumption fields are optional (they gate outputs, not the form). */
export function validateForecast(fields: ForecastFields, objective: Objective): FieldErrors<ForecastFields> {
  const errors: FieldErrors<ForecastFields> = {};
  const set = (key: keyof ForecastFields, error: string | null) => {
    if (error) errors[key] = error;
  };
  set("budget", validateNumber(fields.budget, { ...LIMITS.budget, label: "Monthly budget" }, { required: true }));
  set("cpc", validateNumber(fields.cpc, { ...LIMITS.cpc, label: "Average CPC" }));
  set("conversionRate", validateNumber(fields.conversionRate, pct("Conversion rate")));
  set("grossMargin", validateNumber(fields.grossMargin, pct("Gross margin")));
  if (objective === "purchases") set("averageOrderValue", validateNumber(fields.averageOrderValue, money("Average order value")));
  if (objective !== "purchases") set("customerValue", validateNumber(fields.customerValue, money(objective === "traffic" ? "Value per conversion" : "Average customer value")));
  if (objective === "leads") set("closeRate", validateNumber(fields.closeRate, pct("Close rate")));
  return errors;
}

/** Field-level validation for actual campaign results. Spend and revenue are required. */
export function validateActual(fields: ActualFields): FieldErrors<ActualFields> {
  const errors: FieldErrors<ActualFields> = {};
  const set = (key: keyof ActualFields, error: string | null) => {
    if (error) errors[key] = error;
  };
  set("spend", validateNumber(fields.spend, money("Ad spend"), { required: true }));
  set("revenue", validateNumber(fields.revenue, money("Attributed revenue"), { required: true, allowZero: true }));
  set("acquisitions", validateNumber(fields.acquisitions, { ...LIMITS.count, label: "Purchases or customers" }, { allowZero: true, integer: true }));
  set("grossMargin", validateNumber(fields.grossMargin, pct("Gross margin")));
  set("clicks", validateNumber(fields.clicks, { ...LIMITS.count, label: "Clicks" }, { allowZero: true, integer: true }));
  set("leads", validateNumber(fields.leads, { ...LIMITS.count, label: "Leads" }, { allowZero: true, integer: true }));
  set("impressions", validateNumber(fields.impressions, { ...LIMITS.count, label: "Impressions" }, { allowZero: true, integer: true }));
  return errors;
}

/** Parses a field only when it passed validation; invalid values never reach the engine. */
export function validValue<T>(fields: T, errors: FieldErrors<T>, key: keyof T): number | null {
  return errors[key] ? null : parseNumber(fields[key] as unknown as string);
}
