import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const PACKAGE_PAGES = [
  '/packages',
  '/full-body-checkup-bangalore',
  '/full-body-checkup',
  '/executive-health-checkup',
  '/annual-health-checkup',
  '/comprehensive-health-checkup',
  '/senior-citizen-health-checkup',
  '/diabetes-health-checkup',
  '/heart-health-checkup',
  '/womens-health-checkup',
  '/mens-health-checkup',
  '/corporate-health-packages',
  '/raksha-bandhan-health-checkup-bangalore',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const urlsXml = PACKAGE_PAGES.map(
    (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
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
