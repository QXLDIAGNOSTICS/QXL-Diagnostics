import fs from 'node:fs';
const urls=fs.readFileSync(new URL('./data/urls.txt', import.meta.url),'utf8').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
const forbidden=[['retired Kengeri certificate (replaced by NABLM1126KA10694)',/MC[-\s]?6849/i],['absolute precision',/100%\s+precision/i],['blanket pathologist authorization',/every\s+(single\s+)?(laboratory\s+)?report.{0,100}(signed|authori[sz]ed).{0,100}pathologist/i],['legacy MD claim',/multi.level MD doctor verification/i]];
const rows=[];
for(const url of urls){
 try{
  const res=await fetch(url,{redirect:'follow',headers:{'User-Agent':'QXL-QualityAudit/1.0 (+https://qxldiagnostics.com)'}});
  const html=await res.text();const isHtml=(res.headers.get('content-type')||'').includes('html');
  const title=isHtml?(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/\s+/g,' ').trim():'';
  const canonical=isHtml?html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]||html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical/i)?.[1]||'':'';
  const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  rows.push({url,status:res.status,finalUrl:res.url,title,canonical,findings:forbidden.filter(([,re])=>re.test(text)).map(([name])=>name),noindex:/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html)});
 }catch(e){rows.push({url,error:String(e)})}
}
fs.mkdirSync('reports/seo-kit',{recursive:true});fs.writeFileSync('reports/seo-kit/public-audit.json',JSON.stringify({checkedAt:new Date().toISOString(),rows},null,2));
console.log(JSON.stringify(rows,null,2));
const critical=rows.some(r=>r.error||r.status>=400||r.findings?.length);if(critical)process.exitCode=1;
