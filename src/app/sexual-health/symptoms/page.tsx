import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {SymptomSearch} from '@/components/qxl-symptoms/SymptomSearch';
import {symptomPages,siteOrigin,packageDirectoryPath} from '@/lib/qxl-symptoms/data';
import styles from '@/components/qxl-symptoms/symptoms.module.css';
const reviewed = process.env.QXL_SYMPTOM_CONTENT_APPROVED !== 'false';
const preview=process.env.NODE_ENV !== 'production';
export const metadata: Metadata={
 title:'Private Part Itching, Burning, Discharge & Sores | QXL Bengaluru',
 description:'Understand genital itching, watery discharge, blisters, boils, painful urination and discomfort after sex. Find clinician-guided STI testing in Bengaluru.',
 alternates:{canonical:`${siteOrigin}/sexual-health/symptoms`},
 robots:{index:reviewed,follow:reviewed},
 openGraph:{title:'Sexual Health Symptoms and STI Tests | QXL Diagnostics',url:`${siteOrigin}/sexual-health/symptoms`,type:'website'}
};
export default function Page(){
 if(!reviewed&&!preview) notFound();
 return <main className={styles.main}>
 <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link> / <Link href="/sexual-health">Sexual Health</Link> / Symptoms</nav>
 <header className={styles.hero}><p className={styles.eyebrow}>Bengaluru · Patient education</p>
 <h1>Private-Part Discomfort, Discharge, Sores and Pain After Sex</h1>
 <p className={styles.lead}>Find clear, medically grounded information about genital itching, burning, watery leakage, blisters, boils, rashes, discharge and other concerns. Not every symptom is an STI.</p>
 <p className={styles.bodyText}>Select a symptom to understand possible causes, signs that require urgent care and tests a clinician may consider. A laboratory test is only one part of diagnosis.</p>
 <div className={styles.actions}><Link className={styles.primary} href={packageDirectoryPath}>View QXL STI Packages</Link><a className={styles.secondary} href="tel:+919964639639">Speak to QXL</a></div></header>
 <aside className={styles.emergency}><strong>Recent possible HIV exposure?</strong><p>For exposure within 72 hours, seek urgent medical care to assess HIV PEP. Do not wait for symptoms or a test result.</p><Link href="/sexual-health">Read QXL HIV exposure and PEP information</Link></aside>
 <SymptomSearch pages={symptomPages}/>
 <section className={styles.section}><h2>Understanding laboratory test specimens</h2><p>First-catch urine can support certain urethral STI NAATs; a separate midstream specimen is generally needed for UTI culture. Vaginal, throat and rectal swabs may be required depending on the infected anatomical site. Blood samples are used for tests such as HIV and syphilis. Ask QXL which specimens are currently accepted for each test.</p></section>
 <section className={styles.section}><h2>Confidential testing information</h2><p>QXL Diagnostics provides information on selected sexual health investigations and booking options in Bengaluru. Available privacy controls, specimen collection routes, prices and reporting times should be confirmed before booking. Do not send identifiable intimate photos or sexual history through public website forms.</p></section>
 </main>;
}
