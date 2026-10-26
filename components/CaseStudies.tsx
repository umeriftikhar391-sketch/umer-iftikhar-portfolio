import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/case-studies";

const featured = ["gul-khan", "gulkhan-pk", "petsinn", "building-block"]
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

export default function CaseStudies() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-rose/70 bg-blush px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Case Studies"
          title={
            <>
              Selected Growth <span className="text-brand">Projects</span>
            </>
          }
          intro="A closer look at the challenge, the strategy and the outcome behind the work."
        />

        <div className="mt-16 space-y-6">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Link
                href={`/case-studies/${project.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift sm:p-10"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">{project.category}</p>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{project.client}</h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-xl text-brand-hover transition duration-300 group-hover:rotate-45 group-hover:border-brand/40">↗</span>
                  </div>

                  <div className="mt-8 grid gap-6 border-t border-line pt-8 md:grid-cols-3 md:gap-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Challenge</p>
                      <p className="mt-3 leading-7 text-body">{project.challenge.intro}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Strategy</p>
                      <p className="mt-3 leading-7 text-body">{project.strategy.intro}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Impact</p>
                      <p className="mt-3 leading-7 text-body">{project.results.highlights[0]}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      {project.channels.map((tag) => (
                        <span key={tag} className="rounded-full bg-blush px-3.5 py-1.5 text-sm font-medium text-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex min-h-11 items-center rounded-xl border border-brand/35 px-5 font-semibold text-ink transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            data-cta="home_all_case_studies"
            className="inline-flex min-h-12 items-center rounded-xl bg-brand px-7 py-3 font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
