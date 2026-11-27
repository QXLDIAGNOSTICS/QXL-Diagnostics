"""Executable staging HTTP contract smoke tests. Requires explicit opt-in, mapped endpoints and synthetic fixtures.
Not an ITDOSE integration implementation. Never run against QXL production.
Environment: QXL_STAGING_BASE, QXL_ALLOW_SYNTHETIC=YES, QXL_TEST_TOKEN_A, QXL_TEST_REPORT_B_PATH,
QXL_TEST_PRIVATE_REPORT_A_PATH, QXL_TEST_SERVICEABILITY_PATH (GET route), QXL_TEST_INVALID_PIN_QUERY.
"""
import os,unittest,urllib.request,urllib.error,urllib.parse,json
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kw):return None
class Contract(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.base=os.environ.get('QXL_STAGING_BASE','').rstrip('/');p=urllib.parse.urlsplit(cls.base)
  if os.environ.get('QXL_ALLOW_SYNTHETIC')!='YES' or p.scheme!='https' or not p.hostname or not any(s in p.hostname.split('.') for s in ('staging','sandbox','test')):raise unittest.SkipTest('Explicit HTTPS staging/sandbox/test host and opt-in required')
  required=['QXL_TEST_TOKEN_A','QXL_TEST_REPORT_B_PATH','QXL_TEST_PRIVATE_REPORT_A_PATH','QXL_TEST_SERVICEABILITY_PATH','QXL_TEST_INVALID_PIN_QUERY']
  if any(not os.getenv(k) for k in required):raise unittest.SkipTest('Map all staging routes and fixtures first')
  cls.opener=urllib.request.build_opener(NoRedirect())
 def req(self,path,token=None):
  if not path.startswith('/') or path.startswith('//'):raise ValueError('Relative route required')
  url=self.base+path
  r=urllib.request.Request(url,headers={'Authorization':'Bearer '+token} if token else {})
  try:
   with self.opener.open(r,timeout=15) as f:return f.status,dict(f.headers.items()),f.read(100000)
  except urllib.error.HTTPError as e:return e.code,dict(e.headers.items()),e.read(100000)
 def test_cross_patient(self):self.assertIn(self.req(os.environ['QXL_TEST_REPORT_B_PATH'],os.environ['QXL_TEST_TOKEN_A'])[0],(403,404))
 def test_no_auth(self):self.assertIn(self.req(os.environ['QXL_TEST_PRIVATE_REPORT_A_PATH'])[0],(401,403,404))
 def test_report_no_store(self):
  status,h,_=self.req(os.environ['QXL_TEST_PRIVATE_REPORT_A_PATH'],os.environ['QXL_TEST_TOKEN_A']);self.assertEqual(status,200);self.assertIn('no-store',{k.lower():v for k,v in h.items()}.get('cache-control',''))
 def test_invalid_pin(self):
  status,_,body=self.req(os.environ['QXL_TEST_SERVICEABILITY_PATH']+'?'+os.environ['QXL_TEST_INVALID_PIN_QUERY']);self.assertIn(status,(400,422));self.assertNotIn(b'PROVISIONALLY_ELIGIBLE',body)
if __name__=='__main__':unittest.main()
