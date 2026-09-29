import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
      <div className="absolute right-0 top-0 hidden h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px] md:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:text-sm">About Me</p>
          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            A Marketer Who Builds. <span className="text-red-500">A Builder Who Markets.</span>
          </h2>
          <p className="mt-8 text-lg leading-8 text-gray-400">
            Most businesses hire one person to run ads, another to fix the website and a third to set up tracking, then
            wonder why nothing connects. I work across all of it. That means the campaign, the landing page and the data
            are designed together from day one.
          </p>
          <p className="mt-5 text-lg leading-8 text-gray-400">
            The result is a growth system where every rupee or dollar of spend is traceable to leads and revenue, and every
            improvement compounds across channels.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/about" cta="home_about">More About Me</Button>
            <Button href="/contact" variant="secondary" cta="home_about_contact">Start a Project</Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 p-6 transition hover:border-red-500/40">
                <p className="text-4xl font-bold text-red-500">
                  {s.value >= 1000 ? `${s.value / 1000}K` : s.value}
                  {s.suffix}
                </p>
                <p className="mt-2 text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
