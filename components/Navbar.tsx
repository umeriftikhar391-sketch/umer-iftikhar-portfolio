"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { mainNav, whatsappLink } from "@/lib/site";
import { services } from "@/lib/service-directory";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-2xl border px-4 py-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:top-4 sm:w-[calc(100%-2rem)] sm:px-5 ${
          scrolled || open
            ? "border-line bg-white/95 shadow-card backdrop-blur-xl"
            : "border-line/70 bg-white/80 backdrop-blur-md"
        }`}
      >
        <nav aria-label="Main" className="flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center rounded-lg text-2xl font-bold tracking-tight text-ink" aria-label="Umer Iftikhar, home">
            Umer<span className="text-brand">.</span>
          </Link>

          <ul className="hidden items-center gap-1 whitespace-nowrap text-[0.9375rem] font-medium lg:flex xl:gap-2">
            {mainNav.map((link) =>
              link.href === "/services" ? (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-3 transition-colors hover:bg-blush hover:text-ink ${isActive(link.href) ? "text-brand-hover" : "text-body"}`}
                  >
                    {link.name}
                    <ChevronDown aria-hidden className="h-3.5 w-3.5 transition group-focus-within:rotate-180 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-2 shadow-lift">
                      {services.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blush"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose"><Icon aria-hidden className="h-4 w-4 text-brand-hover" /></span>
                            <span>
                              <span className="block font-semibold text-ink">{s.name}</span>
                              <span className="mt-0.5 block text-xs text-slate-500">{s.tags.slice(0, 2).join(" · ")}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-11 items-center rounded-lg px-3 transition-colors hover:bg-blush hover:text-ink ${isActive(link.href) ? "text-brand-hover" : "text-body"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="hidden shrink-0 lg:block">
            <MagneticButton href="/contact" cta="nav_book_call">
              Book a Strategy Call
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen(!open);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors hover:bg-blush lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pb-10 pt-24 lg:hidden"
          >
            <ul className="space-y-1">
              {[{ name: "Home", href: "/" }, ...mainNav].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-3 text-2xl font-bold tracking-tight ${pathname === link.href ? "text-brand-hover" : "text-ink"}`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="eyebrow mt-8">Services</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-[0.9375rem] text-body hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                data-cta="mobile_menu_book_call"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3 font-semibold text-white shadow-cta hover:bg-brand-hover"
              >
                Book a Strategy Call <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand/35 px-8 py-3 font-semibold text-ink hover:bg-blush"
              >
                WhatsApp Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
