import { Check, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import dynamic from "next/dynamic";
const LeadForm = dynamic(() => import("@/components/forms/LeadForm"));
import { siteConfig, whatsappLink } from "@/lib/site";

const nextSteps = [
  "I review your business, current marketing and goals.",
  "We talk through opportunities on a focused strategy call.",
  "You get a clear, prioritised plan with scope and next steps.",
];

export default function CtaSection({
  source,
  steps = nextSteps,
  defaultService,
  eyebrow = "Start a project",
  title = "Let's build your next growth system.",
  intro = "Tell me about your business and goals. I'll come back with honest recommendations on where the biggest opportunities are, whether we end up working together or not.",
}: {
  source: string;
  steps?: string[];
  defaultService?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-20 sm:px-6 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-body">{intro}</p>

          <h3 className="mt-10 text-lg font-bold text-ink">What happens next</h3>
          <ul className="mt-5 space-y-4">
            {steps.map((step) => (
              <li key={step} className="flex gap-3 leading-7 text-body">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose"><Check aria-hidden className="h-3.5 w-3.5 text-brand-hover" /></span>
                {step}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-ink shadow-card transition-colors hover:border-brand/40 hover:bg-blush"
            >
              <MessageCircle aria-hidden className="h-4 w-4 text-brand-hover" /> WhatsApp {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-ink shadow-card transition-colors hover:border-brand/40 hover:bg-blush"
            >
              <Mail aria-hidden className="h-4 w-4 text-brand-hover" /> {siteConfig.email}
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
