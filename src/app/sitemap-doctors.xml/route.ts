import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const DOCTOR_PAGES = [
  '/doctors',
  '/team',
  '/dr-shantakumar-muruda',
  '/dr-pritilata-rout',
  '/dr-ajitha-pillai',
  '/dr-naveen-kumar-n',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const urlsXml = DOCTOR_PAGES.map(
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
