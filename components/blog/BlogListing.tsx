import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/sections/Section';
import BlogCard from './BlogCard';
import { getPosts, getTerms, type WPTerm } from '@/lib/wordpress/api';
import { plainText } from '@/lib/wordpress/html';

export default async function BlogListing({ page, term, taxonomy, title, intro, path }: { page: number; term?: WPTerm; taxonomy?: 'category' | 'tag'; title: string; intro: string; path: string }) {
  const [result, categories] = await Promise.all([
    getPosts({ page, category: taxonomy === 'category' ? term?.id : undefined, tag: taxonomy === 'tag' ? term?.id : undefined }), getTerms('categories'),
  ]);
  if (page > 1 && (!result.posts.length || page > result.totalPages)) notFound();
  const featured = !term && page === 1 ? await getPosts({ sticky: true, perPage: 3 }).then(result => result.posts).catch(() => []) : [];
  const posts = result.posts.filter(post => !featured.some(f => f.id === post.id));
  const pageLink = (n: number) => n === 1 ? path : `${path}?page=${n}`;
  return <>
    <PageHero eyebrow="Insights & Ideas" title={title} intro={intro} breadcrumbs={[{ name: 'Blog', path: '/blog' }, ...(term ? [{ name: plainText(term.name), path }] : [])]} />
    <Section>
      <nav aria-label="Blog categories" className="mb-12 flex flex-wrap gap-3"><Link href="/blog" className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${!term ? 'border-brand/40 bg-rose text-brand-hover' : 'border-line bg-white text-body hover:border-brand/40'}`}>All articles</Link>{categories.map(category => <Link key={category.id} href={`/blog/category/${category.slug}`} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${category.slug === term?.slug && taxonomy === 'category' ? 'border-brand/40 bg-rose text-brand-hover' : 'border-line bg-white text-body hover:border-brand/40'}`}>{plainText(category.name)}</Link>)}</nav>
      {featured.length > 0 && <section aria-label="Featured articles" className="mb-16"><h2 className="mb-8 text-3xl font-bold tracking-tight text-ink">Featured articles</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map(post => <BlogCard key={post.id} post={post} />)}</div></section>}
      {posts.length > 0 && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post => <BlogCard key={post.id} post={post} />)}</div>}
      {!result.posts.length && <div className="rounded-2xl border border-line bg-blush p-10 text-center"><h2 className="text-2xl font-bold text-ink">Articles are coming soon</h2><p className="mt-4 text-body">Check back for practical insights on marketing, websites and business growth.</p></div>}
      {result.totalPages > 1 && <nav aria-label="Article pagination" className="mt-12 flex flex-wrap items-center justify-center gap-6">{page > 1 && <Link rel="prev" className="inline-flex min-h-12 items-center rounded-xl border border-brand/35 bg-white px-5 font-semibold hover:bg-blush" href={pageLink(page - 1)}>← Previous</Link>}<span className="text-body" aria-live="polite">Page {page} of {result.totalPages}</span>{page < result.totalPages && <Link rel="next" className="inline-flex min-h-12 items-center rounded-xl border border-brand/35 bg-white px-5 font-semibold hover:bg-blush" href={pageLink(page + 1)}>Next →</Link>}</nav>}
    </Section>
  </>;
}
