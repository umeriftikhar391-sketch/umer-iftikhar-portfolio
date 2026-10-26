"use client";

import { motion, Variants } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const textReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const chips = [
  { label: "Meta Ads", className: "left-6 top-[-18px]" },
  { label: "Google Ads", className: "right-[-12px] top-28" },
  { label: "SEO", className: "right-4 bottom-24" },
  { label: "Shopify", className: "bottom-[-14px] left-10" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex items-center overflow-hidden px-5 sm:px-6 lg:min-h-[92vh]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-32">
        <div>
          <motion.h1 variants={textReveal} initial={false} animate="show">
            <span className="block text-[clamp(3.25rem,11vw,7rem)] font-bold leading-[0.9] tracking-[-0.035em] text-ink">
              Umer{" "}<br />
              <span className="text-brand">Iftikhar</span>
            </span>{" "}
            <span className="mt-7 flex items-center gap-3 text-base font-semibold tracking-normal text-body before:h-0.5 before:w-10 before:shrink-0 before:rounded-full before:bg-brand before:content-[''] sm:text-lg">
              Performance Marketing Specialist &amp; Web Developer
            </span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-8 text-body"
          >
            I help ambitious brands turn ad spend into predictable revenue. Meta Ads, Google Ads, SEO and
            high-converting websites, engineered as <span className="font-semibold text-ink">one growth system</span> and measured
            against the numbers that matter: leads, sales and return on ad spend.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <MagneticButton href="/contact" cta="hero_book_call" className="min-h-12 px-6 py-3 text-base!">
              Book a Strategy Call
            </MagneticButton>
            <Button href="/case-studies" variant="secondary" cta="hero_view_work">
              See the Results
            </Button>
          </motion.div>

          <motion.dl
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4"
          >
            {siteConfig.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {s.value >= 1000 ? `${s.value / 1000}K` : s.value}
                  <span className="text-brand">{s.suffix}</span>
                </dd>
                <dd className="mt-1 text-sm text-body">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden justify-center overflow-visible lg:flex"
        >
          <div className="w-[380px] max-w-full rounded-3xl border border-line bg-white p-10 shadow-lift">
            <p className="text-sm font-semibold text-brand-hover">Digital Growth System</p>
            <p className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-ink">
              Convert
              <br />
              Visitors
              <br />
              Into
              <br />
              <span className="text-brand">Customers</span>
            </p>
            <div className="mt-8 space-y-3">
              {["Attract", "Convert", "Measure", "Scale"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-body">
                  <span className="font-mono text-brand-hover">0{i + 1}</span>
                  <span className="h-px flex-1 bg-line" />
                  {step}
                </div>
              ))}
            </div>
          </div>
          {chips.map((chip) => (
            <motion.div
              key={chip.label}
              className={`absolute rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-card ${chip.className}`}
            >
              {chip.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
