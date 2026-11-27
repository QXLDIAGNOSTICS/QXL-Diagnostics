// Server-side JSON-LD generator. Use verified CMS values also visible on each page.
const BASE='https://qxldiagnostics.com';
const ORG=BASE+'/#organization';
const labs=[
 {id:'kengeri',name:'QXL Diagnostics Super Speciality Lab – Kengeri',streetAddress:'3rd Floor, SLN Complex, Mysore Road, Kengeri',postalCode:'560060',certificate:'NABLM1126KA10694',validUntil:'2030-11-22'},
 {id:'north-hub',name:'QXL Diagnostics – Super Speciality Lab North Hub at North City Specialities',streetAddress:'1st Floor, North City Specialities, Yelahanka New Town',postalCode:'560064',certificate:'MC-10025',validUntil:'2030-04-01'}
];
export function pageSchema({path,title,description,article,facilityIds=[],test}) {
 if (!path.startsWith('/') || path.startsWith('//') || path.includes('?') || path.includes('#')) throw Error('Canonical path required');
 const url=new URL(path,BASE).href;
 if(new URL(url).origin!==BASE) throw Error('Invalid origin');
 const graph=[{'@type':'Organization','@id':ORG,name:'QXL Diagnostics',legalName:'Qualitify Healthtech Private Limited',url:BASE+'/'},
 {'@type':article?'MedicalWebPage':'WebPage','@id':url+'#webpage',url,name:title,description,publisher:{'@id':ORG}}];
 for(const lab of labs.filter(l=>facilityIds.includes(l.id))){
 graph.push({'@type':'MedicalOrganization','@id':BASE+'/#lab-'+lab.id,name:lab.name,parentOrganization:{'@id':ORG},address:{'@type':'PostalAddress',streetAddress:lab.streetAddress,addressLocality:'Bengaluru',addressRegion:'Karnataka',postalCode:lab.postalCode,addressCountry:'IN'},identifier:{'@type':'PropertyValue',propertyID:'NABL certificate',value:lab.certificate}});
 }
 if(article?.approved===true){
 if(!article.reviewer?.name || !article.author?.name || !article.published || !article.modified || !article.sources?.length) throw Error('Article review metadata missing');
 graph[1].reviewedBy={'@type':'Person',name:article.reviewer.name,jobTitle:article.reviewer.jobTitle};
 graph[1].lastReviewed=article.reviewedDate;
 graph.push({'@type':'Article','@id':url+'#article',headline:title,description,datePublished:article.published,dateModified:article.modified,mainEntityOfPage:{'@id':url+'#webpage'},author:{'@type':'Person',name:article.author.name},publisher:{'@id':ORG},citation:article.sources});
 }
 if(test?.approved===true) graph.push({'@type':'MedicalTest','@id':url+'#test',name:test.name,description:test.description});
 return {'@context':'https://schema.org','@graph':graph};
}
// Prevent a CMS string from closing the JSON-LD script tag.
export function jsonLdScript(data){return '<script type="application/ld+json">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script>';}
// Do not invent ratings, prices, branch addresses, accreditation scope or reviewer credentials.
