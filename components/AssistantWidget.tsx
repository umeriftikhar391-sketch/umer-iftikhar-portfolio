"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, FileText, Mail, MessageCircle, Sparkles, X } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";
import { siteConfig, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";
import { track } from "@/lib/analytics";

type View = "home" | "form";

const TEASER_KEY = "assistant-teaser-dismissed";

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-gray-200">
      {children}
    </div>
  );
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [service, setService] = useState("");
  const [teaser, setTeaser] = useState(false);
  const [opened, setOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Show a small "need help?" teaser once per session, a few seconds after landing.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setTeaser(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    dismissTeaser();
    if (next) {
      setOpened(true);
      track("assistant_open", { page_path: window.location.pathname });
    }
  }

  function openForm(selected = "") {
    setService(selected);
    setView("form");
    track("assistant_form_start", { service: selected });
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="false"
            aria-label="Growth assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-24 flex max-h-[calc(100dvh-11rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl shadow-black/60 outline-none backdrop-blur-xl sm:absolute sm:inset-x-auto sm:bottom-20 sm:right-0 sm:max-h-[min(640px,calc(100dvh-8rem))] sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-red-600/20 to-transparent px-5 py-4">
              {view === "form" ? (
                <button
                  type="button"
                  onClick={() => setView("home")}
                  aria-label="Back"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600">
                  <Sparkles aria-hidden className="h-5 w-5 text-white" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-green-500" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">Umer&apos;s Growth Assistant</p>
                <p className="truncate text-xs text-gray-400">
                  {view === "form" ? "Send your project details" : "Ads · SEO · Websites · Shopify"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body: data-lenis-prevent lets this area scroll natively while smooth scroll runs on the page. */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              {view === "home" ? (
                <div className="space-y-3">
                  <Bubble>
                    Hi there! I&apos;m Umer&apos;s assistant. I can help you get a growth proposal or connect you with Umer
                    directly.
                  </Bubble>
                  <Bubble>What would you like to do?</Bubble>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => openForm()}
                      className="group flex w-full items-center gap-4 rounded-2xl bg-red-600 p-4 text-left text-white transition hover:bg-red-500"
                    >
                      <FileText aria-hidden className="h-5 w-5 shrink-0" />
                      <span className="flex-1">
                        <span className="block font-semibold">Get a strategy proposal</span>
                        <span className="block text-xs text-white/80">Fill a quick form, reply by email</span>
                      </span>
                      <ChevronRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                    <a
                      href={whatsappLink("Hi Umer, I found you through your website and want to discuss a project.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white transition hover:border-green-500/50"
                    >
                      <MessageCircle aria-hidden className="h-5 w-5 shrink-0 text-green-500" />
                      <span className="flex-1">
                        <span className="block font-semibold">Chat on WhatsApp</span>
                        <span className="block text-xs text-gray-400">Fastest way to reach Umer</span>
                      </span>
                      <ChevronRight aria-hidden className="h-4 w-4 text-gray-500 transition group-hover:translate-x-1" />
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project enquiry")}`}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white transition hover:border-red-500/50"
                    >
                      <Mail aria-hidden className="h-5 w-5 shrink-0 text-red-500" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">Send an email</span>
                        <span className="block truncate text-xs text-gray-400">{siteConfig.email}</span>
                      </span>
                      <ChevronRight aria-hidden className="h-4 w-4 text-gray-500 transition group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="pt-4">
                    <Bubble>Or tell me what you need help with:</Bubble>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => openForm(s.name)}
                          className="rounded-full border border-white/15 px-3 py-2 text-xs text-gray-200 transition hover:border-red-500/60 hover:text-white"
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Bubble>
                    {service ? (
                      <>
                        Great choice. Share a few details about your <span className="text-white">{service}</span> goals and
                        Umer will get back to you personally.
                      </>
                    ) : (
                      <>Share a few details and Umer will get back to you personally.</>
                    )}
                  </Bubble>
                  <LeadForm key={service} source="assistant-widget" defaultService={service} compact />
                  <a
                    href={whatsappLink(
                      service ? `Hi Umer, I'm interested in ${service}. Can we discuss?` : "Hi Umer, I want to discuss a project."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm text-gray-300 transition hover:border-green-500/50 hover:text-white"
                  >
                    <MessageCircle aria-hidden className="h-4 w-4 text-green-500" /> Prefer WhatsApp? Message directly
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-0 w-[240px] rounded-2xl rounded-br-md border border-white/10 bg-[#0a0a0a]/95 p-4 pr-9 text-sm text-gray-200 shadow-2xl backdrop-blur-xl"
          >
            <button type="button" onClick={toggle} className="text-left">
              <span className="font-semibold text-white">Need more leads or sales?</span> Tell me about your goals.
              It takes under a minute.
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="absolute right-2 top-2 rounded-full p-1 text-gray-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open growth assistant"}
        data-cta="assistant_launcher"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_10px_40px_-8px_rgba(239,68,68,0.8)] transition hover:scale-105 hover:bg-red-500 sm:h-16 sm:w-16"
      >
        {!opened && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-red-600/40" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
