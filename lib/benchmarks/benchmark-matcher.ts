/**
 * Benchmark matching. Pure: records and region membership are passed in (no runtime imports),
 * so the same logic is used by the UI and the tests.
 *
 * Order of preference:
 *   1. platform (always exact; never cross-platform)
 *   2. industry (always exact; "other"/custom industries never match)
 *   3. campaign type compatible with the objective
 *   4. geography: exact country > named region that lists the country > global,
 *      and regional/global records only when the record explicitly allows broader use
 *   5. newest publication year, then an exact campaign-type match over "all"
 */
import type { Objective, Platform } from "../calculators/types";
import type { BenchmarkCampaignType, BenchmarkRecord } from "./benchmark-data";

export const NO_BENCHMARK_MESSAGE =
  "Reliable benchmarks are not currently available for this industry and market. Enter your own campaign assumptions to create a forecast.";

export const CAMPAIGN_TYPES_FOR_OBJECTIVE: Readonly<Record<Objective, readonly BenchmarkCampaignType[]>> = {
  leads: ["leads", "all"],
  purchases: ["sales", "all"],
  customers: ["sales", "leads", "all"],
  traffic: ["traffic", "all"],
};

export type MatchLevel = "country" | "region" | "global";

export type BenchmarkMatch =
  | { status: "matched"; record: BenchmarkRecord; level: MatchLevel; coverageLabel: string }
  | { status: "none"; reason: string };

export type MatchQuery = {
  records: readonly BenchmarkRecord[];
  regions: Readonly<Record<string, readonly string[]>>;
  industryId: string;
  platform: Platform;
  /** ISO alpha-2 code; empty or "OTHER" when the visitor has not chosen a recognised country. */
  countryCode: string;
  objective: Objective;
};

const LEVEL_RANK: Record<MatchLevel, number> = { country: 0, region: 1, global: 2 };

function levelFor(record: BenchmarkRecord, countryCode: string, regions: MatchQuery["regions"]): MatchLevel | null {
  const geo = record.geo;
  if (geo.type === "country") return countryCode && geo.code === countryCode ? "country" : null;
  if (!record.allowBroaderUse) return null;
  if (geo.type === "region") return countryCode && regions[geo.id]?.includes(countryCode) ? "region" : null;
  return "global";
}

export function coverageLabel(record: BenchmarkRecord, regionName?: (code: string) => string): string {
  const geo = record.geo;
  if (geo.type === "country") return regionName ? regionName(geo.code) : geo.code;
  if (geo.type === "region") return geo.name;
  return "Global";
}

export function matchBenchmark({ records, regions, industryId, platform, countryCode, objective }: MatchQuery): BenchmarkMatch {
  if (!industryId || industryId === "other") {
    return { status: "none", reason: NO_BENCHMARK_MESSAGE };
  }
  const country = countryCode === "OTHER" ? "" : countryCode.toUpperCase();
  const allowedTypes = CAMPAIGN_TYPES_FOR_OBJECTIVE[objective];
  const candidates = records
    .filter((r) => r.platform === platform && r.industryId === industryId && allowedTypes.includes(r.campaignType))
    .map((record) => ({ record, level: levelFor(record, country, regions) }))
    .filter((c): c is { record: BenchmarkRecord; level: MatchLevel } => c.level !== null)
    .sort(
      (a, b) =>
        LEVEL_RANK[a.level] - LEVEL_RANK[b.level] ||
        b.record.year - a.record.year ||
        allowedTypes.indexOf(a.record.campaignType) - allowedTypes.indexOf(b.record.campaignType)
    );
  const best = candidates[0];
  if (!best) return { status: "none", reason: NO_BENCHMARK_MESSAGE };
  return { status: "matched", record: best.record, level: best.level, coverageLabel: coverageLabel(best.record) };
}

export type ComparisonRow = {
  key: "avgCpc" | "conversionRate" | "avgCpl" | "avgCpa" | "avgCtr";
  label: string;
  unit: "currency" | "percent";
  yours: number | null;
  benchmark: number;
  /** False when the values cannot be compared (e.g. different currencies). */
  comparable: boolean;
  note?: string;
};

/**
 * Side-by-side rows for metrics the record publishes. Monetary metrics are only comparable
 * when the visitor uses the record's currency; nothing is converted.
 */
export function compareWithBenchmark(
  record: BenchmarkRecord,
  yours: { cpc: number | null; conversionRate: number | null; costPerLead: number | null; cpa: number | null },
  currency: string
): ComparisonRow[] {
  const sameCurrency = record.currency === currency;
  const moneyNote = sameCurrency ? undefined : `Benchmark is in ${record.currency}; your inputs are in ${currency}. Values are not converted, so they are not compared.`;
  const rows: ComparisonRow[] = [];
  if (record.avgCpc !== undefined) rows.push({ key: "avgCpc", label: "Cost per click (CPC)", unit: "currency", yours: yours.cpc, benchmark: record.avgCpc, comparable: sameCurrency, note: moneyNote });
  if (record.conversionRate !== undefined) rows.push({ key: "conversionRate", label: "Conversion rate", unit: "percent", yours: yours.conversionRate, benchmark: record.conversionRate, comparable: true });
  if (record.avgCpl !== undefined) rows.push({ key: "avgCpl", label: "Cost per lead (CPL)", unit: "currency", yours: yours.costPerLead, benchmark: record.avgCpl, comparable: sameCurrency, note: moneyNote });
  if (record.avgCpa !== undefined) rows.push({ key: "avgCpa", label: "Cost per acquisition (CPA)", unit: "currency", yours: yours.cpa, benchmark: record.avgCpa, comparable: sameCurrency, note: moneyNote });
  if (record.avgCtr !== undefined) rows.push({ key: "avgCtr", label: "Click-through rate (CTR)", unit: "percent", yours: null, benchmark: record.avgCtr, comparable: true, note: "CTR is shown for context; the forecast does not use impressions." });
  return rows;
}

/** Problems that make a record unsafe to publish. Used by the schema test and the update workflow. */
export function validateBenchmarkRecord(r: BenchmarkRecord, knownIndustryIds: readonly string[]): string[] {
  const problems: string[] = [];
  if (!knownIndustryIds.includes(r.industryId) || r.industryId === "other") problems.push(`unknown industryId "${r.industryId}"`);
  if (!r.sourceCategory?.trim()) problems.push("sourceCategory is required");
  if (!r.sourceName?.trim()) problems.push("sourceName is required");
  if (!/^https:\/\/\S+$/.test(r.sourceUrl ?? "")) problems.push("sourceUrl must be an https URL");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedAt ?? "")) problems.push("verifiedAt must be YYYY-MM-DD");
  if (!Number.isInteger(r.year) || r.year < 2015 || r.year > 2100) problems.push("year is invalid");
  if (!/^[A-Z]{3}$/.test(r.currency ?? "")) problems.push("currency must be an ISO 4217 code");
  if (r.geo.type === "country" && !/^[A-Z]{2}$/.test(r.geo.code)) problems.push("geo.code must be ISO alpha-2");
  const metrics = (["avgCpc", "avgCtr", "conversionRate", "avgCpl", "avgCpa"] as const).filter((k) => r[k] !== undefined);
  if (!metrics.length) problems.push("record publishes no metrics");
  for (const k of metrics) {
    const v = r[k] as number;
    if (!Number.isFinite(v) || v <= 0) problems.push(`${k} must be a positive number`);
    if ((k === "avgCtr" || k === "conversionRate") && v > 100) problems.push(`${k} is a percentage and must be ≤ 100`);
    if (!r.metricDefinitions?.[k]?.trim()) problems.push(`metricDefinitions.${k} is required`);
  }
  return problems;
}
