import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/businessInfo';

const DOCTORS = [
  'dr-shantakumar-muruda',
  'dr-pritilata-rout',
  'dr-ajitha-pillai',
  'dr-naveen-kumar-n',
];

export async function GET() {
  const urls = DOCTORS.map(d => `
    <url>
      <loc>${SITE_URL}/${d}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/doctors</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
