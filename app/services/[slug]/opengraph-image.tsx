import { renderOgImage, ogSize } from "@/lib/og";
import { getService, services } from "@/lib/services";

export const alt = "Umer Iftikhar service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    eyebrow: service?.name ?? "Services",
    title: service ? `${service.hero.headline} ${service.hero.highlight}` : "Performance Marketing Services",
  });
}
