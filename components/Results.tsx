"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
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
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="eyebrow">Performance Results</p>
          <h2 className="mt-5 text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            Numbers Behind <span className="text-brand">Growth</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-body">
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
  const numberRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = numberRef.current;
    if (!inView || !element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 2000, 1);
      element.textContent = Math.round(item.value * progress).toLocaleString("en-US");
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      element.textContent = item.value.toLocaleString("en-US");
    };
  }, [inView, item.value]);
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-card transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand before:content-[''] hover:shadow-lift"
    >
      <p className="text-5xl font-bold tracking-tight text-brand">
        <span className="sr-only">{item.value.toLocaleString("en-US")}{item.suffix}</span>
        <span aria-hidden="true"><span ref={numberRef}>{item.value.toLocaleString("en-US")}</span>{item.suffix}</span>
      </p>
      <h3 className="mt-6 text-xl font-bold text-ink">{item.label}</h3>
      <p className="mt-4 leading-7 text-body">{descriptions[item.label]}</p>
    </motion.div>
  );
}
