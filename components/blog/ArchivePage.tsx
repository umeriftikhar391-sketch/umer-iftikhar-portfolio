import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { blogPage, getTerm } from '@/lib/wordpress/api';
import { plainText } from '@/lib/wordpress/html';
import { buildMetadata } from '@/lib/seo';
import BlogListing from './BlogListing';
export async function archiveMetadata(taxonomy: 'category' | 'tag', slug: string, pageValue?: string | string[]) {
  await connection();
  const term = await getTerm(taxonomy === 'category' ? 'categories' : 'tags', slug);
  if (!term) return { title: 'Archive not found', robots: { index: false } };
  const name = plainText(term.name);
  const page = blogPage(pageValue);
  return buildMetadata({ title: `${name} Articles${page && page > 1 ? ` — Page ${page}` : ''}`, description: plainText(term.description || '') || `Articles about ${name} from Umer Iftikhar.`, path: `/blog/${taxonomy}/${slug}${page && page > 1 ? `?page=${page}` : ''}` });
}
export default async function ArchivePage({ taxonomy, slug, pageValue }: { taxonomy: 'category' | 'tag'; slug: string; pageValue?: string | string[] }) {
  await connection();
  const [term, page] = await Promise.all([getTerm(taxonomy === 'category' ? 'categories' : 'tags', slug), Promise.resolve(blogPage(pageValue))]);
  if (!term || !page) notFound();
  return <BlogListing page={page} term={term} taxonomy={taxonomy} title={`${plainText(term.name)} articles`} intro={plainText(term.description || '') || `Explore ideas and practical advice on ${plainText(term.name)}.`} path={`/blog/${taxonomy}/${slug}`} />;
}
