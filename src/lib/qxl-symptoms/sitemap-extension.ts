import type {MetadataRoute} from 'next';
import {siteOrigin,symptomIndexPath,symptomPages,symptomPath} from './data';
/** Spread into your EXISTING app/sitemap.ts; do not replace the existing sitemap. */
export function qxlSymptomSitemapEntries():MetadataRoute.Sitemap {
 if(process.env.QXL_SYMPTOM_CONTENT_APPROVED === 'false') return [];
 return [symptomIndexPath,...symptomPages.map(p=>symptomPath(p.slug))].map(path=>({url:siteOrigin+path,changeFrequency:'monthly' as const,priority:path===symptomIndexPath?0.8:0.6}));
}
