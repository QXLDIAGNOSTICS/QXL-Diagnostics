import { NextResponse } from 'next/server';
import { serverApi } from '@/lib/serverApi';
import fallbackSpecialities from '@/data/specialitiesFallback.json';

const BASE_URL = 'https://qxldiagnostics.com';

// Landing pages that always exist; the per-speciality pages come from the CMS.
const STATIC_PAGES = ['/specialities', '/speciality-tests'];

export async function GET() {
  const lastmod = new Date().toISOString();
  const live = await serverApi.specialities.list();
  const specialities = live.length > 0 ? live : fallbackSpecialities;
  const pages = [...STATIC_PAGES, ...specialities.map((s) => `/specialities/${s.slug}`)];

  const urlsXml = pages.map(
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
