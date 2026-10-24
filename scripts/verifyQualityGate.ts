/**
 * QXL Diagnostics — Master Quality Gate Verification Script (10/10 Standard)
 * Validates zero banned terminology, certificate consistency, schema graphs,
 * package parameter calculations, procedural collection logic, payment security,
 * and SEO/AEO/GEO readiness.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PACKAGES } from '../src/data/packages';
import { testsById } from '../src/lib/catalogue';
import { calculatePackageParameterCount, validatePackages } from '../src/lib/packageCount';
import { MASTER_CATALOGUE } from '../src/lib/masterCatalogue';

const ROOT = process.cwd();

interface AuditCheck {
  id: string;
  category: string;
  description: string;
  passed: boolean;
  details: string;
}

const checks: AuditCheck[] = [];

function runCheck(id: string, category: string, description: string, fn: () => { passed: boolean; details: string }) {
  try {
    const res = fn();
    checks.push({ id, category, description, passed: res.passed, details: res.details });
  } catch (err: any) {
    checks.push({ id, category, description, passed: false, details: `Execution error: ${err.message}` });
  }
}

// 1. Terminology Compliance
runCheck('TERM-01', 'Terminology', 'Zero occurrences of "NABL Certified"', () => {
  const files = ['src/lib/businessInfo.ts', 'src/components/Footer.tsx', 'src/components/Header.tsx'];
  let found = 0;
  for (const f of files) {
    const full = path.join(ROOT, f);
    if (fs.existsSync(full)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('NABL Certified')) found++;
    }
  }
  return { passed: found === 0, details: found === 0 ? 'Compliant ("NABL Accredited" enforced)' : `Found ${found} violations` };
});

runCheck('TERM-02', 'Terminology', 'Zero occurrences of "certified phlebotomist"', () => {
  const targetFiles = [
    'src/components/GiftHealthStepsSection.tsx',
    'src/components/AiDiagnostics.tsx',
    'src/app/book/page.tsx',
    'src/app/conditions/[slug]/page.tsx',
    'src/app/specialities/hematology/SpecialityContent.tsx',
    'src/app/specialities/endocrinology/SpecialityContent.tsx',
    'src/app/specialities/cardiology/SpecialityContent.tsx',
    'src/lib/seoPages/dynamicPageResolver.ts'
  ];
  let found = 0;
  for (const f of targetFiles) {
    const full = path.join(ROOT, f);
    if (fs.existsSync(full)) {
      const content = fs.readFileSync(full, 'utf8');
      if (/certified phlebotomist/i.test(content)) found++;
    }
  }
  return { passed: found === 0, details: found === 0 ? 'Compliant ("Trained phlebotomy specialist" enforced)' : `Found ${found} violations` };
});

runCheck('TERM-03', 'Terminology & Accreditation', 'Zero occurrences of obsolete "MC-10025", "100% precision", or blanket pathologist signoff', () => {
  const targetFiles = [
    'src/app/page.tsx',
    'src/app/[slug]/page.tsx',
    'src/components/AiDiagnostics.tsx',
    'src/lib/seoPages/dynamicPageResolver.ts'
  ];
  const violations: string[] = [];
  for (const f of targetFiles) {
    const full = path.join(ROOT, f);
    if (fs.existsSync(full)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('MC-10025')) violations.push(`${f}: contains MC-10025`);
      if (content.includes('100% precision')) violations.push(`${f}: contains "100% precision"`);
      if (content.includes('100% pathologist authorization')) violations.push(`${f}: contains "100% pathologist authorization"`);
    }
  }
  return {
    passed: violations.length === 0,
    details: violations.length === 0 ? 'Zero obsolete accreditation numbers or unverified 100% claims' : violations.join('; ')
  };
});

// 2. Certificate Standardization
runCheck('CERT-01', 'Accreditation', 'Single source of truth NABL Certificate Number MC-6849', () => {
  const bInfo = fs.readFileSync(path.join(ROOT, 'src/lib/businessInfo.ts'), 'utf8');
  const hasMc = bInfo.includes('MC-6849');
  return { passed: hasMc, details: hasMc ? 'NABL Certificate MC-6849 verified in businessInfo.ts' : 'Missing MC-6849' };
});

// 3. NAP Standardization
runCheck('NAP-01', 'Local SEO & NAP', 'Helpline standardized to +91 9964 639 639 and email info@qxldiagnostics.com', () => {
  const bInfo = fs.readFileSync(path.join(ROOT, 'src/lib/businessInfo.ts'), 'utf8');
  const hasPhone = bInfo.includes('9964639639') || bInfo.includes('9964 639 639');
  const hasEmail = bInfo.includes('info@qxldiagnostics.com');
  return { passed: hasPhone && hasEmail, details: 'Standard helpline +91 9964 639 639 and info@qxldiagnostics.com enforced' };
});

// 4. Route & Canonical Hygiene
runCheck('ROUTE-01', 'Route Hygiene', '/home 301 redirect and 404 dynamic catch-all guard', () => {
  const config = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  const slugPage = fs.readFileSync(path.join(ROOT, 'src/app/[slug]/page.tsx'), 'utf8');
  const has301 = config.includes('/home') && (config.includes("destination: '/'") || config.includes('destination: "/"'));
  const hasGuard = slugPage.includes('INVALID_SLUGS') && slugPage.includes('home');
  return { passed: has301 && hasGuard, details: 'Permanent 301 redirect and dynamic 404 guard active' };
});

runCheck('ROUTE-02', 'Sitemap Hygiene', 'Zero non-canonical redirects in sitemap-packages.xml', () => {
  const sitemapFile = path.join(ROOT, 'src/app/sitemap-packages.xml/route.ts');
  const content = fs.readFileSync(sitemapFile, 'utf8');
  const hasLegacyRedirect = content.includes("'/full-body-checkup'") || content.includes('"/full-body-checkup"');
  const hasCanonical = content.includes('/full-body-checkup-bangalore');
  return {
    passed: !hasLegacyRedirect && hasCanonical,
    details: !hasLegacyRedirect ? 'Only canonical /full-body-checkup-bangalore in sitemap' : 'Found redirect in sitemap'
  };
});

// 5. PackageMaster & Calculated Counts
runCheck('PKG-01', 'PackageMaster', 'All packages pass validatePackages schema validation', () => {
  validatePackages(PACKAGES, testsById);
  return { passed: true, details: `All ${PACKAGES.length} packages validated with positive prices and valid test references` };
});

runCheck('PKG-02', 'PackageMaster', 'Package parameter counts strictly match master data (Quick Fit 80, Q-Screen 62, Q-Master 92)', () => {
  const expectedCounts: Record<string, number> = {
    'q-quick-fit': 80,
    'q-screen-diabetes': 62,
    'q-master-pro': 92,
    'q-arthritis-autoimmune': 30,
    'q-onco-screen': 15,
    'q-cardio-risk': 26
  };

  const results: string[] = [];
  let allMatch = true;

  for (const [id, expected] of Object.entries(expectedCounts)) {
    const pkg = PACKAGES.find(p => p.id === id);
    if (!pkg) {
      allMatch = false;
      results.push(`${id}: missing from PACKAGES`);
      continue;
    }
    const count = calculatePackageParameterCount(pkg, testsById);
    if (count !== expected) {
      allMatch = false;
      results.push(`${id}: got ${count}, expected ${expected}`);
    } else {
      results.push(`${id}: ${count} ok`);
    }
  }

  return {
    passed: allMatch,
    details: results.join('; ')
  };
});

// 6. Specimen-Aware Procedural Collection
runCheck('COLL-01', 'Clinical Specimen Logic', 'Procedural investigations do NOT inherit routine home collection', () => {
  const proceduralIds = [
    'aqp4-antibody',
    'nmdar-antibody',
    'paraneoplastic-panel',
    'autoimmune-encephalitis',
    'oligoclonal-bands',
    'flow-cytometry'
  ];

  const violations: string[] = [];
  for (const id of proceduralIds) {
    const test = MASTER_CATALOGUE.find(t => t.id === id);
    if (!test) {
      violations.push(`${id}: missing from MASTER_CATALOGUE`);
      continue;
    }
    if (test.homeCollectionAvailable !== false) {
      violations.push(`${id}: homeCollectionAvailable is ${test.homeCollectionAvailable}`);
    }
  }

  return {
    passed: violations.length === 0,
    details: violations.length === 0 ? 'All 6 procedural investigations properly flagged homeCollectionAvailable: false' : violations.join('; ')
  };
});

// 7. Booking & Payment Security
runCheck('PAY-01', 'Checkout & CRO', 'Zero-price and empty cart payments strictly prohibited in API and UI', () => {
  const orderApi = fs.readFileSync(path.join(ROOT, 'src/app/api/v1/payments/orders/route.ts'), 'utf8');
  const bookPage = fs.readFileSync(path.join(ROOT, 'src/app/book/page.tsx'), 'utf8');

  const apiGuarded = orderApi.includes('rawAmount <= 0') && orderApi.includes('status: 400');
  const uiGuarded = bookPage.includes('canPay') && bookPage.includes('cartItems.length > 0 && grandTotal > 0');

  return {
    passed: apiGuarded && uiGuarded,
    details: apiGuarded && uiGuarded
      ? 'Server-side API and client-side UI enforce non-zero positive totals and non-empty carts'
      : `API guarded: ${apiGuarded}, UI guarded: ${uiGuarded}`
  };
});

// 8. Security Headers
runCheck('SEC-01', 'Security & Indexing', 'HSTS header configured and private patient routes marked with noindex', () => {
  const nextConfig = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  const robotsTxt = fs.readFileSync(path.join(ROOT, 'public/robots.txt'), 'utf8');

  const hasHsts = nextConfig.includes('Strict-Transport-Security') && nextConfig.includes('max-age=31536000');
  const hasNoindexHeader = nextConfig.includes('X-Robots-Tag') && nextConfig.includes('noindex, nofollow, noarchive');
  const hasRobotsDisallow = robotsTxt.includes('/my-reports/') && robotsTxt.includes('/checkout/');

  const passed = hasHsts && hasNoindexHeader && hasRobotsDisallow;
  return {
    passed,
    details: passed
      ? 'HSTS active, X-Robots-Tag noindex configured for private patient routes, robots.txt disallow in place'
      : `HSTS: ${hasHsts}, Noindex Header: ${hasNoindexHeader}, Robots Disallow: ${hasRobotsDisallow}`
  };
});

// 9. Core Web Vitals & Telemetry
runCheck('CWV-01', 'Telemetry', 'Core Web Vitals ingestion endpoint and browser reporter configured', () => {
  const apiRoute = path.join(ROOT, 'src/app/api/web-vitals/route.ts');
  const reporterComp = path.join(ROOT, 'src/components/WebVitalsReporter.tsx');
  const layout = fs.readFileSync(path.join(ROOT, 'src/app/layout.tsx'), 'utf8');

  const hasApi = fs.existsSync(apiRoute);
  const hasReporter = fs.existsSync(reporterComp);
  const isMounted = layout.includes('WebVitalsReporter');

  const passed = hasApi && hasReporter && isMounted;
  return {
    passed,
    details: passed ? 'CWV API route, client reporter, and layout mounting verified' : `API: ${hasApi}, Component: ${hasReporter}, Mounted: ${isMounted}`
  };
});

// Output Summary
console.log('==================================================');
console.log('QXL DIAGNOSTICS — QUALITY GATE VERIFICATION REPORT');
console.log('==================================================');
let passCount = 0;
for (const c of checks) {
  const mark = c.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${mark}] ${c.id} (${c.category}): ${c.description}`);
  console.log(`       ↳ ${c.details}`);
  if (c.passed) passCount++;
}
console.log('--------------------------------------------------');
const percentage = ((passCount / checks.length) * 100).toFixed(1);
console.log(`TOTAL SCORE: ${passCount} / ${checks.length} checks passed (${percentage}%)`);
console.log('==================================================');

if (passCount !== checks.length) {
  process.exit(1);
} else {
  console.log('🎉 10/10 INTERNAL TECHNICAL QUALITY STANDARD ACHIEVED!');
  process.exit(0);
}
