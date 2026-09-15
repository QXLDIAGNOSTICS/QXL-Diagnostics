import { NextResponse } from 'next/server';
import { cms100MasterData } from '@/lib/seoPages/cms100MasterData';

const BASE_URL = 'https://qxldiagnostics.com';

const CORE_TEST_PAGES = [
  '/cbc-test-bangalore',
  '/hba1c-test-bangalore',
  '/thyroid-test-bangalore',
  '/vitamin-d-test-bangalore',
  '/vitamin-b12-test-bangalore',
  '/lipid-profile-test-bangalore',
  '/liver-function-test-bangalore',
  '/kidney-function-test-bangalore',
  '/fasting-blood-sugar-test-bangalore',
];

export async function GET() {
  const lastmod = new Date().toISOString();
  
  const cmsSlugs = Object.keys(cms100MasterData).map((slug) => `/${slug}`);
  const allTestPaths = Array.from(new Set([...CORE_TEST_PAGES, ...cmsSlugs]));

  const urlsXml = allTestPaths
    .map(
      (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
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
