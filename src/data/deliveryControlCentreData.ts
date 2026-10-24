/**
 * QXL DIAGNOSTICS — DELIVERY CONTROL CENTRE MASTER DATA
 * Complete typed repository of 87 Backlog Tasks, 27 URL Inventory entries,
 * 61 QA Test Cases, and 9 Governance Gates.
 */

export type TaskPriority = 'P0' | 'P1' | 'P2';
export type TaskSprint = 'W1' | 'W2' | 'W3' | 'W4' | 'W5' | 'W6' | 'W8';
export type TaskWorkstream =
  | 'Quality & safety'
  | 'Responsive UI'
  | 'Booking & commerce'
  | 'Technical SEO'
  | 'Local SEO'
  | 'Medical content'
  | 'Hospital B2B'
  | 'Measurement'
  | 'Security & accessibility'
  | 'Release QA';
export type TaskEffort = 'S' | 'M' | 'L' | 'XL';
export type TaskStatus = 'Not started' | 'In progress' | 'Blocked' | 'Done';
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface DeliveryTask {
  id: string;
  priority: TaskPriority;
  sprint: TaskSprint;
  workstream: TaskWorkstream;
  url: string;
  task: string;
  implementation: string;
  acceptanceCriteria: string;
  owner: string;
  dependencies: string;
  effort: TaskEffort;
  status: TaskStatus;
  evidenceLink: string;
  qxlApproval: ApprovalStatus;
  notes: string;
}

export interface UrlInventoryItem {
  path: string;
  template: string;
  intent: string;
  action: string;
  priority: TaskPriority;
  decision: string;
  source: string;
}

export type QaPillar =
  | 'Responsive'
  | 'Booking'
  | 'Prescription'
  | 'Reports'
  | 'B2B'
  | 'SEO'
  | 'Accessibility'
  | 'Clinical';

export type QaResult = 'Not run' | 'Passed' | 'Failed' | 'Blocked';

export interface QaTestCase {
  id: string;
  pillar: QaPillar;
  scenario: string;
  expected: string;
  priority: TaskPriority;
  device: string;
  owner: string;
  result: QaResult;
  defectLink: string;
}

export interface GovernanceGate {
  id: string;
  gate: string;
  owner: string;
  requiredEvidence: string;
  decision: ApprovalStatus;
  linkOrDate: string;
}

export interface BacklogHealthMetric {
  metric: string;
  value: number | string;
  ruleOrMeaning: string;
}

export interface PrioritySummary {
  priority: TaskPriority;
  totalTasks: number;
  completed: number;
  remaining: number;
}

export interface WeeklyRhythmStep {
  step: number;
  role: string;
  action: string;
}

export const BACKLOG_HEALTH: BacklogHealthMetric[] = [
  { metric: 'Total actionable tasks', value: 87, ruleOrMeaning: '87 owner-assigned requirements with acceptance criteria' },
  { metric: 'P0 tasks', value: 14, ruleOrMeaning: 'Must be closed before go-live' },
  { metric: 'Completed tasks', value: 60, ruleOrMeaning: 'Only evidence-backed Done status' },
  { metric: 'Blocked tasks', value: 0, ruleOrMeaning: 'Escalate dependent issues' },
  { metric: 'Pending QXL approvals', value: 27, ruleOrMeaning: 'Quality, clinical, legal, operations approvals' },
  { metric: 'QA cases', value: 61, ruleOrMeaning: 'Functional, content, SEO and security QA' },
  { metric: 'QA passed', value: 41, ruleOrMeaning: 'Evidence-linked QA pass' },
  { metric: 'Signoff approved', value: 9, ruleOrMeaning: 'All required governance signoffs' },
];

export const PRIORITY_SUMMARY: PrioritySummary[] = [
  { priority: 'P0', totalTasks: 14, completed: 14, remaining: 0 },
  { priority: 'P1', totalTasks: 64, completed: 46, remaining: 18 },
  { priority: 'P2', totalTasks: 9, completed: 0, remaining: 9 },
];

export const WEEKLY_RHYTHM: WeeklyRhythmStep[] = [
  { step: 1, role: 'Technical Lead', action: 'Updates task statuses, evidence and release blockers.' },
  { step: 2, role: 'Quality/Medical/Operations/Legal', action: 'Signs facts and safety gates.' },
  { step: 3, role: 'QA Lead', action: 'Updates 61 test cases; do not treat tests as passed without execution.' },
  { step: 4, role: 'SEO / Analytics', action: 'Compares baseline vs verified post-deployment measures.' },
  { step: 5, role: 'CEO', action: 'Reviews only material blockers and P0/P1 release risks.' },
];

export const DELIVERY_TASKS: DeliveryTask[] = [
  {
    id: 'QXL-001',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/quality-accreditation',
    task: 'Verify current NABL certificate',
    implementation: 'Obtain renewed/current MC-6849 certificate and accredited schedule directly from quality head; publish validity and scope with supporting link; avoid implying every test accredited.',
    acceptanceCriteria: 'Quality head signs off current certificate and scope; public link opens; claims match certificate.',
    owner: 'Quality Head',
    dependencies: 'Updated NABL evidence',
    effort: 'S',
    status: 'Done',
    evidenceLink: 'src/app/quality-accreditation/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'MC-6849 under ISO 15189:2022 verified with scope disciplines across Biochemistry, Pathology, and Haematology. Obsolete MC-10025 purged.'
  },
  {
    id: 'QXL-002',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/',
    task: 'Audit universal accreditation claims',
    implementation: 'Remove sweeping accredited claims from non-scope tests, clinical messages, packages and schema; use approved wording.',
    acceptanceCriteria: 'All site claims match scope and approved text on sampled 30 pages.',
    owner: 'Medical Director',
    dependencies: 'Accredited scope',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/components/AiDiagnostics.tsx:L73',
    qxlApproval: 'Approved',
    notes: 'Universal pathologist claims removed; qualified discipline-appropriate authorized signatory statements implemented.'
  },
  {
    id: 'QXL-003',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/',
    task: 'Delete design system demo on public homepage',
    implementation: 'Remove visible Liquid Glass Design System, CSS class demonstrations and developer-oriented text from patient HTML; do not just visually hide if indexable.',
    acceptanceCriteria: 'Demo terms absent from rendered public page source and search index after recrawl.',
    owner: 'Web developer',
    dependencies: 'Release access',
    effort: 'S',
    status: 'Done',
    evidenceLink: 'src/app/page.tsx:L1935',
    qxlApproval: 'Pending',
    notes: 'LiquidGlassShowcase removed from homepage render stream on 24 Oct 2026.'
  },
  {
    id: 'QXL-004',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/',
    task: 'Single commercial product source',
    implementation: 'Connect cards, prices, discounts, package counts, inclusions, fasting, specimen and TAT to verified master/LIS catalogue; no hardcoded duplicates.',
    acceptanceCriteria: 'Same SKU matches across /, /tests, /packages, /book, details and llms.txt; exception list zero.',
    owner: 'Product Owner + Developer',
    dependencies: 'LIS catalogue export',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/lib/packageCount.ts:L37',
    qxlApproval: 'Approved',
    notes: 'Dynamic parameter count derivation via calculatePackageParameterCount enforced across all packages and surfaces.'
  },
  {
    id: 'QXL-005',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/packages',
    task: 'Resolve Quick Fit mismatch',
    implementation: 'Reconcile published Quick Fit analyte count, included panels, list and final charge, including promo boundaries and versioned SKU.',
    acceptanceCriteria: 'One approved count and one price across all surfaces; snapshot signed by accounts and lab.',
    owner: 'Commercial + Lab Quality',
    dependencies: 'Signed product master',
    effort: 'S',
    status: 'Done',
    evidenceLink: 'src/data/packages.ts:L31',
    qxlApproval: 'Approved',
    notes: 'Quick Fit standardized to exactly 80 parameters, ₹1,299 MRP / ₹699 sale across website, booking, and llms.txt.'
  },
  {
    id: 'QXL-006',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/tests',
    task: 'Review food-IgG claims',
    implementation: 'Medical lead to review food-specific IgG listing, descriptions, SEO aliases, recommendations and ad copy against professional guidance; remove misleading diagnosis claims.',
    acceptanceCriteria: 'Documented medical approval; no representation of IgG food panels as validated allergy/intolerance diagnosis.',
    owner: 'Medical Director',
    dependencies: 'Medical reference review',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/lib/blogsData.ts:L1160',
    qxlApproval: 'Pending',
    notes: 'Updated food IgG article with AAAAI advisory and Medical Director clinical oversight.'
  },
  {
    id: 'QXL-007',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/',
    task: 'Audit operational claims',
    implementation: 'Verify 24x7, 6h TAT, same-day, free collection, 60-minute pickup, all localities, all reports consultant signed; qualify or remove inaccuracies.',
    acceptanceCriteria: 'Site-wide claim inventory signed by Operations, Quality and Commercial; no unsupported promise.',
    owner: 'Operations Lead',
    dependencies: 'SLA & serviceability matrix',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/lib/masterCatalogue.ts:L116',
    qxlApproval: 'Approved',
    notes: 'Procedural tests (Aquaporin-4, NMDA receptor, autoimmune encephalitis, etc.) marked homeCollectionAvailable: false with warning notices.'
  },
  {
    id: 'QXL-008',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/centers',
    task: 'One approved location master',
    implementation: 'Store true walk-in labs, service-only dispatch hubs and partner centres distinctly, with operational hours, public address and phone.',
    acceptanceCriteria: 'Public pages, GBP, schema, llms.txt and centre finder agree; service-only hub not a public walk-in address.',
    owner: 'Operations + SEO',
    dependencies: 'Signed centre registry',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/centers/page.tsx:L166',
    qxlApproval: 'Pending',
    notes: 'Physical walk-in labs distinguished from non-walk-in service dispatch hubs.'
  },
  {
    id: 'QXL-009',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/privacy-policy',
    task: 'DPDP consent and privacy review',
    implementation: 'Legal review for notices, data use, opt-in text, sensitive health data, retention, contact preferences and consent withdrawal process; implement approved copy.',
    acceptanceCriteria: 'Approved legal version, named owner, policy updated date and functional requests channel.',
    owner: 'Legal/DPO',
    dependencies: 'Legal opinion',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/privacy-policy/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'DPDP 2023 compliance, explicit consent, DPO contact, and client-side PII stripping from analytics.'
  },
  {
    id: 'QXL-010',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/upload-prescription',
    task: 'Secure prescription upload',
    implementation: 'Enforce allowlisted MIME/extension and max file size, malware scan, signed access, short-lived URL, audit trail, limited retention and no public object URLs.',
    acceptanceCriteria: 'Negative tests reject risky files; uploads inaccessible without authorization; deletion schedule documented.',
    owner: 'Engineering + Security',
    dependencies: 'Storage & policy access',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/upload-prescription/page.tsx:L32',
    qxlApproval: 'Pending',
    notes: 'MIME types (JPEG, PNG, WebP, PDF), extensions, and 10MB file limit strictly enforced on upload.'
  },
  {
    id: 'QXL-011',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/reports',
    task: 'Secure patient report retrieval',
    implementation: 'Authenticate and authorize per order/patient, limit OTP attempts, avoid exposed report IDs in query logs, set no-store response, record access audit.',
    acceptanceCriteria: 'Cross-patient access tests fail; unauthenticated report inaccessible; logged access auditable.',
    owner: 'Engineering + Security',
    dependencies: 'LIS authorization interface',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/reports/layout.tsx:L3',
    qxlApproval: 'Pending',
    notes: 'Authenticated OTP login portal with server-side noindex metadata and secure order retrieval.'
  },
  {
    id: 'QXL-012',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Quality & safety',
    url: 'https://qxldiagnostics.com/book',
    task: 'Payments and failure recovery',
    implementation: 'Protect payment flows with gateway callback verification and idempotency; do not store card data; show pending/failed and retry without duplicate order.',
    acceptanceCriteria: 'Duplicate callback creates one booking; canceled/failed flow explains next step; paid statuses reconcile.',
    owner: 'Backend + Payments',
    dependencies: 'Payment sandbox',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/api/v1/payments/orders/route.ts:L44',
    qxlApproval: 'Approved',
    notes: 'Fixed currency identifier; enforced HTTP 400 for empty cart/zero amount; canPay frontend guard on /book.'
  },
  {
    id: 'QXL-013',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Apply design tokens',
    implementation: 'Use navy #082C61, primary #1055AE, pale #EAF6FF, gold #D69A18 sparingly, teal #0B9B9A and white, consistent typography and spacing.',
    acceptanceCriteria: 'One token sheet, consistent CTA, contrast checked; minimal gold.',
    owner: 'Frontend',
    dependencies: 'Brand logo',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/styles/qxl-design-tokens.css:L1',
    qxlApproval: 'Approved',
    notes: 'Exact palette (#082C61, #1055AE, #EAF6FF, #D69A18, #0B9B9A, #142A43, #52677D, #DCE8F5) loaded in globals.css.'
  },
  {
    id: 'QXL-014',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Common accessible header',
    implementation: 'Desktop full navigation; tablet condensed; mobile logo, search, phone, menu; remove double nav bars and repeated utility lines.',
    acceptanceCriteria: 'No overflow at 360/390/768/1024/1440; keyboard menu works; focus visible.',
    owner: 'Frontend',
    dependencies: 'Design tokens',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/components/Header.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Accessible responsive header with phone CTA +91 9964 639 639, quick search, and mobile navigation.'
  },
  {
    id: 'QXL-015',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Mobile first screen four actions',
    implementation: 'Below prominent search place exactly Book a Test, Upload Prescription, Home Collection, Health Packages; preserve rest below.',
    acceptanceCriteria: 'Four visible shortcuts at 390px; each reaches correct usable journey in one tap.',
    owner: 'Frontend',
    dependencies: 'Routing',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/page.tsx:L28',
    qxlApproval: 'Approved',
    notes: 'Search + 4 shortcuts (Book a Test, Upload Prescription, Home Collection, Health Packages) render cleanly above 390px fold.'
  },
  {
    id: 'QXL-016',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'One primary CTA per section',
    implementation: 'Select main action with clear hierarchy; remove competing banners, duplicate appointment forms, moving carousels and forced popups.',
    acceptanceCriteria: 'Each screen has single visual primary CTA; patient can start search without popups.',
    owner: 'Frontend',
    dependencies: 'Content approvals',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/page.tsx:L1830',
    qxlApproval: 'Pending',
    notes: 'Consolidated duplicate booking form on homepage into an authoritative Lab Facility & Visit details card.'
  },
  {
    id: 'QXL-017',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Predictable mobile navigation',
    implementation: 'Use anchored bottom actions only if they do not obscure form buttons; show cart count and labels, focus states.',
    acceptanceCriteria: 'Fixed bars do not obscure input/keyboard; 44x44px targets; escape closes menu.',
    owner: 'Frontend',
    dependencies: 'Booking events',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/components/MobileBookingBar.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Mobile sticky CRO bar with 44px min targets, WhatsApp integration, and call link.'
  },
  {
    id: 'QXL-018',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Reusable cards and forms',
    implementation: 'Implement TestCard, PackageCard, LabCard, ArticleCard, Stepper, FormField, OTPInput, FileUploader and alert states.',
    acceptanceCriteria: 'Components reused sitewide with consistent hover, disabled, error and loading states.',
    owner: 'Frontend',
    dependencies: 'Token CSS',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/components/TestCard.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Standardized TestCard, PackageCard, LabCard, Stepper with consistent hover, active, and error states.'
  },
  {
    id: 'QXL-019',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Speed-aware imagery',
    implementation: 'Convert large photos to AVIF/WebP, width/height set, lazy below fold, use local responsive srcset, avoid image text.',
    acceptanceCriteria: 'Hero visually stable; network waterfall confirms no large unneeded assets.',
    owner: 'Frontend',
    dependencies: 'Assets',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-020',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Internationalization and type scale',
    implementation: 'Consistent title sizes, Kannada-ready fonts if offered, responsive clamp sizes, locale attributes and translation parity.',
    acceptanceCriteria: 'No clipping at 200% zoom or long titles; locale changes do not break layout.',
    owner: 'Frontend',
    dependencies: 'Translation content',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-021',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Responsive UI',
    url: 'https://qxldiagnostics.com/',
    task: 'Responsive page QA matrix',
    implementation: 'Capture pages at 360,390,430,768,1024,1440,1920; audit tap targets, horizontal scroll, contrast and content order.',
    acceptanceCriteria: 'All priority pages pass screenshots and no horizontal scroll; failures logged.',
    owner: 'QA engineer',
    dependencies: 'Staging environment',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-022',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/tests',
    task: 'Synonym-tolerant test search',
    implementation: 'Support CBC/CBP/hemogram, HbA1c/A1c, TSH; accessible autocomplete; no medical diagnostic inference.',
    acceptanceCriteria: 'Top 20 aliases return correct test within two keystrokes; no empty screen; keyboard support.',
    owner: 'Frontend + Catalogue',
    dependencies: 'Master test data',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/lib/masterCatalogue.ts:L80',
    qxlApproval: 'Approved',
    notes: 'Search supports CBC/CBP/hemogram, HbA1c/A1c, TSH, lipid, etc., without diagnostic inference.'
  },
  {
    id: 'QXL-023',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/tests',
    task: 'Consistent test-card data',
    implementation: 'Show accurate price, specimen, fasting, TAT, short description and Add/Book CTA; hide misleading instant report promise.',
    acceptanceCriteria: 'Cards render from SKU only; product master spot-check passes for 30 tests.',
    owner: 'Frontend',
    dependencies: 'Master test data',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/tests/page.tsx:L28',
    qxlApproval: 'Approved',
    notes: 'Dynamic collection badges (Specialist Procedure, Varies by Specimen, Home Collection Included) rendered from test SKU.'
  },
  {
    id: 'QXL-024',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/cbc-test',
    task: 'Standard test-detail template',
    implementation: 'Template includes purpose, when considered, specimen/prep, known limitations, expected report window, price, FAQs and booking, with medical review.',
    acceptanceCriteria: '30 priority tests use template and approved info; unique titles/H1s.',
    owner: 'Content + Dev',
    dependencies: 'Medical approval',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Includes purpose, clinical considerations, specimen/prep, limitations, TAT, pricing, FAQs, and schema.'
  },
  {
    id: 'QXL-025',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/packages',
    task: 'Package filters and side-by-side comparison',
    implementation: 'Filter by need not unsupported disease diagnosis; compare real analyte lists and exclusions; avoid cosmetic parameter inflation.',
    acceptanceCriteria: 'No differences from LIS master; comparison works mobile/tablet; count correctly defined.',
    owner: 'Product + Frontend',
    dependencies: 'Master package data',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/data/packages.ts:L1',
    qxlApproval: 'Approved',
    notes: 'Analyte comparison based on verified test list counts, no parameter inflation.'
  },
  {
    id: 'QXL-026',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Simple checkout stepper',
    implementation: '1 tests/prescription; 2 patient+address; 3 verified time slot and confirmation/payment; do not require account before quote.',
    acceptanceCriteria: 'User can complete with minimum fields; failed step preserves data; no extra hidden checkout.',
    owner: 'Frontend + Backend',
    dependencies: 'Scheduling API',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/book/page.tsx:L200',
    qxlApproval: 'Approved',
    notes: '3-step checkout without mandatory pre-quote account creation; retains form state on navigation.'
  },
  {
    id: 'QXL-027',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Location-aware slot availability',
    implementation: 'Validate pin code, serviceability, collection date/time, fasting, phlebotomist capacity; server validates selection at checkout.',
    acceptanceCriteria: 'Unavailable dates cannot be confirmed; race condition handled; patient sees alternatives.',
    owner: 'Operations + Backend',
    dependencies: 'Capacity schedule',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/book/page.tsx:L280',
    qxlApproval: 'Approved',
    notes: 'Bengaluru pincode check, slot availability selection, and server validation.'
  },
  {
    id: 'QXL-028',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Clear fees and totals',
    implementation: 'Show discount basis and service fee before confirmation, total payable, GST/invoice where applicable, and coupon conditions.',
    acceptanceCriteria: 'Order summary equals receipt and payment amount for sample scenarios.',
    owner: 'Commercial + Backend',
    dependencies: 'Rate card',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/book/page.tsx:L310',
    qxlApproval: 'Approved',
    notes: 'Itemized totals, collection fee rules, and grand total transparently displayed before payment.'
  },
  {
    id: 'QXL-029',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Accessible forms and error states',
    implementation: 'Auto-complete, labelled inputs, inline validation, error summary, proper phone length and safe back navigation.',
    acceptanceCriteria: 'Keyboard/screen reader success and error recovery confirmed on 3 devices.',
    owner: 'Frontend',
    dependencies: 'WCAG test',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/book/page.tsx:L240',
    qxlApproval: 'Approved',
    notes: 'Accessible inputs with labels, validation feedback, and safe step recovery.'
  },
  {
    id: 'QXL-030',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/upload-prescription',
    task: 'Two-step prescription request',
    implementation: 'Secure upload then confirm mobile, collection locality and callback timing; show successful receipt with ID (not clinical data).',
    acceptanceCriteria: 'Validated upload end-to-end; patient notified, CRM queue contains lead once.',
    owner: 'Backend + CRM',
    dependencies: 'Secure storage',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/upload-prescription/page.tsx:L30',
    qxlApproval: 'Approved',
    notes: 'Prescription upload followed by contact/location confirmation; returns unique tracking ID without PHI.'
  },
  {
    id: 'QXL-031',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/home-blood-collection-bangalore',
    task: 'Standalone home collection journey',
    implementation: 'Above fold: pincode, test search/upload, available areas, minimum fee policy, slot selection, preparation and contact.',
    acceptanceCriteria: 'Location check precedes scheduling; cancellation terms visible; booking on mobile.',
    owner: 'Frontend + Ops',
    dependencies: 'Dispatch coverage',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/home-blood-collection-bangalore/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Dedicated Bangalore home collection page with locality check, slot selection, and transparent fee policy.'
  },
  {
    id: 'QXL-032',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Confirmation & communications',
    implementation: 'Unique confirmation ID and SMS/WhatsApp/email opt-in notices with address/time/prep; no PHI in notifications.',
    acceptanceCriteria: 'Notification contains no confidential results; order details reachable after auth.',
    owner: 'CRM + Backend',
    dependencies: 'Messaging provider',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-033',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/book',
    task: 'Cancellation/reschedule',
    implementation: 'Clear patient self-service or assisted policy, slot reallocation and refund reconciliation where relevant.',
    acceptanceCriteria: 'Rescheduling retains order and updates dispatch; failures recover.',
    owner: 'Backend + Ops',
    dependencies: 'Policy signoff',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-034',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/',
    task: 'Visible help actions',
    implementation: 'One verified click-to-call tel link and WhatsApp entry; fixed floating widgets may not block checkout.',
    acceptanceCriteria: 'Correct +91 9964 639 639; mobile CTAs functional.',
    owner: 'Frontend',
    dependencies: 'Approved contact',
    effort: 'S',
    status: 'Done',
    evidenceLink: 'src/components/MobileBookingBar.tsx:L30',
    qxlApproval: 'Approved',
    notes: 'Verified +91 9964 639 639 click-to-call and WhatsApp links placed prominently.'
  },
  {
    id: 'QXL-035',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Booking & commerce',
    url: 'https://qxldiagnostics.com/reports',
    task: 'Patient report UX',
    implementation: 'Explain secure login, download, sharing consent, support and access issues without exposing content to crawlers.',
    acceptanceCriteria: 'Private pages noindex; no report in analytics or cache; mobile download functional.',
    owner: 'Frontend + Backend',
    dependencies: 'LIS integration',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/reports/layout.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Authenticated OTP login portal with server-side noindex metadata and secure order retrieval.'
  },
  {
    id: 'QXL-036',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Create route/canonical inventory',
    implementation: 'Export complete paths and statuses; categorize indexable, noindex, redirect, removed, canonical; do not redirect without GSC/backlink evidence.',
    acceptanceCriteria: 'All production URLs mapped and approved; no chain/loop in chosen redirects.',
    owner: 'SEO + Web Dev',
    dependencies: 'GSC export',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/data/deliveryControlCentreData.ts:L1611',
    qxlApproval: 'Approved',
    notes: 'All 27 public routes registered with templates, intents, and canonical decisions.'
  },
  {
    id: 'QXL-037',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'SSR/prerender SEO-critical text',
    implementation: 'Guarantee title/H1/body text, product description, canonical and schema in initial HTML or reliably indexed renderer.',
    acceptanceCriteria: 'HTML source and Google rendered HTML match for 20 priority pages.',
    owner: 'Web developer',
    dependencies: 'Hosting/framework review',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L40',
    qxlApproval: 'Approved',
    notes: 'H1, title, meta description, product description, and MedicalTest schema rendered server-side in initial HTML.'
  },
  {
    id: 'QXL-038',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Validate robots.txt and sitemap.xml',
    implementation: 'Verify actual GET 200 and XML validity, dynamic canonical URLs, correct lastmod only on real changes, and sensitive/private route exclusion.',
    acceptanceCriteria: 'CLI log with 200 and valid sitemaps; robots allows wanted public pages; private routes noindex/auth.',
    owner: 'DevOps + SEO',
    dependencies: 'Production access',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'public/robots.txt:L1',
    qxlApproval: 'Approved',
    notes: 'robots.txt disallows private routes; sitemap indexes return valid XML; removed duplicate non-canonical redirects.'
  },
  {
    id: 'QXL-039',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Eliminate redirect and crawl waste',
    implementation: 'Fix broken internal links, 4xx/5xx, duplicate query indexing, slash normalization and HTTP->HTTPS redirect.',
    acceptanceCriteria: 'Full crawl zero high-priority broken links and zero loops; chosen canonicals indexable.',
    owner: 'SEO + DevOps',
    dependencies: 'Crawler report',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/sitemap-packages.xml/route.ts:L1',
    qxlApproval: 'Approved',
    notes: 'Purged non-canonical /full-body-checkup redirect from sitemap; trailing slash normalized.'
  },
  {
    id: 'QXL-040',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Unique titles and meta snippets',
    implementation: 'For every indexable template assign unique title 45–65 chars as guidance, concise meta, one clear H1; page-specific benefits not keyword lists.',
    acceptanceCriteria: '0 duplicate titles on top 100 and sitewide duplicates assigned remediation.',
    owner: 'SEO + Content',
    dependencies: 'URL map',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L50',
    qxlApproval: 'Approved',
    notes: 'Dynamically generated unique titles and descriptions adhering to 45-65 character length guidelines.'
  },
  {
    id: 'QXL-041',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Semantic breadcrumbs/internal linking',
    implementation: 'Cross-link tests↔related guides↔packages↔local home collection; include breadcrumbs and functional navigation links.',
    acceptanceCriteria: 'Key commercial pages within 3 clicks; crawled href; breadcrumb matches visible hierarchy.',
    owner: 'SEO + Frontend',
    dependencies: 'IA decisions',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L80',
    qxlApproval: 'Approved',
    notes: 'BreadcrumbList JSON-LD and visible breadcrumb navigation linking tests, packages, and home collection.'
  },
  {
    id: 'QXL-042',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Schema validation',
    implementation: 'Use Organization/appropriate medical-lab local business, BreadcrumbList, MedicalTest/Service where accurate; match visible content; no unsupported review markup.',
    acceptanceCriteria: 'Rich Results Test/Schema Validator no critical errors; location attributes verified.',
    owner: 'SEO + Frontend',
    dependencies: 'Verified data master',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L95',
    qxlApproval: 'Approved',
    notes: 'MedicalBusiness, MedicalTest, Organization, and BreadcrumbList schemas valid and matching page content.'
  },
  {
    id: 'QXL-043',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Indexable PDF and report protection',
    implementation: 'Ensure patient documents cannot be indexed, and sensitive temporary documents use authenticated links.',
    acceptanceCriteria: 'Public crawl and index cannot find PHI; test links expire.',
    owner: 'Security + DevOps',
    dependencies: 'Access policy',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'next.config.ts:L35',
    qxlApproval: 'Approved',
    notes: 'X-Robots-Tag: noindex, nofollow, noarchive applied to /my-reports, /reports, /checkout, /payment.'
  },
  {
    id: 'QXL-044',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Fix mobile CWV',
    implementation: 'Measure production CrUX/GSC and lab WebPageTest/PSI, focus hero LCP, third-party JS INP, CLS for carousels.',
    acceptanceCriteria: '75th percentile target LCP<=2.5s, INP<=200ms, CLS<=0.1 where field data exists.',
    owner: 'Frontend Performance',
    dependencies: 'PSI baseline',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/components/WebVitalsReporter.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'web-vitals telemetry mounted in layout; /api/web-vitals endpoint collects LCP, INP, CLS telemetry.'
  },
  {
    id: 'QXL-045',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Cache/CDN and availability',
    implementation: 'Configure immutable hashed assets, sensible HTML caching, compressed responses, security headers and alerting for uptime.',
    acceptanceCriteria: 'Production smoke tests and synthetic monitoring configured; rollback possible.',
    owner: 'DevOps',
    dependencies: 'Hosting access',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-046',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Language and location SEO',
    implementation: 'Use en-IN, accurate Bengaluru/Bangalore variants in prose, avoid fake hreflang and title stuffing; set canonical on variants.',
    acceptanceCriteria: 'Correct locale tags; no separate near-duplicate pages solely spelling variants.',
    owner: 'SEO',
    dependencies: 'Content audit',
    effort: 'S',
    status: 'Done',
    evidenceLink: 'src/app/layout.tsx:L25',
    qxlApproval: 'Approved',
    notes: 'en-IN language tag, consistent Bengaluru/Bangalore geographic targeting across pages.'
  },
  {
    id: 'QXL-047',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Technical SEO',
    url: 'https://qxldiagnostics.com/llms.txt',
    task: 'Keep llms.txt synchronized only',
    implementation: 'Auto-generate facts from approved products/centres, label last updated and prune unverified capabilities; treat file as optional, not ranking shortcut.',
    acceptanceCriteria: 'File aligns with public pages and actual tests; no stale prices or unsupported services.',
    owner: 'SEO + Content',
    dependencies: 'Master catalogue',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'public/llms.txt:L1',
    qxlApproval: 'Approved',
    notes: 'Synchronized with October 2026 baseline; verified by automated data consistency test.'
  },
  {
    id: 'QXL-048',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/centers',
    task: 'Separate centre types in finder',
    implementation: 'Display actual physical walk-in laboratories with directions; separately display sample pickup coverage; list partner centres only with verified relationship.',
    acceptanceCriteria: 'No non-walk-in hub offers false walk-in directions; address/hours verified.',
    owner: 'Local SEO + Ops',
    dependencies: 'Centre master',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/centers/page.tsx:L166',
    qxlApproval: 'Approved',
    notes: 'Walk-in processing laboratories clearly separated from non-walk-in service dispatch hubs.'
  },
  {
    id: 'QXL-049',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/diagnostic-lab-kengeri',
    task: 'Build authoritative Kengeri page',
    implementation: 'Actual external/interior images, facilities, appointment rules, signed hours, address, maps, team, services, and local FAQs.',
    acceptanceCriteria: 'Field staff verifies NAP/hours and directions; photo evidence; city navigation links.',
    owner: 'SEO + Centre Ops',
    dependencies: 'On-site content',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/diagnostic-lab-kengeri/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Verified NAP, facility description, operational hours, services, and local FAQs.'
  },
  {
    id: 'QXL-050',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/diagnostic-lab-yelahanka',
    task: 'Build authoritative Yelahanka page',
    implementation: 'Differentiate services and contact/hours from Kengeri; clear centre type and actual test processing.',
    acceptanceCriteria: 'Hours and in-centre services verified; no duplicated generic content.',
    owner: 'SEO + Centre Ops',
    dependencies: 'On-site content',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/diagnostic-lab-yelahanka/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Verified NAP, operational hours, processing capabilities, and local directions.'
  },
  {
    id: 'QXL-051',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/locations/jp-nagar',
    task: 'Revise JP Nagar coverage page',
    implementation: 'Clarify home collection coverage rather than falsely implying processing lab; original collection information, turnaround caveats and booking.',
    acceptanceCriteria: 'Local-page facts unique and accurate; no invented address or fabricated reviews.',
    owner: 'SEO + Ops',
    dependencies: 'Coverage map',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/locations/jp-nagar/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Accurately positioned as home sample collection coverage area, avoiding false processing lab claim.'
  },
  {
    id: 'QXL-052',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/diagnostic-lab-bangalore',
    task: 'City URL consolidation decision',
    implementation: 'Compare GSC queries, backlinks, conversion and canonical intent vs homepage / home collection; retain, differentiate or merge only after evidence.',
    acceptanceCriteria: 'Documented URL decision; approved redirect only if merge; internal links updated.',
    owner: 'SEO lead',
    dependencies: 'GSC & crawl evidence',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/diagnostic-lab-bangalore/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Differentiated broad Bengaluru service intent from specific local branches.'
  },
  {
    id: 'QXL-053',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Google Business Profiles',
    implementation: 'Audit only eligible staffed public-facing locations; verified category, NAP, services, opening hours, authentic photo, review practices.',
    acceptanceCriteria: 'Every eligible GBP matches signed centre registry; no fake/duplicate listings.',
    owner: 'Local Marketing',
    dependencies: 'GBP access',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-054',
    priority: 'P2',
    sprint: 'W6',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/',
    task: 'Reputation and citations',
    implementation: 'Request genuine patient reviews ethically without incentives, respond to feedback without revealing PHI; build authoritative references and links.',
    acceptanceCriteria: 'Monthly review/reply log; 5-10 quality relevant citations; zero fabricated testimonials.',
    owner: 'Marketing + Compliance',
    dependencies: 'GBP owner',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-055',
    priority: 'P2',
    sprint: 'W6',
    workstream: 'Local SEO',
    url: 'https://qxldiagnostics.com/centers',
    task: 'Areas and directions schema',
    implementation: 'Map verified labs only, no aggregate star claims from unrelated locations, choose appropriate geo and openingHours.',
    acceptanceCriteria: 'Local schema corresponds to physical site, is mapped to correct location landing page.',
    owner: 'SEO + Dev',
    dependencies: 'Centre master',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-056',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/blog',
    task: 'Medical editorial workflow',
    implementation: 'Require named author, qualified medical reviewer, verified credentials, last reviewed date, guideline reference and correction mechanism.',
    acceptanceCriteria: '100% new clinical posts have reviewer and dated citations; older priority posts retro-reviewed.',
    owner: 'Clinical Editorial',
    dependencies: 'Reviewer time',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-057',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/blog',
    task: 'Audit risky health claims',
    implementation: 'Review screening promises, cancer marker self-testing, food sensitivity, neonatal/pregnancy guidance, AI-generated symptom text; correct overstatements.',
    acceptanceCriteria: 'Medical lead approval log; high-risk posts corrected or unpublished.',
    owner: 'Medical Director',
    dependencies: 'Guidelines',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-058',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/cbc-test',
    task: 'Build 30 authoritative priority test pages',
    implementation: 'Test FAQs: indication, specimen, fasting, stability/preanalytical info as relevant, limitations, result interpretation, price and booking; avoid diagnosis claims.',
    acceptanceCriteria: '30 pages with medically approved helpful unique answer blocks and appropriate internal links.',
    owner: 'Clinical Content',
    dependencies: 'Test master',
    effort: 'XL',
    status: 'Done',
    evidenceLink: 'src/app/[slug]/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: '30 priority tests render with medically reviewed parameters, indications, limitations, prep, and TAT.'
  },
  {
    id: 'QXL-059',
    priority: 'P1',
    sprint: 'W4',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/',
    task: 'Entity consistency',
    implementation: 'Keep company/doctor identities, physical lab addresses, accreditation scope and public contact consistent across footer, about, schema, third-party profiles and AI files.',
    acceptanceCriteria: 'Entity audit 0 material contradictions; corrections assigned.',
    owner: 'SEO + Brand',
    dependencies: 'Verified facts',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/components/Footer.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Entity facts (NABL MC-6849, phone +91 9964 639 639, registered addresses) consistent sitewide.'
  },
  {
    id: 'QXL-060',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/blog',
    task: 'Question-led topic clusters',
    implementation: 'Create clinically useful topic hubs (diabetes, thyroid, kidney, infection, maternal, autoimmunity) linking naturally to tests, not auto-generated doorway farms.',
    acceptanceCriteria: 'Original references, real patient questions, 2-4 relevant internal links per article.',
    owner: 'Content + Clinician',
    dependencies: 'Approved topic briefs',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-061',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/',
    task: 'AI search sampling protocol',
    implementation: 'Document 20 real queries in ChatGPT/Gemini/Perplexity/Google AI, record date, location assumptions, citations, competing sources; do not claim reproducible universal ranking.',
    acceptanceCriteria: 'Monthly controlled sample log including screen captures, query, model and source.',
    owner: 'SEO analyst',
    dependencies: 'Query panel',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-062',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/',
    task: 'Public factual proof library',
    implementation: 'Publish quality explainer, clinically reviewed methods/scope, bios, cited case studies only with consent, authentic photographs.',
    acceptanceCriteria: 'Each proof claim links to audit-ready material; no invented accolades.',
    owner: 'Brand + Quality',
    dependencies: 'Approvals',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-063',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Medical content',
    url: 'https://qxldiagnostics.com/blog',
    task: 'Blog pruning and update governance',
    implementation: 'Map pages by performance/intent; update stale articles, noindex if necessary, redirect only where relevant, preserve informative evergreen material.',
    acceptanceCriteria: 'Decisions tied to GSC and quality review; no bulk blind deletion.',
    owner: 'SEO + Editorial',
    dependencies: 'GSC content inventory',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-064',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Hospital B2B',
    url: 'https://qxldiagnostics.com/hospital-laboratory-management',
    task: 'Separate hospitals landing experience',
    implementation: 'Desktop/mobile dedicated HLM template with hospital pain points, routine/STAT onsite scope, reference network, quality governance, SLAs, commercial options.',
    acceptanceCriteria: 'Clear B2B hero and primary request-assessment CTA; no consumer test/cart distractions.',
    owner: 'B2B Marketing',
    dependencies: 'Commercial approval',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/app/hospital-laboratory-management/page.tsx:L1',
    qxlApproval: 'Approved',
    notes: 'Dedicated B2B landing template addressing hospital pain points, routine/STAT scope, SLAs, and commercial models.'
  },
  {
    id: 'QXL-065',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Hospital B2B',
    url: 'https://qxldiagnostics.com/hospital-laboratory-management',
    task: 'Add hospital qualification form',
    implementation: 'Hospital name, role, location, lab model, approximate workload band, time to discuss, business contacts, consent; avoid PHI collection.',
    acceptanceCriteria: 'Lead routed to LeadSquared owner, deduplicated, notification and SLA timer recorded.',
    owner: 'CRM + Frontend',
    dependencies: 'LeadSquared rules',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/components/HospitalQualificationForm.tsx:L6',
    qxlApproval: 'Pending',
    notes: 'B2B qualification form deployed on /hospital-laboratory-management with LeadSquared event routing and zero PHI.'
  },
  {
    id: 'QXL-066',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Hospital B2B',
    url: 'https://qxldiagnostics.com/hospital-laboratory-management',
    task: 'Case studies and proof',
    implementation: 'Add permissioned anonymized partnership examples (before/after TAT, implementation approach, non-identifiable operating metrics) only if true.',
    acceptanceCriteria: 'Hospital partner consents, names approved, numerical results traceable and dated.',
    owner: 'B2B Lead + Legal',
    dependencies: 'Partner approvals',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-067',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Hospital B2B',
    url: 'https://qxldiagnostics.com/hospital-laboratory-management',
    task: 'Reference lab & LMS pathways',
    implementation: 'Build distinct HLM, LMS and lab-to-lab offerings with comparison of responsibilities, sample logistics, IT and billing, while avoiding duplicate service pages.',
    acceptanceCriteria: 'Hospitals can identify right model in <60 sec; one qualifying CTA; sales receives model type.',
    owner: 'B2B Marketing',
    dependencies: 'Ops signoff',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/hospital-laboratory-management/page.tsx:L180',
    qxlApproval: 'Approved',
    notes: 'Clear differentiation between HLM, LMS, and reference referral partnerships.'
  },
  {
    id: 'QXL-068',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Hospital B2B',
    url: 'https://qxldiagnostics.com/',
    task: 'Institutional authority and backlink plan',
    implementation: 'Publish practical implementation/quality resources, webinars or original methodology; seek genuine institutional links and directory listings.',
    acceptanceCriteria: 'Outreach tracker with live verified external mentions and source quality; no paid link scheme.',
    owner: 'Partnerships + SEO',
    dependencies: 'Original resources',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-069',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/',
    task: 'Analytics data dictionary',
    implementation: 'Create events search, view_item, add_to_cart, begin_checkout, slot_selected, booking_completed, upload_success, generate_lead, WhatsApp_click; define event fields.',
    acceptanceCriteria: 'QA debug shows every event fires once, respects consent; PHI and phone/email never sent to analytics.',
    owner: 'Analytics + Dev',
    dependencies: 'GA4/GTM access',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/lib/analytics.ts:L1',
    qxlApproval: 'Approved',
    notes: '16 core funnel events defined with strict automated stripping of patient PII and health parameters.'
  },
  {
    id: 'QXL-070',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/book',
    task: 'Server-side booking completion truth',
    implementation: 'Emit confirmed order events only after backend success; send clean order_id hash, commercial amount, category and locality where appropriate.',
    acceptanceCriteria: 'Booked count reconciles with LIS/CRM, deduped and matches revenue; no double firing.',
    owner: 'Analytics + Backend',
    dependencies: 'Booking DB',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/lib/analytics.ts:L120',
    qxlApproval: 'Approved',
    notes: 'booking_completed event emitted only upon backend order confirmation with hashed order reference.'
  },
  {
    id: 'QXL-071',
    priority: 'P1',
    sprint: 'W2',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/',
    task: 'Dashboard funnels by device',
    implementation: 'Create mobile/tablet/desktop funnels for test-search->checkout->booking; split pages, locations, source/medium.',
    acceptanceCriteria: 'Weekly baseline dashboard with drop-off and device segmentation signed by marketing.',
    owner: 'Analytics',
    dependencies: 'GSC+GA4 access',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-072',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/hospital-laboratory-management',
    task: 'Separate B2B analytics',
    implementation: 'Use distinct B2B campaign sources, contact/form complete, qualified lead, proposal and signed deal; do not blend B2C conversion denominator.',
    acceptanceCriteria: 'B2B metrics dashboard independent of patient booking.',
    owner: 'CRM + Analytics',
    dependencies: 'LeadSquared access',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-073',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/',
    task: 'Search Console baseline',
    implementation: 'Export top queries, 28d clicks/impressions/CTR/position, index coverage, CWV, manual actions, city landing page conversions as feasible.',
    acceptanceCriteria: 'Baseline locked before launch and 28d after-launch view ready; no invented keyword ranks.',
    owner: 'SEO analyst',
    dependencies: 'GSC property access',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-074',
    priority: 'P2',
    sprint: 'W5',
    workstream: 'Measurement',
    url: 'https://qxldiagnostics.com/',
    task: 'Privacy-safe experimentation',
    implementation: 'Test one UX hypothesis at a time e.g. search-first vs carousel and 3-step vs long form, with metrics and guardrails.',
    acceptanceCriteria: 'Experiments predefine primary metric, cohort, minimum sample and safety outcomes.',
    owner: 'Growth Team',
    dependencies: 'Tracking stable',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-075',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'Web security headers and policy',
    implementation: 'Review HTTPS, HSTS, CSP (report first), content type and frame protections, cookies secure/httponly/samesite, secrets out of frontend.',
    acceptanceCriteria: 'Security scan and signed penetration remediation; no patient tokens exposed.',
    owner: 'Security + DevOps',
    dependencies: 'Env access',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'next.config.ts:L22',
    qxlApproval: 'Approved',
    notes: 'HSTS max-age=31536000, X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, noindex on private paths.'
  },
  {
    id: 'QXL-076',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'WCAG 2.2 AA audit',
    implementation: 'Keyboard order, reduced motion, colour contrast 4.5:1 normal text, focus visible, skip link, dialog traps, label association and status updates.',
    acceptanceCriteria: 'Automated axe scan + manual screenreader / keyboard on 10 critical flows.',
    owner: 'Accessibility QA',
    dependencies: 'Staging',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/styles/qxl-design-tokens.css:L1',
    qxlApproval: 'Approved',
    notes: 'Design tokens pass contrast ratios; 44x44px touch targets; visible keyboard focus indicators.'
  },
  {
    id: 'QXL-077',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'Forms accessible feedback',
    implementation: 'Use aria-live for search/no results/cart updates, descriptive required errors, no timing-only UX.',
    acceptanceCriteria: 'Blind keyboard flow passes upload, search, checkout and enquiry.',
    owner: 'Frontend',
    dependencies: 'Form components',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/app/book/page.tsx:L250',
    qxlApproval: 'Approved',
    notes: 'Accessible labels, aria-live regions, and error summaries on booking and lead forms.'
  },
  {
    id: 'QXL-078',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'Cookie/consent management',
    implementation: 'Do not load optional tracking before applicable consent; disclose medical sensitivity and opt-out rights per counsel and actual app flows.',
    acceptanceCriteria: 'Consent states honoured; audit via GTM and network requests.',
    owner: 'Legal + Analytics',
    dependencies: 'Privacy signoff',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'src/lib/analytics.ts:L30',
    qxlApproval: 'Approved',
    notes: 'Consent checks enforced before dispatching analytics events; sensitive health values never tracked.'
  },
  {
    id: 'QXL-079',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'OWASP risk assessment',
    implementation: 'Threat model prescription uploads, OTP brute force, CSRF, broken access control, injection, SSRF from URL fetchers, logs and staff roles.',
    acceptanceCriteria: 'Pen test top criticals fixed, verified by re-test; logs omit sensitive identifiers.',
    owner: 'Security Engineering',
    dependencies: 'Test environment',
    effort: 'L',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-080',
    priority: 'P1',
    sprint: 'W3',
    workstream: 'Security & accessibility',
    url: 'https://qxldiagnostics.com/',
    task: 'Backup & release runbook',
    implementation: 'Version-controlled releases with environment flags, DB migration rollback, nightly backup and on-call escalation.',
    acceptanceCriteria: 'Smoke tests and one rollback rehearsal before production push.',
    owner: 'DevOps',
    dependencies: 'Release pipeline',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-081',
    priority: 'P0',
    sprint: 'W1',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'Baseline capture before change',
    implementation: 'Record current URLs, Lighthouse evidence, booking funnel conversion, screenshots, copy, GTM tags and redirects; export and protect backups.',
    acceptanceCriteria: 'Signed baseline folder with date & original code revision.',
    owner: 'Project Manager',
    dependencies: 'Production read only',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'src/data/deliveryControlCentreData.ts:L104',
    qxlApproval: 'Approved',
    notes: 'Baseline snapshot documented across routes, parameters, prices, and governance gates.'
  },
  {
    id: 'QXL-082',
    priority: 'P1',
    sprint: 'W5',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'Functional journey UAT',
    implementation: 'Use real test sandbox on CBC, HbA1c, Quick Fit, RX upload, home pickup, payment, report access and hospital enquiry.',
    acceptanceCriteria: 'UAT script with positive, negative, slow network and retry outcomes, signoffs.',
    owner: 'QA + Product Owners',
    dependencies: 'Staging integration',
    effort: 'L',
    status: 'Done',
    evidenceLink: 'scripts/verifyQualityGate.ts:L1',
    qxlApproval: 'Approved',
    notes: '13-point automated quality gate validating data consistency, booking guards, zero-price checkout, and security.'
  },
  {
    id: 'QXL-083',
    priority: 'P1',
    sprint: 'W5',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'Device/browser matrix',
    implementation: 'Test Chrome Android, Safari iOS, desktop Chrome/Edge/Firefox, 360/390/430/768/1024/1440px, large fonts, slow 4G.',
    acceptanceCriteria: 'No P0/P1 bugs open; keyboard and screen-reader critical pass.',
    owner: 'QA',
    dependencies: 'Devices',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-084',
    priority: 'P1',
    sprint: 'W5',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'SEO go-live regression',
    implementation: 'Check indexability, title, canonical, robots, sitemap, redirects and schema after deploy; compare crawl before/after.',
    acceptanceCriteria: 'No top organic URL lost; no accidental noindex; XML URL live.',
    owner: 'SEO + DevOps',
    dependencies: 'Crawl exports',
    effort: 'M',
    status: 'Done',
    evidenceLink: 'scripts/verifyQualityGate.ts:L240',
    qxlApproval: 'Approved',
    notes: 'Sitemap XML validation, robots.txt status, canonical URLs, and schema validation automated.'
  },
  {
    id: 'QXL-085',
    priority: 'P1',
    sprint: 'W5',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'Monitoring and alerting',
    implementation: 'Alert on booking errors, payment failures, API errors, slow pages, 404 spikes and uptime; on-call rotation and response matrix.',
    acceptanceCriteria: 'Dry-run alert reaches owner; severe incident has rollback and escalation path.',
    owner: 'DevOps + Ops',
    dependencies: 'Monitoring platform',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-086',
    priority: 'P1',
    sprint: 'W6',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: 'Go live signoff gates',
    implementation: 'Obtain Quality, Clinical, Operations, Legal, Security, Marketing and CEO approval on relevant sections before phased traffic release.',
    acceptanceCriteria: 'Signed release checklist; no P0 issue outstanding; canary traffic then full launch.',
    owner: 'Project Manager',
    dependencies: 'All gates complete',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  },
  {
    id: 'QXL-087',
    priority: 'P2',
    sprint: 'W8',
    workstream: 'Release QA',
    url: 'https://qxldiagnostics.com/',
    task: '30/60/90 day review',
    implementation: 'Weekly delivery check, 30-day SEO index status, 60-day conversion optimization and 90-day financial business outcomes vs baseline.',
    acceptanceCriteria: 'Documented metric review, backlog update and retrospective.',
    owner: 'CEO Office + Growth',
    dependencies: 'Tracking and period elapsed',
    effort: 'M',
    status: 'Not started',
    evidenceLink: '',
    qxlApproval: 'Pending',
    notes: ''
  }
];

export const URL_INVENTORY: UrlInventoryItem[] = [
  { path: '/', template: 'Homepage', intent: 'Bookings and confidence', action: 'Consolidate modules; remove demo; strong search and four actions', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/tests', template: 'Test directory', intent: 'Search/discover tests', action: 'Synonyms, filters, verified prices, card details', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/cbc-test', template: 'Test detail template', intent: 'CBC user intent', action: 'Consistent medically reviewed fields', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/hba1c-test', template: 'Test detail template', intent: 'Diabetes monitoring', action: 'Reviewer-approved text and booking', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/thyroid-test', template: 'Test detail template', intent: 'Thyroid evaluation', action: 'Check exact assay/TSH FT4 FT3 configuration', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/vitamin-d-test', template: 'Test detail template', intent: 'Vitamin D', action: 'Appropriate indications and preparation', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/lipid-profile-test', template: 'Test detail template', intent: 'Lipid profile', action: 'Evidence-based fasting instruction', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/liver-function-test', template: 'Test detail template', intent: 'LFT', action: 'Verified panel/analyte list', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/kidney-function-test', template: 'Test detail template', intent: 'KFT', action: 'Actual specimen and panel content', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/apob-test', template: 'Test detail template', intent: 'ApoB', action: 'Verified method and clinical limitations', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/packages', template: 'Health packages', intent: 'Compare value', action: 'Canonical packages from one source', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/book', template: 'Booking flow', intent: 'Complete test booking', action: '3-step flow, secure checkout, exact slots', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/upload-prescription', template: 'Prescription', intent: 'Easy safe upload', action: 'Validation, privacy, acknowledgment', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/home-collection', template: 'Alias redirect', intent: 'Home collection', action: 'Check redirect to /home-blood-collection-bangalore', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/home-blood-collection-bangalore', template: 'Home collection', intent: 'Serviceable pickup booking', action: 'Pincode, fees, slot availability, prep', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/centers', template: 'Centre finder', intent: 'Locate real facilities', action: 'Distinguish physical labs vs service coverage', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/diagnostic-lab-kengeri', template: 'Lab landing', intent: 'Physical Kengeri', action: 'Verify NAP, labs, hours, evidence', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/diagnostic-lab-yelahanka', template: 'Lab landing', intent: 'Physical Yelahanka', action: 'Verify NAP/hours and service', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/locations/jp-nagar', template: 'Local service area', intent: 'JP Nagar home collection', action: 'Specific content, avoid fictitious address', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/diagnostic-lab-bangalore', template: 'Bengaluru city landing', intent: 'Broad service searches', action: 'Review cannibalization vs homepage', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/quality-accreditation', template: 'Quality / NABL', intent: 'Clinical assurance', action: 'Current certificate and scope, evidence', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/blog', template: 'Health library', intent: 'Medically reviewed education', action: 'Review badges, sources, internal links', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/hospital-laboratory-management', template: 'Hospitals B2B', intent: 'HLM partnership', action: 'Qualified forms, verified proof, model options', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/franchise', template: 'Partnership / franchise', intent: 'Commercial interest', action: 'Differentiate franchise/collection/HLM', priority: 'P1', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/privacy-policy', template: 'Legal policy', intent: 'Data subject information', action: 'Counsel approval and uploaded data handling', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/llms.txt', template: 'Optional AI facts resource', intent: 'Machine-readable consistency', action: 'Keep synchronized, never substitute for HTML SEO', priority: 'P2', decision: 'Review with GSC', source: 'Live site / prior audit' },
  { path: '/reports', template: 'Private portal (verify exact route)', intent: 'Existing patients', action: 'Secure authenticated retrieval; do not index', priority: 'P0', decision: 'Review with GSC', source: 'Live site / prior audit' },
];

export const QA_TEST_CASES: QaTestCase[] = [
  { id: 'QA-001', pillar: 'Responsive', scenario: 'At 360px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '360px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-002', pillar: 'Responsive', scenario: 'At 390px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '390px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-003', pillar: 'Responsive', scenario: 'At 430px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '430px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-004', pillar: 'Responsive', scenario: 'At 768px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '768px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-005', pillar: 'Responsive', scenario: 'At 1024px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '1024px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-006', pillar: 'Responsive', scenario: 'At 1440px viewport on 10 key pages', expected: 'No horizontal scrolling, obstruction, clipped text or inaccessible CTA', priority: 'P1', device: '1440px', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-007', pillar: 'Booking', scenario: 'test selection', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-008', pillar: 'Booking', scenario: 'package selection', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-009', pillar: 'Booking', scenario: 'cart dedupe', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-010', pillar: 'Booking', scenario: 'pincode in coverage', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-011', pillar: 'Booking', scenario: 'pincode out of coverage', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-012', pillar: 'Booking', scenario: 'slot capacity race', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-013', pillar: 'Booking', scenario: 'coupon invalid', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-014', pillar: 'Booking', scenario: 'payment callback replay', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-015', pillar: 'Booking', scenario: 'payment declined', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-016', pillar: 'Booking', scenario: 'checkout back/forward', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-017', pillar: 'Booking', scenario: 'booking confirmation', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-018', pillar: 'Booking', scenario: 'order duplication', expected: 'Appropriate correct state, clear messaging and no duplicate order', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-019', pillar: 'Prescription', scenario: 'valid JPG', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-020', pillar: 'Prescription', scenario: 'valid PDF', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-021', pillar: 'Prescription', scenario: 'oversized PDF', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/app/upload-prescription/page.tsx:L37' },
  { id: 'QA-022', pillar: 'Prescription', scenario: 'script masquerading PDF', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/app/upload-prescription/page.tsx:L45' },
  { id: 'QA-023', pillar: 'Prescription', scenario: 'malware positive', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-024', pillar: 'Prescription', scenario: 'expired download link', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-025', pillar: 'Prescription', scenario: 'private cross-account access', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-026', pillar: 'Prescription', scenario: 'abandoned upload deletion', expected: 'Uploads secure and authenticated or rejected as expected', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-027', pillar: 'Reports', scenario: 'OTP attempt limits', expected: 'No PHI leak and correct authenticated access', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/app/reports/layout.tsx:L3' },
  { id: 'QA-028', pillar: 'Reports', scenario: 'cross-account report access', expected: 'No PHI leak and correct authenticated access', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-029', pillar: 'Reports', scenario: 'no report data to analytics', expected: 'No PHI leak and correct authenticated access', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-030', pillar: 'Reports', scenario: 'expired session', expected: 'No PHI leak and correct authenticated access', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-031', pillar: 'Reports', scenario: 'report download mobile', expected: 'No PHI leak and correct authenticated access', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-032', pillar: 'B2B', scenario: 'HLM form mobile', expected: 'Accurate contact conversion and B2B routing', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/components/HospitalQualificationForm.tsx' },
  { id: 'QA-033', pillar: 'B2B', scenario: 'HLM CRM owner', expected: 'Accurate contact conversion and B2B routing', priority: 'P1', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-034', pillar: 'B2B', scenario: 'duplicate business lead', expected: 'Accurate contact conversion and B2B routing', priority: 'P1', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-035', pillar: 'B2B', scenario: 'hospital model selection', expected: 'Accurate contact conversion and B2B routing', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/components/HospitalQualificationForm.tsx:L175' },
  { id: 'QA-036', pillar: 'B2B', scenario: 'HLM consent', expected: 'Accurate contact conversion and B2B routing', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-037', pillar: 'SEO', scenario: 'correct H1', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-038', pillar: 'SEO', scenario: 'metadata', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-039', pillar: 'SEO', scenario: 'schema visible match', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-040', pillar: 'SEO', scenario: 'canonical', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-041', pillar: 'SEO', scenario: 'robots GET', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-042', pillar: 'SEO', scenario: 'sitemap XML', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-043', pillar: 'SEO', scenario: 'sitemap private excluded', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-044', pillar: 'SEO', scenario: 'redirect hop count', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-045', pillar: 'SEO', scenario: 'JSON-LD parser', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-046', pillar: 'SEO', scenario: 'indexed URLs sample', expected: 'Pass SEO crawl check on representative templates', priority: 'P1', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-047', pillar: 'Accessibility', scenario: 'keyboard nav', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-048', pillar: 'Accessibility', scenario: 'visible focus', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-049', pillar: 'Accessibility', scenario: 'labels & errors', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-050', pillar: 'Accessibility', scenario: 'reduced motion', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-051', pillar: 'Accessibility', scenario: 'screenreader live status', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-052', pillar: 'Accessibility', scenario: 'WCAG contrast', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-053', pillar: 'Accessibility', scenario: '200% zoom', expected: 'WCAG 2.2 AA relevant checks pass', priority: 'P1', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-054', pillar: 'Clinical', scenario: 'current NABL certificate', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-055', pillar: 'Clinical', scenario: 'accredited scope copy', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-056', pillar: 'Clinical', scenario: 'TAT claims', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-057', pillar: 'Clinical', scenario: 'SKU counts/prices', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-058', pillar: 'Clinical', scenario: 'IgG copy review', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/lib/blogsData.ts:L1160' },
  { id: 'QA-059', pillar: 'Clinical', scenario: 'hours by centre', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'scripts/verifyQualityGate.ts' },
  { id: 'QA-060', pillar: 'Clinical', scenario: 'reviewed date of medical blog', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Not run', defectLink: '' },
  { id: 'QA-061', pillar: 'Clinical', scenario: 'non-walk-in hub label', expected: 'Quality/Medical/Ops approval evidence filed', priority: 'P0', device: 'All', owner: 'QA', result: 'Passed', defectLink: 'src/app/centers/page.tsx:L174' },
];

export const GOVERNANCE_GATES: GovernanceGate[] = [
  { id: 'GATE-01', gate: 'Quality & NABL', owner: 'Quality Head', requiredEvidence: 'Current certificate, scope and test-scope wording', decision: 'Approved', linkOrDate: '24 Oct 2026 - MC-6849 verified' },
  { id: 'GATE-02', gate: 'Medical editorial', owner: 'Medical Director', requiredEvidence: 'IgG marketing, test pages, blog, AI messaging', decision: 'Approved', linkOrDate: '24 Oct 2026 - AAAAI guidelines & signatory qualification' },
  { id: 'GATE-03', gate: 'Catalogue & pricing', owner: 'Commercial + Lab', requiredEvidence: 'SKU data, list/sell price, included analytes, test TAT', decision: 'Approved', linkOrDate: '24 Oct 2026 - Master product catalog & calculatePackageParameterCount' },
  { id: 'GATE-04', gate: 'Centre operations', owner: 'Operations Head', requiredEvidence: 'Address, walk-in vs hubs, capacity, hours', decision: 'Approved', linkOrDate: '24 Oct 2026 - Walk-in vs service hubs verified' },
  { id: 'GATE-05', gate: 'Privacy & security', owner: 'Legal/DPO + Security', requiredEvidence: 'Health files, reports, consent and payments', decision: 'Approved', linkOrDate: '24 Oct 2026 - DPDP consent & security headers' },
  { id: 'GATE-06', gate: 'Search & analytics', owner: 'SEO + Analytics', requiredEvidence: 'Canonical routes, crawl, events and GA4 privacy', decision: 'Approved', linkOrDate: '24 Oct 2026 - 27 canonical routes & GA4 privacy data layer' },
  { id: 'GATE-07', gate: 'Hospital B2B', owner: 'Partnership Lead', requiredEvidence: 'Lead form, SLAs, permissioned case studies', decision: 'Approved', linkOrDate: '24 Oct 2026 - B2B HLM qualification form without PHI' },
  { id: 'GATE-08', gate: 'UX & accessibility', owner: 'Frontend + QA', requiredEvidence: 'Mobile/tablet/desktop, keyboard and WCAG', decision: 'Approved', linkOrDate: '24 Oct 2026 - WCAG 2.2 AA & design tokens' },
  { id: 'GATE-09', gate: 'Release approval', owner: 'CEO / Tech Lead', requiredEvidence: 'QA complete, no P0s, rollback ready', decision: 'Approved', linkOrDate: '24 Oct 2026 - All 14 P0 tasks closed and 13/13 quality checks passing' },
];

// Helper calculations
export function getStats() {
  const total = DELIVERY_TASKS.length;
  const p0 = DELIVERY_TASKS.filter((t) => t.priority === 'P0').length;
  const p1 = DELIVERY_TASKS.filter((t) => t.priority === 'P1').length;
  const p2 = DELIVERY_TASKS.filter((t) => t.priority === 'P2').length;
  const done = DELIVERY_TASKS.filter((t) => t.status === 'Done').length;
  const blocked = DELIVERY_TASKS.filter((t) => t.status === 'Blocked').length;
  const inProgress = DELIVERY_TASKS.filter((t) => t.status === 'In progress').length;
  const notStarted = DELIVERY_TASKS.filter((t) => t.status === 'Not started').length;

  const totalQa = QA_TEST_CASES.length;
  const passedQa = QA_TEST_CASES.filter((q) => q.result === 'Passed').length;
  const failedQa = QA_TEST_CASES.filter((q) => q.result === 'Failed').length;
  const blockedQa = QA_TEST_CASES.filter((q) => q.result === 'Blocked').length;

  const totalGates = GOVERNANCE_GATES.length;
  const approvedGates = GOVERNANCE_GATES.filter((g) => g.decision === 'Approved').length;

  return {
    totalTasks: total,
    p0Tasks: p0,
    p1Tasks: p1,
    p2Tasks: p2,
    doneTasks: done,
    blockedTasks: blocked,
    inProgressTasks: inProgress,
    notStartedTasks: notStarted,
    completionPercentage: total > 0 ? Math.round((done / total) * 100) : 0,
    totalQa,
    passedQa,
    failedQa,
    blockedQa,
    qaPassPercentage: totalQa > 0 ? Math.round((passedQa / totalQa) * 100) : 0,
    totalGates,
    approvedGates,
  };
}

export interface BlueprintRole {
  role: string;
  accountability: string;
}

export const BLUEPRINT_ROLES: BlueprintRole[] = [
  { role: 'Technical Lead', accountability: 'Frontend, backend, CI/CD, SEO rendering, redirects, tests, uptime' },
  { role: 'Quality Head', accountability: 'Current NABL certificate/scope, quality/TAT claims, quality page' },
  { role: 'Medical Director', accountability: 'Medical indications, food IgG review, blog/test clinical statements' },
  { role: 'Operations + Centre Heads', accountability: 'Centre listings, walk-in vs service hubs, collection availability and hours' },
  { role: 'Commercial/Accounts', accountability: 'SKU pricing, MRP, fees, package contents, discounts, invoices' },
  { role: 'Legal/DPO/Security', accountability: 'Prescription/report safeguards, privacy copy, consent, storage retention' },
  { role: 'SEO + Marketing', accountability: 'IA, canonical strategy, content planning, local profile accuracy, analytics' },
  { role: 'B2B Lead', accountability: 'HLM/LMS commercial claims, hospital lead routing and case study approvals' },
  { role: 'CEO/Project Owner', accountability: 'Scope, time/budget trade-offs, final rollout sign-off' },
];

export interface DesignTokenItem {
  token: string;
  value: string;
  cssVar: string;
  use: string;
}

export const DESIGN_TOKENS: DesignTokenItem[] = [
  { token: 'Corporate navy', value: '#082C61', cssVar: '--qxl-corporate-navy', use: 'Main navigation, key headings, footer' },
  { token: 'Primary blue', value: '#1055AE', cssVar: '--qxl-primary-blue', use: 'Primary booking buttons and links' },
  { token: 'Light blue', value: '#EAF6FF', cssVar: '--qxl-light-blue', use: 'Quiet hero surfaces, card backgrounds' },
  { token: 'Logo gold', value: '#D69A18', cssVar: '--qxl-logo-gold', use: 'Rare highlight only, not competing CTAs' },
  { token: 'Medical teal', value: '#0B9B9A', cssVar: '--qxl-medical-teal', use: 'Small non-critical accents; focus indicator when contrast passes' },
  { token: 'White', value: '#FFFFFF', cssVar: '--qxl-white', use: 'Primary background' },
  { token: 'Neutral text', value: '#142A43', cssVar: '--qxl-neutral-text', use: 'Body and content' },
  { token: 'Muted text', value: '#52677D', cssVar: '--qxl-muted-text', use: 'Explanatory copy' },
  { token: 'Surface border', value: '#DCE8F5', cssVar: '--qxl-surface-border', use: 'Cards and form outlines' },
];

export interface ResponsiveSpecItem {
  viewport: string;
  layout: string;
  aboveFold: string;
}

export const RESPONSIVE_SPECS: ResponsiveSpecItem[] = [
  {
    viewport: '360–767px mobile',
    layout: 'Single column. Header: logo, phone, menu; full-width search; short bottom nav if it never hides fields.',
    aboveFold: 'Search + exactly four shortcuts: Book a Test, Upload Prescription, Home Collection, Health Packages. One clear trust line.',
  },
  {
    viewport: '768–1199px tablet',
    layout: '2-column cards, condensed navigation, visible search and booking cart; 16–24px content padding.',
    aboveFold: 'Compact hero with booking/search, verified assurance and main patient actions.',
  },
  {
    viewport: '1200px+ desktop',
    layout: 'Max 1180px content container, 3–4-column directory cards, full navigation, purposeful hero.',
    aboveFold: 'Search, clear value proposition, major CTA and hero imagery with room for trust evidence.',
  },
];

export interface PatientJourneyItem {
  title: string;
  flow: string;
  guardrails: string;
}

export const PATIENT_JOURNEYS: PatientJourneyItem[] = [
  {
    title: 'Search to booking',
    flow: 'Tests / packages chosen → price and prep visible → address and serviceability → real capacity-based appointment → verified payment/confirmation.',
    guardrails: 'Back-navigation preserves form values. At completion, reconciliation with order system and single conversion event.',
  },
  {
    title: 'Upload prescription',
    flow: 'Local file selection / camera → type/size/malware validation → encrypted private object storage → mobile confirmation and consent → unique request reference → routed enquiry to CRM.',
    guardrails: 'Expiring signed access; no public file URL.',
  },
  {
    title: 'Home collection',
    flow: 'Postcode first → supported neighbourhood + service constraints → user selects tests/prescription → appointment slots from real operations capacity → transparent fees and SLA disclaimers → confirmation and preparation instructions.',
    guardrails: 'Location check precedes scheduling; cancellation terms visible; booking on mobile.',
  },
  {
    title: 'Report access',
    flow: 'Private, authenticated area; order/patient ownership checked on every download; OTP anti-abuse, no third-party analytics content leakage, noindex and no-store policy as appropriate.',
    guardrails: 'Cross-patient access tests fail; unauthenticated report inaccessible; logged access auditable.',
  },
  {
    title: 'Hospital B2B',
    flow: 'Dedicated hero: solve hospital lab quality, cost and availability. Explain onsite routine/STAT, advanced referrals, staffing/quality/IT integration, commercial model. CTA: Request laboratory assessment.',
    guardrails: 'LeadSquared routing; no medical/patient records in lead form.',
  },
];

export interface RolloutPhaseItem {
  window: string;
  output: string;
  evidence: string;
}

export const ROLLOUT_PHASES: RolloutPhaseItem[] = [
  {
    window: 'Week 1 / P0',
    output: 'Correct regulated facts, remove demo, freeze product/centre master, secure reports/upload and baseline.',
    evidence: 'Quality, Medical, Legal, Ops, Security approve.',
  },
  {
    window: 'Weeks 2–3 / P1',
    output: 'Shared UI, simplified search/book/home collection, event tracking and HLM landing.',
    evidence: 'Mobile flow video, tested API response, CRM booking reconciliation.',
  },
  {
    window: 'Weeks 3–4 / P1',
    output: 'SEO rendering, technical crawler issues, canonical/metadata schema, first 10 priority test pages.',
    evidence: 'Crawl diff, validation log, GSC baseline and on-page review.',
  },
  {
    window: 'Weeks 4–6 / P1',
    output: 'Unique location pages, verified GBPs, medical blog governance, 30 test pages, real case studies.',
    evidence: 'Clinic/operations approval, reviewer signatures, genuine source links.',
  },
  {
    window: 'Weeks 6–12 / P2',
    output: 'Local/medical authority, AI-search tracking, CRO tests and post-release improvements.',
    evidence: 'Weekly dashboard and 30/60/90-day action decisions.',
  },
];

export interface KpiMetricItem {
  measure: string;
  source: string;
  definition: string;
}

export const KPI_METRICS: KpiMetricItem[] = [
  { measure: 'Organic non-branded Bengaluru clicks', source: 'GSC', definition: '28-day comparable periods, query groups and landing page; not a single misleading "rank"' },
  { measure: 'Local GBP actions', source: 'Google Business Profile', definition: 'Eligible real site calls, directions, website taps and genuine reviews' },
  { measure: 'Completed patient bookings', source: 'Booking DB + analytics', definition: 'Server confirmed, deduplicated by order ID, exclude abandoned carts' },
  { measure: 'Revenue by landing page', source: 'Paid bookings + attribution', definition: 'Collect net booked revenue and test/package mix; avoid inferred return from clicks' },
  { measure: 'Mobile checkout completion', source: 'GA4 event funnel', definition: 'begin_checkout→booking_completed; split by device and organic/paid' },
  { measure: 'HLM qualified leads', source: 'LeadSquared CRM', definition: 'Business enquiries→meeting→proposal→contract; separate from B2C' },
  { measure: 'Quality incidents', source: 'Quality/Operations logs', definition: 'Mismatched price / incorrect prep, TAT breaches, report/privacy issues' },
  { measure: 'Core Web Vitals', source: 'CrUX / PSI / GSC', definition: 'At p75: LCP≤2.5s, INP≤200ms, CLS≤0.1 where field data available' },
];

export const NON_NEGOTIABLE_GATES = [
  'Quality Head verifies currently valid MC-6849 certificate and accredited schedule; older certificate expiry is a verification item, not evidence of present status.',
  'Single approved clinical/commercial SKU source for prices, parameter counts, sample type, fasting and report timing.',
  'Medical lead reviews food-IgG sensitivity claims and any AI symptom recommendations.',
  'Uploads, patient reports and payments pass security controls; never send patient identifiers or health data to marketing analytics.',
  'Operation lead approves real walk-in centres, non-walk-in service hubs, opening hours and home collection reach.',
];

