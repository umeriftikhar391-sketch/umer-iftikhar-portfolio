# Technical SEO changes

## Source

The multi-page source matching the audit was found on `origin/claude/festive-clarke-t05i5w` (74bfafb). The local work branch was fast-forwarded to it; no remote branch was pushed. First-pass edits against the old homepage-only source remain recoverable in the stash named `Preserve first-pass SEO fixes before using multi-page source`.

## Implemented

- 301 www to non-www with paths and query strings retained.
- Per-page canonicals; no root canonical inherited by 404 pages; explicit noindex for 404s.
- Final stats in server HTML, visual-only count animation, stable assistive text and reduced-motion support.
- Name-first homepage H1 with explicit whitespace; immediate hero rendering. Removed the full-screen page loader and initial page-level fade that delayed visible content.
- One-hour ISR on marketing pages; static fingerprinted assets retain independent caching.
- Security headers and disabled X-Powered-By. HSTS is host-only until all subdomain HTTPS coverage is confirmed.
- Plain schema email, E.164 phone, repository GitHub profile and About ProfilePage schema. JSON-LD escaping corrected.
- Sitemap dates use real source-history dates stored in `lib/content-dates.json`, not build timestamps; no changefreq/priority. Shared source changes legitimately have the same date. Update the affected path's date when its content materially changes; never reset all dates on a rebuild. Dates for service/case-study content reflect the last commit to their shared data source. New routes without a known date omit lastmod.
- Removed meta keywords and robots Host directive.
- Dynamic imports for below-fold sections/form retaining SSR. Local Inter Tight variable font (Fontsource 5.3.0, SIL OFL license alongside it), `display: swap`; builds no longer depend on Google Fonts access.
- Optional IndexNow ownership endpoint and a deploy-side submission script. No unauthenticated public submission API.

## IndexNow activation

Generate an ownership token with `node -e "console.log(require('node:crypto').randomBytes(16).toString('hex'))"`. Set it as `INDEXNOW_KEY` in the deployed app and deployment job. This is a public ownership token, not an application password. Confirm `/indexnow-key.txt` serves it. After a successful production deployment, run `node scripts/submit-indexnow.mjs` with the same environment settings. The script verifies ownership, reads the deployed sitemap, restricts URLs to the configured HTTPS origin, then submits to IndexNow. Use `--dry-run` to inspect URL selection without submitting. This is prepared but not externally submitted or registered in a hosting deploy hook because this checkout has no deployment workflow.

## Still needs hosting/account access

- Deploy these changes through the existing hosting workflow; purge Hostinger CDN HTML after deployment and verify public cache age/TTL does not override one-hour ISR.
- Domain verification and sitemap submission in Google Search Console/Bing Webmaster Tools, followed by URL inspection and indexing requests where appropriate.
- Public Rich Results/Schema.org validation and mobile PageSpeed/CWV checks on the homepage, SEO service page and case study. Local HTML checks do not establish field LCP/INP/CLS or indexing.
- Karachi is now confirmed by the supplied Meta Ads replacement copy and included in the Person and ProfessionalService address schema. An official logo and public price range have not been supplied, so those fields remain omitted. Additional sameAs profiles should only be added when verified.

The live domain is blocked by this environment's network proxy (CONNECT 403); no live deployment, cache purge, indexing submission, or production performance result is claimed.

## Verification

Run `npm run build` and `npm run lint`. Start the production server with `npm run start -- --hostname 127.0.0.1 --port 3003`, then run `node scripts/verify-seo.mjs`. It requests all 20 sitemap pages and checks actual server HTML, canonical ownership, schema, headings, stats, headers, ISR, 404 behavior, crawl files, and path/query-preserving www redirect. With `INDEXNOW_KEY` set in both processes it also checks the ownership endpoint; without it, the endpoint must return 404.
