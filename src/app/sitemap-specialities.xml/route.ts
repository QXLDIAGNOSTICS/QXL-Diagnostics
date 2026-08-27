import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/businessInfo';

const SPECIALITIES = [
  'neurology',
  'hematology',
  'cardiology',
  'urology',
  'endocrinology',
  'oncology',
  'infectious-diseases',
  'womens-health',
  'gastroenterology',
  'bone-disorders',
];

export async function GET() {
  const urls = SPECIALITIES.map(s => `
    <url>
      <loc>${SITE_URL}/specialities/${s}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/specialities</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
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
