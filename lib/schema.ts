import { siteConfig, absoluteUrl } from "@/lib/site";
import { services, type Service, type Faq } from "@/lib/services";
import type { CaseStudy } from "@/lib/case-studies";

const personId = `${siteConfig.url}/#person`;
const businessId = `${siteConfig.url}/#business`;
const websiteId = `${siteConfig.url}/#website`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    sameAs: Object.values(siteConfig.socials),
    knowsAbout: [...services.map((s) => s.name), "Performance Marketing", "Shopify", "Next.js", "GA4", "Google Tag Manager"],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: `${siteConfig.name} | Performance Marketing & Web Development`,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/opengraph-image"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    founder: { "@id": personId },
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    areaServed: "Worldwide",
    sameAs: Object.values(siteConfig.socials),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": personId },
    inLanguage: "en",
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.seo.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": businessId },
    areaServed: "Worldwide",
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function caseStudySchema(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.seo.description,
    url: absoluteUrl(`/case-studies/${study.slug}`),
    author: { "@id": personId },
    publisher: { "@id": personId },
    about: study.client,
    keywords: study.channels.join(", "),
  };
}
