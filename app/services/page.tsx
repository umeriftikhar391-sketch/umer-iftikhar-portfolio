import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import CtaSection from "@/components/sections/CtaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = buildMetadata({
  title: "Performance Marketing & Web Development Services",
  description:
    "Meta Ads, Google Ads, SEO, website development, Shopify development, AI automation, analytics and conversion optimisation, delivered as one connected growth system.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every channel you need to grow, working as"
        highlight="one system."
        intro="Paid media brings demand. SEO compounds it. Your website converts it. Tracking proves it. I deliver each of these at a specialist level and, more importantly, make them work together."
        primary={{ label: "Book a Strategy Call", href: "/contact", cta: "services_hero_contact" }}
        secondary={{ label: "See Case Studies", href: "/case-studies", cta: "services_hero_cases" }}
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose">
                      <Icon className="h-6 w-6 text-brand-hover" />
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
                  </div>
                  <h2 className="mt-8 text-3xl font-bold text-ink">{service.name}</h2>
                  <p className="mt-4 flex-1 leading-7 text-body">{service.summary}</p>
                  <ul className="mt-6 space-y-2">
                    {service.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-3 text-sm text-body">
                        <Check className="h-4 w-4 text-brand-hover" /> {o}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 text-[0.9375rem] font-semibold text-brand-hover group-hover:underline">Explore {service.name} →</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section glow="left">
        <SectionHeading
          align="center"
          eyebrow="Not sure where to start?"
          title={<>Start with the <span className="text-brand">biggest bottleneck</span></>}
          intro="Most businesses don't need every service at once. In a strategy call we'll identify the one constraint holding growth back, whether that's traffic, conversion or measurement, and fix that first."
        />
      </Section>

      <CtaSection source="services" />
    </>
  );
}
