import type { DynamicPageData } from "./dynamicPageResolver";

export const prenatalScreeningPages: Record<string, DynamicPageData> = {
  // ── 1. Double Marker Test ───────────────────────────────────────────────────
  "double-marker": {
    slug: "double-marker",
    title: "Double Marker Test: Normal Range, Timing and Results | QXL",
    metaDescription: "The double marker test is done between 11 and 13 weeks 6 days and combines PAPP-A, free beta-hCG and NT scan to screen for Down syndrome.",
    badge: "PRENATAL SCREENING (11–13.6 WEEKS) · FMF SOFTWARE ALGORITHM",
    h1Title: "Double Marker Test: Timing, Normal Values and How to Read Your Risk Result",
    subtitle: "The double marker test is a first-trimester screening test done between 11 weeks and 13 weeks 6 days. It measures PAPP-A and free beta-hCG in maternal blood and combines them with the nuchal translucency measurement, maternal age and gestational age to calculate the risk of Down syndrome and trisomies 18 and 13.",
    price: "2200",
    oldPrice: "3200",
    discountPercent: "31% OFF",
    parametersCount: "2 Biomarkers (PAPP-A, Free β-hCG) + NT Scan Risk",
    sampleType: "Serum (3 mL Plain/Gel Tube) + Ultrasound Data",
    fastingRequired: "No fasting required. Exact gestational age by scan, maternal DOB, weight, smoking & diabetes status required.",
    turnaroundTime: "3 to 5 Days (coordinated with scan data)",
    category: "Prenatal Screening Diagnostics",
    clinicalSignificance: "The double marker test measures two placental proteins. PAPP-A (pregnancy-associated plasma protein A) is typically low in pregnancies affected by chromosomal abnormality, and free beta-hCG is typically high in Down syndrome and low in trisomies 18 and 13. Combined first-trimester screening detects roughly 85–90% of Down syndrome pregnancies at a false-positive rate of about 5%.",
    overview: [
      "The double marker test is a first-trimester screening test done between 11 weeks 0 days and 13 weeks 6 days. It measures PAPP-A and free beta-hCG in maternal blood and combines them with the nuchal translucency measurement from ultrasound, maternal age, weight, and gestational age to calculate the risk of Down syndrome (trisomy 21) and trisomies 18 and 13. It is a screening test, not a definitive diagnosis.",
      "Neither marker alone is sufficient — the result comes from combining biochemical levels with the nuchal translucency measured on ultrasound, maternal weight, ethnicity, smoking status, diabetes, and twin pregnancy status. Results are expressed as a probability risk figure, such as 1 in 1,200 or 1 in 150.",
      "The timing window is strict: marker levels and nuchal translucency are only interpretable between 11 weeks 0 days and 13 weeks 6 days, dated by crown-rump length (CRL) on ultrasound. Outside that window, the second-trimester quadruple marker test becomes the alternative."
    ],
    parametersList: [
      "PAPP-A (Pregnancy-Associated Plasma Protein A) MoM",
      "Free Beta-hCG (Free Subunit Human Chorionic Gonadotrophin) MoM",
      "Nuchal Translucency (NT) Scan Measurement (mm)",
      "Combined Trisomy 21 (Down Syndrome) Risk Ratio",
      "Combined Trisomy 18 (Edwards Syndrome) Risk Ratio",
      "Combined Trisomy 13 (Patau Syndrome) Risk Ratio"
    ],
    whyImportant: [
      "Routine screening for Down syndrome and trisomies 18 and 13 in the first trimester.",
      "Offered to all pregnant women in India regardless of age, since most Down syndrome babies are born to younger mothers.",
      "Recommended with advanced maternal age (35+ years) or previous affected pregnancy.",
      "PAPP-A contributes to early prediction of pre-eclampsia and fetal growth restriction.",
      "Informs whether further testing — NIPT, CVS, or amniocentesis — should be considered."
    ],
    whenToTest: [
      "11 weeks 0 days to 13 weeks 6 days pregnancy window",
      "Routine first-trimester antenatal screening",
      "Advanced maternal age (35+ years)",
      "Family history of chromosomal abnormality",
      "Early pre-eclampsia and placental growth risk assessment"
    ],
    referenceRanges: [
      { label: "PAPP-A (Unaffected Pregnancy)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "PAPP-A (Down Syndrome Pattern)", range: "< 0.5", unit: "MoM", interpretation: "abnormal", note: "Typically low in trisomy 21, 18 & 13" },
      { label: "Free Beta-hCG (Unaffected)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "Free Beta-hCG (Down Syndrome)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Typically elevated in Down syndrome" },
      { label: "Nuchal Translucency (NT)", range: "< 3.0", unit: "mm", interpretation: "normal", note: "Below 95th centile for CRL" },
      { label: "Combined Risk — Screen Negative", range: "< 1 in 250", unit: "Ratio", interpretation: "normal", note: "Low risk result; routine antenatal care" },
      { label: "Combined Risk — Borderline", range: "1:250 to 1:1000", unit: "Ratio", interpretation: "borderline", note: "Discuss further testing (NIPT)" },
      { label: "Combined Risk — Screen Positive", range: "> 1 in 250", unit: "Ratio", interpretation: "abnormal", note: "High risk result — genetic counselling & NIPT/diagnostic test recommended" }
    ],
    faqs: [
      { question: "When should the double marker test be done?", answer: "Between 11 weeks 0 days and 13 weeks 6 days of pregnancy, dated by crown-rump length on ultrasound. This window is strict — outside it the markers cannot be interpreted, and the second-trimester quadruple marker test becomes the alternative." },
      { question: "What does the double marker test detect?", answer: "It estimates the risk of Down syndrome (trisomy 21), Edwards syndrome (trisomy 18) and Patau syndrome (trisomy 13). It does not screen for neural tube defects, structural abnormalities, thalassaemia or single-gene disorders, and it does not replace the anomaly scan at 18 to 22 weeks." },
      { question: "What is a normal double marker test result?", answer: "A low-risk or screen-negative result, usually meaning a calculated risk below 1 in 250. Individual markers are reported as multiples of the median, with 0.5 to 2.0 MoM being the usual range for both PAPP-A and free beta-hCG in an unaffected pregnancy." },
      { question: "What does a high risk double marker result mean?", answer: "It means your calculated probability is above the screening threshold — not that your baby has a chromosomal abnormality. Even at a risk of 1 in 100, 99 out of 100 women with that result have a normal baby. The next step is genetic counselling and, if you choose, NIPT or a diagnostic test." },
      { question: "Is the double marker test compulsory in India?", answer: "It is not compulsory, but it is offered as part of routine antenatal care and is recommended for all pregnant women, not only older mothers. The decision to have it, and what to do with the result, is entirely yours, and counselling before the test is as important as counselling after it." },
      { question: "What does low PAPP-A mean if my risk is low?", answer: "A very low PAPP-A with an otherwise reassuring chromosomal risk predicts a higher chance of pre-eclampsia, fetal growth restriction and preterm birth. It is a useful early warning that leads to closer monitoring of blood pressure and fetal growth, and in some cases to low-dose aspirin, which your obstetrician will advise on." },
      { question: "Do I need to fast for the double marker test?", answer: "No, fasting is not required. What the test does need is accurate information — your exact gestational age by scan, your date of birth, weight, smoking and diabetes status, and whether it is a single or twin pregnancy. The risk calculation cannot be done without these." },
      { question: "Is the double marker test or NIPT better?", answer: "NIPT is considerably more accurate, detecting over 99% of Down syndrome cases with a very low false-positive rate, but it costs substantially more. The double marker test is more affordable and widely available, and adds information about pre-eclampsia risk that NIPT does not. Many women in India have the double marker first and proceed to NIPT only if it is high risk." },
      { question: "Can the double marker test be done in twin pregnancy?", answer: "Yes, but interpretation is more complex, because the markers come from both placentas and cannot be attributed to an individual fetus. Risk is calculated per pregnancy and per fetus using specific twin algorithms, with the nuchal translucency measured separately for each. It cannot be done reliably in triplets or higher." },
      { question: "What happens if I miss the double marker window?", answer: "If you are past 13 weeks 6 days, the quadruple marker test between 15 and 20 weeks is the alternative second-trimester screen. NIPT can be done from 10 weeks onwards with no upper limit, and the anomaly scan at 18 to 22 weeks remains an essential part of screening regardless." }
    ],
    doctorNote: "Double marker screening provides a risk ratio, not a diagnostic result. Screen-positive results (>1:250) are followed up with non-invasive prenatal testing (NIPT) or amniocentesis after detailed genetic counseling. Low PAPP-A (<0.4 MoM) independently predicts pre-eclampsia and growth restriction, guiding proactive obstetric surveillance.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },

  // ── 2. PAPP-A Test ─────────────────────────────────────────────────────────
  "papp-a": {
    slug: "papp-a",
    title: "PAPP-A Test: Normal Range and Low PAPP-A Meaning | QXL",
    metaDescription: "PAPP-A normal range is 0.5–2.0 MoM in the first trimester. Learn why a low PAPP-A raises the risk of Down syndrome and pre-eclampsia.",
    badge: "FIRST TRIMESTER BIOMARKER · PLACENTAL FUNCTION MARKER",
    h1Title: "PAPP-A: Normal Range in Pregnancy and What a Low Result Actually Means",
    subtitle: "PAPP-A is a protein produced by the placenta and measured between 11 and 13 weeks 6 days as part of first-trimester screening. Normal is 0.5–2.0 MoM. A low PAPP-A raises the calculated risk of Down syndrome, and independently predicts pre-eclampsia, fetal growth restriction and preterm birth.",
    price: "1800",
    oldPrice: "2500",
    discountPercent: "28% OFF",
    parametersCount: "PAPP-A (Pregnancy-Associated Plasma Protein A) MoM",
    sampleType: "Serum (3 mL Blood)",
    fastingRequired: "No fasting required. Must be drawn between 11w0d and 13w6d.",
    turnaroundTime: "3 to 5 Days",
    category: "Prenatal Screening Diagnostics",
    clinicalSignificance: "PAPP-A is a large protein made by the syncytiotrophoblast of the placenta. It functions as a protease that releases insulin-like growth factor from its binding protein, driving trophoblast invasion and placental vascularization. Low PAPP-A indicates impaired placental development, contributing both to Down syndrome risk assessment and independent prediction of pre-eclampsia, growth restriction, and preterm birth.",
    overview: [
      "PAPP-A (pregnancy-associated plasma protein A) is measured between 11 weeks 0 days and 13 weeks 6 days as part of first-trimester screening. It functions as a protease releasing insulin-like growth factor to support placental invasion.",
      "In chromosomal abnormalities such as Down syndrome and trisomies 18 and 13, placental function is impaired and PAPP-A is low. Quite separately, a low PAPP-A in a chromosomally normal pregnancy predicts later consequences of poor placentation — pre-eclampsia, fetal growth restriction, placental abruption, and preterm birth.",
      "PAPP-A is reported as a Multiple of the Median (MoM) adjusted for gestational age, maternal weight, ethnicity, smoking, diabetes, and IVF conception. Raw concentration values are not interpretable."
    ],
    parametersList: [
      "PAPP-A Concentration & Adjusted MoM Value",
      "Gestational Age Correction Factor (Crown-Rump Length)",
      "Maternal Weight & Ethnicity Weighting Factors",
      "Pre-eclampsia & Growth Restriction Risk Indicator"
    ],
    whyImportant: [
      "Biochemical marker in first-trimester combined screening for Down syndrome and trisomies 18 & 13.",
      "Independent early predictor of pre-eclampsia risk to guide low-dose aspirin prophylaxis before 16 weeks.",
      "Identifies pregnancies requiring serial growth ultrasound scans in the second and third trimesters.",
      "Essential evaluation in women with previous pre-eclampsia, hypertension, diabetes, or IVF conception."
    ],
    whenToTest: [
      "11 weeks 0 days to 13 weeks 6 days gestation window",
      "Combined first-trimester prenatal screening",
      "Early screening for pre-eclampsia risk",
      "History of fetal growth restriction or hypertension",
      "Assisted conception (IVF / ICSI) monitoring"
    ],
    referenceRanges: [
      { label: "PAPP-A (Normal)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal", note: "No additional concern from this marker" },
      { label: "PAPP-A (Borderline Low)", range: "0.4 – 0.5", unit: "MoM", interpretation: "borderline", note: "Consider enhanced growth surveillance" },
      { label: "PAPP-A (Low)", range: "< 0.4", unit: "MoM", interpretation: "abnormal", note: "Increased risk of pre-eclampsia & growth restriction" },
      { label: "PAPP-A (Markedly Low)", range: "< 0.3", unit: "MoM", interpretation: "abnormal", note: "Significant placental risk; close obstetric monitoring" },
      { label: "PAPP-A (High)", range: "> 2.0", unit: "MoM", interpretation: "info", note: "Generally not clinically significant" }
    ],
    faqs: [
      { question: "What is a normal PAPP-A level?", answer: "0.5 to 2.0 MoM (multiples of the median) in the first trimester. PAPP-A is never reported as a raw concentration for screening purposes, because the normal level changes rapidly with gestational age and must be adjusted for maternal weight, ethnicity, smoking, diabetes and conception method." },
      { question: "What does low PAPP-A mean?", answer: "It has two separate implications. Within the double marker calculation, it raises the estimated risk of Down syndrome. Independently, a PAPP-A below 0.4 MoM predicts a higher chance of pre-eclampsia, fetal growth restriction and preterm birth, because it reflects a placenta that has not developed as robustly as usual." },
      { question: "Should I worry if my PAPP-A is low but my risk is low?", answer: "It is a reason for extra monitoring, not alarm. Most women with a low PAPP-A and a normal chromosomal risk have entirely uncomplicated pregnancies. Your obstetrician will usually add growth scans, uterine artery Doppler and closer blood pressure checks, and may recommend low-dose aspirin if started before 16 weeks." },
      { question: "When is PAPP-A tested?", answer: "Between 11 weeks 0 days and 13 weeks 6 days of pregnancy, dated by crown-rump length on ultrasound. PAPP-A loses its discriminatory value after 14 weeks, so it cannot be used in second-trimester screening." },
      { question: "Does low PAPP-A mean my baby has Down syndrome?", answer: "No. PAPP-A is one input into a risk calculation that also uses free beta-hCG, nuchal translucency and maternal age. A low PAPP-A raises the calculated risk, but the vast majority of women with a low PAPP-A have chromosomally normal babies. Only a diagnostic test can give a definitive answer." },
      { question: "Can low PAPP-A be treated?", answer: "PAPP-A itself cannot be raised, but the risks it predicts can be managed. Low-dose aspirin started before 16 weeks substantially reduces pre-eclampsia risk in high-risk women. Serial growth scans, Doppler studies and blood pressure monitoring allow early detection of problems, and timely delivery when needed." },
      { question: "Is PAPP-A lower in IVF pregnancies?", answer: "Yes, PAPP-A runs systematically lower in pregnancies conceived through IVF and ICSI. Screening algorithms adjust for this, which is why the laboratory must be told the method of conception. Without that adjustment, IVF pregnancies would receive falsely high risk results." },
      { question: "Do I need to fast for a PAPP-A test?", answer: "No. What the test needs is accurate information rather than fasting — your exact gestational age from the scan, your weight, ethnicity, smoking and diabetes status and whether the pregnancy was conceived naturally or through assisted reproduction." },
      { question: "What is aspirin given for after a low PAPP-A?", answer: "Low-dose aspirin, usually 150 mg at night started before 16 weeks and continued until around 36 weeks, reduces the risk of pre-eclampsia and growth restriction in women identified as high risk. A low PAPP-A is one of the factors that contributes to that risk assessment, alongside blood pressure, medical history and uterine artery Doppler." },
      { question: "Does high PAPP-A matter?", answer: "Generally not. A high PAPP-A is not associated with adverse outcomes and requires no action. It is occasionally seen with a larger baby or with incorrect pregnancy dating, which is worth checking, but on its own it is not a cause for concern." }
    ],
    doctorNote: "Low PAPP-A (<0.4 MoM) is an invaluable early biomarker of placental function. When I see low PAPP-A alongside normal chromosomal risk, I recommend initiating low-dose aspirin prior to 16 weeks and scheduling serial growth Doppler scans starting from 24 weeks.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },

  // ── 3. Free Beta-hCG Test ──────────────────────────────────────────────────
  "free-beta-hcg": {
    slug: "free-beta-hcg",
    title: "Free Beta hCG in Pregnancy Screening: Normal MoM Range | QXL",
    metaDescription: "Free beta-hCG normal range is 0.5–2.0 MoM in prenatal screening. Learn why it rises in Down syndrome, falls in trisomy 18.",
    badge: "UNBOUND BETA SUBUNIT · PRENATAL RISK MARKER",
    h1Title: "Free Beta-hCG in Prenatal Screening: Normal Range and What High or Low Means",
    subtitle: "Free beta-hCG is the unbound beta subunit of hCG, measured as part of first- and second-trimester screening. Normal is 0.5–2.0 MoM. It is typically raised in Down syndrome and reduced in trisomies 18 and 13. It is a different measurement from the total beta-hCG used to confirm pregnancy.",
    price: "1800",
    oldPrice: "2500",
    discountPercent: "28% OFF",
    parametersCount: "Free β-hCG MoM Value",
    sampleType: "Serum (3 mL Blood)",
    fastingRequired: "No fasting required. 11w0d–13w6d (1st Trimester) or 15w0d–20w6d (2nd Trimester).",
    turnaroundTime: "3 to 5 Days",
    category: "Prenatal Screening Diagnostics",
    clinicalSignificance: "hCG consists of alpha and beta subunits. The free beta subunit circulates unattached and is measured specifically in prenatal screening because its proportion is disproportionately elevated in Down syndrome pregnancies (typically >2.0 MoM) and decreased in trisomies 18 and 13 (<0.5 MoM).",
    overview: [
      "Free beta-hCG measures the unattached beta subunit of human chorionic gonadotrophin in maternal blood. It is a distinct test from total quantitative beta-hCG used to confirm early pregnancy.",
      "In trisomy 21 (Down syndrome), free beta-hCG is typically elevated above 2.0 MoM while PAPP-A is reduced. In trisomies 18 and 13, both free beta-hCG and PAPP-A are reduced. Combined with nuchal translucency (NT) scan measurement and maternal age, this generates the overall risk ratio.",
      "Free beta-hCG is also physiologically higher in twin pregnancies and IVF pregnancies, for which screening algorithms apply specific mathematical adjustments."
    ],
    parametersList: [
      "Free β-hCG Subunit Concentration",
      "Adjusted Multiples of Median (MoM) Value",
      "Down Syndrome & Trisomy 18/13 Risk Input"
    ],
    whyImportant: [
      "Biochemical marker in first-trimester double marker screening (11w0d–13w6d).",
      "Component of second-trimester triple and quadruple marker screening panels.",
      "Evaluates risk for Down syndrome, Edwards syndrome, and Patau syndrome.",
      "Different from pregnancy confirmation total hCG — specifically calibrated for prenatal risk algorithms."
    ],
    whenToTest: [
      "11 weeks 0 days to 13 weeks 6 days (First Trimester Screen)",
      "15 weeks 0 days to 20 weeks 6 days (Second Trimester Screen)",
      "Part of first-trimester double marker or quad marker panel",
      "Evaluation following abnormal nuchal translucency ultrasound"
    ],
    referenceRanges: [
      { label: "Free Beta-hCG (Normal)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal", note: "Unaffected pregnancy expected range" },
      { label: "Free Beta-hCG (Raised)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "With low PAPP-A: increased Down syndrome risk" },
      { label: "Free Beta-hCG (Markedly Raised)", range: "> 2.5", unit: "MoM", interpretation: "borderline", note: "Seen in twin pregnancy or molar pregnancy" },
      { label: "Free Beta-hCG (Low)", range: "0.3 – 0.5", unit: "MoM", interpretation: "borderline", note: "With low PAPP-A: consider trisomy 18 or 13" },
      { label: "Free Beta-hCG (Markedly Low)", range: "< 0.3", unit: "MoM", interpretation: "abnormal", note: "Associated with placental insufficiency" }
    ],
    faqs: [
      { question: "What is a normal free beta-hCG level in pregnancy screening?", answer: "0.5 to 2.0 MoM (multiples of the median). Values above 2.0 MoM, especially with a low PAPP-A, contribute to an increased Down syndrome risk, while low values with a low PAPP-A point towards trisomy 18 or 13." },
      { question: "What is the difference between free beta-hCG and total beta-hCG?", answer: "Total beta-hCG measures all hCG and is used to confirm and monitor early pregnancy, reported in mIU/mL. Free beta-hCG measures only the unbound beta subunit and is used in prenatal risk screening, reported in MoM. They are different tests with different purposes, and their numbers are not comparable." },
      { question: "What does high free beta-hCG mean in pregnancy?", answer: "Combined with a low PAPP-A and increased nuchal translucency, it raises the calculated risk of Down syndrome. On its own, however, a raised free beta-hCG is also normal in twin pregnancy and after IVF conception, and with an otherwise normal screen it usually has no significance." },
      { question: "Does a high free beta-hCG mean my baby has Down syndrome?", answer: "No. It is one input into a probability calculation, not a diagnosis. Most women with a raised free beta-hCG have chromosomally normal babies. Only NIPT or a diagnostic test such as chorionic villus sampling or amniocentesis can give a definitive answer." },
      { question: "When is free beta-hCG measured?", answer: "Between 11 weeks 0 days and 13 weeks 6 days as part of the first-trimester double marker test, and between 15 and 20 weeks as part of the triple and quadruple marker tests. Accurate ultrasound dating is essential in both windows." },
      { question: "Do I need to fast for a free beta-hCG test?", answer: "No, fasting is not required. What the test needs is accurate gestational age from your scan, along with your weight, ethnicity, smoking and diabetes status and the method of conception, all of which are used to calculate the MoM value correctly." },
      { question: "Is free beta-hCG affected by twin pregnancy?", answer: "Yes, substantially — two placentas produce more, so the MoM value runs higher. Screening algorithms adjust for twins, but the calculation is inherently less precise than in a singleton, which is why the laboratory must be told and why twin screening results carry more uncertainty." },
      { question: "What does low free beta-hCG mean?", answer: "Low free beta-hCG together with low PAPP-A raises the calculated risk of trisomy 18 or 13. Very low levels can also reflect a poorly functioning placenta and are associated with growth restriction. Incorrect pregnancy dating is another common explanation worth checking." },
      { question: "Is free beta-hCG measured in the quadruple marker test?", answer: "Some quadruple marker protocols use free beta-hCG and others use total hCG, alongside AFP, unconjugated oestriol and inhibin A. Both perform acceptably; what matters is that the laboratory uses a validated algorithm matched to the marker it measures." },
      { question: "Can free beta-hCG detect anything other than chromosomal conditions?", answer: "Only indirectly. Very low levels are associated with placental insufficiency and growth restriction, and markedly raised levels can indicate trophoblastic disease. It does not screen for neural tube defects, structural abnormalities or single-gene disorders, all of which need other tests." }
    ],
    doctorNote: "Free beta-hCG is evaluated as part of a mathematical composite algorithm. Never interpret an isolated free beta-hCG MoM without looking at PAPP-A, nuchal translucency, and maternal risk factors together.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },

  // ── 4. Triple Marker Test ───────────────────────────────────────────────────
  "triple-marker": {
    slug: "triple-marker",
    title: "Triple Marker Test: Normal Range, Timing and Results | QXL",
    metaDescription: "Triple marker test measures AFP, hCG and uE3 between 15 and 20 weeks to screen for Down syndrome, trisomy 18 and open neural tube defects.",
    badge: "SECOND TRIMESTER SCREENING (15–20 WEEKS) · TRIPLE TEST",
    h1Title: "Triple Marker Test: Timing, Normal Values and How to Read Your Risk Result",
    subtitle: "The triple marker test is a second-trimester screening test performed between 15 weeks 0 days and 20 weeks 6 days of pregnancy. It measures Alpha-Fetoprotein (AFP), total hCG, and Unconjugated Oestriol (uE3) in maternal blood to estimate the risk of Down syndrome, Edwards syndrome, and open neural tube defects such as spina bifida.",
    price: "2400",
    oldPrice: "3400",
    discountPercent: "29% OFF",
    parametersCount: "3 Biomarkers (AFP, Total hCG, uE3) + Neural Tube Defect Risk",
    sampleType: "Serum (3 mL Blood)",
    fastingRequired: "No fasting required. Must be drawn between 15w0d and 20w6d (ideal 16–18 weeks).",
    turnaroundTime: "3 to 5 Days",
    category: "Prenatal Screening Diagnostics",
    clinicalSignificance: "The triple marker test provides second-trimester risk assessment when the first-trimester screening window (11–13.6 weeks) was missed. Elevated AFP (>2.0 or 2.5 MoM) screens for open neural tube defects (spina bifida, anencephaly) and abdominal wall defects. Low AFP (<0.5 MoM), elevated hCG (>2.0 MoM), and low uE3 (<0.5 MoM) indicate an increased risk of Down syndrome.",
    overview: [
      "The triple marker test is a second-trimester maternal blood screening test performed strictly between 15 weeks 0 days and 20 weeks 6 days (ideally 16 to 18 weeks). It measures three serum markers: Alpha-Fetoprotein (AFP), total human chorionic gonadotrophin (hCG), and Unconjugated Oestriol (uE3).",
      "Combined with maternal age, weight, exact gestational age dated by ultrasound, and diabetic status, it calculates probability risk figures for Down syndrome (trisomy 21), Edwards syndrome (trisomy 18), and open neural tube defects (NTDs) such as spina bifida and anencephaly.",
      "If the first-trimester double marker window was missed, the triple marker or quadruple marker test provides essential second-trimester biochemical risk evaluation before the 18–22 week anomaly scan."
    ],
    parametersList: [
      "Alpha-Fetoprotein (AFP) MoM Value",
      "Total Human Chorionic Gonadotrophin (hCG) MoM Value",
      "Unconjugated Oestriol (uE3) MoM Value",
      "Trisomy 21 (Down Syndrome) Risk Ratio",
      "Trisomy 18 (Edwards Syndrome) Risk Ratio",
      "Open Neural Tube Defect (NTD / Spina Bifida) Risk Status"
    ],
    whyImportant: [
      "Screens for open neural tube defects (spina bifida & anencephaly) via maternal serum AFP.",
      "Provides second-trimester chromosomal risk screening if the first-trimester double marker window was missed.",
      "Evaluates risk for Down syndrome (trisomy 21) and Edwards syndrome (trisomy 18).",
      "Informs whether high-resolution anomaly ultrasound scan, NIPT, or amniocentesis is indicated."
    ],
    whenToTest: [
      "15 weeks 0 days to 20 weeks 6 days pregnancy window (ideal 16–18 weeks)",
      "Missed first-trimester double marker screening window",
      "Routine second-trimester antenatal risk screening",
      "Screening for open spina bifida and neural tube defects"
    ],
    referenceRanges: [
      { label: "AFP (Unaffected Pregnancy)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "AFP (Neural Tube Defect Risk)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Elevated; risk of spina bifida / anencephaly" },
      { label: "AFP (Down Syndrome Pattern)", range: "< 0.5", unit: "MoM", interpretation: "abnormal", note: "Decreased level associated with trisomy 21" },
      { label: "Total hCG (Unaffected)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "Total hCG (Down Syndrome)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Elevated level associated with trisomy 21" },
      { label: "Unconjugated Oestriol (uE3)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "Unconjugated Oestriol (uE3 Low)", range: "< 0.5", unit: "MoM", interpretation: "abnormal", note: "Decreased in Down syndrome & trisomy 18" },
      { label: "Trisomy 21 Risk — Screen Negative", range: "< 1 in 250", unit: "Ratio", interpretation: "normal" },
      { label: "Trisomy 21 Risk — Screen Positive", range: "> 1 in 250", unit: "Ratio", interpretation: "abnormal", note: "High risk result — genetic counselling recommended" }
    ],
    faqs: [
      { question: "When should the triple marker test be performed?", answer: "Between 15 weeks 0 days and 20 weeks 6 days of pregnancy, with 16 to 18 weeks being the optimal window. Accurate dating by ultrasound is essential for MoM calculation." },
      { question: "What does the triple marker test screen for?", answer: "It screens for Down syndrome (trisomy 21), Edwards syndrome (trisomy 18), and open neural tube defects (such as spina bifida and anencephaly)." },
      { question: "What is the difference between double marker and triple marker?", answer: "Double marker is done in the first trimester (11–13.6 weeks) with PAPP-A, free beta-hCG, and NT scan. Triple marker is done in the second trimester (15–20 weeks) with AFP, total hCG, and uE3, and includes neural tube defect screening." },
      { question: "What does a high AFP result mean on triple marker?", answer: "An AFP above 2.0 or 2.5 MoM suggests an increased risk of open neural tube defects (spina bifida) or abdominal wall defects. It warrants a targeted high-resolution ultrasound anomaly scan." },
      { question: "Do I need to fast for a triple marker test?", answer: "No, fasting is not required. What the laboratory requires is accurate gestational age from an ultrasound scan, maternal weight, age, and diabetes status." },
      { question: "What is a normal triple marker result?", answer: "A calculated risk below 1 in 250 for Down syndrome, and an AFP level below 2.0 MoM for neural tube defects, reported as screen negative." },
      { question: "Is the triple marker or quadruple marker better?", answer: "The quadruple marker is superior because it adds Inhibin A, improving Down syndrome detection rates to 75–81% compared to approximately 65–70% for the triple marker." },
      { question: "Does a high risk result mean my baby has a birth defect?", answer: "No. It is a screening probability estimate. Most women with a high-risk result have healthy, normal babies. Diagnostic confirmation requires NIPT, detailed ultrasound, or amniocentesis." },
      { question: "Can triple marker test be done in twin pregnancies?", answer: "Yes, but marker levels are higher due to two placentas, requiring specialized twin algorithms. Interpretation carries higher uncertainty than in singletons." },
      { question: "What should I do if my triple marker test is high risk?", answer: "Consult your obstetrician for genetic counselling. Recommended follow-up steps include a high-resolution level-II anomaly scan at 18–22 weeks, NIPT, or diagnostic amniocentesis." }
    ],
    doctorNote: "The triple marker test remains a vital second-trimester screen. If a patient missed the first-trimester double marker, the triple or quadruple test provides essential risk calculation for Down syndrome and open neural tube defects before the 18–22 week anomaly scan.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },

  // ── 5. Quadruple Marker Test ────────────────────────────────────────────────
  "quadruple-marker": {
    slug: "quadruple-marker",
    title: "Quadruple Marker Test: Normal Range, Timing and Results | QXL",
    metaDescription: "Quadruple marker test measures AFP, hCG, uE3 and Inhibin A between 15 and 20 weeks to screen for Down syndrome and neural tube defects.",
    badge: "SECOND TRIMESTER GOLD-STANDARD SCREEN (15–20 WEEKS) · QUAD MARKER",
    h1Title: "Quadruple Marker Test: Timing, Normal Values and How to Read Your Risk Result",
    subtitle: "The quadruple marker test is the preferred second-trimester screening test performed between 15 weeks 0 days and 20 weeks 6 days. It measures AFP, total hCG, unconjugated oestriol (uE3), and Inhibin A to evaluate risk for Down syndrome, trisomy 18, and open neural tube defects.",
    price: "2800",
    oldPrice: "4000",
    discountPercent: "30% OFF",
    parametersCount: "4 Biomarkers (AFP, Total hCG, uE3, Inhibin A) + Risk Calculation",
    sampleType: "Serum (3 mL Blood)",
    fastingRequired: "No fasting required. Must be drawn between 15w0d and 20w6d (ideal 16–18 weeks).",
    turnaroundTime: "3 to 5 Days",
    category: "Prenatal Screening Diagnostics",
    clinicalSignificance: "The quadruple marker test adds Inhibin A to the classic triple screen, significantly improving Down syndrome detection rates to 75–81% at a 5% false-positive rate. Inhibin A is produced by the placenta and is typically elevated in Down syndrome pregnancies (often >2.0 MoM).",
    overview: [
      "The quadruple marker test (Quad Screen) is the gold-standard second-trimester biochemical screen performed between 15 weeks 0 days and 20 weeks 6 days of pregnancy (ideally 16 to 18 weeks).",
      "It measures four markers in maternal serum: Alpha-Fetoprotein (AFP), total hCG (or free beta-hCG), Unconjugated Oestriol (uE3), and Inhibin A. The addition of Inhibin A provides superior sensitivity compared to the triple test.",
      "The test calculates statistical risk figures for Down syndrome (trisomy 21), Edwards syndrome (trisomy 18), and open neural tube defects (spina bifida and anencephaly). It is particularly indicated when the first-trimester double marker window was missed."
    ],
    parametersList: [
      "Alpha-Fetoprotein (AFP) MoM Value",
      "Total Human Chorionic Gonadotrophin (hCG) MoM Value",
      "Unconjugated Oestriol (uE3) MoM Value",
      "Inhibin A MoM Value",
      "Trisomy 21 (Down Syndrome) Risk Ratio",
      "Trisomy 18 (Edwards Syndrome) Risk Ratio",
      "Open Neural Tube Defect (NTD) Risk Status"
    ],
    whyImportant: [
      "Gold-standard second-trimester biochemical screen for Down syndrome and neural tube defects.",
      "Inhibin A addition increases Down syndrome detection rate to 75–81%.",
      "Essential second-trimester screen when first-trimester double marker screening was not performed.",
      "Evaluates open spina bifida and anencephaly risk via maternal serum AFP."
    ],
    whenToTest: [
      "15 weeks 0 days to 20 weeks 6 days pregnancy window (ideal 16–18 weeks)",
      "Missed first-trimester double marker screening window",
      "Gold-standard second-trimester antenatal screening",
      "Screening for neural tube defects and abdominal wall defects"
    ],
    referenceRanges: [
      { label: "AFP (Unaffected Pregnancy)", range: "0.5 – 2.0", unit: "MoM", interpretation: "normal" },
      { label: "AFP (Neural Tube Defect Risk)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Elevated; indicates open spina bifida risk" },
      { label: "AFP (Down Syndrome Pattern)", range: "< 0.5", unit: "MoM", interpretation: "abnormal", note: "Low level associated with trisomy 21" },
      { label: "Total hCG (Down Syndrome)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Elevated level associated with trisomy 21" },
      { label: "Unconjugated Oestriol (uE3 Low)", range: "< 0.5", unit: "MoM", interpretation: "abnormal", note: "Decreased in trisomy 21 & trisomy 18" },
      { label: "Inhibin A (Down Syndrome)", range: "> 2.0", unit: "MoM", interpretation: "abnormal", note: "Elevated level significantly improves quad screen accuracy" },
      { label: "Trisomy 21 Risk — Screen Negative", range: "< 1 in 250", unit: "Ratio", interpretation: "normal" },
      { label: "Trisomy 21 Risk — Screen Positive", range: "> 1 in 250", unit: "Ratio", interpretation: "abnormal", note: "High risk result — genetic counselling & NIPT recommended" }
    ],
    faqs: [
      { question: "When should the quadruple marker test be done?", answer: "Between 15 weeks 0 days and 20 weeks 6 days of pregnancy, dated by ultrasound. The optimal window is 16 to 18 weeks." },
      { question: "What does the quadruple marker test detect?", answer: "It estimates the risk of Down syndrome (trisomy 21), Edwards syndrome (trisomy 18), and open neural tube defects such as spina bifida and anencephaly." },
      { question: "Why is the quadruple marker test better than the triple marker test?", answer: "The quadruple marker adds Inhibin A, which increases the Down syndrome detection rate from ~65-70% (triple marker) to ~75-81% at a 5% false-positive rate." },
      { question: "What is a normal quadruple marker test result?", answer: "A low-risk or screen-negative result, meaning a calculated trisomy 21 risk below 1 in 250 and an AFP MoM below 2.0 or 2.5." },
      { question: "What does a high risk quadruple marker result mean?", answer: "It means the calculated probability is above the screening threshold. It does not diagnose a condition. Next steps include genetic counselling, NIPT, level-II ultrasound scan, or amniocentesis." },
      { question: "Do I need to fast for a quadruple marker test?", answer: "No, fasting is not required. What the test needs is accurate gestational age from an ultrasound scan, maternal date of birth, weight, diabetes status, and smoking history." },
      { question: "Can the quadruple marker test replace the 18–22 week anomaly scan?", answer: "No. The quadruple marker is a biochemical blood screen, whereas the 18–22 week anomaly scan visually evaluates fetal anatomical structures. Both are complementary and essential." },
      { question: "How are quadruple marker results reported?", answer: "Results are reported as Multiples of the Median (MoM) for each marker, along with calculated numerical risk ratios (e.g., 1 in 1,500) and an overall screen negative or screen positive status." },
      { question: "Is the quadruple marker test suitable for twin pregnancies?", answer: "Yes, but interpretation requires specialized twin calculation algorithms. Detection rates are slightly lower in twins compared to singletons." },
      { question: "What happens if I miss the 20-week quadruple marker window?", answer: "After 20 weeks 6 days, biochemical marker screening cannot be performed. NIPT can still be done, and the detailed ultrasound anomaly scan remains essential." }
    ],
    doctorNote: "The quadruple marker test is the preferred second-trimester biochemical screen. By adding Inhibin A, we achieve significantly higher accuracy for Down syndrome detection than the older triple test. I recommend it for any patient who missed the first-trimester double marker window.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  }
};

// Also add alias keys with -test-bangalore suffix
export const prenatalScreeningPagesWithAliases: Record<string, DynamicPageData> = {
  ...prenatalScreeningPages,
  "double-marker-test-bangalore": prenatalScreeningPages["double-marker"],
  "papp-a-test-bangalore": prenatalScreeningPages["papp-a"],
  "free-beta-hcg-test-bangalore": prenatalScreeningPages["free-beta-hcg"],
  "triple-marker-test-bangalore": prenatalScreeningPages["triple-marker"],
  "quadruple-marker-test-bangalore": prenatalScreeningPages["quadruple-marker"]
};
