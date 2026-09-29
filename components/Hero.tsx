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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-6">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 pb-20 pt-36 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pt-32">
        <div>
          <motion.h1 variants={textReveal} initial="hidden" animate="show">
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:mb-8 sm:text-sm">
              Performance Marketing Specialist &amp; Web Developer
            </span>
            <span className="block text-6xl font-bold leading-[0.85] tracking-tight text-white sm:text-7xl md:text-[110px]">
              Umer
              <br />
              <span className="text-red-500">Iftikhar</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-xl text-pretty text-base leading-7 text-gray-400 sm:text-lg sm:leading-8"
          >
            I help ambitious brands turn ad spend into predictable revenue. Meta Ads, Google Ads, SEO and
            high-converting websites, engineered as <span className="text-white">one growth system</span> and measured
            against the numbers that matter: leads, sales and return on ad spend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact" cta="hero_book_call" className="px-8 py-4 text-base">
              Book a Strategy Call
            </MagneticButton>
            <Button href="/case-studies" variant="secondary" cta="hero_view_work">
              See the Results
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:mt-14 sm:grid-cols-4"
          >
            {siteConfig.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold text-white">
                  {s.value >= 1000 ? `${s.value / 1000}K` : s.value}
                  <span className="text-red-500">{s.suffix}</span>
                </dd>
                <dd className="mt-1 text-sm text-gray-500">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden justify-center overflow-visible lg:flex"
        >
          <div className="w-[380px] max-w-full rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
            <p className="text-sm text-gray-400">Digital Growth System</p>
            <p className="mt-6 text-5xl font-bold leading-tight text-white">
              Convert
              <br />
              Visitors
              <br />
              Into
              <br />
              <span className="text-red-500">Customers</span>
            </p>
            <div className="mt-8 space-y-3">
              {["Attract", "Convert", "Measure", "Scale"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="font-mono text-red-500">0{i + 1}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  {step}
                </div>
              ))}
            </div>
          </div>
          {chips.map((chip, i) => (
            <motion.div
              key={chip.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              className={`absolute rounded-full border border-white/20 bg-black/70 px-5 py-2 text-sm text-white backdrop-blur ${chip.className}`}
            >
              {chip.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
