import 'server-only';
import { cache } from 'react';
import { wordpressUrl } from './config';
import { plainText, safeContent } from './html';

export type WPTerm = { id: number; slug: string; name: string; taxonomy: string; description?: string; count?: number };
type WPMedia = { source_url?: string; alt_text?: string; media_details?: { width?: number; height?: number } };
type WPAuthor = { name?: string };
export type WPPost = {
  id: number; slug: string; status: string; date_gmt: string; modified_gmt: string;
  title: { rendered: string }; excerpt: { rendered: string; protected?: boolean };
  content: { rendered: string; protected?: boolean }; categories?: number[]; tags?: number[]; sticky?: boolean;
  yoast_head_json?: { title?: string; description?: string; og_title?: string; og_description?: string };
  _embedded?: { author?: WPAuthor[]; 'wp:featuredmedia'?: WPMedia[]; 'wp:term'?: WPTerm[][] };
};
export type BlogPost = {
  id: number; slug: string; title: string; excerpt: string; html: string; published: string; modified?: string;
  author?: string; image?: { url: string; alt: string; width: number; height: number };
  categories: WPTerm[]; tags: WPTerm[]; sticky: boolean;
  seo: { title: string; description: string; socialTitle: string; socialDescription: string };
};
export class WordPressError extends Error {
  constructor(public status = 503) { super('Articles are temporarily unavailable. Please try again shortly.'); }
}
export function decodedSlug(slug: string) { try { return decodeURIComponent(slug).normalize('NFC'); } catch { return ''; } }
export const validSlug = (slug: string) => slug.length <= 200 && slug.length > 0 && !/[\s/\\?#\u0000-\u001f]/u.test(slug) && !['.', '..'].includes(slug);
export const blogPage = (value?: string | string[]) => {
  if (value === undefined) return 1;
  if (typeof value !== 'string' || !/^[1-9]\d{0,4}$/.test(value)) return null;
  return Number(value);
};
function date(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(value.endsWith('Z') ? value : `${value}Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}
function published(post: WPPost) {
  return post && post.status === 'publish' && validSlug(decodedSlug(post.slug || '')) && !post.content?.protected && !post.excerpt?.protected;
}
export function normalizePost(post: WPPost): BlogPost {
  const title = plainText(post.title?.rendered || 'Untitled article');
  const excerpt = plainText(post.excerpt?.rendered || post.content?.rendered || '').slice(0, 280);
  const terms = post._embedded?.['wp:term']?.flat() || [];
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  let image: BlogPost['image'];
  if (media?.source_url) {
    try {
      const url = new URL(media.source_url);
      if (url.origin === wordpressUrl()?.origin && url.pathname.startsWith('/wp-content/uploads/') && /^https?:$/.test(url.protocol)) image = {
        url: url.href, alt: plainText(media.alt_text || title),
        width: Math.min(10000, Math.max(1, Number(media.media_details?.width) || 1200)), height: Math.min(10000, Math.max(1, Number(media.media_details?.height) || 675)),
      };
    } catch { /* Missing or invalid media is optional. */ }
  }
  const seo = post.yoast_head_json;
  return {
    id: post.id, slug: post.slug, title, excerpt, html: safeContent(post.content?.rendered || ''),
    published: date(post.date_gmt) || '', modified: date(post.modified_gmt),
    author: post._embedded?.author?.[0]?.name ? plainText(post._embedded.author[0].name) : undefined, image,
    categories: terms.filter(t => t.taxonomy === 'category' && validSlug(t.slug)),
    tags: terms.filter(t => t.taxonomy === 'post_tag' && validSlug(t.slug)), sticky: !!post.sticky,
    seo: { title: plainText(seo?.title || title), description: plainText(seo?.description || excerpt).slice(0, 320),
      socialTitle: plainText(seo?.og_title || seo?.title || title), socialDescription: plainText(seo?.og_description || seo?.description || excerpt).slice(0, 320) },
  };
}
async function request<T>(endpoint: string, params: Record<string, string | number>, fresh = false): Promise<{ data: T[]; totalPages: number; total: number }> {
  const base = wordpressUrl();
  if (!base) throw new WordPressError();
  const url = new URL(endpoint, base);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' },
      ...(fresh ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }), signal: AbortSignal.timeout(10000), redirect: 'error' });
    if (!response.ok) {
      if (response.status === 400) {
        const error = await response.json().catch(() => null);
        if (error?.code === 'rest_post_invalid_page_number') return { data: [], totalPages: 0, total: 0 };
      }
      throw new WordPressError(response.status);
    }
    const data = await response.json();
    if (!Array.isArray(data)) throw new WordPressError();
    return { data, totalPages: Math.max(0, Number(response.headers.get('X-WP-TotalPages')) || 0), total: Math.max(0, Number(response.headers.get('X-WP-Total')) || 0) };
  } catch (error) { if (error instanceof WordPressError) throw error; throw new WordPressError(); }
}
export async function getPosts({ page = 1, perPage = 9, category, tag, exclude, sticky, fresh = false }: { page?: number; perPage?: number; category?: number; tag?: number; exclude?: number; sticky?: boolean; fresh?: boolean } = {}) {
  if (!wordpressUrl()) return { posts: [], totalPages: 0, total: 0 };
  const query: Record<string, string | number> = { status: 'publish', context: 'view', _embed: 'author,wp:featuredmedia,wp:term', page, per_page: Math.min(perPage, 100), orderby: 'date', order: 'desc' };
  if (category) query.categories = category;
  if (tag) query.tags = tag;
  if (exclude) query.exclude = exclude;
  if (sticky) query.sticky = "true";
  const result = await request<WPPost>('posts', query, fresh);
  return { posts: result.data.filter(published).map(normalizePost), totalPages: result.totalPages, total: result.total };
}
// The article's publication status is checked uncached on every request. Unpublishing
// must not leave a previously cached article public; memoize only within this render.
export const getPost = cache(async (slug: string) => {
  if (!validSlug(slug) || !wordpressUrl()) return null;
  const { data } = await request<WPPost>('posts', { slug, status: 'publish', context: 'view', _embed: 'author,wp:featuredmedia,wp:term', per_page: 1 }, true);
  const post = data.find(p => decodedSlug(p.slug) === decodedSlug(slug) && published(p));
  return post ? normalizePost(post) : null;
});
export async function getTerms(taxonomy: 'categories' | 'tags') {
  if (!wordpressUrl()) return [];
  const terms: WPTerm[] = [];
  for (let page = 1; page <= 20; page++) {
    const result = await request<WPTerm>(taxonomy, { per_page: 100, page, hide_empty: 'true', orderby: 'name' });
    terms.push(...result.data.filter(term => validSlug(term.slug)));
    if (page >= result.totalPages) return terms;
  }
  throw new WordPressError();
}
export const getTerm = cache(async (taxonomy: 'categories' | 'tags', slug: string) => {
  if (!validSlug(slug) || !wordpressUrl()) return null;
  const { data } = await request<WPTerm>(taxonomy, { slug, hide_empty: 'true', per_page: 1 });
  return data.find(t => t.slug === slug) || null;
});
export async function getSitemapPosts() {
  if (!wordpressUrl()) return [];
  const posts: { slug: string; published: string; modified?: string }[] = [];
  for (let page = 1; page <= 100; page++) {
    const result = await request<WPPost>('posts', {
      status: 'publish', context: 'view', per_page: 100, page, orderby: 'date', order: 'desc',
      _fields: 'id,slug,status,date_gmt,modified_gmt,content.protected,excerpt.protected',
    }, true);
    posts.push(...result.data.filter(published).map(post => ({ slug: post.slug, published: date(post.date_gmt) || '', modified: date(post.modified_gmt) })));
    if (page >= result.totalPages) return posts;
  }
  throw new WordPressError(); // Split into sitemap indexes beyond 10,000 posts.
}

export async function isPublishedSlug(slug: string) {
  if (!validSlug(slug) || !wordpressUrl()) return false;
  const { data } = await request<WPPost>('posts', {
    slug, status: 'publish', context: 'view', per_page: 1,
    _fields: 'id,slug,status,content.protected,excerpt.protected',
  }, true);
  return data.some(post => decodedSlug(post.slug) === decodedSlug(slug) && published(post));
}
