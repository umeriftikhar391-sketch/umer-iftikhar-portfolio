"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/lib/site";

const descriptions: Record<string, string> = {
  "Years Experience": "Hands-on experience across paid media, SEO, ecommerce and web development.",
  "Projects Completed": "Growth projects delivered for brands across ecommerce, education, services and B2B.",
  "Leads Generated": "Qualified enquiries generated through performance campaigns and conversion-focused pages.",
  "ROAS Achieved": "Peak return on ad spend reached through disciplined testing and optimisation.",
};

type Stat = (typeof siteConfig.stats)[number];

export default function Results() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
      <div className="absolute left-0 top-0 hidden h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px] md:block" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:text-sm">Performance Results</p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            Numbers Behind <span className="text-red-500">Growth</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Every campaign is measured against business outcomes, not vanity metrics. Here&apos;s what that discipline adds up to.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((item, index) => (
            <ResultCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultCard({ item, index }: { item: Stat; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:border-red-500/40"
    >
      <p className="text-5xl font-bold text-red-500">
        {inView ? <CountUp end={item.value} duration={2} separator="," /> : 0}
        {item.suffix}
      </p>
      <h3 className="mt-6 text-xl font-bold text-white">{item.label}</h3>
      <p className="mt-4 leading-7 text-gray-400">{descriptions[item.label]}</p>
    </motion.div>
  );
}
