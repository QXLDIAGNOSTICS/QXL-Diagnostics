import type { MetadataRoute } from 'next';

/** Merge this helper into the EXISTING app/sitemap.ts; never replace the entire sitemap. */
export function qxlSexualFaqSitemapEntries(): MetadataRoute.Sitemap {
  if (process.env.QXL_SEXUAL_FAQ_APPROVED === 'false') return [];
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://qxldiagnostics.com').replace(/\/$/, '');
  return [{ url: `${site}/sexual-health/faq`, lastModified: new Date('2026-11-09'), changeFrequency: 'monthly', priority: 0.7 }];
}
