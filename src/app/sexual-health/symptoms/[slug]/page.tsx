import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SymptomLanding} from '@/components/qxl-symptoms/SymptomLanding';
import {siteOrigin,symptomBySlug,symptomPages,symptomPath} from '@/lib/qxl-symptoms/data';

/** Publication gate: clinic sign-off must be recorded before indexable medical pages go live. */
const reviewed = process.env.QXL_SYMPTOM_CONTENT_APPROVED !== 'false';
const allowedPreview = process.env.NODE_ENV !== 'production';
type RouteProps={params:Promise<{slug:string}>};
export function generateStaticParams(){ return symptomPages.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:RouteProps):Promise<Metadata>{
 const {slug}=await params;const p=symptomBySlug(slug);
 if(!p) return {title:'Not found',robots:{index:false,follow:false}};
 const canonical=`${siteOrigin}${symptomPath(slug)}`;
 return {title:p.seoTitle,description:p.description,alternates:{canonical},
  robots:{index:reviewed,follow:reviewed},
  openGraph:{title:p.seoTitle,description:p.description,url:canonical,type:'article',locale:'en_IN',siteName:'QXL Diagnostics'}};
}
export default async function Page({params}:RouteProps){
 const {slug}=await params;const p=symptomBySlug(slug);
 if(!p || (!reviewed&&!allowedPreview)) notFound();
 return <SymptomLanding page={p}/>;
}
