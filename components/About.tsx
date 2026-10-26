import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden border-y border-rose/70 bg-blush px-5 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">About Me</p>
          <h2 className="mt-5 text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            A Marketer Who Builds. <span className="text-brand">A Builder Who Markets.</span>
          </h2>
          <p className="mt-7 text-lg leading-8 text-body">
            Most businesses hire one person to run ads, another to fix the website and a third to set up tracking, then
            wonder why nothing connects. I work across all of it. That means the campaign, the landing page and the data
            are designed together from day one.
          </p>
          <p className="mt-5 text-lg leading-8 text-body">
            The result is a growth system where every rupee or dollar of spend is traceable to leads and revenue, and every
            improvement compounds across channels.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/about" cta="home_about">More About Me</Button>
            <Button href="/contact" variant="secondary" cta="home_about_contact">Start a Project</Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-blush p-6">
                <p className="text-4xl font-bold tracking-tight text-brand">
                  {s.value >= 1000 ? `${s.value / 1000}K` : s.value}
                  {s.suffix}
                </p>
                <p className="mt-2 text-body">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
