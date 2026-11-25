# QXL Diagnostics — seven medically reviewed super-speciality test articles

**Editorial date:** 2026-11-21  
**Reviewer/author:** Dr Shantakumar Muruda, MD (Medical Biochemistry), Senior Consultant and Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru  
**Intended stack:** Next.js/React on Vercel/GitHub; HTML files remain framework-agnostic.

## Contents

* `word_documents/` — seven editable DOCX articles with clinical content, packages, 38 FAQs each and references.
* `publication_pdfs/` — matching PDF editorial proofs.
* `markdown_sources/` — seven original Markdown source articles.
* `website_html/` — seven full, standalone accessible HTML documents with canonical, meta, Open Graph and JSON-LD.
* `jsonld/` — the structured-data graph for each page; every FAQ appears in the visible article.
* `nextjs_handoff/` — example `app/blog/[slug]/page.tsx` with `qxl-medical-articles.json`; integrate into the current Next.js routing scheme; do not replace existing pages blindly.
* `SEO_CMS_Import_Manifest.csv` — canonical routes, metadata and editorial status.
* `QXL_Proposed_Seven_Test_Packages.csv` — seven clinician-oriented package concepts (not orderable live SKUs).
* `QXL_Publication_Readiness_Guide.docx` — deployment, quality and compliance acceptance checklist.

## Exact clinical content policy

The article copy is educational and intentionally avoids self-diagnosis, false cancer-screening promises or unapproved clinical claims. Where operational information cannot be independently verified, show exactly: **Contact QXL Diagnostics Super Speciality Lab Bengaluru. WhatsApp for Details.**

**TAT:** display `Same Day*` only with an asterisk and operational verification qualification. This is a requested editorial label, **not independent proof of an actual service-level guarantee for every test or specimen**. Confirm sputum/extrapulmonary molecular availability, collection cutoff and reflex/panel reporting in particular.

**Availability:** user-directed display `Test available at QXL Diagnostics`; confirm the current assay methodology, whether testing is on-site or referred and the individual analyte's current accreditation scope. NABL certificate MC-6849 does not by itself substantiate every test as in accredited scope.

**Prices:** no invented prices, package MRPs or discounts. Package prices and exact components must be approved and mapped to LIMS before the SKU or booking button is activated.

## SEO, AEO, GEO and AI-search implementation plan

1. **Deduplicate.** Inspect the existing `/tests`, `/knowledge-centre`, `/specialities/oncology`, `/specialities/womens-health` and any live `/blog` routes; use one canonical medical educational article per intent. Keep the dynamic test booking SKU page separate from medically educational blog content, with clear cross-links. Redirect true duplicates with 301; do not wipe working indexed pages.
2. **Deploy metadata** exactly as in the manifest, then verify canonical consistency, trailing slash policy, `www`/non-`www`, hreflang if multilingual, mobile rendering, robots and noindex staging. Use server-rendered content, not client-only fetch.
3. **Structured data:** `MedicalWebPage`, `MedicalTest`, `FAQPage`, `BreadcrumbList`, author/reviewer and medical organisation. The FAQs in the JSON-LD must remain visibly identical to the actual article. Google sharply limits FAQ rich results; markup is **not** a guarantee of a FAQ feature or AI citation.
4. **Publisher provenance:** show reviewer credentials, last-reviewed date, sources with readable links, clinical limitations, and local site address/contact. Add actual updatedAt date only after publishing a change.
5. **Internal links:** link from `/tests` and relevant existing speciality hubs to each article; reciprocal clinically relevant links: CA-125 ↔ oncology/women’s-health; PSA ↔ oncology; PTH ↔ bone/mineral or renal sections; ANCA ↔ immunology/nephrology; calprotectin ↔ tTG-IgA chronic-diarrhoea differential; TB ↔ microbiology/molecular. Never link to an unverified route or pretend a package is already in the booking catalogue.
6. **Indexing:** add live pages to XML sitemap on deployment, include stable lastmod dates and test with Search Console URL Inspection and Bing Webmaster Tools. Submit only final canonical 200-status URLs.
7. **Performance:** pre-render HTML, avoid blocking scripts, optimise Core Web Vitals, semantic h1/h2/h3, explicit contact CTAs, mobile CTA, descriptive anchor text, accessible FAQ headings and no duplicate FAQ text across hidden pages.
8. **Measure:** tag organic leads/WhatsApp enquiries with page path + test topic without transmitting personal health information. Track GSC impressions, clicks, position and CTR by query/page; Bing Webmaster Tools, referrers and monthly documented AI answer spot-checks for a stable prompt set. AI answer inclusion is nondeterministic; no honest agency can promise #1 in ChatGPT/Gemini/Perplexity.
9. **Regulatory safety:** tumour markers are not general screening tests, PTH must be calcium-paired, ANCA does not establish vasculitis, calprotectin does not replace cancer investigation, tTG testing requires gluten intake and total IgA, and TB PCR specimen/platform/drug-resistance reporting must be exact.
10. **Before go-live:** clinician content sign-off and automated schema validation, route duplicate scan, link crawler, mobile rendering audit, consent/privacy review, and documented lab director/quality manager approval for all test availability and accreditation scope claims.

## User-specified web links (verified public routes)

- QXL website: https://www.qxldiagnostics.com
- Diagnostic test directory: https://www.qxldiagnostics.com/tests
- Knowledge Centre: https://www.qxldiagnostics.com/knowledge-centre
- Existing oncology speciality: https://www.qxldiagnostics.com/specialities/oncology
- Existing women's health speciality: https://www.qxldiagnostics.com/specialities/womens-health
- Contact: https://www.qxldiagnostics.com/contact
- Book test: https://www.qxldiagnostics.com/book

## Critical scientific updates included

- **2026 NICE NG12 CA-125:** referral thresholds for symptomatic patients aged 40–49 ≥35, 50–59 ≥31, 60–69 ≥24, 70–79 ≥25, age 80+ ≥31 IU/mL; age ≤39 do not rely on CA-125 alone. UK clinical referral rules, not universal Indian lab reference intervals.
- **2026 BSG coeliac:** selective specialist-led no-biopsy diagnosis when high-titre tTG-IgA and conditions are met, not automatic for everyone.
- **WHO 2025/2026 TB:** upfront molecular NAAT selection is specimen/technology specific; WHO's October 2026 diagnostic-product list is included in citations.

## References and version control

Each article contains its own relevant peer-reviewed or authoritative guideline links. A user-provided historical *Tietz lab tests* PDF informs basic laboratory methodology; the newer guideline recommendations take precedence in case of change. No copyrighted textbook chapter or figure has been reproduced.

**Deployment warning:** `datePublished`/`dateModified` in generated JSON-LD currently reflect the editorial review date. Change to the actual website publication and material revision dates at deployment, if different. For packages and services, continue displaying `Test Details: Contact QXL Diagnostics Super Speciality Lab Bengaluru. WhatsApp for Details.` until approved by operations.
