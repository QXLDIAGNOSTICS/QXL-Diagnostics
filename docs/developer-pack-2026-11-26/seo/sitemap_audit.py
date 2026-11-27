#!/usr/bin/env python3
"""Read-only sitemap inventory, comparison, and sampled HTTP validation.
Usage: python sitemap_audit.py --old previous_urls.csv --out audit --check-limit 0
Old CSV must have url column; use pre-deploy archive, CMS and GSC exports combined.
--check-limit 0 = all current and removed URLs; default 25. Respect production rate limits.
"""
import argparse,csv,time,xml.etree.ElementTree as ET,urllib.request,urllib.error,urllib.parse,re
from collections import Counter
from pathlib import Path
from html.parser import HTMLParser
BASE='https://qxldiagnostics.com'; HOST='qxldiagnostics.com'
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kw): return None
opener=urllib.request.build_opener(NoRedirect())
def allowed(url):
 p=urllib.parse.urlsplit(url); return p.scheme=='https' and p.hostname in (HOST,'www.'+HOST) and not p.username and not p.password and p.port in (None,443)
def public_url(url):
 return allowed(url) and not re.match(r'^/(api|admin|dashboard|account|patient|profile|login|my-bookings|my-reports|report|reports|checkout|cart)(/|$)',urllib.parse.urlsplit(url).path,re.I)
def fetch(url):
 if not public_url(url): raise ValueError('Non-public or external URL blocked')
 req=urllib.request.Request(url,headers={'User-Agent':'QXL-Authorized-ReadOnly-Audit/1.0'})
 try:
  with opener.open(req,timeout=20) as f: return f.status,dict(f.headers.items()),f.read(4_000_000)
 except urllib.error.HTTPError as e: return e.code,dict(e.headers.items()),b''
def inventory(url,seen=None):
 seen=set() if seen is None else seen
 if url in seen: raise ValueError('Repeated or cyclic sitemap: '+url)
 seen.add(url); code,headers,body=fetch(url)
 if code!=200: raise ValueError(f'Sitemap HTTP {code}: {url}')
 root=ET.fromstring(body); kind=root.tag.split('}')[-1]; locs=[x.text.strip() for x in root.findall('.//{*}loc') if x.text]
 if kind=='urlset': return locs
 if kind!='sitemapindex': raise ValueError('Not a sitemap: '+url)
 return [u for child in locs for u in inventory(child,seen)]
class Head(HTMLParser):
 def __init__(self): super().__init__();self.canon=[];self.robots=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='link' and 'canonical' in a.get('rel','').lower().split(): self.canon.append(a.get('href',''))
  if tag=='meta' and a.get('name','').lower() in ('robots','googlebot'): self.robots.append(a.get('content',''))
def check(url):
 row={'url':url,'status':'','location':'','canonical':'','robots':'','result':''}
 try:
  code,h,b=fetch(url);h={k.lower():v for k,v in h.items()};row['status']=code;row['location']=h.get('location','')
  if code!=200: row['result']='REVIEW_REDIRECT_OR_ERROR';return row
  p=Head();p.feed(b.decode('utf-8',errors='replace'));row['canonical']=' | '.join(p.canon);row['robots']=' | '.join(p.robots+[h.get('x-robots-tag','')]);
  row['result']='PASS_HTML_SIGNALS' if p.canon==[url] and not re.search(r'\b(noindex|none)\b',row['robots'],re.I) and urllib.parse.urlsplit(url).hostname==HOST else 'REVIEW_CANONICAL_OR_NOINDEX'
 except Exception as e: row['result']='FETCH_ERROR: '+str(e)
 return row

def write(path,rows,fields):
 with open(path,'w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--old');ap.add_argument('--out',default='audit');ap.add_argument('--check-limit',type=int,default=25);a=ap.parse_args();out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
 entries=inventory(BASE+'/sitemap.xml');counts=Counter(entries);current=set(entries);old=set()
 if a.old:
  with open(a.old,encoding='utf-8-sig',newline='') as f: old={r['url'].strip() for r in csv.DictReader(f) if r.get('url')}
 write(out/'inventory.csv',[{'url':u,'count':n} for u,n in sorted(counts.items())],['url','count'])
 removed=old-current
 write(out/'removed_review.csv',[{'url':u,'disposition':'REVIEW_REQUIRED','target':'','clinical_owner':'','evidence':''} for u in sorted(removed)],['url','disposition','target','clinical_owner','evidence'])
 candidates=sorted(removed)+sorted(current);candidates=candidates if a.check_limit==0 else candidates[:max(0,a.check_limit)]
 rows=[]
 for u in candidates: rows.append(check(u));time.sleep(0.5)
 write(out/'http_checks.csv',rows,['url','status','location','canonical','robots','result'])
 print(f'Entries {len(entries)}; unique {len(current)}; duplicate entries {len(entries)-len(current)}; removed vs supplied archive {len(removed)}; checked {len(rows)}')
 if not a.old: print('No historical archive supplied: removal impact NOT established.')
 print('HTTP signals only; validate robots permission, internal links, rendered content, redirect destination, Google-selected canonical, index status and clinical equivalence separately.')
if __name__=='__main__':main()
