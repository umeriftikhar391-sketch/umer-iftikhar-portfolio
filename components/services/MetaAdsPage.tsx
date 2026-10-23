import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ItemGrid from "@/components/sections/ItemGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqList from "@/components/sections/FaqList";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import type { Service } from "@/lib/services";

const included = [
  "Campaign and account audits",
  "Audience research for prospecting and retargeting",
  "Campaign planning, setup and ongoing management",
  "Facebook and Instagram placements, including Feed, Stories and Reels",
  "Ecommerce sales campaigns",
  "Lead generation campaigns using Instant Forms, messaging or your website forms",
  "Retargeting campaigns",
  "Creative testing strategy, ad copy and creative briefs",
  "Budget monitoring and optimisation",
  "Meta Pixel and Conversions API review or setup",
  "Conversion tracking validation in Events Manager",
  "Performance reporting",
  "Landing-page recommendations",
];
const measurement = [
  { title: "Ecommerce", points: [
    "Purchases and purchase value",
    "Return on ad spend and cost per purchase",
    "Add-to-cart and checkout rates, to see where buyers drop off",
    "Comparison with your store's own sales data",
  ] },
  { title: "Lead generation", points: [
    "Leads and cost per lead",
    "Lead quality, using your feedback or CRM data on which leads became customers",
    "Booked calls or consultations, where these are tracked",
    "How quickly leads are contacted, since slow follow-up lowers conversion",
  ] },
];
const proof = [
  { slug: "building-block", name: "Building Block Junior & High", category: "Education · Lead generation", text: "Radius-targeted Meta campaigns with lead forms and direct messaging, timed around admission season, to generate admission enquiries from parents in nearby areas." },
  { slug: "khatkaar", name: "Khatkaar", category: "Urdu calligraphy · Ecommerce", text: "Meta campaigns optimised for purchases, with interest-based prospecting, retargeting and Meta Pixel tracking for a niche brand's Shopify store." },
  { slug: "decordreams", name: "Decordreams", category: "Furniture & interior · Lead generation", text: "Meta campaigns and retargeting that brought furniture buyers to a new website, with creative, audiences and landing pages adjusted based on enquiries." },
];
const complementary = [
  { slug: "analytics-tracking", name: "Analytics & Tracking", text: "GA4, Google Tag Manager and Conversions API work beyond a standard ad account setup." },
  { slug: "conversion-optimization", name: "Conversion Optimization", text: "Landing-page and funnel improvements when the page, not the ad, is losing visitors." },
  { slug: "google-ads", name: "Google Ads", text: "Search campaigns that reach people already looking for what you sell." },
];
const linkClass = "text-red-400 underline decoration-red-500/40 underline-offset-4 hover:text-red-300";
const cardClass = "rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8";

export default function MetaAdsPage({ service }: { service: Service }) {
  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <PageHero
        eyebrow={service.hero.eyebrow}
        title={service.hero.headline}
        intro={service.hero.intro}
        extraIntro="I work with local and international businesses, and I handle every account myself. Before budget is scaled, I check that your Meta Pixel and Conversions API are reporting the right events, so campaign decisions rest on data you can check."
        primary={{ label: "Discuss Your Meta Ads", href: "#contact", cta: "service_meta-ads_hero_primary" }}
        secondary={{ label: "See Meta Ads Case Studies", href: "#case-studies", cta: "service_meta-ads_hero_secondary" }}
        breadcrumbs={[{ name: "Services", path: "/services" }, { name: "Meta Ads", path: "/services/meta-ads" }]}
      >
        <div className={cardClass}>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400">What to expect</p>
          <ul className="mt-5 list-disc space-y-4 pl-5 text-lg text-white marker:text-red-500">
            {service.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>
      </PageHero>

      <Section glow="right">
        <SectionHeading eyebrow="The Problem" title="Why Facebook and Instagram ads stop paying off" intro="Meta ads rarely fail because of one setting. Usually several small problems add up: unclear goals, data the platform can't learn from, ads that have run too long, and a landing page that loses people after the click. If any of these sound familiar, an account review is a sensible first step." />
        <ItemGrid items={service.problems} />
      </Section>

      <Section>
        <SectionHeading eyebrow="What I Manage" title="What my Facebook ads services include" intro={service.solution.intro} />
        <ItemGrid items={service.solution.pillars} numbered />
        <div className={`${cardClass} mt-10`}>
          <h3 className="text-2xl font-bold text-white">Included in Meta Ads management</h3>
          <ul className="mt-6 grid list-disc gap-x-10 gap-y-3 pl-5 text-gray-300 marker:text-red-500 md:grid-cols-2">
            {included.map(item => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-8 text-sm leading-7 text-gray-400">
            Campaign management does not include design, photography or video production by default; I work from your existing assets or brief your designer or creators, and production can be quoted separately. New websites or landing pages are handled through my <Link href="/services/web-development" className={linkClass}>website development</Link> service, and larger tracking projects through <Link href="/services/analytics-tracking" className={linkClass}>analytics and tracking</Link>.
          </p>
        </div>
      </Section>

      <Section glow="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Process" title="How I work with you" intro="Every engagement follows the same order, so you always know what is happening and why." />
            <div className="mt-10"><Button href="#contact" cta="service_meta-ads_process">Start With an Account Review</Button></div>
          </div>
          <ProcessSteps steps={service.process} />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Measurement" title="How I measure Meta Ads performance" intro="I measure campaigns against the result your business needs, not likes or reach." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {measurement.map(column => <div key={column.title} className={cardClass}>
            <h3 className="text-2xl font-bold text-white">{column.title}</h3>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-gray-300 marker:text-red-500">
              {column.points.map(point => <li key={point}>{point}</li>)}
            </ul>
            {column.title === "Ecommerce" && <Link href="/case-studies/petsinn" className={`${linkClass} mt-6 inline-block`}>See how this worked for PetsInn</Link>}
          </div>)}
        </div>
        <p className="mt-8 max-w-4xl leading-8 text-gray-400">Meta&apos;s reported numbers rarely match your store or CRM exactly. Attribution windows, privacy settings and ad blockers mean some conversions are never reported to Meta. I compare both sources so decisions don&apos;t rest on Ads Manager alone.</p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Tools & Platforms" title="Tools I work in" />
        <ItemGrid items={service.tools} columns={3} />
      </Section>

      <Section glow="right">
        <SectionHeading eyebrow="Who It's For" title="Meta ads for ecommerce and lead generation" intro="The goal decides the setup. Online stores and service businesses need different campaign objectives, conversion events and ways of judging success." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((item, index) => <div key={item.title} className={cardClass}>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 leading-7 text-gray-400">{index === 0 ? <>Prospecting and retargeting campaigns optimised for purchases, with purchase value tracked so spend can be judged against sales. Suitable for <Link href="/services/shopify-development" className={linkClass}>Shopify stores</Link> and other platforms.</> : item.text}</p>
          </div>)}
        </div>
      </Section>

      <Section id="case-studies">
        <SectionHeading eyebrow="Proof" title="Meta Ads case studies" intro="Each case study explains the challenge, what I set up and what was delivered." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {proof.map(study => <article key={study.slug} className={cardClass}>
            <p className="text-sm text-red-400">{study.category}</p>
            <h3 className="mt-4 text-xl font-bold"><Link href={`/case-studies/${study.slug}`} className="hover:text-red-400">{study.name}</Link></h3>
            <p className="mt-4 leading-7 text-gray-400">{study.text}</p>
          </article>)}
        </div>
        <div className="mt-10"><Button href="/case-studies" variant="secondary" cta="service_meta-ads_all_cases">View All Case Studies</Button></div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions about working with a Facebook ads expert" />
        <FaqList faqs={service.faqs} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Works Well With" title="Services that support your Meta ads" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {complementary.map(item => <Link key={item.slug} href={`/services/${item.slug}`} className={`${cardClass} transition hover:border-red-500/40`}>
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-3 leading-7 text-gray-400">{item.text}</p>
          </Link>)}
        </div>
      </Section>

      <CtaSection source="service-meta-ads" defaultService="Meta Ads" eyebrow="Work With Me" title="Talk to a Meta ads expert about your campaigns"
        intro="Tell me what you sell, who you sell to and how your ads are set up today. If you already run campaigns, include your approximate monthly ad spend and what isn't working. I'll review it and reply with the opportunities I see."
        steps={["I review your business, current ads and tracking.", "We talk through what I found on a strategy call.", "You receive a prioritised plan with scope and next steps."]}
      />
    </>
  );
}
