import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/businessInfo';
import { defaultBlogs } from '@/lib/blogsData';

export async function GET() {
  const lastmod = new Date().toISOString();

  const blogUrls = defaultBlogs.map(
    (b) => `  <url>
    <loc>${SITE_URL}/blog/${b.slug}</loc>
    <lastmod>${(b as any).created_at ? new Date((b as any).created_at).toISOString() : lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${b.slug === 'personalised-pregnancy-testing-bengaluru' ? '0.95' : '0.85'}</priority>
  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/knowledge-centre</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
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
${blogUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
