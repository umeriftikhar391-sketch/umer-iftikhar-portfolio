import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import ItemGrid from "@/components/sections/ItemGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaSection from "@/components/sections/CtaSection";
import CaseCover from "@/components/case-study/CaseCover";
import CaseVisual from "@/components/case-study/CaseVisual";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { caseStudySchema } from "@/lib/schema";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getService } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/case-studies/${study.slug}`,
    type: "article",
    absoluteTitle: true,
  });
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const services = study.services.map(getService).filter((s) => s !== undefined);
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const primaryService = services[0]?.name;

  return (
    <>
      <JsonLd data={caseStudySchema(study)} />

      <PageHero
        eyebrow={`Case Study · ${study.category}`}
        title={study.client}
        intro={study.headline + ". " + study.summary}
        primary={{ label: "Get Similar Results", href: "#contact", cta: `case_${study.slug}_hero` }}
        breadcrumbs={[
          { name: "Case Studies", path: "/case-studies" },
          { name: study.client, path: `/case-studies/${study.slug}` },
        ]}
      >
        <CaseCover monogram={study.monogram} industry={study.industry} />
      </PageHero>

      {/* 1. Client overview */}
      <Section glow="right">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Client Overview" title={<>About <span className="text-red-500">{study.client}</span></>} />
            <Reveal className="mt-8 space-y-6 text-lg leading-8 text-gray-400">
              {study.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
              <div className="pb-5">
                <dt className="text-xs uppercase tracking-widest text-gray-500">Industry</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{study.industry}</dd>
              </div>
              <div className="py-5">
                <dt className="text-xs uppercase tracking-widest text-gray-500">Focus</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{study.category}</dd>
              </div>
              <div className="pt-5">
                <dt className="text-xs uppercase tracking-widest text-gray-500">Services</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-gray-200 transition hover:border-red-500/60">
                      {s.name}
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* 2. Business challenge */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Business Challenge" title={<>The problem to <span className="text-red-500">solve</span></>} intro={study.challenge.intro} />
          <Reveal>
            <ul className="space-y-4">
              {study.challenge.points.map((point, i) => (
                <li key={point} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="font-mono text-red-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-7 text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 3. Strategy */}
      <Section glow="left">
        <SectionHeading eyebrow="Strategy" title={<>The <span className="text-red-500">plan</span></>} intro={study.strategy.intro} />
        <ItemGrid items={study.strategy.points} numbered />
      </Section>

      {/* 4. Execution */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="Execution" title={<>How it was <span className="text-red-500">delivered</span></>} intro="Step by step, from foundation to optimisation." />
          <ProcessSteps steps={study.execution} />
        </div>
      </Section>

      {/* 5. Marketing channels */}
      <Section>
        <SectionHeading eyebrow="Marketing Channels" title={<>Channels <span className="text-red-500">used</span></>} />
        <div className="mt-10 flex flex-wrap gap-3">
          {study.channels.map((c) => (
            <span key={c} className="rounded-full border border-red-500/30 bg-red-500/5 px-6 py-3 text-lg font-semibold text-white">
              {c}
            </span>
          ))}
        </div>
      </Section>

      {/* 6. Results */}
      <Section glow="right">
        <SectionHeading eyebrow="Results" title={<>What was <span className="text-red-500">achieved</span></>} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {study.results.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
                <p className="text-4xl font-bold tracking-tight text-red-500 sm:text-5xl">{m.value}</p>
                <p className="mt-3 text-gray-400">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {study.results.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-lg leading-8 text-gray-300">
                <Check aria-hidden className="mt-2 h-5 w-5 shrink-0 text-red-500" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 7. Visual gallery */}
      <Section>
        <SectionHeading eyebrow="Visual Gallery" title={<>Inside the <span className="text-red-500">work</span></>} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {study.gallery.map((g, i) => (
            <Reveal key={g.caption} delay={(i % 2) * 0.08}>
              <figure>
                <CaseVisual kind={g.kind} />
                <figcaption className="mt-4 text-sm text-gray-400">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8. Key learnings */}
      <Section glow="left">
        <SectionHeading eyebrow="Key Learnings" title={<>What this project <span className="text-red-500">taught us</span></>} />
        <ItemGrid items={study.learnings} numbered columns={study.learnings.length >= 3 ? 3 : 2} />
      </Section>

      {/* Next case study */}
      <Section>
        <Link
          href={`/case-studies/${next.slug}`}
          className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-red-500/40 sm:flex-row sm:items-center sm:p-10"
        >
          <span>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Next case study</span>
            <span className="mt-3 block text-3xl font-bold text-white sm:text-4xl">{next.client}</span>
            <span className="mt-2 block text-gray-400">{next.category}</span>
          </span>
          <ArrowRight aria-hidden className="h-8 w-8 shrink-0 text-red-500 transition group-hover:translate-x-2" />
        </Link>
      </Section>

      {/* 9. CTA */}
      <CtaSection
        source={`case-study-${study.slug}`}
        defaultService={primaryService}
        eyebrow="Your turn"
        title="Want a growth system like this?"
        intro={`If ${study.client}'s challenge sounds like yours, let's talk. Share a few details and I'll outline how I'd approach it for your business.`}
      />
    </>
  );
}
