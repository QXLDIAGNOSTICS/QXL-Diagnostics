import { NextResponse } from 'next/server';

const BASE_URL = 'https://qxldiagnostics.com';

const HEALTH_PAGES = [
  '/health/symptoms-causes',
  '/health/headache-causes',
  '/health/fever-causes',
  '/health/cough-causes',
  '/health/fatigue-tiredness',
  '/health/dizziness-causes',
  '/health/hair-loss-causes',
  '/health/unexplained-weight-loss',
  '/health/chest-pain-causes',
  '/health/shortness-of-breath-causes',
  '/health/stomach-abdominal-pain-causes',
  '/health/nausea-vomiting-causes',
  '/health/diarrhoea-loose-motion-causes',
  '/health/joint-pain-causes',
  '/health/body-pain-muscle-aches-causes',
  '/health/swelling-feet-ankles-face-causes',
  '/health/frequent-urination-excessive-thirst-causes',
  '/health/numbness-tingling-causes',
  '/health/skin-rash-itching-causes',
  '/health/recurrent-infections-causes',
  '/health/bloating-after-eating-food-sensitivity',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const urlsXml = HEALTH_PAGES.map(
    (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/health/symptoms-causes' ? '0.95' : '0.9'}</priority>
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
