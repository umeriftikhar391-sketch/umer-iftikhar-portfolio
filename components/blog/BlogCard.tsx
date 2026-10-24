import BlogImage from './BlogImage';
import Link from 'next/link';
import type { BlogPost } from '@/lib/wordpress/api';
import { plainText } from '@/lib/wordpress/html';
export const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date));
export default function BlogCard({ post }: { post: BlogPost }) {
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-red-500/40">
    {post.image ? <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-video overflow-hidden"><BlogImage src={post.image.url} alt={post.image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /></Link> : <div aria-hidden="true" className="flex aspect-video items-center justify-center bg-gradient-to-br from-red-950/60 to-black text-3xl font-bold text-white/40">Insights<span className="text-red-500">.</span></div>}
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">{post.published && <time dateTime={post.published}>{formatDate(post.published)}</time>}{post.categories.map(term => <Link className="text-red-400 hover:underline" key={term.id} href={`/blog/category/${term.slug}`}>{plainText(term.name)}</Link>)}</div>
      <h2 className="mt-4 break-words text-2xl font-bold leading-tight"><Link href={`/blog/${post.slug}`} className="hover:text-red-400">{post.title}</Link></h2>
      <p className="mt-4 flex-1 leading-7 text-gray-400">{post.excerpt}</p>
      {post.tags.length > 0 && <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-2 text-xs text-gray-400">{post.tags.slice(0, 4).map(term => <li key={term.id}><Link href={`/blog/tag/${term.slug}`} className="rounded-full border border-white/10 px-3 py-1 hover:text-white">{plainText(term.name)}</Link></li>)}</ul>}
      <Link href={`/blog/${post.slug}`} className="mt-6 font-semibold text-red-400 hover:text-red-300" aria-label={`Read more: ${post.title}`}>Read More →</Link>
    </div>
  </article>;
}
