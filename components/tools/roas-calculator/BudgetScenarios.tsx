import type { Objective, Scenario } from "@/lib/calculators/types";
import { formatCurrency, formatNumber, formatRoas } from "@/lib/calculators/format";

export const SCENARIO_DISCLAIMER =
  "These scenarios hold CPC, conversion rate, customer value, and other assumptions constant. Real advertising performance may change as budgets scale.";

const CONVERSION_LABEL: Record<Objective, string> = { leads: "Est. Leads", purchases: "Est. Purchases", customers: "Est. Customers", traffic: "Est. Conversions" };

export default function BudgetScenarios({ scenarios, objective, currency }: { scenarios: Scenario[]; objective: Objective; currency: string }) {
  const showRevenue = scenarios.some((s) => s.revenue !== null);
  const showProfit = scenarios.some((s) => s.contributionProfit !== null);
  const showConversions = scenarios.some((s) => s.conversions !== null);
  return (
    <section aria-labelledby="calc-scenarios-heading" className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h3 id="calc-scenarios-heading" className="text-lg font-bold tracking-tight text-ink">Budget Scenario Comparison</h3>
      <p className="mt-1 text-sm leading-6 text-body">{SCENARIO_DISCLAIMER}</p>
      <p className="mt-3 text-xs text-slate-500 sm:hidden">Scroll the table sideways to see every column.</p>
      <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="Budget scenarios table (scrollable)">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Forecast at half, the same, one and a half and double your budget</caption>
          <thead>
            <tr className="border-b border-line text-slate-500">
              <th scope="col" className="py-2 pr-3 font-semibold">Scenario</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Budget</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Est. Clicks</th>
              {showConversions && <th scope="col" className="py-2 pr-3 font-semibold">{CONVERSION_LABEL[objective]}</th>}
              {showRevenue && <th scope="col" className="py-2 pr-3 font-semibold">Est. Revenue</th>}
              {showRevenue && <th scope="col" className="py-2 pr-3 font-semibold">Projected ROAS</th>}
              {showProfit && <th scope="col" className="py-2 font-semibold">Est. Profit After Ads</th>}
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s) => {
              const current = s.multiplier === 1;
              return (
                <tr key={s.multiplier} className={`border-b border-line last:border-0 ${current ? "bg-blush" : ""}`}>
                  <th scope="row" className="py-3 pl-2 pr-3 font-semibold text-ink">
                    <span className="whitespace-nowrap">{s.multiplier}×</span>{" "}
                    {current && <span className="ml-1 whitespace-nowrap rounded-full bg-rose px-2 py-0.5 text-[0.6875rem] text-brand-hover">Your budget</span>}
                  </th>
                  <td className="py-3 pr-3 tabular-nums text-ink">{formatCurrency(s.budget, currency, { compact: true })}</td>
                  <td className="py-3 pr-3 tabular-nums text-ink">{formatNumber(s.clicks)}</td>
                  {showConversions && <td className="py-3 pr-3 tabular-nums text-ink">{formatNumber(s.conversions, 1)}</td>}
                  {showRevenue && <td className="py-3 pr-3 tabular-nums text-ink">{formatCurrency(s.revenue, currency, { compact: true })}</td>}
                  {showRevenue && <td className="py-3 pr-3 tabular-nums text-ink">{formatRoas(s.roas)}</td>}
                  {showProfit && (
                    <td className={`py-3 tabular-nums ${s.contributionProfit !== null && s.contributionProfit < 0 ? "text-brand-hover" : "text-ink"}`}>
                      {formatCurrency(s.contributionProfit, currency, { compact: true })}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        In real campaigns, CPC often rises and conversion rates can fall as you reach beyond your best audiences. Spending more does not
        guarantee proportionally more customers.
      </p>
    </section>
  );
}
