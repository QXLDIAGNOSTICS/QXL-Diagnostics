import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('./data/tests.example.json', import.meta.url),'utf8'));
const errors=[]; const ids=new Set();const slugs=new Set();
for(const t of data){
 if(ids.has(t.id)) errors.push(`Duplicate test ID ${t.id}`); ids.add(t.id);
 if(slugs.has(t.slug)) errors.push(`Duplicate slug ${t.slug}`); slugs.add(t.slug);
 if(!Number.isFinite(t.priceINR)||t.priceINR<0) errors.push(`Bad price ${t.id}`);
 if(!t.specimen||!t.tatHours) errors.push(`Missing specimen/TAT ${t.id}`);
 if(t.published && (!t.parameters.length||t.parameters.includes('VERIFY_AGAINST_LIS')||t.accreditationStatus==='VERIFY_SCOPE')) errors.push(`Published without validation ${t.id}`);
}
console.log(JSON.stringify({records:data.length,errors},null,2)); if(errors.length)process.exitCode=1;
