import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { faqGroups,sourceUrls } from '@/lib/qxl-sexual-faq/data';
const approved = process.env.QXL_SEXUAL_FAQ_APPROVED !== 'false';
const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://qxldiagnostics.com').replace(/\/$/, '');
const canonical = origin + '/sexual-health/faq';
export const metadata: Metadata = {
 title: 'Sexual Health FAQ: HIV, STI, Itching, Discharge & Testing | QXL',
 description: 'Clinically reviewed answers about HIV testing windows, STI symptoms, genital sores, itching, urine and swab tests, privacy and testing options in Bengaluru.',
 alternates: { canonical }, robots: { index: approved, follow: approved },
 openGraph: { title:'Sexual Health Questions & STI Testing | QXL Diagnostics', description:'Evidence-informed answers and Bengaluru laboratory testing guidance.',url:canonical,type:'article',locale:'en_IN' }
};
export default function Page(){
 if(!approved && process.env.NODE_ENV==='production') notFound();
 const crumbs={ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
 { '@type':'ListItem',position:1,name:'Home',item:origin },
 { '@type':'ListItem',position:2,name:'Sexual Health',item:origin+'/sexual-health' },
 { '@type':'ListItem',position:3,name:'Questions and Answers',item:canonical } ] };
 const medical={ '@context':'https://schema.org','@type':'MedicalWebPage',name:'Sexual Health Questions & Answers',url:canonical,description:'Educational STI and HIV patient questions with references to CDC and WHO.',isPartOf:{'@type':'WebSite',name:'QXL Diagnostics',url:origin},dateModified:'2026-10-20'};
 return <main style={{maxWidth:960,margin:'auto',padding:'22px 18px',lineHeight:1.65}}>
 <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sexual-health">Sexual Health</Link> / FAQ</nav>
 <h1>Sexual Health Questions: Symptoms, HIV, STIs and Testing in Bengaluru</h1>
 <p>Understand possible causes of genital itching, sores, blisters, discharge and pain after sex. Find practical guidance on test types, timing and specimens. Symptoms alone cannot determine an STI diagnosis.</p>
 <aside style={{borderLeft:'4px solid #b34c27',padding:14,background:'#fff6f3',margin:'20px 0'}}><strong>Possible HIV exposure within 72 hours?</strong> Seek urgent medical assessment for PEP, ideally immediately. Do not wait for any blood test or online booking. Sudden testicular pain, significant pelvic pain, pregnancy-related pain or severe illness needs urgent clinical care.</aside>
 <p><Link href="/sexual-health/packages">Explore QXL's current STI package directory</Link> · <Link href="/sexual-health/symptoms">Browse symptoms</Link> · <a href="tel:+919964639639">Call +91 9964 639 639</a></p>
 <h2>Browse by topic</h2><ul>{faqGroups.map((g,i)=><li key={i}><a href={'#topic-'+i}>{g.title}</a></li>)}</ul>
 {faqGroups.map((group,i)=><section key={group.title} id={'topic-'+i} style={{borderTop:'1px solid #d9e0e9',padding:'20px 0'}}><h2>{group.title}</h2>{group.faq.map((qa,k)=><article key={k}><h3>{qa.q}</h3><p>{qa.a}</p></article>)}<p><small>Clinical guidance: <a href={sourceUrls[group.source as keyof typeof sourceUrls]} rel="noopener noreferrer" target="_blank">Read official reference</a>.</small></p></section>)}
 <p>QXL Diagnostics — Super Speciality Laboratory, Bengaluru. The exact assay, sample type, NABL scope, price and report time must be confirmed in the current booking catalogue. This page is education, not a diagnosis or an assurance that every mentioned service is available.</p>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([crumbs,medical]).replace(/</g,'\\u003c')}} />
 </main>;
}
