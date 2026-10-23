# Eight-service replacement copy

Applied from `Umer-Iftikhar-Service-Pages-SEO-Plan.docx` (24 October 2026).

- All eight existing service URLs are retained. No slug migration or new redirect rules were added.
- Publishable sections C and D live in `lib/service-page-copy.json`; strategy notes, keyword volumes, implementation notes and confirmation checklists are not rendered.
- `ServiceContentPage` renders the shared brand layout, scope lists, process, measurement sections (Meta Ads, Google Ads and SEO), proof, FAQs and forms. The seven non-AI pages contain eight FAQs each; AI Automation contains seven.
- Conditional AI chatbot and WhatsApp Business automation cards, tool and FAQ are excluded until confirmed. No numeric results, ratings, credentials, prices or partner badges were added.
- Metadata uses each package's exact SEO and social copy. Per-service social images remain at the existing `/services/<slug>/opengraph-image` path, generated at 1200×630 with the supplied alt text and a neutral brand design. Optional client screenshots and process illustrations are not added.
- WebPage, Service, BreadcrumbList and FAQPage nodes have stable linked IDs. Business catalog entries reference Service IDs while retaining name and URL for consumers that do not resolve cross-page references.
- Navigation and form labels use a lightweight service directory to avoid shipping the full replacement copy in client JavaScript. Keep this directory's names, summaries and tags aligned with the page copy when editing them.
- Forms preserve field names, validation, endpoint, service choices and tracking hooks. Each page preselects its existing service name. Only the privacy note's spelling changes to “inquiry”. No emails were sent in validation.
- Service sitemap modification dates are set to 2026-10-24 for this content update; other routes' dates are preserved. Indexing and cache refresh take effect only after deployment.

Validated locally: production build/TypeScript, ESLint, `verify-service-plan.mjs` (copy across all sections, 63 FAQs, schema/visible FAQ agreement, metadata, image responses and dimensions, links, conditional exclusions and form defaults), plus the existing Meta Ads and 20-page SEO checks. Client case-study service tags were checked against the plan and already agree.

After deployment, clear Hostinger's HTML cache and review mobile layout, share previews and external schema validators. With your own account access, verify tracking in GTM/GA4/Meta test tools, test email delivery, and request indexing for the eight unchanged URLs. No production deployment, email delivery, field performance result or search-engine indexing result is claimed by the local checks.
