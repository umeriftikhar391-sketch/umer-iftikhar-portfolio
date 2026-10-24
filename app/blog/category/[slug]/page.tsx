import ArchivePage, { archiveMetadata } from '@/components/blog/ArchivePage';
export async function generateMetadata({ params, searchParams }: PageProps<'/blog/category/[slug]'>) {
  return archiveMetadata('category', (await params).slug, (await searchParams).page);
}
export default async function Page({ params, searchParams }: PageProps<'/blog/category/[slug]'>) {
  return <ArchivePage taxonomy="category" slug={(await params).slug} pageValue={(await searchParams).page} />;
}
