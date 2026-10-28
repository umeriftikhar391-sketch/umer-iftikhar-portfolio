/**
 * Calculator state and transitions as a pure reducer (used with React's useReducer and in tests).
 * Encodes the "Other" rules: custom text is kept only while "Other" is selected and is cleared when
 * the visitor switches to a predefined option.
 */
import type { CalculatorMode, Objective, Platform } from "./types";
import type { ActualFields, ForecastFields } from "./validations";

export type CalculatorState = {
  mode: CalculatorMode;
  industryId: string;
  customIndustry: string;
  platform: Platform;
  country: string;
  customCountry: string;
  currency: string;
  objective: Objective;
  forecast: ForecastFields;
  actual: ActualFields;
  /** Where each forecast value came from. Absent = the visitor's own input. */
  valueSource: Partial<Record<keyof ForecastFields, ValueSource>>;
};

/** "benchmark" = a published industry benchmark; "example" = the illustrative scenario. */
export type ValueSource = "benchmark" | "example";

export const EMPTY_FORECAST: ForecastFields = { budget: "", cpc: "", conversionRate: "", averageOrderValue: "", customerValue: "", closeRate: "", grossMargin: "" };
export const EMPTY_ACTUAL: ActualFields = { spend: "", revenue: "", acquisitions: "", grossMargin: "", clicks: "", leads: "", impressions: "" };

export const INITIAL_STATE: CalculatorState = {
  mode: "forecast",
  industryId: "",
  customIndustry: "",
  platform: "meta",
  country: "US",
  customCountry: "",
  currency: "USD",
  objective: "leads",
  forecast: { ...EMPTY_FORECAST },
  actual: { ...EMPTY_ACTUAL },
  valueSource: {},
};

/**
 * Round example numbers for the "Illustrative Scenario" button. These are NOT industry data and are always
 * labelled as an illustrative example in the UI.
 */
export const ILLUSTRATIVE_EXAMPLE: Omit<ForecastFields, "budget"> = {
  cpc: "1.50",
  conversionRate: "5",
  averageOrderValue: "60",
  customerValue: "300",
  closeRate: "20",
  grossMargin: "40",
};

export type CalculatorAction =
  | { type: "setMode"; mode: CalculatorMode }
  | { type: "setIndustry"; industryId: string }
  | { type: "setCustomIndustry"; value: string }
  | { type: "setPlatform"; platform: Platform }
  | { type: "setCountry"; country: string; suggestedCurrency?: string }
  | { type: "setCustomCountry"; value: string }
  | { type: "setCurrency"; currency: string }
  | { type: "setObjective"; objective: Objective }
  | { type: "setForecast"; field: keyof ForecastFields; value: string }
  | { type: "setActual"; field: keyof ActualFields; value: string }
  | { type: "applyBenchmark"; values: Partial<ForecastFields> }
  | { type: "applyExample" }
  | { type: "hydrate"; state: Partial<Omit<CalculatorState, "forecast" | "actual">> & { forecast?: Partial<ForecastFields> } }
  | { type: "reset" };

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "setMode":
      return { ...state, mode: action.mode };
    case "setIndustry":
      return {
        ...state,
        industryId: action.industryId,
        // Custom text belongs only to "Other": clear it whenever a predefined industry is chosen.
        customIndustry: action.industryId === "other" ? state.customIndustry : "",
      };
    case "setCustomIndustry":
      return state.industryId === "other" ? { ...state, customIndustry: action.value } : state;
    case "setPlatform":
      return { ...state, platform: action.platform };
    case "setCountry":
      return {
        ...state,
        country: action.country,
        customCountry: action.country === "OTHER" ? state.customCountry : "",
        currency: action.suggestedCurrency ?? state.currency,
      };
    case "setCustomCountry":
      return state.country === "OTHER" ? { ...state, customCountry: action.value } : state;
    case "setCurrency":
      return { ...state, currency: action.currency };
    case "setObjective":
      return { ...state, objective: action.objective };
    case "setForecast":
      return {
        ...state,
        forecast: { ...state.forecast, [action.field]: action.value },
        // Once edited, a value is the visitor's own input, not a benchmark or example.
        valueSource: { ...state.valueSource, [action.field]: undefined },
      };
    case "setActual":
      return { ...state, actual: { ...state.actual, [action.field]: action.value } };
    case "applyBenchmark": {
      const source = { ...state.valueSource };
      for (const key of Object.keys(action.values) as (keyof ForecastFields)[]) source[key] = "benchmark";
      return { ...state, forecast: { ...state.forecast, ...action.values }, valueSource: source };
    }
    case "applyExample": {
      const source = { ...state.valueSource };
      for (const key of Object.keys(ILLUSTRATIVE_EXAMPLE) as (keyof ForecastFields)[]) source[key] = "example";
      if (!state.forecast.budget) source.budget = "example";
      return { ...state, forecast: { ...state.forecast, ...ILLUSTRATIVE_EXAMPLE, budget: state.forecast.budget || "1000" }, valueSource: source };
    }
    case "hydrate": {
      const { forecast, ...rest } = action.state;
      const next = { ...state, ...rest, forecast: { ...state.forecast, ...forecast } };
      if (next.industryId !== "other") next.customIndustry = "";
      if (next.country !== "OTHER") next.customCountry = "";
      return next;
    }
    case "reset":
      return { ...INITIAL_STATE, forecast: { ...EMPTY_FORECAST }, actual: { ...EMPTY_ACTUAL }, valueSource: {} };
    default:
      return state;
  }
}
