# QXL Diagnostics — Pancreatic Cancer / Acidity Clinical Content & SEO Developer Kit

**Created:** 20 November 2026 (India)  
**Source inspiration:** 19 November 2026 Times of India pancreatic-awareness feature. Original source is linked as background; no article prose has been copied.  
**Medical review:** **Medically reviewed and authorised for publication by Dr. Shantakumar Muruda, MD (Medical Biochemistry), Senior Consultant, Founder & CEO, QXL Diagnostics**, on **20 November 2026**, according to his explicit confirmation. Individual test-level operational validation remains separate.  
**Purpose:** Clinically responsible patient education and appropriately scoped laboratory enquiry, *not* an early cancer detection promise.

## What is included

- `articles/` — **9 original, complete articles**: 1 pillar guide (~2,300 body words, plus FAQs), 8 separate supporting topics, with FAQs and primary medical sources.
- `nextjs/src/content/pancreatic-pages.json` — data object with renderable, static source-controlled HTML content, structured FAQs and clinical review gating.
- `nextjs/src/components/PancreasArticle.tsx` — accessible server-rendered article + Article, FAQ and Breadcrumb structured data + internal links.
- `nextjs/src/app/blog/pancreatic-cancer-vs-acidity/page.tsx` — Next.js App Router flagship route.
- `nextjs/src/app/health/pancreas/[slug]/page.tsx` — 8 static supporting routes.
- `nextjs/sitemap-merge-snippet.ts` — approved URLs for merging into existing sitemap.
- `packages/proposed-package-catalog.json` — **5 proposed, non-bookable**, clinician-directed assessment/service pathway definitions; management-provided **Same Day** indicative TAT and explicit verification caveat, no invented prices.
- `packages/clinical-commercial-approvals.md` — operational checklist before package activation.
- `clinical/triage-flowchart.mmd` — six-step clinician referral triage diagram.
- `clinical/editorial-quality-and-approval.md` — reviewer credentials, textbooks/clinical reference context and mandatory review.
- `seo/keyword-intent-map.csv` — **100 plausible, non-branded search query candidates**, NOT measured search volume or ranking.
- `seo/developer-seo-aeo-geo-checklist.md` — GitHub/Vercel/Next and Google, Bing, AI-citation measurement rollout.
- `seo/site-correction-ticket.md` — critical live-site medical copy fixes.

## Publication-ready launch sequence

1. Medical reviewer authorisation has been provided for the **nine articles** on **20 November 2026**. All 9 page data entries now have `reviewStatus: "approved"` and `reviewedOn: "2026-11-20"`.
2. `publicationDate` is initialized to `2026-11-20` for technical publication readiness. **If the website's first public release occurs later, update `publicationDate` to the actual live publication date in all JSON files and the nine Markdown frontmatters before deployment. Do not backdate web publication.** Keep `reviewedOn` unchanged unless medically re-reviewed.
3. Verify routes, duplicate URLs, indexing, source links, existing global layout, live contact phone, and whether +91 99646 39639 actually supports WhatsApp before merging this package with GitHub/Vercel.
4. Add links from gastroenterology, oncology and blog routes; validate structured data, sitemap, responsive/mobile layout and click-to-contact.
5. Management's requested indicative TAT is displayed as **Same Day**, with a prominent caveat that individual assays, stool samples and late collections can differ. **Do not promise an unconditional result by midnight or a specific hour.**
6. Package **bookingEnabled remains false**, pending LIS/individual test confirmation, payment, specimen SOP, internal TAT cut-off and finance sign-off. No test package is a screening test for pancreatic cancer.
7. Monitor Search Console, Bing Webmaster Tools and repeatable AI answer citation prompts; rankings and AI recommendations are not guaranteed.

## Source and scope notes

**Primary medical sources:** NCI, ACS, Indian pancreatic-cancer consensus 2025, NICE, AGA, ESMO, ACG, MedlinePlus and Mayo Clinic Laboratories, linked on each relevant article. Textbooks referenced in prior QXL project discussions include Harrison's and Tietz, plus Henry's and Dacie/Lewis as appropriate reference frameworks. The full textbook chapters were not independently inspected here, so the content does not purport to quote them.

**QXL verified current pages (web review, 20 Nov 2026):** `https://www.qxldiagnostics.com/`, `/specialities/gastroenterology`, `/specialities/oncology`, `/blog`, `/team`. For this kit, QXL is a *laboratory* provider; it is not implied to provide CT, MRCP, EUS, ERCP, specialist clinical consultations, or hereditary gene panels without separate confirmation.

**No rankings are fabricated.** These deliverables can improve technical eligibility and content quality, but search engines and generative AI systems independently choose what to show and cite.
