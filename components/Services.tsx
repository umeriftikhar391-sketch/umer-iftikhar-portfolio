import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/service-directory";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What I Do"
            title={
              <>
                Digital Growth <span className="text-brand">Systems</span>
              </>
            }
            intro="Most brands don't have a traffic problem or a website problem. They have a system problem. I connect paid media, search, your website and your data so every channel makes the others perform better."
          />
          <Link href="/services" className="inline-flex min-h-11 shrink-0 items-center text-[0.9375rem] font-semibold text-brand-hover underline-offset-4 hover:underline" data-cta="home_all_services">
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose">
                        <Icon className="h-6 w-6 text-brand-hover" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
                    </div>
                    <h3 className="mt-7 text-xl font-bold tracking-tight text-ink">{service.name}</h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-body">{service.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-blush px-3 py-1.5 text-xs font-medium text-body">
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
