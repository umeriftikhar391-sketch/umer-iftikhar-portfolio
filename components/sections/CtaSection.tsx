import { Check, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/forms/LeadForm";
import { siteConfig, whatsappLink } from "@/lib/site";

const nextSteps = [
  "I review your business, current marketing and goals.",
  "We talk through opportunities on a focused strategy call.",
  "You get a clear, prioritised plan with scope and next steps.",
];

export default function CtaSection({
  source,
  defaultService,
  eyebrow = "Start a project",
  title = "Let's build your next growth system.",
  intro = "Tell me about your business and goals. I'll come back with honest recommendations on where the biggest opportunities are, whether we end up working together or not.",
}: {
  source: string;
  defaultService?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-20 sm:px-6 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[160px] md:block" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:text-sm">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">{intro}</p>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-white">What happens next</h3>
          <ul className="mt-5 space-y-4">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-3 text-gray-300">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-red-500" />
                {step}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-red-500/50"
            >
              <MessageCircle aria-hidden className="h-4 w-4 text-red-500" /> WhatsApp {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-red-500/50"
            >
              <Mail aria-hidden className="h-4 w-4 text-red-500" /> {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <LeadForm source={source} defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
