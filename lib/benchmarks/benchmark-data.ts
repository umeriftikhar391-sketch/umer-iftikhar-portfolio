/**
 * Published advertising benchmarks used by the ROAS calculator.
 *
 * RULES (see docs/roas-calculator-benchmarks.md):
 *  - Only add figures copied from the original publication. Never estimate, round, average across sources or "fill gaps".
 *  - One record = one industry × platform × geography × campaign type × source × year.
 *  - Leave a metric undefined when the source does not publish it.
 *  - `sourceCategory` is the source's own industry label; `industryId` is our mapping. Map only when the
 *    categories are genuinely equivalent, and explain partial mappings in `limitations`.
 *  - Monetary metrics are in `currency` and are never converted; the calculator only compares them with
 *    inputs entered in the same currency.
 *
 * STATUS: empty. Primary benchmark publishers could not be reached from the build environment, and secondary
 * summaries conflicted, so no figures were published. The calculator therefore asks visitors for their own
 * assumptions. Run `npm run test` after adding records: the schema test rejects incomplete records.
 */
import type { Platform } from "../calculators/types";

export type BenchmarkGeo =
  | { type: "country"; code: string }
  | { type: "region"; id: string; name: string }
  | { type: "global" };

/** Campaign type the source measured. "all" only when the source does not split by objective. */
export type BenchmarkCampaignType = "leads" | "sales" | "traffic" | "all";

export type BenchmarkRecord = {
  industryId: string;
  /** The publisher's own category name, e.g. "Attorneys & Legal Services". */
  sourceCategory: string;
  platform: Platform;
  geo: BenchmarkGeo;
  /** Regional/global records are used for a specific country only when this is true. */
  allowBroaderUse?: boolean;
  campaignType: BenchmarkCampaignType;
  year: number;
  sourceName: string;
  sourceUrl: string;
  /** ISO date (YYYY-MM-DD) the figures were checked against the source. */
  verifiedAt: string;
  currency: string;
  /** Whether figures are means or medians, as stated by the source. */
  statistic: "average" | "median";
  avgCpc?: number;
  /** Percent, e.g. 6.66 */
  avgCtr?: number;
  /** Percent, e.g. 7.52 */
  conversionRate?: number;
  avgCpl?: number;
  avgCpa?: number;
  /** How the source defines each published metric. */
  metricDefinitions: Partial<Record<"avgCpc" | "avgCtr" | "conversionRate" | "avgCpl" | "avgCpa", string>>;
  notes?: string;
  limitations?: string;
};

export const BENCHMARKS: readonly BenchmarkRecord[] = [];

