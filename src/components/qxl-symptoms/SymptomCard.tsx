import Link from 'next/link';
import {SymptomPage, symptomPath} from '@/lib/qxl-symptoms/data';
import styles from './symptoms.module.css';
export function SymptomCard({page}:{page:SymptomPage}) {
  return <article className={styles.card}>
    <h3><Link href={symptomPath(page.slug)}>{page.title}</Link></h3>
    <p>{page.description}</p>
    <Link className={styles.cardLink} href={symptomPath(page.slug)}>Read causes and testing options →</Link>
  </article>
}
