import Link from "next/link";
import { Lock, MailX, Calculator as CalculatorIcon } from "lucide-react";
import Calculator from "@/components/tools/roas-calculator/Calculator";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/sections/FaqList";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { roasCalculatorFaqs, FORMULAS } from "@/lib/calculators/content";

const PATH = "/tools/roas-calculator";
const TITLE = "Free ROAS Calculator & Break-Even ROAS | Umer Iftikhar";
const DESCRIPTION =
  "Use this free ROAS calculator to calculate return on ad spend, CPA and break-even ROAS. Forecast ad results or analyse your actual campaign performance.";
const H1 = "Free ROAS Calculator & Ad Budget Planner";

// absoluteTitle stops the root "%s | Umer Iftikhar" template from repeating the name.
// The Open Graph and Twitter images come from ./opengraph-image.tsx in this segment.
export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website", absoluteTitle: true });

const SOURCES = {
  metaRoas: "https://www.facebook.com/business/help/1283504535023899",
  googleValues: "https://support.google.com/google-ads/answer/13064207",
  googleAttribution: "https://support.google.com/google-ads/answer/6259715",
};

function schema() {
  const url = absoluteUrl(PATH);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: H1,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#app` },
      author: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "ROAS Calculator & Ad Budget Planner",
      url,
      description:
        "Browser-based calculator for return on ad spend, CPA, break-even ROAS and contribution profit after ads, from actual campaign results or forecast assumptions.",
      applicationCategory: "BusinessApplication",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      inLanguage: "en",
      creator: { "@id": `${siteConfig.url}/#person` },
      featureList: [
        "Actual ROAS, CPA, cost per lead and contribution profit from entered campaign results",
        "Forecast clicks, leads, customers, revenue and ROAS from a budget and your assumptions",
        "Break-even ROAS and break-even CPA from gross margin",
        "Budget scenario comparison",
        "Copy results and share forecast assumptions by link",
      ],
    },
  ];
}

const prose = "max-w-3xl text-lg leading-8 text-body";
const link = "font-medium text-brand-hover underline decoration-brand/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-brand";
const h3 = "mt-10 text-2xl font-bold tracking-tight text-ink";

function Formula({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-mono text-lg font-semibold text-brand-hover">{children}</p>
    </div>
  );
}

function Example({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mt-5 max-w-3xl rounded-2xl border border-amber-600/25 bg-amber-50/60 p-6">
      <p className="text-sm font-semibold text-amber-800">Hypothetical example, not campaign data</p>
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        {rows.map(([term, value]) => (
          <div key={term} className="contents">
            <dt className="font-semibold text-ink">{term}</dt>
            <dd className="font-mono text-body">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {children}
    </a>
  );
}

export default function RoasCalculatorPage() {
  return (
    <>
      <JsonLd data={schema()} />
      <section className="relative px-5 pb-10 pt-32 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ name: "ROAS Calculator", path: PATH }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Free Tool</p>
            <h1 className="mt-6 text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink">
              Free ROAS Calculator <span className="text-brand">&amp; Ad Budget Planner</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-body">
              Calculate your return on ad spend from campaign revenue and advertising costs, or forecast results from your budget and
              assumptions. See ROAS, CPA, break-even ROAS and estimated contribution profit.
            </p>
            <p className="mt-4 max-w-2xl text-pretty leading-7 text-body">
              Actual mode calculates from the results you enter. Forecast mode projects from your assumptions, so its numbers are
              estimates, not guarantees. ROAS measures revenue returned, not profit.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-body">
              <li className="flex items-center gap-2"><Lock aria-hidden className="h-4 w-4 text-brand-hover" /> Calculations run in your browser</li>
              <li className="flex items-center gap-2"><MailX aria-hidden className="h-4 w-4 text-brand-hover" /> Free, no email needed to see results</li>
              <li className="flex items-center gap-2"><CalculatorIcon aria-hidden className="h-4 w-4 text-brand-hover" /> Formulas shown below</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="ROAS calculator" className="px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Calculator />
        </div>
      </section>

      <Section glow="left" id="how-to-use">
        <SectionHeading eyebrow="Step by step" title={<>How to use this <span className="text-brand">ROAS calculator</span></>} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h3 className="text-xl font-bold tracking-tight text-ink">Calculate your actual ROAS</h3>
            <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-body marker:font-semibold marker:text-brand">
              <li>Select <strong className="text-ink">Calculate My Actual ROAS</strong>, then choose your industry, the platform the results came from and your target country.</li>
              <li>Pick your currency and enter total ad spend and the revenue attributed to those ads, for the same period.</li>
              <li>Add purchases or new customers to get CPA, and your gross margin to get contribution profit and break-even ROAS.</li>
              <li>Optionally add clicks, leads and impressions for CPC, cost per lead, click-through rate and conversion rate.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h3 className="text-xl font-bold tracking-tight text-ink">Forecast results from a budget</h3>
            <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-body marker:font-semibold marker:text-brand">
              <li>Keep <strong className="text-ink">Forecast My Results</strong> selected and choose your industry, platform and country.</li>
              <li>Enter a monthly budget and your goal: leads, purchases, customers or website traffic.</li>
              <li>Enter your assumptions: CPC, conversion rate, close rate for leads, customer value or average order value, and gross margin. Use your own past numbers where you have them.</li>
              <li>Compare projected ROAS with break-even ROAS and the budget scenarios, then copy the results or a share link.</li>
            </ol>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-body">
          The example button loads round numbers labelled <em>Illustrative Scenario</em>; they are not industry averages. Share links include
          forecast assumptions only, never the actual results you enter.
        </p>
      </Section>

      <Section id="how-to-calculate-roas">
        <SectionHeading eyebrow="Formula" title={<>How to calculate <span className="text-brand">ROAS</span></>} />
        <p className={`mt-8 ${prose}`}>
          ROAS is calculated by dividing the revenue attributed to your ads by what you spent on those ads over the same period. The result is
          written as a multiple (4x) or a percentage (400%).
        </p>
        <Formula label="ROAS formula">ROAS = attributable revenue ÷ advertising spend</Formula>
        <Example rows={[["Ad spend", "PKR 10,000"], ["Attributed revenue", "PKR 40,000"], ["ROAS", "40,000 ÷ 10,000 = 4x, or 400%"]]} />
        <p className={`mt-8 ${prose}`}>
          A 400% ROAS is not 400% profit or ROI. It says revenue was four times the ad spend, but nothing has been subtracted yet for the cost
          of what you sold, delivery, fees or overhead. The margin-based measures below show what is actually left.
        </p>
        <p className={`mt-5 ${prose}`}>
          Keep both inputs consistent: the same currency, the same date range and the same campaigns. A month of spend against a quarter of
          revenue, or one platform&apos;s spend against all store revenue, produces a ROAS that describes nothing real.
        </p>
      </Section>

      <Section glow="right" id="break-even-roas">
        <SectionHeading eyebrow="Profit floor" title={<>Break-even ROAS calculator <span className="text-brand">explained</span></>} />
        <p className={`mt-8 ${prose}`}>
          Break-even ROAS is the lowest ROAS at which the gross profit from ad-driven sales covers the ad spend. The calculator shows it as
          soon as you enter a gross margin, in both modes.
        </p>
        <Formula label="Break-even ROAS formula">Break-even ROAS = 1 ÷ gross margin (as a decimal)</Formula>
        <Example rows={[["Gross margin", "40% = 0.40"], ["Break-even ROAS", "1 ÷ 0.40 = 2.5x"]]} />
        <p className={`mt-8 ${prose}`}>
          Below 2.5x in this example, the ads cost more than the gross profit they bring in. Above it, each sale contributes something
          towards your other costs.
        </p>
        <h3 className={h3}>What the margin should include</h3>
        <p className={`mt-4 ${prose}`}>
          Use the share of revenue left after the direct costs of each sale: product or service cost, packaging, delivery you pay for,
          payment fees and any marketplace commission. Leave ad spend out, because break-even ROAS is the number ad spend is compared against.
        </p>
        <h3 className={h3}>What it leaves out</h3>
        <p className={`mt-4 ${prose}`}>
          Rent, salaries, software, agency fees, tax and any refunds not already reflected in your margin are not covered. Treat break-even
          ROAS as the floor at which ads pay for themselves, not the point at which the whole business becomes profitable.
        </p>
      </Section>

      <Section id="platforms">
        <SectionHeading eyebrow="Platforms" title={<>Using ROAS for Meta Ads, Google Ads <span className="text-brand">and ecommerce</span></>} />
        <p className={`mt-8 ${prose}`}>
          The calculation is the same on every platform: attributed revenue ÷ spend. What changes is where the revenue figure comes from and
          which sales each platform claims. This calculator does not connect to your ad accounts, so you enter the figures yourself.
        </p>
        <h3 className={h3}>Meta Ads (Facebook and Instagram)</h3>
        <p className={`mt-4 ${prose}`}>
          Meta reports{" "}
          <External href={SOURCES.metaRoas}>website purchase ROAS</External> as the conversion value of website purchases divided by the amount
          spent, and may use statistical modelling where some purchase events cannot be counted directly. Reported results depend on the
          attribution setting, so compare campaigns under the same setting. For hands-on help, see{" "}
          <Link href="/services/meta-ads" className={link}>Meta Ads management</Link>.
        </p>
        <h3 className={h3}>Google Ads</h3>
        <p className={`mt-4 ${prose}`}>
          Google Ads shows the same idea as conversion value divided by cost, which only works once your conversion actions{" "}
          <External href={SOURCES.googleValues}>have values assigned</External>. The{" "}
          <External href={SOURCES.googleAttribution}>attribution model</External> on each conversion action, data-driven or last click, changes
          how credit is shared between ad interactions, so check which model a figure uses before comparing it with another source. See{" "}
          <Link href="/services/google-ads" className={link}>Google Ads management</Link> for search, Performance Max and Display campaigns.
        </p>
        <h3 className={h3}>Ecommerce stores</h3>
        <p className={`mt-4 ${prose}`}>
          Decide which revenue you mean: gross sales or revenue after discounts, tax and shipping, and before or after refunds and
          cancellations. Use the same definition every month. A strong ROAS on orders that are later refunded overstates what the ads
          actually earned.
        </p>
        <h3 className={h3}>Comparing platforms and customer value</h3>
        <p className={`mt-4 ${prose}`}>
          Meta, Google and your analytics tool can each claim credit for the same order, so adding platform-reported revenue together
          usually double-counts it. For a cross-platform view, use your store or CRM as the reference. Label what the revenue represents
          too: first-order revenue and lifetime customer value produce very different ROAS and should not be mixed in one comparison. When
          the figures do not reconcile, <Link href="/services/analytics-tracking" className={link}>analytics and conversion tracking</Link>{" "}
          is usually the place to start.
        </p>
      </Section>

      <Section glow="left" id="formulas">
        <SectionHeading eyebrow="Metrics" title={<>ROAS, CPA and <span className="text-brand">contribution profit</span></>} />
        <p className={`mt-8 ${prose}`}>
          ROAS shows how much revenue came back for each unit of spend. CPA shows what each result cost. Contribution profit after ads shows
          what is left once the direct costs of those sales and the ad spend are paid.
        </p>
        <p className={`mt-5 ${prose}`}>
          Each cost metric names what it divides by. Cost per lead divides spend by leads, cost per acquired customer divides it by paying
          customers, and cost per purchase divides it by orders. A low cost per lead can still mean an expensive customer when few leads
          close. A higher conversion rate lowers CPA and raises ROAS at the same spend, which is why{" "}
          <Link href="/services/conversion-optimization" className={link}>conversion rate optimization</Link> can matter as much as bidding.
        </p>
        <h3 className={h3}>Every formula the calculator uses</h3>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {FORMULAS.map((f) => (
            <div key={f.name} className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <dt className="font-bold text-ink">{f.name}</dt>
              <dd className="mt-2 font-mono text-sm text-brand-hover">{f.formula}</dd>
              <dd className="mt-2 text-sm leading-6 text-body">{f.note}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-body">
          Profit figures are estimates before overhead, salaries, taxes, agency fees, refunds and any other costs not included in your
          gross margin. Forecasts are projections from your assumptions, not guaranteed or actual campaign results.
        </p>
      </Section>

      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title={<>ROAS calculator <span className="text-brand">questions</span></>} />
          <FaqList faqs={roasCalculatorFaqs} path={PATH} />
        </div>
      </Section>

      <Section glow="right">
        <SectionHeading eyebrow="Get help" title={<>Improve your campaign <span className="text-brand">results</span></>} />
        <p className={`mt-8 ${prose}`}>
          Need help improving your campaign results or validating your tracking? Discuss your setup with me.
        </p>
        <div className="mt-8">
          <Button href="/contact" cta="roas_calculator_page_contact">Discuss your setup</Button>
        </div>
      </Section>
    </>
  );
}
