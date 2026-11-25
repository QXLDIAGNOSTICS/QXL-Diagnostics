# Technical SEO + answer-engine implementation plan: QXL pancreatic symptom cluster

## What this release contains

The package ships **9 non-duplicative content pages**, complete medically framed FAQ sections, explicit authoritative references, linked QXL services, schema and Next.js App Router route templates. The reference `.md` files are the editable source; the JSON data has pre-rendered, source-controlled HTML for server rendering. The only brand claims used are grounded in QXL's live gastroenterology, oncology, blog and team pages.

## Technical deployment (GitHub + Vercel, Next.js App Router)

1. Identify whether existing project uses `app/` or `src/app/` and whether it already owns `/blog/pancreatic-cancer-vs-acidity` and `/health/pancreas/[slug]`. **Never blindly overwrite existing routes.** The templates assume `src/app/` and Next 15+ Promise-based `params`; adapt if running Next 14. Repo may be a different framework; these are examples to integrate, not proof of compatibility.
2. Copy contents of `nextjs/src/components`, `nextjs/src/content` and two routes to corresponding app paths, preserving current site layout, CSS, breadcrumbs, analytics and booking architecture.
3. The named medical reviewer authorised the nine articles on **20 November 2026**; all content entries now have `reviewStatus: approved`, `reviewedOn: 2026-11-20`, and an initial `publicationDate: 2026-11-20`. **If first made public later, change publicationDate and the Markdown `published_on` field to the actual live date** (the review date stays 20 November).
4. Re-run production build; verify server HTML contains visible `h1`, question/answer, text, source links, canonical, metadata, JSON-LD, and reviewer, with JS disabled; test on mobile/desktop, accessibility and Core Web Vitals.
5. Merge `nextjs/sitemap-merge-snippet.ts` **into the site's existing sitemap**. No new sitemap should overwrite other routes. Set robots allow standard crawling. Avoid unintentional `noindex`, canonical conflicts, JS-only content or soft 404s.
6. Where medical FAQs are displayed, FAQPage JSON-LD may describe them, but **Google largely restricts FAQ rich results** and schema is not an AI ranking guarantee. BlogPosting + BreadcrumbList should reflect visible content. Run Schema.org validator and Google Rich Results Test. Google decides eligibility.
7. Confirm `OAI-SearchBot`, `Googlebot`, `Bingbot` and other desired search crawlers are not blocked by your CDN firewall or robots policy. Don't make assertions that `llms.txt` guarantees AI citations. Avoid publishing sensitive patient data to crawlers.
8. Link flagship from `/blog` and from `/specialities/gastroenterology` and `/specialities/oncology`. Link related guides contextually, not sitewide spam. Do not add every keyword to every page.
9. Submit sitemap to Google Search Console and Bing Webmaster Tools; use IndexNow where properly configured on eligible engines (Bing), not a fabricated universal indexing API. IndexNow does **not** guarantee indexing.
10. Maintain medically relevant last reviewed date, named author/reviewer with live `/team` credential profile, cited primary sources, conflict-of-interest/commercial role disclosures, factual update history, contact and privacy policy.
11. Don't create auto-translated Kannada/Hindi pages unless medically checked by a fluent reviewer; if genuine translations are made, implement `hreflang` reciprocal mappings and self-canonical language pages.
12. Make all booking CTA links functional and clinically gated. No “book now to rule out cancer” claims. Proposed packages remain with `bookingEnabled: false`. QXL management requested **Same Day** as indicative TAT and **Test available at QXL Diagnostics** as the availability display. Verify each test, sample cut-off and WhatsApp number before enabling any commerce.

## SEO architecture and canonical decision

| Intent | Canonical path |
|---|---|
| broad cancer vs acidity | `/blog/pancreatic-cancer-vs-acidity` |
| specific symptom list | `/health/pancreas/early-warning-signs` |
| CA19-9 meaning and false results | `/health/pancreas/ca-19-9-test` |
| diagnostic investigations | `/health/pancreas/blood-tests-imaging-biopsy` |
| diabetes plus weight loss | `/health/pancreas/new-diabetes-weight-loss` |
| obstructive jaundice | `/health/pancreas/jaundice-dark-urine-pale-stools` |
| faecal elastase and fat maldigestion | `/health/pancreas/greasy-stool-fecal-elastase` |
| hereditary risk | `/health/pancreas/family-history-screening` |
| gastritis vs other GI pain | `/health/pancreas/gastritis-reflux-vs-pancreatic-pain` |

**Dedup check before deployment:** A public search did not surface an exact existing pancreatic-cancer route, but a live website search cannot prove the absence of unpublished or uncrawled routes. Inspect repository, CMS, sitemap, GSC and existing `/health/*` pages to decide whether to upgrade, redirect or create. Do not publish two pages that serve the same exact intent.

## Multi-engine and AI search reality

- Google Search / AI Overviews / AI Mode / Gemini: improve visibility through helpful indexable content, sources, accurate metadata, effective HTML and crawl access. There is no separate guaranteed “AI schema”.
- Microsoft Bing / Copilot / Yahoo / DuckDuckGo: Bing indexability, sitemap and proper IndexNow submissions can help discovery; each platform has independent retrieval/ranking logic.
- ChatGPT Search, Perplexity and other web-enabled AI: cite-friendly sections with clear independent evidence, accessible source URLs, title/entity consistency and transparent provenance can improve eligibility; ranking/citation not guaranteed.
- Claude, Grok, Meta AI and DeepSeek: availability of live web retrieval differs by product, mode, country and date. Do not claim an answer engine indexed a page without reproducible observation.

## Measure after publication; don't invent search volume or rankings

### Google Search Console

Track 9 canonical pages and associated **non-branded** query clusters. Export daily: clicks, impressions, average position and CTR, segment `country=IND` and search type `web`; **GSC country=India is not a city-level Bengaluru ranking filter**. Bengaluru-specific visibility requires supported city-level external rank tracking and/or other suitable measurements, not a pretend GSC city filter.

### Bing Webmaster Tools

Record indexed URLs, impressions/clicks where available, sitemap status, crawl failures, query distribution and IndexNow delivery/response.

### Answer-engine citation audit

Prepare a fixed set of 20 medically neutral prompts, e.g. “Can acidity be pancreatic cancer?”, “Does normal CA19-9 exclude pancreas cancer?”, “Best scan to assess suspected pancreatic cancer?”, “New diabetes and weight loss when to investigate pancreas?”, “Where can I get clinician-directed CA19-9 tests in Bengaluru?”. Test every two weeks across available engines. Record question, timestamp, region/language, whether QXL URL appears as source, source position when visible, factual correctness, whether the model actually used web, and screenshots where permitted. Repeat identical prompts; results are variable and personalised. **Do not claim all platforms are actively indexed or have identical capabilities.**

### What success means

Indexation of all approved pages; genuine non-branded impressions; medically accurate snippets; growth in qualified organic visits and clinician-suitable enquiries; source-linked AI citations where observable; no alarm-symptom lead funnel that delays urgent care.

## Primary public SEO references

- [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)
- [Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Bing IndexNow](https://www.bing.com/indexnow/getstarted)
