import { MetadataRoute } from 'next';
import { MASTER_CATALOGUE } from '@/lib/masterCatalogue';
import { LOCATIONS } from '@/lib/businessInfo';

const SITE_URL = 'https://qxldiagnostics.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticRoutes = [
    '',
    '/about',
    '/team',
    '/doctors',
    '/dr-shantakumar-muruda',
    '/dr-pritilata-rout',
    '/dr-ajitha-pillai',
    '/dr-naveen-kumar-n',
    '/specialities',
    '/packages',
    '/centers',
    '/locations',
    '/quality-accreditation',
    '/home-blood-collection-bangalore',
    '/for-doctors',
    '/for-hospitals',
    '/hospital-laboratory-management',
    '/careers',
    '/privacy-policy',
    '/terms',
    '/book',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : route.startsWith('/specialities') || route === '/book' ? 0.9 : 0.8,
  }));

  // Specialities routes
  const specialityRoutes = [
    'cardiology',
    'endocrinology',
    'neurology',
    'oncology',
    'womens-health',
    'infectious-diseases',
    'gastroenterology',
    'hematology',
    'bone-disorders',
    'urology',
  ].map((spec) => ({
    url: `${SITE_URL}/specialities/${spec}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location pages from businessInfo
  const locationRoutes = LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // South Bengaluru area serviceability routes
  const areaRoutes = [
    'kengeri',
    'rr-nagar',
    'nagarabhavi',
    'banashankari',
    'uttarahalli',
    'jp-nagar',
    'jayanagar',
    'kanakapura-road',
    'isro-layout',
    'btm-layout',
    'whitefield',
    'indiranagar',
    'koramangala',
  ].map((area) => ({
    url: `${SITE_URL}/locations/${area}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Test SKUs from Master Catalogue (100+ tests)
  const testRoutes = MASTER_CATALOGUE.map((item) => {
    const slug = item.slug.startsWith('/') ? item.slug : `/${item.slug}`;
    return {
      url: `${SITE_URL}${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: item.popular ? 0.9 : 0.8,
    };
  });

  // Deduplicate URLs in case of any overlaps
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();
  [...staticRoutes, ...specialityRoutes, ...locationRoutes, ...areaRoutes, ...testRoutes].forEach((entry) => {
    urlMap.set(entry.url, entry);
  });

  return Array.from(urlMap.values());
}
