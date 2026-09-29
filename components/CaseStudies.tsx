import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/case-studies";

const featured = ["gul-khan", "gulkhan-pk", "petsinn", "building-block"]
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

export default function CaseStudies() {
  return (
    <section id="projects" className="scroll-mt-24 px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Case Studies"
          title={
            <>
              Selected Growth <span className="text-red-500">Projects</span>
            </>
          }
          intro="A closer look at the challenge, the strategy and the outcome behind the work."
        />

        <div className="mt-16 space-y-6">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Link
                href={`/case-studies/${project.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-red-500/40 sm:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 transition duration-700 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-red-500">{project.category}</p>
                      <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{project.client}</h3>
                    </div>
                    <span className="text-3xl text-red-500 transition-transform duration-300 group-hover:rotate-45">↗</span>
                  </div>

                  <div className="mt-10 grid gap-8 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-500">Challenge</p>
                      <p className="mt-3 leading-7 text-gray-300">{project.challenge.intro}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Strategy</p>
                      <p className="mt-3 leading-7 text-gray-300">{project.strategy.intro}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Impact</p>
                      <p className="mt-3 leading-7 text-gray-300">{project.results.highlights[0]}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      {project.channels.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/20 px-4 py-2 text-sm text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="rounded-full border border-white/20 px-6 py-3 text-white transition group-hover:bg-white group-hover:text-black">
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
            className="inline-flex rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-500"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
