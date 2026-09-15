import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const CHILD_SITEMAPS = [
  'sitemap-static.xml',
  'sitemap-tests.xml',
  'sitemap-packages.xml',
  'sitemap-specialities.xml',
  'sitemap-health.xml',
  'sitemap-locations.xml',
  'sitemap-doctors.xml',
  'sitemap-b2b.xml',
];

export async function GET() {
  const lastmod = new Date().toISOString();
  const sitemapsXml = CHILD_SITEMAPS.map(
    (name) => `  <sitemap>
    <loc>${BASE_URL}/${name}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
