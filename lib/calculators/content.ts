import type { Faq } from "@/lib/services";

/** Formula reference shown on the calculator page; mirrors lib/calculators/roas.ts exactly. */
export const FORMULAS = [
  { name: "Estimated clicks", formula: "Budget ÷ CPC", note: "How many visits the budget buys at your average cost per click." },
  { name: "Estimated leads or purchases", formula: "Clicks × conversion rate", note: "Conversions are leads, purchases or customers depending on your goal." },
  { name: "Estimated customers (lead generation)", formula: "Leads × lead-to-customer close rate", note: "Only part of your leads become paying customers." },
  { name: "Estimated revenue", formula: "Customers × customer value  |  Purchases × AOV", note: "Traffic forecasts show revenue only if you add a value per conversion." },
  { name: "ROAS", formula: "Revenue ÷ ad spend", note: "Return on ad spend. 4x means four units of revenue per unit spent." },
  { name: "CPA", formula: "Ad spend ÷ customers (or purchases)", note: "What it costs, on average, to acquire one customer or purchase." },
  { name: "Gross profit", formula: "Revenue × gross margin", note: "Revenue left after the direct cost of what you sold." },
  { name: "Contribution profit after ads", formula: "Gross profit − ad spend", note: "Before overhead, tax, fees, refunds and other costs." },
  { name: "Break-even ROAS", formula: "1 ÷ gross margin", note: "The ROAS at which gross profit exactly covers ad spend." },
  { name: "Break-even CPA", formula: "Customer value × gross margin", note: "The most you can pay per customer from that customer's gross profit." },
] as const;

export const roasCalculatorFaqs: Faq[] = [
  {
    q: "What is ROAS?",
    a: "ROAS (return on ad spend) is the revenue attributed to your advertising divided by what you spent on those ads. A ROAS of 4x means every 1 spent on ads brought in 4 in revenue. It measures revenue, not profit, so it should always be read alongside your margins.",
  },
  {
    q: "How do you calculate ROAS?",
    a: "Divide attributed revenue by ad spend. If a campaign cost 2,000 and generated 8,000 in sales, ROAS is 8,000 ÷ 2,000 = 4x. Use revenue from the same attribution source for every campaign you compare, because ad platforms, analytics tools and your store can each report different numbers for the same sales.",
  },
  {
    q: "What is a good ROAS?",
    a: "There is no single good ROAS. It depends on your gross margin and costs. A useful test is whether your ROAS is comfortably above your break-even ROAS. A business with a 70% margin can be profitable at 2x, while a business with a 20% margin needs more than 5x just to break even on ad spend.",
  },
  {
    q: "What is break-even ROAS?",
    a: "Break-even ROAS is the return at which the gross profit from ad-driven sales exactly covers the ad spend. It equals 1 ÷ gross margin: at a 50% margin it is 2x, at 40% it is 2.5x and at 25% it is 4x. Below that level, the campaign loses money before any other costs are counted.",
  },
  {
    q: "How much should a business spend on ads?",
    a: "Work backwards from what a customer is worth. Start with your break-even CPA (customer value × gross margin), then choose a budget large enough to buy a meaningful number of clicks, since budget ÷ CPC = clicks. That gives you enough conversions to measure your real conversion rate. Increase spend only when results stay above break-even, and expect costs to change as you scale.",
  },
  {
    q: "Why does ROAS differ by industry?",
    a: "Industries differ in price points, margins, competition for the same keywords and audiences (which drives CPC), how long customers take to decide, and how often they buy again. A high-ticket service with a long sales cycle and a low-cost product bought on impulse will produce very different ROAS even with well-run campaigns.",
  },
  {
    q: "What is the difference between ROAS and profit?",
    a: "ROAS uses revenue, while profit subtracts costs. A campaign can show a healthy-looking 3x ROAS and still lose money: at a 25% gross margin, 3,000 of revenue from 1,000 of spend leaves 750 of gross profit, which is 250 less than the ad spend. That is why this calculator shows contribution profit and break-even ROAS next to ROAS.",
  },
  {
    q: "How are industry advertising benchmarks collected?",
    a: "Benchmark reports are usually compiled by ad-tech companies, agencies or platforms that aggregate anonymised data from many advertiser accounts, then publish averages or medians by industry. Results vary with the sample, country, year, campaign type and how each metric is defined, so benchmarks are a reference point rather than a target. This calculator only shows a benchmark when it has been verified against the original source, with the publisher, year, coverage and a link displayed. Where no verified benchmark matches your industry, platform and country, it uses your own assumptions instead.",
  },
];
