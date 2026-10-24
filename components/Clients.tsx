import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/case-studies";

export default function Clients() {
  return (
    <section className="px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Business Growth"
          title={
            <>
              Brands I Helped <span className="text-red-500">Grow</span>
            </>
          }
          intro="From heritage craft brands to schools and ecommerce stores, businesses trust me to build the systems that bring in customers."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((brand, i) => (
            <Reveal key={brand.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/case-studies/${brand.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-red-500/40"
              >
                <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-bold text-white">
                        {brand.monogram}
                      </div>
                      <h3 className="text-xl font-bold text-white">{brand.client}</h3>
                    </div>
                    {brand.featured && <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">Featured</span>}
                  </div>
                  <p className="mt-5 text-red-500">{brand.industry}</p>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-400">{brand.summary}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {brand.channels.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-gray-300">
                          {c}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition group-hover:text-red-500" />
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
