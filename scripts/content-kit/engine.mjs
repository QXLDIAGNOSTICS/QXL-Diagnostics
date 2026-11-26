import {createHash} from 'node:crypto';
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const jsonLd=o=>JSON.stringify(o).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const exists=x=>x!==null&&x!==undefined&&x!=='';
const fail=(ok,msg)=>{if(!ok)throw new Error(msg);};
const dateOK=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export function pathOK(p){return typeof p==='string'&&/^\/(?:[a-z0-9]+(?:[-/][a-z0-9]+)*)?$/.test(p);}
export function safeURL(u){try{const p=new URL(u);return p.protocol==='https:'&&!p.username&&!p.password;}catch{return false;}}
export function canonical(d,path){fail(pathOK(path),'Unsafe path: '+path);return new URL(path,d.site.origin).href;}
export function certificateText(f){const c=f.certificate;return `${f.name}: NABL ${c.number}; ${c.standard} medical testing. Issued ${c.issued}; certificate valid until ${c.validUntil}, subject to continued compliance and the approved annexure. This is a site-specific certificate, not a claim that every test or every collection locality is accredited.`;}
export function entity(d,p){const group={test:'tests',locality:'localities',facility:'facilities',expert:'experts',service:'services'}[p.kind];return group?d[group].find(x=>x.id===p.entityId):null;}
export function contentHash(d,p){
  // Review covers the exact rendered content plus dependent operational records.
  // Requiring re-review after dependent record changes prevents silent claim changes.
  return createHash('sha256').update(JSON.stringify({site:d.site,facilities:d.facilities,scope:d.scope,tests:d.tests,
    localities:d.localities,experts:d.experts,services:d.services,page:{path:p.path,kind:p.kind,entityId:p.entityId,title:p.title,
    description:p.description,intro:p.intro,sections:p.sections,faqs:p.faqs,relatedPaths:p.relatedPaths,modifiedOn:p.modifiedOn}})).digest('hex');
}
export function validate(d,today=new Date().toISOString().slice(0,10)){
 fail(safeURL(d.site.origin)&&new URL(d.site.origin).origin===d.site.origin,'origin must be an HTTPS origin without trailing slash');
 const certificates={kengeri:'NABLM1126KA10694','north-hub':'MC-10025'};
 for(const group of ['facilities','tests','localities','experts','services','scope']){
  const ids=d[group].map(x=>x.id);fail(new Set(ids).size===ids.length,'Duplicate IDs in '+group);
 }
 for(const f of d.facilities){const c=f.certificate;fail(c?.number===certificates[f.id],'Unexpected facility/certificate mapping: '+f.id);
  fail(dateOK(c.issued)&&dateOK(c.validUntil)&&c.issued<=c.validUntil,'Invalid certificate dates');
  for(const k of ['certificateUrl','annexureUrl'])if(c[k])fail(safeURL(c[k]),'Bad document URL');
 }
 for(const s of d.scope){fail(d.facilities.some(f=>f.id===s.facilityId),'Unknown scope facility');fail(d.tests.some(t=>t.id===s.testId),'Unknown scope test');
  const f=d.facilities.find(f=>f.id===s.facilityId);
  fail(s.certificateNumber===f.certificate.number,'Scope attached to wrong certificate');
  fail(safeURL(s.annexureUrl)&&exists(s.annexurePage)&&exists(s.specimen)&&exists(s.method)&&exists(s.verifiedBy)&&dateOK(s.verifiedOn)&&s.verifiedOn<=today,'Incomplete scope evidence');
 }
 for(const t of d.tests){
  if(t.parameterCount!==null)fail(Number.isInteger(t.parameterCount)&&t.parameterCount===t.parameters.length&&new Set(t.parameters).size===t.parameters.length,'Parameter count mismatch: '+t.id);
  if(t.price)fail(Number.isFinite(t.price.amount)&&t.price.amount>=0&&t.price.currency==='INR'&&exists(t.price.includes)&&dateOK(t.price.verifiedOn)&&t.price.verifiedOn<=today&&dateOK(t.price.validUntil)&&t.price.validUntil>=today,'Unverified/stale price: '+t.id);
  if(t.scopeEntryId){const s=d.scope.find(s=>s.id===t.scopeEntryId);fail(s&&s.testId===t.id&&s.facilityId===t.processingFacilityId&&s.method===t.method&&s.specimen===t.specimen,'Test scope mismatch: '+t.id);}
 }
 const paths=d.pages.map(p=>p.path);fail(new Set(paths).size===paths.length,'Duplicate page paths');
 for(const p of d.pages){
  fail(pathOK(p.path),'Unsafe page path');fail(['test','locality','facility','expert','service','accreditation','editorial'].includes(p.kind),'Unknown page type');
  if(!p.published)continue;
  const e=entity(d,p);if(!['accreditation','editorial'].includes(p.kind))fail(e&&e.path===p.path,'Page/entity path mismatch');
  fail(exists(p.title)&&exists(p.description)&&exists(p.intro)&&p.sections?.length&&p.sections.every(s=>exists(s.heading)&&exists(s.text))&&(p.faqs||[]).every(f=>exists(f.question)&&exists(f.answer)),'Missing useful page content');
  fail(dateOK(p.modifiedOn)&&p.modifiedOn<=today,'Missing/future genuine modification date');
  const r=p.review,expert=d.experts.find(x=>x.id===r?.expertId);
  fail(expert?.verified===true&&expert.consent===true&&exists(expert.evidence)&&expert.qualifications?.length&&exists(expert.specialty)&&exists(expert.role),'Verified reviewer required');
  fail(dateOK(r.reviewedOn)&&r.reviewedOn<=today&&r.reviewedOn>=p.modifiedOn&&exists(r.record),'Missing real review record');
  fail(r.contentHash===contentHash(d,p),'Content changed since review: '+p.path);
  fail(d.pages.some(x=>x.path===expert.path&&x.published),'Reviewer needs published profile');
  for(const link of p.relatedPaths||[])fail(d.pages.some(x=>x.path===link&&x.published),'Related link not published: '+link);
  const free=JSON.stringify({title:p.title,description:p.description,intro:p.intro,sections:p.sections,faqs:p.faqs});
  fail(!/100\s*%\s*accur|guaranteed\s+(?:accuracy|diagnosis|cure)|all\s+tests\s+(?:are\s+)?NABL|NABL\s+accredited\s+network|MC-6849|MC-10025|NABLM1126KA10694/i.test(free),'Absolute or hard-coded accreditation claim; use registry component');
  if(p.kind==='test'){
   for(const k of ['purpose','preparation','specimen','method','limitations','clinicalAssessment','turnaround','processingFacilityId'])fail(exists(e[k]),'Test '+e.id+' missing '+k);
   fail(d.facilities.some(f=>f.id===e.processingFacilityId),'Unknown processing site');
   if(e.scopeEntryId){const f=d.facilities.find(f=>f.id===e.processingFacilityId);fail(f.certificate.issued<=today&&f.certificate.validUntil>=today,'Test accreditation dates not current');}
   if(e.reportExampleUrl)fail(safeURL(e.reportExampleUrl)&&e.reportExampleFictional===true,'Report example must be fictional');
  }
  if(p.kind==='locality'){
   fail(e.kind==='service-area'&&e.collectionVerified===true&&exists(e.collectionEvidence)&&e.pincodes.length&&exists(e.collectionHours)&&exists(e.availabilityText)&&exists(e.transportProcedure)&&e.processingFacilityIds.length,'Unverified locality availability');
   for(const id of e.processingFacilityIds)fail(d.facilities.some(f=>f.id===id),'Unknown locality processing site');
  }
  if(p.kind==='facility'||p.kind==='accreditation')for(const f of p.kind==='facility'?[e]:d.facilities){
   fail(f.certificate.issued<=today&&f.certificate.validUntil>=today,'Review facility certificate currency');
   fail(safeURL(f.certificate.certificateUrl)&&safeURL(f.certificate.annexureUrl),'Upload certificate and annexure before publishing');
   if(p.kind==='facility')fail(exists(f.address)&&exists(f.patientHours),'Verify address and patient hours');
  }
  if(p.kind==='expert')fail(e.verified&&e.consent&&exists(e.evidence)&&e.qualifications.length&&exists(e.specialty)&&exists(e.role),'Unverified expert');
  if(p.kind==='service')for(const k of ['description','eligibleReports','accessProcess','availability','limitations'])fail(exists(e[k]),'Missing interpretation service fact: '+k);
  if(p.kind==='service')fail(e.expertIds.length&&e.expertIds.every(id=>d.experts.some(x=>x.id===id&&x.verified&&x.consent)),'Unverified service experts');
 }
 const live=new Set(d.pages.filter(p=>p.published).map(p=>p.path));
 const seen=new Set();for(const r of d.redirects){fail(pathOK(r.from)&&live.has(r.to)&&r.from!==r.to&&!live.has(r.from)&&!seen.has(r.from),'Unsafe redirect or missing live target');seen.add(r.from);}
 return true;
}
function fact(label,value){return exists(value)?`<p><strong>${esc(label)}:</strong> ${esc(value)}</p>`:'';}
function list(items){return `<ul>${items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;}
function certHTML(f){return `<section><h2>${esc(f.name)} accreditation</h2><p>${esc(certificateText(f))}</p>${f.certificate.supersedes?`<p>Supersedes historical certificate ${esc(f.certificate.supersedes)}.</p>`:''}${['certificateUrl','annexureUrl'].filter(k=>safeURL(f.certificate[k])).map(k=>`<p><a href="${esc(f.certificate[k])}">${k==='certificateUrl'?'View certificate':'View approved scope annexure'}</a></p>`).join('')}</section>`;}
export function render(d,p,{preview=false}={}){
 const e=entity(d,p),orgId=d.site.origin+'/#organization',url=canonical(d,p.path);
 let body='',main;
 if(p.kind==='test'){
  body=[['Purpose',e.purpose],['Preparation',e.preparation],['Specimen',e.specimen],['Method',e.method],['Turnaround and conditions',e.turnaround],['Limitations',e.limitations],['Clinical assessment',e.clinicalAssessment]].map(([k,v])=>fact(k,v)).join('');
  if(e.parameters.length)body+=`<h2>Reported parameters</h2>${list(e.parameters)}`;
  if(e.price)body+=fact('Price',`INR ${e.price.amount}. ${e.price.includes}. Valid until ${e.price.validUntil}.`);
  const f=d.facilities.find(f=>f.id===e.processingFacilityId);if(f)body+=fact('Processing laboratory',f.name);
  const s=d.scope.find(s=>s.id===e.scopeEntryId);if(s)body+=`<p>Within the approved scope for ${esc(f.name)}, certificate ${esc(s.certificateNumber)}, specimen ${esc(s.specimen)}, method ${esc(s.method)}. <a href="${esc(s.annexureUrl)}">Annexure, page ${esc(s.annexurePage)}</a>.</p>`;
  if(e.reportExampleUrl)body+=`<p><a href="${esc(e.reportExampleUrl)}">Fictional educational sample report — not a patient record</a></p>`;
  main={'@type':'MedicalTest','@id':url+'#test',name:e.name,description:e.purpose};
 }
 if(p.kind==='locality'){
  body=`<p>This page describes a home-collection service area. It does not establish a walk-in laboratory at this locality.</p>`+fact('Availability',e.availabilityText)+fact('PIN codes',e.pincodes.join(', '))+fact('Collection hours',e.collectionHours)+fact('Collection fee',e.collectionFee)+fact('Sample transport',e.transportProcedure);
  body+=fact('Processing sites',e.processingFacilityIds.map(id=>d.facilities.find(f=>f.id===id)?.name).join('; '));
  body+='<p>Processing site and test-specific accreditation scope must be confirmed for the requested test. A collection address is not proof of laboratory accreditation.</p>';
  main={'@type':'Service','@id':url+'#service',name:'Home sample collection in '+e.name,provider:{'@id':orgId},areaServed:{'@type':'Place',name:e.name+', Bengaluru'}};
 }
 if(p.kind==='facility'){body=fact('Address',e.address)+fact('Patient opening hours',e.patientHours)+fact('Processing hours',e.processingHours)+certHTML(e);
  main={'@type':'MedicalOrganization','@id':url+'#facility',name:e.name,address:e.address,url,parentOrganization:{'@id':orgId}};}
 if(p.kind==='accreditation')body=d.facilities.map(certHTML).join('');
 if(p.kind==='expert'){
  body=fact('Qualifications',e.qualifications.join(', '))+fact('Specialty',e.specialty)+fact('Role',e.role)+fact('Registration',e.registration);
  for(const k of ['publications','affiliations'])if(e[k]?.length)body+=`<h2>${esc(k)}</h2><ul>${e[k].filter(x=>safeURL(x.url)).map(x=>`<li><a href="${esc(x.url)}">${esc(x.label)}</a></li>`).join('')}</ul>`;
  main={'@type':'Person','@id':url+'#person',name:e.name,jobTitle:e.role,description:e.specialty,worksFor:{'@id':orgId}};
 }
 if(p.kind==='service')body=[['Service',e.description],['Eligible reports',e.eligibleReports],['How to access',e.accessProcess],['Availability',e.availability],['Fee',e.fee],['Limitations',e.limitations],['Specialists',e.expertIds.map(id=>d.experts.find(x=>x.id===id)?.name).join(', ')]].map(([k,v])=>fact(k,v)).join('');
 const reviewer=d.experts.find(x=>x.id===p.review?.expertId);
 const graph=[{'@type':'Organization','@id':orgId,name:d.site.name,url:d.site.origin,telephone:d.site.phone},
 {'@type':p.kind==='expert'?'ProfilePage':'WebPage','@id':url+'#page',url,name:p.title,description:p.description,dateModified:p.modifiedOn,
 ...(main?{mainEntity:{'@id':main['@id']}}:{}),...(reviewer?{reviewedBy:{'@id':canonical(d,reviewer.path)+'#person'},lastReviewed:p.review.reviewedOn}:{})}];
 if(main)graph.push(main);
 // Every schema value comes from the same visible facts. No fake ratings or medical claims.
 return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><meta name="robots" content="${preview?'noindex,nofollow':'index,follow'}"><link rel="canonical" href="${esc(url)}"><script type="application/ld+json">${jsonLd({'@context':'https://schema.org','@graph':graph})}</script></head><body><main>${preview?'<p>INTERNAL PREVIEW — NOT APPROVED FOR PUBLICATION</p>':''}<h1>${esc(p.title)}</h1><p>${esc(p.intro)}</p>${body}${(p.sections||[]).map(s=>`<section><h2>${esc(s.heading)}</h2><p>${esc(s.text)}</p></section>`).join('')}${(p.faqs||[]).map(f=>`<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}${reviewer?`<p>Reviewed by <a href="${esc(reviewer.path)}">${esc(reviewer.name)}</a> on ${esc(p.review.reviewedOn)}.</p>`:''}<nav aria-label="Related information">${(p.relatedPaths||[]).map(path=>`<p><a href="${esc(path)}">${esc(d.pages.find(x=>x.path===path)?.title||path)}</a></p>`).join('')}</nav><p><a href="tel:${esc(d.site.phone)}">Call QXL to confirm availability and booking details</a></p></main></body></html>`;
}
export function robots(d){
 // Merge with existing production rules. Repeated exclusions are deliberate:
 // more-specific user-agent groups do NOT inherit wildcard disallows.
 const blocked=['/admin/','/api/','/account/','/patient/','/reports/','/checkout/'];
 const group=agent=>`User-agent: ${agent}\nAllow: /\n${blocked.map(p=>'Disallow: '+p).join('\n')}\n`;
 let out=['*','Googlebot','Bingbot','OAI-SearchBot','Claude-SearchBot','Claude-User','PerplexityBot'].map(group).join('\n');
 if(d.botPolicy.training==='block')out+='\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n';
 if(d.botPolicy.training==='allow')out+='\n'+['GPTBot','ClaudeBot'].map(group).join('\n');
 if(d.botPolicy.googleExtended==='allow')out+='\n'+group('Google-Extended');
 if(d.botPolicy.googleExtended==='block')out+='\nUser-agent: Google-Extended\nDisallow: /\n';
 return '# MERGE TEMPLATE, not a replacement for current robots.txt. Preserve unlisted policies.\n'+out+`\nSitemap: ${d.site.origin}/sitemap.xml\n`;
}
export function sitemap(d){return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+d.pages.filter(p=>p.published).map(p=>`<url><loc>${esc(canonical(d,p.path))}</loc><lastmod>${esc(p.modifiedOn)}</lastmod></url>`).join('')+'</urlset>';}
