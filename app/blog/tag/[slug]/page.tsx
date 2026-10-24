import ArchivePage, { archiveMetadata } from '@/components/blog/ArchivePage';
export async function generateMetadata({ params, searchParams }: PageProps<'/blog/tag/[slug]'>) {
  return archiveMetadata('tag', (await params).slug, (await searchParams).page);
}
export default async function Page({ params, searchParams }: PageProps<'/blog/tag/[slug]'>) {
  return <ArchivePage taxonomy="tag" slug={(await params).slug} pageValue={(await searchParams).page} />;
}
