import { renderOgImage, ogSize } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export const alt = "Umer Iftikhar case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return renderOgImage({
    eyebrow: study ? `Case Study · ${study.client}` : "Case Study",
    title: study?.headline ?? "Growth case study",
  });
}
