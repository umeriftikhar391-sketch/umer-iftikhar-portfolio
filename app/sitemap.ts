import { connection } from "next/server";
import { getSitemapPosts } from "@/lib/wordpress/api";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import contentDates from "@/lib/content-dates.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const paths = ["/", "/services", ...services.map(s => `/services/${s.slug}`),
    "/case-studies", ...caseStudies.map(c => `/case-studies/${c.slug}`), "/about", "/contact", "/tools/roas-calculator"];
  const existing = paths.map(path => ({
    url: absoluteUrl(path),
    lastModified: (contentDates as Record<string, string>)[path],
  }));
  try {
    const posts = await getSitemapPosts();
    return [...existing, { url: absoluteUrl("/blog") }, ...posts.map(post => ({
      url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.modified || post.published || undefined,
    }))];
  } catch {
    console.error("WordPress sitemap request failed; retaining portfolio entries.");
    return [...existing, { url: absoluteUrl("/blog") }];
  }
}
