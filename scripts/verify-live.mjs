#!/usr/bin/env node
/** Public-page smoke checks only; does NOT prove indexing or AI ranking. Node >=18. */
const origin=(process.env.QXL_SITE||'https://qxldiagnostics.com').replace(/\/$/,'');
const mustBeLive=['/sexual-health','/sexual-health/packages',
 '/sexual-health/symptoms','/sexual-health/symptoms/private-part-itching',
 '/sexual-health/symptoms/watery-discharge-after-sex',
 '/sexual-health/symptoms/genital-blisters',
 '/sexual-health/symptoms/genital-boils-bumps','/sexual-health/faq'];
let errors=0;
for(const path of mustBeLive){
 try{
  const r=await fetch(origin+path,{headers:{'user-agent':'QXL-Public-Site-Audit/1.0'},redirect:'follow',signal:AbortSignal.timeout(15000)});
  const html=await r.text();
  const ct=r.headers.get('content-type')||'';
  const match=html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)?.[0] || html.match(/<link[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i)?.[0] || '';
  const noindex=/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)||/noindex/i.test(r.headers.get('x-robots-tag')||'');
  const headings=/<h1(?:\s|>)/i.test(html);
  const ok=r.status===200&&ct.includes('text/html')&&headings&&!noindex;
  console.log((ok?'PASS':'FAIL').padEnd(5),String(r.status).padEnd(3),path,`H1:${headings} noindex:${noindex} canonical:${match?'yes':'check'}`);
  if(!ok)errors++;
 }catch(e){console.error('FAIL',path,String(e));errors++}
}
for(const path of ['/robots.txt','/sitemap.xml']){
 try {const r=await fetch(origin+path,{signal:AbortSignal.timeout(15000)});console.log(r.ok?'PASS':'CHECK',String(r.status),path);if(!r.ok)errors++;}catch(e){console.log('CHECK',path,String(e));errors++}
}
console.log('Total issue(s):',errors,'(crawlability and actual indexing require external tool verification)');
process.exitCode=errors?1:0;
