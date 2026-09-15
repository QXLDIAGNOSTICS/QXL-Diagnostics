import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const B2B_PAGES = [
  '/super-speciality-reference-lab-bengaluru',
  '/b2b-reference-lab',
  '/b2b-reference-laboratory-bengaluru',
  '/hospital-services',
  '/hospital-laboratory-management',
  '/for-doctors',
  '/for-hospitals',
  '/doctor-partnership',
  '/franchise',
  '/corporate',
  '/corporate-health-packages',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const urlsXml = B2B_PAGES.map(
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
