# Umer Iftikhar: Portfolio

Performance marketing & web development portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4** and **Framer Motion**. Live at [umeriftikhar.online](https://umeriftikhar.online).

## Development

```bash
npm install
cp .env.example .env.local   # fill in EMAIL_USER / EMAIL_PASSWORD
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Project structure

| Path | Purpose |
|---|---|
| `lib/site.ts` | Site config: domain, contact details, socials, stats, nav, GTM ID |
| `lib/services.ts` | All service page content (8 services). Edit copy here. |
| `lib/case-studies.ts` | All case study content. Add a new object to add a new case study page. |
| `lib/seo.ts`, `lib/schema.ts` | Metadata helper and JSON-LD (Person, ProfessionalService, WebSite, Service, FAQ, Breadcrumb, Article) |
| `lib/analytics.ts` | `track()`: pushes events to the GTM dataLayer (and Meta Pixel if loaded) |
| `app/services/[slug]`, `app/case-studies/[slug]` | Statically generated page templates |
| `app/api/contact/route.ts` | Lead form endpoint: validation, honeypot, timing check, rate limit, email |
| `components/sections/*` | Reusable page sections (hero, grids, process, FAQ, CTA form) |
| `components/case-study/*` | Case study cards, cover and code-drawn gallery visuals |

Adding a service or case study only requires adding data. Pages, sitemap, nav, footer and OG images update automatically.

## Analytics events

GTM (`NEXT_PUBLIC_GTM_ID`) loads on every page. These events are pushed to `dataLayer`. Create GA4 / Meta tags for them in GTM:

| Event | When | Params |
|---|---|---|
| `generate_lead` | Lead form submitted successfully | `form_source`, `service` |
| `cta_click` | Any element with `data-cta` clicked | `cta_label`, `link_url`, `page_path` |
| `whatsapp_click` | Any `wa.me` link clicked | `link_text`, `page_path` |
| `email_click` | Any `mailto:` link clicked | `link_text`, `page_path` |
| `phone_click` | Any `tel:` link clicked | `link_text`, `page_path` |
| `assistant_open` | Floating assistant opened | `page_path` |
| `assistant_form_start` | Assistant form opened (optionally from a service chip) | `service` |

Leads sent from the assistant have `form_source = assistant-widget`.

If `NEXT_PUBLIC_META_PIXEL_ID` is set, the Pixel loads directly and `Lead` / `Contact` events fire automatically.

## Deploying on Hostinger (Node.js)

1. Node.js version **20.9 or newer**.
2. Build command: `npm run build` · Start command: `npm start`.
3. Add environment variables from `.env.example` in the Hostinger panel (at minimum `EMAIL_USER` and `EMAIL_PASSWORD`, a Gmail App Password).
4. Redeploy after changing any `NEXT_PUBLIC_*` variable (they are embedded at build time).
