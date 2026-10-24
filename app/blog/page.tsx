import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import BlogListing from '@/components/blog/BlogListing';
import { blogPage } from '@/lib/wordpress/api';
import { buildMetadata } from '@/lib/seo';
export async function generateMetadata({ searchParams }: PageProps<'/blog'>) {
  const page = blogPage((await searchParams).page);
  return buildMetadata({ title: page && page > 1 ? `Blog — Page ${page}` : 'Blog & Insights', description: 'Practical insights on performance marketing, SEO, websites, ecommerce and analytics from Umer Iftikhar.', path: page && page > 1 ? `/blog?page=${page}` : '/blog' });
}
export default async function BlogPage({ searchParams }: PageProps<'/blog'>) {
  await connection();
  const page = blogPage((await searchParams).page);
  if (!page) notFound();
  return <BlogListing page={page} title="Marketing, websites and growth." intro="Practical ideas, clear explanations and lessons for building better digital businesses." path="/blog" />;
}
