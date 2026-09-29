"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, ArrowRight } from "lucide-react";
import { leadServiceOptions } from "@/lib/lead";
import { whatsappLink } from "@/lib/site";
import { track } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "peer w-full rounded-2xl border bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:bg-black aria-[invalid=true]:border-red-500/70";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={`lead-${name}`} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`lead-${name}-error`} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function LeadForm({ source, defaultService = "" }: { source: string; defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [firstName, setFirstName] = useState("");
  const startedAt = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // On success the form collapses into a shorter panel; bring it into view (mostly matters on mobile).
  useEffect(() => {
    if (status === "success") containerRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setMessage("");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        track("generate_lead", { form_source: source, service: String(data.service || "") });
        setFirstName(String(data.name || "").split(" ")[0]);
        setStatus("success");
        form.reset();
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const aria = (name: string) => ({
    id: `lead-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lead-${name}-error` : undefined,
  });

  return (
    <div ref={containerRef} className="relative scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <CircleCheck className="h-8 w-8 text-red-500" />
            </span>
            <h3 className="mt-6 text-3xl font-bold text-white">
              Thank you{firstName ? `, ${firstName}` : ""}.
            </h3>
            <p className="mt-4 max-w-md leading-7 text-gray-400">
              Your project details are with me. I review every enquiry personally and will get back to you with next
              steps and a few questions about your goals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Hi Umer, I just submitted the form on your website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                Need it faster? WhatsApp me
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name *" name="name" error={errors.name}>
                <input {...aria("name")} required autoComplete="name" placeholder="Your full name" className={`${inputClass} border-white/10`} />
              </Field>
              <Field label="Email *" name="email" error={errors.email}>
                <input {...aria("email")} required type="email" autoComplete="email" placeholder="you@company.com" className={`${inputClass} border-white/10`} />
              </Field>
              <Field label="Phone / WhatsApp *" name="phone" error={errors.phone}>
                <input {...aria("phone")} required type="tel" autoComplete="tel" placeholder="+92 300 0000000" className={`${inputClass} border-white/10`} />
              </Field>
              <Field label="Company" name="company">
                <input {...aria("company")} autoComplete="organization" placeholder="Company or brand" className={`${inputClass} border-white/10`} />
              </Field>
            </div>

            <Field label="Service needed *" name="service" error={errors.service}>
              <select {...aria("service")} required defaultValue={defaultService} className={`${inputClass} appearance-none border-white/10`}>
                <option value="" disabled>
                  Select a service
                </option>
                {leadServiceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Project details *" name="message" error={errors.message}>
              <textarea
                {...aria("message")}
                required
                minLength={10}
                rows={5}
                placeholder="What are you selling, what's your current monthly budget, and what result do you want in the next 90 days?"
                className={`${inputClass} resize-y border-white/10`}
              />
            </Field>

            {/* Honeypot: hidden from people, tempting for bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="lead-website">Website</label>
              <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && message && (
              <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-4 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Project Details
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500">No spam. Your details are only used to reply to your enquiry.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
