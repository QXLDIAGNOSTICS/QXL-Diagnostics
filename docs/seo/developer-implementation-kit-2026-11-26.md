# QXL developer implementation kit

> **In this repo:** the kit lives in `scripts/content-kit/`. Run `npm run seo:kit:test` and `npm run seo:kit:check`; `node scripts/content-kit/build.mjs preview|production` writes to `scripts/content-kit/out/` (git-ignored). `data.site.origin` is set to `https://qxldiagnostics.com` to match the site's canonical host. Blank log: `docs/seo/monitoring/observations.csv`.

Prepared 26 November 2026. Framework-independent JavaScript; Node 20+; no third-party packages. No ranking or AI recommendation guarantee. No production site has been modified.

## Start here
1. Investigate HTTP 402 before SEO deployment. Today public fetches returned 402 at the homepage and important pages. This does not identify the cause or prove a user-wide outage. Check origin and CDN response logs, hosting project status, billing/quota, custom-domain configuration and bot rules. Reproduce with ordinary mobile and desktop browsers on two networks; compare origin versus edge. Restore intended public pages to HTTP 200 if affected. Do not disguise errors with a 200 status.
2. Import current approved content and operational facts into data.mjs. Preserve existing URLs, booking functionality, design and any unrelated content. No source repository or CMS access was supplied; this kit is an integration reference, not an inferred QXL stack.
3. Run `node --test engine.test.mjs` then `node build.mjs check`.
4. Add pages using the example below; `node build.mjs preview` creates noindex previews. Secure staging with authentication too; noindex and robots are not access control.
5. A real clinical reviewer reviews the final rendered copy. Run `node build.mjs hash /path`, put that digest in review.contentHash, and record the genuine review date and internal approval record. Hashing is not medical approval. Do NOT automate approval or set today's date on every build.
6. Mark only completed pages published:true. Run `node build.mjs production`. Integrate rendered content with the existing site's SSR/SSG templates. Merge sitemap URLs and robots directives into the existing setup. Never upload this partial dist directory over the full website. In a CMS, map these entities to collections and reuse the same validation in publish hooks.
7. Validate final deployed URLs and JSON-LD, inspect in Search Console, and release with a rollback snapshot. The seed deliberately publishes zero pages and production generation refuses empty output.

## Shared records to implement in the real CMS/database
- Facility: stable ID, actual name/address, public walk-in hours separate from processing hours, telephone, exact location page and profile link, facility certificate and annexure. Dates are certificate dates, not invented surveillance dates.
- Test: stable ID, retained page path, purpose, specimen/method, preparation, unique reported parameters, explicit count if advertised, price/inclusions/validity, turnaround plus cutoff/working-day conditions, actual processing facility, limitations, clinical assessment guidance, fictional example report.
- Scope: test ID + facility ID + exact certificate + specimen + method + annexure page/link + named verifier/date. Confirm accreditation status with the actual current scope and continued compliance. Cover certificates alone do not establish test scope.
- Service area: coverage verification, PIN codes, collection hours and fees, sample transport procedure, actual processing sites. These records describe collection availability, not extra branches.
- Expert: consented public profile, name, qualifications, specialty, actual role, appropriate registration and verifier evidence, linked publications and substantiated affiliations. No invented registration numbers, degrees or memberships.
- Page review: reviewer ID, genuine reviewed date, immutable approval reference and content hash. Operational data changes trigger affected-page review. This reference conservatively invalidates all page reviews when any shared clinical/operational record changes; a production CMS may track narrower dependencies.
- Interpretation service: who provides it, eligible reports, how to arrange it, hours, response expectations, fee and exclusions. Do not imply diagnosis, prescriptions or urgent care unless that service is actually provided and appropriately authorised.

The same records MUST feed visible page content, JSON-LD, cards, package comparisons, checkout quotes, footer, FAQs, WhatsApp booking responses and profile exports. Do not keep separate manually typed prices/certificates in those places. Preserve the accepted price in each booking record; changes should not retroactively alter confirmed bookings.

## Correct facility-specific certificate treatment
| Facility | Current certificate | Issued | Valid until | Handling |
|---|---|---|---|---|
| Kengeri | NABLM1126KA10694 | 23 Nov 2026 | 22 Nov 2030 | M-5294 renewal; supersedes historical MC-6849 |
| North Hub, Yelahanka | MC-10025 | 2 Apr 2026 | 1 Apr 2030 | Correct for this facility; do not globally delete it |

Both are ISO 15189:2022 medical testing certificates, subject to continued compliance and approved scope. These details came from the owner's supplied verification. Original document bytes and annexures are not in this kit. Upload the authorised certificate and annexure documents to real stable public URLs; then fill certificateUrl/annexureUrl. Do not manufacture document paths or claim annexure verification before reading it. Historical MC-6849 may remain clearly labelled in historical records; it must not be the current Kengeri claim.

## Copy/paste page record
Add a record to data.pages. Fill all null/empty fields with verified copy. Do not mark published until review is complete.
```js
{
  kind: 'test', entityId: 'hba1c', path: '/hba1c-test-bangalore',
  title: 'HbA1c test in Bengaluru | QXL Diagnostics',
  description: '', intro: '',
  sections: [
    { heading: 'What this test can and cannot tell you', text: '' },
    { heading: 'How sample collection and reporting work', text: '' }
  ],
  faqs: [], relatedPaths: [], modifiedOn: null, published: false,
  review: {expertId: null, reviewedOn: null, record: null, contentHash: null}
}
```
Supported kinds: test, locality, facility, expert, service, accreditation, editorial. Entity paths must match page paths. Reviewer profiles need their own published expert page. An expert can review an accurate profile of themselves; record that transparently. Do not fabricate independent review.

Expert example shape (placeholder values remain unpublished):
```js
{ id:'actual-expert-id', name:'', path:'/experts/actual-slug',
  qualifications:[], specialty:'', role:'', registration:null,
  verified:false, consent:false, evidence:null,
  publications:[/* {label:'Paper title', url:'https://real-publisher-url'} */],
  affiliations:[/* {label:'Verified affiliation', url:'https://evidence-url'} */] }
```
Scope example shape:
```js
{ id:'scope-row-id', testId:'hba1c', facilityId:'kengeri',
  certificateNumber:'NABLM1126KA10694', specimen:'', method:'',
  annexureUrl:null, annexurePage:null, verifiedBy:null, verifiedOn:null }
```
Price shape: `{amount: 0, currency:'INR', includes:'', verifiedOn:null, validUntil:null}`. Do not use zero as a placeholder: retain price:null until the actual price is verified. For packages, store test IDs rather than repeating names; distinguish tests from parameters. CBC count must equal the unique displayed parameters; do not copy counts from another analyser or package.

## Priority pages: strengthen retained URLs, do not duplicate them
These paths were observed in prior search evidence; today's HTTP 402 prevented fresh page-content verification. Confirm current redirects and canonical selections before editing.

| Priority / retained URL | Specific implementation |
|---|---|
| P0 `/`, `/centers` | Restore access if affected. Replace global certificate claims with facility-level records. Show actual walk-in and processing hours separately. Link to each actual facility and accreditation explanation. |
| P1 `/locations/jp-nagar`, `/locations/jayanagar` | Confirm PIN coverage, slots, fee, exclusions, dispatch versus walk-in status and where each requested sample is processed. Add practical local collection details. No invented branches or locality accreditation. |
| P1 `/locations/kengeri`, `/locations/yelahanka` | Distinguish collection service area from actual laboratory details. Link to the matching verified facility, document and test-scope evidence. |
| P1 `/home-blood-collection-bangalore`, `/locations` | Explain booking, preparation confirmation, collector identification, sample identification and transport process, fees and report access. Link to truly served localities. |
| P1 `/diagnostic-lab-bangalore`, `/pathology-lab-bangalore` | Separate intent and scope. Link to named experts and actual interpretation service. If substantially duplicate, choose the better established URL using content/backlinks/GSC before redirecting; do not blanket-canonicalise. |
| P1 `/hba1c-test-bangalore`, `/thyroid-test`, `/apob-test-bangalore` | Import real test facts, price, turnaround, limitations, scope evidence where applicable and reviewer. Use one source for title, visible facts and schema. |
| P2 existing CBC, histopathology, health-check URLs | Discover and retain their actual URLs; no guessed slugs. Show unique parameters, specimen-specific handling, package inclusions and referral/outsourcing facts where applicable. |
| P2 existing expert, accreditation, interpretation pages | Upgrade existing pages first. Create new pages only if these entities lack a useful canonical page. Populate exact service details and primary evidence. |

Do not mass-generate 26 near-identical locality pages. Add one only when verified service availability and useful local content justify it. Use natural Bengaluru/Bangalore spelling in copy, not duplicate spelling-specific pages or repeated keywords.

## Editorial work that code cannot invent
- Commission clinician-written answers using real patient questions, with source citations and review records.
- Create a fictional sample-report walkthrough, prominently labelled, with original synthetic values and no patient identifiers. Have the clinician check units, reference ranges, limitations and interpretation before publication.
- Describe actual pre-analytical procedures and rejection/recollection policy; never invent laboratory operations.
- FAQs must answer practical questions plainly; keep answers visible. This kit does not add FAQ rich-result claims or fabricated review ratings.
- Record revisions in a versioned change log. Set dateModified only after substantive edits; lastReviewed only after actual review.
- Render core facts in initial server HTML, not only accordion fetches, images, chatbot responses or client-only code. The provided details elements contain their text in HTML.

## Crawl, canonical and deployment integration
- Select the existing preferred HTTPS hostname based on current redirects/GSC; www in this kit follows the owner's requested URL, not a verified canonical decision. Change data.site.origin if the verified preferred host is non-www. Redirect other hosts in one 301/308 hop while retaining path and query strings.
- Give each distinct live page a self-canonical. Use permanent redirects only for actual retired equivalent pages. No redirect to homepage for unrelated missing content; retain proper 404/410 statuses.
- Merge generated sitemap entries into the full production sitemap; include only canonical HTTP-200 indexable URLs and honest lastmod values. Do not replace the site's sitemap with this partial file.
- Keep JavaScript/CSS resources crawlable. Do not require cookies, login, geography prompts or CAPTCHA to read intended public text.
- Protect patient/report/admin APIs with authentication and authorisation. Robots.txt is not security. Private downloads need access checks and appropriate noindex headers; never use public patient reports as content.
- Run Schema.org Validator on MedicalTest/Service/Person markup and Rich Results Test for supported Google features. MedicalTest is descriptive schema, not a promised Google rich result. The facility template uses MedicalOrganization; if adding a LocalBusiness subtype, validate the actual type and required address/hours, and ensure all facts are visible.
- Core Web Vitals: collect real mobile and desktop CrUX/Search Console data where available. Optimise hero image dimensions/format, fonts, caching, deferred third-party scripts and layout stability; check booking on mid-range mobile. Missing CrUX data is unknown, not a fail.
- Booking event analytics: record start, successful submitted booking and confirmed enquiry only after the actual event; do not send symptoms, report values, patient names, phone numbers or email addresses to analytics. Consent and CRM linkage require the existing approved implementation.

## Crawler policy: search and training remain separate
`node build.mjs preview` writes robots.merge.txt. This is a MERGE fragment, not a replacement. Preserve existing exclusions and product policies. Specific user-agent groups repeat private-path exclusions because wildcard rules are not inherited.
- Googlebot supports Google Search access. Current Google guidance also documents a separate Search generative AI control in Search Console: check this for AI Overviews/AI Mode.
- Google-Extended concerns applicable training and non-Search grounding, including applicable Gemini usage; it is not a separate HTTP crawler or an organic ranking switch. Set botPolicy.googleExtended to allow or block only according to the owner's content-use decision; preserve is the default.
- OAI-SearchBot is search; GPTBot is training; ChatGPT-User is user-initiated retrieval. Search inclusion is not determined by ChatGPT-User.
- Claude-SearchBot is search; Claude-User is user-request retrieval; ClaudeBot is training.
- PerplexityBot supports search; user-request retrieval has separate handling.
- Training policy defaults to preserve. The generator does not silently choose permission for GPTBot/ClaudeBot. If the owner chooses block, botPolicy.training='block'; search groups stay permitted on public paths.
- At the CDN/firewall, verify crawlers using the vendor's current official identity/IP guidance; do not trust User-Agent strings alone or disable the WAF globally. Maintain least-privilege exceptions for intended public GET/HEAD routes. Use vendor published IP feeds, validate updates and keep last-known-good configuration if a fetch fails. No hard-coded IP list is included because it changes.
- Official feeds: https://openai.com/searchbot.json and https://www.perplexity.ai/perplexitybot.json. Consult current Anthropic guidance for its verification options rather than inventing IP ranges.
- Search inclusion and citations are not guaranteed by Allow directives, schema or an llms.txt file. No special AI ranking file is required by this kit.

## Maps and external authority work
Maintain only eligible actual Business Profiles. Keep accurate real-world names, appropriate minimum categories, actual public hours/holiday hours, phones and facility-specific website URLs. Service-area pages do not justify extra profiles. Verify North Hub's actual patient access and eligibility separately from its certificate. A dispatch-only point must not be presented as a walk-in branch.
Seek accurate directory/professional listings and real editorial references. Ask genuine patients for honest feedback through an approved process; no bought reviews, incentives, review gating or private health details. Fix inconsistent public facility/certificate references with documentary evidence. These tasks require owner/operations input and cannot be completed by schema alone.

## Measurement and acceptance criteria
| Surface | Measure separately |
|---|---|
| Google organic | Search Console page/query clicks, impressions, CTR and average position; index status and selected canonical. Average position is not a fixed Bengaluru rank. |
| Maps | Fixed query, device/language, coordinates, viewport, date/time, first 3 and first 10 results; calls, directions, actual bookings where available. |
| AI Overviews / AI Mode | Each product separately: exact prompt, observed answer, cited URLs, unprompted recommendation, date and location. Do not infer from organic ranking. |
| Gemini / ChatGPT Search / Claude / Perplexity / Copilot | Exact product and mode, clean context where observable, query, citations/mentions/recommendations independently; inaccessible means unmeasured. |

Use `observations.csv` as a blank log, not evidence of measurements. Retain query spelling, surface, geographic assumptions and result depth. Compare only matching measured pairs and report denominators. Confirm ordinary changes twice before alerts: organic top10 entry/exit or 3+ positions within top10, Maps top3 entry/exit, or changed explicit recommendations/citations across at least two fixed AI pairs. No ranking guarantee.

Before release: tests pass; no wrong certificate-site association; every published test has limitations and specimen/method/site facts; all claimed test accreditation has scope evidence; all area availability verified; visible text/schema agree; no future or auto-refreshed reviews; no draft sitemap entries; internal/document links resolve; booking completes on mobile; rollback snapshot retained.

## Sources checked 26 November 2026
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google AI controls: https://developers.google.com/search/docs/fundamentals/gen-ai-controls
- Google-Extended: https://developers.google.com/crawling/docs/google-extended
- Canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Business Profile eligibility: https://support.google.com/business/answer/3038177
- LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Anthropic crawlers: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
