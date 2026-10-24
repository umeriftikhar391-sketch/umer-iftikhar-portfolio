import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import CtaSection from "@/components/sections/CtaSection";
import CaseStudyCard from "@/components/case-study/CaseStudyCard";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/case-studies";

export const metadata = buildMetadata({
  title: "Case Studies | Performance Marketing, SEO & Shopify Projects",
  description:
    "Case studies from brands grown with Meta Ads, Google Ads, SEO, Shopify development and conversion-focused websites, including B2B lead generation and ecommerce migrations.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real brands. Real challenges."
        highlight="Real systems."
        intro="From B2B corporate gifting to ecommerce migrations and local lead generation, here's how I approach growth problems and the systems built to solve them."
        primary={{ label: "Start Your Project", href: "/contact", cta: "cases_hero_contact" }}
        breadcrumbs={[{ name: "Case Studies", path: "/case-studies" }]}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 3) * 0.08} className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaSection source="case-studies" title="Want results like these?" />
    </>
  );
}
