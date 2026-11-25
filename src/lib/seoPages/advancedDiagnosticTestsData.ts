import type { DynamicPageData } from './dynamicPageResolver';

export const advancedDiagnosticTestsData: Record<string, DynamicPageData> = {
  "amh-test": {
    slug: "amh-test",
    title: "AMH (Anti-Mullerian Hormone) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the AMH (Anti-Mullerian Hormone) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "AMH (Anti-Mullerian Hormone) Test",
    subtitle: "AMH is a hormone produced mainly by granulosa cells of small ovarian follicles. In fertility care it is used primarily as a marker of ovarian reserve and to help estimate ovarian response to stimulation. It does not measure egg quality and a single AMH result cannot tell a woman whether she will or will not conceive naturally.",
    price: "1660",
    oldPrice: "2370",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Assay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is generally not required. AMH is less cycle-dependent than FSH and can be tested on any day of the menstrual cycle.",
    turnaroundTime: "12 Hours",
    category: "Fertility and ovarian reserve",
    overview: [
      "AMH (Anti-Müllerian Hormone) is produced mainly by granulosa cells of small preantral and early antral follicles in the ovaries. In clinical fertility care, it serves primarily as a reliable surrogate marker of the recruitable follicular pool and helps specialists estimate ovarian response to stimulation protocols.",
      "Importantly, AMH does not measure egg quality and a single AMH result cannot tell a woman whether she will or will not conceive naturally. The true value of the test comes from using it for a specific clinical question and interpreting it in conjunction with the patient's history, ultrasound antral follicle count (AFC), and age.",
      "Lower AMH generally suggests a smaller recruitable follicle pool and may predict fewer oocytes obtained during ovarian stimulation. Higher AMH often reflects a larger follicle pool and frequently occurs in polycystic ovary syndrome (PCOS); it can also signal an elevated risk of ovarian hyperstimulation syndrome (OHSS). AMH should never be converted into a fixed 'years of fertility left' estimate, as chronological age remains the primary determinant of oocyte quality and reproductive outcome."
    ],
    whenToTest: [
      "Assessment of ovarian reserve during infertility evaluation",
      "Planning ovarian stimulation for IVF or oocyte vitrification (egg freezing)",
      "Estimating risk of poor or excessive ovarian response during assisted reproduction",
      "Baseline assessment before gonadotoxic chemotherapy or ovarian surgery",
      "Supporting evaluation of PCOS when correlated with clinical and ultrasound findings"
    ],
    clinicalSignificance: "AMH reflects the growing pool of preantral and small antral follicles. Because secretion is continuous from these non-cyclic follicles, blood concentrations remain relatively stable throughout the menstrual cycle, offering distinct analytical reproducibility compared to cycle-dependent FSH.",
    limitations: [
      "Different AMH assays and platforms (ECLIA vs ELISA) are not perfectly interchangeable.",
      "AMH is not a direct egg-count or egg-quality test.",
      "A low AMH does not mean natural conception is impossible; a high AMH does not guarantee fertility.",
      "Population screening of women without infertility should not be used to predict time to pregnancy from a single AMH result.",
      "Always use the laboratory's own report, method-specific reference interval and interpretive comments. Do not transfer a cut-off from another laboratory or online article without confirming comparable assay platforms."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain or pressure, major breathing difficulty, fainting, confusion, shock/very low blood pressure, uncontrolled bleeding, rapidly worsening weakness, or any other severe acute illness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Processed on automated chemiluminescence platforms with strict ISO 15189:2022 internal quality controls.",
      "Cycle-independent stability allows blood sample collection on any day of the menstrual cycle.",
      "Free temperature-controlled cold-chain doorstep sample collection across Bengaluru.",
      "Pathologist validation and interpretive guidance by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Optimal Ovarian Reserve (20–35 yrs)", range: "1.5 – 4.0", unit: "ng/mL", interpretation: "normal", note: "Standard responsive follicular reserve" },
      { label: "Diminished Ovarian Reserve", range: "< 1.0", unit: "ng/mL", interpretation: "borderline", note: "May predict lower oocyte yield in stimulation" },
      { label: "Elevated / Polycystic Ovarian Pattern", range: "> 4.0", unit: "ng/mL", interpretation: "abnormal", note: "Commonly seen in PCOS; higher OHSS vigilance" }
    ],
    faqs: [
      {
        question: "Can AMH be tested on any day of the menstrual cycle?",
        answer: "In most situations yes, because AMH varies far less across the menstrual cycle than FSH. However, the result still requires age- and assay-specific clinical interpretation."
      },
      {
        question: "Does low AMH mean infertility?",
        answer: "No. It suggests reduced ovarian reserve and may predict a lower response to ovarian stimulation, but it does not by itself determine whether natural pregnancy can occur."
      },
      {
        question: "Does high AMH mean PCOS?",
        answer: "Not by itself. High AMH is frequently observed in PCOS due to an abundance of small antral follicles, but PCOS is diagnosed using clinical, biochemical, and ultrasound criteria rather than AMH alone."
      },
      {
        question: "Can supplements increase AMH?",
        answer: "A minor fluctuation in a laboratory value does not necessarily mean the true ovarian follicle pool has increased. Patients should exercise caution regarding commercial products marketed as 'AMH boosters'."
      },
      {
        question: "Is AMH an egg-quality test?",
        answer: "No. Egg quality is governed primarily by maternal age and chromosome segregation fidelity, which cannot be measured by AMH."
      },
      {
        question: "When is AMH most useful?",
        answer: "It is most useful in fertility treatment planning, especially for predicting ovarian responsiveness and tailoring individualized stimulation medication dosages."
      }
    ],
    relatedTests: ["cortisol-test", "dhea-s-test", "testosterone-shbg-profile", "17-oh-progesterone-test"],
    doctorNote: "AMH provides invaluable quantitative insight into the recruitable ovarian follicle pool for reproductive planning and IVF stimulation protocols. However, it is essential for patients to understand that AMH does not assess oocyte quality, which remains strictly age-dependent. Every result must be correlated clinically with ultrasound antral follicle counts and clinical history.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "ACOG Committee Opinion No. 773: The Use of Antimüllerian Hormone in Women Not Seeking Fertility Care (Obstet Gynecol 2019)."
    ]
  },

  "cortisol-test": {
    slug: "cortisol-test",
    title: "Cortisol Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Cortisol test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "Cortisol Test",
    subtitle: "Cortisol is the main glucocorticoid produced by the adrenal cortex. It follows a strong daily rhythm and rises with physical or psychological stress. Because timing matters, a random cortisol value can be difficult to interpret; the correct test depends on whether the concern is cortisol deficiency or cortisol excess.",
    price: "590",
    oldPrice: "840",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Immunoassay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Morning sample (strictly between 8:00 AM – 9:00 AM) is recommended for basal evaluation. Overnight fasting (8–10 hours) preferred.",
    turnaroundTime: "6 Hours",
    category: "Adrenal and pituitary function",
    overview: [
      "Cortisol is the principal glucocorticoid hormone synthesised by the zona fasciculata of the adrenal cortex under pituitary adrenocorticotropic hormone (ACTH) control. It plays a critical role in glucose metabolism, vascular tone regulation, immune response modulation, and the physiological response to stress.",
      "Circulating cortisol exhibits a pronounced circadian rhythm, typically peaking within 30 to 60 minutes after waking (morning peak) and declining progressively to nadir levels around midnight. Physical illness, anxiety, pain, sleep disruption, pregnancy, estrogen therapies, and exogenous glucocorticoids can substantially perturb normal levels.",
      "Because physiological timing is critical, a random cortisol measurement is rarely diagnostic on its own. Clinicians select specific morning tests when evaluating suspected adrenal insufficiency, while late-night salivary cortisol, 24-hour urinary free cortisol, or low-dose dexamethasone suppression tests are chosen when investigating hypercortisolemia (Cushing syndrome)."
    ],
    whenToTest: [
      "Suspected adrenal insufficiency (Addison disease) or acute adrenal crisis",
      "Investigation of hypercortisolism (Cushing syndrome)",
      "Evaluation of pituitary-adrenal axis disorders or hypothalamic pathology",
      "Monitoring therapeutic response in selected endocrine replacement regimens",
      "Dynamic diagnostic protocols including ACTH stimulation or dexamethasone suppression"
    ],
    clinicalSignificance: "Basal morning cortisol reflects physiological hypothalamic-pituitary-adrenal axis responsiveness. A low morning concentration warrants prompt confirmatory dynamic evaluation (ACTH stimulation test) to rule out life-threatening glucocorticoid deficiency.",
    limitations: [
      "Total serum cortisol measurements are directly influenced by alterations in Cortisol-Binding Globulin (CBG).",
      "Exogenous glucocorticoids (oral, topical, inhaled, or injected) can suppress endogenous secretion and cross-react in immunoassays.",
      "Acute physiological illness and emotional stress can elevate cortisol concentrations markedly.",
      "Diagnostic decision cut-offs depend strictly on precise collection timing, assay methodology, and dynamic stimulation protocols.",
      "Always interpret findings using QXL's validated method-specific intervals. Never apply external thresholds without confirming assay comparability."
    ],
    urgentCareWarning: "Severe weakness accompanied by vomiting, dehydration, confusion, collapse, or profound low blood pressure can indicate life-threatening adrenal crisis and requires immediate emergency hospital resuscitation. Do not wait for outpatient test turnaround.",
    whyImportant: [
      "Automated high-sensitivity immunoassay providing rapid 6-hour turnaround time.",
      "Standardised morning home phlebotomy scheduling to ensure circadian sample integrity.",
      "Immediate pathologist review and critical alert notification for severe hypocortisolemia.",
      "Verified against Endocrine Society clinical practice guidelines."
    ],
    referenceRanges: [
      { label: "Morning Peak (7:00 AM – 9:00 AM)", range: "6.0 – 19.4", unit: "µg/dL", interpretation: "normal", note: "Standard physiological morning waking peak" },
      { label: "Evening Nadir (4:00 PM – 8:00 PM)", range: "2.3 – 11.9", unit: "µg/dL", interpretation: "normal", note: "Expected physiological circadian decline" }
    ],
    faqs: [
      {
        question: "Why does the time of day matter?",
        answer: "Cortisol normally peaks shortly after waking and falls steadily toward midnight. The identical numerical result can indicate normal physiology at 8:00 AM but pathological excess at 11:00 PM."
      },
      {
        question: "Can stress increase cortisol?",
        answer: "Yes. Acute pain, severe emotional anxiety, infection, recent surgery, sleep deprivation, and strenuous exercise all stimulate the hypothalamic-pituitary-adrenal axis to release cortisol."
      },
      {
        question: "Can steroid medicines affect the result?",
        answer: "Yes. Oral, injected, inhaled, topical, and nasal glucocorticoids suppress endogenous adrenal production and can interfere analytically with assay antibodies. Inform your doctor of all steroid use."
      },
      {
        question: "Does a high cortisol result prove Cushing syndrome?",
        answer: "No. Hypercortisolemia can result from acute stress, illness, or elevated binding globulins. Establishing Cushing syndrome requires validated screening (dexamethasone suppression, 24-hr urinary free cortisol, or midnight salivary cortisol) followed by confirmatory workup."
      },
      {
        question: "What symptoms can occur with low cortisol?",
        answer: "Chronic fatigue, unexplained weight loss, loss of appetite, nausea, orthostatic dizziness, low blood pressure, and salt craving may occur, though these symptoms are nonspecific."
      },
      {
        question: "When is low cortisol an emergency?",
        answer: "Severe prostration with recurrent vomiting, abdominal pain, severe dehydration, disorientation, or circulatory collapse indicates acute adrenal crisis requiring immediate emergency hospital care."
      }
    ],
    relatedTests: ["acth-test", "dhea-s-test", "aldosterone-renin-ratio-test", "17-oh-progesterone-test"],
    doctorNote: "Cortisol is among the most clinically sensitive analytes in endocrinology, and collection timing is everything. A morning draw strictly between 8:00 and 9:00 AM is essential for evaluating adrenal reserve. In cases of borderline low values, dynamic ACTH stimulation testing is recommended rather than relying on a single static number.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: Diagnosis and Treatment of Primary Adrenal Insufficiency (J Clin Endocrinol Metab 2016)."
    ]
  },

  "psa-total-free": {
    slug: "psa-total-free",
    title: "PSA Total + Free PSA Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the PSA Total + Free PSA test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "PSA Total + Free PSA Test",
    subtitle: "Prostate-specific antigen (PSA) is produced by prostate tissue. Total PSA is the usual first blood marker used in prostate-cancer risk assessment and follow-up. Free PSA is the unbound fraction of circulating PSA; the free-to-total PSA percentage can sometimes help refine cancer risk when total PSA is in an intermediate range. PSA is prostate-specific, not cancer-specific.",
    price: "1250",
    oldPrice: "1780",
    discountPercent: "30% OFF",
    parametersCount: "Dual Marker Panel (Total PSA + Free PSA + % Free PSA)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required. Avoid ejaculation, vigorous bicycle riding, digital rectal examination, or urethral catheterisation for 48 hours prior to blood draw.",
    turnaroundTime: "6–12 Hours",
    category: "Prostate health",
    overview: [
      "Prostate-Specific Antigen (PSA) is a serine protease produced by the secretory epithelium of the prostate gland. Its physiological role is liquefaction of the seminal coagulum. Small quantities diffuse into the vascular system, where PSA circulates in both complexed form (bound to alpha-1-antichymotrypsin) and uncomplexed form (Free PSA).",
      "Total PSA measures both bound and unbound fractions. While widely utilized in prostate cancer risk evaluation, PSA is strictly tissue-specific rather than cancer-specific. Serum concentrations frequently rise in benign prostatic hyperplasia (BPH), acute or chronic prostatitis, urinary retention, and following mechanical prostate manipulation.",
      "Free PSA represents the unbound fraction. In men with an intermediate Total PSA (typically 4.0 to 10.0 ng/mL, the diagnostic 'grey zone'), the calculated Free-to-Total PSA percentage (% Free PSA) provides significant diagnostic discrimination: a lower percentage of Free PSA correlates with a higher probability of clinically significant prostate cancer, helping urologists decide whether multi-parametric MRI or biopsy is warranted."
    ],
    whenToTest: [
      "Shared clinical decision-making for prostate cancer screening in eligible men aged 50–70 (or from age 40–45 with family history)",
      "Evaluation of abnormal Total PSA in the 4.0 – 10.0 ng/mL diagnostic range",
      "Assessment of lower urinary tract symptoms (hesitancy, weak stream, nocturia)",
      "Post-treatment monitoring following radical prostatectomy, radiation, or androgen deprivation therapy",
      "Differentiating benign prostatic enlargement from malignant risk alongside clinical examination"
    ],
    clinicalSignificance: "Percent Free PSA (%fPSA) significantly enhances clinical specificity in the 4.0–10.0 ng/mL Total PSA range. Men with %fPSA < 10% carry an estimated 49–56% risk of prostate cancer, whereas %fPSA > 25% reduces risk to less than 10%, often sparing patients unnecessary invasive biopsies.",
    limitations: [
      "Elevations occur frequently in non-malignant conditions including benign enlargement, infection, and urinary retention.",
      "A normal PSA level does not completely exclude prostate malignancy (false-negative rate ~15%).",
      "Free PSA interpretation is valid only when Total PSA is within the designated diagnostic range (4.0–10.0 ng/mL).",
      "Screening decisions must be rooted in shared decision-making rather than unselective mass screening.",
      "5-alpha reductase inhibitors (finasteride, dutasteride) halve serum PSA levels and require baseline doubling for clinical comparison."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for acute urinary retention, high fever with severe perineal pain, gross hematuria, or inability to pass urine. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Simultaneous quantitative chemiluminescence measurement of both Total and Free fractions on the identical platform.",
      "Automated algorithmic calculation of Free-to-Total PSA percentage.",
      "Strict pre-analytical guidelines to eliminate mechanical and procedural false positives.",
      "Aligned with American Urological Association (AUA) and European Association of Urology (EAU) guidelines."
    ],
    referenceRanges: [
      { label: "Total PSA (Men < 50 yrs)", range: "0.0 – 2.5", unit: "ng/mL", interpretation: "normal", note: "Age-stratified baseline" },
      { label: "Total PSA (Men 50–70 yrs)", range: "0.0 – 4.0", unit: "ng/mL", interpretation: "normal", note: "Standard clinical threshold" },
      { label: "Total PSA Grey Zone", range: "4.0 – 10.0", unit: "ng/mL", interpretation: "borderline", note: "Free PSA % required for risk stratification" },
      { label: "Free PSA % (> 25%)", range: "> 25%", unit: "ratio", interpretation: "normal", note: "Low probability of prostate cancer (~8%)" },
      { label: "Free PSA % (< 10%)", range: "< 10%", unit: "ratio", interpretation: "abnormal", note: "High probability of prostate cancer (~50%)" }
    ],
    faqs: [
      {
        question: "Does a high PSA mean prostate cancer?",
        answer: "No. Benign prostatic hyperplasia (BPH), acute prostatitis, urinary tract infections, retention, and recent mechanical procedures can also significantly elevate Total PSA."
      },
      {
        question: "Why measure free PSA?",
        answer: "When Total PSA falls between 4.0 and 10.0 ng/mL, the percentage of Free PSA helps distinguish benign enlargement from malignant risk, assisting the doctor in determining whether a biopsy or MRI is indicated."
      },
      {
        question: "Should an elevated PSA be repeated?",
        answer: "Yes. Current urological guidelines recommend confirming any newly elevated PSA with a repeat blood test several weeks later under resting conditions before proceeding to secondary biomarkers, MRI, or biopsy."
      },
      {
        question: "Can finasteride or dutasteride affect PSA?",
        answer: "Yes. 5-alpha-reductase inhibitors typically reduce circulating PSA by approximately 50% after 6 months. Clinicians double the measured value to gauge true baseline risk."
      },
      {
        question: "Is PSA a screening test or diagnostic test?",
        answer: "It is a risk-stratification and monitoring biomarker. Definitive diagnosis of prostate cancer requires urological evaluation, imaging (such as mpMRI), and histological confirmation via biopsy."
      },
      {
        question: "What should I do if PSA is high?",
        answer: "Discuss the result with a qualified urologist. The next steps will depend on your age, symptoms, physical examination, PSA trajectory, and family medical history."
      }
    ],
    relatedTests: ["ca-125-test", "cea-test", "afp-test"],
    doctorNote: "PSA is prostate-specific, never cancer-specific. An elevated number is an invitation for clinical correlation, not panic. Calculating the free-to-total PSA ratio in the 4–10 ng/mL window provides critical diagnostic nuance that spares many men unnecessary tissue biopsies.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "AUA/SUO Guideline: Early Detection of Prostate Cancer (J Urol 2023)."
    ]
  },

  "dhea-s-test": {
    slug: "dhea-s-test",
    title: "DHEA-S (Dehydroepiandrosterone Sulfate) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the DHEA-S (Dehydroepiandrosterone Sulfate) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "DHEA-S (Dehydroepiandrosterone Sulfate) Test",
    subtitle: "DHEA-S is an androgen produced predominantly by the adrenal glands. Because it is relatively stable in blood and much less influenced by short-term fluctuations than unconjugated DHEA, it is useful when evaluating adrenal androgen excess or deficiency.",
    price: "880",
    oldPrice: "1250",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Immunoassay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is generally not required. Morning sample is preferred. Inform the laboratory of any DHEA or steroid supplement use.",
    turnaroundTime: "12 Hours",
    category: "Adrenal androgen evaluation",
    overview: [
      "Dehydroepiandrosterone sulfate (DHEA-S) is a 19-carbon steroid and the most abundant circulating steroid hormone in humans. Unlike unconjugated DHEA, which is produced by both adrenal glands and gonads, more than 95% of DHEA-S originates in the zona reticularis of the adrenal cortex under sulfotransferase enzyme action.",
      "Because DHEA-S binds strongly to albumin and has a slow metabolic clearance rate (half-life of 10 to 20 hours), it exhibits virtually no diurnal variation and circulates at micromolar concentrations without the rapid pulsatile fluctuations of cortisol or testosterone.",
      "Clinically, DHEA-S serves as the gold-standard biochemical marker of adrenal androgen production. It is central to evaluating clinical hyperandrogenism in women (excessive facial or body hair, adult-onset cystic acne, androgenic alopecia, ovulatory dysfunction) and distinguishing adrenal pathology from ovarian sources such as PCOS."
    ],
    whenToTest: [
      "Evaluation of hirsutism, severe acne, or signs of virilisation in women",
      "Differential diagnosis of Polycystic Ovary Syndrome (PCOS) versus adrenal hyperandrogenism",
      "Workup of suspected androgen-secreting adrenal adenoma or carcinoma",
      "Investigation of premature adrenarche or precocious puberty in paediatric patients",
      "Adjunctive assessment of adrenal functional reserve in secondary adrenal insufficiency"
    ],
    clinicalSignificance: "Markedly elevated DHEA-S (> 700–800 µg/dL in women) raises strong suspicion of autonomous adrenal overproduction, prompting imaging to rule out adrenal tumours. Moderate elevations are typical in non-neoplastic conditions such as PCOS or functional adrenal hyperandrogenism.",
    limitations: [
      "Age-stratified reference intervals are mandatory; DHEA-S peaks in the third decade of life and declines steadily thereafter (adrenopause).",
      "Over-the-counter DHEA nutritional supplements artificially elevate blood concentrations.",
      "DHEA-S establishes the adrenal origin of androgens but does not differentiate benign hyperplasia from rare malignancies on its own.",
      "Results must always be interpreted in conjunction with total and free testosterone, 17-OHP, and clinical symptoms."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain or pressure, major breathing difficulty, fainting, confusion, shock/very low blood pressure, uncontrolled bleeding, rapidly worsening weakness, or any other severe acute illness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Long analytical half-life ensures reliable, reproducible single-sample assessment.",
      "Validated automated chemiluminescence methodology with age- and sex-adjusted intervals.",
      "Integrated testing workflows with Total Testosterone, SHBG, and 17-OHP for complete androgen mapping.",
      "Reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Women (20–29 yrs)", range: "65 – 380", unit: "µg/dL", interpretation: "normal", note: "Peak reproductive age range" },
      { label: "Women (30–39 yrs)", range: "45 – 270", unit: "µg/dL", interpretation: "normal", note: "Age-associated decline" },
      { label: "Men (20–39 yrs)", range: "160 – 449", unit: "µg/dL", interpretation: "normal", note: "Standard male reference interval" }
    ],
    faqs: [
      {
        question: "Why is DHEA-S useful in women with excess facial hair?",
        answer: "DHEA-S is produced almost exclusively by the adrenal glands. Measuring it helps doctors identify whether androgen overproduction is originating from the adrenal cortex or ovaries."
      },
      {
        question: "Is DHEA-S the same as testosterone?",
        answer: "No. Both are androgens, but DHEA-S is an adrenal precursor with weak intrinsic androgenic activity that converts peripherally into active testosterone and estrogens."
      },
      {
        question: "Can PCOS raise DHEA-S?",
        answer: "Yes, mild to moderate elevations occur in approximately 20–30% of women with PCOS due to functional adrenal hyperandrogenism. Extremely high levels warrant imaging to exclude adrenal lesions."
      },
      {
        question: "Does low DHEA-S prove adrenal insufficiency?",
        answer: "No. While low values can accompany adrenal insufficiency or aging, morning cortisol, ACTH, and dynamic stimulation testing are required for formal diagnosis."
      },
      {
        question: "Does age affect DHEA-S?",
        answer: "Significantly. DHEA-S concentrations peak around ages 20 to 24 and decline by roughly 10% per decade. Age-matched reference ranges are indispensable."
      },
      {
        question: "Should I stop DHEA supplements before testing?",
        answer: "Yes, nutritional DHEA supplements directly elevate test results. Always inform your doctor before altering prescribed medical therapies."
      }
    ],
    relatedTests: ["testosterone-shbg-profile", "17-oh-progesterone-test", "cortisol-test", "acth-test"],
    doctorNote: "DHEA-S provides an exceptional, stable window into adrenal androgen synthesis because of its prolonged biological half-life. When investigating female hirsutism or irregular menses, pairing DHEA-S with total testosterone and 17-OHP effectively isolates the anatomical source of androgen excess.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: Evaluation and Treatment of Hirsutism in Premenopausal Women (J Clin Endocrinol Metab 2018)."
    ]
  },

  "testosterone-shbg-profile": {
    slug: "testosterone-shbg-profile",
    title: "Free Testosterone / Total Testosterone + SHBG Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Free Testosterone / Total Testosterone + SHBG test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "Free Testosterone / Total Testosterone + SHBG Profile",
    subtitle: "Total testosterone measures bound plus unbound testosterone. SHBG is the principal high-affinity binding protein. Free or calculated free testosterone can add clinically useful information when SHBG is unusually high or low, or when symptoms and total testosterone do not agree.",
    price: "1850",
    oldPrice: "2650",
    discountPercent: "30% OFF",
    parametersCount: "Complete Profile (Total T + SHBG + Free T + Bioavailable T + FAI)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Morning collection (7:00 AM – 10:00 AM) is recommended for adult men due to marked diurnal variation. Fasting is generally preferred.",
    turnaroundTime: "12–24 Hours",
    category: "Androgen and gonadal function",
    overview: [
      "Testosterone is the principal androgenic steroid hormone. In circulating blood, roughly 60–70% of testosterone is bound with high affinity to Sex Hormone-Binding Globulin (SHBG), about 30–38% is bound weakly to albumin, and only 1–3% circulates completely unbound ('free' testosterone). Bioavailable testosterone encompasses both the free and albumin-bound fractions.",
      "Total testosterone assays measure the entire pool of bound and unbound hormone. However, total testosterone can be clinically misleading in conditions that alter circulating SHBG concentrations. For example, obesity, metabolic syndrome, hypothyroidism, and insulin resistance decrease SHBG, causing total testosterone to appear abnormally low even when active free testosterone is physiological.",
      "Conversely, aging, hyperthyroidism, chronic hepatic disease, and oral estrogen therapy increase SHBG, falsely inflating total testosterone. By quantifying Total Testosterone and SHBG simultaneously and deriving calculated Free Testosterone and the Free Androgen Index (FAI), clinicians gain an accurate assessment of active androgen status."
    ],
    whenToTest: [
      "Clinical symptoms of male hypogonadism (diminished libido, erectile dysfunction, loss of muscle mass, osteopenia)",
      "Investigation of hirsutism, refractory acne, androgenic alopecia, or virilisation in women",
      "Assessment of suspected PCOS when Total Testosterone is equivocal",
      "Clinical situations with altered SHBG (obesity, diabetes, thyroid disorders, liver cirrhosis)",
      "Monitoring response to testosterone replacement therapy or anti-androgen therapy"
    ],
    clinicalSignificance: "In male hypogonadism, Endocrine Society guidelines require morning confirmation on two separate days. Evaluating calculated free testosterone prevents misdiagnosing men whose total testosterone is depressed merely as a consequence of low SHBG from obesity or metabolic disease.",
    limitations: [
      "Direct analog immunoassay free testosterone assays have documented inaccuracy; calculated free testosterone using Vermeulen's equation is widely preferred.",
      "Acute systemic illness, intense physical stress, poor sleep, and significant caloric deprivation transiently depress testosterone levels.",
      "Interpretation is strictly sex-, age-, and method-specific.",
      "Biotin supplement interference can alter some immunoassay platforms.",
      "Always reference laboratory-specific normal ranges verified on the local testing platform."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain or pressure, major breathing difficulty, fainting, confusion, shock/very low blood pressure, uncontrolled bleeding, rapidly worsening weakness, or any other severe acute illness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Includes precise quantification of SHBG and automated Vermeulen algorithmic calculation of Free Testosterone.",
      "Early-morning doorstep phlebotomy capture preserves circadian peak integrity.",
      "Standardised against Endocrine Society hypogonadism diagnostic pathways.",
      "Authorised with clinical comments by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Total Testosterone (Healthy Men)", range: "264 – 916", unit: "ng/dL", interpretation: "normal", note: "CDC-harmonised male reference interval" },
      { label: "Free Testosterone (Men 20–49 yrs)", range: "4.5 – 25.0", unit: "ng/dL", interpretation: "normal", note: "Calculated free active fraction" },
      { label: "SHBG (Adult Men)", range: "18.3 – 54.1", unit: "nmol/L", interpretation: "normal", note: "Carrier protein level" },
      { label: "Total Testosterone (Women)", range: "15 – 70", unit: "ng/dL", interpretation: "normal", note: "Female basal reference range" }
    ],
    faqs: [
      {
        question: "Why do I need SHBG with testosterone?",
        answer: "SHBG binds most circulating testosterone. If SHBG is unusually low (as in obesity) or high (with age or liver conditions), total testosterone will misrepresent your true active hormone status."
      },
      {
        question: "Should testosterone be measured in the morning?",
        answer: "Yes. In men, testosterone exhibits marked circadian rhythmicity, peaking between 7:00 AM and 10:00 AM. Afternoon draws can be up to 30% lower and lead to misdiagnosis."
      },
      {
        question: "Can obesity lower total testosterone?",
        answer: "Yes. Obesity lowers hepatic SHBG synthesis, depressing total testosterone while free testosterone frequently remains within normal physiological limits."
      },
      {
        question: "Can birth-control pills affect SHBG?",
        answer: "Yes. Oral estrogen formulations stimulate hepatic SHBG production, binding more testosterone and lowering free active androgen levels."
      },
      {
        question: "Does one low testosterone result diagnose hypogonadism?",
        answer: "No. Clinical guidelines mandate presence of persistent symptoms combined with low morning testosterone confirmed on at least two separate days."
      },
      {
        question: "Why are testosterone tests harder to interpret in women?",
        answer: "Normal female testosterone concentrations are 10-fold lower than male levels, requiring high-sensitivity analytical methods to distinguish normal from pathological elevations."
      }
    ],
    relatedTests: ["dhea-s-test", "17-oh-progesterone-test", "amh-test", "cortisol-test"],
    doctorNote: "Total testosterone alone is only half the story. In our practice, we frequently observe obese men labelled 'hypogonadal' whose free testosterone is completely normal once SHBG is taken into account. Ordering this combined panel avoids inappropriate hormone replacement therapy.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: Testosterone Therapy in Men with Hypogonadism (J Clin Endocrinol Metab 2018)."
    ]
  },

  "17-oh-progesterone-test": {
    slug: "17-oh-progesterone-test",
    title: "17-OH Progesterone (17-OHP) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the 17-OH Progesterone (17-OHP) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "17-OH Progesterone (17-OHP) Test",
    subtitle: "17-hydroxyprogesterone is a steroid precursor in cortisol synthesis. Its main diagnostic use is screening for 21-hydroxylase deficiency, the most common form of congenital adrenal hyperplasia (CAH), and evaluating selected patients with androgen excess.",
    price: "1100",
    oldPrice: "1580",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Assay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Early-morning collection (8:00 AM) preferred. In menstruating women, testing during the early follicular phase (days 1–3 of cycle) is strongly advised.",
    turnaroundTime: "24 Hours",
    category: "Congenital adrenal hyperplasia and androgen excess",
    overview: [
      "17-hydroxyprogesterone (17-OHP) is an intermediate steroid metabolite synthesised in the adrenal cortex from progesterone during cortisol biosynthesis. The enzyme 21-hydroxylase converts 17-OHP to 11-deoxycortisol. When 21-hydroxylase is deficient, 17-OHP accumulates in excess and is shunted into adrenal androgen synthesis pathways.",
      "21-hydroxylase deficiency accounts for over 90–95% of all cases of Congenital Adrenal Hyperplasia (CAH). In severe 'classic' CAH, newborns present with life-threatening salt-wasting crises and ambiguous genitalia. In 'non-classic' CAH (NCAH), presentation is delayed until adolescence or adulthood with symptoms mimicking PCOS: hirsutism, persistent acne, irregular menses, and subfertility.",
      "A morning baseline 17-OHP blood test serves as the primary screening investigation to rule out late-onset non-classic CAH in young women presenting with clinical hyperandrogenism."
    ],
    whenToTest: [
      "Newborn screening or diagnostic confirmation of Congenital Adrenal Hyperplasia",
      "Evaluation of hirsutism, alopecia, or oligomenorrhea in women to rule out non-classic CAH",
      "Assessment of premature adrenarche or early pubarche in paediatric patients",
      "Workup of unexplained adrenal incidentaloma or bilateral adrenal enlargement",
      "Monitoring glucocorticoid replacement therapy efficacy in diagnosed CAH patients"
    ],
    clinicalSignificance: "In non-pregnant reproductive-age women, early morning follicular 17-OHP < 200 ng/dL (6 nmol/L) reliably excludes non-classic CAH. Basal levels > 1000 ng/dL are diagnostic, while values between 200 and 1000 ng/dL warrant an ACTH (Cosyntropin) stimulation test.",
    limitations: [
      "Gestational age and birth weight adjustments are critical in premature neonates.",
      "Cross-reactivity with other sulfated steroids can produce false-positive immunoassay elevations; LC-MS/MS offers definitive confirmatory specificity.",
      "A borderline value must never be labelled CAH without Cosyntropin stimulation confirmation.",
      "Luteal phase collection produces physiological elevations from the corpus luteum, causing diagnostic confusion.",
      "Exogenous glucocorticoid treatment rapidly suppresses 17-OHP concentrations."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe vomiting, dehydration, lethargy, or collapse in infants (suspected salt-wasting crisis) or severe acute illness in adults. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Crucial differential test that distinguishes treatable Non-Classic CAH from standard PCOS.",
      "Early morning collection protocol to capture peak physiological adrenal output.",
      "Standardised diagnostic threshold interpretation aligned with Endocrine Society guidelines.",
      "Supervised by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Adult Females (Follicular Phase)", range: "15 – 70", unit: "ng/dL", interpretation: "normal", note: "Baseline screening window" },
      { label: "Adult Females (Luteal Phase)", range: "35 – 290", unit: "ng/dL", interpretation: "normal", note: "Luteal ovarian synthesis" },
      { label: "Non-Classic CAH Suspicion Window", range: "200 – 1000", unit: "ng/dL", interpretation: "borderline", note: "Indicates ACTH stimulation test" },
      { label: "Adult Males", range: "27 – 199", unit: "ng/dL", interpretation: "normal", note: "Standard male reference interval" }
    ],
    faqs: [
      {
        question: "What condition is 17-OHP mainly used to detect?",
        answer: "It is primarily used to screen for 21-hydroxylase deficiency, including classic congenital adrenal hyperplasia in infants and late-onset non-classic CAH in adolescent and adult women."
      },
      {
        question: "Why is early-morning testing used?",
        answer: "17-OHP secretion follows the diurnal rhythm of ACTH and cortisol, peaking in the morning hours. Standardised morning timing is essential for reproducible cut-off evaluation."
      },
      {
        question: "Can PCOS and non-classic CAH look similar?",
        answer: "Yes. Both conditions present with hirsutism, acne, and irregular menstrual cycles. 17-OHP testing separates the two, which is critical because their treatment regimens differ fundamentally."
      },
      {
        question: "Does a borderline 17-OHP mean CAH?",
        answer: "No. Borderline values (200–1000 ng/dL) require an ACTH stimulation test to evaluate stimulated adrenal capacity before a diagnosis can be established."
      },
      {
        question: "Can pregnancy or cycle phase affect the result?",
        answer: "Yes. The placenta produces 17-OHP during pregnancy, and the corpus luteum elevates it during the luteal phase. In cycling women, testing must occur during days 1–3 of menses."
      },
      {
        question: "Can the assay method matter?",
        answer: "Yes. Immunoassays can suffer cross-reactivity with structurally related steroid precursors. Liquid chromatography-tandem mass spectrometry (LC-MS/MS) provides the highest specificity."
      }
    ],
    relatedTests: ["dhea-s-test", "cortisol-test", "testosterone-shbg-profile", "acth-test"],
    doctorNote: "Non-classic congenital adrenal hyperplasia affects up to 1 in 200 women with hirsutism and is frequently misdiagnosed as routine PCOS. A single morning 17-OHP test during the early follicular phase readily identifies these patients, allowing targeted glucocorticoid therapy rather than empirical treatments.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency (J Clin Endocrinol Metab 2018)."
    ]
  },

  "anti-dsdna-test": {
    slug: "anti-dsdna-test",
    title: "Anti-dsDNA Antibody Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Anti-dsDNA Antibody test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "Anti-dsDNA Antibody Test",
    subtitle: "Anti-double-stranded DNA antibodies are autoantibodies strongly associated with systemic lupus erythematosus (SLE). They are most useful when interpreted with symptoms, ANA testing, other autoantibodies, complement levels and urinalysis rather than as a stand-alone screening test in people with nonspecific symptoms.",
    price: "1355",
    oldPrice: "1940",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Autoantibody Assay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required. Follow routine medical instructions.",
    turnaroundTime: "12 Hours",
    category: "Autoimmune and lupus assessment",
    overview: [
      "Anti-double-stranded DNA (anti-dsDNA) antibodies are pathogenic immunoglobulin autoantibodies directed against native double-stranded genomic DNA. They represent one of the primary hallmark immunological biomarkers for Systemic Lupus Erythematosus (SLE) and are incorporated into both the ACR/EULAR and SLICC classification criteria.",
      "Circulating anti-dsDNA antibodies participate directly in lupus pathophysiology by forming immune complexes that deposit in vascular and basement membranes, notably the renal glomeruli, triggering complement activation, neutrophil influx, and lupus nephritis.",
      "Anti-dsDNA testing is most informative when interpreted alongside antinuclear antibody (ANA) immunofluorescence patterns, ENA sub-panels, complement components (C3, C4), and renal parameters (urinalysis and urine protein-to-creatinine ratio). In many SLE patients, quantitative anti-dsDNA titres track disease activity and impending renal flares."
    ],
    whenToTest: [
      "Diagnostic evaluation of suspected Systemic Lupus Erythematosus in patients with compatible clinical signs",
      "Assessment and monitoring of active lupus nephritis in conjunction with urinalysis and creatinine",
      "Serial monitoring of SLE disease activity and therapeutic response",
      "Workup of unexplained inflammatory polyarthritis, malar rash, photosensitivity, or serositis",
      "Further characterisation following a positive ANA HEp-2 immunofluorescence test"
    ],
    clinicalSignificance: "High-affinity anti-dsDNA antibodies carry > 95% specificity for SLE. A rising titre coupled with falling complement C3/C4 levels frequently heralds an impending flare of lupus nephritis, enabling preemptive immunosuppressive management.",
    limitations: [
      "Assay methods differ: Crithidia luciliae immunofluorescence (CLIFT) detects high-avidity antibodies with maximum specificity; automated FEIA/ELISA offers high sensitivity.",
      "Low-level positive anti-dsDNA can occur in autoimmune hepatitis, rheumatoid arthritis, and chronic infections.",
      "A negative anti-dsDNA does not rule out SLE (~25–30% of SLE patients remain anti-dsDNA negative).",
      "Never interpret anti-dsDNA in isolation without clinical evaluation and ANA HEp-2 confirmation."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain, shortness of breath, sudden facial/leg swelling with foamy urine, high unexplained fever, confusion, or seizures. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Automated high-specificity quantitative immunoassay providing reproducible numerical tracking.",
      "Correlated with dual-level internal controls and validated on ISO 15189:2022 diagnostic platforms.",
      "Direct integration with Complement C3/C4 and urine protein panels for comprehensive lupus profiling.",
      "Clinical oversight by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Negative / Normal", range: "< 10.0", unit: "IU/mL", interpretation: "normal", note: "No significant anti-dsDNA antibodies detected" },
      { label: "Equivocal / Borderline", range: "10.0 – 15.0", unit: "IU/mL", interpretation: "borderline", note: "Requires clinical re-evaluation in 4–6 weeks" },
      { label: "Positive / Elevated", range: "> 15.0", unit: "IU/mL", interpretation: "abnormal", note: "Consistent with active SLE immune-complex formation" }
    ],
    faqs: [
      {
        question: "Is anti-dsDNA specific for lupus?",
        answer: "Yes, high-titre anti-dsDNA is one of the most specific autoantibodies for SLE (> 95% specificity), though clinical correlation remains essential."
      },
      {
        question: "Can anti-dsDNA be negative in lupus?",
        answer: "Yes. Approximately 25% to 30% of patients with confirmed SLE do not produce detectable anti-dsDNA antibodies."
      },
      {
        question: "Does a higher result mean more severe disease?",
        answer: "In many patients, titres correlate with disease activity, particularly lupus nephritis, while in others titres remain elevated even during clinical remission."
      },
      {
        question: "Why test C3 and C4 with anti-dsDNA?",
        answer: "Complement proteins are consumed during active immune-complex deposition. Concurrently rising anti-dsDNA and falling C3/C4 strongly indicates an active disease flare."
      },
      {
        question: "Do I need fasting?",
        answer: "No fasting is required for the anti-dsDNA blood test."
      },
      {
        question: "Why can two labs report different anti-dsDNA results?",
        answer: "Different analytical methods (CLIFT, ELISA, FEIA) detect antibodies of different avidities and report in different units. Serial monitoring should stay on the same platform."
      }
    ],
    relatedTests: ["ena-profile", "complement-c3-c4-test", "anca-pr3-mpo-test"],
    doctorNote: "Anti-dsDNA is an invaluable immunological marker, but it must be viewed in tandem with the kidneys and the complement system. When anti-dsDNA rises while C3 and C4 decline, active immune complex deposition is taking place, necessitating urgent nephrology or rheumatology consultation.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "EULAR/ACR Classification Criteria for Systemic Lupus Erythematosus (Ann Rheum Dis 2019)."
    ]
  },

  "ena-profile": {
    slug: "ena-profile",
    title: "ENA Profile Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the ENA Profile test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "ENA Profile (Extractable Nuclear Antigen) Test",
    subtitle: "An extractable nuclear antigen (ENA) profile measures a group of specific autoantibodies—commonly including SSA/Ro, SSB/La, Sm, U1-RNP and sometimes Scl-70, Jo-1 and others depending on the panel. The pattern can help clinicians classify autoimmune connective-tissue diseases after an appropriate clinical assessment.",
    price: "2785",
    oldPrice: "3980",
    discountPercent: "30% OFF",
    parametersCount: "Comprehensive Multiplex Panel (SSA, SSB, Sm, RNP, Scl-70, Jo-1)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "No fasting required.",
    turnaroundTime: "24 Hours",
    category: "Autoimmune connective-tissue disease assessment",
    overview: [
      "The Extractable Nuclear Antigen (ENA) profile tests for specific IgG autoantibodies directed against soluble, saline-extractable non-histone ribonucleoprotein complexes within the cell nucleus and cytoplasm. Common component antigens include SSA (Ro60 and Ro52), SSB (La), Sm (Smith), U1-RNP, Scl-70 (Topoisomerase I), and Jo-1 (Histidyl-tRNA synthetase).",
      "While a positive Antinuclear Antibody (ANA) screen confirms the presence of systemic autoimmunity, it does not identify the specific underlying disorder. The ENA profile provides that essential diagnostic resolution, differentiating between Systemic Lupus Erythematosus, Sjögren's Syndrome, Systemic Sclerosis (Scleroderma), Mixed Connective Tissue Disease (MCTD), and Inflammatory Myositis.",
      "Each ENA antibody carries distinct clinical implications: anti-Sm is highly specific for SLE; high-titre anti-U1-RNP defines MCTD; anti-SSA and anti-SSB identify Sjögren's syndrome and carry critical prognostic implications for congenital heart block during pregnancy; anti-Scl-70 predicts diffuse systemic sclerosis; and anti-Jo-1 indicates anti-synthetase myositis."
    ],
    whenToTest: [
      "Follow-up characterisation after a positive ANA HEp-2 immunofluorescence test",
      "Investigation of severe dry eyes and dry mouth (sicca symptoms) suggestive of Sjögren syndrome",
      "Evaluation of Raynaud's phenomenon, sclerodactyly, or skin thickening (suspected systemic sclerosis)",
      "Unexplained proximal muscle weakness and elevated muscle enzymes (suspected dermatomyositis/polymyositis)",
      "Maternal screening in pregnant women with connective tissue disorders to evaluate neonatal lupus risk"
    ],
    clinicalSignificance: "Multiplex ENA profiling allows precise immunological subtyping. Identifying anti-SSA/Ro in a pregnant woman mandates serial fetal echocardiography to monitor for congenital atrioventricular heart block, directly transforming maternal-fetal management.",
    limitations: [
      "Different laboratories configure different antigen subsets within their ENA panels; individual antibody results must be read individually.",
      "Autoantibodies can precede overt clinical disease by years; antibody positivity without compatible symptoms does not equal active disease.",
      "A negative ENA profile does not exclude autoimmune disease (some conditions involve antigens not included on standard panels).",
      "Always interpret in the context of ANA pattern, clinical phenotype, and organ involvement."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for acute shortness of breath, chest pain, difficulty swallowing, rapidly spreading skin ulcers, or profound muscle weakness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Comprehensive multiplex immunoassay evaluating core extractable nuclear antigens in a single run.",
      "Individual antibody reporting with semi-quantitative interpretation.",
      "Direct immunological correlation with Dr. Shantakumar Muruda, MD (Medical Biochemistry).",
      "NABL Accredited precision complying with ISO 15189:2022 standards."
    ],
    referenceRanges: [
      { label: "Individual ENA Antibodies (< 20 RU/mL)", range: "< 20", unit: "RU/mL", interpretation: "normal", note: "Negative / No detectable autoantibodies" },
      { label: "Equivocal / Borderline", range: "20 – 25", unit: "RU/mL", interpretation: "borderline", note: "Recommend repeat testing in 6–8 weeks" },
      { label: "Positive / Elevated (> 25 RU/mL)", range: "> 25", unit: "RU/mL", interpretation: "abnormal", note: "Antibody detected; correlate with clinical syndrome" }
    ],
    faqs: [
      {
        question: "What does ENA stand for?",
        answer: "ENA stands for Extractable Nuclear Antigens, a family of soluble cellular proteins and RNA-protein complexes targeted by autoantibodies."
      },
      {
        question: "Is ENA the same as ANA?",
        answer: "No. ANA is a broad screening test that checks for any antinuclear antibody; ENA identifies the specific individual autoantibodies responsible for the positive ANA."
      },
      {
        question: "Can ENA be positive with a negative ANA?",
        answer: "Occasionally yes, particularly with anti-SSA/Ro52 or anti-Jo-1, because some antigens can be washed away during standard substrate preparation."
      },
      {
        question: "Does anti-SSA/Ro always mean Sjögren syndrome?",
        answer: "No. Anti-SSA/Ro is found in Sjögren syndrome, but it also occurs frequently in SLE, cutaneous lupus, and systemic sclerosis."
      },
      {
        question: "What is anti-Sm associated with?",
        answer: "Anti-Sm is exceptionally specific for Systemic Lupus Erythematosus (SLE), making it one of the core immunological diagnostic criteria."
      },
      {
        question: "Should ENA be used as a general wellness screen?",
        answer: "No. ENA testing should only be performed when there is objective clinical suspicion or a positive ANA screening result."
      }
    ],
    relatedTests: ["anti-dsdna-test", "complement-c3-c4-test", "anca-pr3-mpo-test"],
    doctorNote: "A positive ANA simply opens the door; the ENA profile tells you which room you are in. By identifying whether autoantibodies target Sm, SSA, RNP, or Scl-70, we provide rheumatologists with the exact immunological map required to tailor targeted immunosuppressive therapies.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "International Consensus on ANA Patterns (ICAP) Consensus Recommendations (Front Immunol 2019)."
    ]
  },

  "anca-pr3-mpo-test": {
    slug: "anca-pr3-mpo-test",
    title: "ANCA (PR3 / MPO) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the ANCA (PR3 / MPO) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "ANCA (PR3 / MPO) Test",
    subtitle: "ANCA testing evaluates autoantibodies associated with small-vessel vasculitis. Modern evaluation commonly combines antigen-specific antibodies to proteinase 3 (PR3) and myeloperoxidase (MPO), sometimes with indirect immunofluorescence. A positive result supports but does not by itself diagnose ANCA-associated vasculitis.",
    price: "1650",
    oldPrice: "2350",
    discountPercent: "30% OFF",
    parametersCount: "Dual Antigen Panel (PR3-ANCA + MPO-ANCA)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required.",
    turnaroundTime: "24 Hours",
    category: "Vasculitis testing",
    overview: [
      "Anti-Neutrophil Cytoplasmic Antibodies (ANCA) are autoantibodies directed against primary azurophilic granule enzymes of human neutrophils and monocyte lysosomes. The two primary clinically validated antigenic targets are Proteinase 3 (PR3) and Myeloperoxidase (MPO).",
      "PR3 and MPO antibodies are the defining immunological biomarkers of ANCA-Associated Vasculitides (AAV)—a life-threatening group of necrotising small-vessel vasculitides comprising Granulomatosis with Polyangiitis (GPA, formerly Wegener's), Microscopic Polyangiitis (MPA), and Eosinophilic Granulomatosis with Polyangiitis (EGPA, formerly Churg-Strauss).",
      "According to the 2017 revised international consensus on ANCA testing, high-quality antigen-specific immunoassays (anti-PR3 and anti-MPO) serve as the preferred first-line diagnostic method, superseding standalone indirect immunofluorescence due to superior specificity and analytical reproducibility."
    ],
    whenToTest: [
      "Suspected Granulomatosis with Polyangiitis (GPA), Microscopic Polyangiitis (MPA), or EGPA",
      "Unexplained rapidly progressive glomerulonephritis with active urine sediment (hematuria, proteinuria, red cell casts)",
      "Pulmonary-renal syndrome (unexplained alveolar haemorrhage combined with acute renal dysfunction)",
      "Chronic destructive upper airway disease (refractory sinusitis, subglottic stenosis, saddle nose deformity)",
      "Unexplained mononeuritis multiplex or necrotising cutaneous purpura"
    ],
    clinicalSignificance: "PR3-ANCA is predominantly identified in GPA (85–90% sensitivity), whereas MPO-ANCA is characteristic of MPA and renal-limited necrotising crescentic glomerulonephritis. Prompt detection allows early initiation of life-saving induction therapy with glucocorticoids and rituximab or cyclophosphamide.",
    limitations: [
      "ANCA positivity is not synonymous with vasculitis; clinical and histopathological correlation remains indispensable.",
      "Approximately 10–20% of patients with genuine small-vessel vasculitis are ANCA-negative ('seronegative vasculitis').",
      "Low-titer MPO-ANCA can occur in drug-induced vasculitis (hydralazine, propylthiouracil), inflammatory bowel disease, and chronic infections (subacute bacterial endocarditis).",
      "Serial ANCA titers alone should not dictate immunosuppressive escalation without clear objective clinical evidence of disease flare."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate emergency care for coughing up blood (hemoptysis), acute breathlessness, sudden drop in urine output, or profound weakness. Vasculitic pulmonary haemorrhage is a medical emergency.",
    whyImportant: [
      "Dual antigen-specific quantitative testing (PR3 + MPO) aligned with international vasculitis consensus.",
      "Rapid turnaround time to support urgent clinical decision-making in pulmonary-renal syndromes.",
      "NABL Accredited laboratory processing with dual-level quality control.",
      "Clinically reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Anti-PR3 IgG (< 20.0 RU/mL)", range: "< 20.0", unit: "RU/mL", interpretation: "normal", note: "Negative / Normal" },
      { label: "Anti-PR3 IgG (≥ 20.0 RU/mL)", range: "≥ 20.0", unit: "RU/mL", interpretation: "abnormal", note: "Positive / Associated with GPA" },
      { label: "Anti-MPO IgG (< 20.0 RU/mL)", range: "< 20.0", unit: "RU/mL", interpretation: "normal", note: "Negative / Normal" },
      { label: "Anti-MPO IgG (≥ 20.0 RU/mL)", range: "≥ 20.0", unit: "RU/mL", interpretation: "abnormal", note: "Positive / Associated with MPA" }
    ],
    faqs: [
      {
        question: "What are PR3 and MPO?",
        answer: "PR3 (Proteinase 3) and MPO (Myeloperoxidase) are enzymes inside white blood cells (neutrophils). Autoantibodies targeting them cause small blood vessel inflammation."
      },
      {
        question: "Does a positive ANCA prove vasculitis?",
        answer: "No. A positive result strongly supports vasculitis in the appropriate clinical setting, but diagnosis requires clinical symptoms, imaging, and often a tissue biopsy."
      },
      {
        question: "Can infection cause ANCA positivity?",
        answer: "Yes. Certain chronic infections, particularly subacute bacterial endocarditis and tuberculosis, can induce positive ANCA results, mimicking vasculitis."
      },
      {
        question: "What symptoms make ANCA testing most useful?",
        answer: "Unexplained kidney inflammation, hemoptysis (coughing blood), chronic refractory sinus ulcerations, systemic vasculitic neuropathy, and dark/foamy urine."
      },
      {
        question: "Can vasculitis occur with a negative ANCA?",
        answer: "Yes. Approximately 10% to 20% of patients with biopsy-proven small-vessel vasculitis do not have detectable circulating ANCA autoantibodies."
      },
      {
        question: "Is ANCA a routine screening test?",
        answer: "No. Testing should strictly be ordered based on clinical symptoms suggestive of systemic necrotising vasculitis to prevent misleading false positives."
      }
    ],
    relatedTests: ["anti-dsdna-test", "ena-profile", "complement-c3-c4-test"],
    doctorNote: "Small vessel vasculitis can progress from subtle sinus congestion to fulminant pulmonary-renal failure within weeks. By testing PR3 and MPO simultaneously with high-affinity immunoassays, we provide the rapid diagnostic confirmation clinicians need to arrest irreversible organ damage.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Revised 2017 International Consensus on Testing of ANCA in Granulomatosis with Polyangiitis and Microscopic Polyangiitis (Nat Rev Rheumatol 2017)."
    ]
  },

  "complement-c3-c4-test": {
    slug: "complement-c3-c4-test",
    title: "Complement C3 & C4 Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Complement C3 & C4 test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "Complement C3 & C4 Test",
    subtitle: "C3 and C4 are complement proteins involved in immune defence and immune-complex clearance. They are commonly measured in systemic lupus erythematosus and other immune-complex disorders to look for complement consumption, but values are not specific to one disease.",
    price: "1150",
    oldPrice: "1650",
    discountPercent: "30% OFF",
    parametersCount: "Dual Marker Panel (Complement C3 + Complement C4)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is usually unnecessary.",
    turnaroundTime: "6 Hours",
    category: "Autoimmune and complement assessment",
    overview: [
      "The complement system is a biochemical cascade of over 30 soluble serum proteins and cell-surface receptors that mediate innate immune defence, microbial opsonisation, and the solubilisation and clearance of circulating immune complexes.",
      "Complement Component 3 (C3) is the central, most abundant component where the classical, alternative, and lectin activation pathways converge. Complement Component 4 (C4) is specific to classical and lectin pathway activation.",
      "In systemic autoimmune disorders such as Systemic Lupus Erythematosus (SLE), post-streptococcal glomerulonephritis, and cryoglobulinemia, massive formation and deposition of antigen-antibody immune complexes continuously activate the classical complement cascade. This consumes C3 and C4 faster than the liver can synthesise them, producing profound hypocomplementemia (low C3 and/or low C4)."
    ],
    whenToTest: [
      "Assessment of suspected or established Systemic Lupus Erythematosus (SLE)",
      "Monitoring disease activity and predicting nephritis flares in patients with known SLE",
      "Differential diagnosis of acute glomerulonephritis (post-infectious, membranoproliferative, lupus nephritis)",
      "Evaluation of suspected mixed cryoglobulinemia (characteristically low C4 with normal/mildly low C3)",
      "Investigation of recurrent severe encapsulated bacterial infections (suspected inherited complement deficiency)"
    ],
    clinicalSignificance: "Concurrently decreased C3 and C4 in an SLE patient correlates strongly with active microvascular immune complex deposition and proliferative lupus nephritis. As treatment succeeds, complement levels normalise, making C3/C4 valuable biochemical response monitors.",
    limitations: [
      "Both C3 and C4 behave as acute-phase reactants; intense acute inflammation can falsely elevate levels, masking immune consumption.",
      "Reduced complement can stem from severe hepatic biosynthetic dysfunction or inherited null alleles (e.g., C4A/C4B deficiency).",
      "Serial monitoring must be conducted using the same laboratory methodology (immunoturbidimetry or nephelometry).",
      "Normal C3 and C4 concentrations do not exclude active autoimmune disease."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain or pressure, major breathing difficulty, fainting, confusion, shock/very low blood pressure, uncontrolled bleeding, rapidly worsening weakness, or any other severe acute illness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Quantitative nephelometric / immunoturbidimetric analysis ensuring high precision.",
      "Simultaneous paired reporting of both C3 and C4 to identify classical vs alternative pathway patterns.",
      "Rapid 6-hour report turnaround for acute nephritic presentations.",
      "Validated by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Complement C3", range: "90 – 180", unit: "mg/dL", interpretation: "normal", note: "Standard physiological range" },
      { label: "Complement C4", range: "10 – 40", unit: "mg/dL", interpretation: "normal", note: "Standard physiological range" },
      { label: "Consumed / Depressed C3", range: "< 90", unit: "mg/dL", interpretation: "abnormal", note: "Immune-complex consumption or synthesis failure" },
      { label: "Consumed / Depressed C4", range: "< 10", unit: "mg/dL", interpretation: "abnormal", note: "Classical pathway activation (SLE, cryoglobulinemia)" }
    ],
    faqs: [
      {
        question: "Why are C3 and C4 low in lupus?",
        answer: "In active lupus, antibody-antigen immune complexes activate the complement cascade, consuming C3 and C4 proteins faster than they can be produced by the liver."
      },
      {
        question: "Do normal C3 and C4 rule out lupus?",
        answer: "No. Many patients with active lupus maintain normal complement levels, especially if there is no significant kidney involvement or if inflammation increases complement synthesis."
      },
      {
        question: "Can C3 and C4 be high?",
        answer: "Yes. Both C3 and C4 are acute-phase reactants and can rise significantly during acute systemic infections, severe inflammation, or trauma."
      },
      {
        question: "What if only C4 is low?",
        answer: "An isolated low C4 often points to classical pathway activation (such as mixed cryoglobulinemia) or an inherited partial deficiency of the C4 gene."
      },
      {
        question: "Are C3 and C4 disease-specific?",
        answer: "No. They reflect complement pathway activation and consumption across multiple conditions and must be interpreted alongside other autoantibodies and clinical findings."
      },
      {
        question: "Do I need fasting?",
        answer: "No fasting is required for the C3 and C4 blood test."
      }
    ],
    relatedTests: ["anti-dsdna-test", "ena-profile", "anca-pr3-mpo-test"],
    doctorNote: "Complement testing provides real-time dynamic intelligence on autoimmune disease activity. In lupus patients, seeing C3 and C4 drop is often the first biochemical warning sign of an impending renal flare, appearing well before protein becomes detectable in the urine.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006."
    ]
  },

  "nt-probnp": {
    slug: "nt-probnp",
    title: "NT-proBNP Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the NT-proBNP test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "NT-proBNP (N-Terminal pro-B-Type Natriuretic Peptide) Test",
    subtitle: "NT-proBNP is released into blood when the heart, especially the ventricles, is under increased wall stress. It is widely used to help evaluate suspected heart failure, estimate severity/prognosis and support follow-up. It is not specific to heart failure and must be interpreted with age, kidney function, rhythm and clinical findings.",
    price: "2995",
    oldPrice: "4280",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Cardiac Biomarker",
    sampleType: "Serum or Heparin Plasma (2 mL)",
    fastingRequired: "Fasting is generally not required.",
    turnaroundTime: "6 Hours",
    category: "Heart failure assessment",
    overview: [
      "B-type natriuretic peptide is synthesised by ventricular cardiomyocytes as the preprohormone preproBNP in response to increased myocardial wall stress, chamber dilation, and volume overload. Proteolytic cleavage yields biologically active BNP and the biologically inactive 76-amino-acid N-terminal fragment, NT-proBNP.",
      "NT-proBNP has a significantly longer circulating half-life (60–120 minutes) compared to active BNP (20 minutes), producing substantially higher circulating concentrations and greater in-vitro stability, making it the preferred laboratory biomarker for assessing hemodynamic cardiac strain.",
      "In modern cardiology, NT-proBNP serves a preeminent role as an acute 'rule-out' test for heart failure in patients presenting with acute dyspnea, and as a powerful prognostic marker for risk stratification, therapy optimisation, and monitoring in chronic heart failure."
    ],
    whenToTest: [
      "Differential diagnosis of acute shortness of breath (dyspnea) in emergency or outpatient settings",
      "Evaluation of suspected chronic heart failure in patients presenting with fatigue, pedal edema, or orthopnea",
      "Risk stratification and prognostic assessment in established heart failure (HFrEF and HFpEF)",
      "Pre-operative cardiovascular risk evaluation prior to major non-cardiac surgery",
      "Monitoring response to medical therapy (ARNI, SGLT2 inhibitors, beta-blockers) in heart failure clinics"
    ],
    clinicalSignificance: "NT-proBNP possesses an outstanding negative predictive value (> 98%). In an acute setting, NT-proBNP < 300 pg/mL rules out acute decompensated heart failure with exceptional reliability, directing diagnostic focus toward pulmonary or alternative etiologies.",
    limitations: [
      "Concentrations naturally rise with advancing age, requiring age-stratified diagnostic cut-offs.",
      "Renal impairment (eGFR < 60 mL/min) impairs physiological clearance, elevating baseline levels independent of worsening cardiac function.",
      "Obesity significantly depresses natriuretic peptide concentrations; clinicians must lower decision thresholds by ~50% in obese patients.",
      "Atrial fibrillation, pulmonary hypertension, and severe sepsis can elevate NT-proBNP without primary left ventricular systolic failure.",
      "NT-proBNP does not distinguish heart failure with reduced ejection fraction (HFrEF) from heart failure with preserved ejection fraction (HFpEF); echocardiography is essential."
    ],
    urgentCareWarning: "Severe breathlessness at rest, acute chest pressure, fainting, bluish discoloration of the lips, or sudden worsening of swelling requires immediate emergency medical evaluation. Do not delay emergency hospital care for an outpatient laboratory result.",
    whyImportant: [
      "Automated high-precision ECLIA immunoassay with rapid 6-hour report delivery.",
      "Exceptional rule-out accuracy (NPV > 98%) preventing unnecessary invasive hospital testing.",
      "Home blood collection available across Bengaluru with cold-chain specimen preservation.",
      "Reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Rule-Out Heart Failure (All Ages)", range: "< 300", unit: "pg/mL", interpretation: "normal", note: "Heart failure highly unlikely (NPV > 98%)" },
      { label: "Rule-In Acute HF (< 50 yrs)", range: "> 450", unit: "pg/mL", interpretation: "abnormal", note: "Age-adjusted decision cut-off" },
      { label: "Rule-In Acute HF (50–75 yrs)", range: "> 900", unit: "pg/mL", interpretation: "abnormal", note: "Age-adjusted decision cut-off" },
      { label: "Rule-In Acute HF (> 75 yrs)", range: "> 1800", unit: "pg/mL", interpretation: "abnormal", note: "Age-adjusted decision cut-off" },
      { label: "Chronic HF Rule-Out (Outpatient)", range: "< 125", unit: "pg/mL", interpretation: "normal", note: "NICE guideline ambulatory rule-out threshold" }
    ],
    faqs: [
      {
        question: "Does high NT-proBNP always mean heart failure?",
        answer: "No. While elevated NT-proBNP indicates increased cardiac wall stress, it can also rise in atrial fibrillation, pulmonary hypertension, chronic kidney disease, and severe infections."
      },
      {
        question: "Can kidney disease raise NT-proBNP?",
        answer: "Yes. Because NT-proBNP relies heavily on renal clearance, reduced kidney function increases circulating levels even in the absence of acute cardiac decompensation."
      },
      {
        question: "Can obesity lower NT-proBNP?",
        answer: "Yes. Individuals with higher body mass index (BMI) typically have lower baseline NT-proBNP levels, which doctors take into account when interpreting results."
      },
      {
        question: "Does NT-proBNP replace an echocardiogram?",
        answer: "No. NT-proBNP helps doctors determine whether cardiac imaging is needed; echocardiography is required to evaluate actual heart valve and muscle structure and calculate ejection fraction."
      },
      {
        question: "Is fasting required?",
        answer: "No. Blood can be collected at any time regardless of food intake."
      },
      {
        question: "When is breathlessness an emergency?",
        answer: "Severe shortness of breath at rest, chest pressure, sudden coughing of pink frothy fluid, or fainting requires immediate emergency ambulance care."
      }
    ],
    relatedTests: ["high-sensitivity-troponin-test", "cortisol-test"],
    doctorNote: "NT-proBNP is the premier biomarker for evaluating cardiac stretch and ventricular overload. Its greatest clinical superpower is its negative predictive value: an NT-proBNP below age-adjusted thresholds reliably rules out heart failure as the cause of breathlessness, rapidly guiding doctors to alternative pulmonary diagnoses.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "NICE Clinical Guideline [NG106]: Chronic Heart Failure in Adults - Diagnosis and Management (Updated 2018)."
    ]
  },

  "high-sensitivity-troponin-test": {
    slug: "high-sensitivity-troponin-test",
    title: "High-Sensitivity Cardiac Troponin (hs-cTn) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the High-Sensitivity Cardiac Troponin (hs-cTn) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · STAT CLINICAL PROTOCOL",
    h1Title: "High-Sensitivity Cardiac Troponin (hs-cTn) Test",
    subtitle: "High-sensitivity cardiac troponin I or T is the preferred blood biomarker for detecting myocardial injury. The diagnosis of myocardial infarction requires the troponin pattern to be interpreted with symptoms, ECG findings and evidence of ischemia. A single elevated troponin is not automatically a heart attack.",
    price: "1160",
    oldPrice: "1660",
    discountPercent: "30% OFF",
    parametersCount: "High-Sensitivity Quantitative Cardiac Assay",
    sampleType: "Serum or Plasma (2 mL)",
    fastingRequired: "No fasting required. Emergency evaluation setting.",
    turnaroundTime: "2–4 Hours (Stat Protocol)",
    category: "Acute myocardial injury",
    overview: [
      "Cardiac Troponin I (cTnI) and Cardiac Troponin T (cTnT) are regulatory proteins of the myofibrillar thin filament apparatus found specifically in cardiac myocytes. Irreversible or reversible disruption of cardiomyocyte membrane integrity causes troponin to leak directly into the coronary and systemic circulation.",
      "High-sensitivity cardiac troponin (hs-cTn) assays can reliably quantify minute picogram-per-millilitre concentrations of troponin with a coefficient of variation < 10% at the 99th percentile upper reference limit (URL) of a healthy population. This analytical sensitivity enables rapid identification of myocardial injury hours earlier than conventional assays.",
      "Crucially, an elevated troponin proves myocardial injury, but is not synonymous with an acute myocardial infarction (heart attack). Under the Fourth Universal Definition of Myocardial Infarction, diagnosis requires evidence of acute myocardial ischemia (compatible chest pain, ischemic ECG changes, or imaging evidence) coupled with a dynamic rise and/or fall in troponin concentrations across serial blood samples."
    ],
    whenToTest: [
      "Acute chest pain, pressure, tightness, or heaviness radiating to the neck, jaw, back, or arm",
      "Suspected Acute Coronary Syndrome (ACS), Non-ST Elevation Myocardial Infarction (NSTEMI), or unstable angina",
      "Unexplained acute dyspnea, diaphoresis, syncope, or cardiac arrest",
      "Evaluation of acute myocarditis, pericarditis, or severe acute decompensated heart failure",
      "Perioperative myocardial injury surveillance following major cardiovascular or high-risk non-cardiac surgery"
    ],
    clinicalSignificance: "High-sensitivity troponin enables validated 0/1-hour and 0/2-hour rapid rule-out and rule-in algorithms in acute chest pain protocols. Patients with very low baseline levels and zero delta change can be safely identified for outpatient care, while dynamic rises pinpoint patients requiring immediate coronary angiography.",
    limitations: [
      "Troponin elevation denotes cardiomyocyte injury from ANY cause; non-ischemic causes include myocarditis, heart failure, pulmonary embolism, sepsis, renal failure, and strenuous endurance exercise.",
      "A single early blood draw can be negative if drawn within 1–2 hours of symptom onset; serial testing is mandatory.",
      "Chronic kidney disease frequently causes persistent mild troponin elevations; here, the acute dynamic 'delta' change is diagnostically decisive.",
      "Sex-specific 99th percentile thresholds should be applied, as healthy women typically have lower baseline troponin levels than men."
    ],
    urgentCareWarning: "New or severe chest pressure/tightness, breathlessness, sweating, fainting, or pain radiating to the arm, shoulder, back or jaw requires emergency assessment. Do not wait for a home blood test or online interpretation.",
    whyImportant: [
      "Emergency stat processing protocol with rapid 2 to 4 hour analytical turnaround.",
      "Validated high-sensitivity platform meeting Fourth Universal Definition criteria (CV < 10% at 99th percentile).",
      "Immediate pathologist phone alert to treating clinicians upon detecting critical panic values.",
      "Overseen by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Healthy Reference (hs-cTnI - Female)", range: "< 14.0", unit: "ng/L (pg/mL)", interpretation: "normal", note: "Sex-specific 99th percentile upper reference limit" },
      { label: "Healthy Reference (hs-cTnI - Male)", range: "< 26.0", unit: "ng/L (pg/mL)", interpretation: "normal", note: "Sex-specific 99th percentile upper reference limit" },
      { label: "Myocardial Injury Threshold", range: "> 99th %tile", unit: "ng/L", interpretation: "abnormal", note: "Denotes acute or chronic cardiomyocyte necrosis" }
    ],
    faqs: [
      {
        question: "Does a positive troponin mean I had a heart attack?",
        answer: "Not necessarily. An elevated troponin proves myocardial injury, but diagnosing a heart attack requires clinical signs of ischemia, ECG changes, and a dynamic rising/falling pattern over time."
      },
      {
        question: "Why is troponin repeated?",
        answer: "A rising or falling pattern across 1 to 3 hours separates acute injury (like a heart attack) from chronic, stable elevations seen in conditions like chronic kidney disease."
      },
      {
        question: "Can kidney disease raise troponin?",
        answer: "Yes. Patients with chronic kidney disease frequently have mild, persistent elevations due to subtle subclinical cardiac strain and altered clearance."
      },
      {
        question: "Can myocarditis raise troponin?",
        answer: "Yes. Viral inflammation of the heart muscle damages cardiomyocytes, releasing troponin into the bloodstream."
      },
      {
        question: "Can I do a troponin test at home for chest pain?",
        answer: "No. Acute chest pain suggestive of a heart attack requires immediate emergency hospital evaluation with an ECG and continuous monitoring; home testing must never delay emergency care."
      },
      {
        question: "What chest-pain symptoms require urgent care?",
        answer: "New pressure, heaviness, or burning in the chest—especially with radiating pain to the jaw or arm, cold sweat, nausea, or dizziness—requires an immediate emergency call."
      }
    ],
    relatedTests: ["nt-probnp", "cortisol-test"],
    doctorNote: "High-sensitivity cardiac troponin is an analytical breakthrough that detects microscopic myocardial necrosis hours earlier than legacy tests. However, the golden rule remains: troponin diagnoses injury, not the mechanism. A clinician must look for the dynamic delta rise and ischemic context before diagnosing myocardial infarction.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Fourth Universal Definition of Myocardial Infarction (Circulation / JACC 2018).",
      "ACC Expert Consensus on the Evaluation and Disposition of Acute Chest Pain in the Emergency Department (JACC 2022)."
    ]
  },

  "ca-125-test": {
    slug: "ca-125-test",
    title: "CA-125 Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the CA-125 test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "CA-125 (Cancer Antigen 125) Test",
    subtitle: "CA-125 is a blood tumour marker most closely associated with epithelial ovarian cancer, but it is not cancer-specific. It can also rise in benign gynecologic conditions, menstruation, pregnancy and inflammation of the peritoneum or pleura. It is mainly useful in defined diagnostic and monitoring pathways, not as a stand-alone screening test for average-risk women.",
    price: "655",
    oldPrice: "940",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Tumour Marker Assay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required. Testing during active menstruation should ideally be avoided as menses can transiently elevate CA-125.",
    turnaroundTime: "6 Hours",
    category: "Ovarian and gynecologic tumour-marker monitoring",
    overview: [
      "Cancer Antigen 125 (CA-125, also known as MUC16) is a high-molecular-weight transmembrane glycoprotein normally expressed by coelomic epithelium-derived tissues during fetal development, including the peritoneum, pleura, pericardium, and Müllerian duct derivatives (fallopian tubes, endometrium, endocervix).",
      "Serum CA-125 is elevated in over 80% of women with advanced epithelial ovarian cancer (serous, endometrioid, clear cell). However, CA-125 is strictly non-specific for malignancy: any physiological or pathological process that irritates or inflames peritoneal or pelvic mesothelial surfaces can cause significant antigen release into the bloodstream.",
      "Consequently, CA-125 is clinically validated for monitoring treatment response and detecting recurrence in women with diagnosed ovarian cancer, and as an adjunct in evaluating suspicious postmenopausal pelvic masses alongside transvaginal ultrasound (e.g., within the Risk of Malignancy Index [RMI]). It is NOT recommended as a standalone screening test for average-risk women."
    ],
    whenToTest: [
      "Evaluation of an adnexal mass or pelvic mass in postmenopausal women in conjunction with ultrasound",
      "Serial monitoring of therapeutic response during chemotherapy for ovarian carcinoma",
      "Post-treatment surveillance for early detection of recurrent epithelial ovarian cancer",
      "Risk stratification within validated multivariable algorithms (RMI, ROMA alongside HE4)",
      "Differential evaluation of ascites or pleural effusion of unknown origin"
    ],
    clinicalSignificance: "In diagnosed ovarian cancer, serial CA-125 levels closely parallel tumour burden: a > 50% decline during chemotherapy indicates objective clinical response, whereas a confirmed doubling above normal levels reliably heralds biochemical recurrence.",
    limitations: [
      "Not recommended as a screening test for asymptomatic, average-risk women due to significant false positives and lack of mortality benefit.",
      "Frequently elevated in benign conditions including endometriosis, uterine leiomyomas (fibroids), pelvic inflammatory disease (PID), adenomyosis, pregnancy, and menstruation.",
      "Less than 50% of Stage I ovarian cancers produce elevated CA-125 levels (poor early sensitivity).",
      "Serial monitoring trends must be performed using the identical assay manufacturer and method."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for acute severe abdominal pain, persistent vomiting, fainting, or sudden abdominal swelling. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Automated high-precision chemiluminescent immunoassay delivering reliable 6-hour turnaround.",
      "Standardised numerical reporting enabling longitudinal trend monitoring across treatment cycles.",
      "Home blood collection available across Bengaluru with cold-chain transport.",
      "Reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Normal Baseline (Adult Females)", range: "< 35.0", unit: "U/mL", interpretation: "normal", note: "Standard clinical decision threshold" },
      { label: "Elevated / Above Threshold", range: "≥ 35.0", unit: "U/mL", interpretation: "abnormal", note: "Requires clinical, pelvic, and ultrasound correlation" }
    ],
    faqs: [
      {
        question: "Does high CA-125 mean ovarian cancer?",
        answer: "No. The vast majority of mildly elevated CA-125 results in premenopausal women are caused by benign conditions such as endometriosis, uterine fibroids, pelvic infections, or menstruation."
      },
      {
        question: "Can CA-125 be normal in ovarian cancer?",
        answer: "Yes, especially in early Stage I disease where fewer than half of patients have an elevated level, and in mucinous ovarian carcinomas that typically do not express CA-125."
      },
      {
        question: "Should every woman have CA-125 screening?",
        answer: "No. Major health organisations (NCI, ACOG, USPSTF) advise against routine screening in average-risk women because it has not been shown to reduce mortality and leads to unnecessary surgeries."
      },
      {
        question: "Can endometriosis raise CA-125?",
        answer: "Yes. Endometriosis involves ectopic endometrial tissue and peritoneal inflammation, both of which regularly cause moderate CA-125 elevations."
      },
      {
        question: "Why is CA-125 useful after ovarian cancer treatment?",
        answer: "Serial trends tracked over months provide early indication of treatment efficacy or recurrence before lesions become visible on imaging."
      },
      {
        question: "Is fasting required?",
        answer: "No fasting is required for the CA-125 blood test."
      }
    ],
    relatedTests: ["cea-test", "afp-test", "psa-total-free"],
    doctorNote: "CA-125 is an exceptional surveillance marker for diagnosed ovarian cancer, but a hazardous tool when ordered indiscriminately as a 'wellness screen'. In premenopausal women, benign conditions like fibroids or endometriosis routinely push CA-125 into abnormal ranges, creating severe patient anxiety. It must always be paired with pelvic ultrasound and clinical context.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "National Cancer Institute (NCI): Ovarian, Fallopian Tube, and Primary Peritoneal Cancer Screening (PDQ 2023)."
    ]
  },

  "cea-test": {
    slug: "cea-test",
    title: "CEA (Carcinoembryonic Antigen) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the CEA (Carcinoembryonic Antigen) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "CEA (Carcinoembryonic Antigen) Test",
    subtitle: "CEA is a tumour-associated glycoprotein used mainly in the management of colorectal cancer and in selected other cancers. It is not suitable as a general cancer screening test because both false positives and false negatives occur.",
    price: "790",
    oldPrice: "1130",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Tumour Marker",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required. Inform the laboratory of your smoking history, as cigarette smoking elevates baseline CEA.",
    turnaroundTime: "6 Hours",
    category: "Cancer monitoring",
    overview: [
      "Carcinoembryonic Antigen (CEA) is a complex oncofetal cell-surface glycoprotein involved in cellular adhesion. Normally produced during fetal embryonic development by the gastrointestinal tract and pancreas, CEA synthesis ceases almost entirely after birth, leaving only trace concentrations in healthy adult serum.",
      "CEA expression is re-activated in many adult adenocarcinomas, most prominently colorectal carcinoma, but also gastric, pancreatic, breast, and non-small cell lung cancers. As tumour cells invade local tissue, shed CEA enters the portal and systemic circulations.",
      "CEA is established in international oncology guidelines (ASCO, ESMO, NCCN) as the principal blood biomarker for post-operative surveillance and treatment monitoring in diagnosed colorectal adenocarcinoma. A rising CEA trend often provides the earliest indication of hepatic or systemic recurrence months before identification on CT imaging."
    ],
    whenToTest: [
      "Baseline pre-operative staging and prognosis evaluation in diagnosed colorectal adenocarcinoma",
      "Serial post-operative surveillance (every 3–6 months for 5 years) in resected Stage II and III colorectal cancer",
      "Monitoring therapeutic response in metastatic colorectal cancer during systemic chemotherapy or immunotherapy",
      "Adjunctive monitoring in selected patients with advanced lung, breast, or medullary thyroid carcinoma",
      "Analysis of cyst fluid (e.g., pancreatic mucinous cyst evaluation)"
    ],
    clinicalSignificance: "Pre-operative CEA > 5 ng/mL in colorectal cancer correlates with higher stage and poorer disease-free survival. Following curative surgical resection, CEA should normalise within 4–6 weeks; a failure to normalise suggests incomplete resection or occult metastatic disease.",
    limitations: [
      "Completely unsuitable as a general population screening tool for colorectal or any other malignancy.",
      "Elevated in benign conditions including heavy cigarette smoking (can reach 5–10 ng/mL), cirrhosis, hepatitis, pancreatitis, and IBD.",
      "Approximately 20–30% of colorectal carcinomas do not produce CEA (false-negative surveillance).",
      "Serial trending over time is far more diagnostically informative than any single isolated test result."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for acute severe abdominal pain, persistent rectal bleeding, vomiting blood, or rapid bowel obstruction. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Standardised chemiluminescent immunoassay delivering precise longitudinal serial tracking.",
      "Rapid 6-hour turnaround to support oncological consultation schedules.",
      "Home sample collection across Bengaluru with temperature-monitored specimen logistics.",
      "Pathologist validation and trend annotation by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Non-Smokers", range: "< 3.0", unit: "ng/mL", interpretation: "normal", note: "Standard healthy non-smoking baseline" },
      { label: "Cigarette Smokers", range: "< 5.0", unit: "ng/mL", interpretation: "normal", note: "Elevated physiological baseline due to smoking" },
      { label: "Suspected Malignancy / Relapse", range: "> 5.0", unit: "ng/mL", interpretation: "abnormal", note: "Requires serial tracking and diagnostic imaging" }
    ],
    faqs: [
      {
        question: "Does high CEA mean colon cancer?",
        answer: "No. Heavy cigarette smoking, liver disease, gastritis, pancreatitis, and inflammatory bowel disease can all elevate CEA into mildly abnormal ranges."
      },
      {
        question: "Can CEA be used for routine cancer screening?",
        answer: "No. Major cancer authorities strictly advise against CEA screening in asymptomatic individuals due to low sensitivity in early disease and numerous benign false positives."
      },
      {
        question: "Why is CEA checked after colorectal cancer treatment?",
        answer: "A rising trend in a patient who previously had a CEA-producing tumour is one of the earliest signs of cancer recurrence, prompting timely imaging and surgical review."
      },
      {
        question: "Does smoking affect CEA?",
        answer: "Yes. Tobacco smokers regularly have baseline CEA values up to 5 ng/mL or higher due to chronic bronchial mucosal irritation."
      },
      {
        question: "Is one CEA value enough to judge treatment response?",
        answer: "No. Serial trends over multiple cycles combined with clinical assessment and CT scans provide the true picture of treatment efficacy."
      },
      {
        question: "Is fasting required?",
        answer: "No fasting is necessary."
      }
    ],
    relatedTests: ["ca-125-test", "afp-test", "psa-total-free"],
    doctorNote: "CEA is a tumour marker that belongs in oncology surveillance, not general health checkups. In post-operative colorectal cancer patients, serial CEA tracking every 3 months is a proven, life-saving strategy that detects hepatic metastases early enough for curative surgical resection.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "ASCO Clinical Practice Guideline Update on Use of Tumor Markers in Colorectal Cancer (J Clin Oncol 2022)."
    ]
  },

  "afp-test": {
    slug: "afp-test",
    title: "AFP (Alpha-Fetoprotein) Tumour Marker Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the AFP (Alpha-Fetoprotein) Tumour Marker test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "AFP (Alpha-Fetoprotein) Tumour Marker Test",
    subtitle: "AFP is a fetal protein that is normally very low in healthy nonpregnant adults. It can rise in hepatocellular carcinoma and certain germ-cell tumours, but it can also rise in pregnancy and active liver disease. It is therefore interpreted with imaging, clinical findings and other tumour markers.",
    price: "750",
    oldPrice: "1070",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Oncoprotein Assay",
    sampleType: "Serum (2 mL)",
    fastingRequired: "Fasting is not required.",
    turnaroundTime: "6 Hours",
    category: "Liver and germ-cell tumour assessment",
    overview: [
      "Alpha-Fetoprotein (AFP) is a single-chain glycoprotein synthesised during fetal development primarily by the embryonic liver and yolk sac, serving as the fetal counterpart of adult serum albumin. Following birth, circulating levels plummet rapidly to near-negligible concentrations (< 10 ng/mL) within the first year of life.",
      "Re-emergence of elevated serum AFP in non-pregnant adults occurs primarily in two distinct oncological settings: primary Hepatocellular Carcinoma (HCC) arising in cirrhotic or chronic hepatitis B/C livers, and Non-Seminomatous Germ Cell Tumours (NSGCT) of the testes or ovaries (embryonal carcinoma, yolk sac tumour).",
      "Because AFP can also rise moderately during active hepatocyte regeneration associated with acute hepatitis, alcohol-induced liver injury, and hepatic cirrhosis, diagnostic interpretation mandates correlation with dynamic multiphasic liver imaging (contrast CT / MRI) or gonadal ultrasound and complementary biomarkers."
    ],
    whenToTest: [
      "Surveillance of high-risk patients (cirrhosis, chronic Hepatitis B or C) for Hepatocellular Carcinoma alongside abdominal ultrasound",
      "Diagnostic workup, staging, and risk stratification of suspected testicular or ovarian germ-cell tumours",
      "Monitoring response to surgical resection, transarterial chemoembolization (TACE), or targeted therapy in HCC",
      "Post-treatment surveillance for early detection of relapse in non-seminomatous germ-cell tumours",
      "Evaluating unexplained solid liver lesions on abdominal ultrasound"
    ],
    clinicalSignificance: "In testicular cancer, AFP has an analytical half-life of 5–7 days. Following orchiectomy, failure of elevated AFP to decline according to normal clearance kinetics proves the presence of occult metastatic disease, dictating systemic chemotherapy.",
    limitations: [
      "Elevations regularly occur in non-malignant liver conditions (viral hepatitis flares, active cirrhosis, toxic hepatopathy) due to liver regeneration.",
      "Normal physiological elevation occurs during pregnancy (used for fetal screening, not oncology).",
      "Up to 30–40% of small (< 3 cm) hepatocellular carcinomas do not secrete elevated AFP (false negative).",
      "Pure seminomas and pure dysgerminomas do not secrete AFP; an elevated AFP in suspected seminoma reclassifies it as non-seminomatous."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for acute severe abdominal pain, persistent vomiting, vomiting blood, yellowing of skin/eyes with confusion (acute liver failure), or sudden testicular pain/swelling. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Automated high-precision chemiluminescence technology ensuring exact quantitative kinetics.",
      "Rapid 6-hour report turnaround facilitating urgent oncological and surgical staging.",
      "Integrated testing with Liver Function Panels and Viral Hepatitis markers.",
      "Medical validation by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Healthy Adults (Non-Pregnant)", range: "< 10.0", unit: "ng/mL", interpretation: "normal", note: "Standard adult baseline" },
      { label: "Mild / Regenerative Elevation", range: "10.0 – 200", unit: "ng/mL", interpretation: "borderline", note: "Seen in active hepatitis, cirrhosis, or early neoplasia" },
      { label: "Strongly Suggestive of HCC / Germ Cell Tumour", range: "> 400", unit: "ng/mL", interpretation: "abnormal", note: "High diagnostic specificity in cirrhotic patients" }
    ],
    faqs: [
      {
        question: "Does high AFP always mean cancer?",
        answer: "No. Pregnancy and benign liver conditions—such as acute or chronic hepatitis flares, cirrhosis, and liver regeneration—can also elevate AFP."
      },
      {
        question: "Can liver cancer occur with normal AFP?",
        answer: "Yes. Approximately one-third of hepatocellular carcinoma patients (especially with early small lesions) have normal AFP levels, which is why imaging is essential."
      },
      {
        question: "Why is AFP useful in testicular germ-cell tumours?",
        answer: "Certain testicular cancers (yolk sac tumours, embryonal carcinomas) produce AFP. Measuring it helps classify tumour type, guide staging, and monitor response to chemotherapy."
      },
      {
        question: "Can AFP be used alone to screen everyone for liver cancer?",
        answer: "No. Screening is reserved for high-risk patients (cirrhosis or chronic Hepatitis B) and must always pair AFP with abdominal ultrasound every 6 months."
      },
      {
        question: "Does AFP fall after successful treatment?",
        answer: "Yes. When an AFP-producing tumour is successfully resected or treated with chemotherapy, blood levels decline predictably according to its 5-to-7-day half-life."
      },
      {
        question: "Is fasting required?",
        answer: "No fasting is required for the AFP tumour marker test."
      }
    ],
    relatedTests: ["cea-test", "ca-125-test", "psa-total-free"],
    doctorNote: "AFP is one of our most dependable oncological biomarkers when applied to the right clinical problem: surveillance in chronic hepatitis or post-treatment tracking in testicular cancer. In liver cirrhosis, pairing 6-monthly AFP with ultrasound dramatically improves early detection of resectable hepatocellular carcinoma.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "AASLD Practice Guidance: Prevention, Diagnosis, and Treatment of Hepatocellular Carcinoma (Hepatology 2023)."
    ]
  },

  "faecal-calprotectin-test": {
    slug: "faecal-calprotectin-test",
    title: "Faecal Calprotectin Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Faecal Calprotectin test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · NON-INVASIVE GUT SCREEN",
    h1Title: "Faecal Calprotectin Test",
    subtitle: "Faecal calprotectin is a stool marker released by neutrophils during intestinal inflammation. It is useful for helping distinguish inflammatory bowel disease (IBD) from non-inflammatory disorders such as irritable bowel syndrome (IBS) in an appropriate clinical pathway, and for monitoring selected patients with known IBD.",
    price: "2400",
    oldPrice: "3400",
    discountPercent: "29% OFF",
    parametersCount: "Quantitative Stool Neutrophil Biomarker",
    sampleType: "Fresh Stool Specimen (Clean, sterile screw-cap container)",
    fastingRequired: "No dietary fasting. Collect stool avoiding contamination with toilet water, urine, or menstrual blood. NSAID painkillers should be stopped if clinically safe.",
    turnaroundTime: "24–48 Hours",
    category: "Intestinal inflammation",
    overview: [
      "Calprotectin is a 36-kDa calcium- and zinc-binding protein complex comprising S100A8 and S100A9 heterodimers, representing up to 60% of total cytosolic protein in human neutrophil granulocytes.",
      "During active mucosal inflammation of the gastrointestinal tract, neutrophils migrate through the lamina propria and across the epithelial barrier into the intestinal lumen, degranulating and releasing calprotectin directly into feces. Because calprotectin resists enzymatic degradation by pancreatic and bacterial proteases, it remains remarkably stable in stool for up to a week at room temperature.",
      "Faecal calprotectin quantification serves as a highly sensitive, non-invasive surrogate marker of mucosal neutrophilic inflammation. In gastroenterological practice, it is the primary triage tool for differentiating non-inflammatory functional disorders like Irritable Bowel Syndrome (IBS) from organic Inflammatory Bowel Disease (IBD, including Crohn's disease and Ulcerative Colitis)."
    ],
    whenToTest: [
      "Persistent chronic diarrhoea, chronic abdominal pain, or altered bowel habits lasting > 4–6 weeks",
      "Differentiating Irritable Bowel Syndrome (IBS) from Inflammatory Bowel Disease (IBD) to avoid unnecessary colonoscopy",
      "Monitoring mucosal healing and treatment response in diagnosed Crohn disease and ulcerative colitis",
      "Detecting early subclinical mucosal relapse prior to clinical flare in IBD patients",
      "Investigating suspected juvenile IBD in paediatric patients presenting with growth failure and chronic gastrointestinal symptoms"
    ],
    clinicalSignificance: "Under NICE diagnostic guidance (DG11), a faecal calprotectin < 50 µg/g carries a negative predictive value > 96% for IBD, safely sparing the majority of IBS patients invasive colonoscopic investigation. Levels > 200 µg/g warrant direct gastroenterological referral.",
    limitations: [
      "Faecal calprotectin is an indicator of intestinal neutrophilic inflammation, NOT a disease-specific marker for Crohn's or Colitis.",
      "Gastrointestinal infections (Salmonella, Campylobacter, C. difficile), diverticulitis, and untreated celiac disease elevate calprotectin.",
      "Regular consumption of Non-Steroidal Anti-Inflammatory Drugs (NSAIDs) or aspirin can cause enteropathy that elevates calprotectin.",
      "Presence of 'alarm features' (rectal bleeding, unexplained iron deficiency anaemia, palpable abdominal mass, involuntary weight loss) demands immediate endoscopy regardless of calprotectin results."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe acute gastrointestinal bleeding, high fever with severe abdominal rigidity/tenderness, uncontrollable vomiting, or severe dehydration. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Non-invasive quantitative ELISA assay eliminating the need for unnecessary colonoscopy in functional gut disorders.",
      "High room-temperature analyte stability ensures robust sample integrity.",
      "Validated diagnostic triage protocol aligned with NICE DG11 guidance.",
      "Clinical oversight by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Normal / Non-Inflammatory (IBS Likely)", range: "< 50", unit: "µg/g", interpretation: "normal", note: "Mucosal inflammation unlikely; supports functional IBS" },
      { label: "Borderline / Low-Grade Inflammation", range: "50 – 200", unit: "µg/g", interpretation: "borderline", note: "Repeat in 4–6 weeks or evaluate medication use" },
      { label: "Elevated (IBD / Significant Enteropathy)", range: "> 200", unit: "µg/g", interpretation: "abnormal", note: "Active neutrophilic inflammation; colonoscopy indicated" }
    ],
    faqs: [
      {
        question: "What does a high faecal calprotectin mean?",
        answer: "A high level indicates active white blood cell (neutrophil) inflammation in the intestinal lining. It does not name the specific condition, but strongly points to conditions like IBD, infection, or medication-induced enteropathy."
      },
      {
        question: "Can IBS cause a high calprotectin?",
        answer: "No. Irritable Bowel Syndrome is a functional non-inflammatory disorder. Patients with pure IBS characteristically test below 50 µg/g."
      },
      {
        question: "Can infection raise calprotectin?",
        answer: "Yes. Bacterial and parasitic gastroenteritis cause acute neutrophil migration that significantly elevates stool calprotectin levels."
      },
      {
        question: "Can NSAID painkillers affect the test?",
        answer: "Yes. Regular use of ibuprofen, naproxen, or diclofenac can cause mild intestinal ulceration that raises calprotectin. Report all painkillers to your doctor."
      },
      {
        question: "Does a normal result completely rule out IBD?",
        answer: "It makes active IBD highly unlikely (> 96% negative predictive value), but cannot replace clinical examination if red-flag alarm symptoms like rectal bleeding are present."
      },
      {
        question: "Is this a blood test?",
        answer: "No. Calprotectin is measured in a small stool sample using a sterile container."
      }
    ],
    relatedTests: ["ttg-iga-total-iga-celiac-test", "anti-dsdna-test", "complement-c3-c4-test"],
    doctorNote: "Faecal calprotectin is one of the most cost-effective non-invasive triage tools in modern gastroenterology. For young patients suffering from chronic bloating and abdominal pain, a normal calprotectin gives profound reassurance that irritable bowel syndrome is at play, safely avoiding invasive colonoscopy.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "NICE Diagnostics Guidance [DG11]: Faecal Calprotectin Diagnostic Tests for Inflammatory Diseases of the Bowel (2013, Updated 2020)."
    ]
  },

  "ttg-iga-total-iga-celiac-test": {
    slug: "ttg-iga-total-iga-celiac-test",
    title: "tTG-IgA + Total IgA Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the tTG-IgA + Total IgA test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · FREE HOME COLLECTION",
    h1Title: "tTG-IgA + Total IgA (Celiac Disease Screen) Test",
    subtitle: "Tissue transglutaminase IgA (tTG-IgA) is the preferred first-line serologic test for celiac disease in most people. Total IgA is measured alongside it because IgA deficiency can produce a falsely negative IgA-based test. Accurate testing requires the patient to be eating gluten before and during the diagnostic evaluation.",
    price: "1450",
    oldPrice: "2070",
    discountPercent: "30% OFF",
    parametersCount: "Dual Parameter Celiac Screen (Anti-tTG IgA + Total Serum IgA)",
    sampleType: "Serum (2 mL)",
    fastingRequired: "CRITICAL: The patient MUST maintain a normal gluten-containing diet (at least 1–2 slices of wheat bread daily for 6–12 weeks) prior to testing. Do NOT start a gluten-free diet before testing.",
    turnaroundTime: "24 Hours",
    category: "Celiac disease screening",
    overview: [
      "Celiac disease is a chronic immune-mediated enteropathy triggered by the ingestion of dietary gluten (storage proteins found in wheat, barley, and rye) in genetically predisposed individuals expressing HLA-DQ2 or HLA-DQ8.",
      "Dietary gluten peptides cross the intestinal lamina propria, where tissue transglutaminase (tTG, TG2) deamidates gliadin peptides, creating negatively charged epitopes that bind avidly to HLA-DQ2/DQ8 receptors on antigen-presenting cells. This triggers a robust autoimmune response generating high-affinity autoantibodies against tissue transglutaminase (tTG-IgA).",
      "According to ACG, BSG, and ESPGHAN international guidelines, Anti-tTG IgA is the preferred single serological test for celiac disease screening due to its outstanding sensitivity (> 95%) and specificity (~98%). Crucially, total serum IgA must be quantified concurrently: selective IgA deficiency is 10- to 15-fold more prevalent in celiac disease patients (2–3%), which causes falsely negative tTG-IgA results unless IgG-based testing (tTG-IgG / DGP-IgG) is triggered."
    ],
    whenToTest: [
      "Chronic unexplained diarrhoea, abdominal bloating, excessive flatulence, or chronic malabsorption",
      "Unexplained iron-deficiency anaemia refractory to oral iron supplementation",
      "Premature osteopenia/osteoporosis, unexplained aphthous mouth ulcers, or elevated transaminases",
      "First-degree relatives of individuals with confirmed celiac disease (sibling, parent, child)",
      "High-risk clinical conditions (Type 1 diabetes mellitus, autoimmune thyroiditis, Down syndrome)"
    ],
    clinicalSignificance: "In adults, strongly positive tTG-IgA (> 10 times upper limit of normal) combined with positive endomysial antibodies (EMA-IgA) carries near 100% positive predictive value, guiding clinical confirmation and small bowel biopsy.",
    limitations: [
      "Premature initiation of a Gluten-Free Diet (GFD) rapidly lowers circulating antibodies, causing false-negative serology.",
      "Selective IgA deficiency results in false-negative IgA tests; total IgA measurement is mandatory to identify these individuals.",
      "Children under 2 years of age have less mature immune systems; deamidated gliadin peptide (DGP-IgA and DGP-IgG) testing is recommended.",
      "Serology is a screening and supportive tool; definitive adult diagnosis traditionally requires confirmatory duodenal endoscopy and mucosal biopsy."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe chest pain or pressure, major breathing difficulty, fainting, confusion, shock/very low blood pressure, uncontrolled bleeding, rapidly worsening weakness, or any other severe acute illness. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Dual-marker protocol combining quantitative tTG-IgA with total serum IgA to eliminate false-negative misdiagnoses.",
      "Fully automated chemiluminescent immunoassay providing reproducible numerical reporting.",
      "Aligned with American College of Gastroenterology (ACG) and ESPGHAN celiac diagnostic algorithms.",
      "Supervised by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Anti-tTG IgA (< 10.0 U/mL)", range: "< 10.0", unit: "U/mL", interpretation: "normal", note: "Negative / Celiac disease serologically unlikely" },
      { label: "Anti-tTG IgA (≥ 10.0 U/mL)", range: "≥ 10.0", unit: "U/mL", interpretation: "abnormal", note: "Positive / Suggestive of celiac disease" },
      { label: "Total Serum IgA (Adults)", range: "70 – 400", unit: "mg/dL", interpretation: "normal", note: "Normal IgA immunocompetence verified" },
      { label: "Selective IgA Deficiency", range: "< 20", unit: "mg/dL", interpretation: "abnormal", note: "Indicates IgG-based celiac testing (DGP-IgG / tTG-IgG)" }
    ],
    faqs: [
      {
        question: "Why is total IgA tested with tTG-IgA?",
        answer: "Because people with celiac disease are 10 to 15 times more likely to have selective IgA deficiency. If you lack IgA, your tTG-IgA will test falsely negative even with severe active celiac disease."
      },
      {
        question: "Should I stop gluten before the test?",
        answer: "Absolutely not. For accurate diagnostic serology, you must be eating gluten regularly. Going on a gluten-free diet causes antibody levels to disappear from the blood within weeks."
      },
      {
        question: "Does a positive tTG-IgA prove celiac disease?",
        answer: "It strongly indicates celiac disease, but formal confirmation in adults typically requires review by a gastroenterologist and duodenal biopsy while still eating gluten."
      },
      {
        question: "Can celiac disease exist with negative tTG-IgA?",
        answer: "Yes, in people with selective IgA deficiency, those already on a gluten-free diet, or in a rare minority of seronegative celiac enteropathy patients."
      },
      {
        question: "Is this an allergy test?",
        answer: "No. Celiac disease is a systemic autoimmune enteropathy triggered by gluten, completely distinct from an IgE-mediated wheat food allergy."
      },
      {
        question: "Can the test be used after diagnosis?",
        answer: "Yes. Serial tTG-IgA measurements help monitor strict adherence to a gluten-free diet and assess mucosal recovery over time."
      }
    ],
    relatedTests: ["faecal-calprotectin-test", "anti-dsdna-test"],
    doctorNote: "The single most common mistake we see in celiac testing is patients starting a gluten-free diet before having their blood drawn. Without gluten exposure, the immune system stops manufacturing tTG-IgA antibodies, rendering the test falsely negative. Furthermore, by pairing every test with total serum IgA, our laboratory guarantees that selective IgA deficiency will never mask a true case of celiac disease.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "ACG Clinical Guidelines: Diagnosis and Management of Celiac Disease (Am J Gastroenterol 2023)."
    ]
  },

  "tb-pcr-cbnaat-test": {
    slug: "tb-pcr-cbnaat-test",
    title: "TB PCR / CBNAAT Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the TB PCR / CBNAAT test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED MOLECULAR LAB (NABLM1126KA10694) · WHO-RECOMMENDED RAPID NAAT",
    h1Title: "TB PCR / CBNAAT (Cartridge-Based NAAT) Test",
    subtitle: "TB nucleic-acid amplification tests (NAATs), including cartridge-based platforms such as Xpert/CBNAAT, detect genetic material from Mycobacterium tuberculosis complex directly in clinical specimens. Many assays can also detect rifampicin resistance-associated mutations, allowing faster diagnosis and treatment decisions than smear microscopy alone.",
    price: "2200",
    oldPrice: "3150",
    discountPercent: "30% OFF",
    parametersCount: "Real-Time Molecular Amplification (MTB DNA + Rifampicin Resistance)",
    sampleType: "Sputum (1–2 mL early morning deep cough), BAL, CSF, Lymph Node Aspirate, or Biopsy Tissue",
    fastingRequired: "Rinse mouth thoroughly with plain water before sputum collection; collect early-morning deep-cough sputum. Blood is NOT the appropriate sample for diagnosing pulmonary TB.",
    turnaroundTime: "24 Hours",
    category: "Tuberculosis molecular diagnosis",
    overview: [
      "Cartridge-Based Nucleic Acid Amplification Testing (CBNAAT / GeneXpert) is an automated, real-time nested polymerase chain reaction (PCR) system that integrates specimen processing, DNA extraction, and multiplex microfluidic amplification within a single hermetically sealed cartridge.",
      "The assay specifically amplifies the core 81-base-pair rifampicin resistance-determining region (RRDR) of the bacterial rpoB gene, which encodes the beta-subunit of RNA polymerase in the Mycobacterium tuberculosis complex. This allows concurrent identification of M. tuberculosis DNA and detection of mutations causing rifampicin resistance within hours.",
      "Endorsed by the World Health Organization (WHO) and India's National Tuberculosis Elimination Program (NTEP), CBNAAT has superseded conventional sputum smear microscopy as the premier upfront molecular diagnostic test, offering unprecedented sensitivity (> 88–98% in smear-positive and ~70% in smear-negative cases) and revolutionising early multidrug-resistant TB (MDR-TB) detection."
    ],
    whenToTest: [
      "Persistent cough lasting > 2 weeks, accompanied by unexplained fever, night sweats, or involuntary weight loss",
      "Suspected pulmonary tuberculosis with negative or inconclusive sputum smear microscopy",
      "Suspected extrapulmonary TB (TB meningitis on CSF, tuberculous lymphadenitis on fine-needle aspirate, pleural fluid)",
      "High-risk clinical populations including people living with HIV, diabetic patients, and household TB contacts",
      "Rapid upfront screening for rifampicin resistance before initiating first-line anti-tubercular therapy (ATT)"
    ],
    clinicalSignificance: "CBNAAT provides an analytical limit of detection of ~130 bacilli/mL (compared to 10,000 bacilli/mL for conventional microscopy). Identifying rifampicin resistance within 24 hours enables immediate referral to second-line drug regimens, preventing transmission of MDR-TB strains.",
    limitations: [
      "Sensitivity varies significantly by specimen quality and disease site (high in sputum and lymph nodes, lower in paucibacillary pleural fluid).",
      "A negative result does not completely exclude tuberculosis, particularly in paucibacillary extrapulmonary disease.",
      "PCR detects non-viable bacterial DNA; a positive test following recent successful anti-TB treatment can reflect persistent dead DNA fragments rather than active relapse.",
      "Mycobacterial culture and phenotypic drug-susceptibility testing (DST) remain essential for comprehensive second-line resistance profiling."
    ],
    urgentCareWarning: "Urgent clinical review is appropriate for severe breathlessness, coughing up significant blood (hemoptysis), high persistent fever, confusion, severe weakness/dehydration, or rapid physical deterioration. Suspected infectious TB also requires prompt public-health notification to prevent household transmission.",
    whyImportant: [
      "WHO-recommended real-time automated cartridge molecular amplification technology.",
      "Simultaneous detection of Mycobacterium tuberculosis and rifampicin resistance mutations.",
      "Standardised molecular laboratory containment complying with ISO 15189:2022 standards.",
      "Authorized with clinical interpretation by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Mycobacterium tuberculosis (MTB)", range: "Not Detected", unit: "qualitative", interpretation: "normal", note: "No M. tuberculosis complex DNA amplified" },
      { label: "MTB Detected", range: "Detected (Very Low to High)", unit: "qualitative", interpretation: "abnormal", note: "Confirms presence of M. tuberculosis DNA" },
      { label: "Rifampicin Resistance", range: "Not Detected / Detected / Indeterminate", unit: "qualitative", interpretation: "normal", note: "Guides first-line vs second-line ATT selection" }
    ],
    faqs: [
      {
        question: "What is CBNAAT?",
        answer: "CBNAAT stands for Cartridge-Based Nucleic Acid Amplification Test. It is an automated molecular PCR test that detects TB bacterial DNA and rifampicin resistance in hours."
      },
      {
        question: "Is CBNAAT the same as a TB blood test?",
        answer: "No. Blood antibody tests for TB are banned and unscientific. CBNAAT tests sputum or actual diseased body tissue where the bacteria reside."
      },
      {
        question: "Can TB PCR be negative even if I have TB?",
        answer: "Yes, especially if the sample provided was saliva rather than deep bronchial sputum, or in extrapulmonary sites with very low bacterial counts."
      },
      {
        question: "What does rifampicin resistance detected mean?",
        answer: "It indicates a genetic mutation associated with resistance to rifampicin, a core first-line antibiotic. It flags potential multidrug-resistant TB (MDR-TB) and requires specialist treatment."
      },
      {
        question: "Does a positive PCR tell whether TB is active?",
        answer: "In a patient with symptoms, yes. However, because PCR detects DNA from dead bacteria, it can remain positive for months after successful cure and must be interpreted with clinical findings."
      },
      {
        question: "Is culture still needed?",
        answer: "Yes, in complex cases, treatment failure, or when testing sensitivity to other antibiotics like fluoroquinolones and bedaquiline is required."
      }
    ],
    relatedTests: ["respiratory-multiplex-pcr-panel"],
    doctorNote: "CBNAAT represents one of the greatest leaps forward in infectious disease diagnostics. By replacing insensitive sputum smears with automated molecular amplification, we detect tuberculosis weeks earlier and identify drug resistance on day one, saving lung tissue and preventing community transmission.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "WHO Consolidated Guidelines on Tuberculosis: Module 3: Diagnosis - Rapid Diagnostics for Tuberculosis Detection (2021 Update).",
      "Central TB Division, MoHFW India: National Strategic Plan for Tuberculosis Elimination (2020–2025)."
    ]
  },

  "respiratory-multiplex-pcr-panel": {
    slug: "respiratory-multiplex-pcr-panel",
    title: "Respiratory Multiplex PCR Panel Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Respiratory Multiplex PCR Panel test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED MOLECULAR LAB (NABLM1126KA10694) · MULTIPLEX PATHOGEN DETECTION",
    h1Title: "Respiratory Multiplex PCR Panel Test",
    subtitle: "A respiratory multiplex PCR panel tests one respiratory specimen for many viral and, depending on the panel, bacterial targets at the same time. It can rapidly distinguish pathogens with overlapping symptoms, but detection of nucleic acid must still be interpreted with the patient’s illness, timing and specimen quality.",
    price: "4500",
    oldPrice: "6400",
    discountPercent: "30% OFF",
    parametersCount: "Comprehensive Multiplex Panel (Flu A/B, RSV, SARS-CoV-2, Adeno, Rhino/Entero, Metapneumo, Mycoplasma)",
    sampleType: "Nasopharyngeal / Oropharyngeal Swab in Viral Transport Medium (VTM)",
    fastingRequired: "No fasting required. Swab collected by a trained phlebotomy specialist using sterile synthetic flocked swabs.",
    turnaroundTime: "12–24 Hours",
    category: "Molecular respiratory infection testing",
    overview: [
      "Acute respiratory tract infections represent one of the leading causes of morbidity and emergency hospitalisation worldwide. Because viral pathogens (Influenza A, Influenza B, Respiratory Syncytial Virus [RSV], SARS-CoV-2, Human Metapneumovirus, Rhinovirus, Adenovirus, Parainfluenza) and atypical bacteria (Mycoplasma pneumoniae, Chlamydophila pneumoniae) present with virtually identical overlapping clinical syndromes, clinical examination alone cannot differentiate the causative agent.",
      "A Respiratory Multiplex PCR Panel utilizes syndromic real-time nested reverse-transcription polymerase chain reaction (RT-PCR) technology to amplify and detect nucleic acids from up to 15–20 viral and bacterial targets simultaneously from a single nasopharyngeal swab.",
      "This rapid multiplex approach revolutionises antimicrobial stewardship by pinpointing viral etiologies within hours, preventing inappropriate antibiotic administration, directing targeted antiviral therapy (e.g., oseltamivir for Influenza), and enforcing cohort isolation in healthcare settings."
    ],
    whenToTest: [
      "Moderate to severe acute respiratory illness with fever, cough, sore throat, or dyspnea",
      "High-risk, elderly, or immunocompromised patients presenting with acute respiratory symptoms",
      "Hospitalised patients requiring clinical isolation, cohorting, or intensive care triage",
      "Distinguishing Influenza, RSV, and COVID-19 in vulnerable paediatric or geriatric populations",
      "Severe community-acquired pneumonia requiring rapid differentiation of viral from atypical bacterial triggers"
    ],
    clinicalSignificance: "Analytical sensitivity and specificity exceed 95–99%, vastly outperforming rapid antigen lateral-flow tests. Identifying a definitive viral target allows confident cessation of broad-spectrum antibiotics, reducing antimicrobial resistance and hospital costs.",
    limitations: [
      "Panel composition varies by manufacturer; target viruses not included on the specific panel will not be identified.",
      "Detection of viral nucleic acid does not differentiate active replicating infection from shedding of non-viable viral remnants post-recovery.",
      "Coinfections and asymptomatic colonisation (particularly with Adenovirus, Rhinovirus, or atypical bacteria) require careful clinical correlation.",
      "Improper swabbing technique or collecting samples late in the illness course can yield false-negative results."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate medical assessment for severe shortness of breath, chest pain, blue lips or nail beds, confusion, fainting, or inability to stay hydrated. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Syndromic multiplex RT-PCR capturing all major viral respiratory threats in a single specimen.",
      "Direct pathogen identification to prevent unnecessary antibiotic prescriptions.",
      "Sample collection at home across Bengaluru by trained specialists in full personal protective gear.",
      "Overseen by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Influenza A & B RNA", range: "Not Detected", unit: "qualitative", interpretation: "normal", note: "Standard negative result" },
      { label: "Respiratory Syncytial Virus (RSV)", range: "Not Detected", unit: "qualitative", interpretation: "normal", note: "Standard negative result" },
      { label: "SARS-CoV-2 RNA", range: "Not Detected", unit: "qualitative", interpretation: "normal", note: "Standard negative result" },
      { label: "Other Respiratory Viruses & Atypicals", range: "Not Detected", unit: "qualitative", interpretation: "normal", note: "Standard negative result" }
    ],
    faqs: [
      {
        question: "What infections can a respiratory multiplex PCR detect?",
        answer: "Depending on panel configuration, it detects Influenza A, Influenza B, RSV, SARS-CoV-2, Parainfluenza, Adenovirus, Human Metapneumovirus, Rhinovirus/Enterovirus, and atypical bacteria like Mycoplasma pneumoniae."
      },
      {
        question: "Is multiplex PCR more sensitive than a rapid antigen test?",
        answer: "Yes, significantly. Real-time RT-PCR amplifies genetic material, making it 1,000 to 10,000 times more sensitive than rapid antigen cards, detecting infections days earlier."
      },
      {
        question: "Can more than one infection be detected?",
        answer: "Yes. Viral-viral and viral-bacterial co-detections occur in 5% to 15% of patients, particularly in young children."
      },
      {
        question: "Does a positive result always mean I am contagious?",
        answer: "Not necessarily. Viral RNA can linger in the nasopharynx for days or weeks after symptoms resolve and the patient is no longer infectious."
      },
      {
        question: "If the panel is negative, do I have no infection?",
        answer: "A negative test means none of the specific panel pathogens were detected. Your illness could stem from an unlisted pathogen, a bacterial infection, or a non-infectious condition."
      },
      {
        question: "Who benefits most from a large multiplex panel?",
        answer: "Hospitalised patients, elderly individuals, immunocompromised patients, and infants where rapid identification alters antiviral treatment, isolation, or hospitalisation decisions."
      }
    ],
    relatedTests: ["tb-pcr-cbnaat-test"],
    doctorNote: "During seasonal respiratory spikes, clinical symptoms of flu, COVID, RSV, and adenovirus overlap completely. A multiplex PCR removes the guesswork within hours, allowing doctors to prescribe targeted antivirals when indicated and decisively halt inappropriate antibiotic use.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "CDC: Multiplex Testing for Influenza, SARS-CoV-2, and RSV in Healthcare Settings (2024 Update).",
      "IDSA Guidelines on the Diagnosis and Management of Infectious Diarrhea and Respiratory Viruses (Clin Infect Dis 2021)."
    ]
  },

  "acth-test": {
    slug: "acth-test",
    title: "ACTH (Adrenocorticotropic Hormone) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the ACTH (Adrenocorticotropic Hormone) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · COLD-CHAIN PLASMA ASSAY",
    h1Title: "ACTH (Adrenocorticotropic Hormone) Test",
    subtitle: "ACTH is a pituitary hormone that stimulates the adrenal cortex to produce cortisol. Measuring ACTH together with cortisol helps localise disorders of the hypothalamic-pituitary-adrenal axis—for example, distinguishing primary adrenal failure from pituitary or hypothalamic causes.",
    price: "1150",
    oldPrice: "1640",
    discountPercent: "30% OFF",
    parametersCount: "High-Sensitivity Chemiluminescent Immunoassay",
    sampleType: "EDTA Plasma (Pre-chilled tube, immediate ice bath, refrigerated centrifuge, frozen plasma)",
    fastingRequired: "Morning sample (strictly between 8:00 AM – 9:00 AM) is essential. Overnight fasting required. Inform the laboratory of any steroid medication.",
    turnaroundTime: "24 Hours",
    category: "Pituitary-adrenal axis",
    overview: [
      "Adrenocorticotropic Hormone (ACTH, corticotropin) is a 39-amino-acid peptide hormone synthesised and secreted by corticotrope cells of the anterior pituitary gland from the precursor pro-opiomelanocortin (POMC). Its primary physiological action is stimulating the adrenal cortex to synthesise and secrete glucocorticoids (chiefly cortisol) and adrenal androgens.",
      "ACTH secretion is regulated by hypothalamic corticotropin-releasing hormone (CRH) and arginine vasopressin (AVP), and is governed by potent negative feedback inhibition by circulating cortisol. ACTH exhibits marked episodic pulsatility and a pronounced circadian rhythm closely synchronised with cortisol.",
      "Clinically, measuring plasma ACTH simultaneously with serum cortisol is the definitive diagnostic strategy for localising disorders of the hypothalamic-pituitary-adrenal (HPA) axis: distinguishing primary adrenal disease (adrenal origin) from secondary/tertiary adrenal disorders (pituitary or hypothalamic origin)."
    ],
    whenToTest: [
      "Differential diagnosis of adrenal insufficiency (distinguishing Addison disease from secondary pituitary failure)",
      "Differential diagnosis of Cushing syndrome (ACTH-dependent Cushing disease / ectopic ACTH vs ACTH-independent adrenal adenoma)",
      "Evaluation of pituitary tumours, hypopituitarism, or hypothalamic dysfunction",
      "Investigation of bilateral adrenal hyperplasia or Nelson syndrome",
      "Dynamic testing protocols such as CRH stimulation or metyrapone testing"
    ],
    clinicalSignificance: "In adrenal insufficiency: low morning cortisol with markedly elevated ACTH (> 2 times upper limit of normal) establishes Primary Adrenal Insufficiency (Addison disease). Conversely, low cortisol with low or inappropriately 'normal' ACTH establishes Secondary (pituitary) or Tertiary (hypothalamic) Insufficiency.",
    limitations: [
      "ACTH is an exceptionally labile peptide; improper pre-analytical handling (failure to collect in pre-chilled EDTA, delay in cold centrifugation, or thawing) causes rapid enzymatic degradation and falsely low results.",
      "Pulsatile and circadian secretion causes significant short-term variability; interpretation requires simultaneous cortisol measurement.",
      "Exogenous glucocorticoid therapy (prednisone, dexamethasone, hydrocortisone) suppresses pituitary ACTH secretion.",
      "Physiological and emotional stress immediately activates ACTH release."
    ],
    urgentCareWarning: "Severe weakness accompanied by vomiting, dehydration, confusion, collapse, or profound low blood pressure can indicate life-threatening adrenal crisis and requires immediate emergency hospital resuscitation. Do not wait for outpatient test turnaround.",
    whyImportant: [
      "Strict cold-chain pre-analytical protocol (pre-chilled lavender EDTA tubes, cold centrifugation, deep freeze).",
      "Simultaneous morning cortisol correlation for definitive hypothalamic-pituitary localisation.",
      "High-sensitivity two-site chemiluminescence assay eliminating cross-reactivity with POMC fragments.",
      "Clinical oversight by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Morning Peak (7:00 AM – 10:00 AM)", range: "7.2 – 63.3", unit: "pg/mL", interpretation: "normal", note: "Standard physiological morning reference range" },
      { label: "Evening Nadir (8:00 PM – 10:00 PM)", range: "< 26.0", unit: "pg/mL", interpretation: "normal", note: "Expected physiological circadian nadir" }
    ],
    faqs: [
      {
        question: "Why are ACTH and cortisol ordered together?",
        answer: "Because ACTH controls cortisol. Comparing their simultaneous concentrations reveals whether an endocrine problem is rooted in the adrenal glands themselves or higher up in the pituitary gland."
      },
      {
        question: "Why does ACTH need special handling?",
        answer: "ACTH is an unstable peptide hormone that is rapidly broken down by blood enzymes at room temperature. The blood must be collected in chilled tubes, centrifuged cold, and frozen promptly."
      },
      {
        question: "Can stress affect ACTH?",
        answer: "Yes. Physical stress, pain, anxiety, and cold exposure rapidly stimulate the hypothalamus and pituitary to release bursts of ACTH."
      },
      {
        question: "Does high ACTH always mean Addison disease?",
        answer: "No. High ACTH with low cortisol indicates Addison disease. However, high ACTH with high cortisol indicates pituitary Cushing disease or an ectopic ACTH-secreting tumour."
      },
      {
        question: "Can steroid medicines lower ACTH?",
        answer: "Yes. Oral, injected, or inhaled steroids mimic cortisol and suppress pituitary ACTH release through negative feedback."
      },
      {
        question: "Is ACTH a routine wellness test?",
        answer: "No. ACTH is a specialised endocrine investigation reserved for evaluating confirmed or suspected disorders of adrenal or pituitary function."
      }
    ],
    relatedTests: ["cortisol-test", "dhea-s-test", "aldosterone-renin-ratio-test", "17-oh-progesterone-test"],
    doctorNote: "Pre-analytical rigor is the lifeblood of accurate ACTH testing. If the phlebotomy tube is not kept on ice and cold-centrifuged immediately, plasma enzymes will degrade the peptide within 30 minutes, producing an artificial 'normal' or 'low' reading that misleads the endocrinologist. At QXL, our cold-chain phlebotomy protocol ensures absolute analytical fidelity.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: Primary Adrenal Insufficiency (J Clin Endocrinol Metab 2016)."
    ]
  },

  "pth-parathyroid-hormone-test": {
    slug: "pth-parathyroid-hormone-test",
    title: "PTH (Parathyroid Hormone) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the PTH (Parathyroid Hormone) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · INTACT HORMONE ASSAY",
    h1Title: "PTH (Intact Parathyroid Hormone) Test",
    subtitle: "Parathyroid hormone (PTH) regulates calcium and phosphate balance. PTH should be interpreted together with calcium—preferably corrected or ionised when appropriate—plus phosphate, kidney function, magnesium and vitamin D. The key question is whether the PTH response is appropriate for the calcium level.",
    price: "950",
    oldPrice: "1360",
    discountPercent: "30% OFF",
    parametersCount: "Quantitative Intact PTH (iPTH) Assay",
    sampleType: "Serum or EDTA Plasma (2 mL)",
    fastingRequired: "Overnight fasting (8–10 hours) is recommended. Avoid high-dose biotin supplements for 48 hours before testing.",
    turnaroundTime: "12 Hours",
    category: "Calcium, bone and parathyroid assessment",
    overview: [
      "Parathyroid Hormone (PTH) is an 84-amino-acid polypeptide synthesised and secreted by chief cells of the four parathyroid glands. It is the primary systemic regulator of extracellular calcium homeostasis and inorganic phosphate balance.",
      "PTH synthesis and secretion are controlled by the calcium-sensing receptor (CaSR) on parathyroid cell membranes via an inverse sigmoidal negative-feedback loop: minute declines in ionised calcium trigger immediate, robust PTH release. PTH acts directly on the skeleton to stimulate osteoclastic bone resorption, on the kidneys to enhance tubular calcium reabsorption and stimulate 1-alpha-hydroxylase conversion of 25-hydroxyvitamin D to active 1,25-dihydroxyvitamin D, and indirectly on the intestines to maximise calcium absorption.",
      "A serum PTH result is clinically uninterpretable without concurrent measurement of total/ionised calcium. The fundamental clinical question is never simply 'what is the number', but 'is the PTH secretion physiologically appropriate for the patient's circulating calcium level?'"
    ],
    whenToTest: [
      "Investigation of unexplained hypercalcaemia or hypocalcaemia detected on routine metabolic panels",
      "Suspected Primary Hyperparathyroidism (parathyroid adenoma or hyperplasia)",
      "Evaluation of recurrent nephrolithiasis (kidney stones) or unexplained early-onset osteoporosis",
      "Monitoring and management of Chronic Kidney Disease-Mineral and Bone Disorder (CKD-MBD)",
      "Investigation of hypovitaminosis D, malabsorption syndromes, or post-thyroidectomy hypocalcaemia"
    ],
    clinicalSignificance: "High serum calcium accompanied by an elevated or inappropriately 'normal' PTH establishes PTH-dependent hypercalcaemia—most commonly Primary Hyperparathyroidism. Conversely, high calcium with suppressed PTH (< 10 pg/mL) indicates PTH-independent hypercalcaemia (malignancy, granulomatous disease, vitamin D toxicity).",
    limitations: [
      "PTH circulating fragments (inactive C-terminal and N-terminal fragments) accumulate in renal impairment; modern 2nd-generation intact PTH (iPTH) or 3rd-generation whole PTH assays are preferred.",
      "Biotin (Vitamin B7) supplements interfere with streptavidin-biotin immunoassays, falsely suppressing PTH.",
      "PTH must always be evaluated in conjunction with serum calcium (albumin-corrected), phosphate, creatinine, magnesium, and 25-OH Vitamin D.",
      "Secondary hyperparathyroidism from severe Vitamin D deficiency must be ruled out before diagnosing primary parathyroid adenoma."
    ],
    urgentCareWarning: "Severe hypercalcaemia or acute hypocalcaemia can be life-threatening. Seek immediate emergency hospital care for severe confusion, profound lethargy, muscle spasms, tetany, seizure, or cardiac arrhythmias. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Second-generation Intact PTH (iPTH) chemiluminescence assay avoiding non-functional fragment interference.",
      "Paired reporting with Albumin-Corrected Calcium, Phosphorus, and Renal Function.",
      "Doorstep morning phlebotomy across Bengaluru with cold-chain specimen preservation.",
      "Reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Intact PTH (iPTH)", range: "15.0 – 65.0", unit: "pg/mL", interpretation: "normal", note: "Normal physiological range in normocalcaemic adults" },
      { label: "Suppressed PTH (< 10 pg/mL)", range: "< 10.0", unit: "pg/mL", interpretation: "abnormal", note: "Physiological suppression (hypercalcaemia of malignancy)" },
      { label: "Elevated PTH (> 65 pg/mL)", range: "> 65.0", unit: "pg/mL", interpretation: "abnormal", note: "Primary or secondary hyperparathyroidism" }
    ],
    faqs: [
      {
        question: "What does high PTH mean?",
        answer: "It depends completely on calcium. High PTH with high calcium suggests Primary Hyperparathyroidism (usually a benign parathyroid adenoma). High PTH with low or normal calcium suggests Secondary Hyperparathyroidism, often from severe Vitamin D deficiency or kidney disease."
      },
      {
        question: "Can vitamin D deficiency raise PTH?",
        answer: "Yes. Low vitamin D impairs intestinal calcium absorption, prompting the parathyroid glands to produce compensatory excess PTH to defend normal blood calcium."
      },
      {
        question: "Can kidney disease raise PTH?",
        answer: "Yes. Chronic kidney disease impairs phosphate excretion and active vitamin D synthesis, leading to chronic secondary or tertiary hyperparathyroidism."
      },
      {
        question: "Why do I need calcium with PTH?",
        answer: "PTH regulates calcium. An 'in-range' PTH number is abnormal if your calcium is elevated, because high calcium should completely shut down PTH production."
      },
      {
        question: "Can biotin affect PTH testing?",
        answer: "Yes. High doses of over-the-counter biotin (hair/skin supplements) can interfere with immunoassay technology, causing falsely low PTH readings. Discontinue for 48 hours prior to testing."
      },
      {
        question: "Is PTH a cancer marker?",
        answer: "No. PTH is a physiological calcium-regulating hormone, not a tumour marker. However, cancers can secrete a different protein called PTHrP, which causes hypercalcaemia while suppressing true PTH."
      }
    ],
    relatedTests: ["cortisol-test", "acth-test"],
    doctorNote: "Never interpret a PTH report without looking at calcium. If your calcium is 11.2 mg/dL and your PTH is 55 pg/mL, that PTH is not 'normal'—it is inappropriately non-suppressed and diagnostic of primary hyperparathyroidism. Pairing intact PTH with corrected calcium and vitamin D provides immediate clinical clarity.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Guidelines for the Management of Asymptomatic Primary Hyperparathyroidism (J Bone Miner Res 2022)."
    ]
  },

  "aldosterone-renin-ratio-test": {
    slug: "aldosterone-renin-ratio-test",
    title: "Aldosterone-Renin Ratio (ARR) Test: Uses, Preparation, Results, Limitations & FAQs",
    metaDescription: "Patient guide to the Aldosterone-Renin Ratio (ARR) test: what it measures, why doctors order it, sample preparation, how results are interpreted, limitations, related tests and common FAQs.",
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (NABLM1126KA10694) · SECONDARY HYPERTENSION SCREEN",
    h1Title: "Aldosterone-Renin Ratio (ARR) Test",
    subtitle: "The aldosterone-renin ratio compares aldosterone with renin and is the principal screening approach for primary aldosteronism, an important and treatable cause of hypertension. Accurate testing depends heavily on potassium level, sodium intake, posture, time of day and medications.",
    price: "2800",
    oldPrice: "4000",
    discountPercent: "30% OFF",
    parametersCount: "Complete Renin-Angiotensin-Aldosterone Profile (PAC + Direct Renin / PRA + Calculated ARR)",
    sampleType: "Paired EDTA Plasma (for Renin) and Serum (for Aldosterone) (4 mL total)",
    fastingRequired: "Morning sampling (at least 2 hours after waking, seated for 5–15 min). Unrestricted sodium intake. Normokalemia must be verified (hypokalemia must be corrected). Supervised medication review.",
    turnaroundTime: "24–48 Hours",
    category: "Primary aldosteronism screening",
    overview: [
      "The Renin-Angiotensin-Aldosterone System (RAAS) is the hormonal cascade that governs systemic arterial blood pressure, renal sodium reabsorption, extracellular fluid volume, and potassium excretion. Renin, synthesised by renal juxtaglomerular cells, cleaves angiotensinogen to produce angiotensin I, subsequently converted to angiotensin II, which potently stimulates adrenal zona glomerulosa secretion of Aldosterone.",
      "Primary Aldosteronism (Conn syndrome) is caused by autonomous overproduction of aldosterone independent of the RAAS—most commonly due to a solitary aldosterone-producing adrenal adenoma (APA) or bilateral adrenal hyperplasia (BAH). It is now recognised as the single most common cause of secondary endocrine hypertension, affecting 5–10% of all hypertensive patients and over 20% of patients with treatment-resistant hypertension.",
      "Autonomous hyperaldosteronism suppresses renal renin secretion through volume expansion. Calculating the Aldosterone-Renin Ratio (ARR)—dividing Plasma Aldosterone Concentration (PAC) by Direct Renin Concentration (DRC) or Plasma Renin Activity (PRA)—provides the primary screening test recommended by international endocrine guidelines."
    ],
    whenToTest: [
      "Sustained hypertension (> 150/100 mmHg documented on three separate days)",
      "Treatment-resistant hypertension (uncontrolled on 3 antihypertensive agents including a diuretic)",
      "Hypertension accompanied by spontaneous or low-dose diuretic-induced hypokalaemia (low potassium)",
      "Hypertension discovered in a patient with an adrenal incidentaloma (incidentally discovered adrenal mass)",
      "Young-onset hypertension (< 35 years) or family history of early stroke (< 40 years)"
    ],
    clinicalSignificance: "Screening and detecting primary aldosteronism is critical because hyperaldosteronism causes severe, disproportionate cardiovascular, renal, and cerebrovascular end-organ damage (fibrosis, left ventricular hypertrophy, stroke, albuminuria). Unilateral adenomas can be cured completely with laparoscopic adrenalectomy, while bilateral hyperplasia is targeted effectively with mineralocorticoid receptor antagonists (spironolactone/eplerenone).",
    limitations: [
      "Multiple antihypertensive medications profoundly alter renin and aldosterone dynamics: mineralocorticoid receptor antagonists (spironolactone, eplerenone) must be stopped for 4–6 weeks; beta-blockers suppress renin (false-positive ARR); ACE inhibitors and ARBs elevate renin (false-negative ARR). Medication adjustments must be strictly doctor-supervised.",
      "Hypokalaemia directly suppresses aldosterone synthesis, creating false-negative ARR; hypokalaemia MUST be corrected with potassium supplementation prior to drawing blood.",
      "An elevated ARR caused by extremely low renin with low or normal aldosterone is not diagnostic; a minimal Plasma Aldosterone threshold (typically > 10–15 ng/dL) is required.",
      "ARR is a screening test; positive screens require confirmatory suppression testing (saline infusion or fludrocortisone test) before invasive subtype adrenal venous sampling (AVS)."
    ],
    urgentCareWarning: "Urgent care is determined by symptoms, not by waiting for a laboratory report. Seek immediate emergency medical care for severe hypertensive crisis (blood pressure > 180/120 mmHg), acute severe headache, vision changes, chest pain, or shortness of breath. A laboratory test page must never delay emergency care.",
    whyImportant: [
      "Paired testing quantifying Direct Renin Concentration and Plasma Aldosterone on the identical morning draw.",
      "Automated algorithmic calculation of ARR with assay-specific cut-off interpretation.",
      "Strict protocol adherence for posture, time of day, and electrolyte verification.",
      "Reviewed by Dr. Shantakumar Muruda, MD (Medical Biochemistry)."
    ],
    referenceRanges: [
      { label: "Plasma Aldosterone Concentration (PAC - Seated)", range: "3.0 – 35.3", unit: "ng/dL", interpretation: "normal", note: "Normal seated morning range" },
      { label: "Direct Renin Concentration (DRC - Seated)", range: "4.4 – 46.1", unit: "µIU/mL", interpretation: "normal", note: "Normal seated morning range" },
      { label: "Aldosterone-Renin Ratio (ARR Screen Negative)", range: "< 2.0", unit: "ratio (ng/dL per µIU/mL)", interpretation: "normal", note: "Primary aldosteronism unlikely" },
      { label: "Aldosterone-Renin Ratio (ARR Screen Positive)", range: "≥ 2.0 – 3.7", unit: "ratio (ng/dL per µIU/mL)", interpretation: "abnormal", note: "Suggestive of Primary Aldosteronism if PAC > 10–15 ng/dL" }
    ],
    faqs: [
      {
        question: "Why test for primary aldosteronism?",
        answer: "Primary aldosteronism is a treatable and often curable cause of high blood pressure that causes disproportionate heart, kidney, and stroke damage if left undiagnosed."
      },
      {
        question: "Can blood-pressure medicines affect ARR?",
        answer: "Yes, significantly. Diuretics, spironolactone, beta-blockers, ACE inhibitors, and ARBs alter renin and aldosterone levels. Your doctor may temporarily transition you to verapamil or alpha-blockers prior to testing."
      },
      {
        question: "Why is potassium checked?",
        answer: "Low potassium suppresses the adrenal gland's ability to release aldosterone, which can cause a false-negative screen. Potassium levels must be normal before drawing blood."
      },
      {
        question: "Should I reduce salt before the test?",
        answer: "No. You should maintain normal, unrestricted dietary salt intake. Restricting sodium stimulates renin and alters the ratio."
      },
      {
        question: "Does a high ARR prove primary aldosteronism?",
        answer: "No. A high ratio is a positive screen that identifies patients who require confirmatory suppression testing (like intravenous saline loading) to establish definitive autonomy."
      },
      {
        question: "Is the test done lying down or sitting?",
        answer: "Guidelines recommend collecting the sample in the morning after being up and active for at least 2 hours, followed by sitting quietly for 5 to 15 minutes prior to the blood draw."
      }
    ],
    relatedTests: ["cortisol-test", "acth-test", "dhea-s-test"],
    doctorNote: "Up to 10% of all hypertensive patients suffer from primary aldosteronism, yet fewer than 1% are ever screened. When high blood pressure is accompanied by low potassium or resistance to standard drugs, calculating the ARR is the crucial diagnostic step that can turn lifelong drug dependence into a curable condition.",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD (Medical Biochemistry), Consultant Biochemist - 25 years of experience",
    doctorSlug: "dr-shantakumar-muruda",
    textbookReferences: [
      "Tietz Clinical Guide to Laboratory Tests, 4th ed. Alan H. B. Wu, PhD, DABCC, FACB. W.B. Saunders/Elsevier, 2006.",
      "Endocrine Society Clinical Practice Guideline: The Management of Primary Aldosteronism (J Clin Endocrinol Metab 2016)."
    ]
  }
};

