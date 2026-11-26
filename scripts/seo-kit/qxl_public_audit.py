#!/usr/bin/env python3
"""Read-only public website regression audit. Install: pip install requests beautifulsoup4."""
import argparse, csv, json, re, time, xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import requests
from bs4 import BeautifulSoup

BASE = 'https://qxldiagnostics.com'
HOST = 'qxldiagnostics.com'
PRIORITY = ['/', '/quality-accreditation', '/centers', '/locations', '/locations/bengaluru', '/locations/jp-nagar', '/locations/jayanagar', '/tests', '/apob-test', '/lipoprotein-a', '/lipid-profile-test', '/home-blood-collection-bangalore', '/sexual-health/sti-testing-window-periods', '/specialities/neurology', '/collect']
UA = 'QXL-Public-QA/1.0 (authorized site regression audit)'
S = requests.Session(); S.headers['User-Agent'] = UA

def approved(url):
    u = urlsplit(url)
    return u.scheme == 'https' and u.hostname in {HOST, 'www.'+HOST} and not u.username and not u.password and u.port in (None,443)

def fetch(url):
    history = []
    for _ in range(8):
        if not approved(url): raise ValueError('Off-domain or non-HTTPS URL: '+url)
        r=S.get(url, timeout=25, allow_redirects=False)
        if r.status_code not in (301,302,303,307,308): return r, history
        if not r.headers.get('Location'): raise ValueError('Missing redirect Location')
        target=urljoin(url,r.headers['Location']); history.append([r.status_code,url,target]); url=target
    raise ValueError('Redirect limit exceeded')

def norm(url): return url.rstrip('/') if url != BASE+'/' else BASE

def sitemap(url,seen=None):
    if seen is None: seen=set()
    if url in seen: return []
    seen.add(url); r,_=fetch(url); r.raise_for_status()
    root=ET.fromstring(r.content); kind=root.tag.rsplit('}',1)[-1]
    if kind=='sitemapindex':
        return [u for el in root.findall('{*}sitemap/{*}loc') if el.text for u in sitemap(el.text.strip(),seen)]
    if kind!='urlset': raise ValueError('Not an XML sitemap: '+url)
    return [el.text.strip() for el in root.findall('{*}url/{*}loc') if el.text]

def audit(url):
    row={'requested':url,'final':'','status':'','redirects':'','title':'','description':'','canonical':'','robots':'','h1_count':'','jsonld_count':'','jsonld_invalid':'','hsts':'','csp':'','issues':'','error':''}; issues=[]
    try:
        r,h=fetch(url); row.update(final=r.url,status=r.status_code,redirects=json.dumps(h),hsts=r.headers.get('Strict-Transport-Security',''),csp=r.headers.get('Content-Security-Policy',''))
        if r.status_code!=200: issues.append('HTTP_'+str(r.status_code))
        if h: issues.append('REDIRECTED_URL')
        if any(x[0] not in (301,308) for x in h): issues.append('TEMPORARY_REDIRECT')
        if urlsplit(r.url).hostname!=HOST: issues.append('NON_PREFERRED_HOST')
        if 'html' not in r.headers.get('Content-Type','').lower(): issues.append('NOT_HTML')
        else:
            soup=BeautifulSoup(r.text,'html.parser'); title=soup.title.get_text(' ',strip=True) if soup.title else ''; row['title']=title
            desc=soup.find('meta',attrs={'name':'description'}); row['description']=desc.get('content','') if desc else ''
            cs=soup.select('link[rel~=canonical]'); canonical=urljoin(r.url,cs[0].get('href','')) if cs and cs[0].get('href') else ''; row['canonical']=canonical
            if len(cs)!=1 or not canonical or norm(canonical)!=norm(r.url): issues.append('CANONICAL_MISMATCH')
            robots=' '.join([x.get('content','') for x in soup.find_all('meta',attrs={'name':re.compile(r'^(robots|googlebot|bingbot)$',re.I)})]+[r.headers.get('X-Robots-Tag','')]); row['robots']=robots
            if re.search(r'\b(noindex|none)\b',robots,re.I): issues.append('NOINDEX_REVIEW')
            if not title: issues.append('MISSING_TITLE')
            if not row['description']: issues.append('MISSING_DESCRIPTION')
            if re.search(r'₹\s?\d{4,},\d',title): issues.append('MALFORMED_PRICE')  # e.g. ₹1249,249
            # Homepage titles (old and current) must not be inherited by other pages.
            if any(t in title for t in ('Diagnostic Lab in Bengaluru | NABL Accredited & Doctor-Led','NABL Accredited Diagnostic Lab in Bengaluru | QXL Diagnostics')) and urlsplit(r.url).path not in ('','/'): issues.append('GENERIC_TITLE_REVIEW')
            row['h1_count']=len(soup.find_all('h1'))
            if row['h1_count']!=1: issues.append('H1_REVIEW')
            scripts=soup.find_all('script',type='application/ld+json'); row['jsonld_count']=len(scripts); invalid=0
            for script in scripts:
                try: json.loads(script.string or script.get_text())
                except (ValueError,TypeError): invalid+=1
            row['jsonld_invalid']=invalid
            if invalid: issues.append('INVALID_JSONLD')
            body=soup.get_text(' ',strip=True)
            if 'Universal clinical milestone for definitive exclusion across all global guidelines' in body: issues.append('CLINICAL_CLAIM_REVIEW')
            if '100% Discrete Patient Privacy Guarantee' in body: issues.append('ABSOLUTE_PRIVACY_CLAIM')
            # Do not flag historical references in the accreditation page as current claims.
            if re.search(r'NABL\s+Accredited\s*\(MC-6849\)',body,re.I): issues.append('OLD_ACCREDITATION_REVIEW')
        row['issues']=';'.join(issues)
    except (requests.RequestException,ValueError) as e: row['error']=str(e); row['issues']='FETCH_FAILED'
    return row

def main():
    p=argparse.ArgumentParser(); p.add_argument('--all',action='store_true',help='Audit all unique sitemap URLs; rate-limited'); p.add_argument('--old',type=Path,help='CSV with historical URL column named url'); p.add_argument('--out',type=Path,default=Path('qxl_audit')); p.add_argument('--delay',type=float,default=0.8); a=p.parse_args(); a.out.mkdir(parents=True,exist_ok=True)
    raw=sitemap(BASE+'/sitemap.xml'); current=list(dict.fromkeys(raw)); counts={}
    for u in raw: counts[u]=counts.get(u,0)+1
    with (a.out/'sitemap_inventory.csv').open('w',newline='',encoding='utf-8') as f:
        w=csv.writer(f); w.writerow(['url','occurrences']); w.writerows(counts.items())
    if a.old:
        with a.old.open(newline='',encoding='utf-8-sig') as f: old=list(dict.fromkeys(r['url'].strip() for r in csv.DictReader(f) if r.get('url')))
        with (a.out/'historical_review.csv').open('w',newline='',encoding='utf-8') as f:
            w=csv.writer(f); w.writerow(['url','disposition','replacement','clinical_approval','seo_approval']); w.writerows([u,'REVIEW_REQUIRED','','',''] for u in old if norm(u) not in {norm(v) for v in current})
    urls=current if a.all else [BASE+p for p in PRIORITY]
    rows=[]
    for u in urls:
        rows.append(audit(u)); time.sleep(max(.5,a.delay))
    with (a.out/'public_page_checks.csv').open('w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
    print(json.dumps({'sitemap_entries':len(raw),'unique_urls':len(current),'duplicate_entries':len(raw)-len(current),'pages_checked':len(rows),'pages_flagged':sum(bool(r['issues']) for r in rows),'failed_fetches':sum(bool(r['error']) for r in rows)},indent=2))
    print('Review findings manually. JSON parsing is not full schema validation; no browser rendering or authenticated tests performed.')
if __name__=='__main__': main()
