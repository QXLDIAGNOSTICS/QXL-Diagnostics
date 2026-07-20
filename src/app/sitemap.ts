import { MetadataRoute } from 'next';
import { serverApi } from '@/lib/serverApi';
import { LOCATIONS } from '@/lib/businessInfo';

const BASE_URL = 'https://qxldiagnostics.com';

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
      url: `${BASE_URL}/founder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tests`,
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
