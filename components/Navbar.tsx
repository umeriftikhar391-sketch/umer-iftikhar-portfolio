"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { mainNav, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

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
        className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-full border px-4 py-3 transition-all duration-500 sm:top-5 sm:px-6 ${
          scrolled || open
            ? "border-white/10 bg-black/85 shadow-2xl shadow-black/50 backdrop-blur-xl"
            : "border-white/10 bg-white/5 backdrop-blur-md"
        }`}
      >
        <nav aria-label="Main" className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white" aria-label="Umer Iftikhar, home">
            Umer<span className="text-red-500">.</span>
          </Link>

          <ul className="hidden items-center gap-8 text-sm md:flex">
            {mainNav.map((link) =>
              link.href === "/services" ? (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 transition hover:text-white ${isActive(link.href) ? "text-white" : "text-gray-400"}`}
                  >
                    {link.name}
                    <ChevronDown aria-hidden className="h-3.5 w-3.5 transition group-focus-within:rotate-180 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-3xl border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-xl">
                      {services.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-white/[0.06]"
                          >
                            <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                            <span>
                              <span className="block font-semibold text-white">{s.name}</span>
                              <span className="mt-0.5 block text-xs text-gray-500">{s.tags.slice(0, 2).join(" · ")}</span>
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
                    className={`transition hover:text-white ${isActive(link.href) ? "text-white" : "text-gray-400"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="hidden md:block">
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
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
            className="fixed inset-0 z-40 overflow-y-auto bg-black/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
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
                    className={`block py-2 text-3xl font-bold ${pathname === link.href ? "text-red-500" : "text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Services</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="text-sm text-gray-300">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white"
              >
                Book a Strategy Call <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 font-semibold text-white"
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
