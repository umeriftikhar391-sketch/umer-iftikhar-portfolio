import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/case-studies"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/case-studies/${c.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}
