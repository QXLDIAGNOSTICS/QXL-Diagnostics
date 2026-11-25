# Clinician-directed pathways — medically reviewed articles; packages not yet commercially activated

**Medical article authorisation:** 20 November 2026, Dr. Shantakumar Muruda. **Indicative TAT: Same Day** (QXL management instruction, with test-specific verification required). **Availability:** Test available at QXL Diagnostics. **Unconfirmed details:** Contact QXL Diagnostics Super Speciality Lab Bengaluru; **WhatsApp for Details** using the enquiry links in the package JSON.

**Safety-critical:** None of these packages detects, rules out or screens for pancreatic cancer. They are clinician-selected symptom / physiology assessments. Do not activate checkout until the medical director, laboratory quality team, LIMS team, finance and patient-care leadership have signed off.

| Code | Intended indication | Included core tests | Exclusions / guardrails |
|---|---|---|---|
| QXL-PAN-01 | Hepatobiliary symptoms | CBC, bilirubin total/direct, ALT, AST, ALP, GGT | Jaundice -> urgent clinical evaluation; CA 19-9 not routine |
| QXL-PAN-02 | New diabetes plus weight-loss evaluation | Glucose, HbA1c, CBC, renal and selected liver chemistry | No tumour markers by default; imaging decision belongs to clinician |
| QXL-PAN-03 | Suspected exocrine insufficiency | Faecal elastase-1 | Stool consistency checked; no cancer claim |
| QXL-PAN-04 | Oncology-requested marker monitoring | CA 19-9 (specialist order) | Trend with bilirubin, clinical course and imaging; no early-detection claim |
| QXL-GI-01 | Selected uncomplicated dyspepsia | H. pylori stool antigen, if clinician orders | Check medication interference; not for high-risk symptoms |

## Approval checklist

- [ ] Validate every test code, actual provider, individual same-day cut-off, turnaround time, sample requirements and method against live QXL LIMS and scope.
- [ ] Confirm faecal elastase availability, laboratory methodology, stool transport conditions, sample stability and reporting commentary.
- [ ] Verify CA 19-9 assay, traceability, reference intervals, platform interferences and same-lab trending guidance.
- [ ] Approve clinician ordering criteria, symptom triage and escalation; implement call-centre/WhatsApp emergency exclusion prompts.
- [ ] Add medically reviewed inclusion/exclusion text and clarify no diagnostic or screening guarantee.
- [ ] Approve actual selling price and taxes if any; pricing is intentionally **not** supplied here.
- [ ] Confirm referral pathways to outside imaging / specialist services; do not imply CT/EUS is performed at QXL.
- [ ] Allow patient-facing booking only following approval (`bookingEnabled: true`).

## Existing QXL page corrections suggested

**`/specialities/gastroenterology`:** Rename or rewrite the existing **Pancreatic Wellness Panel**, which currently lists amylase, lipase, FBS, HbA1c and optional CA 19-9. Separate the clinical purposes: pancreatic enzymes -> pancreatitis; glucose -> metabolic evaluation; CA 19-9 -> specialist oncology adjunct. Avoid an implicit cancer-detection promise.

**`/specialities/oncology`:** Clarify that generic male/female/GI tumour-marker panels are **not validated population cancer screening packages**, particularly CA 19-9. Replace language that broadly says tumour-marker testing is suitable for 'early detection' or 'screening guidance' with accurate condition-specific indications.

**Home page oncology promotion:** Review any broadly framed “Early detection saves lives. Know your biomarkers” statement to make clear that most multi-tumour-marker panels do not screen reliably for cancer in asymptomatic people.
