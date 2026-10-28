# ROAS calculator: benchmark data and maintenance

Route: `/tools/roas-calculator`

## Current status: no benchmark records published

`lib/benchmarks/benchmark-data.ts` ships with `BENCHMARKS = []`.

When the calculator was built, the primary publishers (`www.wordstream.com`, `localiq.com`) could not be reached from the build environment. Search results only reached secondary sites that quoted conflicting figures. Under the "verified from the original source only" rule, nothing was published.

What the empty dataset means for visitors:
- Every industry, platform and country shows: "Reliable benchmarks are not currently available for this industry and market. Enter your own campaign assumptions to create a forecast."
- Visitors forecast with their own assumptions, or with the clearly labelled **Illustrative Scenario** example (`ILLUSTRATIVE_EXAMPLE` in `lib/calculators/state.ts`). Those round example numbers are not industry data and are never labelled as benchmarks.
- The comparison table, source panel and "Use benchmark values" button appear automatically as soon as a matching record exists. No UI changes are needed.

## How to add benchmarks

1. **Open the original publication**, not a blog quoting it. Candidates: the WordStream/LocaliQ Google Ads and Facebook Ads benchmark reports, First Page Sage, platform research from Google or Meta, or reputable industry studies.
2. **Copy figures exactly** as published: no rounding, averaging across sources, or estimating missing cells. If a metric isn't published, leave it out.
3. **Create one record per combination** of industry × platform × geography × campaign type × source × year in `BENCHMARKS`:

   ```ts
   {
     industryId: "legal-services",              // our id from lib/benchmarks/industries.ts
     sourceCategory: "Attorneys & Legal Services", // the publisher's own label
     platform: "google-search",                 // never reuse search data for Meta or Display
     geo: { type: "country", code: "US" },      // where the data comes from
     campaignType: "leads",                     // leads | sales | traffic | all
     year: 2025,
     sourceName: "…", sourceUrl: "https://…", verifiedAt: "YYYY-MM-DD",
     currency: "USD",
     statistic: "average",                      // or "median", as the source states
     avgCpc: …, conversionRate: …, avgCpl: …,   // only metrics the source publishes
     metricDefinitions: { avgCpc: "…", conversionRate: "…", avgCpl: "…" },
     limitations: "e.g. US advertisers only; search campaigns on Google and Microsoft Ads combined",
   }
   ```

4. **Map industries carefully.** Map only when the publisher's category genuinely matches ours.
   - Example: the source's "Dentists & Dental Services" covers only part of our "Healthcare & Dental". Either skip it or explain the partial fit in `limitations`.
   - Never create records for `other`.
5. **Choose geography honestly.** A US study is `{ type: "country", code: "US" }` and is never shown for Pakistan, the UAE or any other country.
   - Regional or global data uses `{ type: "region", id, name }` or `{ type: "global" }`.
   - Regional data needs `allowBroaderUse: true` before it applies to individual countries.
   - Region membership lives in `REGIONS` in `lib/benchmarks/industries.ts`.
6. **Validate:** run `npm test`. The schema test runs `validateBenchmarkRecord` on every shipped record. It rejects:
   - unknown industries,
   - non-https sources,
   - bad dates,
   - percentages over 100,
   - metrics without a definition,
   - records that publish no metrics.
7. **Re-verify yearly.** Update `verifiedAt` whenever you re-check a source, and replace records when a newer edition is published.

## Matching rules (`lib/benchmarks/benchmark-matcher.ts`)

1. **Platform:** must match exactly.
2. **Industry:** must match exactly. "Other" and custom industries never match.
3. **Campaign type:** must suit the objective.
   - Leads → `leads` or `all`
   - Purchases → `sales` or `all`
   - Acquire customers → `sales`, `leads` or `all`
   - Traffic → `traffic` or `all`
4. **Geography:** exact country first, then a named region that lists the country, then global. Regional and global records apply only when they allow broader use.
5. **Tie-breaks:** the newest year wins, then an exact campaign type over `all`.
6. **Money comparisons:** CPC, CPL and CPA are compared only when the visitor uses the record's currency. Nothing is converted.

## Calculator code map

| File | Purpose |
|---|---|
| `lib/calculators/roas.ts` | Pure forecast, actual-performance and scenario maths (no NaN/Infinity) |
| `lib/calculators/validations.ts` | Parsing and field validation, with limits |
| `lib/calculators/state.ts` | Reducer: "Other" handling, value-source labels, reset |
| `lib/calculators/share.ts` | Share-link encode/decode (forecast assumptions only) |
| `lib/calculators/format.ts` | `Intl.NumberFormat` currency, percent and ROAS formatting |
| `lib/calculators/content.ts` | Formula list and FAQ copy (FAQ schema is generated from it) |
| `lib/benchmarks/industries.ts` | Industries, platforms, objectives, markets, currencies, regions |
| `components/tools/roas-calculator/*` | UI: form, dashboards, chart, scenarios, break-even, CTA |
| `tests/roas-calculator.test.mjs` | Unit tests (`npm test`) |

## Privacy

- Calculations run entirely in the browser. No calculator inputs are sent to the server.
- Analytics events (`calculator_copy_results`, `calculator_share_link`, CTA clicks) carry only the mode, never figures.
- Share links contain forecast assumptions only. Actual-mode spend and revenue are never put in a URL.
- Contact details are sent only when the visitor submits the audit form. That form uses the existing `/api/contact` endpoint, with its validation, honeypot, timing check and rate limit.
