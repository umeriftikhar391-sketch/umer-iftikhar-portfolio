import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import contentDates from "@/lib/content-dates.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", ...services.map(s => `/services/${s.slug}`),
    "/case-studies", ...caseStudies.map(c => `/case-studies/${c.slug}`), "/about", "/contact"];
  return paths.map(path => ({
    url: absoluteUrl(path),
    lastModified: (contentDates as Record<string, string>)[path],
  }));
}
