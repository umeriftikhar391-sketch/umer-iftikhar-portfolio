import Link from "next/link";
import { ArrowUpRight, Lock, MailX, Calculator as CalculatorIcon } from "lucide-react";
import Calculator from "@/components/tools/roas-calculator/Calculator";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/sections/FaqList";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { roasCalculatorFaqs, FORMULAS } from "@/lib/calculators/content";

const PATH = "/tools/roas-calculator";
const TITLE = "Free ROAS Calculator & Ad Budget Planner | Umer Iftikhar";
const DESCRIPTION =
  "Calculate ROAS, CPA, break-even ROAS and estimated profit for Google Ads and Meta Ads. Forecast an ad budget or analyse actual campaign results, free and in your browser.";

const base = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });
// Page-level openGraph replaces the inherited object, so reference the site's share image explicitly.
const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Umer Iftikhar, Performance Marketing Specialist & Web Developer" }];
export const metadata = { ...base, openGraph: { ...base.openGraph, images }, twitter: { ...base.twitter, images } };

function schema() {
  const url = absoluteUrl(PATH);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#app` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "Ad Budget & ROAS Calculator",
      url,
      description: DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (runs in a web browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@id": `${siteConfig.url}/#person` },
      featureList: [
        "Ad budget forecast for Meta Ads, Google Search and Google Display",
        "Actual ROAS, CPA and contribution profit from campaign results",
        "Break-even ROAS and break-even CPA",
        "Budget scenario comparison",
      ],
    },
  ];
}

const RELATED = [
  { href: "/services/meta-ads", title: "Meta Ads management", text: "Facebook and Instagram campaigns built around cost per lead and ROAS." },
  { href: "/services/google-ads", title: "Google Ads management", text: "Search, Performance Max and Display campaigns for high-intent demand." },
  { href: "/services/analytics-tracking", title: "Analytics & tracking", text: "Accurate conversion data so ROAS numbers can be trusted." },
  { href: "/services/conversion-optimization", title: "Conversion optimization", text: "Raise conversion rate, the fastest lever on CPA and ROAS." },
];

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
              Ad Budget &amp; ROAS Calculator <span className="text-brand">Industry Benchmark Edition</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-body">
              Estimate what a monthly ad budget could deliver on Meta Ads or Google Ads: clicks, leads, customers, revenue, ROAS, CPA and
              profit after ad spend. Or enter your real campaign results to calculate actual ROAS and see how far you are from
              break-even.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-body">
              <li className="flex items-center gap-2"><Lock aria-hidden className="h-4 w-4 text-brand-hover" /> Calculations run in your browser</li>
              <li className="flex items-center gap-2"><MailX aria-hidden className="h-4 w-4 text-brand-hover" /> No email needed to see results</li>
              <li className="flex items-center gap-2"><CalculatorIcon aria-hidden className="h-4 w-4 text-brand-hover" /> Formulas shown below</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Calculator" className="px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Calculator />
        </div>
      </section>

      <Section glow="left" id="formulas">
        <SectionHeading
          eyebrow="How it works"
          title={<>The formulas behind <span className="text-brand">every number</span></>}
          intro="The calculator uses standard performance-marketing arithmetic. Nothing is hidden: every result comes from these formulas and the assumptions you enter."
        />
        <dl className="mt-12 grid gap-4 md:grid-cols-2">
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
          <SectionHeading eyebrow="FAQ" title={<>ROAS and ad budget <span className="text-brand">questions</span></>} />
          <FaqList faqs={roasCalculatorFaqs} path={PATH} />
        </div>
      </Section>

      <Section glow="right">
        <SectionHeading eyebrow="Get help" title={<>Turn the forecast into <span className="text-brand">real campaigns</span></>} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((r) => (
            <Link key={r.href} href={r.href} className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift">
              <span className="flex items-start justify-between gap-3 font-bold text-ink">
                {r.title}
                <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-brand" />
              </span>
              <span className="mt-2 text-sm leading-6 text-body">{r.text}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
