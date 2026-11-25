/**
 * Paths that must never appear in XML sitemaps because they redirect to another
 * canonical URL (next.config.ts / proxy) or have no rendered page (404).
 * Found by crawling every sitemap entry against a production build (25 Nov 2026).
 * Re-run the crawl after adding routes or redirects and keep this list current.
 */
export const NON_CANONICAL_SITEMAP_PATHS = new Set<string>([
  // Redirect to a canonical equivalent
  "/cbc-test", // -> /cbc-test-bangalore
  "/hba1c-test", // -> /hba1c-test-bangalore
  "/home-collection", // -> /home-blood-collection-bangalore
  "/b2b-reference-lab", // -> /for-hospitals
  "/apob-test-bangalore", // -> /apob-test
  // No page renders (404)
  "/ferritin",
  "/hbsag",
  "/annual-health-checkup",
  "/comprehensive-health-checkup",
  "/executive-health-checkup",
  "/senior-citizen-health-checkup",
  "/diabetes-health-checkup",
  "/heart-health-checkup",
  "/womens-health-checkup",
  "/mens-health-checkup",
  "/super-speciality-reference-lab-bengaluru",
  "/b2b-reference-laboratory-bengaluru",
]);

export function isSitemapEligible(path: string): boolean {
  return !NON_CANONICAL_SITEMAP_PATHS.has(path);
}
