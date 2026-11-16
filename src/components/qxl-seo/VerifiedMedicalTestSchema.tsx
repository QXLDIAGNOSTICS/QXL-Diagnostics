/** Add to a VERIFIED individual test page only after matching the live LIS test master.
 * Do not emit price, accreditation scope, assay generation or turnaround claims unless verified.
 */
export type VerifiedMedicalTest = {
  name: string;
  slug: string; // e.g. /tests/chlamydia-gonorrhea-pcr (canonical live path)
  description: string;
};
export function VerifiedMedicalTestSchema({ test }: { test: VerifiedMedicalTest }) {
  if (!test.name || !test.description || !test.slug.startsWith('/')) return null;
  const origin = 'https://qxldiagnostics.com';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: test.name,
    description: test.description,
    url: origin + test.slug,
  };
  return <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
