import { servicePageCopy } from "@/lib/service-copy";
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
    email: siteConfig.email,
    telephone: siteConfig.telephone,
    address: { "@type": "PostalAddress", addressCountry: "PK", addressLocality: "Karachi" },
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
    telephone: siteConfig.telephone,
    founder: { "@id": personId },
    address: { "@type": "PostalAddress", addressCountry: "PK", addressLocality: "Karachi" },
    areaServed: "Worldwide",
    sameAs: Object.values(siteConfig.socials),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": absoluteUrl(`/services/${s.slug}#service`), name: servicePageCopy[s.slug].schemaName, url: absoluteUrl(`/services/${s.slug}`) },
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
    name: servicePageCopy[service.slug].schemaName,
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    serviceType: servicePageCopy[service.slug].serviceType,
    description: service.seo.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": businessId },
    areaServed: "Worldwide",
  };
}

export function faqSchema(faqs: Faq[], path?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(path ? { "@id": absoluteUrl(`${path}#faq`), isPartOf: { "@id": absoluteUrl(`${path}#webpage`) } } : {}),
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
    "@id": absoluteUrl(`${items.at(-1)?.path ?? "/"}#breadcrumb`),
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

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/about#profile"),
    url: absoluteUrl("/about"),
    mainEntity: { "@id": personId },
  };
}

export function serviceWebPageSchema(service: Service) {
  const path = `/services/${service.slug}`;
  return {
    "@context": "https://schema.org", "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`), url: absoluteUrl(path),
    name: service.seo.title, description: service.seo.description, inLanguage: "en",
    isPartOf: { "@id": websiteId }, about: { "@id": absoluteUrl(`${path}#service`) },
    breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumb`) },
  };
}
