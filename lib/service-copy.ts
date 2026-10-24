import data from "@/lib/service-page-copy.json";

export type CopyNode = { kind: string; text: string; title?: string; href?: string };
export type CopySection = {
  eyebrow: string;
  title: string;
  nodes: CopyNode[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  cta?: { label: string; href: string };
};
export type ServiceCopy = {
  name: string;
  tags: string[];
  schemaName: string;
  serviceType: string;
  meta: Record<string, string>;
  links: { text: string; href: string }[];
  sections: CopySection[];
  faqs: { q: string; a: string }[];
};
export const servicePageCopy: Record<string, ServiceCopy> = data;
