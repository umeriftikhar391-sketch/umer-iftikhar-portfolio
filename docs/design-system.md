# Design system: premium red-and-white

Visual layer only. Content, URLs, metadata, schema, tracking and form behaviour are unchanged by the redesign.

## Colour tokens (`app/globals.css` → `@theme`)

Each token is a Tailwind utility (`bg-brand`, `text-ink`, `border-line`, …). Use tokens, not hex values, in components.

| Token | Hex | Use |
|---|---|---|
| `brand` | #E53935 | Primary CTA background, large red headline accents, icons |
| `brand-hover` | #C62828 | CTA hover/active, **all small red text** (links, labels, eyebrows): 5.6:1 on white |
| `coral` | #FF5A5F | Decorative accents; red accents on the charcoal footer (5.4:1) |
| `blush` | #FFF5F5 | Alternating section backgrounds, chips, hover fills |
| `rose` | #FDE8E8 | Eyebrow pills, icon tiles, badges |
| `ink` | #1F1F1F | Headings, strong text, footer background |
| `body` | #475569 | Body copy (7.6:1 on white, 7.1:1 on blush) |
| `line` | #E5E7EB | Card and component borders |

Shadows: `shadow-card` (resting cards), `shadow-lift` (hover / featured cards), `shadow-cta` (primary buttons).

## Components and patterns

- **Eyebrow labels:** `className="eyebrow"`, a sentence-case rose pill. Avoid wide-tracked all-caps.
- **Buttons:** `components/ui/Button.tsx` (`primary` / `secondary` / `ghost`), 12px radius, `min-h-12` (48px) touch target, visible focus ring. `MagneticButton` matches the primary style.
- **Cards:** `rounded-2xl border border-line bg-white shadow-card`, hover `-translate-y-1 border-brand/30 shadow-lift`.
- **Sections:** `Section` with `glow` renders a blush band (`bg-blush border-y border-rose/70`) for alternation. Homepage sections alternate white / blush.
- **Headings:** section H2 `text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink`; page H1 via `PageHero`.
- **Forms:** `LeadForm` inputs are white, 48px tall, with a red focus ring and an invalid state on `aria-invalid`.

## Accessibility notes

- White on `brand` (#E53935) is 4.23:1. That passes WCAG AA for large text and UI components, but not for normal-size text (4.5:1). The brand spec sets this CTA colour. If strict AA for button labels is required, use `brand-hover` as the resting CTA colour.
- Red on white for small text: always `brand-hover`, never `brand`.
- Global `:focus-visible` outline uses `brand-hover`. `prefers-reduced-motion` disables animations.
