# QXL Diagnostics — 50-Point Technical SEO, AEO & GEO Checklist

**Domain:** `https://qxldiagnostics.com/`  
**Framework:** Next.js 16 (App Router) / Node.js / React 19  
**Accreditation:** NABL Accredited (NABLM1126KA10694, ISO 15189:2022)  
**Standard:** WCAG 2.1 AA / Core Web Vitals / Schema.org Medical Entity  
**Status:** 100% Pass / Production Ready

---

## 1. Crawling & Indexability (Points 1–8)

- [x] **1. robots.txt Configuration:** `https://qxldiagnostics.com/robots.txt` dynamically serves valid rules allowing all compliant search bots (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot).
- [x] **2. Sitemap Index Implementation:** `https://qxldiagnostics.com/sitemap.xml` provides a clean index referencing sub-sitemaps: `sitemap-main.xml`, `sitemap-tests.xml`, `sitemap-packages.xml`, `sitemap-locations.xml`, and `sitemap-blogs.xml`.
- [x] **3. Zero Disallow for Public Assets:** Static CSS, JS chunks (`/_next/static/`), fonts, and optimized images (`/images/`) are crawlable and unblocked.
- [x] **4. Disallow Private Paths:** Sensitive endpoints (`/admin`, `/api/internal`, `/payment/callback`, `/account/private`) are properly blocked from web crawlers.
- [x] **5. Canonical URL Enforcement:** Every indexable route enforces a single self-referencing absolute canonical tag matching `https://qxldiagnostics.com/[path]` without trailing slashes.
- [x] **6. HTTP to HTTPS Redirection:** Automatic 301/308 redirects enforce HTTPS across all apex and www URLs.
- [x] **7. Noindex Integrity Check:** Only designated non-indexable utility pages (e.g., test-booking receipt, checkout success/failure modals) carry `noindex, nofollow`. All public test, package, blog, and location pages are set to `index, follow`.
- [x] **8. Dynamic AI & LLM Manifests:** `https://qxldiagnostics.com/llms.txt` and `llms-full.txt` are served at root providing direct LLM context with test prices, NABL accreditation, and clinical summaries.

---

## 2. Meta Tags, Headers & Titles (Points 9–15)

- [x] **9. Title Tag Length & Structure:** Every page title follows the optimized format `<Test/Topic Name> in Bangalore | NABL Accredited Lab | QXL Diagnostics` (50–60 characters).
- [x] **10. Meta Description Optimization:** Action-oriented, high-CTR meta descriptions (140–160 characters) featuring price, turnaround time, sample collection details, and NABL NABLM1126KA10694 verification.
- [x] **11. Open Graph Tags:** Comprehensive `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale` (`en_IN`), and high-resolution `og:image` (1200x630px).
- [x] **12. Twitter Card Tags:** Explicit `twitter:card` set to `summary_large_image` with proper `twitter:title` and `twitter:image`.
- [x] **13. Viewport & Mobile Scaling:** `<meta name="viewport" content="width=device-width, initial-scale=1">` present across all server-rendered layouts.
- [x] **14. Charset Declaration:** UTF-8 character encoding declared early in the document `<head>`.
- [x] **15. Language Declaration:** `<html lang="en">` declared on the root HTML tag.

---

## 3. Schema.org & Structured Data Validation (Points 16–25)

- [x] **16. DiagnosticLab Entity Schema:** Central laboratory at Kengeri and Yelahanka emitted with `@type: "DiagnosticLab"` including NABL NABLM1126KA10694 identifier, coordinates, phone numbers, and opening hours.
- [x] **17. MedicalBusiness Parent Organization:** Global organization structured with `@type: "MedicalBusiness"` pointing to legal entity `Qualitify Healthtech Private Limited`.
- [x] **18. MedicalTest & MedicalProcedure Schema:** Individual test pages emit `@type: "MedicalTest"` specifying `usedToDiagnose`, `sampleType`, `preparation`, and `code` (LOINC / SNOMED CT).
- [x] **19. MedicalWebPage Schema for Blogs:** Clinical articles declare `@type: "MedicalWebPage"` with `reviewedBy` (licensed MD Pathologist/Biochemist), `datePublished`, and `dateModified`.
- [x] **20. Service Schema for Localities:** 61 residential localities emit `@type: "Service"` with `serviceType: "Diagnostic Test Home Sample Collection"` linked to the Kengeri provider ID.
- [x] **21. FAQPage Schema:** Direct-answer FAQ accordions on home, test, and blog pages have matching `@type: "FAQPage"` JSON-LD schemas.
- [x] **22. BreadcrumbList Schema:** Hierarchical breadcrumbs (`Home > Blood Tests > [Test Name]`) emitted on every interior page for enhanced Google SERP rich snippets.
- [x] **23. Offer & Pricing Schema:** Accurate pricing (`price`, `priceCurrency: "INR"`, `availability: "InStock"`) matching `MASTER_CATALOGUE`.
- [x] **24. Schema Syntax Validation:** Zero syntax errors or missing mandatory fields in Google Rich Results Test validation.
- [x] **25. Entity Disambiguation (`@id`):** Strict node referencing using canonical `@id` URLs prevents duplicate entity definitions across pages.

---

## 4. Performance & Core Web Vitals (Points 26–33)

- [x] **26. Largest Contentful Paint (LCP < 2.0s):** Critical hero images utilize `priority={true}` or optimized WebP/JPG formats with explicit `fetchpriority="high"`.
- [x] **27. Cumulative Layout Shift (CLS < 0.05):** All images and hero sliders define explicit aspect ratios or bounding containers to eliminate layout shifts.
- [x] **28. Interaction to Next Paint (INP < 150ms):** Lightweight JavaScript bundles; zero heavy blocking third-party trackers in the main execution thread.
- [x] **29. Next.js Image Optimization:** Automatic responsive `srcset` generation, modern AVIF/WebP encoding, and automatic compression.
- [x] **30. Font Optimization:** Web fonts loaded via `next/font` with `display: swap` to prevent Flash of Invisible Text (FOIT).
- [x] **31. Code Splitting & Dynamic Imports:** Non-critical heavy components (e.g., modals, interactive charts) lazy-loaded with `next/dynamic`.
- [x] **32. Compression & Caching:** Static assets served with long-lived `Cache-Control: public, max-age=31536000, immutable` headers.
- [x] **33. DOM Size Optimization:** Clean, semantic DOM hierarchy avoiding excessive nesting depth.

---

## 5. Local SEO & GEO Integrity (Points 34–40)

- [x] **34. Physical vs Service-Area Differentiation:** Only 2 physical diagnostic facilities (Kengeri & Yelahanka) are registered with physical addresses; all 61 residential suburbs are defined as service areas to prevent Google Maps suspensions.
- [x] **35. Consistent NAP (Name, Address, Phone):** Unified phone number (`+91 91080 43900`), business name, and laboratory postal addresses across website, schema, and directory listings.
- [x] **36. Geo Coordinates Matching:** Exact latitude/longitude coordinates defined for Kengeri Central Lab (`12.9177, 77.4834`) and Yelahanka Facility.
- [x] **37. Bengaluru Local Landing Pages:** 61 high-converting local landing pages (`/locations/[locality]`) with localized landmark references and PIN codes.
- [x] **38. Google Business Profile Linking:** Direct links to Google Maps reviews and local Google profile for authentic user feedback.
- [x] **39. Neighborhood Breadcrumbs & Cross-Linking:** Strategic internal links between adjacent service areas (e.g., Kengeri -> Nayandahalli -> Rajarajeshwari Nagar).
- [x] **40. Localized Operating Hours:** Accurate sample collection timings (6:30 AM to 8:30 PM, 7 days a week) clearly presented on local pages.

---

## 6. Content Quality & Medical E-E-A-T (Points 41–45)

- [x] **41. Qualified Medical Reviewers:** Every health guide identifies an MD Pathologist or Clinical Biochemist with medical registration number and credentials.
- [x] **42. Accreditation Verification Number:** Prominently displays NABL Certificate No. **NABLM1126KA10694** (ISO 15189:2022).
- [x] **43. Phlebotomy Quality Standards:** Clear documentation of trained phlebotomy specialists, sterile single-use vacuum tubes (Vacutainer), and temperature-controlled sample transport.
- [x] **44. High-Entropy Clinical Answers:** Headers directly answer clinical intent (e.g., fasting hours, normal ranges, report delivery TAT) within the first 50 words.
- [x] **45. Academic & Clinical Citations:** Scientific references to ICMR, ADA, WHO, and KDIGO clinical guidelines for clinical rigor.

---

## 7. Security, Error Handling & Governance (Points 46–50)

- [x] **46. SSL / TLS Security:** Enforces TLS 1.3 with A+ SSL rating and HSTS header.
- [x] **47. Custom 404 Error Page:** Branded, helpful 404 page with direct search box, popular test links, and customer support contact.
- [x] **48. Broken Link Prevention:** Automated CI/CD script (`npm run validate:all`) tests all internal routes to guarantee zero broken links.
- [x] **49. Zero Console / Hydration Errors:** Strict React 19 hydration checks pass with 0 client-side runtime errors.
- [x] **50. Automated Build Gate:** Pre-deployment pipeline runs TypeScript check (`tsc --noEmit`), data master reconciliation, and static page pre-rendering (360+ pages).

