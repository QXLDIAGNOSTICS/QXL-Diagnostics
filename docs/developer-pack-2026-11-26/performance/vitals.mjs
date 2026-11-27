// npm install web-vitals; integrate once in frontend root, after consent when required.
// Send only approved template label and metrics, not full path, test name, query, patient ID or IP in payload.
import {onLCP,onINP,onCLS} from 'web-vitals';
export function startVitals(template,consentGranted){
 const allowed=new Set(['home','test-template','article-template','location-template','package-template']);
 if(!consentGranted||!allowed.has(template))return;
 const send=({name,value,id})=>{
  const body=JSON.stringify({template,name,value,id});
  fetch('/api/rum',{method:'POST',body,headers:{'Content-Type':'application/json'},keepalive:true,credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});
 };
 onLCP(send);onINP(send);onCLS(send);
}
// Endpoint: no cookies/identifiers retained, strip referrer/URL and IP from logs, rate limit,
// validate finite nonnegative values and metric names, deduplicate template+metric+id, short retention.
// Exclude sensitive routes entirely. Configure Referrer-Policy: no-referrer for telemetry requests.
