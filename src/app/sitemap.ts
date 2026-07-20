import { MetadataRoute } from 'next';
import { serverApi } from '@/lib/serverApi';

const BASE_URL = 'https://qxldiagnostics.com';

const now = new Date();

const staticPages: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/packages`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/cart`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/founder`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/specialities`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/tests`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  { url: `${BASE_URL}/doctors`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/home-collection`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/for-hospitals`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/hospital-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/corporate`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/corporate-health-packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/doctor-partnership`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/franchise`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/centers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/quality-accreditation`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/advanced-technologies`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/ai-powered-diagnostics`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/precision-medicine`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/health-conditions`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/health-risks`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/speciality-tests`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/upload-prescription`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/knowledge`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
];

const specialitySlugs = [
  'bone-disorders', 'cardiology', 'endocrinology', 'gastroenterology', 'hematology',
  'infectious-diseases', 'neurology', 'oncology', 'urology', 'womens-health',
];

const testSlugs = [
  'complete-blood-count', 'hba1c', 'vitamin-d', 'vitamin-b12', 'thyroid-profile',
  'lipid-profile', 'liver-function-test', 'kidney-function-test', 'blood-glucose-fasting',
  'urine-routine', 'ferritin', 'iron-studies', 'psa', 'hs-crp', 'ana-profile',
  'anti-ccp', 'rheumatoid-factor', 'dengue-ns1-antigen', 'covid-19-rtpcr',
  'hepatitis-b-surface-antigen', 'hepatitis-c-antibody', 'tsh', 't3-t4-tsh',
  'cortisol', 'testosterone', 'amh', 'prolactin', 'lh-fsh', 'insulin',
  'homocysteine', 'nt-probnp', 'troponin-i', 'ca-125', 'cea', 'afp', 'ca-19-9',
];

const diseaseSlugs = [
  'diabetes', 'thyroid-disorder', 'fatty-liver', 'pcos', 'hypertension',
  'heart-disease', 'kidney-disease', 'arthritis', 'autoimmune-diseases',
  'dengue', 'tuberculosis', 'hepatitis', 'vitamin-deficiency', 'anemia',
  'cancer-screening', 'infertility', 'allergy', 'fever-evaluation',
];

const locationSlugs = [
  'kengeri', 'yelahanka', 'mysore-road', 'rajarajeshwari-nagar', 'banashankari',
  'nagarabhavi', 'jp-nagar', 'bengaluru', 'whitefield', 'electronic-city',
  'jayanagar', 'koramangala',
];

const packageSlugs = [
  'quick-fit-package', 'q-screen-diabetes-package', 'q-master-health-pro-package',
  'q-oncoscreen-package', 'q-advanced-arthritis-and-autoimmune-panel',
  'q-hypertension-and-cardiovascular-risk-assessment-package',
];

const servicePages = [
  'home-collection', 'corporate-health-check', 'hospital-laboratory-management',
  'reference-laboratory', 'b2b-services', 'doctor-referral', 'franchise',
  'preventive-health', 'executive-health-check', 'ai-diagnostics',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [...staticPages];

  // Dynamic doctor pages
  try {
    const doctors = await serverApi.doctors.list();
    for (const doc of doctors) {
      if (doc.slug) {
        entries.push({
          url: `${BASE_URL}/doctors/${doc.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch {
    // Backend unavailable — continue with static entries
  }

  // Dynamic package pages from backend
  try {
    const backendUrl =
      process.env.BACKEND_INTERNAL_URL ||
      'https://qxl-diagnostics-production.up.railway.app';
    const res = await fetch(`${backendUrl}/api/v1/packages`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const packages = (await res.json()) as { slug: string }[];
      for (const pkg of packages) {
        if (pkg.slug && !packageSlugs.includes(pkg.slug)) {
          entries.push({
            url: `${BASE_URL}/packages/${pkg.slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.85,
          });
        }
      }
    }
  } catch {
    // Continue — static package slugs already listed
  }

  // Static speciality pages
  for (const slug of specialitySlugs) {
    entries.push({
      url: `${BASE_URL}/specialities/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // Static test pages
  for (const slug of testSlugs) {
    entries.push({
      url: `${BASE_URL}/tests/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // Static disease pages
  for (const slug of diseaseSlugs) {
    entries.push({
      url: `${BASE_URL}/health-conditions/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // Static location pages
  for (const slug of locationSlugs) {
    entries.push({
      url: `${BASE_URL}/centers/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Static package detail pages
  for (const slug of packageSlugs) {
    entries.push({
      url: `${BASE_URL}/packages/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // Service sub-pages
  for (const slug of servicePages) {
    entries.push({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
