import Link from 'next/link';
import styles from './symptoms.module.css';
/** Add inside BOTH existing /sexual-health and /sexual-health/packages pages. */
export function SymptomHubCallout() {
  const shortcuts=[
    ['/sexual-health/symptoms/private-part-itching','Itching'],
    ['/sexual-health/symptoms/watery-discharge-after-sex','Watery discharge'],
    ['/sexual-health/symptoms/genital-blisters','Painful blisters'],
    ['/sexual-health/symptoms/genital-boils-bumps','Boils or bumps'],
    ['/sexual-health/symptoms/genital-ulcers-sores','Sores or ulcers'],
    ['/sexual-health/symptoms/burning-urination-after-sex','Burning urine']
  ];
  return <section className={styles.callout} aria-labelledby="symptoms-cta-heading">
    <p className={styles.eyebrow}>Understand symptoms before choosing a test</p>
    <h2 id="symptoms-cta-heading">Concerned about discomfort after sex?</h2>
    <p>Itching, watery leakage, blisters, sores, marks and pain can have many causes. Start with clear medical information and find out which tests may be appropriate.</p>
    <div className={styles.tags}>{shortcuts.map(([url,label])=><Link href={url} key={url}>{label}</Link>)}</div>
    <Link className={styles.primary} href="/sexual-health/symptoms">Explore the Symptom & Testing Guide →</Link>
  </section>
}
