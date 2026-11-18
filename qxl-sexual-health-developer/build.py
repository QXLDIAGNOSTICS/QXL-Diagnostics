"""Generate draft HTML with the standard library. Run python build.py.
Do not deploy draft-pages directly. Integrate reviewed fragments with the existing site.
"""
import json, csv, pathlib, html
from content import PAGES
ROOT=pathlib.Path(__file__).parent
BASE='https://www.qxldiagnostics.com'
HUB='/sexual-health'; PACKAGES=HUB+'/packages'
# Preserve verified existing equivalent URL. Check the remainder against the live route inventory.
EXISTING={'sti-testing-after-unprotected-sex':'/health-hub/after-unprotected-sex'}
PATH={p['slug']:EXISTING.get(p['slug'],HUB+'/'+p['slug']) for p in PAGES}
BY={p['slug']:p for p in PAGES}
E=lambda v:html.escape(str(v),quote=True)
# Clinical reference directory; select relevant refs per page when integrating.
REFS={
'hiv':('CDC: HIV testing and windows','https://www.cdc.gov/hiv/testing/index.html'),
'pep':('CDC: HIV PEP clinical guidance','https://www.cdc.gov/hivnexus/hcp/pep/index.html'),
'sti':('CDC: STI screening recommendations','https://www.cdc.gov/std/treatment-guidelines/screening-recommendations.htm'),
'oral':('CDC: Oral sex and STI risk','https://www.cdc.gov/sti/about/about-sti-risk-and-oral-sex.html'),
'ct':('CDC: Chlamydial infections','https://www.cdc.gov/std/treatment-guidelines/chlamydia.htm'),
'ng':('CDC: Gonococcal infections','https://www.cdc.gov/std/treatment-guidelines/gonorrhea-adults.htm'),
'hbv':('CDC: Hepatitis B testing','https://www.cdc.gov/hepatitis-b/hcp/diagnosis-testing/'),
'hcv':('CDC: Hepatitis C testing','https://www.cdc.gov/hepatitis-c/hcp/diagnosis-testing/'),
'syph':('CDC: Syphilis','https://www.cdc.gov/std/treatment-guidelines/syphilis.htm'),
'hsv':('CDC: Genital herpes','https://www.cdc.gov/std/treatment-guidelines/herpes.htm'),
'hpv':('CDC: HPV','https://www.cdc.gov/std/treatment-guidelines/hpv.htm'),
'mg':('CDC: Mycoplasma genitalium','https://www.cdc.gov/std/treatment-guidelines/mycoplasmagenitalium.htm'),
'vag':('CDC: Vaginal discharge','https://www.cdc.gov/std/treatment-guidelines/vaginal-discharge.htm'),
'ec':('WHO: Emergency contraception','https://www.who.int/news-room/fact-sheets/detail/emergency-contraception'),
'naco':('National AIDS Control Organisation, India','https://naco.gov.in/'),
}
REFMAP={'hiv-testing-after-exposure':'hiv naco','hiv-pep-prep-testing':'pep hiv naco','sti-testing-after-oral-sex':'oral ct ng hbv hiv','sti-testing-after-anal-sex':'ng ct sti pep','oral-throat-symptoms':'oral ng ct','gonorrhea-chlamydia-pcr':'ct ng','hepatitis-b-triple-panel':'hbv','hepatitis-c-testing':'hcv','syphilis-rpr-tpha-testing':'syph','genital-herpes-testing':'hsv','hpv-dna-testing':'hpv','persistent-urethritis-testing':'mg ct ng','vaginal-discharge-testing':'vag ct','pregnancy-and-sti-testing':'ec sti','urgent-medical-support':'pep ec naco','sti-testing-window-periods':'hiv sti','sti-testing-after-unprotected-sex':'pep hiv sti ec','condom-break-sti-testing':'pep ec','hiv-symptoms-and-anxiety':'hiv','genital-sores-blisters-ulcers':'hsv syph hpv','understanding-sti-test-results':'hiv syph hbv hcv','sti-testing-after-antibiotics':'ct ng hiv','sti-sample-collection':'ct ng','sti-risk-kissing-and-genital-contact':'oral sti hiv','inclusive-sexual-health-testing':'sti naco'}
URGENT='<aside class="qxl-urgent" aria-label="Urgent care"><strong>Possible HIV exposure within 72 hours?</strong> Seek urgent medical assessment for PEP now; do not wait for a laboratory test. Severe pelvic or testicular pain, heavy bleeding, breathing difficulty or sexual assault may need immediate medical care. <a href="/health-hub/after-unprotected-sex">Read urgent-care guidance</a>.</aside>'
CTA='<p class="qxl-cta"><a href="tel:+919964639639">Call QXL for a private enquiry: +91 99646 39639</a> · <a href="/sexual-health/packages">View listed test profiles</a></p>'
CONTACT='<section><h2>Collection locations in Bengaluru</h2><p>Main reference laboratory: 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060. North Hub: opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064. Confirm the precise collection facility, service hours, procedural swab availability, price and report turnaround before visiting.</p><p>Accreditation: QXL lists NABL MC-6849; request the current certificate and approved test scope. The organization’s accreditation does not automatically cover every investigation or specimen.</p></section>'
STYLE='''<style>.qxl-sti{max-width:76ch;margin:auto;padding:clamp(1rem,3vw,2rem);line-height:1.65;font:inherit}.qxl-sti h1{line-height:1.2}.qxl-sti h2{margin-top:1.8rem}.qxl-sti a{text-decoration:underline;text-underline-offset:3px}.qxl-sti .qxl-urgent{border-inline-start:4px solid #b45309;padding:.8rem 1rem;background:#fff7ed;color:#431407}.qxl-sti details{border-bottom:1px solid #b5b5b5;padding:.7rem 0}.qxl-sti summary{cursor:pointer;font-weight:600}.qxl-sti .qxl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:1rem}.qxl-sti .qxl-grid a{display:block;padding:.75rem;border:1px solid #b5b5b5;border-radius:.5rem}.qxl-sti table{border-collapse:collapse;width:100%}.qxl-sti th,.qxl-sti td{padding:.6rem;text-align:left;border-bottom:1px solid #b5b5b5}.qxl-sti .qxl-scroll{overflow-x:auto}.qxl-sti a:focus-visible,.qxl-sti summary:focus-visible{outline:3px solid #0f766e;outline-offset:3px}</style>'''
TESTS=[('HIV-1/2 fourth-generation Ag/Ab','Serum / venous blood','QXL-STI-01; listed ₹945, 6 hours; reconfirm'),('Syphilis RPR and TPHA reflex','Serum','QXL-STI-03; quote and confirm reflex policy'),('HBsAg','Serum','Listed in QXL-STI-06; check individual fee'),('Anti-HBs','Serum','Confirm availability, price and scope'),('Total anti-HBc','Serum','Confirm availability, price and scope'),('CT/NG urogenital NAAT','First-catch urine or applicable genital swab','QXL-STI-04; verify assay and sample'),('CT/NG pharyngeal NAAT','Throat swab','QXL-STI-10; verify dual targets, pharyngeal claim and collection'),('CT/NG rectal NAAT','Anorectal swab','QXL-STI-10; verify rectal claim and collection'),('HCV antibody / reflex RNA as indicated','Serum or assay-specific plasma','Confirm RNA access, reflex policy and fees'),('HSV-1/2 lesion NAAT','Active lesion swab','QXL-STI-09; verify specimen and referral pathway'),('CT/NG/Trichomonas NAAT','Assay-specific urine or swab','QXL-STI-05; confirm approved specimens'),('Mycoplasma genitalium NAAT','Assay-specific urine/swab','Clinician-directed; confirm availability')]
def table():
    return '<section><h2>Investigations to discuss with your clinician</h2><p>Not every investigation is appropriate for everyone. Confirm all details before collection.</p><div class="qxl-scroll"><table><caption>Test, specimen and QXL listing status</caption><thead><tr><th scope="col">Test</th><th scope="col">Specimen</th><th scope="col">Availability and fee</th></tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+E(v)+'</td>' for v in r)+'</tr>' for r in TESTS)+'</tbody></table></div></section>'
def schema(p):
    url=BASE+PATH[p['slug']]
    # No review date or Person attribution until clinician approval is recorded.
    return {'@context':'https://schema.org','@graph':[{'@type':'MedicalWebPage','@id':url+'#webpage','url':url,'name':p['title'],'description':p['answer'],'inLanguage':'en-IN','publisher':{'@id':BASE+'/#organization'},'breadcrumb':{'@id':url+'#breadcrumbs'}},{'@type':'BreadcrumbList','@id':url+'#breadcrumbs','itemListElement':[{'@type':'ListItem','position':i,'name':n,'item':u} for i,(n,u) in enumerate([('Home',BASE+'/'),('Sexual health',BASE+HUB),(p['title'],url)],1)]}]}
def faq_schema(p):
    return {'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in p['faqs']]}
def script(d):return '<script type="application/ld+json">'+json.dumps(d,ensure_ascii=False).replace('<','\\u003c')+'</script>'
def fragment(p):
    s=p['slug']; refs=REFMAP.get(s,'sti naco').split(); faq=''.join(f'<details><summary>{E(q)}</summary><p>{E(a)}</p></details>' for q,a in p['faqs']); related=''.join(f'<li><a href="{PATH[r]}">{E(BY[r]["title"])}</a></li>' for r in p['related']); source=''.join(f'<li><a href="{REFS[r][1]}">{E(REFS[r][0])}</a></li>' for r in refs)
    clinical_only=s=='urgent-medical-support'
    return f'''<article class="qxl-sti"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="{HUB}">Sexual health</a></nav><h1>{E(p['title'])}</h1>{URGENT}<section><h2>Quick clinical answer</h2><p>{E(p['answer'])}</p></section><section><h2>What to do next</h2><p>{E(p['guidance'])}</p></section>{table() if s in ('sti-testing-after-unprotected-sex','sti-testing-after-oral-sex','sti-test-cost-bangalore') else ''}<section><h2>Frequently asked questions</h2>{faq}</section><section><h2>Related clinical guides</h2><ul>{related}{'' if clinical_only else f'<li><a href="{PACKAGES}">Sexual health test profiles</a></li>'}</ul></section>{'' if clinical_only else CTA+CONTACT}<section><h2>Clinical references</h2><ul>{source}</ul><p>General educational information, not an individual diagnosis or prescription. Seek a qualified clinician for personal advice.</p></section></article>'''
def full(p):
    url=BASE+PATH[p['slug']]; desc=p['answer'][:157].rsplit(' ',1)[0].rstrip('.,;')+'…' if len(p['answer'])>160 else p['answer'];
    # noindex safety latch. Developer removes NOINDEX ONLY after clinical + operational approval.
    return f'''<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(p['title'])} | QXL Diagnostics</title><meta name="description" content="{E(desc)}"><link rel="canonical" href="{url}"><meta name="robots" content="noindex, follow"><meta name="referrer" content="no-referrer"><meta property="og:type" content="website"><meta property="og:locale" content="en_IN"><meta property="og:title" content="{E(p['title'])}"><meta property="og:description" content="{E(desc)}"><meta property="og:url" content="{url}">{STYLE}{script(schema(p))}{script(faq_schema(p))}</head><body>{fragment(p)}</body></html>'''
for p in PAGES:
    f=ROOT/'draft-pages'/ (p['slug']+'.html'); f.write_text(full(p),encoding='utf-8')
# A single hub fragment to merge into existing sexual-health page, not a second hub.
GROUPS=[('After sexual exposure',0,9),('Symptoms and differential diagnosis',9,16),('Specific tests and infections',16,25),('Sample collection, reports and follow-up',25,29),('Partners, pregnancy and urgent care',29,33),('Confidential testing and booking',33,36),('Other exposure and inclusive care',36,len(PAGES))]
links=''.join('<section><h2>'+E(n)+'</h2><div class="qxl-grid">'+''.join(f'<a href="{PATH[p["slug"]]}">{E(p["title"])}</a>' for p in PAGES[a:b])+'</div></section>' for n,a,b in GROUPS)
(ROOT/'hub-integration.html').write_text(STYLE+f'<section class="qxl-sti" id="sexual-health-guide"><h2>Sexual Health Knowledge and Diagnostic Centre</h2><p>Confidential guidance on STI testing after unprotected sex, symptoms, testing windows, blood tests and site-specific PCR in Bengaluru.</p>{URGENT}{CTA}{links}</section>',encoding='utf-8')
(ROOT/'package-card.html').write_text('''<section id="oral-exposure-testing"><h2>STI Screening After Oral Sex – Throat Swab PCR &amp; Comprehensive Blood Testing</h2><p>Explore throat gonorrhoea NAAT, chlamydia testing where appropriate, fourth-generation HIV, RPR/TPHA, hepatitis B triple panel and first-catch urine testing based on exposure. Confirm assay validation, price, collection site and clinical indications with QXL.</p><a href="/sexual-health/sti-testing-after-oral-sex">View targeted post-exposure testing guide</a> · <a href="/packages/oral-rectal-sti-screening">See QXL-STI-10 listing</a></section>''',encoding='utf-8')
(ROOT/'developer-only'/'content-registry.json').write_text(json.dumps([dict(p,path=PATH[p['slug']],status='draft_clinical_review_required',clinicalReviewDate=None,clinicalReviewer=None,canonical=BASE+PATH[p['slug']]) for p in PAGES],ensure_ascii=False,indent=2),encoding='utf-8')
with (ROOT/'developer-only'/'route-manifest.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f);w.writerow(['slug','proposed or existing route','title','action','status']);w.writerows((p['slug'],PATH[p['slug']],p['title'],'UPDATE existing' if p['slug'] in EXISTING else 'Audit equivalence before creating','DRAFT ONLY') for p in PAGES)
print('Generated',len(PAGES),'draft pages; hub and package fragments.')
