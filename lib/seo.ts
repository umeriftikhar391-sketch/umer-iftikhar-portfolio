import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  absoluteTitle?: boolean;
};

export function buildMetadata({ title, description, path, keywords, type = "website", absoluteTitle }: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
