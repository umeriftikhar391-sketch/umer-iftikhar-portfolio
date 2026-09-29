import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What I Do"
            title={
              <>
                Digital Growth <span className="text-red-500">Systems</span>
              </>
            }
            intro="Most brands don't have a traffic problem or a website problem. They have a system problem. I connect paid media, search, your website and your data so every channel makes the others perform better."
          />
          <Link href="/services" className="shrink-0 text-sm font-semibold text-white underline-offset-4 hover:underline" data-cta="home_all_services">
            All services →
          </Link>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-red-500/40"
                >
                  <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                        <Icon className="h-7 w-7 text-red-500" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-500" />
                    </div>
                    <h3 className="mt-8 text-2xl font-bold text-white">{service.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-gray-400">{service.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
