/**
 * Shareable calculator URLs. Only non-sensitive forecast assumptions are encoded;
 * historical results from "actual" mode (real spend and revenue) are never put in a URL.
 * Decoding validates every value against the allowed options, so a crafted link cannot inject anything.
 */
import type { CalculatorMode, Objective, Platform } from "./types";
import type { ForecastFields } from "./validations";

export type ShareState = {
  mode: CalculatorMode;
  industryId: string;
  customIndustry: string;
  platform: Platform;
  country: string;
  customCountry: string;
  currency: string;
  objective: Objective;
  forecast: ForecastFields;
};

export type ShareOptions = {
  industryIds: readonly string[];
  platforms: readonly string[];
  countryCodes: readonly string[];
  currencies: readonly string[];
  objectives: readonly string[];
};

const FORECAST_KEYS: Record<keyof ForecastFields, string> = {
  budget: "budget",
  cpc: "cpc",
  conversionRate: "cvr",
  averageOrderValue: "aov",
  customerValue: "value",
  closeRate: "close",
  grossMargin: "margin",
};

const NUMBER_RE = /^\d{1,12}(\.\d{1,4})?$/;
const TEXT_MAX = 60;
const cleanText = (v: string | null) => (v ?? "").replace(/[<>{}]/g, "").replace(/\s+/g, " ").trim().slice(0, TEXT_MAX);

export function encodeShareState(state: ShareState): string {
  const params = new URLSearchParams();
  params.set("mode", state.mode);
  params.set("industry", state.industryId);
  if (state.industryId === "other" && state.customIndustry.trim()) params.set("customIndustry", cleanText(state.customIndustry));
  params.set("platform", state.platform);
  params.set("country", state.country);
  if (state.country === "OTHER" && state.customCountry.trim()) params.set("customCountry", cleanText(state.customCountry));
  params.set("currency", state.currency);
  params.set("objective", state.objective);
  for (const [field, key] of Object.entries(FORECAST_KEYS) as [keyof ForecastFields, string][]) {
    const value = state.forecast[field].trim().replace(/,/g, "");
    if (NUMBER_RE.test(value)) params.set(key, value);
  }
  return params.toString();
}

/** Returns only the fields present and valid in the query string. */
export function decodeShareState(search: string, options: ShareOptions): Partial<Omit<ShareState, "forecast">> & { forecast: Partial<ForecastFields> } {
  const params = new URLSearchParams(search);
  const pick = <T extends string>(key: string, allowed: readonly string[]) => {
    const v = params.get(key);
    return v && allowed.includes(v) ? (v as T) : undefined;
  };
  const out: Partial<Omit<ShareState, "forecast">> & { forecast: Partial<ForecastFields> } = { forecast: {} };
  const mode = pick<CalculatorMode>("mode", ["forecast", "actual"]);
  if (mode) out.mode = mode;
  const industryId = pick("industry", options.industryIds);
  if (industryId) {
    out.industryId = industryId;
    if (industryId === "other") out.customIndustry = cleanText(params.get("customIndustry"));
  }
  const platform = pick<Platform>("platform", options.platforms);
  if (platform) out.platform = platform;
  const country = pick("country", options.countryCodes);
  if (country) {
    out.country = country;
    if (country === "OTHER") out.customCountry = cleanText(params.get("customCountry"));
  }
  const currency = pick("currency", options.currencies);
  if (currency) out.currency = currency;
  const objective = pick<Objective>("objective", options.objectives);
  if (objective) out.objective = objective;
  for (const [field, key] of Object.entries(FORECAST_KEYS) as [keyof ForecastFields, string][]) {
    const v = params.get(key);
    if (v && NUMBER_RE.test(v)) out.forecast[field] = v;
  }
  return out;
}
