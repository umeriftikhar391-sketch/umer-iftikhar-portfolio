/** Shared types for the Ad Budget & ROAS calculator. Pure data, no runtime code. */

export type Platform = "meta" | "google-search" | "google-display";
export type Objective = "leads" | "purchases" | "customers" | "traffic";
export type CalculatorMode = "forecast" | "actual";

/** A computed metric: a finite number, or null with the reason it cannot be calculated. */
export type Metric = { value: number | null; reason?: string };

export type ForecastInput = {
  objective: Objective;
  budget: number | null;
  /** Average cost per click, in the input currency. */
  cpc: number | null;
  /** Click-to-conversion rate as a percentage (5 = 5%). Conversion = lead, purchase or customer by objective. */
  conversionRate: number | null;
  /** Purchases: average order value. */
  averageOrderValue: number | null;
  /** Leads / customers (and traffic): revenue attributed to one acquired customer. */
  customerValue: number | null;
  /** Leads only: percentage of leads that become customers. */
  closeRate: number | null;
  /** Gross profit margin as a percentage (40 = 40%). */
  grossMargin: number | null;
};

export type ForecastResult = {
  objective: Objective;
  budget: Metric;
  clicks: Metric;
  /** Leads (lead objective) or conversions (traffic objective). */
  leads: Metric;
  /** Purchases or acquired customers. */
  customers: Metric;
  revenue: Metric;
  costPerLead: Metric;
  cpa: Metric;
  roas: Metric;
  grossProfit: Metric;
  contributionProfit: Metric;
  breakEvenRoas: Metric;
  breakEvenCpa: Metric;
  /** Projected ROAS minus break-even ROAS. */
  roasGap: Metric;
  /** Inputs still needed before a revenue forecast is possible. */
  missingForRevenue: string[];
};

export type ActualInput = {
  spend: number | null;
  revenue: number | null;
  acquisitions: number | null;
  grossMargin: number | null;
  clicks: number | null;
  leads: number | null;
  impressions: number | null;
};

export type ActualResult = {
  roas: Metric;
  cpa: Metric;
  costPerLead: Metric;
  cpc: Metric;
  ctr: Metric;
  conversionRate: Metric;
  grossProfit: Metric;
  contributionProfit: Metric;
  breakEvenRoas: Metric;
  roasGap: Metric;
};

export type Scenario = {
  multiplier: number;
  budget: number | null;
  clicks: number | null;
  conversions: number | null;
  revenue: number | null;
  roas: number | null;
  contributionProfit: number | null;
};
