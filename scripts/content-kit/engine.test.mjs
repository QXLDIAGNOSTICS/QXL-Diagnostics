import test from 'node:test';
import assert from 'node:assert/strict';
import {data} from './data.mjs';
import {validate,contentHash,render,jsonLd,canonical,robots,sitemap} from './engine.mjs';
const clone=()=>structuredClone(data);
function approved(){const d=clone();d.experts=[{id:'fixture',path:'/experts/fixture',name:'Test fixture only',role:'Reviewer',specialty:'Test specialty',qualifications:['Test qualification'],consent:true,verified:true,evidence:'Synthetic test fixture',publications:[],affiliations:[]}];
 const p={kind:'expert',entityId:'fixture',path:'/experts/fixture',title:'Fixture',description:'Fixture',intro:'Fixture',sections:[{heading:'Role',text:'Fixture'}],faqs:[],relatedPaths:[],modifiedOn:'2026-11-26',published:true,review:{expertId:'fixture',reviewedOn:'2026-11-26',record:'Synthetic review'}};d.pages=[p];p.review.contentHash=contentHash(d,p);return d;}
test('seed has no fabricated approved pages',()=>{assert.equal(validate(clone(),'2026-11-26'),true);assert.equal(data.pages.length,0);});
test('North certificate cannot be assigned to Kengeri',()=>{const d=clone();d.facilities[0].certificate.number='MC-10025';assert.throws(()=>validate(d));});
test('CBC parameter count must match unique parameters',()=>{const d=clone();d.tests[2].parameters=['Hb','Hb'];d.tests[2].parameterCount=2;assert.throws(()=>validate(d));});
test('test accreditation cannot be inferred from certificate alone',()=>{const d=clone();d.tests[0].scopeEntryId='imaginary';assert.throws(()=>validate(d));});
test('review becomes invalid when content or dependencies change',()=>{const d=approved();assert.equal(validate(d,'2026-11-26'),true);d.pages[0].intro='Changed';assert.throws(()=>validate(d,'2026-11-26'),/changed since review/);});
test('service area without availability evidence cannot publish',()=>{const d=approved();const p={...d.pages[0],kind:'locality',entityId:'jp-nagar',path:'/locations/jp-nagar',review:{...d.pages[0].review}};d.pages.push(p);for(const x of d.pages)x.review.contentHash=contentHash(d,x);assert.throws(()=>validate(d,'2026-11-26'),/locality availability/);});
test('JSON-LD and HTML resist script breakout',()=>{const value='</script><script>alert(1)</script>';assert.ok(!jsonLd({value}).includes('</script>'));const d=approved();d.pages[0].intro=value;const html=render(d,d.pages[0],{preview:true});assert.ok(html.includes('&lt;/script&gt;'));assert.ok(html.includes('noindex,nofollow'));});
test('paths cannot escape origin or output directory',()=>{for(const p of ['//evil.test','/../escape','/a?b=1','/a#b'])assert.throws(()=>canonical(data,p));});
test('drafts stay outside sitemap; dates are not refreshed at build',()=>{const d=approved();assert.ok(sitemap(d).includes('2026-11-26'));d.pages[0].published=false;assert.ok(!sitemap(d).includes('<url>'));});
test('specific search bots preserve private route exclusions',()=>{const r=robots(data);for(const bot of ['OAI-SearchBot','Claude-SearchBot','PerplexityBot']){const block=r.split('User-agent: '+bot+'\n')[1].split('\n\n')[0];assert.ok(block.includes('Disallow: /patient/'));}assert.ok(!r.includes('User-agent: GPTBot'));});
test('redirect loops and unpublished targets rejected',()=>{const d=clone();d.redirects=[{from:'/a',to:'/b'},{from:'/b',to:'/a'}];assert.throws(()=>validate(d));});
