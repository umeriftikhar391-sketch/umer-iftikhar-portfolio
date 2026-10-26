import { NextResponse, type NextRequest } from 'next/server';
import { blogPage, decodedSlug, getPosts, getTerm, isPublishedSlug } from '@/lib/wordpress/api';

// Next.js streams loading boundaries with HTTP 200. Check existence before rendering
// so missing/unpublished articles retain a real 404 for browsers as well as crawlers.
export async function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const pageValues = request.nextUrl.searchParams.getAll('page');
  const page = blogPage(pageValues.length > 1 ? pageValues : pageValues[0]);
  const missing = () => NextResponse.rewrite(new URL('/__blog-not-found', request.url), { status: 404, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  if (!page) return missing();
  try {
    if (parts.length === 2 && !await isPublishedSlug(decodedSlug(parts[1]))) return missing();
    let term;
    if (parts.length === 3 && ['category', 'tag'].includes(parts[1])) {
      term = await getTerm(parts[1] === 'category' ? 'categories' : 'tags', decodedSlug(parts[2]));
      if (!term) return missing();
    }
    if (page > 1 && (parts.length === 1 || term)) {
      const result = await getPosts({ page, category: parts[1] === 'category' ? term?.id : undefined, tag: parts[1] === 'tag' ? term?.id : undefined });
      if (!result.posts.length || page > result.totalPages) return missing();
    }
    return NextResponse.next();
  } catch {
    return new NextResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Articles temporarily unavailable | Umer Iftikhar</title><style>body{margin:0;background:#fff;color:#1f1f1f;font-family:system-ui,sans-serif;line-height:1.7}main{max-width:44rem;margin:15vh auto;padding:2rem}h1{font-size:clamp(2rem,6vw,3rem);line-height:1.2;letter-spacing:-.02em}p{color:#475569}a{display:inline-block;margin:1rem 1rem 0 0;padding:.75rem 1.4rem;border:1px solid rgb(229 57 53/.35);border-radius:.75rem;color:#1f1f1f;font-weight:600;text-decoration:none}a:first-of-type{background:#e53935;border-color:#e53935;color:#fff}</style></head><body><main><h1>Articles are temporarily unavailable</h1><p>Please try again shortly. The rest of the website is available.</p><a href="/blog">Try again</a><a href="/">Back to home</a></main></body></html>`, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'Retry-After': '60' } });
  }
}
export const config = { matcher: ['/blog', '/blog/:slug', '/blog/category/:slug', '/blog/tag/:slug'] };
