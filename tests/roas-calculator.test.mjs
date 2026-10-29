// Unit tests for the ROAS calculator engine, validation, formatting, benchmark matching and state.
// Run: npm test   (Node's built-in test runner; TypeScript modules load via type stripping)
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { forecast, budgetScenarios, actualPerformance, breakEvenRoas, breakEvenCpa, roas, safeDivide } from "../lib/calculators/roas.ts";
import { parseNumber, validateNumber, validateForecast, validateActual, validateCustomText, LIMITS } from "../lib/calculators/validations.ts";
import { formatCurrency, formatPercent, formatRoas, formatRoasDelta, formatNumber, PLACEHOLDER } from "../lib/calculators/format.ts";
import { matchBenchmark, compareWithBenchmark, validateBenchmarkRecord, NO_BENCHMARK_MESSAGE } from "../lib/benchmarks/benchmark-matcher.ts";
import { BENCHMARKS } from "../lib/benchmarks/benchmark-data.ts";
import { INDUSTRIES, REGIONS, PLATFORMS, CURRENCIES, OBJECTIVES, PRIMARY_MARKETS } from "../lib/benchmarks/industries.ts";
import { calculatorReducer, INITIAL_STATE } from "../lib/calculators/state.ts";
import { encodeShareState, decodeShareState } from "../lib/calculators/share.ts";

const close = (actual, expected, msg) => assert.ok(Math.abs(actual - expected) < 1e-9, `${msg ?? ""} expected ${expected}, got ${actual}`);
const base = { objective: "leads", budget: 1000, cpc: 2, conversionRate: 10, averageOrderValue: null, customerValue: 500, closeRate: 20, grossMargin: 50 };
const allFinite = (obj) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && "value" in v && v.value !== null) assert.ok(Number.isFinite(v.value), `${k} is not finite`);
  }
};

// Fixture records for matcher tests only. These are NOT real benchmarks and never ship to the UI.
const fx = (over) => ({
  industryId: "legal-services", sourceCategory: "Fixture", platform: "google-search", geo: { type: "country", code: "US" },
  campaignType: "leads", year: 2024, sourceName: "Fixture Source", sourceUrl: "https://example.com/fixture", verifiedAt: "2026-01-01",
  currency: "USD", statistic: "average", avgCpc: 9, conversionRate: 7, avgCpl: 100,
  metricDefinitions: { avgCpc: "def", conversionRate: "def", avgCpl: "def" }, ...over,
});

describe("1–7. Forecast calculations", () => {
  test("lead funnel: clicks, leads, customers, revenue, ROAS, CPA, CPL, profit", () => {
    const r = forecast(base);
    close(r.clicks.value, 500, "clicks = 1000/2");
    close(r.leads.value, 50, "leads = 500 × 10%");
    close(r.customers.value, 10, "customers = 50 × 20%");
    close(r.revenue.value, 5000, "revenue = 10 × 500");
    close(r.roas.value, 5, "ROAS = 5000/1000");
    close(r.cpa.value, 100, "CPA = 1000/10");
    close(r.costPerLead.value, 20, "CPL = 1000/50");
    close(r.grossProfit.value, 2500, "GP = 5000 × 50%");
    close(r.contributionProfit.value, 1500, "contribution = 2500 − 1000");
    close(r.breakEvenRoas.value, 2, "BE ROAS = 1/0.5");
    close(r.breakEvenCpa.value, 250, "BE CPA = 500 × 50%");
    close(r.roasGap.value, 3, "gap = 5 − 2");
    assert.deepEqual(r.missingForRevenue, []);
  });

  test("purchase funnel uses AOV and purchases as acquisitions", () => {
    const r = forecast({ ...base, objective: "purchases", averageOrderValue: 80, customerValue: null, closeRate: null });
    close(r.customers.value, 50, "purchases = 500 × 10%");
    close(r.revenue.value, 4000, "revenue = 50 × 80");
    close(r.roas.value, 4);
    close(r.cpa.value, 20, "CPA = 1000/50");
    close(r.breakEvenCpa.value, 40, "BE CPA = 80 × 50%");
    assert.equal(r.costPerLead.value, null);
  });

  test("acquire-customers funnel", () => {
    const r = forecast({ ...base, objective: "customers", conversionRate: 2, closeRate: null });
    close(r.customers.value, 10);
    close(r.revenue.value, 5000);
  });

  test("traffic shows clicks but never invents revenue", () => {
    const r = forecast({ ...base, objective: "traffic", conversionRate: null, customerValue: null });
    close(r.clicks.value, 500);
    assert.equal(r.revenue.value, null);
    assert.equal(r.roas.value, null);
    assert.equal(r.cpa.value, null);
    assert.match(r.revenue.reason, /value per conversion/);
  });

  test("traffic with explicit conversion assumptions estimates conversions and revenue", () => {
    const r = forecast({ ...base, objective: "traffic", conversionRate: 2, customerValue: 50 });
    close(r.leads.value, 10);
    close(r.revenue.value, 500);
  });

  test("negative contribution profit when ROAS is below break-even", () => {
    const r = forecast({ ...base, customerValue: 100 });
    close(r.roas.value, 1);
    close(r.contributionProfit.value, -500, "1000 × 50% − 1000");
    assert.ok(r.roasGap.value < 0);
  });

  test("primitive helpers", () => {
    close(roas(3000, 1000).value, 3);
    close(breakEvenRoas(25).value, 4);
    close(breakEvenCpa(200, 30).value, 60);
    assert.equal(safeDivide(5, 0), null);
  });
});

describe("7. Budget scenarios", () => {
  test("multipliers scale spend with assumptions held constant", () => {
    const s = budgetScenarios(base);
    assert.deepEqual(s.map((x) => x.multiplier), [0.5, 1, 1.5, 2]);
    assert.deepEqual(s.map((x) => x.budget), [500, 1000, 1500, 2000]);
    close(s[3].clicks, 1000);
    close(s[3].revenue, 10000);
    // Constant assumptions → constant ROAS; the tool never claims scaling improves ROAS.
    for (const x of s) close(x.roas, 5);
    close(s[0].contributionProfit, 750);
  });
  test("scenarios without a budget are empty, not NaN", () => {
    for (const x of budgetScenarios({ ...base, budget: null })) {
      assert.equal(x.budget, null);
      assert.equal(x.roas, null);
    }
  });
});

describe("8–9. Missing inputs and division by zero", () => {
  test("empty forecast yields only nulls with reasons", () => {
    const r = forecast({ objective: "leads", budget: null, cpc: null, conversionRate: null, averageOrderValue: null, customerValue: null, closeRate: null, grossMargin: null });
    for (const key of ["budget", "clicks", "leads", "customers", "revenue", "roas", "cpa", "grossProfit", "contributionProfit", "breakEvenRoas"]) {
      assert.equal(r[key].value, null, key);
      assert.ok(r[key].reason, `${key} has a reason`);
    }
    assert.ok(r.missingForRevenue.includes("Monthly ad budget"));
  });
  test("zero CPC, zero conversion rate, zero margin never produce NaN/Infinity", () => {
    for (const over of [{ cpc: 0 }, { conversionRate: 0 }, { grossMargin: 0 }, { closeRate: 0 }, { budget: 0 }]) {
      const r = forecast({ ...base, ...over });
      allFinite(r);
    }
    assert.equal(forecast({ ...base, grossMargin: 0 }).breakEvenRoas.value, null);
    assert.equal(forecast({ ...base, conversionRate: 0 }).cpa.value, null);
  });
  test("very large budgets stay finite", () => {
    const r = forecast({ ...base, budget: LIMITS.budget.max, cpc: 0.01 });
    allFinite(r);
    close(r.clicks.value, 1e10);
  });
  test("actual mode: ROAS, CPA, CPC, CTR, CVR, profit, zero-safe", () => {
    const a = actualPerformance({ spend: 2000, revenue: 9000, acquisitions: 30, grossMargin: 40, clicks: 1000, leads: 60, impressions: 50000 });
    close(a.roas.value, 4.5);
    close(a.cpa.value, 2000 / 30);
    close(a.costPerLead.value, 2000 / 60);
    close(a.cpc.value, 2);
    close(a.ctr.value, 2);
    close(a.conversionRate.value, 3);
    close(a.contributionProfit.value, 9000 * 0.4 - 2000);
    close(a.breakEvenRoas.value, 2.5);
    close(a.roasGap.value, 2);
    const z = actualPerformance({ spend: 0, revenue: 0, acquisitions: 0, grossMargin: 0, clicks: 0, leads: 0, impressions: 0 });
    allFinite(z);
    assert.equal(z.roas.value, null);
    assert.equal(z.cpa.value, null);
    const zeroRevenue = actualPerformance({ spend: 500, revenue: 0, acquisitions: null, grossMargin: 50, clicks: null, leads: null, impressions: null });
    close(zeroRevenue.roas.value, 0);
    close(zeroRevenue.contributionProfit.value, -500);
  });
});

describe("Validation", () => {
  test("parseNumber handles commas, whitespace and junk", () => {
    assert.equal(parseNumber(" 1,250.50 "), 1250.5);
    assert.equal(parseNumber(""), null);
    assert.equal(parseNumber("abc"), null);
    assert.equal(parseNumber("1e9"), null);
    assert.equal(parseNumber("Infinity"), null);
  });
  test("budget rules: required, positive, non-zero, upper limit", () => {
    const rule = { ...LIMITS.budget, label: "Budget" };
    assert.match(validateNumber("", rule, { required: true }), /required/);
    assert.match(validateNumber("-5", rule, { required: true }), /negative/);
    assert.match(validateNumber("0", rule, { required: true }), /greater than zero/);
    assert.match(validateNumber("100000001", rule, { required: true }), /or less/);
    assert.equal(validateNumber("2500", rule, { required: true }), null);
  });
  test("percentages are capped at 100 and counts must be whole numbers", () => {
    assert.ok(validateForecast({ budget: "1000", cpc: "", conversionRate: "120", averageOrderValue: "", customerValue: "", closeRate: "", grossMargin: "" }, "leads").conversionRate);
    assert.ok(validateActual({ spend: "100", revenue: "0", acquisitions: "2.5", grossMargin: "", clicks: "", leads: "", impressions: "" }).acquisitions);
    assert.deepEqual(validateActual({ spend: "100", revenue: "0", acquisitions: "", grossMargin: "", clicks: "", leads: "", impressions: "" }), {});
  });
  test("custom text is trimmed, required and length-limited", () => {
    assert.deepEqual(validateCustomText("  Solar   Installation ", "Industry"), { value: "Solar Installation", error: null });
    assert.match(validateCustomText("   ", "Industry").error, /required/);
    assert.match(validateCustomText("x".repeat(61), "Industry").error, /60 characters/);
    assert.ok(validateCustomText("<script>", "Industry").error);
  });
});

describe("10. Currency formatting (no conversion)", () => {
  test("formats in the input currency", () => {
    assert.equal(formatCurrency(1234.5, "USD"), "$1,235");
    assert.equal(formatCurrency(12.5, "USD"), "$12.5");
    assert.match(formatCurrency(150000, "PKR"), /PKR\s?150,000/);
    assert.match(formatCurrency(99, "GBP"), /£99/);
    assert.match(formatCurrency(2500, "AED"), /AED\s?2,500/);
    assert.match(formatCurrency(5000000, "INR", { compact: true }), /₹5M/);
  });
  test("placeholders instead of NaN/Infinity", () => {
    for (const v of [null, undefined, NaN, Infinity]) {
      assert.equal(formatCurrency(v, "USD"), PLACEHOLDER);
      assert.equal(formatPercent(v), PLACEHOLDER);
      assert.equal(formatRoas(v), PLACEHOLDER);
      assert.equal(formatNumber(v), PLACEHOLDER);
    }
    assert.equal(formatRoas(3), "3.00x");
    assert.equal(formatRoasDelta(-0.5), "−0.50x");
  });
});

describe("11–12, 14–15. Benchmark matching", () => {
  const q = { regions: REGIONS, industryId: "legal-services", platform: "google-search", countryCode: "US", objective: "leads" };

  test("exact platform + industry + country match", () => {
    const m = matchBenchmark({ ...q, records: [fx({})] });
    assert.equal(m.status, "matched");
    assert.equal(m.level, "country");
  });
  test("12. unknown / Other industry never receives a benchmark", () => {
    const m = matchBenchmark({ ...q, industryId: "other", records: [fx({ geo: { type: "global" }, allowBroaderUse: true })] });
    assert.equal(m.status, "none");
    assert.equal(m.reason, NO_BENCHMARK_MESSAGE);
  });
  test("14. Google Search benchmarks are never applied to Meta or Display", () => {
    const records = [fx({})];
    assert.equal(matchBenchmark({ ...q, records, platform: "meta" }).status, "none");
    assert.equal(matchBenchmark({ ...q, records, platform: "google-display" }).status, "none");
  });
  test("15. US data is never used for Pakistan, UAE or an unspecified country", () => {
    const records = [fx({})];
    for (const countryCode of ["PK", "AE", "OTHER", ""]) assert.equal(matchBenchmark({ ...q, records, countryCode }).status, "none", countryCode);
  });
  test("15. regional records apply only to listed countries and only when explicitly allowed", () => {
    const gcc = fx({ geo: { type: "region", id: "gcc", name: "GCC" }, allowBroaderUse: true });
    assert.equal(matchBenchmark({ ...q, records: [gcc], countryCode: "AE" }).level, "region");
    assert.equal(matchBenchmark({ ...q, records: [gcc], countryCode: "PK" }).status, "none");
    assert.equal(matchBenchmark({ ...q, records: [{ ...gcc, allowBroaderUse: false }], countryCode: "AE" }).status, "none");
  });
  test("country beats region beats global; newest year wins; objective must be compatible", () => {
    const records = [
      fx({ geo: { type: "global" }, allowBroaderUse: true, year: 2026 }),
      fx({ year: 2023 }),
      fx({ year: 2025 }),
    ];
    const m = matchBenchmark({ ...q, records });
    assert.equal(m.level, "country");
    assert.equal(m.record.year, 2025);
    assert.equal(matchBenchmark({ ...q, records: [fx({ campaignType: "traffic" })] }).status, "none", "traffic data is not used for lead forecasts");
    assert.equal(matchBenchmark({ ...q, objective: "purchases", records: [fx({ campaignType: "leads" })] }).status, "none");
  });
  test("comparison rows never compare different currencies", () => {
    const rows = compareWithBenchmark(fx({}), { cpc: 3, conversionRate: 5, costPerLead: 60, cpa: null }, "PKR");
    assert.equal(rows.find((r) => r.key === "avgCpc").comparable, false);
    assert.equal(rows.find((r) => r.key === "conversionRate").comparable, true);
    assert.equal(compareWithBenchmark(fx({}), { cpc: 3, conversionRate: 5, costPerLead: 60, cpa: null }, "USD").find((r) => r.key === "avgCpc").comparable, true);
  });
  test("shipped benchmark records all pass the publication schema", () => {
    const ids = INDUSTRIES.map((i) => i.id);
    for (const r of BENCHMARKS) assert.deepEqual(validateBenchmarkRecord(r, ids), [], `${r.sourceName} ${r.industryId}`);
    assert.ok(validateBenchmarkRecord(fx({ sourceUrl: "http://x" }), ids).length, "rejects non-https sources");
    assert.ok(validateBenchmarkRecord(fx({ industryId: "other" }), ids).length, "rejects records for Other");
  });
});

describe("13 & 16. State: conditional Other input and custom overrides", () => {
  test("Other industry text is kept only while Other is selected", () => {
    let s = calculatorReducer(INITIAL_STATE, { type: "setIndustry", industryId: "other" });
    s = calculatorReducer(s, { type: "setCustomIndustry", value: "Solar Installation" });
    assert.equal(s.customIndustry, "Solar Installation");
    s = calculatorReducer(s, { type: "setIndustry", industryId: "real-estate" });
    assert.equal(s.customIndustry, "", "cleared when switching away");
    s = calculatorReducer(s, { type: "setCustomIndustry", value: "ignored" });
    assert.equal(s.customIndustry, "", "cannot be set unless Other is selected");
  });
  test("Other country text is cleared when a listed country is chosen", () => {
    let s = calculatorReducer(INITIAL_STATE, { type: "setCountry", country: "OTHER" });
    s = calculatorReducer(s, { type: "setCustomCountry", value: "Germany" });
    s = calculatorReducer(s, { type: "setCountry", country: "PK", suggestedCurrency: "PKR" });
    assert.equal(s.customCountry, "");
    assert.equal(s.currency, "PKR");
  });
  test("16. editing a benchmark-filled value turns it into the visitor's own input", () => {
    let s = calculatorReducer(INITIAL_STATE, { type: "applyBenchmark", values: { cpc: "9", conversionRate: "7" } });
    assert.equal(s.valueSource.cpc, "benchmark");
    s = calculatorReducer(s, { type: "setForecast", field: "cpc", value: "4" });
    assert.equal(s.valueSource.cpc, undefined, "now the visitor's own input");
    assert.equal(s.forecast.cpc, "4");
    assert.equal(s.valueSource.conversionRate, "benchmark");
  });
  test("illustrative example values are labelled as examples, never as benchmarks", () => {
    const s = calculatorReducer(INITIAL_STATE, { type: "applyExample" });
    assert.equal(s.valueSource.cpc, "example");
    assert.equal(s.valueSource.budget, "example");
    assert.ok(!Object.values(s.valueSource).includes("benchmark"));
    const kept = calculatorReducer({ ...INITIAL_STATE, forecast: { ...INITIAL_STATE.forecast, budget: "750" } }, { type: "applyExample" });
    assert.equal(kept.forecast.budget, "750", "an entered budget is kept");
    assert.equal(kept.valueSource.budget, undefined);
  });
  test("reset restores defaults", () => {
    const s = calculatorReducer({ ...INITIAL_STATE, mode: "actual", forecast: { ...INITIAL_STATE.forecast, budget: "5" } }, { type: "reset" });
    assert.deepEqual(s, INITIAL_STATE);
  });
});

describe("Share links", () => {
  const options = { industryIds: INDUSTRIES.map((i) => i.id), platforms: PLATFORMS.map((p) => p.id), countryCodes: PRIMARY_MARKETS.map((m) => m.code), currencies: CURRENCIES, objectives: OBJECTIVES.map((o) => o.id) };
  test("round-trips forecast assumptions", () => {
    const state = { ...INITIAL_STATE, industryId: "other", customIndustry: "Pet Services", country: "PK", currency: "PKR", objective: "purchases", forecast: { ...INITIAL_STATE.forecast, budget: "150000", cpc: "35", grossMargin: "30" } };
    const decoded = decodeShareState(encodeShareState(state), options);
    assert.equal(decoded.customIndustry, "Pet Services");
    assert.equal(decoded.currency, "PKR");
    assert.equal(decoded.forecast.budget, "150000");
    assert.equal(decoded.forecast.cpc, "35");
  });
  test("never encodes actual-mode financials and rejects crafted values", () => {
    const qs = encodeShareState({ ...INITIAL_STATE, actual: { ...INITIAL_STATE.actual, revenue: "99999" } });
    assert.doesNotMatch(qs, /99999|revenue|spend/);
    const d = decodeShareState("industry=hacker&platform=tiktok&currency=BTC&budget=-5&cvr=abc&customIndustry=x", options);
    assert.equal(d.industryId, undefined);
    assert.equal(d.platform, undefined);
    assert.equal(d.currency, undefined);
    assert.deepEqual(d.forecast, {});
  });
});

describe("Page worked examples (must match the copy on /tools/roas-calculator)", () => {
  const sample = { spend: 10000, revenue: 40000, acquisitions: null, grossMargin: 40, clicks: null, leads: null, impressions: null };
  test("spend 10,000 and revenue 40,000 → 4x ROAS (400%)", () => {
    const a = actualPerformance(sample);
    close(a.roas.value, 4);
    assert.equal(formatRoas(a.roas.value), "4.00x");
    close(a.roas.value * 100, 400);
  });
  test("40% margin → 2.5x break-even ROAS", () => close(breakEvenRoas(40).value, 2.5));
  test("revenue 40,000 at 40% margin minus spend 10,000 → 6,000 contribution profit", () => {
    close(actualPerformance(sample).contributionProfit.value, 6000);
  });
  test("FAQ: same 4x at 20% margin → −2,000 and 5x break-even", () => {
    const a = actualPerformance({ ...sample, grossMargin: 20 });
    close(a.contributionProfit.value, -2000);
    close(a.breakEvenRoas.value, 5);
  });
  test("zero spend gives no finite ROAS", () => {
    const a = actualPerformance({ ...sample, spend: 0 });
    assert.equal(a.roas.value, null);
    assert.equal(formatRoas(a.roas.value), PLACEHOLDER);
  });
  test("zero or missing margin gives no break-even ROAS", () => {
    assert.equal(breakEvenRoas(0).value, null);
    assert.equal(breakEvenRoas(null).value, null);
    assert.equal(actualPerformance({ ...sample, grossMargin: null }).breakEvenRoas.value, null);
  });
  test("missing revenue is not treated as a revenue result", () => {
    const a = actualPerformance({ ...sample, revenue: null });
    assert.equal(a.roas.value, null);
    assert.equal(a.grossProfit.value, null);
    assert.equal(a.contributionProfit.value, null);
  });
  test("changing currency never changes entered amounts", () => {
    let s = calculatorReducer(INITIAL_STATE, { type: "setForecast", field: "budget", value: "10000" });
    s = calculatorReducer(s, { type: "setActual", field: "spend", value: "10000" });
    for (const currency of CURRENCIES) {
      const next = calculatorReducer(s, { type: "setCurrency", currency });
      assert.equal(next.forecast.budget, "10000");
      assert.equal(next.actual.spend, "10000");
    }
    const viaCountry = calculatorReducer(s, { type: "setCountry", country: "AE", suggestedCurrency: "AED" });
    assert.equal(viaCountry.forecast.budget, "10000");
  });
  test("lead-gen CPA divides by customers, not leads", () => {
    const r = forecast(base);
    close(r.costPerLead.value, 1000 / 50);
    close(r.cpa.value, 1000 / 10);
  });
});
