import { NextResponse } from 'next';

const BASE_URL = 'https://qxldiagnostics.com';

const SPECIALITY_PAGES = [
  '/specialities',
  '/speciality-tests',
  '/specialities/neurology',
  '/specialities/hematology',
  '/specialities/cardiology',
  '/specialities/urology',
  '/specialities/endocrinology',
  '/specialities/oncology',
  '/specialities/infectious-diseases',
  '/specialities/womens-health',
  '/specialities/gastroenterology',
  '/specialities/bone-disorders',
  '/specialities/autoimmune-testing-bengaluru',
  '/specialities/allergy-testing-bengaluru',
  '/specialities/histopathology-bengaluru',
  '/specialities/molecular-diagnostics-bengaluru',
  '/specialities/flow-cytometry-bengaluru',
  '/specialities/genetic-testing-bengaluru',
  '/specialities/therapeutic-drug-monitoring',
  '/specialities/clinical-mass-spectrometry',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const urlsXml = SPECIALITY_PAGES.map(
    (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`
  ).join('\n');

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
