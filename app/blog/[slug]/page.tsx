import BlogImage from '@/components/blog/BlogImage';
import Link from 'next/link';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/wordpress/api';
import { plainText } from '@/lib/wordpress/html';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import BlogCard, { formatDate } from '@/components/blog/BlogCard';
import CtaSection from '@/components/sections/CtaSection';
import { services } from '@/lib/service-directory';

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
  await connection();
  const post = await getPost((await params).slug);
  if (!post) return { title: 'Article not found', robots: { index: false, follow: true } };
  const path = `/blog/${post.slug}`;
  const base = buildMetadata({ title: post.seo.title, description: post.seo.description, path, type: 'article', absoluteTitle: true });
  const images = post.image ? [{ url: post.image.url, alt: post.image.alt, width: post.image.width, height: post.image.height }] : [{ url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: `${siteConfig.name} — Blog & Insights` }];
  return { ...base,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: { ...base.openGraph, type: 'article' as const, title: post.seo.socialTitle, description: post.seo.socialDescription, images, publishedTime: post.published || undefined, modifiedTime: post.modified, authors: post.author ? [post.author] : undefined },
    twitter: { ...base.twitter, images, title: post.seo.socialTitle, description: post.seo.socialDescription },
  };
}

export default async function ArticlePage({ params }: PageProps<'/blog/[slug]'>) {
  await connection();
  const post = await getPost((await params).slug);
  if (!post) notFound();
  let related: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  try { related = (await getPosts({ category: post.categories[0]?.id, exclude: post.id, perPage: 3 })).posts; }
  catch { /* An optional related-post request must not hide the article. */ }
  const subjects = `${post.title} ${post.categories.map(t => t.name).join(' ')} ${post.tags.map(t => t.name).join(' ')}`.toLowerCase();
  const relevant = services.filter(service => {
    const keywords: Record<string, string[]> = {
      'meta-ads': ['meta', 'facebook', 'instagram'], 'google-ads': ['google ads', 'ppc', 'shopping ads'],
      seo: ['seo', 'search engine'], 'web-development': ['website', 'wordpress', 'next.js'],
      'shopify-development': ['shopify', 'ecommerce', 'store'], 'ai-automation': ['automation', 'workflow', 'ai '],
      'analytics-tracking': ['analytics', 'ga4', 'tracking'], 'conversion-optimization': ['conversion', 'cro', 'landing page'],
    };
    return keywords[service.slug].some(word => subjects.includes(word));
  }).slice(0, 3);
  const path = `/blog/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': absoluteUrl(`${path}#article`),
    mainEntityOfPage: absoluteUrl(path), url: absoluteUrl(path), headline: post.title, description: post.seo.description,
    datePublished: post.published || undefined, dateModified: post.modified,
    author: post.author ? { '@type': 'Person', name: post.author } : undefined, publisher: { '@id': `${siteConfig.url}/#person` },
    image: post.image?.url, inLanguage: 'en', articleSection: post.categories.map(t => plainText(t.name)),
  };
  return <>
    <JsonLd data={schema} />
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-6 sm:pt-44">
      <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path }]} />
      <div className="mt-8 flex flex-wrap gap-3 text-sm text-red-400">{post.categories.map(t => <Link className="hover:underline" key={t.id} href={`/blog/category/${t.slug}`}>{plainText(t.name)}</Link>)}</div>
      <h1 className="mt-6 break-words text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
      {post.excerpt && <p className="mt-8 text-xl leading-9 text-gray-300">{post.excerpt}</p>}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">{post.author && <span>By {post.author}</span>}{post.published && <span>Published <time dateTime={post.published}>{formatDate(post.published)}</time></span>}{post.modified && post.modified !== post.published && <span>Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time></span>}</div>
      {post.image && <BlogImage className="mt-10 h-auto w-full rounded-3xl border border-white/10" src={post.image.url} width={post.image.width} height={post.image.height} alt={post.image.alt} sizes="(max-width: 896px) 100vw, 896px" priority />}
      <div className="blog-prose mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.tags.length > 0 && <nav aria-label="Article tags" className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-8">{post.tags.map(t => <Link className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 hover:border-red-500" key={t.id} href={`/blog/tag/${t.slug}`}>{plainText(t.name)}</Link>)}</nav>}
      {relevant.length > 0 && <aside className="mt-12 rounded-3xl border border-white/10 p-7"><h2 className="text-2xl font-bold">Put these ideas into practice</h2><p className="mt-4 text-gray-400">Explore services related to this article.</p><ul className="mt-5 space-y-3">{relevant.map(s => <li key={s.slug}><Link className="text-red-400 underline underline-offset-4" href={`/services/${s.slug}`}>{s.name} →</Link></li>)}</ul></aside>}
    </article>
    {related.length > 0 && <section aria-labelledby="related-heading" className="mx-auto max-w-7xl px-5 py-16 sm:px-6"><h2 id="related-heading" className="mb-8 text-3xl font-bold">Related articles</h2><div className="grid gap-6 md:grid-cols-3">{related.map(p => <BlogCard post={p} key={p.id} />)}</div></section>}
    <CtaSection source={`blog-${post.slug}`} defaultService={relevant[0]?.name} eyebrow="Work With Me" title={relevant.length ? `Need help with ${relevant[0].name.toLowerCase()}?` : 'Turn ideas into your next project.'} intro="Tell me about your business, your goals and what you want to improve. I'll reply with the opportunities I see." />
  </>;
}
