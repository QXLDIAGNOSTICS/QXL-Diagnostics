import { SITE_CONTENT_DATETIME } from "@/lib/dateUtils";
import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/businessInfo';

export async function GET() {
  const lastmod = new Date(SITE_CONTENT_DATETIME).toISOString();

  // Blog posts and the /blog index are listed in sitemap-blogs.xml only (no cross-sitemap duplicates).

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/knowledge-centre</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${SITE_URL}/insights</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${SITE_URL}/for-doctors</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
