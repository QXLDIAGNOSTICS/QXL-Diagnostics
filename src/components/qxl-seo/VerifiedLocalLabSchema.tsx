/** Optional: use only once on the sexual-health hub, if no organization schema is already in its page layout.
 * Do NOT add reviewAggregate, ratings, physician claims, prices or test scope without verified live facts.
 */
export function VerifiedLocalLabSchema() {
  const base = 'https://qxldiagnostics.com';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'MedicalOrganization', '@id': base+'/#organization',
        name: 'QXL Diagnostics', url: base,
        telephone: '+91-9964639639',
        address: { '@type': 'PostalAddress', streetAddress: '3rd Floor, SLN Complex, Mysore Road, Fort Kengeri',
          addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560060', addressCountry: 'IN' } },
      { '@type': 'WebSite', '@id': base+'/#website', url: base, name: 'QXL Diagnostics',
        publisher: {'@id': base+'/#organization'} }
    ]
  };
  return <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
