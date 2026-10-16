import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/businessInfo';

const BLOG_SLUGS = [
  'apob-vs-ldl-c-atherogenic-cardiovascular-risk-guide',
  'your-liver-works-in-silence-simple-blood-test',
  'advances-in-clinical-diagnostics-2026-molecular-pcr-immunoassays',
  'food-specific-igg-287-foods-sensitivity-elimination-guide',
  'cardiac-biomarkers-hs-troponin-hscrp-nt-probnp-guide',
  'speciality-kidney-liver-function-egfr-cystatin-c-lft-guide',
  'allergy-ige-vs-food-intolerance-clinical-diagnostics-guide',
  'doctor-led-nabl-iso-15189-2022-diagnostics-bengaluru-quality',
  'qxl-yelahanka-north-hub-express-pathology-home-collection',
  'preventive-full-body-health-checkup-guide-2026-packages-comparison',
  'seamless-doorstep-blood-test-booking-bengaluru-razorpay',
  'nabl-diagnostic-centers-kengeri-yelahanka-full-body-checkups',
  'autoimmune-diagnostics-ana-ifa-immunofluorescence-gold-standard',
  'rapid-molecular-pcr-diagnostic-testing-bengaluru-pathogen-identification',
  'thyroid-dysfunction-vitamin-d-deficiency-twin-epidemics',
  'hba1c-vs-fasting-blood-sugar-dual-testing-diabetes',
  'hospital-laboratory-management-transforming-models',
  'understanding-19-key-health-symptoms-blood-screening',
  'nabl-iso-15189-2022-accreditation-sample-precision',
  'selecting-right-full-body-health-package',
  'free-doorstep-home-sample-collection-bengaluru',
  'blood-test-fasting-guidelines-bangalore',
  'understanding-amh-fertility-testing',
  'allergy-testing-identifying-triggers',
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const blogUrls = BLOG_SLUGS.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
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
