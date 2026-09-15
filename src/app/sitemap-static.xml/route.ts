import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const STATIC_URLS = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/quality-accreditation', priority: '0.9', changefreq: 'monthly' },
  { path: '/home-blood-collection-bangalore', priority: '1.0', changefreq: 'weekly' },
  { path: '/home-collection', priority: '0.8', changefreq: 'monthly' },
  { path: '/home-sample-collection', priority: '0.8', changefreq: 'monthly' },
  { path: '/diagnostic-lab-bangalore', priority: '0.95', changefreq: 'monthly' },
  { path: '/pathology-lab-bangalore', priority: '0.95', changefreq: 'monthly' },
  { path: '/blood-test-bangalore', priority: '0.95', changefreq: 'monthly' },
  { path: '/doctor-led-diagnostics', priority: '0.95', changefreq: 'weekly' },
  { path: '/careers', priority: '0.5', changefreq: 'monthly' },
  { path: '/test-directory', priority: '0.8', changefreq: 'weekly' },
  { path: '/knowledge-centre', priority: '0.9', changefreq: 'daily' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/upload-prescription', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

export async function GET() {
  const lastmod = new Date().toISOString();
  const urlsXml = STATIC_URLS.map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
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
