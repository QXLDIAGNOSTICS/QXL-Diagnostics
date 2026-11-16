#!/usr/bin/env node
/** Only send URLs you just published/updated. Requires verified domain key.
 * Usage: INDEXNOW_KEY=... node scripts/send-indexnow-changed.mjs /sexual-health/faq
 * Prerequisite: publicly host https://qxldiagnostics.com/<KEY>.txt with exact key text.
 */
const key=process.env.INDEXNOW_KEY;
const origin='https://qxldiagnostics.com';
const paths=process.argv.slice(2);
if(!key||!(/^[a-zA-Z0-9-]{8,128}$/).test(key)) throw Error('Set valid INDEXNOW_KEY; do not commit it');
if(!paths.length) throw Error('Specify changed canonical paths');
const urls=paths.map(p=>{if(!p.startsWith('/')||p.startsWith('//'))throw Error('Invalid path: '+p);return origin+p;});
const res=await fetch('https://api.indexnow.org/indexnow',{
 method:'POST',headers:{'content-type':'application/json'},
 body:JSON.stringify({host:'qxldiagnostics.com',key,keyLocation:origin+'/'+key+'.txt',urlList:urls})
});
console.log('IndexNow HTTP:',res.status, await res.text().catch(()=>''));
if(!res.ok)process.exitCode=1;
