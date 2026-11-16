'use client';
import {useMemo,useState} from 'react';
import {SymptomPage} from '@/lib/qxl-symptoms/data';
import {SymptomCard} from './SymptomCard';
import styles from './symptoms.module.css';
/** Local-only filter: no network request, URL query params, session storage or analytics. */
export function SymptomSearch({pages}:{pages:SymptomPage[]}) {
  const [term,setTerm] = useState('');
  const hits = useMemo(()=>{
    const q=term.trim().toLocaleLowerCase('en-IN');
    if (!q) return pages;
    return pages.filter(p=>[p.title,p.description,p.overview,...p.queries].some(s=>s.toLocaleLowerCase('en-IN').includes(q)));
  },[pages,term]);
  return <section aria-label="Browse common symptoms" className={styles.searchPanel}>
    <label htmlFor="qxl-symptom-search">Find a symptom or concern</label>
    <input id="qxl-symptom-search" className={styles.searchInput} value={term} onChange={e=>setTerm(e.target.value)} type="search" placeholder="e.g. itching, watery discharge, blister, pain, boil" autoComplete="off" />
    <p className={styles.muted}>This filter runs in your browser. Avoid entering names or other identifying medical information.</p>
    <div className={styles.cards} aria-live="polite">
      {hits.map(p=><SymptomCard key={p.slug} page={p}/>)}
    </div>
    {!hits.length&&<p role="status">No exact match. Choose the closest symptom, or seek clinical assessment for unexplained symptoms.</p>}
  </section>
}
