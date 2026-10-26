import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/case-studies";

export default function Clients() {
  return (
    <section className="border-y border-rose/70 bg-blush px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Business Growth"
          title={
            <>
              Brands I Helped <span className="text-brand">Grow</span>
            </>
          }
          intro="From heritage craft brands to schools and ecommerce stores, businesses trust me to build the systems that bring in customers."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((brand, i) => (
            <Reveal key={brand.slug} delay={(i % 3) * 0.08} className="min-w-0">
              <Link
                href={`/case-studies/${brand.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink font-bold tracking-tight text-white">
                        {brand.monogram}
                      </div>
                      <h3 className="min-w-0 break-words text-xl font-bold text-ink">{brand.client}</h3>
                    </div>
                    {brand.featured && <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Featured</span>}
                  </div>
                  <p className="mt-5 text-sm font-semibold text-brand-hover">{brand.industry}</p>
                  <p className="mt-3 flex-1 leading-relaxed text-body">{brand.summary}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {brand.channels.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full bg-blush px-3 py-1.5 text-xs font-medium text-body">
                          {c}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-brand" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
