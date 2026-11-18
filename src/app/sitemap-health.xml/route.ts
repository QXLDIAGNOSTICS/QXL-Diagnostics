import { NextResponse } from 'next/server';
import { getAllSexualHealthSlugs } from '@/lib/sexual-health/landingPagesData';

const BASE_URL = 'https://qxldiagnostics.com';

const GENERAL_HEALTH_PAGES = [
  '/health/symptoms-causes',
  '/health/headache-causes',
  '/health/fever-causes',
  '/health/cough-causes',
  '/health/fatigue-tiredness',
  '/health/dizziness-causes',
  '/health/hair-loss-causes',
  '/health/unexplained-weight-loss',
  '/health/chest-pain-causes',
  '/health/shortness-of-breath-causes',
  '/health/stomach-abdominal-pain-causes',
  '/health/nausea-vomiting-causes',
  '/health/diarrhoea-loose-motion-causes',
  '/health/joint-pain-causes',
  '/health/body-pain-muscle-aches-causes',
  '/health/swelling-feet-ankles-face-causes',
  '/health/frequent-urination-excessive-thirst-causes',
  '/health/numbness-tingling-causes',
  '/health/skin-rash-itching-causes',
  '/health/recurrent-infections-causes',
  '/health/bloating-after-eating-food-sensitivity',
  '/health/chronic-stress-fertility-blood-tests',
  '/health-hub/hiv-test-window-period',
  '/health-hub/after-unprotected-sex',
  '/health-hub/genital-sores-causes',
  '/sexual-health',
  '/sexual-health/packages',
  '/sexual-health/faq',
  '/sexual-health/symptoms',
  '/sexual-health/sti-testing-after-oral-sex',
  '/sexual-health/symptoms/private-part-itching',
  '/sexual-health/symptoms/burning-urination-after-sex',
  '/sexual-health/symptoms/watery-discharge-after-sex',
  '/sexual-health/symptoms/penile-discharge',
  '/sexual-health/symptoms/vaginal-discharge-odor',
  '/sexual-health/symptoms/genital-blisters',
  '/sexual-health/symptoms/genital-boils-bumps',
  '/sexual-health/symptoms/genital-ulcers-sores',
  '/sexual-health/symptoms/genital-rash-spots-marks',
  '/sexual-health/symptoms/pain-during-after-sex',
  '/sexual-health/symptoms/lower-abdominal-pelvic-pain',
  '/sexual-health/symptoms/testicular-pain-swelling',
  '/sexual-health/symptoms/mouth-throat-after-oral-sex',
  '/sexual-health/symptoms/anal-itching-discharge-pain',
  '/sexual-health/symptoms/bleeding-after-sex',
  '/sexual-health/symptoms/urine-frequency-after-sex',
  '/sexual-health/symptoms/genital-warts-skin-tags',
  '/sexual-health/symptoms/no-symptoms-after-unprotected-sex',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  // Deduplicate and combine general health pages with the 36 dedicated sexual health landing pages
  const dedicatedSlugs = getAllSexualHealthSlugs().map((slug) => `/sexual-health/${slug}`);
  const allUniquePages = Array.from(new Set([...GENERAL_HEALTH_PAGES, ...dedicatedSlugs]));

  const urlsXml = allUniquePages
    .map(
      (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/sexual-health' || path === '/health/symptoms-causes' ? '0.95' : '0.9'}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
