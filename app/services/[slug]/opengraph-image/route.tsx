import { renderOgImage } from "@/lib/og";
import { servicePageCopy } from "@/lib/service-copy";
import { services } from "@/lib/services";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const copy = servicePageCopy[slug];
  if (!copy) return new Response("Not found", { status: 404 });
  return renderOgImage({ eyebrow: copy.name, title: copy.schemaName });
}
