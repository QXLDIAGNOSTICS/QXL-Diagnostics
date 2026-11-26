import {mkdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {data} from './data.mjs';
import {validate,render,robots,sitemap,contentHash} from './engine.mjs';
const command=process.argv[2]||'check';
if(command==='hash'){
 const p=data.pages.find(p=>p.path===process.argv[3]);if(!p)throw Error('Page path not found');
 console.log(contentHash(data,p)); // Reviewer records this ONLY after completing actual review.
}else{
 validate(data);
 if(command==='check')console.log('Data validation passed. Published pages: '+data.pages.filter(p=>p.published).length);
 else if(['preview','production'].includes(command)){
  const live=data.pages.filter(p=>p.published);
  if(command==='production'&&!live.length)throw Error('No approved pages. Import existing content and complete review; do not deploy empty output.');
  const out=join(import.meta.dirname,'out',command==='preview'?'preview':'dist'); // never the site root
  for(const p of command==='preview'?data.pages:live){
   const dir=join(out,p.path.slice(1));await mkdir(dir,{recursive:true});
   await writeFile(join(dir,'index.html'),render(data,p,{preview:command==='preview'}));
  }
  await mkdir(out,{recursive:true});
  await writeFile(join(out,'robots.merge.txt'),robots(data));
  if(command==='production')await writeFile(join(out,'sitemap.xml'),sitemap(data));
  await writeFile(join(out,'redirects.json'),JSON.stringify(data.redirects,null,2));
  console.log('Wrote '+out+'; this is a partial integration output, never replace the whole site.');
 }else throw Error('Use check, hash /path, preview, or production');
}
