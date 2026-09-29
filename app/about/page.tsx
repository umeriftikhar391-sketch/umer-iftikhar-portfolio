import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import ItemGrid from "@/components/sections/ItemGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaSection from "@/components/sections/CtaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata = buildMetadata({
  title: "About Umer Iftikhar | Performance Marketing Specialist & Web Developer",
  description:
    "Meet Umer Iftikhar, a performance marketing specialist and web developer with 5+ years helping brands grow through Meta Ads, Google Ads, SEO, Shopify and conversion-focused websites.",
  path: "/about",
  absoluteTitle: true,
});

const principles = [
  { title: "Revenue over vanity", text: "Clicks, likes and impressions are inputs. I measure success in leads, sales, cost per acquisition and return on ad spend." },
  { title: "Systems over campaigns", text: "One good campaign is luck. A connected system of ads, pages, tracking and follow-up is repeatable growth." },
  { title: "Data before decisions", text: "Tracking is set up before budgets scale, so every optimisation is based on evidence, not opinion." },
  { title: "Clarity and ownership", text: "You own your accounts, data and assets. Reporting is clear, honest and tied to the numbers you care about." },
];

const approach = [
  { title: "Diagnose", text: "Audit your ads, website, tracking and funnel to find where growth is blocked and money is leaking." },
  { title: "Design the system", text: "Map the customer journey and decide which channels, pages and automations will move the numbers." },
  { title: "Build & launch", text: "Implement tracking, campaigns and conversion-focused pages, built to work together from day one." },
  { title: "Optimise & scale", text: "Test, learn and reallocate budget to what works, then scale the winners with confidence." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title="I build growth systems that turn attention into"
        highlight="revenue."
        intro={`I'm ${siteConfig.name}, a performance marketing specialist and web developer. For over five years I've helped ecommerce brands, service businesses, schools and B2B companies grow by connecting paid media, search, websites and data into a single system that produces measurable results.`}
        primary={{ label: "Work With Me", href: "/contact", cta: "about_hero_contact" }}
        secondary={{ label: "View Case Studies", href: "/case-studies", cta: "about_hero_cases" }}
        breadcrumbs={[{ name: "About", path: "/about" }]}
      >
        <div className="grid grid-cols-2 gap-4">
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-4xl font-bold text-red-500">
                {s.value >= 1000 ? `${s.value / 1000}K` : s.value}
                {s.suffix}
              </p>
              <p className="mt-2 text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <Section glow="right">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="My Story" title={<>Why marketing and development <span className="text-red-500">belong together</span></>} />
          <Reveal className="space-y-6 text-lg leading-8 text-gray-400">
            <p>
              I started in digital marketing running campaigns, and quickly saw the same pattern everywhere: ads that
              drove traffic to slow, confusing websites, tracking that didn&apos;t match reality, and teams making budget
              decisions on data they couldn&apos;t trust.
            </p>
            <p>
              So I learned to build the other half. Today I run{" "}
              <Link href="/services/meta-ads" className="text-white underline-offset-4 hover:underline">Meta Ads</Link> and{" "}
              <Link href="/services/google-ads" className="text-white underline-offset-4 hover:underline">Google Ads</Link>, lead{" "}
              <Link href="/services/seo" className="text-white underline-offset-4 hover:underline">SEO</Link> programmes, and build{" "}
              <Link href="/services/shopify-development" className="text-white underline-offset-4 hover:underline">Shopify stores</Link> and{" "}
              <Link href="/services/web-development" className="text-white underline-offset-4 hover:underline">websites</Link>, with{" "}
              <Link href="/services/analytics-tracking" className="text-white underline-offset-4 hover:underline">analytics and tracking</Link> tying it all together.
            </p>
            <p>
              That combination is what makes the difference. When the same person designs the campaign, the landing page
              and the measurement, nothing gets lost in handover, and every improvement compounds across channels.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Principles" title={<>How I <span className="text-red-500">think</span> about growth</>} />
        <ItemGrid items={principles} numbered />
      </Section>

      <Section glow="left">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Approach"
            title={<>A proven path from <span className="text-red-500">audit to scale</span></>}
            intro="Every engagement follows the same disciplined process, adapted to your business, budget and goals."
          />
          <ProcessSteps steps={approach} />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Expertise" title={<>Specialist skills, <span className="text-red-500">one system</span></>} />
        <div className="mt-12 flex flex-wrap gap-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-full border border-white/15 px-5 py-3 text-gray-200 transition hover:border-red-500/60 hover:text-white"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection source="about" />
    </>
  );
}
