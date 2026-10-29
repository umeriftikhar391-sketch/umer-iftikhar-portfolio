"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Check, Copy, Link2, RotateCcw, Sparkles } from "lucide-react";
import {
  CURRENCIES, DEFAULT_CURRENCY_BY_MARKET, INDUSTRIES, OBJECTIVES, OTHER_COUNTRY_CODE, OTHER_INDUSTRY_ID, PLATFORMS, PRIMARY_MARKETS, REGIONS,
} from "@/lib/benchmarks/industries";
import { BENCHMARKS } from "@/lib/benchmarks/benchmark-data";
import { compareWithBenchmark, matchBenchmark, NO_BENCHMARK_MESSAGE } from "@/lib/benchmarks/benchmark-matcher";
import { actualPerformance, budgetScenarios, forecast } from "@/lib/calculators/roas";
import { calculatorReducer, INITIAL_STATE } from "@/lib/calculators/state";
import { decodeShareState, encodeShareState } from "@/lib/calculators/share";
import { validateActual, validateCustomText, validateForecast, validValue } from "@/lib/calculators/validations";
import { formatCurrency, formatNumber, formatPercent, formatRoas } from "@/lib/calculators/format";
import { track } from "@/lib/analytics";
import IndustrySelector from "./IndustrySelector";
import CountrySelector, { resolveCountryCode, useCountryNames } from "./CountrySelector";
import BudgetInput from "./BudgetInput";
import AdvancedSettings from "./AdvancedSettings";
import ActualForm from "./ActualForm";
import { ActualDashboard, ForecastDashboard } from "./ResultsDashboard";
import { BenchmarkSource } from "./BenchmarkComparison";
import AuditCTA from "./AuditCTA";
import { OptionCards, cardClass } from "./ui";

const SHARE_OPTIONS = {
  industryIds: INDUSTRIES.map((i) => i.id),
  platforms: PLATFORMS.map((p) => p.id),
  countryCodes: PRIMARY_MARKETS.map((m) => m.code),
  currencies: CURRENCIES,
  objectives: OBJECTIVES.map((o) => o.id),
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without async clipboard permission.
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState<"results" | "link" | null>(null);
  const hydrated = useRef(false);
  const countries = useCountryNames();

  // Restore shared assumptions from the URL once, after mount (the page itself is static).
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (!window.location.search) return;
    const decoded = decodeShareState(window.location.search, SHARE_OPTIONS);
    dispatch({ type: "hydrate", state: decoded });
  }, []);

  const touch = (key: string) => setTouched((t) => (t.has(key) ? t : new Set(t).add(key)));

  // ---- Derived values -------------------------------------------------------------------------
  const isOtherIndustry = state.industryId === OTHER_INDUSTRY_ID;
  const custom = validateCustomText(state.customIndustry, "Your industry");
  const industryName = isOtherIndustry ? custom.value : INDUSTRIES.find((i) => i.id === state.industryId)?.name ?? "";
  const industryError = !state.industryId && touched.has("industry") ? "Choose an industry, or select Other to enter your own." : undefined;
  const customIndustryError = isOtherIndustry && (state.customIndustry || touched.has("customIndustry")) ? custom.error ?? undefined : undefined;

  const isOtherCountry = state.country === OTHER_COUNTRY_CODE;
  const customCountryCode = isOtherCountry ? resolveCountryCode(state.customCountry, countries) : null;
  const countryCode = isOtherCountry ? customCountryCode ?? "" : state.country;
  const countryName = isOtherCountry ? countries.find((c) => c.code === customCountryCode)?.name ?? state.customCountry.trim() : PRIMARY_MARKETS.find((m) => m.code === state.country)?.name ?? "";
  const customCountryError =
    isOtherCountry && (state.customCountry || touched.has("customCountry"))
      ? !state.customCountry.trim()
        ? "Choose your country."
        : !customCountryCode
          ? "Choose a country from the list."
          : undefined
      : undefined;

  const platform = PLATFORMS.find((p) => p.id === state.platform)!;
  const objective = OBJECTIVES.find((o) => o.id === state.objective)!;

  const forecastErrors = validateForecast(state.forecast, state.objective);
  const budgetError = forecastErrors.budget && (state.forecast.budget || touched.has("budget")) ? forecastErrors.budget : undefined;
  const visibleForecastErrors = { ...forecastErrors, budget: budgetError };
  const num = (key: keyof typeof state.forecast) => validValue(state.forecast, forecastErrors, key);
  const forecastInput = {
    objective: state.objective,
    budget: num("budget"),
    cpc: num("cpc"),
    conversionRate: num("conversionRate"),
    averageOrderValue: num("averageOrderValue"),
    customerValue: num("customerValue"),
    closeRate: num("closeRate"),
    grossMargin: num("grossMargin"),
  };
  // Pure and cheap: recomputed on every change for live results.
  const result = forecast(forecastInput);
  const scenarios = budgetScenarios(forecastInput);

  const match = useMemo(
    () => matchBenchmark({ records: BENCHMARKS, regions: REGIONS, industryId: state.industryId, platform: state.platform, countryCode, objective: state.objective }),
    [state.industryId, state.platform, countryCode, state.objective]
  );
  const rows =
    match.status === "matched"
      ? compareWithBenchmark(match.record, { cpc: forecastInput.cpc, conversionRate: forecastInput.conversionRate, costPerLead: result.costPerLead.value, cpa: result.cpa.value }, state.currency)
      : [];

  const actualErrors = validateActual(state.actual);
  const actualNum = (key: keyof typeof state.actual) => validValue(state.actual, actualErrors, key);
  const actualInput = {
    spend: actualNum("spend"),
    revenue: actualNum("revenue"),
    acquisitions: actualNum("acquisitions"),
    grossMargin: actualNum("grossMargin"),
    clicks: actualNum("clicks"),
    leads: actualNum("leads"),
    impressions: actualNum("impressions"),
  };
  const actual = actualPerformance(actualInput);

  const sharedBlockers = [
    ...(!state.industryId ? ["Select your industry"] : []),
    ...(isOtherIndustry && custom.error ? ["Enter your industry"] : []),
    ...(isOtherCountry && !customCountryCode ? ["Choose your target country"] : []),
  ];
  const forecastBlockers = [...sharedBlockers, ...(forecastInput.budget === null ? ["Enter a valid monthly advertising budget"] : [])];
  const actualBlockers = [
    ...sharedBlockers,
    ...(actualInput.spend === null ? ["Enter your total ad spend"] : []),
    ...(actualInput.revenue === null ? ["Enter the revenue attributed to these ads"] : []),
  ];
  const ready = state.mode === "forecast" ? forecastBlockers.length === 0 : actualBlockers.length === 0;

  // ---- Actions ----------------------------------------------------------------------------------
  const announce = (message: string, which: "results" | "link") => {
    setStatus(message);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 2500);
  };

  const summary = () => {
    const lines = [
      `ROAS Calculator & Ad Budget Planner (${state.mode === "forecast" ? "forecast: estimates, not actual results" : "actual campaign results"})`,
      `Industry: ${industryName || "Not selected"}`,
      `Platform: ${platform.name}`,
      `Country: ${countryName || "Not selected"}`,
    ];
    if (state.mode === "forecast") {
      lines.push(
        `Goal: ${objective.name}`,
        `Monthly budget: ${formatCurrency(result.budget.value, state.currency)}`,
        `Assumptions: CPC ${formatCurrency(forecastInput.cpc, state.currency)}, conversion rate ${formatPercent(forecastInput.conversionRate)}, gross margin ${formatPercent(forecastInput.grossMargin)}`,
        `Est. clicks: ${formatNumber(result.clicks.value)}`,
        ...(state.objective === "leads" ? [`Est. leads: ${formatNumber(result.leads.value, 1)}`] : []),
        ...(result.customers.value !== null ? [`Est. ${state.objective === "purchases" ? "purchases" : "customers"}: ${formatNumber(result.customers.value, 1)}`] : []),
        `Est. revenue: ${formatCurrency(result.revenue.value, state.currency)}`,
        `Projected ROAS: ${formatRoas(result.roas.value)} (break-even ${formatRoas(result.breakEvenRoas.value)})`,
        `Est. profit after ads: ${formatCurrency(result.contributionProfit.value, state.currency)}`
      );
    } else {
      lines.push(
        `Ad spend: ${formatCurrency(actualInput.spend, state.currency)}`,
        `Attributed revenue: ${formatCurrency(actualInput.revenue, state.currency)}`,
        `Actual ROAS: ${formatRoas(actual.roas.value)} (break-even ${formatRoas(actual.breakEvenRoas.value)})`,
        `Cost per purchase or customer (CPA): ${formatCurrency(actual.cpa.value, state.currency)}`,
        `Ad-level contribution profit: ${formatCurrency(actual.contributionProfit.value, state.currency)}`
      );
    }
    lines.push(match.status === "matched" ? `Benchmark: ${match.record.sourceName} ${match.record.year}` : "Benchmarks: none matched; based on the visitor's own assumptions.");
    return lines.join("\n");
  };

  const copyResults = async () => {
    const ok = await copyText(`${summary()}\n\nhttps://umeriftikhar.online/tools/roas-calculator`);
    track("calculator_copy_results", { mode: state.mode });
    announce(ok ? "Results copied to your clipboard." : "Couldn't copy automatically. Please select and copy the results manually.", "results");
  };

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?${encodeShareState(state)}`;
    const ok = await copyText(url);
    track("calculator_share_link", { mode: state.mode });
    announce(ok ? "Share link copied. It includes your forecast assumptions, not any actual results or contact details." : url, "link");
  };

  const reset = () => {
    dispatch({ type: "reset" });
    setTouched(new Set());
    setAdvancedOpen(true);
    if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
    setStatus("Calculator reset.");
  };

  const ctaSummary = [
    "Ads audit request from the ROAS calculator",
    `Industry: ${industryName || "Not selected"}`,
    `Platform: ${platform.short}`,
    `Country: ${countryName || "Not selected"}`,
    state.mode === "forecast" ? `Monthly ad budget: ${formatCurrency(forecastInput.budget, state.currency)}` : `Ad spend analysed: ${formatCurrency(actualInput.spend, state.currency)}`,
    state.mode === "forecast" ? `Goal: ${objective.name}` : `Actual ROAS: ${formatRoas(actual.roas.value)}`,
    "",
    "Anything else you'd like me to know:",
  ].join("\n");

  // ---- Render -----------------------------------------------------------------------------------
  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-3 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-label="Calculator mode" className="grid grid-cols-2 gap-1 rounded-xl bg-blush p-1">
          {([
            ["forecast", "Forecast My Results"],
            ["actual", "Calculate My Actual ROAS"],
          ] as const).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={state.mode === mode}
              onClick={() => dispatch({ type: "setMode", mode })}
              className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors sm:px-4 ${state.mode === mode ? "bg-white text-brand-hover shadow-card" : "text-body hover:text-ink"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copyResults} disabled={!ready} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blush disabled:cursor-not-allowed disabled:opacity-50">
            {copied === "results" ? <Check aria-hidden className="h-4 w-4 text-green-700" /> : <Copy aria-hidden className="h-4 w-4" />} Copy results
          </button>
          <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blush">
            {copied === "link" ? <Check aria-hidden className="h-4 w-4 text-green-700" /> : <Link2 aria-hidden className="h-4 w-4" />} Share link
          </button>
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold text-body transition-colors hover:bg-blush hover:text-ink">
            <RotateCcw aria-hidden className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-8">
        {/* ---------------- Inputs ---------------- */}
        <form noValidate onSubmit={(e) => e.preventDefault()} aria-label="Calculator inputs" className="min-w-0 space-y-5">
          <div className={`${cardClass} space-y-6`}>
            <h2 className="text-lg font-bold tracking-tight text-ink">About your business</h2>
            <IndustrySelector
              industryId={state.industryId}
              customIndustry={state.customIndustry}
              error={industryError}
              customError={customIndustryError}
              onIndustry={(industryId) => {
                touch("industry");
                dispatch({ type: "setIndustry", industryId });
              }}
              onCustom={(value) => dispatch({ type: "setCustomIndustry", value })}
              onBlurCustom={() => touch("customIndustry")}
            />
            <OptionCards
              legend="Where do you plan to advertise?"
              name="platform"
              value={state.platform}
              options={PLATFORMS.map((p) => ({ id: p.id, title: p.name }))}
              onChange={(platform) => dispatch({ type: "setPlatform", platform })}
            />
            <CountrySelector
              country={state.country}
              customCountry={state.customCountry}
              customError={customCountryError}
              onCountry={(country) => dispatch({ type: "setCountry", country, suggestedCurrency: DEFAULT_CURRENCY_BY_MARKET[country] })}
              onCustom={(value) => dispatch({ type: "setCustomCountry", value })}
              onBlurCustom={() => touch("customCountry")}
            />
          </div>

          {state.mode === "forecast" ? (
            <>
              <div className={`${cardClass} space-y-6`}>
                <h2 className="text-lg font-bold tracking-tight text-ink">Budget and goal</h2>
                <BudgetInput
                  value={state.forecast.budget}
                  currency={state.currency}
                  error={budgetError}
                  source={state.valueSource.budget}
                  onChange={(value) => dispatch({ type: "setForecast", field: "budget", value })}
                  onCurrency={(currency) => dispatch({ type: "setCurrency", currency })}
                  onBlur={() => touch("budget")}
                />
                <OptionCards
                  legend="What is your primary advertising goal?"
                  name="objective"
                  value={state.objective}
                  columns={2}
                  options={OBJECTIVES.map((o) => ({ id: o.id, title: o.name, description: o.description }))}
                  onChange={(objective) => dispatch({ type: "setObjective", objective })}
                />
              </div>

              <div className="rounded-2xl border border-line bg-blush p-5 text-sm leading-6 text-body" aria-live="polite">
                {match.status === "matched" ? (
                  <>
                    <p className="font-semibold text-ink">A published benchmark matches your selections.</p>
                    <div className="mt-3">
                      <BenchmarkSource match={match} />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "applyBenchmark",
                          values: {
                            ...(match.record.avgCpc !== undefined && match.record.currency === state.currency ? { cpc: String(match.record.avgCpc) } : {}),
                            ...(match.record.conversionRate !== undefined ? { conversionRate: String(match.record.conversionRate) } : {}),
                          },
                        })
                      }
                      className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-brand px-4 font-semibold text-white shadow-cta hover:bg-brand-hover"
                    >
                      Use benchmark values as my starting assumptions
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-ink">{NO_BENCHMARK_MESSAGE}</p>
                    {BENCHMARKS.length === 0 && (
                      <p className="mt-2">
                        <strong className="text-ink">Benchmark status:</strong> no verified benchmark data is included yet. Your industry,
                        platform and country choices label the forecast; they do not load local averages.
                      </p>
                    )}
                    <p className="mt-2">
                      Not sure what to enter? Use your own past campaign numbers, or load an example to see how the calculator works. Example
                      values are labelled <em>Illustrative Scenario</em> and are not industry data.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({ type: "applyExample" });
                        setAdvancedOpen(true);
                      }}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/35 bg-white px-4 font-semibold text-ink hover:bg-rose"
                    >
                      <Sparkles aria-hidden className="h-4 w-4 text-brand-hover" /> Load an illustrative example
                    </button>
                  </>
                )}
              </div>

              <AdvancedSettings
                objective={state.objective}
                currency={state.currency}
                fields={state.forecast}
                errors={visibleForecastErrors}
                valueSource={state.valueSource}
                open={advancedOpen}
                onToggle={setAdvancedOpen}
                onChange={(field, value) => dispatch({ type: "setForecast", field, value })}
              />
            </>
          ) : (
            <div className={`${cardClass} space-y-5`}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-lg font-bold tracking-tight text-ink">Historical campaign results</h2>
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  Currency
                  <select value={state.currency} onChange={(e) => dispatch({ type: "setCurrency", currency: e.target.value })} className="select-chevron min-h-11 appearance-none rounded-xl border border-line bg-white py-2 pl-3 text-sm font-semibold text-ink">
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <ActualForm
                fields={state.actual}
                errors={actualErrors}
                currency={state.currency}
                touched={touched}
                onChange={(field, value) => dispatch({ type: "setActual", field, value })}
                onBlur={(key) => touch(key)}
              />
            </div>
          )}
        </form>

        {/* ---------------- Results ---------------- */}
        <div className="min-w-0 space-y-6">
          {state.mode === "forecast" ? (
            <ForecastDashboard
              result={result}
              scenarios={scenarios}
              match={match}
              rows={rows}
              currency={state.currency}
              grossMargin={forecastInput.grossMargin}
              blockers={forecastBlockers}
            />
          ) : (
            <ActualDashboard result={actual} spend={actualInput.spend} revenue={actualInput.revenue} currency={state.currency} grossMargin={actualInput.grossMargin} blockers={actualBlockers} />
          )}
          {ready && <AuditCTA service={platform.service} summary={ctaSummary} />}
        </div>
      </div>
    </div>
  );
}
