/**
 * QXL Diagnostics — Central AI Knowledge Base & System Prompt Generator.
 * Grounds Gemini AI Assistant responses with accurate website content, test catalog,
 * package directory, NABL accreditation, location details, and clinical guidelines.
 */

export const QXL_AI_KEY = process.env.NEXT_PUBLIC_QXL_AI_KEY || "";
export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

export const QXL_WEBSITE_KNOWLEDGE_BASE = `
ABOUT QXL DIAGNOSTICS:
- Name: QXL Diagnostics (Doctor-Led Super Speciality Diagnostic Laboratory)
- Accreditation: NABL Accredited (MC-6849) | ISO 15189:2022 Certified
- Quality Controls: Daily internal quality control & external quality assessment (EQAS)
- Doctor-Led Reporting: Every report is personally reviewed and signed off by senior consultant doctors (Pathologists, Biochemists, Microbiologists).
- Contact Phone / WhatsApp: +91 9964 639 639
- Website: https://www.qxldiagnostics.com
- Email: qxldiagnostics@gmail.com / info@qxldiagnostics.com

LAB LOCATIONS IN BENGALURU:
1. Main Reference Lab (Kengeri): 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru - 560060 (Open 24x7)
2. North Express Hub (Yelahanka): L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru - 560064
3. Doorstep Home Collection: Free doorstep home sample collection across all 60+ Bengaluru localities including Koramangala, Indiranagar, Whitefield, HSR Layout, Jayanagar, JP Nagar, Electronic City, Yelahanka, Kengeri, Rajajinagar, RR Nagar, Vijayanagar, Hebbal, Banashankari, BTM Layout, etc.

CONSULTANT DOCTORS / MEDICAL LEADERSHIP:
- Dr. Shantakumar Muruda (MD Biochemistry)
- Dr. Pritilata Rout (MD Pathology)
- Dr. Ajitha Pillai (MD Microbiology)
- Dr. Naveen Kumar N (DCP, DNB Pathology)

CORE PREVENTIVE HEALTH PACKAGES:
1. Quick Fit Package: ₹1,770 (MRP ₹4,696) - 14+ Parameters. Includes FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, LFT, KFT (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine. Fasting: 8-10 hrs.
2. Q-Screen Diabetes Package: ₹1,900 (MRP ₹4,960) - 16+ Parameters. Includes FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, LFT, KFT, TSH, CBC, ESR, Urine Routine. Fasting: 8-10 hrs.
3. Q-Master Health Pro Package: ₹4,600 (MRP ₹9,600) - 92 Parameters. Includes FBS, HbA1c, eAG, Insulin, HOMA-IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, LFT, KFT, Electrolytes (Na, K, Cl), Thyroid Profile (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine, Gastritis Screen (H. pylori IgG), hs-CRP. Fasting: 10-12 hrs.
4. Ultra Full Body Checkup (Master): ₹4,999 (MRP ₹18,588) - 117 Parameters. Includes all 92 parameters of Master Pro + Homocysteine + Lipoprotein(a) + Iron Profile (Serum Iron, TIBC, Ferritin, % Saturation) + Electrolyte Profile. Fasting: 10-12 hrs.
5. Q-Advanced Arthritis & Autoimmune Panel: ₹6,900 (MRP ₹12,660) - 22+ Parameters. Includes Autoimmune Markers (RF, Anti-CCP, ANA), hs-CRP, ESR, Bone Health, Iron Studies, Cortisol, DHEA-S, LFT, KFT, Thyroid, CBC, Urine.
6. Q-Oncology Biomarker Panel: ₹7,900 (MRP ₹13,600) - 15+ Parameters. Includes Tumor Markers (AFP, CEA, Beta HCG, PSA Male / CA-125 Female, CA 19-9), Stool Calprotectin, FOBT, SPEP, CBC, ESR, Urine.
7. Q-Cardiovascular Risk Assessment Package: ₹9,000 (MRP ₹18,900) - 25+ Parameters. Includes Lp(a), ApoB, Apo A1, Homocysteine, NT-proBNP, hs-CRP, Fibrinogen, Insulin, C-Peptide, Lipid Profile, KFT, CBC, Cortisol, Serum Magnesium.

PATIENT TEST PACKAGE GUIDE (#01 to #42 ROUTINE & DOCTOR-DIRECTED PACKAGES):
Note: Prices for Doctor-Directed & Speciality packages are available on request by calling/messaging +91 9964 639 639.
- #01 Anemia Evaluation Profile (Self-Request Possible): CBC, Ferritin, Serum Iron, TIBC, Saturation, Reticulocyte count, B12, Folate, CRP/ESR.
- #02 Inflammatory Arthritis Evaluation (Consultation Recommended): CBC, ESR, CRP, RF, Anti-CCP, ANA reflex, Uric Acid, HLA-B27, Kidney & Liver baseline.
- #03 Initial Antenatal Profile (Doctor-Directed): Baseline early pregnancy blood, infection screen (HIV, Hep B/C, Syphilis), ABO/Rh, Urinalysis, Glucose, Rubella IgG, TSH.
- #04 Comprehensive Iron Studies (Self-Request Possible): Serum Iron, Ferritin, TIBC, UIBC, % Saturation, CRP.
- #05 Androgen Evaluation Profile (Consultation Recommended): Total & Calculated Free Testosterone, SHBG, Albumin, DHEA-S, Androstenedione, 17-OHP, DHT.
- #06 Autoimmune Liver Disease Evaluation (Doctor-Directed): LFT, Total IgG, ANA, Smooth Muscle Ab, LKM-1, SLA, Antimitochondrial Ab, Hep B/C screen.
- #07 Adrenal Insufficiency Evaluation (Doctor-Directed): 8 AM Cortisol, ACTH, Sodium, Potassium, Glucose, Creatinine, Cosyntropin stimulation.
- #08 Basic Metabolic Panel - Standardized (Self-Request Possible): Fasting/Random Glucose, Urea/BUN, Creatinine with eGFR, Sodium, Potassium, Chloride, Bicarbonate, Calcium.
- #09 Breast Screening Biomarker Guidance (Doctor-Directed): Clinical assessment, imaging, CA 15-3 / CA 27.29 / CEA for oncologist monitoring.
- #10 Basic Bone and Mineral Profile (Self-Request Possible): Calcium, Phosphorus, Magnesium, Albumin, Alkaline Phosphatase, 25-OH Vitamin D, Intact PTH, Creatinine.
- #11 Cardiac Risk & Acute Injury Pathways (Doctor-Directed): Lipid Profile, hs-CRP, hs-Troponin I/T, BNP/NT-proBNP, ApoB, Lp(a).
- #12 Cardiolipin Antibody Profile (Doctor-Directed): Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I, Lupus Anticoagulant.
- #13 Basic Coagulation Profile (Consultation Recommended): PT/INR, APTT, CBC with Platelet Count.
- #14 Extended Bleeding & Coagulation Evaluation (Doctor-Directed): PT/INR, APTT, Fibrinogen, Thrombin Time, D-dimer, Mixing studies.
- #15 First-Trimester Combined Aneuploidy Screen (Doctor-Directed): PAPP-A, Free beta-hCG, NT Ultrasound.
- #16 Second-Trimester Triple Marker Screen (Doctor-Directed): AFP, hCG, Unconjugated Estriol (uE3).
- #17 Second-Trimester Quadruple Marker Screen (Doctor-Directed): AFP, hCG, uE3, Inhibin A.
- #18 Electrolytes Plus (Self-Request Possible): Sodium, Potassium, Chloride, Bicarbonate, Magnesium, Calcium.
- #19 STI Screening Panel - Risk Based (Consultation Recommended): HIV-1/2, Hep B, Hep C, Chlamydia & Gonorrhea NAAT, Syphilis screen.
- #20 Female Fertility Evaluation (Consultation Recommended): FSH, LH, Prolactin, Estradiol, Progesterone, AMH, TSH, DHEA-S, Testosterone/SHBG.
- #21 Menopause Assessment (Consultation Recommended): TSH, Free T4, FSH, LH, Estradiol.
- #22 Complex Menopause & Amenorrhea Evaluation (Consultation Recommended): TSH, Free T4, FSH, Prolactin, Estradiol, 17-OHP, HbA1c, Lipids.
- #23 MMR Immunity Profile (Self-Request Possible): Measles IgG, Mumps IgG, Rubella IgG.
- #24 Monoclonal Gammopathy / Myeloma Evaluation (Doctor-Directed): SPEP, Serum Immunofixation, Free Light Chains (ratio), IgG, IgA, IgM, Calcium, Creatinine, Beta-2 Microglobulin, LDH.
- #25 Musculoskeletal Inflammation Screen (Consultation Recommended): CBC, ESR, CRP, RF/Anti-CCP, Uric Acid, Vitamin D, Calcium.
- #26 Osteoporosis & Secondary-Cause Panel (Consultation Recommended): Calcium, Phosphorus, Magnesium, 25-OH Vitamin D, Intact PTH, Albumin, ALP, Creatinine, TSH, P1NP, Osteocalcin, Beta-CTX.
- #27 Recurrent Pregnancy Loss / APS Evaluation (Doctor-Directed): Lupus Anticoagulant, Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I.
- #28 Prostate Assessment - PSA Based (Doctor-Directed): Total PSA, Urinalysis, Creatinine/eGFR.
- #29 Prostate Cancer Risk Assessment - PSA Reflex (Doctor-Directed): Total PSA, Reflex Free PSA (Free-to-Total ratio).
- #30 PCOS Diagnostic & Metabolic Profile (Consultation Recommended): TSH, Total/Free Testosterone, SHBG, DHEA-S, Prolactin, FSH, LH, HbA1c, Lipids.
- #31 PCOS Evaluation - Not Population Screening (Consultation Recommended): TSH, Total/Free Testosterone, SHBG, DHEA-S, Prolactin, 17-OHP, HbA1c, Lipids.
- #32 Complete Antiphospholipid Syndrome Panel (Doctor-Directed): Anticardiolipin IgG/IgM, Lupus Anticoagulant, Anti-beta-2 glycoprotein I.
- #33 Basic Iron Deficiency Profile (Self-Request Possible): CBC, Ferritin, Serum Iron, TIBC, Saturation.
- #34 Kidney Function Test - Basic (Self-Request Possible): Urea/BUN, Creatinine with eGFR, Uric Acid, Sodium, Potassium, Chloride, Urinalysis, Urine ACR.
- #35 Kidney Function & Mineral Profile (Self-Request Possible): Urea/BUN, Creatinine, Electrolytes, Calcium, Phosphorus, Magnesium, Albumin, Urinalysis, UACR.
- #36 Acute Fever Initial Evaluation (Consultation Recommended): CBC, CRP, LFT, Creatinine, Electrolytes, Malaria Rapid Smear, Dengue test.
- #37 Diabetes Glycemic Profile - Basic (Self-Request Possible): HbA1c, Fasting Glucose, Post-meal Glucose, Creatinine with eGFR.
- #38 Comprehensive Diabetes Monitoring Profile (Self-Request Possible): HbA1c, Fasting & Post-meal Glucose, Lipid Profile, Creatinine with eGFR, UACR, Urinalysis, LFT.
- #39 Specimen-Specific Culture & Susceptibility (Doctor-Directed): Gram stain, Bacterial culture & ID, Antimicrobial susceptibility (AST).
- #40 Tuberculosis Evaluation - Active vs Latent (Doctor-Directed): Sputum CBNAAT, AFB Smear, Mycobacterial Culture, HIV, IGRA/TB Gold for latent.
- #41 Pneumonia Severity & Etiology Evaluation (Doctor-Directed): CBC, CRP, KFT, LFT, Respiratory Viral NAAT, Sputum Gram stain/culture.
- #42 Urine Drug Screen - 10 Classes (Consultation Recommended): 10 drug class immunoassay screen, urine creatinine, adulterant checks, GC-MS/LC-MS confirmation.

POPULAR INDIVIDUAL BLOOD TESTS & PRICING:
- Complete Blood Count (CBC): ₹250 (MRP ₹350) - 26 parameters, same-day report. No fasting.
- HbA1c (Glycated Hemoglobin): ₹380 (MRP ₹720) - 3-month sugar average. No fasting.
- Fasting Blood Sugar (FBS): ₹35 (MRP ₹70) - 8-10 hrs fasting required.
- Postprandial Blood Sugar (PPBS): ₹35 (MRP ₹70) - 2 hrs post meal.
- Thyroid Profile (TSH, Free T4, Free T3): ₹350 (MRP ₹550) - 3 parameters.
- Thyroid Stimulating Hormone (TSH): ₹180 (MRP ₹280)
- Lipid Profile: ₹336 (MRP ₹600) - 8 parameters, 10-12 hrs fasting required.
- Liver Function Test (LFT): ₹425 (MRP ₹780) - 11 parameters.
- Kidney Function Test (KFT / RFT): ₹425 (MRP ₹1,150) - 10 parameters.
- Serum Creatinine + eGFR: ₹85 (MRP ₹150)
- Uric Acid: ₹135 (MRP ₹250)
- C-Reactive Protein (CRP): ₹325 (MRP ₹550)
- ESR (Sedimentation Rate): ₹60 (MRP ₹120)
- Vitamin D (25-OH): ₹410 (MRP ₹1,300)
- Vitamin B12: ₹600 (MRP ₹1,600)
- Ferritin: ₹565 (MRP ₹1,320)
- Electrolytes Panel (Na, K, Cl): ₹330 (MRP ₹450)
- Urine Routine Examination: ₹110 (MRP ₹300) - 18 parameters.
- Homocysteine: ₹890
- High-Sensitivity Troponin: ₹1,160

IMPORTANT CLINICAL SAFETY GUIDELINE:
If the user asks about emergency symptoms like severe chest pain, sudden difficulty breathing, stroke symptoms, loss of consciousness, or massive bleeding, ALWAYS start with an immediate emergency warning: "🚨 **Emergency Medical Care Notice:** If you or someone near you is experiencing severe chest pain, acute shortness of breath, or stroke symptoms, please call local emergency services (108) or go to the nearest hospital immediately."
`;

export async function fetchOpenAiSpeech(text: string): Promise<string | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
    if (!apiKey) return null;

    const cleanText = text
      .replace(/[*#_~🚨🩸🦋💇⚡🦴🩺]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/₹/g, 'Rupees ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 800);

    if (!cleanText) return null;

    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova',
        input: cleanText,
        speed: 1.05
      })
    });

    if (!res.ok) return null;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

export function getQxlSystemPrompt(question: string, language?: string): string {
  const langInstruction = language && language !== 'en' ? `\nPlease answer in ${language}.` : '';
  return `You are the official NABL Accredited (MC-6849) QXL Diagnostics Clinical AI Assistant in Bengaluru.

CRITICAL MANDATORY RULES:
1. ALWAYS state QXL Diagnostics (Doctor-Led NABL Accredited Laboratory MC-6849).
2. ALWAYS recommend relevant QXL preventive health packages with exact prices (e.g., Quick Fit Package ₹1,770, Q-Screen Diabetes Package ₹1,900, Q-Master Health Pro ₹4,600, Ultra Full Body Checkup ₹4,999) or routine test prices in INR (₹).
3. ALWAYS mention 100% Free Doorstep Home Sample Collection across all 60+ Bengaluru localities (+91 9964 639 639).
4. Be ultra-concise, fast, direct, and formatted with bullet points so the user gets their answer immediately!

KNOWLEDGE BASE:
${QXL_WEBSITE_KNOWLEDGE_BASE}

USER QUESTION:
${question}${langInstruction}`;
}

export function getGroundedClinicalAiResponse(question: string): string {
  const q = question.toLowerCase().trim();

  // Emergency Medical Care Check
  if (
    q.includes('chest pain') ||
    q.includes('shortness of breath') ||
    q.includes('difficulty breathing') ||
    q.includes('stroke') ||
    q.includes('unconscious') ||
    q.includes('fainting') ||
    q.includes('heavy bleeding') ||
    q.includes('severe bleeding') ||
    q.includes('anaphylaxis')
  ) {
    return `🚨 **EMERGENCY MEDICAL CARE NOTICE**\n\nIf you or someone near you is experiencing critical or life-threatening symptoms (severe chest pain, shortness of breath, stroke, fainting), **please call emergency services (108) or proceed immediately to the nearest hospital.**\n\n*QXL Diagnostics (NABL Accredited MC-6849) provides outpatient laboratory testing & free doorstep sample collection across Bengaluru (+91 9964 639 639).*`;
  }

  // Thyroid Topics
  if (q.includes('thyroid') || q.includes('tsh') || q.includes('t3') || q.includes('t4') || q.includes('hypothyroid') || q.includes('hyperthyroid')) {
    return `🦋 **QXL Diagnostics — Thyroid Function & Metabolic Testing**\n\nQXL Diagnostics is a doctor-led NABL Accredited Laboratory (MC-6849) in Bengaluru.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Thyroid Profile (TSH, Free T3, Free T4):** **₹350** *(MRP ₹550)*\n• **TSH (Thyroid Stimulating Hormone):** **₹180** *(MRP ₹280)*\n• **Quick Fit Package (₹1,770 | MRP ₹4,696):** Includes Thyroid, FBS, HbA1c, LFT, KFT, Vit D & CBC.\n• **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 Parameters comprehensive full body checkup.\n\n*100% Free Doorstep Home Collection across all 60+ Bengaluru localities. Same-day digital reports.* Call/WhatsApp **+91 9964 639 639** to book!`;
  }

  // Hair Fall / Skin / Weight Loss
  if (q.includes('hair') || q.includes('hairfall') || q.includes('weight loss') || q.includes('weight gain')) {
    return `💇 **QXL Diagnostics — Hair Fall & Metabolic Panel**\n\nQXL Diagnostics (NABL Accredited MC-6849) provides accurate doctor-reviewed metabolic & deficiency screening.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Thyroid Profile:** **₹350** | **Serum Ferritin:** **₹565** | **Vitamin D:** **₹410** | **Vitamin B12:** **₹600** | **CBC:** **₹250**\n• **Quick Fit Package (₹1,770 | MRP ₹4,696):** 14+ parameters covering Thyroid, Vit D, HbA1c, LFT, KFT & CBC.\n• **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 parameters comprehensive checkup.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Diabetes & Blood Sugar
  if (q.includes('sugar') || q.includes('diabet') || q.includes('hba1c') || q.includes('fbs') || q.includes('ppbs') || q.includes('glucose') || q.includes('insulin')) {
    return `🩸 **QXL Diagnostics — Diabetes & Glycemic Panel**\n\nQXL Diagnostics (NABL Accredited MC-6849) delivers doctor-certified glycemic monitoring.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **HbA1c (3-Month Sugar Average):** **₹380** *(MRP ₹720)*\n• **Fasting Blood Sugar (FBS):** **₹35** | **PPBS:** **₹35**\n• **Q-Screen Diabetes Package (₹1,900 | MRP ₹4,960):** 16+ parameters (HbA1c, Urine Microalbumin, C-Peptide, Lipid, LFT, KFT, CBC).\n• **Quick Fit Package (₹1,770):** Fasting Sugar, HbA1c, Thyroid, LFT, KFT, Vit D & CBC.\n\n*100% Free Doorstep Home Collection across all 60+ Bengaluru localities.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // CBC & Blood Tests / Anemia
  if (q.includes('cbc') || q.includes('blood test') || q.includes('blood count') || q.includes('hemoglobin') || q.includes('anemia') || q.includes('iron') || q.includes('ferritin') || q.includes('platelet')) {
    return `💉 **QXL Diagnostics — Complete Blood Count (CBC)**\n\nQXL Diagnostics (NABL Accredited MC-6849) evaluates 26 parameters of your blood for anemia, infection & immunity.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **CBC Test:** **₹250** *(MRP ₹350)* – 26 parameters, same-day report in 6 hours.\n• **Anemia Evaluation Profile (#01):** Includes CBC, Ferritin, Serum Iron, TIBC, B12, Folate & CRP.\n• **Quick Fit Package (₹1,770 | MRP ₹4,696):** Complete 14+ parameter checkup including CBC.\n• **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 parameters master health checkup.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Fever / Dengue / Infection
  if (q.includes('fever') || q.includes('dengue') || q.includes('malaria') || q.includes('typhoid') || q.includes('infection') || q.includes('cold') || q.includes('cough') || q.includes('flu')) {
    return `🤒 **QXL Diagnostics — Acute Fever & Infection Panel**\n\nQXL Diagnostics (NABL Accredited MC-6849) provides fast-track infection screening and phlebotomist home visits.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **CBC with Platelet Count:** **₹250** | **C-Reactive Protein (CRP):** **₹325**\n• **Acute Fever Panel (#36):** CBC, CRP, LFT, KFT, Dengue NS1/IgG/IgM, Malaria Smear, Urine Routine.\n• **Quick Fit Package (₹1,770):** Baseline full body checkup.\n\n*100% Free Doorstep Home Collection across Bengaluru within 60 mins.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Fatigue / Energy / Vitamins
  if (q.includes('fatigue') || q.includes('weakness') || q.includes('tired') || q.includes('vitamin') || q.includes('b12') || q.includes('vitamin d')) {
    return `⚡ **QXL Diagnostics — Fatigue & Vitamin Deficiency Panel**\n\nQXL Diagnostics (NABL Accredited MC-6849) tests vital energy and bone metabolism markers.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Vitamin D (25-OH Total):** **₹410** *(MRP ₹1,300)*\n• **Vitamin B12:** **₹600** *(MRP ₹1,600)* | **CBC:** **₹250**\n• **Quick Fit Package (₹1,770 | MRP ₹4,696):** 14+ parameters (Vit D, TSH, Fasting Sugar, HbA1c, Lipid, LFT, KFT, CBC).\n• **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 parameters (Vit D, Vit B12, Electrolytes, H. Pylori, hs-CRP).\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Joint Pain / Arthritis / Uric Acid
  if (q.includes('joint') || q.includes('arthritis') || q.includes('uric') || q.includes('bone') || q.includes('calcium') || q.includes('gout')) {
    return `🦴 **QXL Diagnostics — Joint Pain & Arthritis Screening**\n\nQXL Diagnostics (NABL Accredited MC-6849) evaluates gout, bone density & autoimmune joint markers.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Uric Acid:** **₹135** | **Serum Calcium:** **₹120** | **Vitamin D:** **₹410** | **ESR:** **₹60** | **CRP:** **₹325**\n• **Q-Advanced Arthritis & Autoimmune Panel (₹6,900):** RF, Anti-CCP, ANA, Bone Health, LFT, KFT & CBC.\n• **Quick Fit Package (₹1,770):** Routine baseline checkup.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Heart / Cholesterol / Lipid / BP
  if (q.includes('lipid') || q.includes('cholesterol') || q.includes('heart') || q.includes('cardiac') || q.includes('bp') || q.includes('pressure') || q.includes('triglycerides')) {
    return `🫀 **QXL Diagnostics — Cardiac Risk & Lipid Profile**\n\nQXL Diagnostics (NABL Accredited MC-6849) offers comprehensive cardiovascular biomarker screening.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Lipid Profile (8 Parameters):** **₹336** *(MRP ₹600)*\n• **hs-CRP (Cardiac Inflammation):** **₹325** | **Homocysteine:** **₹890** | **Lp(a):** **₹1,150**\n• **Ultra Full Body Checkup (₹4,999 | MRP ₹18,588):** 117 parameters including Homocysteine, Lp(a), Iron & Electrolytes.\n• **Q-Cardiovascular Risk Package (₹9,000):** 25+ advanced cardiac & ApoB markers.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Liver / LFT / Jaundice
  if (q.includes('liver') || q.includes('lft') || q.includes('jaundice') || q.includes('sgot') || q.includes('sgpt') || q.includes('bilirubin')) {
    return `🫁 **QXL Diagnostics — Liver Function Test (LFT)**\n\nQXL Diagnostics (NABL Accredited MC-6849) evaluates liver enzymes, proteins, and bilirubin.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Liver Function Test (LFT):** **₹425** *(MRP ₹780)* – 11 parameters.\n• **Quick Fit Package (₹1,770 | MRP ₹4,696):** 14+ parameters (LFT, KFT, Lipid, TSH, HbA1c, Vit D, CBC).\n• **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 parameters full body checkup.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Kidney / KFT / RFT / Creatinine
  if (q.includes('kidney') || q.includes('kft') || q.includes('rft') || q.includes('creatinine') || q.includes('urea') || q.includes('urine')) {
    return `🩺 **QXL Diagnostics — Kidney Function Test (KFT / RFT)**\n\nQXL Diagnostics (NABL Accredited MC-6849) tests kidney filtration capacity and electrolytes.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Kidney Function Test (KFT):** **₹425** *(MRP ₹1,150)* – 10 parameters.\n• **Serum Creatinine:** **₹85** | **Urine Routine:** **₹110**\n• **Quick Fit Package (₹1,770):** KFT, LFT, Lipid, TSH, HbA1c, Vit D & CBC.\n• **Q-Screen Diabetes Package (₹1,900):** KFT, Urine Microalbumin & HbA1c.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // PCOS / Women Health / Hormones
  if (q.includes('pcos') || q.includes('pcod') || q.includes('period') || q.includes('hormone') || q.includes('amh') || q.includes('pregnancy')) {
    return `🌸 **QXL Diagnostics — Women's Health & PCOS Screening**\n\nQXL Diagnostics (NABL Accredited MC-6849) provides doctor-led female hormonal evaluation.\n\n**Recommended QXL Diagnostic Tests & Packages:**\n• **Thyroid Profile:** **₹350** | **AMH (Ovarian Reserve):** Doctor-directed | **FSH / LH / Prolactin**\n• **Quick Fit Package (₹1,770):** 14+ parameters routine baseline checkup.\n• **PCOS Diagnostic Profile (#30):** Full hormonal & metabolic screening.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Packages & Full Body Checkups
  if (q.includes('package') || q.includes('checkup') || q.includes('full body') || q.includes('offer')) {
    return `🏥 **QXL Diagnostics — Health Packages Directory**\n\nQXL Diagnostics (Doctor-Led NABL Accredited MC-6849) Top Preventive Health Packages:\n\n1. **Quick Fit Package (₹1,770 | MRP ₹4,696):** 14+ parameters (FBS, HbA1c, Lipid, LFT, KFT, TSH, Vit D, CBC).\n2. **Q-Screen Diabetes Package (₹1,900 | MRP ₹4,960):** 16+ parameters (HbA1c, Microalbumin, C-Peptide, Lipid, LFT, KFT, CBC).\n3. **Q-Master Health Pro (₹4,600 | MRP ₹9,600):** 92 parameters (Full Body + Electrolytes, Vit D, Vit B12, H. pylori, hs-CRP).\n4. **Ultra Full Body Checkup (₹4,999 | MRP ₹18,588):** 117 parameters (Master Pro + Homocysteine + Lp(a) + Iron Profile).\n5. **42 Doctor-Directed Speciality Packages:** Price on request (+91 9964 639 639).\n\n*100% Free Doorstep Home Collection across all 60+ Bengaluru localities.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Fasting Instructions
  if (q.includes('fast') || q.includes('empty stomach') || q.includes('eat') || q.includes('water')) {
    return `⏰ **QXL Diagnostics — Test Fasting Guidelines**\n\nQXL Diagnostics (NABL Accredited MC-6849) Fasting Rules:\n\n• **8 to 10 Hours Fasting:** Fasting Sugar (FBS ₹35), Q-Screen Diabetes Package (₹1,900).\n• **10 to 12 Hours Fasting:** Lipid Profile (₹336), Quick Fit Package (₹1,770), Q-Master Health Pro (₹4,600), Ultra Full Body (₹4,999).\n• **NO Fasting Needed:** CBC (₹250), Thyroid Profile (₹350), HbA1c (₹380), Vit D (₹410), Vit B12 (₹600).\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Report Turnaround & Delivery
  if (q.includes('report') || q.includes('download') || q.includes('time') || q.includes('how long') || q.includes('status')) {
    return `📄 **QXL Diagnostics — Report Turnaround & Sign-Off**\n\nQXL Diagnostics (NABL Accredited MC-6849):\n\n• **Turnaround:** Same-day digital report within 6 hours for routine tests.\n• **Doctor Sign-Off:** Every report is evaluated & signed by senior consultant doctors (MD Pathologists).\n• **Delivery:** Secure PDF delivered on WhatsApp & Email.\n\n*100% Free Doorstep Home Collection across Bengaluru.* Call/WhatsApp **+91 9964 639 639**!`;
  }

  // Lab Locations & Timings
  if (q.includes('location') || q.includes('lab') || q.includes('center') || q.includes('where') || q.includes('address') || q.includes('timing') || q.includes('open')) {
    return `📍 **QXL Diagnostics — Reference Lab & Doorstep Service**\n\n1. **Main Reference Lab (Kengeri):** 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru - 560060 *(Open 24x7)*\n2. **North Express Hub (Yelahanka):** L Square, opp RMZ Galleria Mall, Yelahanka, Bengaluru - 560064\n3. **100% Free Doorstep Home Collection:** Available daily 6 AM - 8 PM across all 60+ Bengaluru localities.\n\n📞 **Helpline / WhatsApp:** +91 9964 639 639`;
  }

  // General Fallback for any other query
  return `🔬 **QXL Diagnostics — Doctor-Led NABL Accredited Lab (MC-6849)**\n\nThank you for asking about **"${question}"**! QXL Diagnostics is Bengaluru's premier diagnostic laboratory.\n\n**Top QXL Preventive Health Packages & Tests:**\n• **Quick Fit Package:** **₹1,770** *(MRP ₹4,696)* – 14+ Parameters\n• **Q-Screen Diabetes Package:** **₹1,900** *(MRP ₹4,960)* – 16+ Parameters\n• **Q-Master Health Pro:** **₹4,600** *(MRP ₹9,600)* – 92 Parameters\n• **Ultra Full Body Checkup:** **₹4,999** *(MRP ₹18,588)* – 117 Parameters\n• **Routine Tests:** CBC (₹250), HbA1c (₹380), Thyroid Profile (₹350), Fasting Sugar (₹35), Lipid Profile (₹336), LFT (₹425), KFT (₹425), Vit D (₹410), Vit B12 (₹600).\n\n*100% Free Doorstep Home Collection across all 60+ Bengaluru localities.* Call or WhatsApp **+91 9964 639 639** for instant booking!`;
}

