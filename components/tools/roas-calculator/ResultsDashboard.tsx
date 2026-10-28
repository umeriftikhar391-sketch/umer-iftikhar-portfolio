"use client";

import { BarChart3, ListChecks } from "lucide-react";
import type { ActualResult, ForecastResult, Objective, Scenario } from "@/lib/calculators/types";
import type { BenchmarkMatch, ComparisonRow } from "@/lib/benchmarks/benchmark-matcher";
import { formatCurrency, formatNumber, formatPercent, formatRoas } from "@/lib/calculators/format";
import KPIGrid, { type Kpi } from "./KPIGrid";
import PerformanceChart from "./PerformanceChart";
import BenchmarkComparison from "./BenchmarkComparison";
import BudgetScenarios from "./BudgetScenarios";
import BreakEvenAnalysis from "./BreakEvenAnalysis";
import { TIPS } from "./AdvancedSettings";

const CONVERSION_NAME: Record<Objective, { plural: string; cpa: string }> = {
  leads: { plural: "Customers", cpa: "Est. Cost per Customer (CPA)" },
  purchases: { plural: "Purchases", cpa: "Est. Cost per Purchase (CPA)" },
  customers: { plural: "Customers", cpa: "Est. Cost per Customer (CPA)" },
  traffic: { plural: "Conversions", cpa: "Est. CPA" },
};

export function EmptyState({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center sm:p-8" role="status">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose">
        <BarChart3 aria-hidden className="h-6 w-6 text-brand-hover" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      {items.length > 0 && (
        <ul className="mx-auto mt-3 max-w-sm space-y-1.5 text-left text-sm text-body">
          {items.map((i) => (
            <li key={i} className="flex gap-2">
              <ListChecks aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-hover" /> {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const pick = (cond: boolean, kpi: Kpi): Kpi[] => (cond ? [kpi] : []);

export function ForecastDashboard({
  result,
  scenarios,
  match,
  rows,
  currency,
  grossMargin,
  blockers,
}: {
  result: ForecastResult;
  scenarios: Scenario[];
  match: BenchmarkMatch;
  rows: ComparisonRow[];
  currency: string;
  grossMargin: number | null;
  blockers: string[];
}) {
  if (blockers.length || result.budget.value === null) {
    return <EmptyState title="Your forecast will appear here" items={blockers.length ? blockers : ["Enter a monthly advertising budget"]} />;
  }
  const r = result;
  const names = CONVERSION_NAME[r.objective];
  const kpis: Kpi[] = [
    { label: "Monthly Ad Budget", value: formatCurrency(r.budget.value, currency) },
    ...pick(r.clicks.value !== null, { label: "Est. Clicks", value: formatNumber(r.clicks.value), caption: "Budget ÷ CPC", tip: TIPS.cpc }),
    ...pick(r.objective === "leads" && r.leads.value !== null, { label: "Est. Leads", value: formatNumber(r.leads.value, 1), caption: "Clicks × conversion rate" }),
    ...pick(r.objective === "traffic" && r.leads.value !== null, { label: "Est. Conversions", value: formatNumber(r.leads.value, 1), caption: "Clicks × conversion rate" }),
    ...pick(r.objective === "leads" && r.costPerLead.value !== null, { label: "Est. Cost per Lead", value: formatCurrency(r.costPerLead.value, currency) }),
    ...pick(r.customers.value !== null, { label: `Est. ${names.plural}`, value: formatNumber(r.customers.value, 1), caption: r.objective === "leads" ? "Leads × close rate" : "Clicks × conversion rate" }),
    ...pick(r.revenue.value !== null, { label: "Est. Revenue", value: formatCurrency(r.revenue.value, currency), tone: "accent" }),
    ...pick(r.cpa.value !== null, { label: names.cpa, value: formatCurrency(r.cpa.value, currency), tip: TIPS.cpa }),
    ...pick(r.roas.value !== null, { label: "Projected ROAS", value: formatRoas(r.roas.value), tone: "accent", tip: TIPS.roas }),
    ...pick(r.breakEvenRoas.value !== null, { label: "Break-even ROAS", value: formatRoas(r.breakEvenRoas.value), caption: "1 ÷ gross margin" }),
    ...pick(r.contributionProfit.value !== null, {
      label: "Est. Profit After Ads",
      value: formatCurrency(r.contributionProfit.value, currency),
      tone: (r.contributionProfit.value ?? 0) < 0 ? "negative" : "positive",
      caption: "Gross profit − ad spend",
    }),
  ];
  const revenueMissing = r.revenue.value === null ? r.missingForRevenue : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold tracking-tight text-ink">Your Forecast</h2>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/25">Projection, not actual campaign results</span>
      </div>
      <KPIGrid items={kpis} label="Forecast key metrics" />
      {revenueMissing.length > 0 && (
        <div className="rounded-xl border border-line bg-white p-4 text-sm leading-6 text-body">
          <p className="font-semibold text-ink">To forecast revenue and ROAS, add:</p>
          <ul className="mt-1 list-disc pl-5">{revenueMissing.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      )}
      {r.revenue.value !== null && (
        <PerformanceChart
          title="Spend, revenue and profit"
          description="All values use your currency and the same scale. Profit is estimated before overhead, taxes, agency fees, refunds and other costs not included in gross margin."
          currency={currency}
          bars={[
            { label: "Advertising spend", value: r.budget.value, color: "bg-slate-500" },
            { label: "Estimated revenue", value: r.revenue.value, color: "bg-brand" },
            { label: "Estimated gross profit", value: r.grossProfit.value, color: "bg-coral" },
            { label: "Est. contribution profit after ads", value: r.contributionProfit.value, color: (r.contributionProfit.value ?? 0) < 0 ? "bg-brand-hover" : "bg-green-600" },
          ]}
        />
      )}
      <BenchmarkComparison match={match} rows={rows} currency={currency} />
      {r.clicks.value !== null && <BudgetScenarios scenarios={scenarios} objective={r.objective} currency={currency} />}
      {r.objective !== "traffic" || r.revenue.value !== null ? (
        <BreakEvenAnalysis grossMargin={grossMargin} breakEvenRoas={r.breakEvenRoas.value} roas={r.roas.value} gap={r.roasGap.value} />
      ) : null}
      {r.breakEvenCpa.value !== null && (
        <p className="rounded-xl bg-blush p-4 text-sm leading-6 text-body">
          <strong className="text-ink">Break-even CPA: {formatCurrency(r.breakEvenCpa.value, currency)}.</strong> That&apos;s the most you can pay to acquire one{" "}
          {r.objective === "purchases" ? "purchase" : "customer"} and still cover it from that sale&apos;s gross profit, based on your{" "}
          {r.objective === "purchases" ? "average order value" : "average customer value"} and margin.
        </p>
      )}
    </div>
  );
}

export function ActualDashboard({
  result,
  spend,
  revenue,
  currency,
  grossMargin,
  blockers,
}: {
  result: ActualResult;
  spend: number | null;
  revenue: number | null;
  currency: string;
  grossMargin: number | null;
  blockers: string[];
}) {
  if (blockers.length) return <EmptyState title="Your actual performance will appear here" items={blockers} />;
  const a = result;
  const kpis: Kpi[] = [
    ...pick(a.roas.value !== null, { label: "Actual ROAS", value: formatRoas(a.roas.value), tone: "accent", caption: "Revenue ÷ ad spend", tip: TIPS.roas }),
    ...pick(a.breakEvenRoas.value !== null, { label: "Break-even ROAS", value: formatRoas(a.breakEvenRoas.value), caption: "1 ÷ gross margin" }),
    ...pick(a.contributionProfit.value !== null, {
      label: "Ad-Level Contribution Profit",
      value: formatCurrency(a.contributionProfit.value, currency),
      tone: (a.contributionProfit.value ?? 0) < 0 ? "negative" : "positive",
      caption: "Revenue × margin − spend",
    }),
    ...pick(a.cpa.value !== null, { label: "Actual CPA", value: formatCurrency(a.cpa.value, currency), tip: TIPS.cpa }),
    ...pick(a.costPerLead.value !== null, { label: "Cost per Lead", value: formatCurrency(a.costPerLead.value, currency) }),
    ...pick(a.cpc.value !== null, { label: "Actual CPC", value: formatCurrency(a.cpc.value, currency), tip: TIPS.cpc }),
    ...pick(a.ctr.value !== null, { label: "Click-through Rate", value: formatPercent(a.ctr.value) }),
    ...pick(a.conversionRate.value !== null, { label: "Conversion Rate", value: formatPercent(a.conversionRate.value), caption: "Purchases or customers ÷ clicks" }),
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold tracking-tight text-ink">Your Actual Performance</h2>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800 ring-1 ring-inset ring-green-600/20">Actual Campaign Data you entered</span>
      </div>
      <KPIGrid items={kpis} label="Actual performance metrics" />
      {a.grossProfit.value !== null && (
        <PerformanceChart
          title="Spend, revenue and profit"
          description="Calculated from the results you entered. Profit is before overhead, taxes, agency fees, refunds and other costs not included in gross margin."
          currency={currency}
          bars={[
            { label: "Ad spend", value: spend, color: "bg-slate-500" },
            { label: "Attributed revenue", value: revenue, color: "bg-brand" },
            { label: "Gross profit", value: a.grossProfit.value, color: "bg-coral" },
            { label: "Contribution profit after ads", value: a.contributionProfit.value, color: (a.contributionProfit.value ?? 0) < 0 ? "bg-brand-hover" : "bg-green-600" },
          ]}
        />
      )}
      <BreakEvenAnalysis grossMargin={grossMargin} breakEvenRoas={a.breakEvenRoas.value} roas={a.roas.value} gap={a.roasGap.value} roasLabel="Actual ROAS" />
    </div>
  );
}
