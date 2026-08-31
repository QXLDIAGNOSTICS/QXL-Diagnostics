import { MetadataRoute } from 'next';
import { serverApi } from '@/lib/serverApi';
import { LOCATIONS } from '@/lib/businessInfo';
import { homeCollectionAreas } from '@/lib/locationsData';
import { cms100MasterData } from '@/lib/seoPages/cms100MasterData';

const BASE_URL = 'https://qxldiagnostics.com';

// Dynamic 100 test slugs directly from cms100MasterData
const TOP_100_SLUGS = Object.keys(cms100MasterData);

// SEO landing pages & High Priority Google Ads URLs
const SEO_PAGES: { url: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { url: "/raksha-bandhan-health-checkup-bangalore", priority: 0.95, changeFrequency: "daily" },
  { url: "/diagnostic-lab-bangalore", priority: 0.95, changeFrequency: "monthly" },
  { url: "/pathology-lab-bangalore", priority: 0.95, changeFrequency: "monthly" },
  { url: "/blood-test-bangalore", priority: 0.95, changeFrequency: "monthly" },
  { url: "/medical-laboratory-bangalore", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-centre-bangalore", priority: 0.9, changeFrequency: "monthly" },
  { url: "/lab-test-bangalore", priority: 0.9, changeFrequency: "monthly" },
  { url: "/home-blood-collection-bangalore", priority: 0.95, changeFrequency: "monthly" },
  { url: "/full-body-checkup-bangalore", priority: 0.95, changeFrequency: "monthly" },
  { url: "/full-body-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/executive-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/annual-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/comprehensive-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/senior-citizen-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diabetes-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/heart-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/womens-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/mens-health-checkup", priority: 0.9, changeFrequency: "monthly" },
  { url: "/locations/whitefield", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-electronic-city", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-koramangala", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-indiranagar", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-hsr-layout", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-marathahalli", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-kengeri", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-yelahanka", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-rr-nagar", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-nagarabhavi", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-vijayanagar", priority: 0.9, changeFrequency: "monthly" },
  { url: "/diagnostic-lab-manyata-tech-park", priority: 0.9, changeFrequency: "monthly" },
];

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [doctors, centers, blogPosts] = await Promise.all([
    serverApi.doctors.list(),
    serverApi.centers.list(),
    serverApi.blog.list(),
  ]);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quality-and-accreditation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/doctor-led-diagnostics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/home-blood-collection-bangalore`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/knowledge-centre`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/for-doctors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dr-shantakumar-muruda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dr-pritilata-rout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/dr-ajitha-pillai`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/dr-naveen-kumar-n`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/conditions/diabetes-testing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/conditions/thyroid-disorders`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/conditions/anaemia-testing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/test-directory`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/centers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...LOCATIONS.map((loc): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/locations/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    })),
    ...homeCollectionAreas.map((area): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/locations/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    })),
    ...centers
      .filter((c) => c.is_active)
      .map((c): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/centers/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })),
    {
      url: `${BASE_URL}/home-collection`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...SEO_PAGES.map((p): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}${p.url}`,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    {
      url: `${BASE_URL}/upload-prescription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/specialities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...SPECIALITIES.map((slug): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/specialities/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/doctors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...doctors
      .filter((d) => d.is_active)
      .map((d): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/doctors/${d.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogPosts.items
      .filter((p) => p.is_published)
      .map((p): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.created_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
    // ── Direct Top-Level 100 Priority Test Pages ───────────────────────────────
    ...TOP_100_SLUGS.map((slug): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    })),
    // ── B2B / Reference Laboratory Pages ────────────────────────────────────
    {
      url: `${BASE_URL}/super-speciality-reference-lab-bengaluru`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/b2b-reference-lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/hospital-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/doctor-partnership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quality-accreditation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/franchise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
