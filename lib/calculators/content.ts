import type { Faq } from "@/lib/services";

/**
 * Formula reference shown on the calculator page; mirrors lib/calculators/roas.ts exactly.
 * Each cost metric names its denominator, so cost per lead is never presented as cost per customer.
 */
export const FORMULAS = [
  { name: "ROAS", formula: "Attributed revenue ÷ ad spend", note: "4x (400%) means four units of revenue for every unit spent. Revenue, not profit." },
  { name: "Cost per lead (CPL)", formula: "Ad spend ÷ leads", note: "Shown for the lead generation goal, and in actual mode when you enter leads." },
  { name: "Cost per acquired customer (CPA)", formula: "Ad spend ÷ acquired customers", note: "For lead generation, customers = leads × close rate, so this is higher than cost per lead." },
  { name: "Cost per purchase (CPA)", formula: "Ad spend ÷ purchases", note: "Used for the purchases goal. In actual mode, CPA divides by the purchases or new customers you enter." },
  { name: "Gross profit", formula: "Revenue × gross margin", note: "Revenue left after the direct cost of what you sold." },
  { name: "Contribution profit after ads", formula: "Revenue × margin − ad spend", note: "Before overhead, salaries, tax, fees, refunds and other costs not in your margin." },
  { name: "Break-even ROAS", formula: "1 ÷ gross margin (as a decimal)", note: "The ROAS at which gross profit exactly covers ad spend." },
  { name: "Break-even CPA", formula: "Customer value (or AOV) × gross margin", note: "The most you can pay per customer or purchase from that sale's gross profit." },
  { name: "Forecast clicks", formula: "Budget ÷ CPC", note: "How many visits the budget buys at your assumed cost per click." },
  { name: "Forecast conversions", formula: "Clicks × conversion rate", note: "Leads, purchases or customers, depending on the goal you choose." },
  { name: "Forecast revenue", formula: "Customers × customer value  |  Purchases × AOV", note: "Traffic forecasts show revenue only if you add a value per conversion." },
] as const;

export const roasCalculatorFaqs: Faq[] = [
  {
    q: "What is ROAS?",
    a: "ROAS (return on ad spend) is the revenue attributed to your advertising divided by what you spent on those ads. A ROAS of 4x means every 1 spent on ads brought in 4 in revenue. It measures revenue, not profit, so read it alongside your margin.",
  },
  {
    q: "How do you calculate ROAS?",
    a: "Divide attributed revenue by ad spend, using the same currency and the same date range for both. If ads cost PKR 10,000 and brought in PKR 40,000 of attributed revenue, ROAS is 40,000 ÷ 10,000 = 4x, also written as 400%. Use one attribution source when you compare campaigns, because ad platforms, analytics tools and your store can report different revenue for the same sales.",
  },
  {
    q: "What is a good ROAS?",
    a: "There is no single good ROAS. It depends on your gross margin, price point and other costs. A useful test is whether ROAS is comfortably above your break-even ROAS: a business with a 70% margin breaks even at about 1.43x, while a business with a 20% margin needs 5x just to cover ad spend.",
  },
  {
    q: "What is break-even ROAS?",
    a: "Break-even ROAS is the ROAS at which gross profit from ad-driven sales exactly covers the ad spend. It equals 1 ÷ gross margin as a decimal: at a 40% margin, 1 ÷ 0.40 = 2.5x. It only covers the costs inside your margin, so overhead, salaries and tax still have to be paid from anything above it.",
  },
  {
    q: "Does 4x ROAS mean a campaign is profitable?",
    a: "Not necessarily. At a 40% margin, PKR 40,000 of revenue from PKR 10,000 of spend leaves PKR 6,000 of contribution profit after ads. At a 20% margin, the same 4x ROAS leaves PKR 8,000 of gross profit, which is PKR 2,000 less than the ad spend. Even a positive contribution profit is before overhead and other costs.",
  },
  {
    q: "Can I use this for Facebook, Instagram and Google Ads?",
    a: "Yes. The ROAS formula is the same on every platform. Choose Meta Ads (Facebook and Instagram), Google Search Ads or Google Display Ads, then enter numbers from your reports. The calculator does not connect to your ad accounts, and each platform attributes conversions in its own way, so use figures you trust.",
  },
  {
    q: "Are the forecasts based on industry benchmarks?",
    a: "No. The calculator does not currently include any verified benchmark data, so every forecast is built from the assumptions you enter. Choosing an industry or country labels your forecast but does not load local averages. The optional example values are round illustrative numbers, not industry data.",
  },
  {
    q: "Does selecting a currency convert my inputs?",
    a: "No. The currency only changes how amounts are labelled and formatted. No exchange rates are applied, and choosing a country may suggest a currency without changing any number you entered. Enter every amount in the same currency.",
  },
  {
    q: "How much should a business spend on ads?",
    a: "Work backwards from what a customer is worth. Start with your break-even CPA (customer value × gross margin), then choose a budget large enough to buy a meaningful number of clicks, since budget ÷ CPC = clicks. That gives you enough conversions to measure your real conversion rate. Increase spend only when results stay above break-even, and expect costs to change as you scale.",
  },
];
