# QXL WEBSITE — DELIVERY CONTROL CENTRE

**Single Source of Truth for Technical Release, QA Verification, Clinical Governance, and Go-Live Signoffs**

> **IMPORTANT NOTICE:**  
> No current ranking, real-time analytics, measured Core Web Vitals, or production deployment is represented by this workbook without evidence-backed execution.

---

## 1. Backlog Health & Executive Summary

| Backlog health | Value | Rule / meaning |
| :--- | :--- | :--- |
| **Total actionable tasks** | **87** | 87 owner-assigned requirements with acceptance criteria |
| **P0 tasks** | **14** | Must be closed before go-live |
| **Completed tasks** | **0** | Only evidence-backed Done status |
| **Blocked tasks** | **0** | Escalate dependent issues |
| **Pending QXL approvals** | **87** | Quality, clinical, legal, operations approvals |
| **QA cases** | **61** | Functional, content, SEO and security QA |
| **QA passed** | **0** | Evidence-linked QA pass |
| **Signoff approved** | **0** | All required governance signoffs |

### Priority Breakdown
| Priority | Total tasks | Completed | Remaining |
| :--- | :--- | :--- | :--- |
| **P0 (Blocker / Must close pre-launch)** | 14 | 0 | 14 |
| **P1 (Core Quality & Experience)** | 64 | 0 | 64 |
| **P2 (Enhancements & Review)** | 9 | 0 | 9 |
| **Total** | **87** | **0** | **87** |

---

## 2. Required Weekly Management Rhythm

1. **Technical Lead:** Updates task statuses, evidence, and release blockers.
2. **Quality / Medical / Operations / Legal Owners:** Signs facts and safety gates.
3. **QA Lead:** Updates 61 test cases; do not treat tests as passed without physical execution.
4. **SEO / Analytics Lead:** Compares baseline vs verified post-deployment measures.
5. **CEO:** Reviews only material blockers and P0/P1 release risks.

---

## 3. Actionable Backlog Tasks (QXL-001 to QXL-087)

| ID | Priority | Sprint | Workstream | URL | Task | Implementation | Acceptance Criteria | Owner | Dependencies | Effort | Status | Evidence Link | QXL Approval | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QXL-001** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/quality-accreditation` | Verify current NABL certificate | Obtain renewed/current MC-6849 certificate and accredited schedule directly from quality head; publish validity and scope with supporting link; avoid implying every test accredited. | Quality head signs off current certificate and scope; public link opens; claims match certificate. | Quality Head | Updated NABL evidence | S | Not started | | Pending | |
| **QXL-002** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/` | Audit universal accreditation claims | Remove sweeping accredited claims from non-scope tests, clinical messages, packages and schema; use approved wording. | All site claims match scope and approved text on sampled 30 pages. | Medical Director | Accredited scope | M | Not started | | Pending | |
| **QXL-003** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/` | Delete design system demo on public homepage | Remove visible Liquid Glass Design System, CSS class demonstrations and developer-oriented text from patient HTML; do not just visually hide if indexable. | Demo terms absent from rendered public page source and search index after recrawl. | Web developer | Release access | S | Not started | | Pending | |
| **QXL-004** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/` | Single commercial product source | Connect cards, prices, discounts, package counts, inclusions, fasting, specimen and TAT to verified master/LIS catalogue; no hardcoded duplicates. | Same SKU matches across /, /tests, /packages, /book, details and llms.txt; exception list zero. | Product Owner + Developer | LIS catalogue export | L | Not started | | Pending | |
| **QXL-005** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/packages` | Resolve Quick Fit mismatch | Reconcile published Quick Fit analyte count, included panels, list and final charge, including promo boundaries and versioned SKU. | One approved count and one price across all surfaces; snapshot signed by accounts and lab. | Commercial + Lab Quality | Signed product master | S | Not started | | Pending | |
| **QXL-006** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/tests` | Review food-IgG claims | Medical lead to review food-specific IgG listing, descriptions, SEO aliases, recommendations and ad copy against professional guidance; remove misleading diagnosis claims. | Documented medical approval; no representation of IgG food panels as validated allergy/intolerance diagnosis. | Medical Director | Medical reference review | M | Not started | | Pending | |
| **QXL-007** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/` | Audit operational claims | Verify 24x7, 6h TAT, same-day, free collection, 60-minute pickup, all localities, all reports consultant signed; qualify or remove inaccuracies. | Site-wide claim inventory signed by Operations, Quality and Commercial; no unsupported promise. | Operations Lead | SLA & serviceability matrix | M | Not started | | Pending | |
| **QXL-008** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/centers` | One approved location master | Store true walk-in labs, service-only dispatch hubs and partner centres distinctly, with operational hours, public address and phone. | Public pages, GBP, schema, llms.txt and centre finder agree; service-only hub not a public walk-in address. | Operations + SEO | Signed centre registry | M | Not started | | Pending | |
| **QXL-009** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/privacy-policy` | DPDP consent and privacy review | Legal review for notices, data use, opt-in text, sensitive health data, retention, contact preferences and consent withdrawal process; implement approved copy. | Approved legal version, named owner, policy updated date and functional requests channel. | Legal/DPO | Legal opinion | M | Not started | | Pending | |
| **QXL-010** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/upload-prescription` | Secure prescription upload | Enforce allowlisted MIME/extension and max file size, malware scan, signed access, short-lived URL, audit trail, limited retention and no public object URLs. | Negative tests reject risky files; uploads inaccessible without authorization; deletion schedule documented. | Engineering + Security | Storage & policy access | L | Not started | | Pending | |
| **QXL-011** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/reports` | Secure patient report retrieval | Authenticate and authorize per order/patient, limit OTP attempts, avoid exposed report IDs in query logs, set no-store response, record access audit. | Cross-patient access tests fail; unauthenticated report inaccessible; logged access auditable. | Engineering + Security | LIS authorization interface | L | Not started | | Pending | |
| **QXL-012** | P0 | W1 | Quality & safety | `https://qxldiagnostics.com/book` | Payments and failure recovery | Protect payment flows with gateway callback verification and idempotency; do not store card data; show pending/failed and retry without duplicate order. | Duplicate callback creates one booking; canceled/failed flow explains next step; paid statuses reconcile. | Backend + Payments | Payment sandbox | L | Not started | | Pending | |
| **QXL-013** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Apply design tokens | Use navy #082C61, primary #1055AE, pale #EAF6FF, gold #D69A18 sparingly, teal #0B9B9A and white, consistent typography and spacing. | One token sheet, consistent CTA, contrast checked; minimal gold. | Frontend | Brand logo | M | Not started | | Pending | |
| **QXL-014** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Common accessible header | Desktop full navigation; tablet condensed; mobile logo, search, phone, menu; remove double nav bars and repeated utility lines. | No overflow at 360/390/768/1024/1440; keyboard menu works; focus visible. | Frontend | Design tokens | M | Not started | | Pending | |
| **QXL-015** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Mobile first screen four actions | Below prominent search place exactly Book a Test, Upload Prescription, Home Collection, Health Packages; preserve rest below. | Four visible shortcuts at 390px; each reaches correct usable journey in one tap. | Frontend | Routing | M | Not started | | Pending | |
| **QXL-016** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | One primary CTA per section | Select main action with clear hierarchy; remove competing banners, duplicate appointment forms, moving carousels and forced popups. | Each screen has single visual primary CTA; patient can start search without popups. | Frontend | Content approvals | M | Not started | | Pending | |
| **QXL-017** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Predictable mobile navigation | Use anchored bottom actions only if they do not obscure form buttons; show cart count and labels, focus states. | Fixed bars do not obscure input/keyboard; 44x44px targets; escape closes menu. | Frontend | Booking events | M | Not started | | Pending | |
| **QXL-018** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Reusable cards and forms | Implement TestCard, PackageCard, LabCard, ArticleCard, Stepper, FormField, OTPInput, FileUploader and alert states. | Components reused sitewide with consistent hover, disabled, error and loading states. | Frontend | Token CSS | L | Not started | | Pending | |
| **QXL-019** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Speed-aware imagery | Convert large photos to AVIF/WebP, width/height set, lazy below fold, use local responsive srcset, avoid image text. | Hero visually stable; network waterfall confirms no large unneeded assets. | Frontend | Assets | M | Not started | | Pending | |
| **QXL-020** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Internationalization and type scale | Consistent title sizes, Kannada-ready fonts if offered, responsive clamp sizes, locale attributes and translation parity. | No clipping at 200% zoom or long titles; locale changes do not break layout. | Frontend | Translation content | M | Not started | | Pending | |
| **QXL-021** | P1 | W2 | Responsive UI | `https://qxldiagnostics.com/` | Responsive page QA matrix | Capture pages at 360,390,430,768,1024,1440,1920; audit tap targets, horizontal scroll, contrast and content order. | All priority pages pass screenshots and no horizontal scroll; failures logged. | QA engineer | Staging environment | M | Not started | | Pending | |
| **QXL-022** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/tests` | Synonym-tolerant test search | Support CBC/CBP/hemogram, HbA1c/A1c, TSH; accessible autocomplete; no medical diagnostic inference. | Top 20 aliases return correct test within two keystrokes; no empty screen; keyboard support. | Frontend + Catalogue | Master test data | L | Not started | | Pending | |
| **QXL-023** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/tests` | Consistent test-card data | Show accurate price, specimen, fasting, TAT, short description and Add/Book CTA; hide misleading instant report promise. | Cards render from SKU only; product master spot-check passes for 30 tests. | Frontend | Master test data | M | Not started | | Pending | |
| **QXL-024** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/cbc-test` | Standard test-detail template | Template includes purpose, when considered, specimen/prep, known limitations, expected report window, price, FAQs and booking, with medical review. | 30 priority tests use template and approved info; unique titles/H1s. | Content + Dev | Medical approval | L | Not started | | Pending | |
| **QXL-025** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/packages` | Package filters and side-by-side comparison | Filter by need not unsupported disease diagnosis; compare real analyte lists and exclusions; avoid cosmetic parameter inflation. | No differences from LIS master; comparison works mobile/tablet; count correctly defined. | Product + Frontend | Master package data | L | Not started | | Pending | |
| **QXL-026** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/book` | Simple checkout stepper | 1 tests/prescription; 2 patient+address; 3 verified time slot and confirmation/payment; do not require account before quote. | User can complete with minimum fields; failed step preserves data; no extra hidden checkout. | Frontend + Backend | Scheduling API | L | Not started | | Pending | |
| **QXL-027** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/book` | Location-aware slot availability | Validate pin code, serviceability, collection date/time, fasting, phlebotomist capacity; server validates selection at checkout. | Unavailable dates cannot be confirmed; race condition handled; patient sees alternatives. | Operations + Backend | Capacity schedule | L | Not started | | Pending | |
| **QXL-028** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/book` | Clear fees and totals | Show discount basis and service fee before confirmation, total payable, GST/invoice where applicable, and coupon conditions. | Order summary equals receipt and payment amount for sample scenarios. | Commercial + Backend | Rate card | M | Not started | | Pending | |
| **QXL-029** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/book` | Accessible forms and error states | Auto-complete, labelled inputs, inline validation, error summary, proper phone length and safe back navigation. | Keyboard/screen reader success and error recovery confirmed on 3 devices. | Frontend | WCAG test | M | Not started | | Pending | |
| **QXL-030** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/upload-prescription` | Two-step prescription request | Secure upload then confirm mobile, collection locality and callback timing; show successful receipt with ID (not clinical data). | Validated upload end-to-end; patient notified, CRM queue contains lead once. | Backend + CRM | Secure storage | M | Not started | | Pending | |
| **QXL-031** | P1 | W2 | Booking & commerce | `https://qxldiagnostics.com/home-blood-collection-bangalore` | Standalone home collection journey | Above fold: pincode, test search/upload, available areas, minimum fee policy, slot selection, preparation and contact. | Location check precedes scheduling; cancellation terms visible; booking on mobile. | Frontend + Ops | Dispatch coverage | M | Not started | | Pending | |
| **QXL-032** | P1 | W3 | Booking & commerce | `https://qxldiagnostics.com/book` | Confirmation & communications | Unique confirmation ID and SMS/WhatsApp/email opt-in notices with address/time/prep; no PHI in notifications. | Notification contains no confidential results; order details reachable after auth. | CRM + Backend | Messaging provider | M | Not started | | Pending | |
| **QXL-033** | P1 | W3 | Booking & commerce | `https://qxldiagnostics.com/book` | Cancellation/reschedule | Clear patient self-service or assisted policy, slot reallocation and refund reconciliation where relevant. | Rescheduling retains order and updates dispatch; failures recover. | Backend + Ops | Policy signoff | L | Not started | | Pending | |
| **QXL-034** | P1 | W3 | Booking & commerce | `https://qxldiagnostics.com/` | Visible help actions | One verified click-to-call tel link and WhatsApp entry; fixed floating widgets may not block checkout. | Correct +91 9964 639 639; mobile CTAs functional. | Frontend | Approved contact | S | Not started | | Pending | |
| **QXL-035** | P1 | W3 | Booking & commerce | `https://qxldiagnostics.com/reports` | Patient report UX | Explain secure login, download, sharing consent, support and access issues without exposing content to crawlers. | Private pages noindex; no report in analytics or cache; mobile download functional. | Frontend + Backend | LIS integration | L | Not started | | Pending | |
| **QXL-036** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Create route/canonical inventory | Export complete paths and statuses; categorize indexable, noindex, redirect, removed, canonical; do not redirect without GSC/backlink evidence. | All production URLs mapped and approved; no chain/loop in chosen redirects. | SEO + Web Dev | GSC export | L | Not started | | Pending | |
| **QXL-037** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | SSR/prerender SEO-critical text | Guarantee title/H1/body text, product description, canonical and schema in initial HTML or reliably indexed renderer. | HTML source and Google rendered HTML match for 20 priority pages. | Web developer | Hosting/framework review | L | Not started | | Pending | |
| **QXL-038** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Validate robots.txt and sitemap.xml | Verify actual GET 200 and XML validity, dynamic canonical URLs, correct lastmod only on real changes, and sensitive/private route exclusion. | CLI log with 200 and valid sitemaps; robots allows wanted public pages; private routes noindex/auth. | DevOps + SEO | Production access | M | Not started | | Pending | |
| **QXL-039** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Eliminate redirect and crawl waste | Fix broken internal links, 4xx/5xx, duplicate query indexing, slash normalization and HTTP->HTTPS redirect. | Full crawl zero high-priority broken links and zero loops; chosen canonicals indexable. | SEO + DevOps | Crawler report | L | Not started | | Pending | |
| **QXL-040** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Unique titles and meta snippets | For every indexable template assign unique title 45–65 chars as guidance, concise meta, one clear H1; page-specific benefits not keyword lists. | 0 duplicate titles on top 100 and sitewide duplicates assigned remediation. | SEO + Content | URL map | M | Not started | | Pending | |
| **QXL-041** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Semantic breadcrumbs/internal linking | Cross-link tests↔related guides↔packages↔local home collection; include breadcrumbs and functional navigation links. | Key commercial pages within 3 clicks; crawled href; breadcrumb matches visible hierarchy. | SEO + Frontend | IA decisions | M | Not started | | Pending | |
| **QXL-042** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Schema validation | Use Organization/appropriate medical-lab local business, BreadcrumbList, MedicalTest/Service where accurate; match visible content; no unsupported review markup. | Rich Results Test/Schema Validator no critical errors; location attributes verified. | SEO + Frontend | Verified data master | M | Not started | | Pending | |
| **QXL-043** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Indexable PDF and report protection | Ensure patient documents cannot be indexed, and sensitive temporary documents use authenticated links. | Public crawl and index cannot find PHI; test links expire. | Security + DevOps | Access policy | M | Not started | | Pending | |
| **QXL-044** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Fix mobile CWV | Measure production CrUX/GSC and lab WebPageTest/PSI, focus hero LCP, third-party JS INP, CLS for carousels. | 75th percentile target LCP<=2.5s, INP<=200ms, CLS<=0.1 where field data exists. | Frontend Performance | PSI baseline | L | Not started | | Pending | |
| **QXL-045** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Cache/CDN and availability | Configure immutable hashed assets, sensible HTML caching, compressed responses, security headers and alerting for uptime. | Production smoke tests and synthetic monitoring configured; rollback possible. | DevOps | Hosting access | M | Not started | | Pending | |
| **QXL-046** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/` | Language and location SEO | Use en-IN, accurate Bengaluru/Bangalore variants in prose, avoid fake hreflang and title stuffing; set canonical on variants. | Correct locale tags; no separate near-duplicate pages solely spelling variants. | SEO | Content audit | S | Not started | | Pending | |
| **QXL-047** | P1 | W3 | Technical SEO | `https://qxldiagnostics.com/llms.txt` | Keep llms.txt synchronized only | Auto-generate facts from approved products/centres, label last updated and prune unverified capabilities; treat file as optional, not ranking shortcut. | File aligns with public pages and actual tests; no stale prices or unsupported services. | SEO + Content | Master catalogue | M | Not started | | Pending | |
| **QXL-048** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/centers` | Separate centre types in finder | Display actual physical walk-in laboratories with directions; separately display sample pickup coverage; list partner centres only with verified relationship. | No non-walk-in hub offers false walk-in directions; address/hours verified. | Local SEO + Ops | Centre master | M | Not started | | Pending | |
| **QXL-049** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/diagnostic-lab-kengeri` | Build authoritative Kengeri page | Actual external/interior images, facilities, appointment rules, signed hours, address, maps, team, services, and local FAQs. | Field staff verifies NAP/hours and directions; photo evidence; city navigation links. | SEO + Centre Ops | On-site content | M | Not started | | Pending | |
| **QXL-050** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/diagnostic-lab-yelahanka` | Build authoritative Yelahanka page | Differentiate services and contact/hours from Kengeri; clear centre type and actual test processing. | Hours and in-centre services verified; no duplicated generic content. | SEO + Centre Ops | On-site content | M | Not started | | Pending | |
| **QXL-051** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/locations/jp-nagar` | Revise JP Nagar coverage page | Clarify home collection coverage rather than falsely implying processing lab; original collection information, turnaround caveats and booking. | Local-page facts unique and accurate; no invented address or fabricated reviews. | SEO + Ops | Coverage map | M | Not started | | Pending | |
| **QXL-052** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/diagnostic-lab-bangalore` | City URL consolidation decision | Compare GSC queries, backlinks, conversion and canonical intent vs homepage / home collection; retain, differentiate or merge only after evidence. | Documented URL decision; approved redirect only if merge; internal links updated. | SEO lead | GSC & crawl evidence | M | Not started | | Pending | |
| **QXL-053** | P1 | W4 | Local SEO | `https://qxldiagnostics.com/` | Google Business Profiles | Audit only eligible staffed public-facing locations; verified category, NAP, services, opening hours, authentic photo, review practices. | Every eligible GBP matches signed centre registry; no fake/duplicate listings. | Local Marketing | GBP access | M | Not started | | Pending | |
| **QXL-054** | P2 | W6 | Local SEO | `https://qxldiagnostics.com/` | Reputation and citations | Request genuine patient reviews ethically without incentives, respond to feedback without revealing PHI; build authoritative references and links. | Monthly review/reply log; 5-10 quality relevant citations; zero fabricated testimonials. | Marketing + Compliance | GBP owner | M | Not started | | Pending | |
| **QXL-055** | P2 | W6 | Local SEO | `https://qxldiagnostics.com/centers` | Areas and directions schema | Map verified labs only, no aggregate star claims from unrelated locations, choose appropriate geo and openingHours. | Local schema corresponds to physical site, is mapped to correct location landing page. | SEO + Dev | Centre master | M | Not started | | Pending | |
| **QXL-056** | P1 | W4 | Medical content | `https://qxldiagnostics.com/blog` | Medical editorial workflow | Require named author, qualified medical reviewer, verified credentials, last reviewed date, guideline reference and correction mechanism. | 100% new clinical posts have reviewer and dated citations; older priority posts retro-reviewed. | Clinical Editorial | Reviewer time | L | Not started | | Pending | |
| **QXL-057** | P1 | W4 | Medical content | `https://qxldiagnostics.com/blog` | Audit risky health claims | Review screening promises, cancer marker self-testing, food sensitivity, neonatal/pregnancy guidance, AI-generated symptom text; correct overstatements. | Medical lead approval log; high-risk posts corrected or unpublished. | Medical Director | Guidelines | L | Not started | | Pending | |
| **QXL-058** | P1 | W4 | Medical content | `https://qxldiagnostics.com/cbc-test` | Build 30 authoritative priority test pages | Test FAQs: indication, specimen, fasting, stability/preanalytical info as relevant, limitations, result interpretation, price and booking; avoid diagnosis claims. | 30 pages with medically approved helpful unique answer blocks and appropriate internal links. | Clinical Content | Test master | XL | Not started | | Pending | |
| **QXL-059** | P1 | W4 | Medical content | `https://qxldiagnostics.com/` | Entity consistency | Keep company/doctor identities, physical lab addresses, accreditation scope and public contact consistent across footer, about, schema, third-party profiles and AI files. | Entity audit 0 material contradictions; corrections assigned. | SEO + Brand | Verified facts | M | Not started | | Pending | |
| **QXL-060** | P2 | W5 | Medical content | `https://qxldiagnostics.com/blog` | Question-led topic clusters | Create clinically useful topic hubs (diabetes, thyroid, kidney, infection, maternal, autoimmunity) linking naturally to tests, not auto-generated doorway farms. | Original references, real patient questions, 2-4 relevant internal links per article. | Content + Clinician | Approved topic briefs | L | Not started | | Pending | |
| **QXL-061** | P2 | W5 | Medical content | `https://qxldiagnostics.com/` | AI search sampling protocol | Document 20 real queries in ChatGPT/Gemini/Perplexity/Google AI, record date, location assumptions, citations, competing sources; do not claim reproducible universal ranking. | Monthly controlled sample log including screen captures, query, model and source. | SEO analyst | Query panel | M | Not started | | Pending | |
| **QXL-062** | P2 | W5 | Medical content | `https://qxldiagnostics.com/` | Public factual proof library | Publish quality explainer, clinically reviewed methods/scope, bios, cited case studies only with consent, authentic photographs. | Each proof claim links to audit-ready material; no invented accolades. | Brand + Quality | Approvals | L | Not started | | Pending | |
| **QXL-063** | P2 | W5 | Medical content | `https://qxldiagnostics.com/blog` | Blog pruning and update governance | Map pages by performance/intent; update stale articles, noindex if necessary, redirect only where relevant, preserve informative evergreen material. | Decisions tied to GSC and quality review; no bulk blind deletion. | SEO + Editorial | GSC content inventory | M | Not started | | Pending | |
| **QXL-064** | P1 | W3 | Hospital B2B | `https://qxldiagnostics.com/hospital-laboratory-management` | Separate hospitals landing experience | Desktop/mobile dedicated HLM template with hospital pain points, routine/STAT onsite scope, reference network, quality governance, SLAs, commercial options. | Clear B2B hero and primary request-assessment CTA; no consumer test/cart distractions. | B2B Marketing | Commercial approval | L | Not started | | Pending | |
| **QXL-065** | P1 | W3 | Hospital B2B | `https://qxldiagnostics.com/hospital-laboratory-management` | Add hospital qualification form | Hospital name, role, location, lab model, approximate workload band, time to discuss, business contacts, consent; avoid PHI collection. | Lead routed to LeadSquared owner, deduplicated, notification and SLA timer recorded. | CRM + Frontend | LeadSquared rules | M | Not started | | Pending | |
| **QXL-066** | P1 | W3 | Hospital B2B | `https://qxldiagnostics.com/hospital-laboratory-management` | Case studies and proof | Add permissioned anonymized partnership examples (before/after TAT, implementation approach, non-identifiable operating metrics) only if true. | Hospital partner consents, names approved, numerical results traceable and dated. | B2B Lead + Legal | Partner approvals | L | Not started | | Pending | |
| **QXL-067** | P1 | W3 | Hospital B2B | `https://qxldiagnostics.com/hospital-laboratory-management` | Reference lab & LMS pathways | Build distinct HLM, LMS and lab-to-lab offerings with comparison of responsibilities, sample logistics, IT and billing, while avoiding duplicate service pages. | Hospitals can identify right model in <60 sec; one qualifying CTA; sales receives model type. | B2B Marketing | Ops signoff | M | Not started | | Pending | |
| **QXL-068** | P2 | W5 | Hospital B2B | `https://qxldiagnostics.com/` | Institutional authority and backlink plan | Publish practical implementation/quality resources, webinars or original methodology; seek genuine institutional links and directory listings. | Outreach tracker with live verified external mentions and source quality; no paid link scheme. | Partnerships + SEO | Original resources | L | Not started | | Pending | |
| **QXL-069** | P1 | W2 | Measurement | `https://qxldiagnostics.com/` | Analytics data dictionary | Create events search, view_item, add_to_cart, begin_checkout, slot_selected, booking_completed, upload_success, generate_lead, WhatsApp_click; define event fields. | QA debug shows every event fires once, respects consent; PHI and phone/email never sent to analytics. | Analytics + Dev | GA4/GTM access | M | Not started | | Pending | |
| **QXL-070** | P1 | W2 | Measurement | `https://qxldiagnostics.com/book` | Server-side booking completion truth | Emit confirmed order events only after backend success; send clean order_id hash, commercial amount, category and locality where appropriate. | Booked count reconciles with LIS/CRM, deduped and matches revenue; no double firing. | Analytics + Backend | Booking DB | M | Not started | | Pending | |
| **QXL-071** | P1 | W2 | Measurement | `https://qxldiagnostics.com/` | Dashboard funnels by device | Create mobile/tablet/desktop funnels for test-search->checkout->booking; split pages, locations, source/medium. | Weekly baseline dashboard with drop-off and device segmentation signed by marketing. | Analytics | GSC+GA4 access | M | Not started | | Pending | |
| **QXL-072** | P1 | W3 | Measurement | `https://qxldiagnostics.com/hospital-laboratory-management` | Separate B2B analytics | Use distinct B2B campaign sources, contact/form complete, qualified lead, proposal and signed deal; do not blend B2C conversion denominator. | B2B metrics dashboard independent of patient booking. | CRM + Analytics | LeadSquared access | M | Not started | | Pending | |
| **QXL-073** | P1 | W3 | Measurement | `https://qxldiagnostics.com/` | Search Console baseline | Export top queries, 28d clicks/impressions/CTR/position, index coverage, CWV, manual actions, city landing page conversions as feasible. | Baseline locked before launch and 28d after-launch view ready; no invented keyword ranks. | SEO analyst | GSC property access | M | Not started | | Pending | |
| **QXL-074** | P2 | W5 | Measurement | `https://qxldiagnostics.com/` | Privacy-safe experimentation | Test one UX hypothesis at a time e.g. search-first vs carousel and 3-step vs long form, with metrics and guardrails. | Experiments predefine primary metric, cohort, minimum sample and safety outcomes. | Growth Team | Tracking stable | M | Not started | | Pending | |
| **QXL-075** | P0 | W1 | Security & accessibility | `https://qxldiagnostics.com/` | Web security headers and policy | Review HTTPS, HSTS, CSP (report first), content type and frame protections, cookies secure/httponly/samesite, secrets out of frontend. | Security scan and signed penetration remediation; no patient tokens exposed. | Security + DevOps | Env access | L | Not started | | Pending | |
| **QXL-076** | P1 | W3 | Security & accessibility | `https://qxldiagnostics.com/` | WCAG 2.2 AA audit | Keyboard order, reduced motion, colour contrast 4.5:1 normal text, focus visible, skip link, dialog traps, label association and status updates. | Automated axe scan + manual screenreader / keyboard on 10 critical flows. | Accessibility QA | Staging | L | Not started | | Pending | |
| **QXL-077** | P1 | W3 | Security & accessibility | `https://qxldiagnostics.com/` | Forms accessible feedback | Use aria-live for search/no results/cart updates, descriptive required errors, no timing-only UX. | Blind keyboard flow passes upload, search, checkout and enquiry. | Frontend | Form components | M | Not started | | Pending | |
| **QXL-078** | P1 | W3 | Security & accessibility | `https://qxldiagnostics.com/` | Cookie/consent management | Do not load optional tracking before applicable consent; disclose medical sensitivity and opt-out rights per counsel and actual app flows. | Consent states honoured; audit via GTM and network requests. | Legal + Analytics | Privacy signoff | L | Not started | | Pending | |
| **QXL-079** | P1 | W3 | Security & accessibility | `https://qxldiagnostics.com/` | OWASP risk assessment | Threat model prescription uploads, OTP brute force, CSRF, broken access control, injection, SSRF from URL fetchers, logs and staff roles. | Pen test top criticals fixed, verified by re-test; logs omit sensitive identifiers. | Security Engineering | Test environment | L | Not started | | Pending | |
| **QXL-080** | P1 | W3 | Security & accessibility | `https://qxldiagnostics.com/` | Backup & release runbook | Version-controlled releases with environment flags, DB migration rollback, nightly backup and on-call escalation. | Smoke tests and one rollback rehearsal before production push. | DevOps | Release pipeline | M | Not started | | Pending | |
| **QXL-081** | P0 | W1 | Release QA | `https://qxldiagnostics.com/` | Baseline capture before change | Record current URLs, Lighthouse evidence, booking funnel conversion, screenshots, copy, GTM tags and redirects; export and protect backups. | Signed baseline folder with date & original code revision. | Project Manager | Production read only | M | Not started | | Pending | |
| **QXL-082** | P1 | W5 | Release QA | `https://qxldiagnostics.com/` | Functional journey UAT | Use real test sandbox on CBC, HbA1c, Quick Fit, RX upload, home pickup, payment, report access and hospital enquiry. | UAT script with positive, negative, slow network and retry outcomes, signoffs. | QA + Product Owners | Staging integration | L | Not started | | Pending | |
| **QXL-083** | P1 | W5 | Release QA | `https://qxldiagnostics.com/` | Device/browser matrix | Test Chrome Android, Safari iOS, desktop Chrome/Edge/Firefox, 360/390/430/768/1024/1440px, large fonts, slow 4G. | No P0/P1 bugs open; keyboard and screen-reader critical pass. | QA | Devices | M | Not started | | Pending | |
| **QXL-084** | P1 | W5 | Release QA | `https://qxldiagnostics.com/` | SEO go-live regression | Check indexability, title, canonical, robots, sitemap, redirects and schema after deploy; compare crawl before/after. | No top organic URL lost; no accidental noindex; XML URL live. | SEO + DevOps | Crawl exports | M | Not started | | Pending | |
| **QXL-085** | P1 | W5 | Release QA | `https://qxldiagnostics.com/` | Monitoring and alerting | Alert on booking errors, payment failures, API errors, slow pages, 404 spikes and uptime; on-call rotation and response matrix. | Dry-run alert reaches owner; severe incident has rollback and escalation path. | DevOps + Ops | Monitoring platform | M | Not started | | Pending | |
| **QXL-086** | P1 | W6 | Release QA | `https://qxldiagnostics.com/` | Go live signoff gates | Obtain Quality, Clinical, Operations, Legal, Security, Marketing and CEO approval on relevant sections before phased traffic release. | Signed release checklist; no P0 issue outstanding; canary traffic then full launch. | Project Manager | All gates complete | M | Not started | | Pending | |
| **QXL-087** | P2 | W8 | Release QA | `https://qxldiagnostics.com/` | 30/60/90 day review | Weekly delivery check, 30-day SEO index status, 60-day conversion optimization and 90-day financial business outcomes vs baseline. | Documented metric review, backlog update and retrospective. | CEO Office + Growth | Tracking and period elapsed | M | Not started | | Pending | |

---

## 4. Master URL Route Inventory (27 Canonical Routes)

| Path | Template | Intent | Action | Priority | Decision | Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | Bookings and confidence | Consolidate modules; remove demo; strong search and four actions | **P0** | Review with GSC | Live site / prior audit |
| `/tests` | Test directory | Search/discover tests | Synonyms, filters, verified prices, card details | **P1** | Review with GSC | Live site / prior audit |
| `/cbc-test` | Test detail template | CBC user intent | Consistent medically reviewed fields | **P1** | Review with GSC | Live site / prior audit |
| `/hba1c-test` | Test detail template | Diabetes monitoring | Reviewer-approved text and booking | **P1** | Review with GSC | Live site / prior audit |
| `/thyroid-test` | Test detail template | Thyroid evaluation | Check exact assay/TSH FT4 FT3 configuration | **P1** | Review with GSC | Live site / prior audit |
| `/vitamin-d-test` | Test detail template | Vitamin D | Appropriate indications and preparation | **P1** | Review with GSC | Live site / prior audit |
| `/lipid-profile-test` | Test detail template | Lipid profile | Evidence-based fasting instruction | **P1** | Review with GSC | Live site / prior audit |
| `/liver-function-test` | Test detail template | LFT | Verified panel/analyte list | **P1** | Review with GSC | Live site / prior audit |
| `/kidney-function-test` | Test detail template | KFT | Actual specimen and panel content | **P1** | Review with GSC | Live site / prior audit |
| `/apob-test` | Test detail template | ApoB | Verified method and clinical limitations | **P1** | Review with GSC | Live site / prior audit |
| `/packages` | Health packages | Compare value | Canonical packages from one source | **P0** | Review with GSC | Live site / prior audit |
| `/book` | Booking flow | Complete test booking | 3-step flow, secure checkout, exact slots | **P1** | Review with GSC | Live site / prior audit |
| `/upload-prescription` | Prescription | Easy safe upload | Validation, privacy, acknowledgment | **P0** | Review with GSC | Live site / prior audit |
| `/home-collection` | Alias redirect | Home collection | Check redirect to /home-blood-collection-bangalore | **P1** | Review with GSC | Live site / prior audit |
| `/home-blood-collection-bangalore` | Home collection | Serviceable pickup booking | Pincode, fees, slot availability, prep | **P1** | Review with GSC | Live site / prior audit |
| `/centers` | Centre finder | Locate real facilities | Distinguish physical labs vs service coverage | **P1** | Review with GSC | Live site / prior audit |
| `/diagnostic-lab-kengeri` | Lab landing | Physical Kengeri | Verify NAP, labs, hours, evidence | **P1** | Review with GSC | Live site / prior audit |
| `/diagnostic-lab-yelahanka` | Lab landing | Physical Yelahanka | Verify NAP/hours and service | **P1** | Review with GSC | Live site / prior audit |
| `/locations/jp-nagar` | Local service area | JP Nagar home collection | Specific content, avoid fictitious address | **P1** | Review with GSC | Live site / prior audit |
| `/diagnostic-lab-bangalore` | Bengaluru city landing | Broad service searches | Review cannibalization vs homepage | **P1** | Review with GSC | Live site / prior audit |
| `/quality-accreditation` | Quality / NABL | Clinical assurance | Current certificate and scope, evidence | **P0** | Review with GSC | Live site / prior audit |
| `/blog` | Health library | Medically reviewed education | Review badges, sources, internal links | **P1** | Review with GSC | Live site / prior audit |
| `/hospital-laboratory-management` | Hospitals B2B | HLM partnership | Qualified forms, verified proof, model options | **P1** | Review with GSC | Live site / prior audit |
| `/franchise` | Partnership / franchise | Commercial interest | Differentiate franchise/collection/HLM | **P1** | Review with GSC | Live site / prior audit |
| `/privacy-policy` | Legal policy | Data subject information | Counsel approval and uploaded data handling | **P0** | Review with GSC | Live site / prior audit |
| `/llms.txt` | Optional AI facts resource | Machine-readable consistency | Keep synchronized, never substitute for HTML SEO | **P2** | Review with GSC | Live site / prior audit |
| `/reports` | Private portal (verify exact route) | Existing patients | Secure authenticated retrieval; do not index | **P0** | Review with GSC | Live site / prior audit |

---

## 5. QA Verification Test Cases (QA-001 to QA-061)

| Test ID | Pillar | Scenario | Expected Outcome | Priority | Device | Owner | Result | Defect Link |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QA-001** | Responsive | At 360px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 360px | QA | Not run | |
| **QA-002** | Responsive | At 390px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 390px | QA | Not run | |
| **QA-003** | Responsive | At 430px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 430px | QA | Not run | |
| **QA-004** | Responsive | At 768px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 768px | QA | Not run | |
| **QA-005** | Responsive | At 1024px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 1024px | QA | Not run | |
| **QA-006** | Responsive | At 1440px viewport on 10 key pages | No horizontal scrolling, obstruction, clipped text or inaccessible CTA | P1 | 1440px | QA | Not run | |
| **QA-007** | Booking | test selection | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-008** | Booking | package selection | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-009** | Booking | cart dedupe | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-010** | Booking | pincode in coverage | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-011** | Booking | pincode out of coverage | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-012** | Booking | slot capacity race | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-013** | Booking | coupon invalid | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-014** | Booking | payment callback replay | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-015** | Booking | payment declined | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-016** | Booking | checkout back/forward | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-017** | Booking | booking confirmation | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-018** | Booking | order duplication | Appropriate correct state, clear messaging and no duplicate order | P0 | All | QA | Not run | |
| **QA-019** | Prescription | valid JPG | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-020** | Prescription | valid PDF | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-021** | Prescription | oversized PDF | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-022** | Prescription | script masquerading PDF | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-023** | Prescription | malware positive | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-024** | Prescription | expired download link | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-025** | Prescription | private cross-account access | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-026** | Prescription | abandoned upload deletion | Uploads secure and authenticated or rejected as expected | P0 | All | QA | Not run | |
| **QA-027** | Reports | OTP attempt limits | No PHI leak and correct authenticated access | P0 | All | QA | Not run | |
| **QA-028** | Reports | cross-account report access | No PHI leak and correct authenticated access | P0 | All | QA | Not run | |
| **QA-029** | Reports | no report data to analytics | No PHI leak and correct authenticated access | P0 | All | QA | Not run | |
| **QA-030** | Reports | expired session | No PHI leak and correct authenticated access | P0 | All | QA | Not run | |
| **QA-031** | Reports | report download mobile | No PHI leak and correct authenticated access | P0 | All | QA | Not run | |
| **QA-032** | B2B | HLM form mobile | Accurate contact conversion and B2B routing | P1 | All | QA | Not run | |
| **QA-033** | B2B | HLM CRM owner | Accurate contact conversion and B2B routing | P1 | All | QA | Not run | |
| **QA-034** | B2B | duplicate business lead | Accurate contact conversion and B2B routing | P1 | All | QA | Not run | |
| **QA-035** | B2B | hospital model selection | Accurate contact conversion and B2B routing | P1 | All | QA | Not run | |
| **QA-036** | B2B | HLM consent | Accurate contact conversion and B2B routing | P1 | All | QA | Not run | |
| **QA-037** | SEO | correct H1 | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-038** | SEO | metadata | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-039** | SEO | schema visible match | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-040** | SEO | canonical | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-041** | SEO | robots GET | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-042** | SEO | sitemap XML | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-043** | SEO | sitemap private excluded | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-044** | SEO | redirect hop count | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-045** | SEO | JSON-LD parser | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-046** | SEO | indexed URLs sample | Pass SEO crawl check on representative templates | P1 | All | QA | Not run | |
| **QA-047** | Accessibility | keyboard nav | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-048** | Accessibility | visible focus | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-049** | Accessibility | labels & errors | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-050** | Accessibility | reduced motion | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-051** | Accessibility | screenreader live status | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-052** | Accessibility | WCAG contrast | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-053** | Accessibility | 200% zoom | WCAG 2.2 AA relevant checks pass | P1 | All | QA | Not run | |
| **QA-054** | Clinical | current NABL certificate | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-055** | Clinical | accredited scope copy | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-056** | Clinical | TAT claims | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-057** | Clinical | SKU counts/prices | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-058** | Clinical | IgG copy review | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-059** | Clinical | hours by centre | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-060** | Clinical | reviewed date of medical blog | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |
| **QA-061** | Clinical | non-walk-in hub label | Quality/Medical/Ops approval evidence filed | P0 | All | QA | Not run | |

---

## 6. Governance Signoff Gates (9 Mandatory Gates)

| Gate | Owner | Required Evidence | Decision | Link / Date |
| :--- | :--- | :--- | :--- | :--- |
| **Quality & NABL** | Quality Head | Current certificate, scope and test-scope wording | Pending | |
| **Medical editorial** | Medical Director | IgG marketing, test pages, blog, AI messaging | Pending | |
| **Catalogue & pricing** | Commercial + Lab | SKU data, list/sell price, included analytes, test TAT | Pending | |
| **Centre operations** | Operations Head | Address, walk-in vs hubs, capacity, hours | Pending | |
| **Privacy & security** | Legal/DPO + Security | Health files, reports, consent and payments | Pending | |
| **Search & analytics** | SEO + Analytics | Canonical routes, crawl, events and GA4 privacy | Pending | |
| **Hospital B2B** | Partnership Lead | Lead form, SLAs, permissioned case studies | Pending | |
| **UX & accessibility** | Frontend + QA | Mobile/tablet/desktop, keyboard and WCAG | Pending | |
| **Release approval** | CEO / Tech Lead | QA complete, no P0s, rollback ready | Pending | |

---

## 7. Interactive Delivery Control Centre UI
The interactive dashboard version of this Delivery Control Centre is deployed inside the application at:
- **Web URL:** [`/delivery-control-centre`](/delivery-control-centre)
- **Features:** Real-time search, multi-faceted filtering (Workstream, Priority, Sprint, Status), live QA checklist toggling, export to CSV/JSON, and print-ready release sheets.
