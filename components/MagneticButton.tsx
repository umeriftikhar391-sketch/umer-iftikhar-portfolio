"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

const MotionLink = motion.create(Link);

export default function MagneticButton({
  children,
  href,
  cta,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  /** Label pushed to analytics as a cta_click event. */
  cta?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent) => {
    const button = ref.current;
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const leave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px,0px)";
  };

  const external = /^(https?:|mailto:|tel:)/.test(href);
  const Component = external ? motion.a : MotionLink;

  return (
    <Component
      ref={ref}
      href={href}
      data-cta={cta}
      onMouseMove={move}
      onMouseLeave={leave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500 ${className}`}
    >
      {children}
    </Component>
  );
}
