import { servicePageCopy } from "@/lib/service-copy";
import type { LucideIcon } from "lucide-react";
import { services as directory } from "@/lib/service-directory";

export type Item = { title: string; text: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  tags: string[];
  seo: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; headline: string; highlight: string; intro: string };
  outcomes: string[];
  problems: Item[];
  solution: { intro: string; pillars: Item[] };
  process: Item[];
  tools: Item[];
  benefits: Item[];
  caseStudies: string[];
  related: string[];
  faqs: Faq[];
};

export const services: Service[] = Object.entries(servicePageCopy).map(([slug, copy], index) => {
  const hero = copy.sections[0];
  const section = (eyebrow: string) => copy.sections.find(s => s.eyebrow === eyebrow);
  const cards = (eyebrow: string): Item[] => (section(eyebrow)?.nodes ?? [])
    .filter(node => node.kind === "card")
    .map(node => ({ title: node.title ?? "", text: node.text }));
  const solution = copy.sections[2];
  return {
    slug, name: copy.name, icon: directory[index].icon,
    summary: copy.meta["Meta description"], tags: copy.tags,
    seo: { title: copy.meta["SEO title"], description: copy.meta["Meta description"], keywords: [] },
    hero: { eyebrow: hero.eyebrow, headline: hero.title, highlight: "", intro: hero.nodes.find(n => n.kind === "paragraph")?.text ?? "" },
    outcomes: hero.nodes.filter(n => n.kind === "bullet").map(n => n.text),
    problems: cards("The Problem"),
    solution: { intro: solution.nodes.find(n => n.kind === "paragraph")?.text ?? "", pillars: solution.nodes.filter(n => n.kind === "card").map(n => ({title: n.title ?? "", text: n.text})) },
    process: cards("Process"), tools: cards("Tools & Platforms"), benefits: cards("Who It's For"),
    caseStudies: [...new Set(copy.links.filter(l => l.href.startsWith("/case-studies/")).map(l => l.href.split("/").pop()!))],
    related: [...new Set(copy.links.filter(l => l.href.startsWith("/services/")).map(l => l.href.split("/").pop()!))],
    faqs: copy.faqs,
  };
});

export function getService(slug: string) {
  return services.find(s => s.slug === slug);
}
export const serviceOptions = services.map(s => s.name);
