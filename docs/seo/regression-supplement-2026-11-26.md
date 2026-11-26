# QXL — 26 Nov 2026 SEO regression supplement

> **In this repo:** the crawler is `scripts/seo-kit/qxl_public_audit.py` (`npm run seo:audit:regression`); output folders are git-ignored. Blank log: `docs/seo/monitoring/visibility_log.csv`. Prices are formatted by `src/lib/formatINR.ts` from `MASTER_CATALOGUE`.


Reference code for existing application; do not replace working modules. Canonical domain https://qxldiagnostics.com. Use staging, synthetic data and authorized read-only tests. No new ranking guarantees. Previous full pack covers SQL, clinical analytics, security, serviceability and integration templates. This supplement targets new metadata and public crawl defects.

## 1. Price and page metadata
Use one approved test master (stable test ID, display name, integer price in paise, test-specific collection mode, price version and last verified date). Generate title, body, booking offer, JSON-LD and AI files from it. Example JavaScript (adapt to framework):

```js
const base = 'https://qxldiagnostics.com';
export function formatINR(paise) {
  if (!Number.isSafeInteger(paise) || paise < 0) throw Error('Invalid price');
  return new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', minimumFractionDigits:paise%100?2:0, maximumFractionDigits:2}).format(paise/100);
}
export function testMetadata(test) {
  if (!test.approved || !/^\/[a-z0-9-]+$/.test(test.path)) throw Error('Unapproved test metadata');
  const canonical = base + test.path;
  const title = `${test.name} Test in Bangalore | ${formatINR(test.pricePaise)} | QXL`;
  const description = `View ${test.name} test price, specimen requirements, preparation and reporting time in Bengaluru. Confirm collection eligibility with QXL Diagnostics.`;
  return {title, description, alternates:{canonical}, openGraph:{title,description,url:canonical}, robots:{index:true,follow:true}};
}
```

Test example: Lp(a) = 124900 paise → ₹1,249. Current lipid profile page and directory = ₹336, AI file = ₹550; reconcile test ID and panel contents before changing. Never overwrite a genuinely different panel. Avoid generic homepage title on lipid-profile-test and collect. Use actual last-modified timestamp for AI files, not current date on every request.

## 2. Public regression crawl
```sh
python -m pip install requests beautifulsoup4
python qxl_public_audit.py --out qxl_priority
python qxl_public_audit.py --all --delay 1 --old previous_urls.csv --out qxl_complete
```
Historical export must include `url` column; merge original sitemap export, CMS URLs, Search Console landing URLs, analytics and backlink inventory. Review every omitted URL manually, restore valuable pages, 301 only to genuinely equivalent content, retain intentional private exclusions. The script tests public HTML and sitemap membership; it cannot establish Google indexing or clinical approval. It does not impersonate search crawlers. Run in authorized environment; stop if server rate limits; no aggressive crawling.

## 3. Performance and 402 investigation
Check hosting/CDN/WAF logs for recorded 402, request ID, time, upstream status, billing and provider failures. Do not disable security. Run genuine external PageSpeed Insights or Lighthouse against homepage, locations, lipid profile, ApoB, test directory and booking. Measure mobile and desktop separately. For example:
```sh
npx lighthouse https://qxldiagnostics.com/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./qxl-mobile.json --chrome-flags="--headless"
npx lighthouse https://qxldiagnostics.com/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./qxl-desktop.json --chrome-flags="--headless"
```
Pin the Lighthouse version to a reviewed version in the project lockfile for repeatability. Lab scores are not real-user p75 data. Field targets LCP <=2.5 s, INP <=200 ms, CLS <=0.1. Use consent-compliant web-vitals telemetry; do not send PHI, query strings, patient identifiers, test orders, URLs from authenticated areas or clinical values. Use public route templates only. Avoid caching private reports.

## 4. Clinical content and local intent
Remove universal HIV exclusion statements and absolute privacy promises after medical review; distinguish professional CSF collection from home blood collection. No test price/TAT/scope promise unless verified. Keep both approved NABL certificates and scope facility-specific. For actual local branches use verified name/address/phone/hours and eligible Google Business Profile, not dispatch hubs or virtual locations. Use real locality serviceability rather than generated test-by-PIN doorway pages. Check scope and dispatch before enabling home collection.

## 5. Competitive monitoring
Use Search Console and Bing Webmaster first-party data and geographically consistent neutral manual SERP checks. Record Google Maps separately. For AI, run the same neutral queries with Bengaluru explicit, fresh sessions, web search enabled where applicable; capture exact response, cited URLs, date, model/product, inclusion and first mention if available; no answer separate from absent. No API or model training claims based on llms.txt. A rank cannot be guaranteed. `visibility_log.csv` is an empty recording template, not measured data. No paid tracking started.

## Acceptance
- Actual 200 canonical URL and permanent legacy redirects; no 402 for legitimate access (verify logs), no redirected or noindex public URL in sitemap.
- Correct price/title/schema/catalogue/AI file for same test ID, including Lp(a) and lipid panel reconciliation.
- Clinical approval and change evidence recorded; no unvalidated risk scoring or patient-data leakage.
- Historical URL reconciliation signed by clinical and SEO owners; no valuable unexplained omissions.
- Valid structured data in Schema Markup Validator; Google rich-result eligibility checked where supported.
- Performance reports and authenticated integration tests from staging, with build/commit and deployed version.
- Weekly visibility records, no invented ranks. Search Console connection and GA4 conversions verified.
