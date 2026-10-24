# Headless WordPress blog

The portfolio remains the public website. WordPress supplies public published posts through its REST API; it does not replace the homepage, service pages, case studies, forms or analytics.

## Configure locally and on Hostinger

1. Add to your existing `.env.local` locally, or Hostinger → your **Node.js portfolio app** → Environment variables:

   ```dotenv
   WORDPRESS_API_URL=https://orange-zebra-677887.hostingersite.com/wp-json/wp/v2
   ```

   Do not replace the existing email/SMTP, GTM, Pixel or site URL variables. The API needs no credentials; never add a WordPress admin password to the frontend. `.env.local` remains ignored by Git.
2. Set the variable **before building**, then run `npm ci`, `npm run build` and `npm start` (existing Hostinger commands). The initial integration requires deployment. A CMS hostname change also requires one rebuild because Next.js image host permissions are compiled into the application; normal post publishing does not.
3. Keep the main site's `NEXT_PUBLIC_SITE_URL=https://umeriftikhar.online`. Do not set WordPress's Site URL to this domain. The CMS stays at its separate WordPress address.
4. Purge Hostinger's old HTML cache once after deployment. Exclude `/blog`, `/blog/*` and `/sitemap.xml` from any hosting/CDN page cache that overrides origin headers. Blog HTML is request-rendered with `no-store`; caching it for a year would defeat publication updates and removal of unpublished posts. Keep fingerprinted static assets cached normally.
5. The app's outbound network must allow HTTPS to the WordPress hostname. Confirm from the hosting runtime that the public posts, categories, tags and uploads can be read without login. If you see redirects, use the final canonical API base URL instead of a redirecting URL. Check security plugins/firewalls if public REST requests are blocked.

## Prepare WordPress

1. WordPress Settings → Permalinks: choose **Post name** and save. Confirm `/wp-json/wp/v2/posts?status=publish&_embed=1` returns JSON publicly.
2. Settings → Reading: enable **Discourage search engines from indexing this site** on the **WordPress backend only**. This adds noindex to its rendered frontend; it is not access control. Verify WordPress frontend HTML has noindex, and the REST endpoint still returns public JSON. Do not password-protect the site or block `/wp-json/` or uploads. Do not apply these settings to the public Next.js domain. If the temporary frontend was already indexed, request its removal in its own search-engine property.
3. Publish Posts (not WordPress Pages) with a unique slug, title, content, excerpt, categories/tags, publication date and optional featured image. Add descriptive image alt text in Media Library. Empty author/image data is omitted rather than invented.
4. Optional: Yoast SEO's public `yoast_head_json` fields supply SEO title/description and Open Graph text. When absent, the article title and stripped excerpt/content are used. The Next.js canonical and robots settings are controlled here, not copied from the temporary WordPress frontend.
5. Preview posts in WordPress admin while writing. This integration intentionally has no draft preview or authenticated/private content route. Password-protected, draft, scheduled and unpublished posts are excluded.

## Publish daily

Write in WordPress → Posts → Add New, choose a slug and categories/tags, set an excerpt and featured image, then Publish. Visit `https://umeriftikhar.online/blog/<your-slug>` and `/blog`. No GitHub edit or redeployment is needed.

Listings, featured posts and taxonomy data use Next.js's 60-second data revalidation. An expired cache refreshes on traffic, so allow roughly a minute plus the refresh request. Direct articles recheck publication status without persistent caching and render current content on each request; edits and unpublishing are reflected on subsequent requests. Browser navigation/prefetch caches may need a refresh. The sitemap reads current published post summaries on request. Its portfolio entries remain present if WordPress fails. There is no required webhook or shared secret.

## Routes and behavior

- `/blog` and `?page=2`: date-ordered articles, sticky featured posts, category navigation and pagination.
- `/blog/<slug>`: current published article, author/dates when available, categories/tags, sanitized content, related articles, relevant service links and contact CTA.
- `/blog/category/<slug>` and `/blog/tag/<slug>`: paginated taxonomy archives.
- Invalid slugs, unpublished/protected posts and invalid pagination return a real HTTP 404 via a blog-only pre-render existence check. The preflight adds a lightweight publication-status request so Next's loading stream cannot turn missing articles into HTTP 200.
- API failures have a retry/error state; article preflight failures return HTTP 503/Retry-After rather than a false 404. If no API URL is configured, the listing has a coming-soon state and articles return 404. The API-unavailable document is a noindex HTTP 503 response, not an indexable article.
- The client never receives WordPress credentials. Content fetching and sanitization are server-side.
- Gutenberg paragraphs, headings, images/captions, lists, tables, quotes and code are supported. Scripts, iframes, forms, SVG, event handlers and arbitrary inline styles are stripped. Embedded H1s become H2s. Temporary-domain post/category/tag links are rewritten to public blog links; upload image URLs remain on the media origin. In-article anchor links are preserved.
- Featured images use Next Image with a restricted uploads host derived from the configured API URL. Content images keep intrinsic dimensions where WordPress supplies them and lazy-load. For externally hosted/CDN featured media, add the exact trusted hostname to image configuration and normalization before using it; unknown hosts are omitted rather than broadly allowlisted.
- Sitemap traversal is bounded to 100 pages × 100 posts. Plan a sitemap index if the blog exceeds 10,000 posts. Categories/tags are bounded to 2,000 terms per taxonomy.

## Verification

Production build and TypeScript: `npm run build`; lint: `npm run lint`.

Local fixture integration (does not contact WordPress or send email):

```sh
PORT=4011 node scripts/fixtures/wordpress.mjs
# Separate terminal: build and start against the fixture.
WORDPRESS_API_URL=http://127.0.0.1:4011/wp-json/wp/v2 npm run build
WORDPRESS_API_URL=http://127.0.0.1:4011/wp-json/wp/v2 npm run start -- --hostname 127.0.0.1 --port 3012
# Separate terminal:
node scripts/verify-wordpress-blog.mjs
node scripts/verify-service-plan.mjs http://127.0.0.1:3012
node scripts/verify-seo.mjs http://127.0.0.1:3012
```

The fixture checks pagination, taxonomy pages, rich-content sanitization, real 404s, drafts/protected posts, edit/unpublish behavior, API failure, canonical/SEO/schema, sitemap preservation, GTM presence and invalid-form validation. Email delivery is not tested by sending a message. Return to the real API variable before the deployment build.

Live checklist after deployment:

1. Publish a test post; verify listing/article/category/tag routes and pagination on mobile and desktop. Confirm a new post appears after the cache refresh without a redeploy.
2. Inspect source: public-domain canonical, title/description, author/dates, correct OG image and BlogPosting/BreadcrumbList JSON-LD. Check with Schema.org Validator and a sharing debugger. No temporary-domain canonical and no public blog noindex.
3. Edit, unpublish, and verify current article content/404 respectively; verify unpublished articles disappear from the sitemap. Also test a nonexistent slug with `curl -I`.
4. Check featured images/inline media and alt text, narrow tables, long headings, loading/error states and keyboard pagination. Optimized images cannot be verified against the real CMS while network access is blocked.
5. Use GTM Preview/GA4 DebugView and your own inbox to test actual form delivery and analytics, preserving existing IDs/events. Local tests validate the endpoint's rejection path without sending email.
6. Submit the existing `/sitemap.xml` in Search Console/Bing; do not create a second conflicting sitemap.

## Files

Created: `lib/wordpress/{config,api,html}.ts`; `components/blog/{BlogCard,BlogImage,BlogListing,ArchivePage}.tsx`; `app/blog/{layout,page,loading,error}.tsx`, `app/blog/blog.css`, `app/blog/[slug]/page.tsx`, `app/blog/category/[slug]/page.tsx`, `app/blog/tag/[slug]/page.tsx`; `proxy.ts`; `scripts/fixtures/wordpress.mjs`; `scripts/verify-wordpress-blog.mjs`; this guide.

Modified: `next.config.ts` (media host), `lib/site.ts` and `components/Footer.tsx` (Blog links), `components/Navbar.tsx` (tablet navigation spacing), `app/sitemap.ts` (published posts), `.env.example`, `package.json`/`package-lock.json` (HTML sanitizer/types/entity decoder), `scripts/verify-seo.mjs` (preserve its original portfolio checks alongside new blog URLs), `README.md` (guide link). Existing contact delivery, analytics implementation, brand colors, service/case-study URLs, and homepage content are preserved.

## Remaining external checks

This environment's egress proxy returned CONNECT 403 for the real WordPress API, including an escalated retry. Live connectivity, actual WordPress content/images, publication settings, inbox delivery, browser/mobile rendering and deployed analytics need verification on Hostinger. No WordPress settings, hosting environment variables or CDN settings were changed automatically.
