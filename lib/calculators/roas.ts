/**
 * Pure calculation engine for the Ad Budget & ROAS calculator.
 * No runtime imports: safe to run in the browser, on the server and under `node --test`.
 * Every metric is either a finite number or `null` with a human-readable reason, never NaN/Infinity.
 */
import type { ActualInput, ActualResult, ForecastInput, ForecastResult, Metric, Scenario } from "./types";

export const SCENARIO_MULTIPLIERS = [0.5, 1, 1.5, 2] as const;

const ok = (value: number): Metric => (Number.isFinite(value) ? { value } : { value: null, reason: "Result is not a finite number." });
const none = (reason: string): Metric => ({ value: null, reason });
const isNum = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n);
const positive = (n: number | null | undefined): n is number => isNum(n) && n > 0;

/** Division that never yields NaN/Infinity: returns null when the denominator is zero, missing or invalid. */
export function safeDivide(numerator: number | null | undefined, denominator: number | null | undefined): number | null {
  if (!isNum(numerator) || !isNum(denominator) || denominator === 0) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

const divide = (n: number | null, d: number | null, reason: string): Metric => {
  const result = safeDivide(n, d);
  return result === null ? none(reason) : ok(result);
};

/** Break-even ROAS = 1 / gross margin ratio. */
export function breakEvenRoas(grossMarginPct: number | null | undefined): Metric {
  if (!positive(grossMarginPct) || grossMarginPct > 100) return none("Enter a gross margin above 0% to calculate break-even ROAS.");
  return ok(1 / (grossMarginPct / 100));
}

/** Break-even CPA = revenue per acquisition × gross margin ratio. */
export function breakEvenCpa(valuePerAcquisition: number | null | undefined, grossMarginPct: number | null | undefined): Metric {
  if (!positive(valuePerAcquisition)) return none("Enter the revenue from one customer to calculate break-even CPA.");
  if (!positive(grossMarginPct) || grossMarginPct > 100) return none("Enter a gross margin above 0% to calculate break-even CPA.");
  return ok(valuePerAcquisition * (grossMarginPct / 100));
}

/** ROAS = revenue / ad spend. */
export function roas(revenue: number | null | undefined, spend: number | null | undefined): Metric {
  if (!positive(spend)) return none("ROAS needs ad spend above zero.");
  if (!isNum(revenue) || revenue < 0) return none("ROAS needs a revenue value.");
  return ok(revenue / spend);
}

/** Labels for inputs that block a revenue forecast, by objective. */
function missingForRevenue(input: ForecastInput): string[] {
  const missing: string[] = [];
  if (!positive(input.budget)) missing.push("Monthly ad budget");
  if (!positive(input.cpc)) missing.push("Average cost per click (CPC)");
  if (input.objective === "traffic") {
    if (!positive(input.conversionRate)) missing.push("Conversion rate (optional for traffic)");
    if (!positive(input.customerValue)) missing.push("Value per conversion (optional for traffic)");
    return missing;
  }
  if (!positive(input.conversionRate)) missing.push("Conversion rate");
  if (input.objective === "purchases" && !positive(input.averageOrderValue)) missing.push("Average order value");
  if (input.objective !== "purchases" && !positive(input.customerValue)) missing.push("Average customer value");
  if (input.objective === "leads" && !positive(input.closeRate)) missing.push("Lead-to-customer close rate");
  return missing;
}

/**
 * Forecast for a CPC-based campaign.
 *   clicks       = budget / CPC
 *   conversions  = clicks × conversion rate     (leads, purchases or customers by objective)
 *   customers    = leads × close rate           (leads objective)
 *   revenue      = customers × customer value   | purchases × AOV
 *   ROAS         = revenue / budget
 *   CPA          = budget / customers
 *   gross profit = revenue × margin;  contribution profit = gross profit − budget
 */
export function forecast(input: ForecastInput): ForecastResult {
  const { objective, budget, cpc, conversionRate, averageOrderValue, customerValue, closeRate, grossMargin } = input;
  const budgetMetric = positive(budget) ? ok(budget) : none("Enter a monthly budget above zero.");
  const clicks = positive(budget) && positive(cpc) ? divide(budget, cpc, "Needs a budget and CPC above zero.") : none("Enter a budget and an average CPC to estimate clicks.");

  const conversions =
    clicks.value !== null && positive(conversionRate) && conversionRate <= 100
      ? ok(clicks.value * (conversionRate / 100))
      : none(clicks.value === null ? clicks.reason ?? "Clicks unavailable." : "Enter a conversion rate to estimate conversions.");

  let leads: Metric = none("Not applicable to this objective.");
  let customers: Metric;
  let revenue: Metric;
  let valuePerAcquisition: number | null = null;

  if (objective === "leads") {
    leads = conversions;
    customers =
      leads.value !== null && positive(closeRate) && closeRate <= 100
        ? ok(leads.value * (closeRate / 100))
        : none(leads.value === null ? leads.reason ?? "Leads unavailable." : "Enter a lead-to-customer close rate to estimate customers.");
    valuePerAcquisition = positive(customerValue) ? customerValue : null;
    revenue = customers.value !== null && valuePerAcquisition !== null ? ok(customers.value * valuePerAcquisition) : none("Revenue needs customers and an average customer value.");
  } else if (objective === "purchases") {
    customers = conversions;
    valuePerAcquisition = positive(averageOrderValue) ? averageOrderValue : null;
    revenue = customers.value !== null && valuePerAcquisition !== null ? ok(customers.value * valuePerAcquisition) : none("Revenue needs purchases and an average order value.");
  } else if (objective === "customers") {
    customers = conversions;
    valuePerAcquisition = positive(customerValue) ? customerValue : null;
    revenue = customers.value !== null && valuePerAcquisition !== null ? ok(customers.value * valuePerAcquisition) : none("Revenue needs customers and an average customer value.");
  } else {
    // Traffic: clicks are the goal. Conversions and revenue appear only when the visitor supplies both assumptions.
    leads = conversions;
    customers = none("Traffic campaigns optimise for clicks, not customers.");
    valuePerAcquisition = positive(customerValue) ? customerValue : null;
    revenue =
      conversions.value !== null && valuePerAcquisition !== null
        ? ok(conversions.value * valuePerAcquisition)
        : none("Traffic forecasts show revenue only when you add a conversion rate and a value per conversion.");
  }

  const spend = positive(budget) ? budget : null;
  const roasMetric = revenue.value !== null ? roas(revenue.value, spend) : none(revenue.reason ?? "Revenue unavailable.");
  const margin = positive(grossMargin) && grossMargin <= 100 ? grossMargin / 100 : null;
  const grossProfit = revenue.value !== null && margin !== null ? ok(revenue.value * margin) : none(revenue.value === null ? "Gross profit needs a revenue forecast." : "Enter a gross margin to estimate profit.");
  const contributionProfit = grossProfit.value !== null && spend !== null ? ok(grossProfit.value - spend) : none(grossProfit.reason ?? "Profit unavailable.");
  const beRoas = breakEvenRoas(grossMargin);
  const roasGap = roasMetric.value !== null && beRoas.value !== null ? ok(roasMetric.value - beRoas.value) : none("Needs both projected and break-even ROAS.");

  return {
    objective,
    budget: budgetMetric,
    clicks,
    leads,
    customers,
    revenue,
    costPerLead: objective === "leads" ? divide(spend, leads.value, "Cost per lead needs a budget and at least some leads.") : none("Not applicable to this objective."),
    cpa: objective === "traffic" ? none("Not applicable to traffic campaigns.") : divide(spend, customers.value, "CPA needs a budget and at least some customers."),
    roas: roasMetric,
    grossProfit,
    contributionProfit,
    breakEvenRoas: beRoas,
    breakEvenCpa: objective === "traffic" ? none("Not applicable to traffic campaigns.") : breakEvenCpa(valuePerAcquisition, grossMargin),
    roasGap,
    missingForRevenue: missingForRevenue(input),
  };
}

/** Budget scenarios holding every other assumption constant. */
export function budgetScenarios(input: ForecastInput, multipliers: readonly number[] = SCENARIO_MULTIPLIERS): Scenario[] {
  return multipliers.map((multiplier) => {
    const budget = positive(input.budget) ? input.budget * multiplier : null;
    const result = forecast({ ...input, budget });
    const conversions = input.objective === "leads" ? result.leads.value : input.objective === "traffic" ? result.leads.value : result.customers.value;
    return {
      multiplier,
      budget,
      clicks: result.clicks.value,
      conversions,
      revenue: result.revenue.value,
      roas: result.roas.value,
      contributionProfit: result.contributionProfit.value,
    };
  });
}

/** Performance from historical campaign data. */
export function actualPerformance(input: ActualInput): ActualResult {
  const { spend, revenue, acquisitions, grossMargin, clicks, leads, impressions } = input;
  const roasMetric = roas(revenue, spend);
  const margin = positive(grossMargin) && grossMargin <= 100 ? grossMargin / 100 : null;
  const grossProfit = isNum(revenue) && revenue >= 0 && margin !== null ? ok(revenue * margin) : none("Enter revenue and a gross margin to estimate profit.");
  const contributionProfit = grossProfit.value !== null && positive(spend) ? ok(grossProfit.value - spend) : none(grossProfit.reason ?? "Profit needs ad spend.");
  const beRoas = breakEvenRoas(grossMargin);
  return {
    roas: roasMetric,
    cpa: positive(acquisitions) ? divide(spend, acquisitions, "CPA needs ad spend.") : none("Enter the number of purchases or customers to calculate CPA."),
    costPerLead: positive(leads) ? divide(spend, leads, "Cost per lead needs ad spend.") : none("Enter the number of leads to calculate cost per lead."),
    cpc: positive(clicks) ? divide(spend, clicks, "CPC needs ad spend.") : none("Enter clicks to calculate CPC."),
    ctr: positive(impressions) && isNum(clicks) && clicks >= 0 ? ok((clicks / impressions) * 100) : none("Enter clicks and impressions to calculate CTR."),
    conversionRate: positive(clicks) && isNum(acquisitions) && acquisitions >= 0 ? ok((acquisitions / clicks) * 100) : none("Enter clicks and acquisitions to calculate conversion rate."),
    grossProfit,
    contributionProfit,
    breakEvenRoas: beRoas,
    roasGap: roasMetric.value !== null && beRoas.value !== null ? ok(roasMetric.value - beRoas.value) : none("Needs both actual and break-even ROAS."),
  };
}
