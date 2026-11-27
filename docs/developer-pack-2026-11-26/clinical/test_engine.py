import unittest
from engine import Rule,interpret,rcv,cardiovascular_assessment
class TestClinical(unittest.TestCase):
 def test_no_approval(self): self.assertEqual(interpret('X',1,'u','m','p',None)['status'],'MEDICAL_REVIEW_REQUIRED')
 def test_invalid(self): self.assertEqual(interpret('X',float('nan'),'u','m','p',None)['status'],'INVALID_INPUT')
 def test_units(self):
  r=Rule('LPA','nmol/L','m','p',None,1,'synthetic','v','test',True)
  self.assertEqual(interpret('LPA',1,'mg/dL','m','p',r)['status'],'NOT_COMPARABLE')
 def test_synthetic_threshold(self):
  r=Rule('X','u','m','p',0,1,'synthetic','v','test',True)
  self.assertEqual(interpret('X',2,'u','m','p',r)['status'],'ABOVE_LIMIT')
 def test_rcv(self):
  self.assertEqual(rcv(100,150,cva_percent=2,cvi_percent=5,comparable=True,approved=True,source='synthetic')['status'],'CHANGE_EXCEEDS_RCV')
 def test_rcv_zero(self): self.assertEqual(rcv(0,2,cva_percent=2,cvi_percent=5,comparable=True,approved=True,source='synthetic')['status'],'INVALID_INPUT')
 def test_risk_disabled(self): self.assertIsNone(cardiovascular_assessment(acute_symptoms=False,known_cvd=False)['risk'])
 def test_urgent(self): self.assertEqual(cardiovascular_assessment(acute_symptoms=True,known_cvd=False)['status'],'URGENT_ASSESSMENT')
 def test_missing(self): self.assertEqual(cardiovascular_assessment(acute_symptoms=None,known_cvd=False)['status'],'CLINICIAN_REVIEW_REQUIRED')
if __name__=='__main__': unittest.main()
