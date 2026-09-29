import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import ItemGrid from "@/components/sections/ItemGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqList from "@/components/sections/FaqList";
import CtaSection from "@/components/sections/CtaSection";
import CaseStudyCard from "@/components/case-study/CaseStudyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { services, getService } from "@/lib/services";
import { getCaseStudy } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${service.slug}`,
    absoluteTitle: true,
  });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const studies = service.caseStudies.map(getCaseStudy).filter((c) => c !== undefined);
  const related = service.related.map(getService).filter((s) => s !== undefined);
  const Icon = service.icon;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      {/* 1. Hero */}
      <PageHero
        eyebrow={service.hero.eyebrow}
        title={service.hero.headline}
        highlight={service.hero.highlight}
        intro={service.hero.intro}
        primary={{ label: "Book a Strategy Call", href: "#contact", cta: `service_${service.slug}_hero_primary` }}
        secondary={{ label: "See Related Work", href: "#case-studies", cta: `service_${service.slug}_hero_secondary` }}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <Icon aria-hidden className="h-7 w-7 text-red-500" />
          </div>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-500">What you get</p>
          <ul className="mt-4 space-y-4">
            {service.outcomes.map((o) => (
              <li key={o} className="flex items-center gap-3 text-lg font-semibold text-white">
                <Check aria-hidden className="h-5 w-5 shrink-0 text-red-500" /> {o}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* 2. Problem */}
      <Section glow="right">
        <SectionHeading
          eyebrow="The Problem"
          title={<>Why most businesses <span className="text-red-500">struggle</span> here</>}
          intro={`If any of these sound familiar, your ${service.name.toLowerCase()} is costing you more than it should.`}
        />
        <ItemGrid items={service.problems} />
      </Section>

      {/* 3. Solution */}
      <Section>
        <SectionHeading eyebrow="The Solution" title={<>My approach to <span className="text-red-500">{service.name}</span></>} intro={service.solution.intro} />
        <ItemGrid items={service.solution.pillars} numbered />
      </Section>

      {/* 4. Process */}
      <Section glow="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Process"
              title={<>How we <span className="text-red-500">work together</span></>}
              intro="A clear, step-by-step workflow so you always know what's happening, what's next and why."
            />
            <Reveal className="mt-10">
              <Button href="#contact" cta={`service_${service.slug}_process`}>Start With Step One</Button>
            </Reveal>
          </div>
          <ProcessSteps steps={service.process} />
        </div>
      </Section>

      {/* 5. Tools & Platforms */}
      <Section>
        <SectionHeading eyebrow="Tools & Platforms" title={<>The <span className="text-red-500">stack</span> behind the results</>} />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.tools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 0.04}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                <div>
                  <h3 className="font-semibold text-white">{tool.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{tool.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. Benefits */}
      <Section glow="right">
        <SectionHeading eyebrow="Benefits" title={<>What this means for <span className="text-red-500">your business</span></>} />
        <ItemGrid items={service.benefits} columns={4} />
      </Section>

      {/* 7. Related case studies */}
      {studies.length > 0 && (
        <Section id="case-studies">
          <SectionHeading eyebrow="Proof" title={<>Related <span className="text-red-500">case studies</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08} className="h-full">
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 8. FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title={<>{service.name} <span className="text-red-500">questions</span></>} />
          <FaqList faqs={service.faqs} />
        </div>
      </Section>

      {/* Internal links to related services */}
      <Section>
        <SectionHeading eyebrow="Works well with" title={<>Complementary <span className="text-red-500">services</span></>} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-red-500/40"
            >
              <span>
                <span className="block text-lg font-bold text-white">{s.name}</span>
                <span className="mt-1 block text-sm text-gray-400">{s.tags.join(" · ")}</span>
              </span>
              <ArrowUpRight aria-hidden className="h-5 w-5 text-white/40 transition group-hover:text-red-500" />
            </Link>
          ))}
        </div>
      </Section>

      {/* 9. CTA form */}
      <CtaSection
        source={`service-${service.slug}`}
        defaultService={service.name}
        eyebrow={`Grow with ${service.name}`}
        title={`Ready to get more from ${service.name}?`}
        intro={`Share your goals and current setup. I'll review it and come back with the ${service.name.toLowerCase()} opportunities most likely to move your numbers.`}
      />
    </>
  );
}
