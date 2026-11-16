import Link from 'next/link';
import {SymptomPage,clinicalReferences,packageDirectoryPath,siteOrigin,symptomIndexPath,symptomPath} from '@/lib/qxl-symptoms/data';
import {relatedBySlug} from '@/lib/qxl-symptoms/related';
import {symptomBySlug} from '@/lib/qxl-symptoms/data';
import styles from './symptoms.module.css';

const JSONLd = ({data}:{data:unknown}) => <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;

export function SymptomLanding({page}:{page:SymptomPage}) {
 const url=`${siteOrigin}${symptomPath(page.slug)}`;
 const refs=page.references.map(k=>clinicalReferences[k]).filter(Boolean);
 const schema={
  '@context':'https://schema.org',
  '@graph':[
   {'@type':'MedicalWebPage','@id':`${url}#webpage`,url,name:page.title,description:page.description,inLanguage:'en-IN',
    isPartOf:{'@id':`${siteOrigin}/sexual-health/#website-section`},
    publisher:{'@type':'Organization',name:'QXL Diagnostics',url:siteOrigin},
    citation:refs.map(r=>r.href)},
   {'@type':'BreadcrumbList','@id':`${url}#breadcrumbs`,itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:siteOrigin+'/'},
    {'@type':'ListItem',position:2,name:'Sexual Health',item:siteOrigin+'/sexual-health'},
    {'@type':'ListItem',position:3,name:'Symptoms',item:siteOrigin+symptomIndexPath},
    {'@type':'ListItem',position:4,name:page.title,item:url}
   ]}
  ]
 };
 return <main className={styles.main}>
  <JSONLd data={schema}/>
  <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link> / <Link href="/sexual-health">Sexual Health</Link> / <Link href={symptomIndexPath}>Symptoms</Link> / <span aria-current="page">{page.title}</span></nav>
  <header className={styles.hero}>
   <p className={styles.eyebrow}>QXL Diagnostics · Sexual health information · Bengaluru</p>
   <h1>{page.title}</h1><p className={styles.lead}>{page.description}</p>
   <p className={styles.bodyText}>{page.overview}</p>
   <p className={styles.muted}><strong>Common descriptions:</strong> {page.queries.slice(0,3).join(" · ")}</p>
   <div className={styles.actions}><Link className={styles.primary} href={packageDirectoryPath}>Explore relevant tests and packages</Link><a className={styles.secondary} href="tel:+919964639639">Call QXL: +91 9964 639 639</a></div>
  </header>
  <aside role="note" className={styles.emergency}><strong>Possible HIV exposure within the past 72 hours?</strong><p>Seek urgent medical assessment for HIV post-exposure prophylaxis (PEP). Do not delay to book a blood test. For severe or sudden symptoms, obtain urgent in-person care.</p><Link href="/sexual-health">Read QXL sexual health and emergency exposure guidance</Link></aside>
  <section className={styles.section}><h2>Possible explanations</h2><p>These are possibilities, not a diagnosis. Other causes may also apply.</p><ul>{page.causes.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section className={styles.section}><h2>Which investigations might help?</h2><p>A qualified clinician should choose tests after assessing symptoms, exposure type, age, pregnancy status and relevant history. Test availability and specimen acceptance must be confirmed with QXL.</p><ul>{page.tests.map(x=><li key={x}>{x}</li>)}</ul><p><Link href={packageDirectoryPath}>Check QXL sexual health profiles and booking information →</Link></p></section>
  <section className={styles.section}><h2>What to do next</h2><ol>{page.nextsteps.map(x=><li key={x}>{x}</li>)}</ol></section>
  <aside className={styles.warning} role="note"><h2>When to seek urgent medical attention</h2><p>{page.urgent}</p><p>Clinical assessment takes priority over a laboratory booking when urgent symptoms are present.</p></aside>
  <section className={styles.section}><h2>Common questions</h2>{page.faq.map(item=><details className={styles.faq} key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
  <section className={styles.section}><h2>Clinical references</h2><ul>{refs.map(r=><li key={r.href}><a href={r.href} target="_blank" rel="noreferrer noopener">{r.label}</a></li>)}</ul><p className={styles.muted}>Educational content only. Medical reviewer and publication date must be added following documented clinical sign-off; do not claim review occurred before it has.</p></section>
  <section className={styles.section}><h2>Explore related concerns</h2><ul className={styles.related}>{(relatedBySlug[page.slug]||[]).map(slug=>{const p=symptomBySlug(slug);return p?<li key={slug}><Link href={symptomPath(slug)}>{p.title}</Link></li>:null})}</ul><p><Link href={symptomIndexPath}>Browse all sexual health symptoms</Link></p></section>
  <footer className={styles.footer}><p><strong>QXL Diagnostics, Bengaluru.</strong> For enquiries call <a href="tel:+919964639639">+91 9964 639 639</a>. Specimen collection, privacy options, exact prices, turnaround time and accreditation scope should be confirmed for each test.</p></footer>
 </main>;
}
