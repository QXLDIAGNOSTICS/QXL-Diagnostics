# QXL Diagnostics — Senior Director implementation and release-control pack

> **In this repo:** reference material only — nothing here is wired into the Next.js app. The SQL migrations, Python clinical engine, Lighthouse/RUM configs and QA contract need developer review against the real backend before use (see steps below). The Kengeri/North Hub certificate rules described here are already applied in the site (`NABLM1126KA10694` for Kengeri, `MC-10025` for North Hub).
26 November 2026 | Preferred host: https://qxldiagnostics.com

## Evidence baseline and non-regression
Previous inventory: 683 entries. Latest audit: 559 entries, 558 unique; exact duplicate /for-doctors. Blog sitemap 123→161, knowledge 126→3. These are sitemap counts, not indexed pages or deleted pages. The current accreditation and host changes must be preserved. Kengeri NABLM1126KA10694 valid to 22 Nov 2030 (in lieu of MC-6849); North Hub MC-10025 valid to 1 Apr 2030. Scope-specific only. Historical MC-6849 references are permissible when clearly labelled historical. Both certificate image links were observed; full documents and scopes require verification. AI files were content-updated but still declare 20 Oct 2026. Regenerate from master data and change timestamp on actual content change. Do not claim AI ranks or citations on the basis of robots rules or llms files.

## Apply in sequence
1. Snapshot Git, DB schema, CMS and pre-deploy URL inventories, search-console page/query performance (last 90 days), backlinks and current sitemaps. Keep a release rollback plan. Do not change any production data using these reference migrations without developer review, backup, staging execution and role mapping.
2. `clinical/patches.md`: medically review exact copy, replace at source; verify affected pages, metadata and AI files. `db/003_clinical_governance.sql`: draft version registry; bind approval to actual staff role. No false reviewed-by attribution.
3. `db/001_serviceability.sql`, `db/002_import_postcodes.sql`: adapt to existing PostgreSQL/other DB, import official postal source; logistics must independently approve coverage, route feasibility and test policies. PIN is postal geography, not a service promise. No invented Bengaluru PINs, coverage or fees. Wire existing server endpoint to `check_eligibility` with server-priced basket. Return provisional result only. At checkout verify exact address, slot, price and clinical transport, then reserve in transaction. Never expose database credentials or privileged tables to browser. Validate SQL against actual PostgreSQL version; not executed here.
4. `seo/schema.mjs`: integrate with existing server-rendered HTML, pass only verified visible facts. Maintain permanent preferred-host redirect and self-canonical. Use same entity IDs on all pages. MedicalTest and MedicalWebPage are semantic types, not promises of rich results. Validate via Schema.org Validator and Google Rich Results Test for supported types. Keep FAQs visible; no promise of FAQ rich results. Do not create schema for fake facilities, reviews or unapproved medical claims. Google AI features require sound search fundamentals, not special AI schema.
5. `seo/sitemap_audit.py`: run as described below. Reconcile every removed URL (not just counts). Validate rendered HTML, robots, canonical, status, internal links, GSC coverage and Google-selected canonical. Do not auto-redirect unrelated content to home. Keep original unique clinical articles even if they are not currently in a sitemap; restore indexable ones or map a clinically equivalent replacement.
6. `performance/vitals.mjs`: wire to consent-aware frontend and approved first-party RUM endpoint. No sensitive routes or patient payloads; suppress referrer and access logs appropriately. `performance/lighthouserc.cjs`: install Lighthouse CI, run mobile plus desktop separate configs. Reserve image sizes, optimise hero images, defer nonessential third-party scripts, split JS bundles, avoid unnecessary client hydration, use CDN caching only for public pages; never cache reports or protected endpoints. Track 75th percentile field LCP <=2.5s, INP <=200ms, CLS <=0.1 per device; collect enough real-world samples. Lighthouse alone is not field evidence. Do not blindly preload all images.
7. `qa/integration_contract.md`: map all scenarios to actual staging endpoints; use official ITDOSE and payment sandbox docs and synthetic fixtures. `qa/test_contract.py` has four read-only contract smoke checks; complete transaction, webhook, concurrency and restore tests in the actual app suite. Never run on production. Test failures/skip are not PASS.
8. `clinical/radar_spec.md`, `clinical/engine.py`: clinician-only prototype, no clinical rules or absolute risk model enabled by default. Independent clinical approval and validation required. The model callback is a placeholder integration boundary, not a clinically validated algorithm; developer must implement approved model source, eligibility and result validation. Never use an unreviewed callback or user-provided rule configuration in production. Follow the controlled release stages.
9. Complete `compliance_tracker.csv` for all 33 items with exact URL, owner, commit, deployment date, evidence and actual result. No completion status without evidence. Clinical director, logistics, quality, security and management sign-offs separate.

## Commands (from pack root)
```
# standard library, Python 3.10+
cd clinical && python -m unittest -v && cd ..
python seo/sitemap_audit.py --old previous_urls.csv --out audit --check-limit 25
# after approved off-peak crawl window, check all URLs (including historical removals)
python seo/sitemap_audit.py --old previous_urls.csv --out audit_full --check-limit 0
# old CSV requires header url; missing archive cannot be reconstructed from counts
node --check seo/schema.mjs
node --check performance/vitals.mjs
# integrate into existing package; run from developer repo with config path adjusted
npm install web-vitals
npm install -D @lhci/cli
npx lhci autorun --config=performance/lighthouserc.cjs
# staging env vars must be securely configured as documented in qa/test_contract.py
python -m unittest discover -s qa -p 'test_*.py' -v
```

## Sitemap acceptance gate
Reconcile removed URLs against pre-deployment snapshots, CMS published export, GSC landing pages and links. Classify: RETAIN/RESTORE (unique valuable content, 200 indexable canonical, in sitemap and linked); MERGED (301/308 to genuinely equivalent destination, canonical destination in sitemap, internal links updated); RETIRE (approved obsolete content, correct 404/410 if no equivalent, remove links); PRIVATE/NOINDEX (intentional, protected; excluded); INVESTIGATE (hold release until resolved). Validate target chain, clinical equivalence, actual response codes and metadata, rendered main content, lastmod accuracy, coverage and traffic after release. No unapproved loss of unique medical content. Recheck /for-doctors cross-sitemap duplication. Retain new pancreatic and cardiovascular articles only if clinically approved, unique and technically accessible. The script is read-only, records HTTP signals, and does NOT decide which clinical articles to remove, verify robots permissions, follow redirects or establish Google indexing. No historical URL-level archive was supplied to the assistant. Developer must provide it for a defensible reconciliation.

## Source references
- CDC HIV testing: https://www.cdc.gov/hiv/testing/
- CDC 2025 nPEP: https://www.cdc.gov/mmwr/volumes/74/rr/rr7401a1.htm (reconcile with Indian protocol before release)
- AAAAI food IgG: https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/igg-food-test
- India Post OGD: https://data.gov.in/catalog/all-india-pincode-directory-through-webservice
- Google sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google canonical: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google AI search: https://developers.google.com/search/docs/appearance/ai-features
- Core Web Vitals: https://web.dev/articles/vitals
- WHO CVD risk charts: https://www.who.int/news-room/detail/02-09-2019-who-updates-cardiovascular-risk-charts
- WHO risk chart derivation: https://pubmed.ncbi.nlm.nih.gov/31488387/
- AHA PREVENT population: https://professional.heart.org/en/guidelines-and-statements/about-prevent-calculator
- Biological variation evidence candidate: https://biologicalvariation.eu/

## Test evidence and limitations
Nine synthetic clinical unit tests passed locally. Python sitemap utility compiled; JavaScript files passed syntax checks. No live backend tests were executed: staging contract suite skipped because no authorised staging configuration was supplied. No SQL migration was executed; no Lighthouse data collected; no live website modified; no clinical model coefficients, source dataset, vendor API secrets or historical URL list supplied. This is a reference pack, not production certification, a turnkey risk calculator or a complete vendor-specific backend. Review against actual codebase and version dependencies. Clinical and privacy compliance require qualified approval.
