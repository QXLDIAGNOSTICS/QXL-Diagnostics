import { NextResponse } from 'next/server';
import { LOCATIONS } from '@/lib/businessInfo';
import { homeCollectionAreas } from '@/lib/locationsData';

const BASE_URL = 'https://qxldiagnostics.com';

const STATIC_LOCATIONS = [
  '/locations',
  '/centers',
  '/diagnostic-lab-kengeri',
  '/diagnostic-lab-yelahanka',
  '/diagnostic-lab-rr-nagar',
  '/diagnostic-lab-nagarabhavi',
  '/diagnostic-lab-vijayanagar',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const dynamicLocPaths = [
    ...LOCATIONS.map((loc) => `/locations/${loc.slug}`),
    ...homeCollectionAreas.map((area) => `/locations/${area.slug}`),
  ];

  const allLocationPaths = Array.from(new Set([...STATIC_LOCATIONS, ...dynamicLocPaths]));

  const urlsXml = allLocationPaths
    .map(
      (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
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
