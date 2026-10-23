import { notFound } from "next/navigation";
import ServiceContentPage from "@/components/services/ServiceContentPage";
import { buildMetadata } from "@/lib/seo";
import { servicePageCopy } from "@/lib/service-copy";
import { services, getService } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  const copy = servicePageCopy[slug];
  const metadata = buildMetadata({
    title: service.seo.title, description: service.seo.description,
    path: `/services/${slug}`, absoluteTitle: true,
  });
  const images = [{ url: `/services/${slug}/opengraph-image`, width: 1200, height: 630, alt: copy.meta["Social image alt text"] }];
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images, title: copy.meta["Open Graph title"], description: copy.meta["Open Graph description"] },
    twitter: { ...metadata.twitter, images, title: copy.meta["Open Graph title"], description: copy.meta["Open Graph description"] },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceContentPage service={service} copy={servicePageCopy[slug]} />;
}
