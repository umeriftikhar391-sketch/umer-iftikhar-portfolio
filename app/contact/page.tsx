import { Clock, Mail, MessageCircle, MapPin } from "lucide-react";
import Section from "@/components/sections/Section";
import FaqList from "@/components/sections/FaqList";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Umer Iftikhar | Book a Strategy Call",
  description:
    "Get in touch with Umer Iftikhar to discuss Meta Ads, Google Ads, SEO, Shopify or website projects. Share your goals and get a clear plan for growth.",
  path: "/contact",
  absoluteTitle: true,
});

const faqs = [
  { q: "What happens after I submit the form?", a: "I review your business and goals, then reply with a few questions and times for a strategy call. On the call we'll discuss opportunities and whether we're a good fit." },
  { q: "Do you work with businesses outside Pakistan?", a: "Yes. I work with clients in Pakistan and internationally. Everything can be handled remotely over calls, WhatsApp and email." },
  { q: "What information should I include?", a: "Your website, what you sell, current marketing channels and budget, and the result you want. The more context, the more useful my first response will be." },
  { q: "Do you offer one-off projects or ongoing work?", a: "Both. Websites, Shopify builds, tracking setups and audits are often one-off projects. Ad management, SEO and CRO usually work best as ongoing engagements." },
];

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: whatsappLink() },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Based in", value: `${siteConfig.location} · Working worldwide` },
  { icon: Clock, label: "Response", value: "I personally review every enquiry" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative px-5 pb-16 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h1 className="mt-6 text-balance text-[clamp(2.5rem,6.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
                Let&apos;s talk about <span className="text-brand">growth.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-body">
                Tell me where your business is today and where you want it to be. I&apos;ll come back with honest
                recommendations on the fastest path to more leads and sales.
              </p>
              <ul className="mt-10 space-y-4">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose">
                      <Icon aria-hidden className="h-5 w-5 text-brand-hover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-widest text-slate-500">{label}</span>
                      {href ? (
                        <a
                          href={href}
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="block break-all font-medium text-ink transition-colors hover:text-brand-hover"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="block text-ink">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <LeadForm source="contact-page" />
            </Reveal>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="FAQ" title={<>Before you <span className="text-brand">reach out</span></>} />
        <FaqList faqs={faqs} />
      </Section>
    </>
  );
}
