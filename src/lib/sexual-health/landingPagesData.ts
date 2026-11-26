/**
 * QXL Diagnostics — Sexual Health Master Landing Pages Catalogue (36 Dedicated Landing Pages)
 * Clinically reviewed under ISO 15189:2022 standards and NABL Certificate NABLM1126KA10694.
 * Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry)
 * Guidelines: CDC, WHO, NACO, BASHH, IUSTI
 */

export interface InvestigationItem {
  name: string;
  specimen: string;
  window: string;
  tat: string;
  price: string;
  clinicalNote: string;
}

export interface MilestoneItem {
  timeframe: string;
  title: string;
  action: string;
  clinicalGuidance: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClinicalReference {
  label: string;
  url: string;
}

export interface EmergencyNotice {
  title: string;
  text: string;
  badge: string;
  link?: string;
}

export interface SexualHealthLandingPage {
  slug: string;
  priority: "P0" | "P1" | "P2";
  category: string;
  title: string;
  seoTitle: string;
  description: string;
  h1: string;
  subtitle: string;
  badge: string;
  showHivCalculator?: boolean;
  showPepBanner?: boolean;
  emergencyNotice?: EmergencyNotice;
  overview: string[];
  keyTakeaways: string[];
  investigations: InvestigationItem[];
  milestones?: MilestoneItem[];
  preparationGuidelines?: string[];
  faqs: FaqItem[];
  clinicalReferences: ClinicalReference[];
  relatedSlugs: string[];
}

export const SEXUAL_HEALTH_LANDING_PAGES: SexualHealthLandingPage[] = [
  {
    "slug": "condom-break-sti-testing",
    "priority": "P0",
    "category": "Exposure & Emergency",
    "title": "Condom Break STI Testing Bangalore | 72-Hour PEP & Testing Plan | QXL",
    "seoTitle": "Condom Break STI Testing Bangalore | 72-Hour PEP & Testing Schedule | QXL",
    "description": "Condom broke or slipped during sex? Clinical 72-hour PEP guidance, baseline safety bloods, and accurate testing schedules for HIV, Syphilis, Chlamydia & Gonorrhea in Bengaluru.",
    "h1": "Condom Break STI Testing & Emergency Protocol in Bangalore",
    "subtitle": "Clear, evidence-based steps following condom failure or slippage. Understand the 72-hour window for emergency PEP, baseline laboratory workups, and conclusive STI testing timelines.",
    "badge": "Clinical Emergency Pathway",
    "showPepBanner": true,
    "showHivCalculator": true,
    "emergencyNotice": {
      "title": "72-Hour Post-Exposure Window Active",
      "text": "If a condom ruptured during sexual contact with a partner of unknown or positive HIV status within the last 72 hours, consult a physician or casualty immediately for Post-Exposure Prophylaxis (PEP). Do not wait for diagnostic test results to start PEP.",
      "badge": "Urgent Action Required"
    },
    "overview": [
      "A condom break, tear, or slippage during vaginal, anal, or oral intercourse can cause immense distress. However, having a structured, clinically verified protocol allows you to systematically protect your health and rule out infections.",
      "Infections have distinct incubation and biological window periods. Testing immediately on day 1 cannot identify newly transmitted viral or bacterial pathogens, but emergency interventions like HIV PEP must be started within 72 hours (ideally within 24 hours) to prevent infection establishment.",
      "At QXL Diagnostics, we provide discrete, physician-reviewed laboratory investigations across our NABL-accredited facilities in Kengeri and Yelahanka, alongside confidential home blood and sample collection across Bengaluru."
    ],
    "keyTakeaways": [
      "Emergency PEP must be initiated within 72 hours of potential HIV exposure.",
      "Baseline blood tests (HIV 4th Gen, Kidney & Liver panels, HBsAg) should be drawn at the time of PEP evaluation.",
      "Bacterial STIs (Chlamydia & Gonorrhea) are accurately detected via urine/swab NAAT from day 14 onwards.",
      "Venous 4th-generation HIV antigen/antibody combo testing reaches its established CDC detection window at 18\u201345 days."
    ],
    "investigations": [
      {
        "name": "HIV 1 & 2 4th Gen Duo (p24 Antigen + Antibodies)",
        "specimen": "Venous Blood (Serum)",
        "window": "18\u201345 Days (Baseline at Day 0)",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Detects both viral p24 antigen and host antibodies; key baseline and post-exposure milestone."
      },
      {
        "name": "Chlamydia & Gonorrhea Real-Time PCR (NAAT)",
        "specimen": "First-catch urine or anatomical swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Gold standard molecular amplification; does not require bacterial viability."
      },
      {
        "name": "Syphilis Dual Screen (RPR Titer + TPHA Confirmation)",
        "specimen": "Venous Blood (Serum)",
        "window": "3\u20136 Weeks (Repeat at 90 Days)",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Non-treponemal RPR monitors disease activity; treponemal TPHA confirms diagnosis."
      },
      {
        "name": "Hepatitis B Triple Panel (HBsAg, Anti-HBs, Total Anti-HBc)",
        "specimen": "Venous Blood (Serum)",
        "window": "30\u201360 Days",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,250",
        "clinicalNote": "Differentiates acute infection, past resolved exposure, and vaccine-induced immunity."
      }
    ],
    "milestones": [
      {
        "timeframe": "0\u201372 Hours",
        "title": "Emergency PEP Evaluation & Baseline Labs",
        "action": "Immediate clinician visit & baseline renal/hepatic/HIV panel",
        "clinicalGuidance": "Assess HIV transmission risk. If indicated, begin 28-day three-drug antiretroviral PEP regimen."
      },
      {
        "timeframe": "Day 14 (2 Weeks)",
        "title": "Molecular Bacterial Testing",
        "action": "First-catch urine or anatomical swab NAAT",
        "clinicalGuidance": "Optimal time for detecting Chlamydia trachomatis and Neisseria gonorrhoeae by PCR."
      },
      {
        "timeframe": "Day 28 to 45 (4\u20136 Weeks)",
        "title": "4th Generation HIV & Syphilis Serology",
        "action": "Venous blood draw for 4th Gen Ag/Ab and RPR",
        "clinicalGuidance": "p24 antigen and early antibodies provide strong interim certainty; follow CDC venous window intervals."
      },
      {
        "timeframe": "Day 90 (3 Months)",
        "title": "Definitive Serological Follow-Up",
        "action": "Complete blood panel (HIV, Syphilis, HBV, HCV)",
        "clinicalGuidance": "Standard milestone for conclusive exclusion of viral seroconversion across all clinical protocols."
      }
    ],
    "preparationGuidelines": [
      "For urine PCR: Do NOT urinate for at least 1 to 2 hours prior to collection. Collect the first 20\u201330 mL of urine stream.",
      "For blood serology: Fasting is not required. Stay hydrated.",
      "Do NOT douche, wash with harsh disinfectants, or insert topical creams, which damage mucosal barriers and increase transmission risk."
    ],
    "faqs": [
      {
        "question": "Can I test for HIV the morning after a condom break?",
        "answer": "Testing the next morning only tells you your status prior to this exposure; newly acquired HIV cannot be detected within hours. However, emergency PEP can prevent infection if started within 72 hours."
      },
      {
        "question": "Does washing immediately after a condom break protect against STIs?",
        "answer": "No. Washing with soap or douching does not prevent STI transmission and often causes mucosal irritation or micro-tears that can actually facilitate viral entry."
      },
      {
        "question": "Can a condom break transmit herpes or HPV?",
        "answer": "Yes. Herpes and HPV transmit via skin-to-skin contact, so areas not covered by a condom are always susceptible even when condoms remain intact."
      },
      {
        "question": "What if the partner's STI status is completely unknown?",
        "answer": "If your partner's status is unknown, clinicians generally assume potential exposure and recommend baseline testing, PEP risk evaluation, and scheduled follow-up testing."
      },
      {
        "question": "Where can I get confidential testing in Bangalore?",
        "answer": "QXL Diagnostics offers confidential testing at our NABL-accredited centers in Kengeri and Yelahanka, as well as discrete home sample collection across Bengaluru with encrypted digital reports."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Post-Exposure Prophylaxis (PEP)",
        "url": "https://www.cdc.gov/hiv/basics/pep.html"
      },
      {
        "label": "WHO \u2014 Guidelines on Post-Exposure Prophylaxis for HIV",
        "url": "https://www.who.int/publications/i/item/9789241549011"
      },
      {
        "label": "NACO \u2014 National Guidelines for Post-Exposure Prophylaxis",
        "url": "https://naco.gov.in/"
      }
    ],
    "relatedSlugs": [
      "hiv-pep-prep-testing",
      "sti-testing-window-periods",
      "gonorrhea-chlamydia-pcr",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "sti-testing-window-periods",
    "priority": "P0",
    "category": "Exposure & Emergency",
    "title": "STI Testing Window Periods Bangalore | Timeline & Accuracy Guide | QXL",
    "seoTitle": "STI Testing Window Periods: When Results Become Reliable | QXL Diagnostics",
    "description": "Evidence-based timeline of STI testing window periods. Understand incubation and detection windows for HIV, Chlamydia, Gonorrhea, Syphilis, Hepatitis B & C in Bangalore.",
    "h1": "Complete Guide to STI Diagnostic Window Periods",
    "subtitle": "Biological timelines explaining when pathogens and immune antibodies can be accurately detected by modern laboratory assays, avoiding false-negative reassurance.",
    "badge": "Clinical Guide",
    "showHivCalculator": true,
    "overview": [
      "A diagnostic window period is the time interval between potential exposure to an infectious pathogen and the moment a laboratory test can reliably detect it. Testing too early can yield a false-negative result, providing false reassurance while an infection replicates silently.",
      "Different diagnostic modalities have different window periods. Direct molecular Nucleic Acid Amplification Tests (NAAT/PCR) detect microbial genetic material earlier than serological tests that rely on the host's immune antibody response.",
      "Understanding these biological windows ensures you test at the right time, select the appropriate assay, and know when follow-up testing is necessary for definitive clinical peace of mind."
    ],
    "keyTakeaways": [
      "Venous laboratory 4th-generation HIV tests detect infection between 18 and 45 days post-exposure.",
      "Urine or swab PCR for Chlamydia and Gonorrhea becomes reliable at 14 days.",
      "Syphilis antibodies typically appear within 3 to 6 weeks, with a final follow-up at 90 days.",
      "Hepatitis B Surface Antigen (HBsAg) appears between 30 and 60 days following exposure."
    ],
    "investigations": [
      {
        "name": "HIV 4th Gen Duo (p24 Antigen + Total Antibodies)",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "ECLIA detects p24 antigen weeks before antibody seroconversion."
      },
      {
        "name": "Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "First-catch urine or targeted swab",
        "window": "10\u201314 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "High-sensitivity DNA amplification; reliable 2 weeks post-exposure."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Quantitative non-treponemal titer paired with treponemal confirmation."
      },
      {
        "name": "Hepatitis B Triple Panel",
        "specimen": "Venous Blood",
        "window": "4\u20138 Weeks (30\u201360 Days)",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,250",
        "clinicalNote": "Measures HBsAg, Anti-HBs, and Total Anti-HBc for complete status."
      },
      {
        "name": "Anti-HCV Total Antibodies",
        "specimen": "Venous Blood",
        "window": "8\u201311 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9850",
        "clinicalNote": "Antibody seroconversion window; reflex RNA PCR confirms active replication."
      }
    ],
    "milestones": [
      {
        "timeframe": "10\u201314 Days",
        "title": "Earliest Bacterial NAAT & RNA PCR",
        "action": "Urine/swab PCR for Chlamydia & Gonorrhea; specialist RNA NAT if indicated",
        "clinicalGuidance": "Bacterial DNA replicates rapidly; NAAT can accurately identify active infection."
      },
      {
        "timeframe": "18\u201328 Days",
        "title": "Early Serology & Antigen Peak",
        "action": "4th Gen HIV Ag/Ab test",
        "clinicalGuidance": "p24 capsid protein peaks in circulation; provides early diagnostic clarity."
      },
      {
        "timeframe": "45 Days (6 Weeks)",
        "title": "Lab Ag/Ab HIV Follow-up (CDC Window)",
        "action": "Follow-up 4th Gen HIV test",
        "clinicalGuidance": "Most infections are detectable by laboratory venous Ag/Ab combination tests by 45 days. A non-reactive result is generally reliable if no PEP or antiretroviral exposure occurred; your clinician may still advise repeat testing."
      },
      {
        "timeframe": "90 Days (3 Months)",
        "title": "Comprehensive Follow-up Serology",
        "action": "Final blood panel: HIV, Syphilis, HBV, HCV",
        "clinicalGuidance": "Commonly used follow-up point for HIV, syphilis, hepatitis B and hepatitis C serology. Window periods differ by test and guideline, and PEP, PrEP or immune suppression can delay detection, so interpret the result with your clinician."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between an incubation period and a window period?",
        "answer": "An incubation period is the time between exposure and symptom onset. A window period is the time between exposure and when a diagnostic laboratory test can detect the infection, regardless of whether symptoms exist."
      },
      {
        "question": "Can an STI test be negative if taken too early?",
        "answer": "Yes. Testing before the pathogen or immune response reaches the assay's detection threshold can produce a false negative. Adhering to validated window periods is essential."
      },
      {
        "question": "When is an HIV test considered medically conclusive?",
        "answer": "Per CDC guidelines, a 4th-generation laboratory blood test from a vein is conclusive at 45 days in the absence of antiretroviral medications (PEP/PrEP). At 90 days, all standard antibody and antigen assays reach definitive conclusiveness."
      },
      {
        "question": "Does taking PEP or PrEP change the window period?",
        "answer": "Yes. Antiretroviral medications suppress viral replication and can delay host antibody production. If you took PEP, follow-up testing is recommended at 4\u20136 weeks and 3 months after completing the medication course."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 HIV Testing Algorithms & Windows",
        "url": "https://www.cdc.gov/hiv/testing/clinical/index.html"
      },
      {
        "label": "BASHH \u2014 UK National Guideline on the Management of STIs",
        "url": "https://www.bashh.org/"
      },
      {
        "label": "WHO \u2014 Laboratory Diagnosis of Sexually Transmitted Infections",
        "url": "https://www.who.int/publications/i/item/9789241505840"
      }
    ],
    "relatedSlugs": [
      "hiv-testing-after-exposure",
      "condom-break-sti-testing",
      "asymptomatic-sti-screening",
      "understanding-sti-test-results"
    ]
  },
  {
    "slug": "hiv-testing-after-exposure",
    "priority": "P0",
    "category": "Exposure & Emergency",
    "title": "HIV Testing After Exposure Bangalore | 4th Gen & Viral Load | QXL",
    "seoTitle": "HIV Testing After Exposure Bangalore | 4th Gen ECLIA & RNA NAT | QXL",
    "description": "Targeted HIV testing after potential exposure in Bengaluru. High-sensitivity 4th Gen p24 antigen/antibody ECLIA, viral RNA PCR, window periods, and PEP guidance.",
    "h1": "HIV Testing After Suspected Exposure in Bangalore",
    "subtitle": "Accurate, confidential laboratory investigations following potential exposure. Understanding 4th-generation p24 antigen tests, RNA PCR, and clinical testing intervals.",
    "badge": "Critical Pathway",
    "showHivCalculator": true,
    "showPepBanner": true,
    "emergencyNotice": {
      "title": "Within 72 Hours of Exposure?",
      "text": "Antiretroviral Post-Exposure Prophylaxis (PEP) must be started within 72 hours of potential HIV exposure. Visit an emergency facility or consult our medical team immediately. Do not wait for lab test results to start PEP.",
      "badge": "PEP Window Active"
    },
    "overview": [
      "Facing potential exposure to HIV can generate profound health anxiety. Having accurate scientific facts about viral kinetics and diagnostic capabilities empowers you to take prompt, effective action.",
      "Modern laboratory diagnostics utilize 4th-generation Chemiluminescent (CLIA) or Electrochemiluminescent (ECLIA) assays that simultaneously detect the HIV-1 p24 capsid protein and antibodies to HIV-1 and HIV-2. The p24 antigen appears within 2 to 4 weeks of exposure, weeks before antibodies develop.",
      "QXL Diagnostics provides confidential, barcode-anonymized HIV screening at our accredited central laboratories in Bengaluru, with same-day digital report delivery directly to your secure portal or WhatsApp."
    ],
    "keyTakeaways": [
      "Within 72 hours: Prioritize emergency PEP consultation over diagnostic blood tests.",
      "Day 10\u201314: Quantitative HIV-1 RNA PCR can detect viral genetic material in high-risk acute scenarios.",
      "Day 18\u201345: 4th-generation venous blood tests detect p24 antigen and early antibodies.",
      "Day 90: Standard definitive milestone for excluding HIV transmission across clinical protocols."
    ],
    "investigations": [
      {
        "name": "HIV-1 & HIV-2 4th Gen Duo (p24 Ag + Ab ECLIA)",
        "specimen": "Venous Blood (Serum)",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "NABL-accredited automated ECLIA analyzer with >99.7% sensitivity."
      },
      {
        "name": "HIV-1 Quantitative RNA PCR (Viral Load NAT)",
        "specimen": "Plasma (EDTA)",
        "window": "10\u201333 Days",
        "tat": "48\u201372 Hours",
        "price": "\u20b93,400",
        "clinicalNote": "Direct molecular detection of viral RNA; utilized for acute retroviral syndrome."
      },
      {
        "name": "Complete Baseline Organ Profile for PEP",
        "specimen": "Serum & Whole Blood",
        "window": "Day 0 (Pre-PEP)",
        "tat": "6 Hours",
        "price": "\u20b91,150",
        "clinicalNote": "Includes Serum Creatinine, eGFR, LFT, CBC, and HBsAg."
      }
    ],
    "faqs": [
      {
        "question": "What is the 4th-generation HIV Duo test?",
        "answer": "It is an automated laboratory blood test that simultaneously detects HIV-1 p24 antigen (a protein part of the virus itself) and antibodies produced by your immune system against HIV-1 and HIV-2. This narrows the window period substantially compared to older rapid antibody tests."
      },
      {
        "question": "Can a finger-prick rapid test be done instead?",
        "answer": "Rapid point-of-care fingerstick tests primarily detect antibodies and have a wider window period (often 90 days). A venous blood draw processed in an accredited laboratory using 4th-gen ECLIA is significantly more sensitive in early stages."
      },
      {
        "question": "What does a reactive 4th-gen screening test mean?",
        "answer": "A reactive screening result requires supplemental confirmatory testing per the NACO three-test algorithm or HIV-1/2 differentiation testing to verify true positive status before a diagnosis is established."
      },
      {
        "question": "How confidential is the testing process?",
        "answer": "QXL Diagnostics uses numeric barcode identification. Your identity is strictly confidential, and encrypted PDF reports are sent only to your personal phone or email."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 HIV Testing Overview & Assays",
        "url": "https://www.cdc.gov/hiv/testing/index.html"
      },
      {
        "label": "NACO \u2014 National HIV Testing Guidelines (India)",
        "url": "https://naco.gov.in/"
      }
    ],
    "relatedSlugs": [
      "hiv-pep-prep-testing",
      "sti-testing-window-periods",
      "hiv-symptoms-and-anxiety",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "hiv-pep-prep-testing",
    "priority": "P0",
    "category": "Exposure & Emergency",
    "title": "HIV PEP & PrEP Testing Bangalore | Baseline Panels & Monitoring | QXL",
    "seoTitle": "HIV PEP & PrEP Testing Bangalore | Baseline Labs & Follow-up | QXL",
    "description": "Essential diagnostic panels for HIV PEP (Post-Exposure Prophylaxis) and PrEP (Pre-Exposure Prophylaxis) in Bangalore. Baseline renal, liver, HBsAg and HIV 4th gen testing.",
    "h1": "HIV PEP & PrEP Clinical Testing Protocols in Bangalore",
    "subtitle": "Complete diagnostic monitoring for Post-Exposure and Pre-Exposure Prophylaxis. Baseline organ safety checks, Hepatitis B screening, and scheduled serological follow-ups.",
    "badge": "Prevention & Prophylaxis",
    "showPepBanner": true,
    "overview": [
      "Post-Exposure Prophylaxis (PEP) and Pre-Exposure Prophylaxis (PrEP) are highly effective biomedical interventions that prevent HIV transmission. Safe, effective administration requires precise laboratory monitoring.",
      "Before starting PEP, an urgent baseline panel is necessary: confirming pre-existing negative HIV status, evaluating kidney function (Serum Creatinine and eGFR) because tenofovir is renally excreted, checking liver enzymes (ALT/AST), and assessing Hepatitis B (HBsAg) status to prevent acute hepatitis flare-ups upon discontinuing tenofovir/emtricitabine.",
      "Similarly, individuals on daily or on-demand PrEP require baseline and quarterly laboratory screening to confirm ongoing HIV-negative status and monitor renal biomarkers."
    ],
    "keyTakeaways": [
      "PEP must begin within 72 hours of exposure and is taken daily for 28 continuous days.",
      "Baseline kidney (Creatinine/eGFR) and liver tests ensure safe tolerability of antiretroviral medications.",
      "Hepatitis B status is critical because tenofovir treats both HBV and HIV; stopping PEP without medical supervision can cause HBV hepatic flares.",
      "Follow-up 4th-gen HIV testing is scheduled at 4\u20136 weeks and 3 months after completing PEP."
    ],
    "investigations": [
      {
        "name": "PEP Baseline Safety Panel",
        "specimen": "Venous Blood",
        "window": "Immediate (Day 0)",
        "tat": "4\u20136 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Includes HIV 4th Gen Duo, Serum Creatinine, eGFR, LFT, and HBsAg."
      },
      {
        "name": "PrEP Quarterly Monitoring Profile",
        "specimen": "Venous Blood & Urine",
        "window": "Every 3 Months",
        "tat": "6 Hours",
        "price": "\u20b91,650",
        "clinicalNote": "HIV 4th Gen Duo, Serum Creatinine, Urine Protein/Creatinine Ratio, and STI NAAT screen."
      },
      {
        "name": "Post-PEP Conclusive HIV Screen",
        "specimen": "Venous Blood",
        "window": "3 Months Post-PEP",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Venous 4th Gen ECLIA following completion of the 28-day regimen."
      }
    ],
    "faqs": [
      {
        "question": "Why do I need a baseline HIV test before starting PEP?",
        "answer": "A baseline test confirms you do not have pre-existing undiagnosed HIV infection. If an individual already had chronic HIV, a standard 28-day 3-drug PEP regimen is inappropriate and could cause drug resistance."
      },
      {
        "question": "Can I start PEP before my baseline test results arrive?",
        "answer": "Yes! Because the 72-hour window is critical, guidelines recommend drawing baseline bloods and immediately initiating the first dose of PEP without waiting for lab results."
      },
      {
        "question": "Why must kidney function be tested?",
        "answer": "Standard PEP and PrEP regimens contain Tenofovir (TDF or TAF), which is processed through the kidneys. Baseline creatinine and eGFR ensure your kidneys can safely clear the drug."
      },
      {
        "question": "When do I test after finishing PEP?",
        "answer": "Guidelines recommend testing with a 4th-generation HIV test at 4 to 6 weeks after exposure, and a final conclusive test at 3 months post-exposure."
      }
    ],
    "clinicalReferences": [
      {
        "label": "WHO \u2014 Guidelines on Post-Exposure Prophylaxis",
        "url": "https://www.who.int/publications/i/item/9789241549011"
      },
      {
        "label": "CDC \u2014 Clinical Guidelines for PrEP and PEP",
        "url": "https://www.cdc.gov/hiv/risk/pep/index.html"
      }
    ],
    "relatedSlugs": [
      "hiv-testing-after-exposure",
      "condom-break-sti-testing",
      "sti-testing-window-periods",
      "urgent-medical-support"
    ]
  },
  {
    "slug": "sti-testing-after-anal-sex",
    "priority": "P1",
    "category": "Exposure & Emergency",
    "title": "STI Testing After Anal Sex Bangalore | Rectal Swab NAAT | QXL",
    "seoTitle": "STI Testing After Anal Sex Bangalore | Rectal Swab PCR & Bloods | QXL",
    "description": "Comprehensive STI screening after receptive or insertive anal intercourse in Bengaluru. Rectal swab NAAT for gonorrhea and chlamydia, blood serology for HIV, syphilis & hepatitis.",
    "h1": "STI Screening After Anal Sex: Rectal Swabs & Blood Serology",
    "subtitle": "Anatomically targeted sexual health diagnostics. Why routine urine tests miss up to 85% of rectal chlamydia and gonorrhea, and how 3-site screening protects your health.",
    "badge": "Anatomical Pathway",
    "overview": [
      "Engaging in anal sex\u2014whether insertive or receptive\u2014carries distinct transmission risks for bacterial and viral sexually transmitted infections. Mucosal lining in the rectum is thin and highly vascularized, facilitating transmission.",
      "Crucially, routine urine tests only detect infections in the male urethra. Studies demonstrate that more than 80% of rectal chlamydia and gonorrhea infections in individuals who practice receptive anal intercourse are completely missed if only a urine sample is tested. Direct rectal swab testing with molecular NAAT/PCR is mandatory.",
      "In addition to rectal swabs, blood serology is necessary to evaluate systemic pathogens including HIV, Syphilis, Hepatitis B, and Hepatitis C."
    ],
    "keyTakeaways": [
      "Urine testing alone is insufficient for evaluating receptive anal intercourse.",
      "Rectal swab NAAT is the gold standard for rectal Chlamydia, Gonorrhea, and LGV.",
      "Rectal STIs are often completely asymptomatic but can cause proctitis, rectal discharge, tenesmus, or bleeding.",
      "Comprehensive screening includes rectal swabs plus blood tests for HIV, Syphilis, and Hepatitis B."
    ],
    "investigations": [
      {
        "name": "Rectal Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "Rectal Swab (Flocked/Dacron)",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Direct molecular detection from the rectal mucosa; highly sensitive."
      },
      {
        "name": "Rectal Swab Collection Kit & Transport",
        "specimen": "Dry Swab or Transport Medium",
        "window": "Anytime post-window",
        "tat": "Standard",
        "price": "Included",
        "clinicalNote": "Can be self-collected discretely or clinician-collected."
      },
      {
        "name": "HIV 4th Gen Duo (p24 Ag + Ab ECLIA)",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Detects viral p24 antigen and host antibodies."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Screens for primary rectal chancres and secondary systemic disease."
      }
    ],
    "preparationGuidelines": [
      "For rectal swab: Insert the flocked swab approximately 2\u20133 cm into the anal canal and gently rotate against the mucosal wall for 10\u201315 seconds.",
      "Do not use enemas, douches, or rectal lubricants within 2 hours prior to swab collection.",
      "Blood serology does not require fasting."
    ],
    "faqs": [
      {
        "question": "Can I just do a urine test if I had anal sex?",
        "answer": "If you were the insertive partner, a urine test checks your urethra. If you were the receptive partner, a urine test will NOT detect rectal infections. A rectal swab is required to test the site of exposure."
      },
      {
        "question": "What are the symptoms of a rectal STI?",
        "answer": "Many rectal infections have zero symptoms. When symptoms occur, they include rectal pain, purulent discharge, rectal itching, bleeding with bowel movements, or tenesmus (feeling of incomplete evacuation)."
      },
      {
        "question": "Is self-collecting a rectal swab accurate?",
        "answer": "Yes. Clinical studies show patient self-collected rectal swabs have equivalent sensitivity and specificity to clinician-collected swabs when proper instructions are followed."
      },
      {
        "question": "Can receptive anal sex transmit Hepatitis B and C?",
        "answer": "Yes. Hepatitis B is easily transmitted through mucosal fluids and micro-tears during anal sex. Hepatitis C can also transmit sexually, particularly when mucosal trauma or rough intercourse occurs."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Extragenital STI Testing Recommendations",
        "url": "https://www.cdc.gov/std/treatment-guidelines/extragenital.htm"
      },
      {
        "label": "BASHH \u2014 UK National Guidelines on Proctitis & Rectal STIs",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "gonorrhea-chlamydia-pcr",
      "inclusive-sexual-health-testing",
      "hiv-testing-after-exposure",
      "sti-sample-collection"
    ]
  },
  {
    "slug": "sti-testing-after-vaginal-sex",
    "priority": "P1",
    "category": "Exposure & Emergency",
    "title": "STI Testing After Vaginal Sex Bangalore | Swab & Urine PCR | QXL",
    "seoTitle": "STI Testing After Vaginal Sex Bangalore | Comprehensive Screening | QXL",
    "description": "Complete STI screening following vaginal intercourse in Bengaluru. High vaginal swabs, first-catch urine PCR, and blood panels for HIV, Syphilis, Hepatitis & Trichomonas.",
    "h1": "STI Screening Following Vaginal Intercourse in Bangalore",
    "subtitle": "Accurate, comfortable diagnostics for men and women following vaginal exposure. Differentiating bacterial STIs from yeast infections and bacterial vaginosis.",
    "badge": "Comprehensive Assessment",
    "overview": [
      "Vaginal intercourse is the most common route of sexual exposure for a wide range of bacterial, viral, and protozoan infections. Symptoms can vary significantly between partners.",
      "In women, self-collected vaginal swabs or clinician cervical swabs provide superior sensitivity for Chlamydia and Gonorrhea compared to urine tests. In men, first-catch urine NAAT accurately surveys the urethral tract.",
      "Beyond Chlamydia and Gonorrhea, vaginal exposure can transmit Trichomonas vaginalis, Mycoplasma genitalium, Syphilis, Hepatitis B, and HIV. Comprehensive screening provides definitive clarity."
    ],
    "keyTakeaways": [
      "For women, a vaginal swab NAAT is clinically superior to urine testing for Chlamydia and Gonorrhea.",
      "For men, first-catch urine (holding urine 1\u20132 hours prior) provides optimal urethral detection.",
      "Common symptoms like abnormal odor, itching, or discharge require distinguishing STIs from Bacterial Vaginosis (BV) and Candidiasis.",
      "Blood serology at 4 to 6 weeks rules out HIV, Syphilis, and Hepatitis viral transmission."
    ],
    "investigations": [
      {
        "name": "Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "Vaginal Swab (women) or First-catch Urine (men)",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "High-accuracy molecular amplification assay."
      },
      {
        "name": "Vaginal Infection Comprehensive Profile",
        "specimen": "Vaginal Swab",
        "window": "Immediate upon symptoms",
        "tat": "24 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Detects Bacterial Vaginosis (Amsel/Nugent), Candida species, and Trichomonas."
      },
      {
        "name": "HIV 4th Gen Duo (p24 Ag + Ab)",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Automated ECLIA with same-day confidential results."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Screening titer paired with treponemal confirmation."
      }
    ],
    "faqs": [
      {
        "question": "Which test is better for women: a urine test or a vaginal swab?",
        "answer": "Current CDC guidelines state that a self-collected or clinician-collected vaginal swab NAAT is significantly more sensitive than urine testing in women, detecting up to 10% more chlamydia infections."
      },
      {
        "question": "Can I test during my period?",
        "answer": "Blood tests can be done anytime. For vaginal swabs, light spotting is acceptable, but heavy menstrual bleeding can interfere with cellular microscopy. Urine NAAT or blood testing is unaffected."
      },
      {
        "question": "How soon after vaginal sex should I get tested?",
        "answer": "For bacterial infections (Chlamydia, Gonorrhea, Trichomonas), wait 10 to 14 days. For HIV and Syphilis, test at 4 to 6 weeks, with a final follow-up at 3 months."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 STI Treatment Guidelines for Women",
        "url": "https://www.cdc.gov/std/treatment-guidelines/default.htm"
      },
      {
        "label": "IUSTI \u2014 Guidelines on Vaginal Discharge & Cervicitis",
        "url": "https://iusti.org/"
      }
    ],
    "relatedSlugs": [
      "vaginal-discharge-testing",
      "gonorrhea-chlamydia-pcr",
      "trichomonas-testing",
      "sti-testing-window-periods"
    ]
  },
  {
    "slug": "asymptomatic-sti-screening",
    "priority": "P1",
    "category": "Exposure & Emergency",
    "title": "Asymptomatic STI Screening Bangalore | Routine Checkup | QXL",
    "seoTitle": "Asymptomatic STI Screening Bangalore | Silent Infection Check | QXL",
    "description": "Routine, asymptomatic STI screening in Bengaluru. Why over 70% of STIs have zero symptoms, and how routine PCR & serology prevent long-term complications.",
    "h1": "Asymptomatic STI Screening: Protecting Health Without Symptoms",
    "subtitle": "Why 'feeling fine' does not guarantee the absence of sexually transmitted infections. Understanding silent carriage, reproductive protection, and routine annual checkups.",
    "badge": "Preventive Screening",
    "overview": [
      "One of the greatest misconceptions in sexual health is that an infection always produces noticeable symptoms like pain, sores, or discharge. In reality, the vast majority of common STIs are completely silent.",
      "Up to 70\u201380% of women and 50% of men with Chlamydia experience no symptoms whatsoever. Similarly, asymptomatic gonorrhea, high-risk HPV, and early syphilis frequently go unnoticed while silently causing chronic inflammation, pelvic scarring, or transmission to partners.",
      "Routine asymptomatic screening allows early detection and curative treatment with simple oral antibiotics before irreversible complications like Pelvic Inflammatory Disease (PID) or tubal infertility develop."
    ],
    "keyTakeaways": [
      "Over 70% of chlamydia and 50% of gonorrhea infections cause zero symptoms.",
      "Untreated silent infections can progress to Pelvic Inflammatory Disease, ectopic pregnancy, and chronic pelvic pain.",
      "Sexually active adults with new or multiple partners should screen annually or before entering a new relationship.",
      "A standard asymptomatic screening panel combines molecular urine/swab PCR with blood serology for HIV, Syphilis, and Hepatitis B."
    ],
    "investigations": [
      {
        "name": "Essential STI Screening Panel",
        "specimen": "First-catch Urine & Venous Blood",
        "window": "Routine / Post-Window",
        "tat": "24\u201348 Hours",
        "price": "\u20b92,499",
        "clinicalNote": "Covers HIV 4th Gen Duo, Syphilis RPR/TPHA, Hepatitis B, and Chlamydia/Gonorrhea PCR."
      },
      {
        "name": "Triple STI PCR Molecular Screen",
        "specimen": "First-catch Urine or Swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Targeted PCR for Chlamydia trachomatis, Neisseria gonorrhoeae, and Trichomonas vaginalis."
      },
      {
        "name": "HIV 4th Generation Duo ECLIA",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Essential routine blood test detecting p24 antigen and HIV 1/2 antibodies."
      }
    ],
    "faqs": [
      {
        "question": "If I have no symptoms, do I really need an STI test?",
        "answer": "Yes. Most sexually transmitted infections are asymptomatic. The bacteria and viruses replicate silently and can cause long-term reproductive damage or be passed to partners without your knowledge."
      },
      {
        "question": "How often should I get tested if I am sexually active?",
        "answer": "Clinical guidelines recommend annual screening for sexually active adults under 25, or anyone with a new sexual partner, multiple partners, or after an episode of condomless sex."
      },
      {
        "question": "Can I do asymptomatic screening at home?",
        "answer": "Yes. QXL Diagnostics provides discreet home sample collection across Bengaluru with certified phlebotomists and encrypted digital report delivery."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Screening Recommendations for Asymptomatic Sexually Transmitted Infections",
        "url": "https://www.cdc.gov/std/treatment-guidelines/screening-recommendations.htm"
      },
      {
        "label": "US Preventive Services Task Force (USPSTF) \u2014 STI Screening Guidelines",
        "url": "https://www.uspreventiveservicestaskforce.org/"
      }
    ],
    "relatedSlugs": [
      "couples-sti-screening",
      "sti-and-fertility",
      "sti-testing-window-periods",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "genital-discharge-and-burning",
    "priority": "P0",
    "category": "Symptom & Syndromic",
    "title": "Genital Discharge & Burning Urination Bangalore | Urethritis Test | QXL",
    "seoTitle": "Genital Discharge & Burning Urination | Urethritis PCR Testing | QXL",
    "description": "Clinical diagnosis for genital discharge and burning urination (dysuria) in Bengaluru. Distinguishing gonorrhea, chlamydia, non-gonococcal urethritis (NGU) & UTIs.",
    "h1": "Genital Discharge & Burning Urination: Diagnosis & Testing",
    "subtitle": "Rapid, accurate identification of urethral and genital infections. Differentiating gonococcal urethritis, non-gonococcal pathogens, and urinary tract infections.",
    "badge": "Symptom Pathway",
    "overview": [
      "Experiencing burning during urination (dysuria), accompanied by penile or vaginal discharge, is a cardinal clinical presentation of urogenital inflammation, commonly known as urethritis.",
      "Urethritis is broadly categorized into Gonococcal Urethritis (caused by Neisseria gonorrhoeae, often presenting with thick, yellow-green purulent discharge) and Non-Gonococcal Urethritis (NGU, caused by Chlamydia trachomatis, Mycoplasma genitalium, Ureaplasma, or Trichomonas, typically presenting with clear, mucoid, or watery discharge).",
      "Self-medicating with unprescribed antibiotics without diagnostic testing can lead to treatment failure, multi-drug resistance, and mask serious pathogens. Prompt molecular PCR identifies the exact pathogen for targeted cure."
    ],
    "keyTakeaways": [
      "Never start antibiotics before collecting diagnostic urine or swab samples.",
      "Thick yellowish discharge frequently indicates Gonorrhea; clear/watery discharge suggests Chlamydia or NGU.",
      "First-catch urine (first 20\u201330 mL) is mandatory for accurate molecular NAAT/PCR.",
      "Sexual partners must be evaluated and treated simultaneously to prevent immediate re-infection."
    ],
    "investigations": [
      {
        "name": "Chlamydia & Gonorrhea Real-Time PCR (NAAT)",
        "specimen": "First-catch Urine or Urethral Swab",
        "window": "Immediate upon symptoms",
        "tat": "24 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Definitive molecular test differentiating Gonorrhea and Chlamydia."
      },
      {
        "name": "Extended Urogenital Pathogen PCR (7 Targets)",
        "specimen": "First-catch Urine",
        "window": "Immediate upon symptoms",
        "tat": "48 Hours",
        "price": "\u20b94,200",
        "clinicalNote": "Includes Mycoplasma genitalium, Ureaplasma urealyticum, and Trichomonas."
      },
      {
        "name": "Urine Routine, Microscopy & Gram Stain",
        "specimen": "Urine",
        "window": "Immediate",
        "tat": "4 Hours",
        "price": "\u20b9450",
        "clinicalNote": "Checks for pus cells (leukocytes) and intracellular Gram-negative diplococci."
      }
    ],
    "preparationGuidelines": [
      "Do NOT urinate for at least 1 to 2 hours before sample collection.",
      "Collect the first 20\u201330 mL of urine stream into the sterile container (do NOT provide a midstream catch for STI testing).",
      "Do NOT wipe the genital opening with antiseptic wet wipes prior to collection."
    ],
    "faqs": [
      {
        "question": "What does cloudy or white discharge mean?",
        "answer": "Cloudy, white, or clear discharge is often indicative of Non-Gonococcal Urethritis (NGU), commonly caused by Chlamydia trachomatis, Mycoplasma genitalium, or Ureaplasma. A molecular PCR test can identify the exact organism."
      },
      {
        "question": "Can burning urination just be a simple UTI?",
        "answer": "In sexually active men under 50, burning urination is almost always an STI (urethritis) rather than a simple bladder UTI. In women, both UTIs and STIs are common, requiring differential testing."
      },
      {
        "question": "How quickly do symptoms resolve with treatment?",
        "answer": "With appropriate, pathogen-targeted antibiotics, burning typically diminishes within 48 to 72 hours, and discharge subsides within 3 to 7 days. Complete the full antibiotic course even if you feel better."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Urethritis Diagnostic and Treatment Guidelines",
        "url": "https://www.cdc.gov/std/treatment-guidelines/urethritis-and-cervicitis.htm"
      },
      {
        "label": "BASHH \u2014 UK National Guideline on the Management of Non-Gonococcal Urethritis",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "uti-vs-sti",
      "gonorrhea-chlamydia-pcr",
      "persistent-urethritis-testing",
      "sti-sample-collection"
    ]
  },
  {
    "slug": "genital-itching-and-irritation",
    "priority": "P0",
    "category": "Symptom & Syndromic",
    "title": "Genital Itching & Irritation Bangalore | Rash, Fungal & STI Test | QXL",
    "seoTitle": "Genital Itching & Irritation Bangalore | Causes, Testing & Care | QXL",
    "description": "Clinical evaluation for genital itching, irritation, and redness in Bengaluru. Differentiating fungal candidiasis, pubic lice, contact dermatitis, herpes & STIs.",
    "h1": "Genital Itching & Irritation: Causes, Diagnosis & Relief",
    "subtitle": "Distinguishing sexually transmitted infections from dermatological skin conditions, candidal balanitis, and allergic reactions to avoid improper topical treatments.",
    "badge": "Symptom Pathway",
    "overview": [
      "Itching, redness, and irritation in the genital region (penis, scrotum, vulva, or perineum) are extremely common and can be caused by a wide spectrum of infectious and non-infectious conditions.",
      "While many patients immediately fear an incurable STI, common non-STI causes include fungal infections (Candida albicans / jock itch), contact dermatitis (from scented body washes, condoms, or laundry detergents), pubic lice, and scabies. However, genital herpes prodromes and trichomoniasis also frequently manifest as intense itching.",
      "Accurate diagnosis through skin scrapings, fungal KOH mounts, or molecular swabs prevents the common mistake of applying steroid creams that worsen fungal and viral infections."
    ],
    "keyTakeaways": [
      "Do not apply over-the-counter steroid creams to undiagnosed genital itching.",
      "Yeast infections (Candidiasis) cause intense itching with red patches and white curdy discharge.",
      "Tingling, burning itch that precedes fluid-filled blisters suggests Herpes Simplex (HSV).",
      "Proper clinical examination and fungal microscopy differentiate skin disease from STIs."
    ],
    "investigations": [
      {
        "name": "KOH Fungal Scraping & Microscopy",
        "specimen": "Skin Scraping / Swab",
        "window": "Immediate",
        "tat": "6 Hours",
        "price": "\u20b9350",
        "clinicalNote": "Detects fungal hyphae and budding yeast cells instantly."
      },
      {
        "name": "HSV-1 & HSV-2 Type-Specific PCR / Serology",
        "specimen": "Lesion Swab or Venous Blood",
        "window": "Immediate for swab; 6\u201312 weeks for IgG",
        "tat": "24 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Identifies Herpes Simplex viral involvement."
      },
      {
        "name": "Vaginal / Urethral Infection Profile",
        "specimen": "Swab or Urine",
        "window": "Immediate",
        "tat": "24 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Screens for Trichomonas, Candida, and bacterial causes."
      }
    ],
    "faqs": [
      {
        "question": "Can jock itch cause genital itching on the penis?",
        "answer": "Yes. Tinea cruris (jock itch) and candidal balanitis frequently affect the groin folds, scrotum, and glans penis, especially in warm, humid weather or in individuals with elevated blood sugar."
      },
      {
        "question": "Can condoms or lubricants cause allergic itching?",
        "answer": "Yes. Latex allergies and sensitivity to spermicides, fragrances, or glycerin in lubricants can cause contact dermatitis with redness, swelling, and severe itching."
      },
      {
        "question": "What if the itching is accompanied by tingling or nerve sensations?",
        "answer": "A localized tingling, burning, or electrical sensation (known as prodromal symptoms) followed by redness often precedes a genital herpes outbreak."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Vulvovaginal Pruritus & Dermatological Considerations",
        "url": "https://www.cdc.gov/std/treatment-guidelines/vaginal-discharge.htm"
      },
      {
        "label": "British Association of Dermatologists \u2014 Genital Dermatoses Guidelines",
        "url": "https://www.bad.org.uk/"
      }
    ],
    "relatedSlugs": [
      "genital-sores-blisters-ulcers",
      "vaginal-discharge-testing",
      "genital-herpes-testing",
      "other-genital-infections"
    ]
  },
  {
    "slug": "genital-sores-blisters-ulcers",
    "priority": "P0",
    "category": "Symptom & Syndromic",
    "title": "Genital Sores, Blisters & Ulcers Bangalore | Syphilis vs Herpes | QXL",
    "seoTitle": "Genital Sores & Ulcers Bangalore | Syphilis vs Herpes Diagnosis | QXL",
    "description": "Clinical diagnosis for genital sores, blisters, and ulcers in Bengaluru. Distinguishing painless Syphilis chancres from painful Herpes vesicles, chancroid & aphthous ulcers.",
    "h1": "Genital Sores, Blisters & Ulcers: Syphilis vs Herpes",
    "subtitle": "Accurate differential diagnosis for genital lesions. Painless vs painful ulcers, fluid-filled blister clusters, and necessary laboratory testing protocols in Bangalore.",
    "badge": "Clinical Priority",
    "overview": [
      "The emergence of a sore, blister, or ulcer in the genital, anal, or oral area requires immediate clinical evaluation. The two most common sexually transmitted etiologies are Primary Syphilis and Genital Herpes Simplex (HSV).",
      "The classic hallmark of Primary Syphilis is a single, indurated, PAINLESS ulcer (known as a chancre) that appears 2 to 6 weeks after exposure. In contrast, Genital Herpes typically presents as multiple PAINFUL, fluid-filled blisters that rupture into shallow, tender erosions.",
      "Crucially, a syphilis chancre will heal on its own without treatment after several weeks, giving the patient false reassurance while Treponema pallidum disseminates systemically into Secondary Syphilis. Testing is vital."
    ],
    "keyTakeaways": [
      "Painless ulcer: Highly suggestive of Primary Syphilis; requires immediate RPR and TPHA testing.",
      "Painful clustered blisters: Highly suggestive of Genital Herpes (HSV-1 or HSV-2); best tested via lesion swab PCR.",
      "A syphilis sore will disappear on its own, but the infection remains and worsens without penicillin treatment.",
      "Avoid touching lesions with bare hands to prevent auto-inoculation to the eyes or other skin surfaces."
    ],
    "investigations": [
      {
        "name": "Syphilis Dual Serology (RPR Titer + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks (or immediate with sore)",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Quantitative non-treponemal titer paired with treponemal confirmation."
      },
      {
        "name": "HSV-1 & HSV-2 Lesion Swab DNA PCR",
        "specimen": "Ulcer / Blister Fluid Swab",
        "window": "Active Lesion Stage (Days 1\u20133)",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Gold standard molecular test for active herpes outbreaks."
      },
      {
        "name": "HIV 4th Gen Duo Screen",
        "specimen": "Venous Blood",
        "window": "Concurrent with ulcer",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Genital ulcers dramatically increase susceptibility to HIV acquisition."
      }
    ],
    "faqs": [
      {
        "question": "How do I tell if a sore is herpes or syphilis?",
        "answer": "Herpes sores are typically multiple, painful, itchy, fluid-filled blisters that break into tender scabs. A syphilis chancre is usually a single, firm, painless ulcer with clean margins that does not hurt when touched."
      },
      {
        "question": "Can a sore be something other than an STI?",
        "answer": "Yes. Non-STI causes include friction burn from vigorous sex, ingrown hairs (folliculitis), trauma, fixed drug eruptions, Beh\u00e7et's disease, and aphthous ulcers."
      },
      {
        "question": "When is the best time to swab a sore for herpes?",
        "answer": "The highest diagnostic yield occurs within the first 48 to 72 hours of blister eruption, when viral shedding is at its peak. Once a lesion has crusted over, PCR yield declines."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Genital, Anal, and Perianal Ulcers",
        "url": "https://www.cdc.gov/std/treatment-guidelines/genital-ulcers.htm"
      },
      {
        "label": "WHO \u2014 Guidelines for the Management of Genital Ulcer Disease",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "syphilis-rpr-tpha-testing",
      "genital-herpes-testing",
      "genital-itching-and-irritation",
      "sti-testing-window-periods"
    ]
  },
  {
    "slug": "vaginal-discharge-testing",
    "priority": "P0",
    "category": "Symptom & Syndromic",
    "title": "Vaginal Discharge Testing Bangalore | BV, Yeast & STI Panel | QXL",
    "seoTitle": "Vaginal Discharge Testing Bangalore | BV, Yeast, Trichomonas | QXL",
    "description": "Comprehensive diagnostic testing for abnormal vaginal discharge in Bengaluru. Accurately differentiate Bacterial Vaginosis (BV), Candidiasis, Trichomonas & Cervicitis.",
    "h1": "Abnormal Vaginal Discharge: Causes, Testing & Diagnosis",
    "subtitle": "Accurately identifying the cause of vaginal discharge, odor, and discomfort. Distinguishing physiological changes from Bacterial Vaginosis, Yeast, and sexually transmitted pathogens.",
    "badge": "Women's Health Pathway",
    "overview": [
      "Vaginal discharge is a normal physiological function of the female reproductive tract. However, alterations in discharge color, consistency, volume, or scent\u2014especially when accompanied by itching, burning, or odor\u2014signal an underlying imbalance or infection.",
      "The vast majority of abnormal discharge cases are caused by three conditions: Bacterial Vaginosis (BV, an overgrowth of anaerobic bacteria with an amine 'fishy' odor), Vulvovaginal Candidiasis (yeast overgrowth causing thick, white, curdy discharge), and Trichomoniasis (a sexually transmitted protozoan causing frothy greenish discharge).",
      "Cervical infections from Chlamydia trachomatis or Neisseria gonorrhoeae can also cause mucopurulent endocervical discharge that, if left untreated, ascends to cause Pelvic Inflammatory Disease."
    ],
    "keyTakeaways": [
      "Bacterial Vaginosis causes thin, gray-white discharge with a distinct fishy odor, especially after sex.",
      "Yeast infections cause intense itching and thick, cottage-cheese-like odorless discharge.",
      "Trichomoniasis is an STI causing frothy, yellow-green discharge and vulvar redness.",
      "Cervicitis from Chlamydia or Gonorrhea requires molecular NAAT/PCR testing."
    ],
    "investigations": [
      {
        "name": "Comprehensive Vaginal Infection Profile",
        "specimen": "High Vaginal Swab",
        "window": "Immediate upon symptoms",
        "tat": "24 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Amsel criteria, clue cells, fungal KOH mount, Whiff test, and Trichomonas."
      },
      {
        "name": "Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "Vaginal Swab or Cervical Swab",
        "window": "Immediate upon symptoms",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "High-sensitivity molecular DNA test for cervical pathogens."
      },
      {
        "name": "Vaginal Culture & Antimicrobial Susceptibility",
        "specimen": "Swab in Transport Medium",
        "window": "Immediate",
        "tat": "48\u201372 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Identifies bacterial species and antibiotic resistance patterns."
      }
    ],
    "preparationGuidelines": [
      "Avoid vaginal douching, washes, or inserting vaginal medications/pessaries for 48 hours prior to testing.",
      "Avoid sexual intercourse for 24 hours prior to sample collection.",
      "Testing is best conducted outside the days of heavy menstrual flow."
    ],
    "faqs": [
      {
        "question": "Is Bacterial Vaginosis an STI?",
        "answer": "Bacterial Vaginosis (BV) is not strictly classified as an STI because it involves a dysbiosis (imbalance) of normal vaginal flora, but it is strongly associated with sexual activity and new partners."
      },
      {
        "question": "Why does my discharge have a fishy smell?",
        "answer": "An amine or fishy odor is the classic clinical sign of Bacterial Vaginosis. The odor often becomes more noticeable after sexual intercourse because alkaline semen volatilizes bacterial amines."
      },
      {
        "question": "Can I collect the vaginal swab myself at home?",
        "answer": "Yes. Self-collected vaginal swabs have been proven in clinical studies to be just as accurate as doctor-collected swabs for molecular PCR tests."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Vaginal Discharge Clinical Guidelines",
        "url": "https://www.cdc.gov/std/treatment-guidelines/vaginal-discharge.htm"
      },
      {
        "label": "ACOG \u2014 Clinical Management Guidelines on Vaginitis",
        "url": "https://www.acog.org/"
      }
    ],
    "relatedSlugs": [
      "sti-testing-after-vaginal-sex",
      "trichomonas-testing",
      "genital-itching-and-irritation",
      "gonorrhea-chlamydia-pcr"
    ]
  },
  {
    "slug": "oral-throat-symptoms",
    "priority": "P1",
    "category": "Symptom & Syndromic",
    "title": "Throat Symptoms After Oral Sex Bangalore | Pharyngeal PCR | QXL",
    "seoTitle": "Throat Symptoms After Oral Sex Bangalore | Oral STI Testing | QXL",
    "description": "Clinical diagnosis for throat soreness, redness, and ulcers following oral sex in Bengaluru. Pharyngeal swab NAAT for Gonorrhea, Chlamydia, Oral Herpes & Syphilis.",
    "h1": "Throat & Oral Symptoms After Oral Sex: Diagnostic Guide",
    "subtitle": "Differentiating routine viral or bacterial pharyngitis from sexually transmitted pharyngeal gonorrhea, oral chlamydia, syphilis, and herpes simplex in Bangalore.",
    "badge": "Symptom Pathway",
    "overview": [
      "Developing a sore throat, tonsillar redness, or oral ulcers shortly after performing oral sex can cause anxiety. While common respiratory viruses and Streptococcus are frequent culprits, specific STIs can directly infect the pharyngeal mucosa.",
      "The most significant pathogen in this anatomical site is Neisseria gonorrhoeae. Pharyngeal gonorrhea is notoriously asymptomatic in over 85% of cases, but when symptomatic, it presents as persistent pharyngitis unresponsive to routine beta-lactam antibiotics.",
      "Importantly, blood tests and routine urine samples will NOT detect throat gonorrhea or chlamydia. An extragenital pharyngeal swab analyzed with validated molecular NAAT is required."
    ],
    "keyTakeaways": [
      "Throat gonorrhoea is usually asymptomatic but can cause persistent sore throat and tonsillar exudate.",
      "Routine urine tests and throat viral swabs completely miss pharyngeal STIs.",
      "A dual-target pharyngeal swab NAAT/PCR is required for accurate detection.",
      "Do not eat, drink, or use mouthwash for at least 1 hour prior to throat swab collection."
    ],
    "investigations": [
      {
        "name": "Pharyngeal Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "Throat Swab (Flocked Swab)",
        "window": "10\u201314 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Validated molecular assay for pharyngeal specimens."
      },
      {
        "name": "Oral Lesion HSV-1/2 PCR",
        "specimen": "Oral Ulcer Swab",
        "window": "Active Lesion Stage",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Differentiates herpes simplex from aphthous ulcers."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Screens for primary oral chancres and secondary syphilis mucous patches."
      }
    ],
    "faqs": [
      {
        "question": "Can oral sex transmit gonorrhea to the throat?",
        "answer": "Yes. Gonorrhea readily infects the pharynx during oral sex. It often colonizes without obvious symptoms, creating an unrecognized reservoir for onward transmission."
      },
      {
        "question": "How does pharyngeal gonorrhea differ from a routine sore throat?",
        "answer": "Symptoms look identical to standard pharyngitis (red throat, difficulty swallowing, swollen cervical lymph nodes). However, standard throat cultures or amoxicillin will not cure gonorrhea."
      },
      {
        "question": "Can oral sex transmit HIV?",
        "answer": "The risk of HIV transmission from oral sex is extremely low, provided there are no open bleeding sores, bleeding gums, or concurrent oral ulcers."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Pharyngeal Gonococcal Infection Testing",
        "url": "https://www.cdc.gov/std/treatment-guidelines/gonorrhea-adults.htm"
      },
      {
        "label": "BASHH \u2014 Extragenital Infection Guidelines",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "sti-testing-after-oral-sex",
      "gonorrhea-chlamydia-pcr",
      "genital-sores-blisters-ulcers",
      "sti-risk-kissing-and-genital-contact"
    ]
  },
  {
    "slug": "hiv-symptoms-and-anxiety",
    "priority": "P1",
    "category": "Symptom & Syndromic",
    "title": "HIV Symptoms vs Anxiety Bangalore | ARS Facts & Conclusive Testing | QXL",
    "seoTitle": "HIV Symptoms vs Health Anxiety Bangalore | ARS Facts & Testing | QXL",
    "description": "Clinical breakdown of HIV Acute Retroviral Syndrome (ARS) symptoms vs severe psychosomatic health anxiety. Objective timelines and conclusive laboratory tests in Bengaluru.",
    "h1": "HIV Symptoms vs Health Anxiety: Clinical Facts & Reassurance",
    "subtitle": "Disentangling real Acute Retroviral Syndrome symptoms from anxiety-induced psychosomatic manifestations. Why testing\u2014not symptom-searching\u2014is the only path to peace of mind.",
    "badge": "Psycho-Clinical Support",
    "showHivCalculator": true,
    "overview": [
      "Following a perceived sexual risk, individuals frequently experience intense anxiety, catastrophic thinking, and obsessive body monitoring. This psychological distress often manifests as somatic physical symptoms that mimic illness.",
      "Stress, panic, and sleep deprivation trigger cortisol and adrenaline release, resulting in dry mouth, white tongue coating, muscle twitches, tension headaches, perceived hot flashes, nausea, and diarrhea. Patients mistakenly interpret these as 'early HIV symptoms'.",
      "In clinical reality, Acute Retroviral Syndrome (ARS) occurs in only a portion of newly infected individuals, typically 2 to 4 weeks after exposure, characterized by acute high fever (>38\u00b0C), widespread non-itchy rash, and marked lymphadenopathy. Crucially, HIV CANNOT be diagnosed by symptoms\u2014only by accredited laboratory blood testing."
    ],
    "keyTakeaways": [
      "Severe health anxiety can directly induce real physical symptoms like fatigue, hot flashes, sweating, and nausea.",
      "White tongue coating after stress is almost always benign dehydration, dry mouth, or reflux\u2014NOT oral thrush.",
      "Searching symptoms on the internet increases catastrophic anxiety without providing clinical answers.",
      "A 4th-generation venous blood test at the appropriate window period provides objective, definitive closure."
    ],
    "investigations": [
      {
        "name": "HIV-1 & HIV-2 4th Gen Duo (p24 Ag + Ab ECLIA)",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days (Definitive at 90 Days)",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "The gold standard objective test; puts an end to symptom guesswork."
      },
      {
        "name": "Complete Blood Count (CBC) with ESR",
        "specimen": "Whole Blood (EDTA)",
        "window": "Immediate",
        "tat": "4 Hours",
        "price": "\u20b9350",
        "clinicalNote": "Evaluates overall white blood cell counts, platelets, and systemic inflammation."
      },
      {
        "name": "Comprehensive STI Screening Panel",
        "specimen": "Blood & Urine",
        "window": "Post-Window",
        "tat": "24 Hours",
        "price": "\u20b92,499",
        "clinicalNote": "Rules out Syphilis, Hepatitis B, and bacterial STIs that also cause worry."
      }
    ],
    "faqs": [
      {
        "question": "Can severe stress cause real physical HIV-like symptoms?",
        "answer": "Yes. Acute anxiety triggers hyperarousal, insomnia, night sweats, gastrointestinal upset, muscle tension, and dry mouth. These somatic symptoms are caused by autonomic nervous system overdrive, not viral infection."
      },
      {
        "question": "What does genuine Acute Retroviral Syndrome (ARS) look like?",
        "answer": "ARS resembles a severe flu or mononucleosis: sudden high fever (>101\u00b0F / 38.3\u00b0C), extreme fatigue, widespread swollen lymph nodes in neck/groin/armpits, painful sore throat, and a flat red maculopapular rash on the trunk."
      },
      {
        "question": "If my 4th-generation HIV test is negative at 45 days, can I believe it?",
        "answer": "Yes. Per CDC guidelines, a 4th-generation venous laboratory test drawn from an arm vein is over 99% conclusive at 45 days in the absence of PEP/PrEP medications."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Acute HIV Infection Overview",
        "url": "https://www.cdc.gov/hiv/clinicians/screening-testing/acute-infection.html"
      },
      {
        "label": "American Psychological Association \u2014 Somatic Symptom Disorder and Health Anxiety",
        "url": "https://www.apa.org/"
      }
    ],
    "relatedSlugs": [
      "hiv-testing-after-exposure",
      "sti-testing-window-periods",
      "understanding-sti-test-results",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "uti-vs-sti",
    "priority": "P1",
    "category": "Symptom & Syndromic",
    "title": "UTI vs STI Differences Bangalore | Urine Culture vs PCR | QXL",
    "seoTitle": "UTI vs STI Differences Bangalore | Symptoms, Urine Culture & PCR | QXL",
    "description": "Clinical guide differentiating Urinary Tract Infections (UTIs) from Sexually Transmitted Infections (STIs) in Bangalore. Comparing symptoms, urine collection & testing.",
    "h1": "UTI vs STI: Symptoms, Key Differences & Correct Testing",
    "subtitle": "Burning urination? Understand why midstream urine culture diagnoses UTIs while first-catch urine NAAT detects STIs, ensuring proper antibiotic treatment.",
    "badge": "Diagnostic Guide",
    "overview": [
      "Burning urination (dysuria) and urinary frequency are distressing symptoms that prompt patients to wonder whether they have a routine Urinary Tract Infection (UTI) or a Sexually Transmitted Infection (STI).",
      "A Urinary Tract Infection involves the bladder, ureters, or kidneys, most commonly caused by gastrointestinal coliform bacteria such as Escherichia coli entering the urethra. It is especially common in women due to anatomical proximity.",
      "In contrast, an STI such as Chlamydia, Gonorrhea, Trichomonas, or Mycoplasma genitalium infects the urethral mucosa through sexual contact. In sexually active men under 50, burning urination is overwhelmingly an STI (urethritis), not a bladder UTI.",
      "Crucially, the sample collection methods are opposites: a UTI requires a 'clean-catch midstream' urine sample for bacterial culture, whereas an STI requires 'first-catch dirty' urine for molecular NAAT/PCR."
    ],
    "keyTakeaways": [
      "In young sexually active men, dysuria is far more likely an STI than a simple bladder UTI.",
      "UTIs are identified by midstream urine culture; STIs are diagnosed by first-catch urine PCR.",
      "Discharge from the penis or vagina points strongly to an STI rather than a simple UTI.",
      "Over-the-counter UTI pain relievers (like phenazopyridine) do not cure the underlying infection."
    ],
    "investigations": [
      {
        "name": "Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "First-Catch Urine (First 20\u201330 mL)",
        "window": "10\u201314 Days (Immediate with symptoms)",
        "tat": "24 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Molecular assay detecting urethral STI pathogens."
      },
      {
        "name": "Urine Culture & Antibiotic Susceptibility",
        "specimen": "Midstream Clean-Catch Urine",
        "window": "Immediate upon symptoms",
        "tat": "48 Hours",
        "price": "\u20b9650",
        "clinicalNote": "Identifies coliform bacterial growth (e.g. E. coli, Klebsiella) and antibiotic sensitivities."
      },
      {
        "name": "Urine Routine & Microscopic Examination",
        "specimen": "Urine",
        "window": "Immediate",
        "tat": "2 Hours",
        "price": "\u20b9250",
        "clinicalNote": "Rapid check for pus cells, RBCs, nitrites, and leukocyte esterase."
      }
    ],
    "faqs": [
      {
        "question": "Why is sample collection different for UTIs and STIs?",
        "answer": "For an STI, pathogens live inside the urethral tube, so you need the first 20 mL of urine to wash them into the cup. For a UTI, bacteria live in the bladder, so you let the first burst go into the toilet and catch the midstream urine to avoid urethral contamination."
      },
      {
        "question": "Can antibiotics for a UTI cure gonorrhea or chlamydia?",
        "answer": "Generally, no. Common UTI medications like nitrofurantoin or fosfomycin have no activity against Chlamydia or Gonorrhea. You need specific targeted antibiotics prescribed after accurate diagnosis."
      },
      {
        "question": "Can men get UTIs without an STI?",
        "answer": "Uncomplicated UTIs are rare in healthy young men. In men over 50, enlarged prostate (BPH) or urinary retention can cause UTIs. In younger men, burning urination is usually an STI."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Clinical Comparison: Dysuria, Urethritis & Cystitis",
        "url": "https://www.cdc.gov/std/treatment-guidelines/urethritis-and-cervicitis.htm"
      },
      {
        "label": "IDSA \u2014 Clinical Practice Guidelines for Urinary Tract Infections",
        "url": "https://www.idsociety.org/"
      }
    ],
    "relatedSlugs": [
      "genital-discharge-and-burning",
      "gonorrhea-chlamydia-pcr",
      "sti-sample-collection",
      "persistent-urethritis-testing"
    ]
  },
  {
    "slug": "gonorrhea-chlamydia-pcr",
    "priority": "P0",
    "category": "Investigation & Assay",
    "title": "Gonorrhea & Chlamydia PCR Test Bangalore | Dual NAAT | QXL",
    "seoTitle": "Gonorrhea & Chlamydia PCR Testing Bangalore | Urine & Swab NAAT | QXL",
    "description": "Gold-standard molecular dual NAAT/PCR testing for Neisseria gonorrhoeae and Chlamydia trachomatis in Bengaluru. High-sensitivity first-catch urine & swab analysis.",
    "h1": "Gonorrhea & Chlamydia Real-Time PCR (NAAT) in Bangalore",
    "subtitle": "The definitive molecular diagnostic test for Chlamydia trachomatis and Neisseria gonorrhoeae. Automated real-time amplification from first-catch urine or anatomical swabs.",
    "badge": "Gold Standard Molecular Assay",
    "overview": [
      "Chlamydia trachomatis and Neisseria gonorrhoeae are the two most prevalent bacterial sexually transmitted infections globally. Because both organisms infect the same mucosal tissues and produce overlapping clinical syndromes, simultaneous dual testing is the international standard of care.",
      "Traditional bacterial cultures have poor sensitivity (often below 50% for fastidious organisms like Chlamydia). In contrast, Nucleic Acid Amplification Tests (NAAT) like Real-Time PCR detect specific target DNA sequences with clinical sensitivity and specificity exceeding 99%.",
      "At QXL Diagnostics, automated molecular testing is performed under ISO 15189:2022 standards using first-catch urine for men and vaginal or cervical swabs for women, alongside validated extragenital pharyngeal and rectal swabs."
    ],
    "keyTakeaways": [
      "Real-Time PCR is far more sensitive and reliable than traditional urine bacterial culture.",
      "Dual NAAT detects both organisms from a single urine or swab specimen.",
      "Can detect silent asymptomatic infections that cause pelvic scarring and tubal infertility.",
      "Specimens accepted: First-catch urine, cervical swab, vaginal swab, throat swab, and rectal swab."
    ],
    "investigations": [
      {
        "name": "Chlamydia & Gonorrhea Dual Real-Time PCR",
        "specimen": "First-catch urine or anatomical swab",
        "window": "10\u201314 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Automated thermocycler molecular DNA amplification."
      },
      {
        "name": "Triple STI PCR (Chlamydia + Gonorrhea + Trichomonas)",
        "specimen": "First-catch urine or swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Expanded multiplex PCR covering the three primary non-viral pathogens."
      },
      {
        "name": "Extragenital Dual Site PCR (Pharyngeal + Rectal)",
        "specimen": "Two Swabs",
        "window": "14 Days",
        "tat": "48 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Comprehensive extragenital screening for oral and anal exposures."
      }
    ],
    "faqs": [
      {
        "question": "How long after sex can PCR detect Chlamydia and Gonorrhea?",
        "answer": "Bacterial DNA replicates within mucosal cells rapidly. The test becomes highly sensitive between 10 and 14 days after exposure, though it can detect pathogens earlier if symptomatic."
      },
      {
        "question": "Do I need to fast for a chlamydia and gonorrhea test?",
        "answer": "No. Fasting is not required. However, for urine tests, you MUST avoid urinating for at least 1 to 2 hours before sample collection so bacterial DNA is concentrated."
      },
      {
        "question": "Can PCR detect dead bacteria after treatment?",
        "answer": "Yes. PCR amplifies DNA fragments, which can persist for 3 to 4 weeks after successful antibiotic cure. For this reason, a 'test-of-cure' PCR should only be done 4 weeks after finishing antibiotics."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Recommendations for the Laboratory-Based Detection of Chlamydia & Gonorrhea",
        "url": "https://www.cdc.gov/std/laboratory/chlamydia-gonorrhea.htm"
      },
      {
        "label": "WHO \u2014 Diagnostic Guidelines for Neisseria gonorrhoeae and Chlamydia trachomatis",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "sti-testing-window-periods",
      "genital-discharge-and-burning",
      "sti-sample-collection",
      "sti-testing-after-antibiotics"
    ]
  },
  {
    "slug": "syphilis-rpr-tpha-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "Syphilis Testing Bangalore | RPR Titer & TPHA Confirmation | QXL",
    "seoTitle": "Syphilis RPR & TPHA Testing Bangalore | Dual Serology & Titers | QXL",
    "description": "NABL-accredited Syphilis testing in Bengaluru. Quantitative RPR/VDRL with antibody dilution titers, TPHA treponemal confirmation, and disease staging serology.",
    "h1": "Syphilis Testing in Bangalore: RPR Titers & TPHA Confirmation",
    "subtitle": "Comprehensive dual-algorithm serology for Treponema pallidum. Differentiating active primary/secondary syphilis, latent disease, and successful past treatment response.",
    "badge": "Specialized Serology",
    "overview": [
      "Syphilis, caused by the spirochete Treponema pallidum, is known as the 'Great Imitator' due to its diverse clinical presentations spanning primary ulcers, secondary rashes, and years of asymptomatic latency.",
      "Accurate diagnosis requires two complementary classes of serological tests: Non-Treponemal tests (like Rapid Plasma Reagin / RPR or VDRL) and Treponemal tests (like TPHA or Treponema pallidum ECLIA).",
      "Non-treponemal tests measure reaginic antibodies and provide a quantitative titer (e.g., 1:16, 1:64) that correlates with disease activity and falls after successful penicillin treatment. Treponemal tests measure specific antibodies to the organism and typically remain positive for life, confirming past exposure."
    ],
    "keyTakeaways": [
      "Both a non-treponemal (RPR) and treponemal (TPHA) test are required for accurate diagnosis.",
      "Quantitative RPR titers monitor active infection and confirm successful cure after penicillin therapy.",
      "TPHA remains positive for life in most patients even after complete antibiotic cure.",
      "Syphilis antibodies typically become detectable 3 to 6 weeks after exposure."
    ],
    "investigations": [
      {
        "name": "Syphilis Dual Screening & Confirmation (RPR + TPHA)",
        "specimen": "Venous Blood (Serum)",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Includes quantitative RPR titer and definitive TPHA hemagglutination."
      },
      {
        "name": "Quantitative RPR with Reflex Titration",
        "specimen": "Venous Blood (Serum)",
        "window": "3\u20136 Weeks",
        "tat": "6\u201312 Hours",
        "price": "\u20b9450",
        "clinicalNote": "Reports exact endpoint dilution ratio for clinical treatment monitoring."
      },
      {
        "name": "Treponema pallidum Total Antibodies (CLIA)",
        "specimen": "Venous Blood",
        "window": "2\u20134 Weeks",
        "tat": "6 Hours",
        "price": "\u20b9650",
        "clinicalNote": "Automated high-sensitivity chemiluminescence treponemal screen."
      }
    ],
    "faqs": [
      {
        "question": "Why does a syphilis test have two different parts (RPR and TPHA)?",
        "answer": "RPR is non-specific and can have biological false positives (from autoimmune conditions or pregnancy). TPHA is highly specific to Treponema pallidum. Performing both confirms true infection and indicates whether it is active or past-treated."
      },
      {
        "question": "What does a titer like 1:16 mean?",
        "answer": "A titer measures how much your blood can be diluted and still show reactivity. Higher titers (like 1:16, 1:32, or 1:64) indicate active or recent infection. Successful treatment is confirmed when the titer drops by at least fourfold (e.g., from 1:16 down to 1:4)."
      },
      {
        "question": "Can syphilis be cured?",
        "answer": "Yes. Syphilis is completely curable with appropriate penicillin injections (or doxycycline if penicillin-allergic). However, treatment does not reverse permanent late-stage tissue damage, making early diagnosis critical."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Syphilis Diagnostic Considerations & Algorithms",
        "url": "https://www.cdc.gov/std/treatment-guidelines/p-and-s-syphilis.htm"
      },
      {
        "label": "WHO \u2014 Guidelines for the Treatment of Treponema pallidum (Syphilis)",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "genital-sores-blisters-ulcers",
      "sti-testing-window-periods",
      "understanding-sti-test-results",
      "couples-sti-screening"
    ]
  },
  {
    "slug": "hepatitis-b-triple-panel",
    "priority": "P0",
    "category": "Investigation & Assay",
    "title": "Hepatitis B Triple Panel Bangalore | Complete Serology | QXL",
    "seoTitle": "Hepatitis B Triple Panel Bangalore | HBsAg, Anti-HBs, Anti-HBc | QXL",
    "description": "Comprehensive Hepatitis B Triple Panel serology in Bengaluru. Differentiating active infection, vaccine-induced immunity & resolved exposure with HBsAg, Anti-HBs & Total Anti-HBc.",
    "h1": "Hepatitis B Triple Panel: Complete Serological Assessment",
    "subtitle": "Why testing only HBsAg is clinically inadequate. Understanding the three essential blood markers for accurate diagnosis, immunity verification, and exposure history in Bangalore.",
    "badge": "Core Serology Master",
    "overview": [
      "Hepatitis B virus (HBV) is a blood-borne and sexually transmitted virus that is roughly 50 to 100 times more infectious than HIV. Sexual transmission occurs readily through blood, semen, and vaginal fluids.",
      "A widespread clinical shortcoming is ordering only Hepatitis B Surface Antigen (HBsAg). While HBsAg identifies active infection, it cannot evaluate whether you have protective immunity from vaccination, nor can it detect past resolved infections or the 'core window' period.",
      "The Hepatitis B Triple Panel combines three definitive markers: HBsAg (current infection), Anti-HBs (protective antibody immunity), and Total Anti-HBc (lifetime exposure history). Together, these provide a complete, unambiguous serological profile."
    ],
    "keyTakeaways": [
      "HBsAg Positive: Active acute or chronic infection; infectious to partners.",
      "Anti-HBs Positive ALONE: Protective immunity from successful Hepatitis B vaccination.",
      "Anti-HBs Positive AND Anti-HBc Positive: Natural past infection, now resolved with lasting immunity.",
      "Total Anti-HBc Positive ALONE: Past resolved infection, occult HBV, or late acute window period."
    ],
    "investigations": [
      {
        "name": "Complete Hepatitis B Triple Panel",
        "specimen": "Venous Blood (Serum)",
        "window": "30\u201360 Days",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,250",
        "clinicalNote": "Includes HBsAg, Anti-HBs quantitative titer, and Total Anti-HBc (IgG/IgM)."
      },
      {
        "name": "Quantitative Anti-HBs Antibody Titer",
        "specimen": "Venous Blood",
        "window": "Post-Vaccination (1\u20132 Months)",
        "tat": "6 Hours",
        "price": "\u20b9650",
        "clinicalNote": "Confirms vaccine antibody levels (protective threshold: \u226510 mIU/mL)."
      },
      {
        "name": "Quantitative HBV DNA Real-Time PCR",
        "specimen": "Plasma (EDTA)",
        "window": "Specialist-directed",
        "tat": "48\u201372 Hours",
        "price": "\u20b92,950",
        "clinicalNote": "Measures exact viral load in IU/mL to guide antiviral therapy."
      }
    ],
    "faqs": [
      {
        "question": "Why is HBsAg alone not enough?",
        "answer": "If you only test HBsAg and get a negative result, you do not know if you are protected by vaccination or if you are completely vulnerable to acquiring Hepatitis B. The triple panel evaluates active infection AND protective immunity."
      },
      {
        "question": "What antibody titer indicates protection from vaccination?",
        "answer": "An Anti-HBs titer of 10 mIU/mL or higher is internationally recognized as conferring protective immunity against Hepatitis B infection."
      },
      {
        "question": "Can adults get vaccinated if they are not protected?",
        "answer": "Yes! If your triple panel shows you are negative for all three markers (susceptible), an adult 3-dose vaccine series (given at 0, 1, and 6 months) provides over 95% lifelong protection."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Interpretation of Hepatitis B Serologic Test Results",
        "url": "https://www.cdc.gov/hepatitis/hbv/interpretationOfHepBSerolResults.htm"
      },
      {
        "label": "WHO \u2014 Guidelines for the Prevention, Care, and Treatment of Persons with Chronic Hepatitis B",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "hepatitis-c-testing",
      "sti-testing-window-periods",
      "hiv-pep-prep-testing",
      "couples-sti-screening"
    ]
  },
  {
    "slug": "hepatitis-c-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "Hepatitis C Testing Bangalore | Anti-HCV & Viral Load PCR | QXL",
    "seoTitle": "Hepatitis C Blood Testing Bangalore | Anti-HCV & HCV RNA PCR | QXL",
    "description": "NABL-accredited Hepatitis C testing in Bengaluru. 4th Gen Anti-HCV chemiluminescent antibody screening with reflex quantitative HCV RNA PCR confirmation.",
    "h1": "Hepatitis C Testing in Bangalore: Screening & Viral Load",
    "subtitle": "Accurate serological screening and molecular confirmation for Hepatitis C. Understanding antibody window periods, transmission routes, and curative antiviral therapies.",
    "badge": "Blood-Borne Serology",
    "overview": [
      "Hepatitis C virus (HCV) is a blood-borne virus that causes acute and chronic hepatitis, potentially leading to liver cirrhosis and hepatocellular carcinoma if left untreated.",
      "While primarily transmitted through blood-to-blood contact (such as unsterile needles, medical procedures, or tattooing), sexual transmission of HCV occurs, particularly among men who have sex with men (MSM), individuals with multiple partners, or when mucosal trauma or concurrent ulcer disease is present.",
      "Diagnostic guidelines require a two-step algorithm: an initial high-sensitivity Anti-HCV antibody blood test, followed by reflex HCV RNA PCR testing if the antibody is reactive to confirm whether active viral replication is present."
    ],
    "keyTakeaways": [
      "HCV antibody screening detects whether you have ever been exposed to the virus.",
      "A reactive antibody test MUST be followed by an HCV RNA PCR test to confirm active infection.",
      "Up to 25% of individuals clear the virus naturally; they remain antibody-positive but RNA-negative.",
      "Modern Direct-Acting Antivirals (DAAs) provide a cure rate exceeding 95% in 8 to 12 weeks of oral therapy."
    ],
    "investigations": [
      {
        "name": "Anti-HCV Total Antibodies (CLIA)",
        "specimen": "Venous Blood (Serum)",
        "window": "8\u201311 Weeks",
        "tat": "6\u201312 Hours",
        "price": "\u20b9850",
        "clinicalNote": "Chemiluminescent microparticle immunoassay screening."
      },
      {
        "name": "HCV RNA Quantitative Real-Time PCR",
        "specimen": "Plasma (EDTA)",
        "window": "2\u20134 Weeks (or post-antibody reactive)",
        "tat": "48\u201372 Hours",
        "price": "\u20b93,400",
        "clinicalNote": "Measures active viral load in IU/mL to confirm ongoing infection."
      },
      {
        "name": "Liver Function Tests (LFT) Complete",
        "specimen": "Venous Blood",
        "window": "Concurrent",
        "tat": "4 Hours",
        "price": "\u20b9480",
        "clinicalNote": "Evaluates hepatic inflammation, SGOT/AST, SGPT/ALT, and bilirubin."
      }
    ],
    "faqs": [
      {
        "question": "What is the window period for Hepatitis C testing?",
        "answer": "Anti-HCV antibodies typically take 8 to 11 weeks to develop after exposure. If early acute infection is suspected, an HCV RNA PCR test can detect viral genetic material within 2 to 3 weeks."
      },
      {
        "question": "If my antibody test is positive, do I definitely have Hepatitis C?",
        "answer": "Not necessarily. About 15% to 25% of people naturally clear the virus on their own. Their antibody test will remain positive for life, but their HCV RNA PCR test will be negative, meaning no active infection exists."
      },
      {
        "question": "Is Hepatitis C curable?",
        "answer": "Yes! Unlike Hepatitis B or HIV, Hepatitis C is completely curable. Once-daily oral Direct-Acting Antiviral (DAA) medications taken for 8 to 12 weeks cure over 95% of patients with minimal side effects."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Testing Recommendations for Hepatitis C Virus Infection",
        "url": "https://www.cdc.gov/hepatitis/hcv/guidelinesc.htm"
      },
      {
        "label": "WHO \u2014 Guidelines for the Care and Treatment of Persons Diagnosed with Chronic Hepatitis C",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "hepatitis-b-triple-panel",
      "sti-testing-window-periods",
      "understanding-sti-test-results",
      "hiv-testing-after-exposure"
    ]
  },
  {
    "slug": "genital-herpes-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "Genital Herpes Testing Bangalore | HSV-1 & HSV-2 PCR & IgG | QXL",
    "seoTitle": "Genital Herpes Testing Bangalore | HSV PCR & Type-Specific IgG | QXL",
    "description": "Evidence-based Genital Herpes testing in Bengaluru. Active lesion swab Real-Time PCR, type-specific HSV-1 & HSV-2 IgG serology, and why IgM is clinically discouraged.",
    "h1": "Genital Herpes Testing: HSV-1 & HSV-2 Diagnosis",
    "subtitle": "Accurate molecular swab PCR and type-specific IgG serology. Why CDC guidelines discourage routine IgM testing and how to obtain definitive clarity in Bangalore.",
    "badge": "Molecular & Serology",
    "overview": [
      "Genital herpes is caused by two related viruses: Herpes Simplex Virus Type 1 (HSV-1, historically associated with oral cold sores but now a leading cause of genital herpes due to oral sex) and Herpes Simplex Virus Type 2 (HSV-2, primarily genital).",
      "The gold standard for diagnosing an active blister, sore, or ulcer is Real-Time DNA PCR from a lesion swab. PCR is up to five times more sensitive than viral culture and differentiates HSV-1 from HSV-2.",
      "For blood tests, international guidelines explicitly warn against ordering HSV IgM antibodies due to high cross-reactivity and false positives. Instead, type-specific IgG serology drawn after 12 weeks detects established humoral immunity."
    ],
    "keyTakeaways": [
      "Lesion Swab PCR is the most accurate test when blisters or sores are present.",
      "HSV IgM blood tests are NOT recommended by the CDC due to inaccurate false-positive results.",
      "Type-specific HSV-1 and HSV-2 IgG blood tests require a 12-week window period.",
      "Oral sex can transmit HSV-1 to the genitals, causing typical genital herpes outbreaks."
    ],
    "investigations": [
      {
        "name": "HSV-1 & HSV-2 DNA Real-Time PCR",
        "specimen": "Lesion Swab (Fluid/Base of Ulcer)",
        "window": "Active Outbreak (Days 1\u20133)",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "Molecular detection from active blister fluid; highest analytical sensitivity."
      },
      {
        "name": "Type-Specific HSV-1 & HSV-2 IgG (CLIA)",
        "specimen": "Venous Blood",
        "window": "12 Weeks (for past exposure)",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Distinguishes HSV-1 from HSV-2 glycoprotein G-specific IgG antibodies."
      }
    ],
    "faqs": [
      {
        "question": "Why should I not get an HSV IgM test?",
        "answer": "Major guidelines including the CDC advise against HSV IgM testing because IgM antibodies cross-react with other common herpesviruses (like chickenpox or Epstein-Barr), frequently causing false-positive results that lead to immense unnecessary distress."
      },
      {
        "question": "Can I have genital herpes caused by HSV-1?",
        "answer": "Yes. Today, up to 50% of new genital herpes cases in young adults are caused by HSV-1 transmitted through oral sex from a partner with oral herpes."
      },
      {
        "question": "Can herpes be transmitted when no blisters are present?",
        "answer": "Yes. Asymptomatic viral shedding occurs periodically when the virus reactivates on mucosal surfaces without causing visible lesions. Antiviral medications and condoms reduce shedding risk."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Genital Herpes Laboratory Guidance",
        "url": "https://www.cdc.gov/std/treatment-guidelines/herpes.htm"
      },
      {
        "label": "BASHH \u2014 UK National Guidelines for the Management of Anogenital Herpes",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "genital-sores-blisters-ulcers",
      "sti-testing-window-periods",
      "sti-risk-kissing-and-genital-contact",
      "understanding-sti-test-results"
    ]
  },
  {
    "slug": "hpv-dna-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "HPV DNA Testing Bangalore | High-Risk Genotyping & Pap | QXL",
    "seoTitle": "High-Risk HPV DNA Testing Bangalore | PCR Genotyping & Screening | QXL",
    "description": "High-Risk HPV DNA testing and PCR genotyping in Bengaluru. Detects oncogenic HPV 16, 18 and high-risk subtypes for cervical cancer prevention and genital wart evaluation.",
    "h1": "High-Risk HPV DNA PCR Testing & Genotyping in Bangalore",
    "subtitle": "Advanced molecular screening for Human Papillomavirus. Identifying oncogenic high-risk genotypes 16 and 18 for cervical cancer prevention and wart management.",
    "badge": "Molecular Screening",
    "overview": [
      "Human Papillomavirus (HPV) is the most common sexually transmitted infection worldwide. Over 100 strains exist, broadly categorized into High-Risk (oncogenic) and Low-Risk (non-oncogenic) types.",
      "High-risk HPV types (predominantly 16 and 18, along with 31, 33, 45, 52, 58) are the primary cause of cervical cancer, anal cancer, and oropharyngeal cancers. These high-risk strains do NOT cause visible genital warts; they cause silent cellular dysplasia.",
      "Conversely, low-risk HPV types 6 and 11 cause benign genital warts (condylomata acuminata) and do not lead to cancer. High-Risk HPV DNA PCR detects oncogenic strains years before cellular abnormalities appear on a Pap smear."
    ],
    "keyTakeaways": [
      "High-risk HPV causes silent cellular changes; low-risk HPV causes visible benign genital warts.",
      "HPV DNA PCR is more sensitive and reliable than a traditional Pap smear alone.",
      "Most healthy immune systems naturally clear HPV infections within 12 to 24 months.",
      "Co-testing (HPV DNA + Liquid-Based Cytology) is the gold standard cervical screening protocol."
    ],
    "investigations": [
      {
        "name": "High-Risk HPV DNA PCR (14/16 Genotypes)",
        "specimen": "Cervical Swab / Vaginal Swab / Anatomical Swab",
        "window": "Routine / Annual Screening",
        "tat": "48\u201372 Hours",
        "price": "\u20b92,800",
        "clinicalNote": "Specifically identifies HPV 16 and 18, with pooled high-risk group detection."
      },
      {
        "name": "Liquid-Based Cytology (Pap Smear) + HPV Co-Test",
        "specimen": "Cervical Sample in ThinPrep/SurePath",
        "window": "Routine Screening",
        "tat": "3\u20135 Days",
        "price": "\u20b93,400",
        "clinicalNote": "Evaluates cellular morphology alongside oncogenic HPV viral DNA."
      }
    ],
    "faqs": [
      {
        "question": "Is there an HPV test for men?",
        "answer": "Routine HPV DNA screening is not clinically recommended for men on intact penile skin because no standardized, FDA-approved test exists. For men who practice receptive anal intercourse, anal HPV PCR and cytology can be performed."
      },
      {
        "question": "If I test positive for high-risk HPV, do I have cancer?",
        "answer": "No! Testing positive for high-risk HPV simply means the virus is present in your cervical or mucosal cells. Over 90% of HPV infections are naturally cleared by the immune system within two years without ever developing into cancer."
      },
      {
        "question": "Does the HPV vaccine work if I am already sexually active?",
        "answer": "Yes. Even if you have been exposed to one strain, the 9-valent HPV vaccine protects you against the remaining high-risk and low-risk strains you have not yet encountered."
      }
    ],
    "clinicalReferences": [
      {
        "label": "WHO \u2014 Guidelines for Screening and Treatment of Cervical Pre-Cancer Lesions",
        "url": "https://www.who.int/"
      },
      {
        "label": "ACOG \u2014 Cervical Cancer Screening Guidelines",
        "url": "https://www.acog.org/"
      }
    ],
    "relatedSlugs": [
      "asymptomatic-sti-screening",
      "sti-testing-after-vaginal-sex",
      "vaginal-discharge-testing",
      "sti-and-fertility"
    ]
  },
  {
    "slug": "trichomonas-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "Trichomonas Testing Bangalore | NAAT PCR vs Wet Mount | QXL",
    "seoTitle": "Trichomonas Testing Bangalore | Molecular NAAT vs Microscopy | QXL",
    "description": "Accurate Trichomonas vaginalis testing in Bengaluru. High-sensitivity Real-Time PCR NAAT vs traditional wet mount microscopy for persistent discharge and irritation.",
    "h1": "Trichomonas vaginalis: Molecular NAAT vs Microscopy",
    "subtitle": "Definitive diagnosis for one of the most common yet underdiagnosed non-viral STIs. Overcoming the 50% false-negative rate of saline wet mount microscopy with PCR.",
    "badge": "Targeted Parasitology",
    "overview": [
      "Trichomonas vaginalis is a motile parasitic protozoan that infects the urogenital tract. Despite being one of the most widespread curable STIs worldwide, it is frequently missed during routine clinical checkups.",
      "In women, symptoms include frothy, greenish-yellow vaginal discharge, foul odor, vulvar irritation, and 'strawberry cervix' (punctate cervical hemorrhages). In men, Trichomonas infects the urethra and prostate, but over 70% of men have zero symptoms and unknowingly transmit the parasite.",
      "Traditional saline wet mount microscopy has an analytical sensitivity of only 50\u201360% because trichomonads stop moving within minutes of collection. Molecular NAAT/PCR provides over 95% sensitivity and detects non-motile organisms."
    ],
    "keyTakeaways": [
      "Traditional wet mount microscopy misses up to 50% of Trichomonas infections.",
      "Real-Time PCR is the gold standard diagnostic method for both women and men.",
      "Men are often asymptomatic carriers who re-infect their partners if not treated.",
      "Both sexual partners must be treated simultaneously to prevent cyclical re-infection."
    ],
    "investigations": [
      {
        "name": "Trichomonas vaginalis Real-Time PCR (NAAT)",
        "specimen": "First-catch urine or vaginal swab",
        "window": "10\u201314 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,150",
        "clinicalNote": "High-accuracy DNA detection; independent of protozoan viability."
      },
      {
        "name": "Triple STI PCR Screen (Chlamydia + Gonorrhea + Trichomonas)",
        "specimen": "Urine or Swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Comprehensive single-test evaluation for all three common discharge pathogens."
      },
      {
        "name": "Saline Wet Mount Microscopy",
        "specimen": "Fresh Vaginal Swab",
        "window": "Immediate upon symptoms",
        "tat": "2 Hours",
        "price": "\u20b9450",
        "clinicalNote": "Rapid in-lab direct visualization of motile flagellates."
      }
    ],
    "faqs": [
      {
        "question": "How is Trichomonas treated?",
        "answer": "Trichomoniasis is treated with oral nitroimidazole antibiotics (such as metronidazole or tinidazole). Both partners must take the medication at the same time and abstain from sexual contact for 7 days."
      },
      {
        "question": "Can men carry Trichomonas without symptoms?",
        "answer": "Yes. Most men with trichomoniasis have no symptoms at all. However, the parasite resides in the urethra and prostate gland, allowing transmission during intercourse."
      },
      {
        "question": "Can I drink alcohol while taking treatment for Trichomonas?",
        "answer": "No. Metronidazole and tinidazole cause a severe disulfiram-like reaction with alcohol (nausea, violent vomiting, rapid heart rate, flushing). Avoid alcohol during treatment and for at least 48 to 72 hours afterward."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Trichomoniasis Treatment Guidelines",
        "url": "https://www.cdc.gov/std/treatment-guidelines/trichomoniasis.htm"
      },
      {
        "label": "WHO \u2014 Laboratory Diagnosis of Sexually Transmitted Infections",
        "url": "https://www.who.int/"
      }
    ],
    "relatedSlugs": [
      "vaginal-discharge-testing",
      "genital-discharge-and-burning",
      "gonorrhea-chlamydia-pcr",
      "persistent-urethritis-testing"
    ]
  },
  {
    "slug": "persistent-urethritis-testing",
    "priority": "P1",
    "category": "Investigation & Assay",
    "title": "Persistent Urethritis Testing Bangalore | Mycoplasma & Resistance | QXL",
    "seoTitle": "Persistent Urethritis Testing Bangalore | Mycoplasma genitalium PCR | QXL",
    "description": "Advanced diagnostic evaluation for persistent, recurrent, or treatment-resistant urethritis in Bengaluru. Mycoplasma genitalium, Ureaplasma & macrolide resistance testing.",
    "h1": "Persistent & Recurrent Urethritis: Advanced Testing",
    "subtitle": "When standard antibiotics fail to cure burning urination. Investigating Mycoplasma genitalium, Ureaplasma urealyticum, and antibiotic resistance in Bangalore.",
    "badge": "Complex Diagnostics",
    "overview": [
      "Experiencing persistent or recurrent urethral burning, tingling, or clear discharge after completing standard courses of antibiotics (such as azithromycin, doxycycline, or cefixime) is a frustrating and alarming clinical dilemma.",
      "In many cases, this is caused by Mycoplasma genitalium (Mgen), a fastidious bacterium that lacks a cell wall (making beta-lactam antibiotics useless) and has developed widespread resistance to macrolide antibiotics like azithromycin.",
      "Routine urine cultures and standard Chlamydia/Gonorrhea tests cannot detect Mycoplasma or Ureaplasma. Specialized molecular multiplex PCR testing is essential to guide second-line therapies (such as moxifloxacin) and achieve definitive cure."
    ],
    "keyTakeaways": [
      "Mycoplasma genitalium is a leading cause of treatment-resistant urethritis.",
      "M. genitalium lacks a cell wall; penicillins and cephalosporins have zero effect.",
      "Macrolide resistance in M. genitalium exceeds 50% in urban centers.",
      "Extended molecular PCR detects fastidious pathogens that never grow on standard culture media."
    ],
    "investigations": [
      {
        "name": "Mycoplasma genitalium Real-Time PCR",
        "specimen": "First-catch Urine / Urethral Swab",
        "window": "Immediate upon persistent symptoms",
        "tat": "48 Hours",
        "price": "\u20b91,850",
        "clinicalNote": "High-specificity molecular amplification targeting MgPa gene."
      },
      {
        "name": "Extended Urogenital Molecular PCR (7 Pathogens)",
        "specimen": "First-catch Urine",
        "window": "Immediate",
        "tat": "48\u201372 Hours",
        "price": "\u20b94,200",
        "clinicalNote": "Detects M. genitalium, M. hominis, U. urealyticum, U. parvum, Trichomonas, Chlamydia, Gonorrhea."
      },
      {
        "name": "Urine & Semen Aerobic Culture & Sensitivity",
        "specimen": "Urine / Ejaculate",
        "window": "Immediate",
        "tat": "48 Hours",
        "price": "\u20b9850",
        "clinicalNote": "Evaluates conventional bacterial pathogens and antibiotic sensitivities."
      }
    ],
    "faqs": [
      {
        "question": "Why did my first round of antibiotics fail to cure my urethritis?",
        "answer": "Empirical treatment usually targets Chlamydia and Gonorrhea. If your infection is caused by Mycoplasma genitalium or Ureaplasma, or if the bacteria carries antibiotic resistance genes, standard first-line drugs will not eliminate the pathogen."
      },
      {
        "question": "Can Mycoplasma genitalium be grown on a standard culture?",
        "answer": "No. Mycoplasma genitalium is extremely slow-growing and can take months to culture in specialized research laboratories. Diagnostic identification is only feasible using molecular NAAT/PCR."
      },
      {
        "question": "What if all my extended PCR tests are completely negative?",
        "answer": "If all molecular tests are negative, non-infectious causes such as pelvic floor muscle spasm, chronic pelvic pain syndrome (CPPS), chemical irritation, or anxiety-mediated nerve sensitization should be evaluated."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Mycoplasma genitalium Clinical Guidelines",
        "url": "https://www.cdc.gov/std/treatment-guidelines/mycoplasmagentalium.htm"
      },
      {
        "label": "BASHH \u2014 UK National Guideline on the Management of Mycoplasma genitalium",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "genital-discharge-and-burning",
      "uti-vs-sti",
      "other-genital-infections",
      "negative-sti-test-persistent-symptoms"
    ]
  },
  {
    "slug": "other-genital-infections",
    "priority": "P2",
    "category": "Investigation & Assay",
    "title": "Other Genital Infections Bangalore | Ureaplasma, Balanitis & Molluscum | QXL",
    "seoTitle": "Other Genital Infections Bangalore | Ureaplasma, Balanitis, Molluscum | QXL",
    "description": "Clinical diagnosis for lesser-known genital conditions in Bengaluru: Ureaplasma parvum, Mycoplasma hominis, candidal balanitis, molluscum contagiosum & commensal flora.",
    "h1": "Other Genital Infections: Ureaplasma, Balanitis & Molluscum",
    "subtitle": "Differentiating commensal colonization from true pathogens. Evidence-based evaluation of Ureaplasma, non-specific balanoposthitis, and viral molluscum lesions.",
    "badge": "Specialized Assessment",
    "overview": [
      "Not all genital discomfort or unusual lesions fall neatly into standard categories like Gonorrhea, Chlamydia, or Syphilis. A variety of other microbial organisms and viral dermatoses affect the genital region.",
      "Organisms such as Ureaplasma parvum and Mycoplasma hominis frequently colonize the genital tract as harmless commensal flora. Routine treatment is often unnecessary unless high bacterial loads cause clinical urethritis, bacterial vaginosis synergy, or reproductive complications.",
      "Similarly, candidal balanitis (inflammation of the glans penis, common in uncircumcised men or individuals with diabetes) and Molluscum contagiosum (firm, dome-shaped papules with central dimples) require distinct clinical pathways."
    ],
    "keyTakeaways": [
      "Ureaplasma parvum is often normal harmless colonization and does not always require antibiotics.",
      "Candidal balanitis frequently indicates elevated blood sugar or impaired local skin hygiene.",
      "Molluscum contagiosum produces small, pearly, umbilicated papules caused by a poxvirus.",
      "Clinical evaluation prevents overtreatment of harmless genital flora with harsh antibiotics."
    ],
    "investigations": [
      {
        "name": "Mycoplasma & Ureaplasma Speciation PCR",
        "specimen": "Urine / Swab",
        "window": "Immediate",
        "tat": "48 Hours",
        "price": "\u20b92,450",
        "clinicalNote": "Differentiates M. genitalium, M. hominis, U. urealyticum, and U. parvum."
      },
      {
        "name": "Fungal & Bacterial Glans Swab Culture",
        "specimen": "Swab from Prepuce / Glans",
        "window": "Immediate",
        "tat": "48 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Identifies fungal species (Candida) and bacterial colonization."
      },
      {
        "name": "Fasting Blood Glucose & HbA1c",
        "specimen": "Venous Blood",
        "window": "Routine",
        "tat": "4 Hours",
        "price": "\u20b9380",
        "clinicalNote": "Rules out underlying diabetes in patients with recurrent balanitis."
      }
    ],
    "faqs": [
      {
        "question": "Is Ureaplasma an STD?",
        "answer": "Ureaplasma is present in the genital flora of up to 50% of healthy sexually active adults. While it can be sexually transmitted, most international guidelines view Ureaplasma parvum as a commensal organism that does not require treatment unless symptomatic."
      },
      {
        "question": "What causes white patches under the foreskin?",
        "answer": "White curdy patches with red, sore skin on the glans penis usually indicate candidal balanitis (yeast infection). It responds well to topical antifungal creams and improved hygiene."
      },
      {
        "question": "What are tiny bumps with a central dimple on the groin?",
        "answer": "These are classic signs of Molluscum contagiosum, a benign viral skin infection that spreads through skin-to-skin contact. They typically resolve spontaneously over several months or can be treated by a dermatologist."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Genital Mycoplasma and Ureaplasma Considerations",
        "url": "https://www.cdc.gov/std/treatment-guidelines/mycoplasmagentalium.htm"
      },
      {
        "label": "British Association of Sexual Health and HIV \u2014 Guidelines on Balanitis",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "persistent-urethritis-testing",
      "genital-itching-and-irritation",
      "genital-sores-blisters-ulcers",
      "sti-sample-collection"
    ]
  },
  {
    "slug": "sti-sample-collection",
    "priority": "P1",
    "category": "Clinical Consultation & Results",
    "title": "STI Sample Collection Guide Bangalore | Urine, Swab & Blood | QXL",
    "seoTitle": "STI Sample Collection Guide Bangalore | How to Prepare & Collect | QXL",
    "description": "Step-by-step instructions for collecting STI samples: first-catch urine, throat swabs, rectal swabs & blood draws. Essential pre-test guidelines under NABL standards.",
    "h1": "STI Sample Collection Guide: Preparation & Protocols",
    "subtitle": "Accurate lab results start with proper sample collection. Detailed instructions for first-catch urine, self-swabs, and blood draws under ISO 15189:2022 standards.",
    "badge": "Pre-Analytical Quality",
    "overview": [
      "In diagnostic medicine, pre-analytical sample quality dictates diagnostic accuracy. An assay with 99.9% analytical sensitivity will yield a false-negative result if the biological specimen is collected incorrectly.",
      "For sexually transmitted infections, sample collection requires precise protocols: first-catch urine (the very first 20\u201330 mL containing desquamated urethral epithelial cells) is completely different from a standard midstream urine culture.",
      "Similarly, anatomical swabs (throat, rectal, vaginal) must collect cellular mucosal scrapings rather than saliva or fecal matter, and blood serology must follow validated centrifugation and temperature-controlled logistics."
    ],
    "keyTakeaways": [
      "Urine PCR: Hold urine for 1\u20132 hours before collection; collect only the initial 20\u201330 mL stream.",
      "Throat Swab: Do NOT eat, drink, smoke, or use mouthwash for 1 hour prior to collection.",
      "Rectal Swab: Insert swab 2\u20133 cm into anal canal and rotate against mucosal walls for 10\u201315 seconds.",
      "Blood Serology: Fasting is not required for HIV, Syphilis, or Hepatitis blood tests."
    ],
    "investigations": [
      {
        "name": "Laboratory Sample Collection Kit",
        "specimen": "Sterile Specimen Container / Transport Swab",
        "window": "Immediate",
        "tat": "Instant Dispatch",
        "price": "Included",
        "clinicalNote": "Pre-packaged sterile Dacron/flocked swabs and molecular transport media."
      },
      {
        "name": "Discrete Home Sample Collection Service",
        "specimen": "Home Phlebotomy & Swab Assist",
        "window": "Book Slot (6:30 AM \u2013 8:00 PM)",
        "tat": "Same-Day",
        "price": "Free (>\u20b9500)",
        "clinicalNote": "Certified phlebotomist with temperature-controlled cold-chain transport."
      }
    ],
    "faqs": [
      {
        "question": "What is 'first-catch' urine and why is it essential?",
        "answer": "First-catch urine refers to the very first 20 to 30 mL of urine that exits your body. This initial burst flushes out and captures the bacterial DNA shed by mucosal cells lining your urethra. A midstream sample washes these pathogens into the toilet, leading to false negatives."
      },
      {
        "question": "Can I brush my teeth or use mouthwash before a throat swab?",
        "answer": "No. Antiseptic mouthwash kills surface bacteria and dilutes target DNA, potentially causing a false negative. Avoid eating, drinking, brushing, or using mouthwash for at least 1 hour prior to testing."
      },
      {
        "question": "Do I need to fast before an STI blood test?",
        "answer": "No. Routine STI blood tests (HIV, Syphilis, Hepatitis B & C) measure antibodies, antigens, or viral particles, which are unaffected by food or beverage intake."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CLSI \u2014 Collection, Transport, and Processing of Diagnostic Specimens",
        "url": "https://clsi.org/"
      },
      {
        "label": "CDC \u2014 Laboratory Guidance on Specimen Collection for STIs",
        "url": "https://www.cdc.gov/std/laboratory/default.htm"
      }
    ],
    "relatedSlugs": [
      "gonorrhea-chlamydia-pcr",
      "sti-home-sample-collection",
      "uti-vs-sti",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "sti-testing-after-antibiotics",
    "priority": "P2",
    "category": "Clinical Consultation & Results",
    "title": "STI Testing After Antibiotics Bangalore | False Negatives & Timing | QXL",
    "seoTitle": "STI Testing After Taking Antibiotics Bangalore | Test-of-Cure | QXL",
    "description": "When to test for STIs after taking antibiotics. Understand false-negative risks, non-viable dead DNA detection, and recommended test-of-cure intervals in Bengaluru.",
    "h1": "STI Testing After Antibiotics: Timing & Test-of-Cure",
    "subtitle": "Navigating the complexities of testing post-antibiotic therapy. Why testing too early causes false negatives or dead-DNA false positives, and when to re-test.",
    "badge": "Clinical Guidance",
    "overview": [
      "Taking antibiotics\u2014whether appropriately prescribed or self-administered\u2014dramatically alters laboratory diagnostic findings.",
      "Antibiotics rapidly suppress bacterial replication, causing conventional bacterial cultures to become falsely negative within hours. Conversely, highly sensitive Real-Time PCR tests detect microbial DNA fragments, which can persist in dead, non-viable bacterial debris for 3 to 4 weeks after successful cure, leading to false-positive PCR results.",
      "To confirm cure without confusing results, clinical guidelines mandate specific 'test-of-cure' intervals, typically waiting at least 21 to 28 days post-antibiotic completion for Chlamydia and Gonorrhea."
    ],
    "keyTakeaways": [
      "Never test during or immediately after finishing antibiotics.",
      "PCR assays can detect non-viable dead bacterial DNA fragments for up to 4 weeks after cure.",
      "Test-of-cure NAAT should only be performed 3 to 4 weeks post-treatment completion.",
      "For syphilis, cure is confirmed by a fourfold drop in quantitative RPR titer at 6 and 12 months."
    ],
    "investigations": [
      {
        "name": "Test-of-Cure Chlamydia & Gonorrhea NAAT/PCR",
        "specimen": "Urine or Swab",
        "window": "3\u20134 Weeks Post-Antibiotics",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Confirms true bacterial clearance after non-viable DNA has cleared."
      },
      {
        "name": "Quantitative RPR Titer Monitoring",
        "specimen": "Venous Blood",
        "window": "3, 6, and 12 Months Post-Penicillin",
        "tat": "12 Hours",
        "price": "\u20b9450",
        "clinicalNote": "Monitors therapeutic decline in non-treponemal antibody titers."
      }
    ],
    "faqs": [
      {
        "question": "How long after finishing antibiotics should I wait before testing?",
        "answer": "For bacterial STIs like Chlamydia and Gonorrhea, you should wait at least 3 to 4 weeks (21\u201328 days) after finishing your antibiotic course before taking a test-of-cure PCR."
      },
      {
        "question": "Can residual dead bacteria cause a positive PCR test?",
        "answer": "Yes. PCR amplifies DNA whether the organism is alive or dead. After antibiotics kill the bacteria, your body takes several weeks to clear the residual genetic fragments from mucosal cells."
      },
      {
        "question": "What if my symptoms return after finishing antibiotics?",
        "answer": "If symptoms persist or return, you should be evaluated for treatment failure, antibiotic resistance (such as macrolide-resistant Mycoplasma genitalium), or re-infection from an untreated partner."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Guidelines on Test of Cure for Gonococcal and Chlamydial Infections",
        "url": "https://www.cdc.gov/std/treatment-guidelines/default.htm"
      },
      {
        "label": "BASHH \u2014 Clinical Standards for Post-Treatment Follow-up",
        "url": "https://www.bashh.org/"
      }
    ],
    "relatedSlugs": [
      "gonorrhea-chlamydia-pcr",
      "persistent-urethritis-testing",
      "understanding-sti-test-results",
      "syphilis-rpr-tpha-testing"
    ]
  },
  {
    "slug": "negative-sti-test-persistent-symptoms",
    "priority": "P1",
    "category": "Clinical Consultation & Results",
    "title": "Negative STI Test but Persistent Symptoms Bangalore | CPPS & Causes | QXL",
    "seoTitle": "Negative STI Tests but Symptoms Persist Bangalore | CPPS & NGU | QXL",
    "description": "What to do when all STI tests are negative but symptoms like burning, pain or discharge persist. Evaluating Chronic Pelvic Pain Syndrome (CPPS), pelvic floor dysfunction & non-infectious causes.",
    "h1": "Negative STI Tests but Persistent Symptoms: What Next?",
    "subtitle": "Navigating unexplained burning, pelvic ache, and irritation after repeated negative lab results. Differentiating infectious resistance from non-infectious pelvic syndromes.",
    "badge": "Specialist Pathway",
    "overview": [
      "One of the most distressing clinical experiences is having ongoing symptoms\u2014such as urethral burning, genital irritation, testicular ache, or pelvic heaviness\u2014while every laboratory test returns completely negative.",
      "When high-sensitivity PCR and serological panels repeatedly show no evidence of infection, the cause is frequently non-infectious. In men, up to 90% of chronic prostatitis cases are non-bacterial, classified as Chronic Pelvic Pain Syndrome (CPPS) or chronic non-inflammatory pelvic floor dysfunction.",
      "Similarly, hypertonic pelvic floor muscle spasms, dermatological hypersensitivity, chemical contact dermatitis, and central nervous system pain sensitization can produce real, chronic physical discomfort that mimics an active STI."
    ],
    "keyTakeaways": [
      "Repeated negative molecular PCR tests reliably exclude active bacterial and viral STIs.",
      "Non-infectious conditions like CPPS and pelvic floor hypertonicity cause real physical pain.",
      "Anxiety and hyper-focus on genital sensations significantly amplify pain signals via neurogenic pathways.",
      "Consultation with a urologist, pelvic physical therapist, or dermatologist is the recommended next step."
    ],
    "investigations": [
      {
        "name": "Comprehensive Molecular Exclusion Profile",
        "specimen": "First-catch Urine & Blood",
        "window": "Immediate",
        "tat": "48 Hours",
        "price": "\u20b93,999",
        "clinicalNote": "Broad multiplex PCR (7 pathogens) plus complete blood serology."
      },
      {
        "name": "Semen Culture & Fractional Urinalysis (Meares-Stamey)",
        "specimen": "Fractional Urine & Ejaculate",
        "window": "Immediate",
        "tat": "48\u201372 Hours",
        "price": "\u20b91,250",
        "clinicalNote": "Excludes occult deep prostatic bacterial colonization."
      }
    ],
    "faqs": [
      {
        "question": "Can I have an STI that tests cannot detect?",
        "answer": "Modern molecular Real-Time PCR and chemiluminescent serology have analytical sensitivities exceeding 99%. If comprehensive testing conducted outside the window period is repeatedly negative, it is virtually impossible that a standard STI is causing your symptoms."
      },
      {
        "question": "What is Chronic Pelvic Pain Syndrome (CPPS)?",
        "answer": "CPPS is a chronic neuromuscular pain syndrome involving pelvic floor muscle spasm, nerve irritation, and inflammation around the bladder and prostate without any active bacterial infection."
      },
      {
        "question": "How can pelvic floor dysfunction cause burning urination?",
        "answer": "Tense, chronically spasmed pelvic floor muscles pinch the pudendal nerve and compress the urethral sphincter, creating a sensation of burning, incomplete bladder emptying, or tip-of-penis discomfort."
      }
    ],
    "clinicalReferences": [
      {
        "label": "European Association of Urology (EAU) \u2014 Guidelines on Chronic Pelvic Pain",
        "url": "https://uroweb.org/guidelines/chronic-pelvic-pain"
      },
      {
        "label": "National Institutes of Health (NIH) \u2014 Chronic Prostatitis Diagnostic Classification",
        "url": "https://www.nih.gov/"
      }
    ],
    "relatedSlugs": [
      "persistent-urethritis-testing",
      "hiv-symptoms-and-anxiety",
      "understanding-sti-test-results",
      "uti-vs-sti"
    ]
  },
  {
    "slug": "understanding-sti-test-results",
    "priority": "P1",
    "category": "Clinical Consultation & Results",
    "title": "Understanding STI Test Results Bangalore | Non-Reactive & Titers | QXL",
    "seoTitle": "Understanding STI Test Results | Non-Reactive, Reactive, Titers | QXL",
    "description": "How to read and understand STI lab reports in Bengaluru. Deciphering non-reactive, reactive, equivocal, antibody titers, and PCR 'Not Detected' results under NABL standards.",
    "h1": "How to Read & Understand Your STI Test Results",
    "subtitle": "Clear, physician-led explanations of diagnostic terminology. What 'Non-Reactive', 'Cutoff Ratios', 'Titers', and 'DNA Not Detected' mean for your health.",
    "badge": "Patient Education",
    "overview": [
      "Receiving a laboratory report containing unfamiliar medical jargon, mathematical ratios, and technical reference intervals can be confusing and intimidating.",
      "Understanding the fundamental difference between qualitative serology ('Non-Reactive' vs 'Reactive'), quantitative antibody titers (such as RPR 1:16), and molecular genetic reporting ('Target DNA Not Detected') allows you to interpret your results accurately.",
      "At QXL Diagnostics, all results are validated by qualified laboratory specialists under ISO 15189:2022 standards. We provide clear, confidential report explanations to help you understand your clinical status."
    ],
    "keyTakeaways": [
      "'Non-Reactive' or 'Not Detected' means no target antibody, antigen, or DNA was found above detection thresholds.",
      "'Reactive' on a screening test indicates detection but requires confirmatory protocol testing.",
      "'Equivocal' or 'Borderline' falls in the gray zone, requiring a repeat test in 2 to 4 weeks.",
      "Antibody titers (e.g. 1:8) measure antibody strength and are used to monitor syphilis treatment."
    ],
    "investigations": [
      {
        "name": "Post-Test Clinical Consultation",
        "specimen": "Report Review",
        "window": "Immediate Post-Report",
        "tat": "Same-Day",
        "price": "Included",
        "clinicalNote": "Medical review and explanation of laboratory findings by qualified biochemists/pathologists."
      },
      {
        "name": "Confirmatory Supplemental Panel",
        "specimen": "Venous Blood / Swab",
        "window": "Reflex upon reactive screen",
        "tat": "24\u201348 Hours",
        "price": "Variable",
        "clinicalNote": "Secondary independent assay to rule out false-positive screening results."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between 'Negative' and 'Non-Reactive'?",
        "answer": "They mean the same thing clinically. 'Non-Reactive' is the precise laboratory terminology indicating that your blood sample showed no immune reactivity to the target antigen or antibody."
      },
      {
        "question": "What does a Cutoff Index (S/CO) number mean?",
        "answer": "Chemiluminescent analyzers calculate a Signal-to-Cutoff ratio (S/CO). A value below 1.0 is Non-Reactive (Negative). For example, 0.12 or 0.25 is completely negative and within normal baseline."
      },
      {
        "question": "Does a positive screening test always mean I have the disease?",
        "answer": "Not necessarily. Screening tests are engineered to be hyper-sensitive to catch every possible case, which occasionally produces false positives. International guidelines mandate a second, independent confirmatory test before a diagnosis is finalized."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CLSI \u2014 User Protocol for Evaluation of Qualitative Test Performance",
        "url": "https://clsi.org/"
      },
      {
        "label": "CDC \u2014 Laboratory Reporting Standards for Sexually Transmitted Infections",
        "url": "https://www.cdc.gov/std/laboratory/default.htm"
      }
    ],
    "relatedSlugs": [
      "syphilis-rpr-tpha-testing",
      "sti-testing-window-periods",
      "negative-sti-test-persistent-symptoms",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "couples-sti-screening",
    "priority": "P2",
    "category": "Access, Pricing & Care",
    "title": "Couples STI Screening Bangalore | Pre-Marital & Relationship Panel | QXL",
    "seoTitle": "Couples STI Screening Bangalore | Pre-Marital Health Packages | QXL",
    "description": "Comprehensive pre-marital and new relationship STI screening for couples in Bengaluru. Synchronous dual testing, window period planning & mutual reproductive peace of mind.",
    "h1": "Couples STI Screening: Pre-Marital & Relationship Panels",
    "subtitle": "Building intimate partnerships on mutual trust and transparent clinical health. Pre-marital and relationship screening panels for couples in Bangalore.",
    "badge": "Relationship Health",
    "overview": [
      "Entering a new relationship, preparing for marriage, or deciding to discontinue barrier protection (condoms) is an important relationship milestone. Proactively screening together ensures both partners protect each other and their future reproductive health.",
      "Because many sexually transmitted infections\u2014including Chlamydia, Gonorrhea, high-risk HPV, and Hepatitis B\u2014remain completely asymptomatic for years, past relationships can leave unrecognized dormant infections.",
      "Couples screening at QXL Diagnostics provides a supportive, confidential, non-judgmental environment. Both partners undergo synchronized testing with identical high-sensitivity panels, establishing a clear baseline."
    ],
    "keyTakeaways": [
      "Mutual screening removes suspicion and establishes transparent relationship health.",
      "Dormant, asymptomatic infections from years past can be identified and cured before causing harm.",
      "Pre-marital panels also assess Hepatitis B vaccination status and Thalassemia carrier traits.",
      "Both partners should be tested before deciding to stop using barrier protection."
    ],
    "investigations": [
      {
        "name": "Couples Pre-Marital Comprehensive Panel",
        "specimen": "Blood & First-catch Urine (Dual Partner)",
        "window": "Pre-Wedding / Relationship Start",
        "tat": "24\u201348 Hours",
        "price": "\u20b94,800 (Couple)",
        "clinicalNote": "HIV 4th Gen Duo, Syphilis RPR/TPHA, Hepatitis B Triple, HCV, and Chlamydia/Gonorrhea PCR."
      },
      {
        "name": "Pre-Marital Genetic & Hematology Add-on",
        "specimen": "Whole Blood (EDTA)",
        "window": "Pre-Marital",
        "tat": "24 Hours",
        "price": "\u20b91,600 (Couple)",
        "clinicalNote": "Complete Blood Count, HbA1c, and HPLC Hemoglobin Variant / Thalassemia Screen."
      }
    ],
    "faqs": [
      {
        "question": "Should both partners test at the exact same time?",
        "answer": "Yes. Synchronous testing ensures that both individuals establish a clean, verified baseline together, preventing cyclical transmission or unaddressed exposure gaps."
      },
      {
        "question": "Can an STI show up from a relationship years ago?",
        "answer": "Yes. Viral infections like HPV, Herpes, and Hepatitis B, as well as bacterial infections like Chlamydia or Syphilis, can lie dormant and asymptomatic in the body for years before being detected."
      },
      {
        "question": "Can we arrange confidential home collection together?",
        "answer": "Yes. QXL Diagnostics provides discreet home collection visits where a trained phlebotomist visits your residence to collect samples for both partners simultaneously."
      }
    ],
    "clinicalReferences": [
      {
        "label": "WHO \u2014 Pre-Marital and Couple Screening Guidance",
        "url": "https://www.who.int/"
      },
      {
        "label": "ACOG \u2014 Preconception and Relationship Health Counseling",
        "url": "https://www.acog.org/"
      }
    ],
    "relatedSlugs": [
      "asymptomatic-sti-screening",
      "sti-and-fertility",
      "pregnancy-and-sti-testing",
      "confidential-sti-testing-bangalore"
    ]
  },
  {
    "slug": "pregnancy-and-sti-testing",
    "priority": "P1",
    "category": "Access, Pricing & Care",
    "title": "Pregnancy & STI Testing Bangalore | Antenatal Screening Panels | QXL",
    "seoTitle": "Pregnancy STI Testing Bangalore | Antenatal Infection Screen | QXL",
    "description": "Essential antenatal STI screening during pregnancy in Bengaluru. Preventing mother-to-child vertical transmission of HIV, Syphilis, Hepatitis B & Chlamydia.",
    "h1": "Pregnancy & STI Testing: Protecting Mother & Baby",
    "subtitle": "Comprehensive antenatal screening to eliminate vertical transmission. Protecting maternal health, pregnancy viability, and neonatal development in Bangalore.",
    "badge": "Maternal-Fetal Health",
    "overview": [
      "Screening for sexually transmitted infections is an indispensable component of comprehensive antenatal care. Undiagnosed STIs pose severe risks to fetal development, pregnancy viability, and neonatal survival.",
      "Mother-to-child transmission (MTCT) can occur transplacentally during pregnancy (such as Congenital Syphilis or HIV), during labor and delivery through infected birth canals (such as Hepatitis B, Gonorrhea, and Chlamydia causing neonatal ophthalmia and pneumonia), or postpartum via breast milk.",
      "Fortunately, with timely laboratory screening in the first trimester, highly effective medical interventions (such as maternal penicillin for syphilis, antiretrovirals for HIV, and neonatal immunoglobulin/vaccination for Hepatitis B) prevent vertical transmission in over 98% of cases."
    ],
    "keyTakeaways": [
      "All pregnant women should undergo routine first-trimester screening for HIV, Syphilis, and Hepatitis B.",
      "Congenital Syphilis is 100% preventable with timely maternal penicillin treatment.",
      "Hepatitis B birth-dose vaccination and immunoglobulin prevent vertical HBV transmission.",
      "Chlamydia and Gonorrhea screening prevents premature labor, low birth weight, and neonatal blindness."
    ],
    "investigations": [
      {
        "name": "First-Trimester Antenatal STI Profile",
        "specimen": "Venous Blood & Urine",
        "window": "Weeks 8\u201312 of Pregnancy",
        "tat": "24 Hours",
        "price": "\u20b92,100",
        "clinicalNote": "Includes HIV 4th Gen Duo, Syphilis RPR/VDRL with TPHA, HBsAg, Anti-HCV, and Urine Culture."
      },
      {
        "name": "Third-Trimester Repeat Screening Screen",
        "specimen": "Venous Blood",
        "window": "Weeks 28\u201332 of Pregnancy",
        "tat": "12 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Repeat HIV and Syphilis serology to catch third-trimester seroconversion."
      }
    ],
    "faqs": [
      {
        "question": "Can STIs be safely treated during pregnancy?",
        "answer": "Yes. Safe, pregnancy-approved antibiotics (such as penicillin for syphilis, and azithromycin/erythromycin for chlamydia) are available that effectively cure infections without harming the developing fetus."
      },
      {
        "question": "What is Congenital Syphilis?",
        "answer": "Congenital syphilis occurs when Treponema pallidum crosses the placenta to infect the fetus, leading to miscarriage, stillbirth, or severe neonatal skeletal and neurological deformities. It is completely preventable with early maternal penicillin."
      },
      {
        "question": "How is Hepatitis B prevented in the newborn?",
        "answer": "If a mother is HBsAg-positive, giving the newborn the Hepatitis B vaccine and Hepatitis B Immune Globulin (HBIG) within 12 hours of birth reduces the risk of transmission from >90% down to less than 2%."
      }
    ],
    "clinicalReferences": [
      {
        "label": "ACOG \u2014 Guidelines on Routine Antenatal STI Screening",
        "url": "https://www.acog.org/"
      },
      {
        "label": "CDC \u2014 Prevention of Mother-to-Child Transmission (PMTCT)",
        "url": "https://www.cdc.gov/nchhstp/pmtct/default.htm"
      }
    ],
    "relatedSlugs": [
      "couples-sti-screening",
      "sti-and-fertility",
      "syphilis-rpr-tpha-testing",
      "hepatitis-b-triple-panel"
    ]
  },
  {
    "slug": "sti-and-fertility",
    "priority": "P2",
    "category": "Access, Pricing & Care",
    "title": "STIs & Infertility Bangalore | Tubal Scarring & Sperm Health | QXL",
    "seoTitle": "STIs & Fertility Impact Bangalore | Fallopian Tubes & Sperm Health | QXL",
    "description": "How untreated STIs cause female and male infertility in Bengaluru. Understand Pelvic Inflammatory Disease (PID), fallopian tube scarring & sperm quality impairment.",
    "h1": "STIs & Infertility: Protecting Reproductive Potential",
    "subtitle": "How silent, untreated infections impact fallopian tubes, ovaries, and sperm parameters. Early molecular detection to preserve reproductive health in Bangalore.",
    "badge": "Reproductive Endocrinology",
    "overview": [
      "Sexually transmitted infections are one of the leading preventable causes of involuntary infertility worldwide. Because infections like Chlamydia and Gonorrhea often cause zero immediate symptoms, they can silently ascend into the upper reproductive tract.",
      "In women, untreated chlamydia or gonorrhea can cause Pelvic Inflammatory Disease (PID). PID causes subclinical scarring and adhesions of the delicate fallopian tube cilia, leading to tubal occlusion, hydrosalpinx, chronic pelvic pain, and up to a sixfold increase in life-threatening ectopic pregnancies.",
      "In men, persistent urethritis can ascend to cause epididymo-orchitis, leading to epididymal obstruction, leukocytospermia (pus cells in semen), elevated oxidative stress, and impaired sperm motility and DNA fragmentation."
    ],
    "keyTakeaways": [
      "A single episode of untreated Pelvic Inflammatory Disease (PID) causes tubal infertility in up to 12% of women.",
      "Silent chlamydia is the leading cause of preventable fallopian tube blockages.",
      "In men, ascending infection causes epididymitis and impaired sperm motility.",
      "Early molecular PCR screening and prompt antibiotic treatment completely prevent reproductive scarring."
    ],
    "investigations": [
      {
        "name": "Tubal Risk Molecular PCR Screen (Chlamydia + Gonorrhea)",
        "specimen": "Vaginal Swab or First-catch Urine",
        "window": "Preconception / Post-Exposure",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Molecular assay detecting silent ascending pathogens."
      },
      {
        "name": "Semen Analysis with Leucocyte Count (Endocervical/Seminal)",
        "specimen": "Ejaculate (2\u20135 Days Abstinence)",
        "window": "Diagnostic",
        "tat": "24 Hours",
        "price": "\u20b9550",
        "clinicalNote": "Evaluates sperm count, motility, morphology, and inflammatory pus cells (pyospermia)."
      },
      {
        "name": "Anti-M\u00fcllerian Hormone (AMH) Ovarian Reserve",
        "specimen": "Venous Blood",
        "window": "Any Cycle Day",
        "tat": "12 Hours",
        "price": "\u20b91,650",
        "clinicalNote": "Evaluates quantitative egg reserve."
      }
    ],
    "faqs": [
      {
        "question": "Can chlamydia cause infertility even if I never felt sick?",
        "answer": "Yes. Chlamydia is notorious for causing 'subclinical' or 'silent' Pelvic Inflammatory Disease. The bacteria quietly inflame the fallopian tubes, causing microscopic scarring without you ever having fever or pain."
      },
      {
        "question": "How do STIs affect male fertility?",
        "answer": "Ascending bacterial infections cause inflammation of the epididymis and prostate, releasing white blood cells (leukocytes) into semen. This creates reactive oxygen species that damage sperm membranes, lower motility, and cause DNA fragmentation."
      },
      {
        "question": "Can tubal damage be reversed once it occurs?",
        "answer": "While antibiotics cure the active bacterial infection, they cannot dissolve existing fibrous scar tissue. Tubal scarring often requires surgical tubal recanalization or in vitro fertilization (IVF), which is why early screening is vital."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 Pelvic Inflammatory Disease (PID) Facts & Infertility",
        "url": "https://www.cdc.gov/std/pid/stdfact-pid.htm"
      },
      {
        "label": "American Society for Reproductive Medicine (ASRM) \u2014 Role of STIs in Infertility",
        "url": "https://www.asrm.org/"
      }
    ],
    "relatedSlugs": [
      "asymptomatic-sti-screening",
      "couples-sti-screening",
      "gonorrhea-chlamydia-pcr",
      "pregnancy-and-sti-testing"
    ]
  },
  {
    "slug": "urgent-medical-support",
    "priority": "P0",
    "category": "Exposure & Emergency",
    "title": "Urgent Sexual Health Support Bangalore | Emergency PEP & Triage | QXL",
    "seoTitle": "Urgent Sexual Health Support Bangalore | 24/7 Emergency Helpline | QXL",
    "description": "Urgent medical support and emergency triage for acute sexual health concerns in Bengaluru. 72-hour PEP guidance, acute testicular pain, emergency referrals & crisis helpline.",
    "h1": "Urgent Sexual Health Support & Emergency Triage in Bangalore",
    "subtitle": "Immediate clinical triage for acute exposures and severe symptoms. Understanding the 72-hour PEP window, acute urological red flags, and confidential helpline support.",
    "badge": "Emergency Triage",
    "showPepBanner": true,
    "emergencyNotice": {
      "title": "Acute Medical Red Flags",
      "text": "If you are experiencing sudden severe testicular pain, high fever (>38.5\u00b0C) with rigid pelvic pain, or potential HIV exposure within 72 hours, do not delay. Call our medical helpline or visit an emergency room immediately.",
      "badge": "Emergency Action"
    },
    "overview": [
      "Certain sexual health situations represent acute medical emergencies where delay can have irreversible consequences for your health, fertility, or life.",
      "The two most critical time-sensitive scenarios are: (1) Potential HIV exposure occurring within the past 72 hours, which requires immediate evaluation for Post-Exposure Prophylaxis (PEP), and (2) Sudden, severe, unilateral testicular pain or swelling, which must be evaluated within 6 hours by a urologist to rule out surgical testicular torsion.",
      "QXL Diagnostics provides immediate guidance through our direct medical helpline (+91 9964 639 639), expedited STAT baseline laboratory testing, and seamless referral pathways across Bengaluru."
    ],
    "keyTakeaways": [
      "HIV PEP is most effective when started within 24 hours and is ineffective after 72 hours.",
      "Sudden severe testicular pain is a surgical emergency requiring hospital evaluation within 6 hours.",
      "Severe pelvic pain with high fever and discharge warrants urgent gynecological evaluation for acute PID.",
      "Call our dedicated diagnostic support helpline: +91 9964 639 639."
    ],
    "investigations": [
      {
        "name": "STAT Emergency Baseline Panel",
        "specimen": "Venous Blood",
        "window": "Immediate (0\u201372 Hours)",
        "tat": "2\u20134 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Expedited processing for HIV 4th Gen Duo, Serum Creatinine, eGFR, and HBsAg."
      },
      {
        "name": "Stat Complete Blood Count & CRP",
        "specimen": "Venous Blood",
        "window": "Immediate",
        "tat": "2 Hours",
        "price": "\u20b9550",
        "clinicalNote": "Immediate markers of acute systemic bacterial or inflammatory infection."
      }
    ],
    "faqs": [
      {
        "question": "What should I do right now if a condom broke with a high-risk partner?",
        "answer": "Do not panic, but act immediately. If the encounter occurred within the last 72 hours, visit a hospital emergency department or sexual health specialist to start a 28-day course of PEP. Do not wait for lab test results."
      },
      {
        "question": "Why is testicular pain considered an emergency?",
        "answer": "Sudden, severe testicular pain may be caused by testicular torsion (twisting of the spermatic cord cutting off blood supply), which requires emergency surgical detorsion within 6 hours to prevent permanent loss of the testicle."
      },
      {
        "question": "Where can I reach the QXL clinical team?",
        "answer": "You can contact our clinical helpline directly at +91 9964 639 639 or connect via our confidential WhatsApp portal for immediate test guidance."
      }
    ],
    "clinicalReferences": [
      {
        "label": "WHO \u2014 Post-Exposure Prophylaxis to Prevent HIV",
        "url": "https://www.who.int/publications/i/item/9789241549011"
      },
      {
        "label": "American Urological Association (AUA) \u2014 Acute Scrotal Pain Emergency Guidelines",
        "url": "https://www.auanet.org/"
      }
    ],
    "relatedSlugs": [
      "hiv-pep-prep-testing",
      "condom-break-sti-testing",
      "confidential-sti-testing-bangalore",
      "sti-testing-window-periods"
    ]
  },
  {
    "slug": "confidential-sti-testing-bangalore",
    "priority": "P0",
    "category": "Access, Pricing & Care",
    "title": "Confidential STI Testing Bangalore | Barcode Privacy | QXL",
    "seoTitle": "Confidential STI Testing in Bangalore | Discreet Home Collection | QXL",
    "description": "Completely confidential, non-judgmental STI testing in Bengaluru. Barcode-anonymized samples, discreet home collection, encrypted PDF reports under NABL standards.",
    "h1": "Confidential STI & Sexual Health Testing in Bangalore",
    "subtitle": "Non-judgemental care, privacy safeguards and encrypted report delivery. How QXL Diagnostics protects your identity, personal information, and diagnostic results under ISO 15189:2022.",
    "badge": "Confidential Testing",
    "overview": [
      "We recognize that fear of stigma, embarrassment, or concerns about privacy are the single greatest barriers preventing individuals from seeking timely sexual health diagnostics.",
      "At QXL Diagnostics, patient confidentiality is built into every layer of our laboratory workflow. From numeric barcode registration that strips personal identifying details from sample tubes to plain-clothes phlebotomy specialists who arrive at your doorstep in unmarked transport, your privacy is safeguarded.",
      "All diagnostic reports are password-protected, encrypted with enterprise-grade security, and transmitted directly to your personal WhatsApp or secure email portal. Our team does not name the test during telephone confirmations."
    ],
    "keyTakeaways": [
      "Barcoded samples: Laboratory technicians process samples identified only by alphanumeric barcodes.",
      "Plain-clothes home collection: Phlebotomists arrive discreetly without branded lab coats if requested.",
      "Encrypted delivery: Password-protected PDF reports sent directly to your private phone or email.",
      "Zero third-party disclosure: Results are never shared with family, employers, or insurance without explicit consent."
    ],
    "investigations": [
      {
        "name": "Confidential Full Body & Sexual Health Profile",
        "specimen": "Blood & Urine",
        "window": "Routine / Post-Window",
        "tat": "24 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Comprehensive anonymized screening covering major viral and bacterial pathogens."
      },
      {
        "name": "Discrete Home Phlebotomy Visit",
        "specimen": "Home Blood & Urine Collection",
        "window": "Scheduled Slot",
        "tat": "Same-Day",
        "price": "Free (>\u20b9500)",
        "clinicalNote": "Plain-clothes phlebotomy option with tamper-evident transport bags."
      }
    ],
    "faqs": [
      {
        "question": "Will anyone find out I booked an STI test?",
        "answer": "No. Our scheduling and reporting systems are strictly confidential. We never mention test names during phone verifications, and your report is sent only to your verified personal contact details."
      },
      {
        "question": "Does my name appear on the sample tubes?",
        "answer": "Inside our automated laboratory, samples are identified and processed via unique alphanumeric barcodes to ensure complete privacy across analytical instrumentation."
      },
      {
        "question": "Can I have home collection done without neighbors noticing?",
        "answer": "Yes. Our trained phlebotomy specialists arrive in casual attire with unmarked, temperature-controlled transport bags, ensuring complete residential privacy."
      }
    ],
    "clinicalReferences": [
      {
        "label": "DISHA \u2014 Digital Information Security in Healthcare Guidelines (India)",
        "url": "https://www.mohfw.gov.in/"
      },
      {
        "label": "ISO 15189:2022 \u2014 Medical Laboratories: Requirements for Quality and Competence",
        "url": "https://www.iso.org/"
      }
    ],
    "relatedSlugs": [
      "sti-home-sample-collection",
      "sti-test-cost-bangalore",
      "inclusive-sexual-health-testing",
      "asymptomatic-sti-screening"
    ]
  },
  {
    "slug": "sti-test-cost-bangalore",
    "priority": "P0",
    "category": "Access, Pricing & Care",
    "title": "STI Test Cost Bangalore | 2026 Transparent Price Catalogue | QXL",
    "seoTitle": "STI Test Cost Bangalore | 2026 Transparent Price Catalogue | QXL",
    "description": "Complete 2026 price list for STI testing in Bengaluru. Individual test costs (HIV \u20b9945, PCR \u20b91,999, Syphilis \u20b9750) and discounted comprehensive packages. No hidden fees.",
    "h1": "STI Test Cost in Bangalore: Complete 2026 Price Catalogue",
    "subtitle": "100% transparent diagnostic pricing. From individual automated assays to comprehensive multi-pathogen screening packages across our NABL-accredited Bangalore laboratories.",
    "badge": "Pricing Transparency",
    "overview": [
      "Diagnostic pricing should never be ambiguous or concealed behind vague inquiry forms. At QXL Diagnostics, we publish transparent, fixed prices for all individual tests and bundled sexual health profiles.",
      "Whether you need an individual 4th-generation HIV Duo test, an extragenital throat swab NAAT, or an all-inclusive 10-pathogen screening package, our prices reflect high-throughput automation on advanced analyzers without inflated hospital markups.",
      "Home sample collection is completely free across 60+ Bengaluru localities for bookings above \u20b9500, with zero hidden phlebotomy or processing surcharges."
    ],
    "keyTakeaways": [
      "HIV 4th Gen Duo (p24 Ag + Ab ECLIA): \u20b9945 (Same-day digital report).",
      "Chlamydia & Gonorrhea Dual Real-Time PCR: \u20b91,999 (First-catch urine or swab).",
      "Syphilis Dual Serology (RPR Titer + TPHA): \u20b9750.",
      "Hepatitis B Triple Panel (HBsAg, Anti-HBs, Anti-HBc): \u20b91,250.",
      "Zero home collection fees across Bengaluru for orders above \u20b9500."
    ],
    "investigations": [
      {
        "name": "HIV 1/2 4th Gen Duo (p24 Ag + Ab)",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b9945",
        "clinicalNote": "Chemiluminescent immunoassay under NABL NABLM1126KA10694."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Non-treponemal quantitative titer and treponemal confirmation."
      },
      {
        "name": "Chlamydia & Gonorrhea Dual NAAT/PCR",
        "specimen": "Urine or Swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b91,999",
        "clinicalNote": "Automated molecular amplification assay."
      },
      {
        "name": "Hepatitis B Triple Panel",
        "specimen": "Venous Blood",
        "window": "30\u201360 Days",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,250",
        "clinicalNote": "HBsAg, Anti-HBs, and Total Anti-HBc."
      },
      {
        "name": "Essential STI Screening Package",
        "specimen": "Blood & Urine",
        "window": "Comprehensive",
        "tat": "24\u201348 Hours",
        "price": "\u20b92,499",
        "clinicalNote": "Covers HIV 4th Gen, Syphilis, HBV, and Chlamydia/Gonorrhea PCR (MRP \u20b94,900)."
      },
      {
        "name": "Triple STI PCR Screen",
        "specimen": "Urine or Swab",
        "window": "14 Days",
        "tat": "24\u201348 Hours",
        "price": "\u20b93,499",
        "clinicalNote": "Chlamydia, Gonorrhea, and Trichomonas molecular NAAT."
      }
    ],
    "faqs": [
      {
        "question": "Are there extra charges for home sample collection in Bangalore?",
        "answer": "No. For all diagnostic orders above \u20b9500, home sample collection by our trained phlebotomy specialists is completely free across all mapped Bengaluru pin codes."
      },
      {
        "question": "Why are molecular PCR tests more expensive than blood serology?",
        "answer": "Molecular Real-Time PCR tests require sophisticated thermocyclers, specialized DNA extraction reagents, and controlled cleanroom environments to amplify microbial genetic sequences with 99.9% specificity."
      },
      {
        "question": "Can I select only specific individual tests instead of a full package?",
        "answer": "Yes! You can order any individual investigation (such as only an HIV 4th Gen Duo for \u20b9945 or only a Syphilis test for \u20b9750) based on your specific clinical needs."
      }
    ],
    "clinicalReferences": [
      {
        "label": "NABL \u2014 National Accreditation Board for Testing and Calibration Laboratories (NABLM1126KA10694)",
        "url": "https://www.nabl-india.org/"
      },
      {
        "label": "QXL Diagnostics \u2014 Master Commercial Test Catalogue",
        "url": "https://qxldiagnostics.com/test-directory"
      }
    ],
    "relatedSlugs": [
      "confidential-sti-testing-bangalore",
      "sti-home-sample-collection",
      "gonorrhea-chlamydia-pcr",
      "hiv-testing-after-exposure"
    ]
  },
  {
    "slug": "sti-home-sample-collection",
    "priority": "P1",
    "category": "Access, Pricing & Care",
    "title": "STI Home Sample Collection Bangalore | Discreet & Safe | QXL",
    "seoTitle": "STI Home Sample Collection Bangalore | Certified Phlebotomy | QXL",
    "description": "Safe, confidential home sample collection for STI tests across 60+ Bengaluru localities. Trained phlebotomists, temperature-controlled cold chain, plain-clothes option.",
    "h1": "Discreet STI Home Sample Collection in Bangalore",
    "subtitle": "Professional diagnostic phlebotomy and sample collection in the comfort and privacy of your home. Covering 60+ Bengaluru localities with cold-chain sample logistics.",
    "badge": "Service Delivery",
    "overview": [
      "We understand that visiting a diagnostic laboratory or clinic for sexual health testing can feel stressful or inconvenient. Our dedicated home sample collection service brings accredited laboratory care directly to your residence.",
      "Our certified, trained phlebotomy specialists operate with strict clinical rigor: using single-use vacuum collection needles, observing antiseptic skin preparation, and transporting specimens in validated 2\u00b0C\u20138\u00b0C cold-chain transport boxes to preserve sample stability across Bengaluru traffic.",
      "Collections can be booked from 6:30 AM to 8:00 PM across Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, Kengeri, Yelahanka, Electronic City, and over 50 additional localities."
    ],
    "keyTakeaways": [
      "Operating across 60+ Bengaluru localities from 6:30 AM to 8:00 PM.",
      "Strict 2\u00b0C\u20138\u00b0C cold-chain transport ensures specimen integrity for sensitive molecular assays.",
      "Trained phlebotomy specialists adhere to single-use sterile vacuum protocols.",
      "Discreet service: plain-clothes arrival available upon request for residential privacy."
    ],
    "investigations": [
      {
        "name": "Home Blood Draw & Specimen Logistics",
        "specimen": "Venous Blood / Urine Assist",
        "window": "Book Slot Online / WhatsApp",
        "tat": "Prompt Dispatch",
        "price": "Free (>\u20b9500)",
        "clinicalNote": "Certified phlebotomist, BD Vacutainer needle safety, cold-chain transport."
      },
      {
        "name": "Self-Swab Assistance Kit",
        "specimen": "Vaginal / Rectal / Pharyngeal Swab",
        "window": "Delivered to Doorstep",
        "tat": "Immediate",
        "price": "Included",
        "clinicalNote": "Pre-packaged transport tubes with simple visual collection instructions."
      }
    ],
    "faqs": [
      {
        "question": "How do I collect a urine sample during a home visit?",
        "answer": "Our phlebotomist brings a sterile specimen container. You will be asked to provide the first 20\u201330 mL of urine in your private bathroom (holding your urine 1\u20132 hours prior) and hand the sealed cup to the specialist."
      },
      {
        "question": "How are samples kept cold during transit in Bangalore traffic?",
        "answer": "All specimens are placed in insulated biological transport boxes equipped with calibrated gel ice packs, maintaining strict 2\u00b0C\u20138\u00b0C temperatures until arrival at our central processing lab."
      },
      {
        "question": "Can I book a slot early in the morning before going to work?",
        "answer": "Yes! We offer early morning collection slots starting from 6:30 AM, allowing you to complete your sample collection comfortably before your workday begins."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CLSI \u2014 Procedures for the Collection of Diagnostic Blood Specimens by Venipuncture",
        "url": "https://clsi.org/"
      },
      {
        "label": "QXL Diagnostics \u2014 Bengaluru Serviceability & Localities Directory",
        "url": "https://qxldiagnostics.com/home-collection-areas"
      }
    ],
    "relatedSlugs": [
      "confidential-sti-testing-bangalore",
      "sti-test-cost-bangalore",
      "sti-sample-collection",
      "asymptomatic-sti-screening"
    ]
  },
  {
    "slug": "sti-risk-kissing-and-genital-contact",
    "priority": "P2",
    "category": "Exposure & Emergency",
    "title": "STI Risk from Kissing & Genital Contact | Frottage & Skin | QXL",
    "seoTitle": "STI Risk from Kissing & Genital Contact Bangalore | Frottage Facts | QXL",
    "description": "Evidence-based transmission risks for non-penetrative sex: deep kissing, genital rubbing (frottage), and skin-to-skin intimate contact. When testing is indicated.",
    "h1": "STI Risk from Kissing, Genital Rubbing & Skin Contact",
    "subtitle": "Clinical reality vs panic. Understanding the transmission risks of non-penetrative intimacy, deep french kissing, skin-to-skin contact, and frottage in Bangalore.",
    "badge": "Transmission Science",
    "overview": [
      "Patients frequently experience significant anxiety after non-penetrative sexual encounters, such as passionate deep kissing, mutual masturbation, genital rubbing without penetration ('dry humping' or frottage), or oral-to-breast contact.",
      "From an infectious disease perspective, these activities carry vastly different risk profiles compared to unbarriered penetrative sex. Deep kissing carries virtually ZERO risk of HIV transmission (saliva contains viral inhibitors and insufficient viral particles) and negligible risk for Chlamydia or Gonorrhea.",
      "However, intimate skin-to-skin contact CAN transmit pathogens that reside on epithelial surfaces: Herpes Simplex Virus (HSV-1 from oral cold sores or HSV-2 from genital shedding), Human Papillomavirus (HPV causing genital warts), Treponema pallidum (if an active primary syphilis chancre is touched), and Molluscum contagiosum."
    ],
    "keyTakeaways": [
      "HIV is NOT transmitted through saliva, french kissing, or touching intact skin.",
      "Herpes (HSV-1) is easily transmitted through deep kissing if an active or shedding cold sore is present.",
      "Genital rubbing (frottage) can transmit skin-to-skin infections like HPV, Herpes, and Molluscum.",
      "Internal urethral bacterial infections (Gonorrhea/Chlamydia) require mucosal fluid transfer and are rare without penetration."
    ],
    "investigations": [
      {
        "name": "HSV-1 & HSV-2 Type-Specific Panel",
        "specimen": "Lesion Swab or Venous Blood",
        "window": "Immediate for sore; 12 weeks for IgG",
        "tat": "12\u201324 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Evaluates oral and genital herpes exposure."
      },
      {
        "name": "Syphilis Dual Serology (RPR + TPHA)",
        "specimen": "Venous Blood",
        "window": "3\u20136 Weeks",
        "tat": "12\u201324 Hours",
        "price": "\u20b9750",
        "clinicalNote": "Screens for Treponema pallidum transmission from mucosal contact."
      }
    ],
    "faqs": [
      {
        "question": "Can you get HIV from french kissing?",
        "answer": "No. Saliva contains natural enzymes and proteins that inhibit HIV infectivity, and the viral load in saliva is negligible. Even in the presence of bleeding gums, the CDC has identified no credible cases of HIV transmission through kissing alone."
      },
      {
        "question": "Can genital rubbing without penetration transmit an STI?",
        "answer": "Yes, but primarily skin-to-skin infections: Genital Warts (HPV), Herpes (HSV), Molluscum contagiosum, and pubic lice. Bacterial infections like Gonorrhea and Chlamydia typically require direct mucosal or ejaculatory fluid transfer."
      },
      {
        "question": "Do I need to take PEP after non-penetrative intimacy?",
        "answer": "No. Non-penetrative contact (kissing, touching, frottage with clothes on or off without fluid exchange into mucous membranes) does not meet clinical criteria for HIV Post-Exposure Prophylaxis."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 HIV Transmission Risk Estimates by Act",
        "url": "https://www.cdc.gov/hiv/risk/estimates/riskbehaviors.html"
      },
      {
        "label": "WHO \u2014 Sexually Transmitted Infections Fact Sheet",
        "url": "https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)"
      }
    ],
    "relatedSlugs": [
      "genital-herpes-testing",
      "hpv-dna-testing",
      "hiv-testing-after-exposure",
      "sti-testing-window-periods"
    ]
  },
  {
    "slug": "inclusive-sexual-health-testing",
    "priority": "P2",
    "category": "Access, Pricing & Care",
    "title": "Inclusive Sexual Health Testing Bangalore | LGBTQIA+ & MSM | QXL",
    "seoTitle": "Inclusive Sexual Health Testing Bangalore | Affirming & LGBTQIA+ | QXL",
    "description": "Affirming, confidential sexual health testing for LGBTQIA+, MSM, and transgender individuals in Bengaluru. 3-site extragenital screening, PrEP monitoring & zero judgment.",
    "h1": "Inclusive & Affirming Sexual Health Testing in Bangalore",
    "subtitle": "Healthcare guided by dignity, clinical excellence, and zero judgment. Comprehensive 3-site extragenital screening and affirmative care for all sexual orientations and gender identities.",
    "badge": "Affirming Care",
    "overview": [
      "Every individual deserves compassionate, dignified, and scientifically rigorous healthcare. For many LGBTQIA+ individuals, men who have sex with men (MSM), and transgender persons, healthcare settings have historically been associated with stigma or awkward interactions.",
      "At QXL Diagnostics, we practice an Anatomical Inventory Approach: diagnostic testing is guided entirely by your anatomy, sexual practices, and potential exposure sites\u2014not by societal labels or assumptions.",
      "We provide comprehensive 3-site extragenital screening (throat swab, rectal swab, and first-catch urine/blood) to ensure no infection is overlooked, alongside routine PrEP monitoring and confidential numeric barcode registration."
    ],
    "keyTakeaways": [
      "Affirming, zero-judgment care respecting your chosen name and pronouns.",
      "Anatomical inventory approach: testing tailored to your anatomy and sexual practices.",
      "3-site testing (pharyngeal, rectal, and urogenital) is standard for comprehensive evaluation.",
      "Routine PrEP baseline testing and quarterly monitoring panels available."
    ],
    "investigations": [
      {
        "name": "3-Site Extragenital Comprehensive Molecular Panel",
        "specimen": "Throat Swab + Rectal Swab + Urine/Blood",
        "window": "14 Days",
        "tat": "48 Hours",
        "price": "\u20b93,999",
        "clinicalNote": "Comprehensive dual NAAT across all three anatomical exposure sites."
      },
      {
        "name": "HIV 4th Gen Duo & Syphilis Dual Panel",
        "specimen": "Venous Blood",
        "window": "18\u201345 Days",
        "tat": "6 Hours",
        "price": "\u20b91,450",
        "clinicalNote": "Core serological panel detecting p24 Ag/Ab and active syphilis titers."
      },
      {
        "name": "PrEP Comprehensive Safety Panel",
        "specimen": "Venous Blood & Urine",
        "window": "Every 3 Months",
        "tat": "6 Hours",
        "price": "\u20b91,650",
        "clinicalNote": "Renal safety monitoring, eGFR, LFT, and ongoing HIV negativity verification."
      }
    ],
    "faqs": [
      {
        "question": "What is 3-site STI testing and why is it important?",
        "answer": "3-site testing involves collecting swabs from the throat and rectum in addition to a urine sample. Because Chlamydia and Gonorrhea can infect extragenital mucosal sites without causing symptoms, testing only urine misses up to 85% of infections in sexually active MSM."
      },
      {
        "question": "How are transgender patients supported?",
        "answer": "Our specialists test according to your current anatomical organs (e.g. neovaginal swabs, cervical swabs, or urethral urine) and medical history without deadnaming or making assumptions about your gender identity."
      },
      {
        "question": "Can I arrange private testing without my family finding out?",
        "answer": "Yes. Our systems use numeric barcode tracking. Encrypted digital reports are sent exclusively to your personal mobile device, with zero physical mail or third-party disclosure."
      }
    ],
    "clinicalReferences": [
      {
        "label": "CDC \u2014 STI Guidelines for Gay, Bisexual, and Other Men Who Have Sex with Men (MSM)",
        "url": "https://www.cdc.gov/std/treatment-guidelines/msm.htm"
      },
      {
        "label": "WPATH \u2014 Standards of Care for the Health of Transgender and Gender Diverse People",
        "url": "https://www.wpath.org/"
      }
    ],
    "relatedSlugs": [
      "sti-testing-after-anal-sex",
      "sti-testing-after-oral-sex",
      "hiv-pep-prep-testing",
      "confidential-sti-testing-bangalore"
    ]
  }
];

export function getSexualHealthPageBySlug(slug: string): SexualHealthLandingPage | undefined {
  return SEXUAL_HEALTH_LANDING_PAGES.find(p => p.slug === slug);
}

export function getAllSexualHealthSlugs(): string[] {
  return SEXUAL_HEALTH_LANDING_PAGES.map(p => p.slug);
}
