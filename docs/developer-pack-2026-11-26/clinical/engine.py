"""Reference clinical engine. No clinical rules are enabled by default.
Use authorised lab reports and signed configuration, never anonymous client supplied rules.
"""
from dataclasses import dataclass
from math import isfinite, sqrt
from statistics import NormalDist

@dataclass(frozen=True)
class Rule:
    marker: str
    unit: str
    method: str
    population: str
    lower: float | None
    upper: float | None
    source: str
    version: str
    reviewer_id: str
    approved: bool = False

# No silent unit conversion; Lp(a) specifically has no fixed mg/dL to nmol/L conversion.
def interpret(marker, value, unit, method, population, rule: Rule | None):
    if isinstance(value, bool) or not isinstance(value, (int,float)) or not isfinite(value):
        return {"status":"INVALID_INPUT"}
    if not rule or not rule.approved or not all([rule.source,rule.version,rule.reviewer_id]):
        return {"status":"MEDICAL_REVIEW_REQUIRED"}
    if (marker,unit,method,population)!=(rule.marker,rule.unit,rule.method,rule.population):
        return {"status":"NOT_COMPARABLE"}
    limits=[v for v in (rule.lower,rule.upper) if v is not None]
    if not limits or not all(isfinite(v) for v in limits) or (rule.lower is not None and rule.upper is not None and rule.lower>rule.upper):
        return {"status":"INVALID_RULE"}
    flag="ABOVE_LIMIT" if rule.upper is not None and value>rule.upper else "BELOW_LIMIT" if rule.lower is not None and value<rule.lower else "WITHIN_CONFIGURED_LIMITS"
    return {"status":flag,"source":rule.source,"version":rule.version,"requires_clinical_review":True,"diagnosis":None}

def rcv(previous,current,*,cva_percent,cvi_percent,comparable,approved,source,confidence=0.95):
    """Symmetric RCV only for medically approved approximately Gaussian, stable conditions.
    CVa/CVi in %, not fraction. For skewed analytes use a separately validated asymmetric RCV.
    comparable includes same assay, specimen, units, physiological context, stable patient, QC.
    """
    vals=(previous,current,cva_percent,cvi_percent,confidence)
    if not all(isinstance(v,(int,float)) and not isinstance(v,bool) and isfinite(v) for v in vals) or previous<=0 or current<=0 or not 0<confidence<1 or min(cva_percent,cvi_percent)<0 or max(cva_percent,cvi_percent)>100:
        return {"status":"INVALID_INPUT"}
    if not comparable or not approved or not source or cva_percent==cvi_percent==0:
        return {"status":"MEDICAL_REVIEW_REQUIRED"}
    z=NormalDist().inv_cdf((1+confidence)/2)
    threshold=z*sqrt(2)*sqrt(cva_percent**2+cvi_percent**2)
    delta=100*(current-previous)/previous
    return {"status":"CHANGE_EXCEEDS_RCV" if abs(delta)>threshold else "CHANGE_WITHIN_RCV","delta_percent":delta,"rcv_percent":threshold,"source":source,"requires_clinical_review":True,"diagnosis":None}

def cardiovascular_assessment(*,acute_symptoms,known_cvd,model_id=None,approved_model=None,inputs=None):
    # acute symptom screen must be clinician-approved and explicitly answered; false does not rule out ACS.
    if acute_symptoms is True:
        return {"status":"URGENT_ASSESSMENT","message":"Seek urgent medical care; do not wait for a risk score or home blood collection."}
    if acute_symptoms is not False or known_cvd is not False:
        return {"status":"CLINICIAN_REVIEW_REQUIRED","risk":None}
    # No invented QXL risk score. Registry is server-side, signed, and inactive until validation.
    if model_id!="WHO_SOUTH_ASIA_2019_LAB" or approved_model is None:
        return {"status":"MODEL_NOT_ENABLED","risk":None}
    return approved_model(inputs) # approved adapter owns all eligibility, valid inputs, units, population and boundaries
