import { NextResponse } from 'next/server';
import { SITE_URL, LOCATIONS } from '@/lib/businessInfo';
import { homeCollectionAreas } from '@/lib/locationsData';

export async function GET() {
  const locUrls = [
    ...LOCATIONS.map(l => `${SITE_URL}/locations/${l.slug}`),
    ...homeCollectionAreas.map(a => `${SITE_URL}/locations/${a.slug}`),
  ];

  const urls = locUrls.map(u => `
    <url>
      <loc>${u}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.85</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
