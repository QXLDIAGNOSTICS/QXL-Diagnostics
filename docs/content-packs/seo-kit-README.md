# QXL Digital Search Quality Kit — 22 Nov 2026

## Installation
Copy `scripts/`, `data/`, and `.github/workflows/` into the existing GitHub repository. Merge `package.json` scripts instead of replacing the existing package.json. Requires Node >=20. Run `npm run audit` from repository root. The workflow performs a daily public check and stores JSON artifacts. It is a monitoring kit, **not** a replacement for a full crawl, Google Search Console, PageSpeed Insights or clinical review.

## Deployment and validation
1. Replace example test master with a secure, approved export from LIS/commercial master. Never upload patient data. The sample records have `published:false` and unverified parameter arrays intentionally.
2. Add production URLs from sitemap to `data/urls.txt`. Verify URLs before using. Run `npm run audit:public`; review `reports/public-audit.json`.
3. Integrate the example Next.js metadata into existing routes without duplicating route definitions. Verify deployed HTML and schema.
4. Configure Google Search Console and Bing Webmaster Tools property access; export Bengaluru query data. Search Console average position is not a fixed absolute rank.
5. Measure mobile p75 LCP/INP/CLS from CrUX or GSC, and booking conversion from privacy-safe GA4 events.
6. Clinician approves test claims, IgG allergy language, accreditation scope, and all turnaround commitments.

## Important caveats
- This kit cannot correct the production site without repository access and deployment permissions.
- Public checks can fail due to network restrictions or anti-bot responses; review errors before treating them as real site defects.
- This kit does not establish AI citation share or Google rankings. Those require separately collected measurements.
- Do not claim the Yelahanka North Hub itself is NABL accredited unless independently confirmed for its location and scope.
