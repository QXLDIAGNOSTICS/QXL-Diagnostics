/**
 * QXL Diagnostics — Sexual Health & STI Knowledge Hub & Catalogue Master Data
 * Clinically reviewed in accordance with:
 * - Koneman's Color Atlas and Textbook of Diagnostic Microbiology (7th Ed., Ch. 2, 11, 20)
 * - CDC Sexually Transmitted Infections Treatment Guidelines & Testing Guidance
 * - WHO Guidelines on Post-Exposure Prophylaxis (PEP) for HIV
 * - NACO (National AIDS Control Organisation, India) HIV Diagnostic Algorithms
 * - Single source of truth NABL Certificate MC-6849 & ISO 15189:2022 standards
 */

export interface StiPackage {
  code: string;
  name: string;
  shortName: string;
  searchIntent: string;
  tagline: string;
  category: "Sexual Health & STI Testing";
  price: number | null; // null if pending active LIS code confirmation
  priceDisplay: string;
  mrp?: number;
  tat: string;
  specimen: string;
  fasting: boolean;
  fastingInstruction: string;
  homeCollectionAvailable: boolean;
  launchStatus: "Verified & Live" | "Phase 1: Listed Components" | "Phase 2: Confirmed Workflow" | "Phase 3: Specialist Directed";
  verifiedInCatalogue: boolean;
  catalogueId?: string;
  slug: string;
  bookingCta: string;
  targetPathogens: string[];
  parametersCount: number;
  intendedPatients: string;
  clinicalLimitations: string;
  keyFeatures: string[];
  accreditationNote: string;
}

export const QXL_STI_PACKAGES: StiPackage[] = [
  {
    code: "QXL-STI-01",
    name: "HIV-1 & HIV-2 Antigen & Antibody Screening (4th Gen Duo)",
    shortName: "HIV 4th Gen Duo",
    searchIntent: "HIV test Bangalore, HIV test price Bangalore, HIV test near me",
    tagline: "High-sensitivity 4th generation ECLIA detecting HIV-1 p24 antigen and HIV-1/2 antibodies simultaneously.",
    category: "Sexual Health & STI Testing",
    price: 945,
    priceDisplay: "₹945",
    mrp: 1450,
    tat: "6 Hours",
    specimen: "Serum (Venous Blood Draw)",
    fasting: false,
    fastingInstruction: "No Fasting Required (Strictly Confidential)",
    homeCollectionAvailable: true,
    launchStatus: "Verified & Live",
    verifiedInCatalogue: true,
    catalogueId: "hiv-screening",
    slug: "/tests/hiv-test-bangalore",
    bookingCta: "Book HIV 4th Gen Duo",
    targetPathogens: ["HIV-1 p24 Antigen", "HIV-1 Antibodies (IgM/IgG)", "HIV-2 Antibodies (IgM/IgG)"],
    parametersCount: 2,
    intendedPatients: "Individuals seeking confidential HIV screening following a potential exposure (optimal window 18–45 days), pre-marital evaluation, or routine health checkup.",
    clinicalLimitations: "Does not detect viral presence during the acute eclipse phase (<10–14 days). A non-reactive result within 45 days of exposure warrants repeat testing at 90 days for definitive exclusion per CDC guidelines.",
    keyFeatures: [
      "Simultaneous p24 antigen and antibody detection",
      "Shortened window period compared to 3rd generation antibody-only assays",
      "Confidential numeric barcode reporting option",
      "Same-day digital reporting within 6 hours"
    ],
    accreditationNote: "NABL Accredited testing performed under NABL Certificate MC-6849."
  },
  {
    code: "QXL-STI-02",
    name: "4th Generation HIV ECLIA/CLIA Confirmatory Screen",
    shortName: "HIV 4th Gen ECLIA",
    searchIntent: "HIV fourth generation test, p24 antigen test Bangalore, HIV Duo test",
    tagline: "Chemiluminescent/electrochemiluminescent microparticle assay for early antigen-antibody resolution.",
    category: "Sexual Health & STI Testing",
    price: 945,
    priceDisplay: "₹945",
    mrp: 1450,
    tat: "6 Hours",
    specimen: "Serum (3 mL Venous Blood)",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    homeCollectionAvailable: true,
    launchStatus: "Verified & Live",
    verifiedInCatalogue: true,
    catalogueId: "hiv-screening",
    slug: "/tests/hiv-4th-generation-test",
    bookingCta: "Book 4th Gen HIV Screen",
    targetPathogens: ["HIV-1 p24 Antigen", "Anti-HIV-1 Total Antibodies", "Anti-HIV-2 Total Antibodies"],
    parametersCount: 2,
    intendedPatients: "Patients wanting the earliest possible serological detection (18–45 days post-exposure) without waiting for standard 90-day antibody seroconversion.",
    clinicalLimitations: "Cannot differentiate HIV-1 from HIV-2 antibodies without supplementary differentiation testing. Reactive results follow NACO three-test algorithm confirmation.",
    keyFeatures: [
      ">99.7% sensitivity and >99.5% specificity",
      "Detects free p24 antigen prior to seroconversion",
      "Automated immunoassay analyzer with zero cross-contamination risk",
      "Post-test teleconsultation support"
    ],
    accreditationNote: "Processed in accordance with ISO 15189:2022 laboratory standards."
  },
  {
    code: "QXL-STI-03",
    name: "Syphilis Screening & Confirmation Profile (RPR + TPHA Reflex)",
    shortName: "Syphilis Dual Serology",
    searchIntent: "VDRL test near me, RPR test price, Syphilis test Bangalore, TPHA test",
    tagline: "Dual serological approach: Non-treponemal quantitative RPR titer paired with treponemal TPHA confirmation.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "12–24 Hours",
    specimen: "Serum (Venous Blood)",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    homeCollectionAvailable: true,
    launchStatus: "Phase 1: Listed Components",
    verifiedInCatalogue: false,
    slug: "/tests/vdrl-rpr-test",
    bookingCta: "Enquire / Book Syphilis Screen",
    targetPathogens: ["Treponema pallidum non-treponemal antibodies (reagin)", "Treponema pallidum specific antibodies (TPHA)"],
    parametersCount: 2,
    intendedPatients: "Individuals with genital lesions, unexplained skin rashes on palms/soles, sexual partners of syphilis patients, or routine antenatal/STI screening.",
    clinicalLimitations: "Non-treponemal tests (RPR/VDRL) can yield biological false positives in autoimmune disease, pregnancy, or viral infections. Treponemal antibodies (TPHA) remain positive for life, regardless of cure.",
    keyFeatures: [
      "Quantitative end-point titers for monitoring treatment efficacy",
      "Treponemal confirmation prevents false-positive misdiagnosis",
      "Essential differential for painless genital chancres",
      "Follows CDC traditional and reverse algorithm standards"
    ],
    accreditationNote: "Processed in NABL Accredited central reference laboratory."
  },
  {
    code: "QXL-STI-04",
    name: "Chlamydia & Gonorrhea Real-Time PCR (Urine / Swab NAAT)",
    shortName: "Chlamydia & Gonorrhea PCR",
    searchIntent: "Burning urination test, Chlamydia gonorrhea PCR Bangalore, Urine STI test",
    tagline: "Gold-standard nucleic acid amplification test (NAAT) detecting C. trachomatis and N. gonorrhoeae DNA.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "First-Catch Urine (first 20–30 mL) or Endocervical/Urethral Swab",
    fasting: false,
    fastingInstruction: "Do not urinate for at least 1 hour prior to collection",
    homeCollectionAvailable: true,
    launchStatus: "Phase 1: Listed Components",
    verifiedInCatalogue: false,
    slug: "/tests/chlamydia-gonorrhea-pcr",
    bookingCta: "Enquire / Book PCR Screen",
    targetPathogens: ["Chlamydia trachomatis DNA", "Neisseria gonorrhoeae DNA"],
    parametersCount: 2,
    intendedPatients: "Patients with dysuria (painful urination), urethral or vaginal discharge, pelvic discomfort, or asymptomatic screening after unprotected sex.",
    clinicalLimitations: "First-catch urine primarily detects urethral infections in males. Pharyngeal or rectal exposure requires site-specific swabs (urine will not detect oral/anal colonization).",
    keyFeatures: [
      "Automated real-time PCR with ultra-high analytical sensitivity (>98%)",
      "Non-invasive first-catch urine collection for men and women",
      "Fast pathogen differentiation to guide antibiotic selection",
      "Strict cold-chain specimen preservation"
    ],
    accreditationNote: "Molecular diagnostic testing performed under rigorous internal and external QC."
  },
  {
    code: "QXL-STI-05",
    name: "Triple STI Multiplex PCR Screen (Chlamydia, Gonorrhea, Trichomonas)",
    shortName: "Triple STI PCR",
    searchIntent: "Trichomonas test Bangalore, full urine STI PCR, STD checkup Bangalore",
    tagline: "Simultaneous molecular detection of three common curable bacterial and protozoan sexually transmitted pathogens.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "First-Catch Urine or Vaginal/Urethral Swab",
    fasting: false,
    fastingInstruction: "Hold urine for minimum 1 hour prior to sampling",
    homeCollectionAvailable: true,
    launchStatus: "Phase 1: Listed Components",
    verifiedInCatalogue: false,
    slug: "/tests/std-sti-panel",
    bookingCta: "Enquire / Book Triple PCR",
    targetPathogens: ["Chlamydia trachomatis DNA", "Neisseria gonorrhoeae DNA", "Trichomonas vaginalis DNA"],
    parametersCount: 3,
    intendedPatients: "Individuals with persistent urethral discharge, vaginitis, pelvic fullness, or couples planning unbarriered intimacy.",
    clinicalLimitations: "Does not cover viral STIs (HIV, Hepatitis B/C, HSV) or Treponema pallidum. Blood serology must be added for comprehensive systemic evaluation.",
    keyFeatures: [
      "Multiplex PCR eliminates need for multiple separate assays",
      "Much higher diagnostic yield for Trichomonas than traditional wet mount",
      "Rapid turn-around to avoid empiric antibiotic delays",
      "Home collection available via sterile specimen kit"
    ],
    accreditationNote: "Processed in accordance with NABL guidelines."
  },
  {
    code: "QXL-STI-06",
    name: "Essential Blood-Borne STI Screening Panel",
    shortName: "Essential STI Screen",
    searchIntent: "Basic STD checkup Bangalore, blood STD test, HIV syphilis hepatitis test",
    tagline: "Core serological panel covering major blood-borne and systemic sexually transmitted infections.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "12–24 Hours",
    specimen: "Serum (Venous Blood Draw)",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    homeCollectionAvailable: true,
    launchStatus: "Phase 2: Confirmed Workflow",
    verifiedInCatalogue: false,
    slug: "/tests/std-sti-panel",
    bookingCta: "Enquire / Book Essential Panel",
    targetPathogens: ["HIV-1 & HIV-2 (4th Gen p24 + Ab)", "Syphilis (RPR / VDRL + TPHA reflex)", "Hepatitis B Surface Antigen (HBsAg)", "Hepatitis C Total Antibody (Anti-HCV)"],
    parametersCount: 4,
    intendedPatients: "Patients requesting a dependable baseline blood screening after an exposure or as part of a pre-marital/routine wellness check.",
    clinicalLimitations: "Does not assess mucosal or localized bacterial STIs (Chlamydia or Gonorrhea). Urine PCR should be added if dysuria or discharge is present.",
    keyFeatures: [
      "Covers 4 critical viral and spirochetal pathogens in a single draw",
      "Includes 4th generation HIV and quantitative Syphilis screening",
      "NABL Accredited automated immunoassay processing",
      "Home sample collection across all Bengaluru zones"
    ],
    accreditationNote: "Processed using automated chemiluminescence immunoassay platforms."
  },
  {
    code: "QXL-STI-07",
    name: "Comprehensive STI Master Diagnostic Panel (Blood + Urine 10-Target)",
    shortName: "Comprehensive STI Panel",
    searchIntent: "Full STD panel Bangalore, 10 panel STI test price, complete sexual health checkup",
    tagline: "Our most exhaustive sexual health evaluation combining molecular PCR for localized infections with advanced serology.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "Blood (Serum) + First-Catch Urine",
    fasting: false,
    fastingInstruction: "No fasting; hold urine for 1–2 hours prior to collection",
    homeCollectionAvailable: true,
    launchStatus: "Phase 2: Confirmed Workflow",
    verifiedInCatalogue: false,
    slug: "/tests/std-sti-panel",
    bookingCta: "Enquire / Book Master Panel",
    targetPathogens: [
      "HIV-1/2 (4th Gen p24 Ag + Ab)",
      "Syphilis (RPR + TPHA)",
      "Hepatitis B Surface Antigen (HBsAg)",
      "Hepatitis C Antibody (Anti-HCV)",
      "Chlamydia trachomatis DNA (PCR)",
      "Neisseria gonorrhoeae DNA (PCR)",
      "Trichomonas vaginalis DNA (PCR)",
      "Herpes Simplex Virus Type 1 & 2 IgG"
    ],
    parametersCount: 10,
    intendedPatients: "Individuals with multi-symptom presentations, multiple exposures, or those seeking 360-degree sexual wellness assurance.",
    clinicalLimitations: "Serologic HSV testing indicates past exposure and cannot definitively pinpoint current genital lesion etiology without lesion swab PCR.",
    keyFeatures: [
      "Dual-specimen protocol ensuring both systemic and mucosal coverage",
      "Molecular NAAT + Automated Serology on single order",
      "Confidential electronic delivery with doctor-reviewed summary",
      "Available across South & North Hubs and doorstep home collection"
    ],
    accreditationNote: "Performed under central quality oversight (NABL Certificate MC-6849)."
  },
  {
    code: "QXL-STI-08",
    name: "Vaginal Infection Diagnostic Profile (Vaginitis & Microecology)",
    shortName: "Vaginal Infection Profile",
    searchIntent: "Vaginal discharge test Bangalore, bacterial vaginosis test, candidiasis test",
    tagline: "Comprehensive microscopy, culture, and molecular assessment for bacterial vaginosis, candidiasis, and trichomoniasis.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "High Vaginal Swab & Cervical Swab (Clinical Collection)",
    fasting: false,
    fastingInstruction: "Avoid vaginal douches, medications, or intercourse 24h prior",
    homeCollectionAvailable: false,
    launchStatus: "Phase 3: Specialist Directed",
    verifiedInCatalogue: false,
    slug: "/tests/std-sti-panel",
    bookingCta: "Book Clinical Consultation",
    targetPathogens: ["Bacterial Vaginosis (Nugent scoring)", "Candida speciation", "Trichomonas vaginalis", "Chlamydia & Gonorrhea NAAT"],
    parametersCount: 5,
    intendedPatients: "Women experiencing persistent, recurrent, or unusual vaginal discharge, odor, itching, or dyspareunia.",
    clinicalLimitations: "Requires anatomical swab collection by a qualified clinical provider; cannot be substituted with a routine urine sample.",
    keyFeatures: [
      "Differentiates BV, Yeast, Trichomoniasis, and sexually transmitted cervicitis",
      "Reduces empiric antifungal/antibiotic treatment failures",
      "Private and respectful clinical environment at QXL consultation hubs",
      "Reviewed by senior microbiologists and pathologists"
    ],
    accreditationNote: "Microbiological culture & microscopy verified under ISO 15189:2022 standards."
  },
  {
    code: "QXL-STI-09",
    name: "Genital Herpes & Lesion Differential PCR (HSV-1, HSV-2, Syphilis)",
    shortName: "HSV Lesion PCR",
    searchIntent: "Genital herpes test Bangalore, HSV PCR test, painful genital sore test",
    tagline: "Direct nucleic acid detection from lesion swabs for definitive identification of active herpes simplex virus.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "Lesion Exudate / Vesicle Fluid Swab (Viral Transport Medium)",
    fasting: false,
    fastingInstruction: "Sample should be collected while active blisters/ulcers are fresh",
    homeCollectionAvailable: false,
    launchStatus: "Phase 3: Specialist Directed",
    verifiedInCatalogue: false,
    slug: "/tests/hsv-herpes-test",
    bookingCta: "Book Lesion PCR Assessment",
    targetPathogens: ["Herpes Simplex Virus Type 1 DNA", "Herpes Simplex Virus Type 2 DNA", "Treponema pallidum DNA / Serology"],
    parametersCount: 3,
    intendedPatients: "Patients with active, painful blisters or ulcers in the genital, anal, or oral regions.",
    clinicalLimitations: "PCR sensitivity decreases as lesions crust and heal. Testing older healed lesions may produce false negatives.",
    keyFeatures: [
      "Direct viral detection avoids misleading serological antibodies",
      "Specific typing between HSV-1 and HSV-2 for tailored prognosis",
      "Essential differential against painless syphilitic chancre",
      "Cold-chain transport in viral transport medium (VTM)"
    ],
    accreditationNote: "Processed in specialized molecular microbiology section."
  },
  {
    code: "QXL-STI-10",
    name: "Anatomical-Site Extragenital STI Screening (Pharyngeal & Rectal NAAT)",
    shortName: "Oral & Rectal STI NAAT",
    searchIntent: "Throat STD test Bangalore, oral STI screening, rectal gonorrhea chlamydia test",
    tagline: "Targeted molecular swabs for extragenital gonorrhea and chlamydia infections following oral or anal exposure.",
    category: "Sexual Health & STI Testing",
    price: null,
    priceDisplay: "Enquire for Live Price",
    tat: "24–48 Hours",
    specimen: "Pharyngeal Swab and/or Anorectal Swab",
    fasting: false,
    fastingInstruction: "Avoid gargling or mouthwash 1 hour prior to throat swab",
    homeCollectionAvailable: false,
    launchStatus: "Phase 3: Specialist Directed",
    verifiedInCatalogue: false,
    slug: "/health-hub/sti-testing-after-oral-sex",
    bookingCta: "Book Extragenital Swab Assessment",
    targetPathogens: ["Pharyngeal Neisseria gonorrhoeae", "Pharyngeal Chlamydia trachomatis", "Rectal Neisseria gonorrhoeae", "Rectal Chlamydia trachomatis"],
    parametersCount: 4,
    intendedPatients: "Individuals with pharyngitis after oral sex, rectal discharge/tenesmus, or comprehensive screening following multi-site sexual exposures.",
    clinicalLimitations: "Extragenital infections are predominantly asymptomatic and completely missed by urine tests. Site-specific swabs are mandatory per CDC guidelines.",
    keyFeatures: [
      "CDC-recommended testing for sexually active adults with extragenital exposure",
      "Detects asymptomatic reservoirs that drive transmission",
      "Gentle Dacron/Flocked swab collection in privacy",
      "Direct pathogen identification for targeted antimicrobial stewardship"
    ],
    accreditationNote: "Performed in molecular diagnostics division."
  }
];

export interface ClinicalPathway {
  id: string;
  title: string;
  urgency: "CRITICAL (<72h)" | "HIGH (10–21 Days)" | "STANDARD (4–12 Weeks)";
  summary: string;
  clinicalSteps: string[];
  recommendedInvestigations: string[];
  guidelineReference: string;
}

export const CLINICAL_PATHWAYS: ClinicalPathway[] = [
  {
    id: "pep-emergency-pathway",
    title: "Post-Exposure Prophylaxis (PEP) Emergency Care Pathway",
    urgency: "CRITICAL (<72h)",
    summary: "For potential HIV exposure occurring within the past 72 hours (condom rupture, sexual assault, needle-stick, or high-risk unbarriered intercourse). PEP is most effective when started within 24 hours and must be initiated within 72 hours.",
    clinicalSteps: [
      "1. Immediate emergency physician evaluation (<72 hours). Do not wait for lab test results to start PEP.",
      "2. Rapid baseline HIV 4th generation Ag/Ab test to verify pre-existing negative status.",
      "3. Baseline Serum Creatinine, eGFR, and Liver Function Tests (LFT) prior to 28-day antiretroviral course.",
      "4. Hepatitis B (HBsAg) and Hepatitis C (Anti-HCV) baseline serology.",
      "5. 28-day strict adherence to prescribed three-drug PEP regimen.",
      "6. Post-PEP follow-up HIV test at 4–6 weeks and definitive conclusive test at 3 months (90 days)."
    ],
    recommendedInvestigations: [
      "HIV-1/2 4th Gen Duo (Baseline & Follow-up)",
      "Serum Creatinine with eGFR",
      "Liver Function Test (SGOT, SGPT, Bilirubin)",
      "HBsAg & Anti-HCV",
      "Syphilis RPR/VDRL"
    ],
    guidelineReference: "WHO Guidelines on Post-Exposure Prophylaxis for HIV & CDC Morbidity and Mortality Weekly Report (MMWR) Guidelines."
  },
  {
    id: "early-hiv-nat-pathway",
    title: "Acute Retroviral Syndrome & Early Infection Evaluation",
    urgency: "HIGH (10–21 Days)",
    summary: "For patients presenting with mononucleosis-like acute viral illness (fever, lymphadenopathy, pharyngitis, maculopapular rash) 10 to 28 days following high-risk sexual exposure.",
    clinicalSteps: [
      "1. Clinical evaluation by an infectious disease specialist or general physician.",
      "2. Qualitative or Quantitative HIV-1 RNA PCR (Nucleic Acid Test - NAT) to detect viral load during the seronegative eclipse/window phase.",
      "3. Concurrent 4th generation p24 Ag/Ab testing to establish serological staging.",
      "4. If RNA NAT is positive and antibody is negative, acute primary HIV infection is confirmed; immediate antiretroviral therapy (ART) referral is initiated.",
      "5. Full STD/STI co-infection screen (Syphilis, Chlamydia, Gonorrhea, Hepatitis B/C)."
    ],
    recommendedInvestigations: [
      "HIV-1 RNA Qualitative / Quantitative Real-Time PCR (NAT)",
      "HIV-1/2 4th Generation Ag/Ab Duo",
      "Complete Blood Count (CBC) with Peripheral Smear",
      "Syphilis Dual Serology (RPR + TPHA)",
      "Hepatitis B Surface Antigen"
    ],
    guidelineReference: "CDC Laboratory Testing for the Diagnosis of HIV Infection & NACO National Technical Guidelines."
  }
];

export const HIV_WINDOW_MILESTONES = [
  {
    days: "10–33 Days",
    label: "HIV-1 RNA PCR (NAT)",
    description: "Detects viral genetic material in blood. Earliest detection method, used in clinical acute exposure evaluations.",
    conclusiveness: "High analytical sensitivity in acute phase; non-reactive warrants serologic confirmation."
  },
  {
    days: "18–45 Days",
    label: "4th Gen Lab Antigen/Antibody Combo",
    description: "Detects both HIV-1 p24 antigen and IgM/IgG antibodies from a venous blood draw. Over 99% conclusive at 45 days.",
    conclusiveness: "CDC primary recommendation. 99% of people have detectable infection by 45 days."
  },
  {
    days: "23–90 Days",
    label: "Rapid Fingerstick / Antibody Test",
    description: "Detects host antibodies. Requires longer immune development period.",
    conclusiveness: "Conclusive at 90 days. Negative result before 90 days requires retesting."
  },
  {
    days: "90 Days+",
    label: "Definitive Window for All Assays",
    description: "Standard milestone recognized globally by CDC, WHO, and NACO for total conclusive exclusion of HIV infection.",
    conclusiveness: "100% conclusive for all standard antibody and antigen/antibody testing."
  }
];

export const SEXUAL_HEALTH_FAQ = [
  {
    q: "How confidential is sexual health and HIV testing at QXL Diagnostics?",
    a: "Your privacy is paramount. All sexual health samples are processed under strict medical confidentiality protocols. You may request numeric barcode identification where your name does not appear on internal lab paperwork. Test reports are delivered securely to your password-protected portal or WhatsApp/email, and are never shared with employers, insurance providers, or third parties without your explicit written authorization."
  },
  {
    q: "What is the difference between a 3rd and 4th generation HIV test?",
    a: "A 3rd generation HIV test detects only host antibodies (IgM and IgG), which typically take 23 to 90 days to reach detectable concentrations. A 4th generation test detects both antibodies AND the viral p24 protein antigen itself. Because p24 antigen is produced directly by the virus before your body finishes producing antibodies, 4th generation assays detect infection reliably between 18 and 45 days after exposure—reducing the anxiety-inducing window period by weeks."
  },
  {
    q: "I had unprotected sex less than 72 hours ago. What should I do?",
    a: "You must urgently consult a doctor for Post-Exposure Prophylaxis (PEP). PEP consists of anti-HIV medications that can prevent the virus from taking hold in your body if started within 72 hours of exposure (ideally within 24 hours). Do not wait for laboratory test results to see a doctor for PEP. Concurrently, contact QXL Diagnostics for baseline screening (HIV, Hepatitis B/C, Kidney Function, Syphilis) to establish your baseline health status."
  },
  {
    q: "Why do I need both VDRL/RPR and TPHA for a syphilis diagnosis?",
    a: "Syphilis diagnosis requires two different types of tests per CDC and Koneman diagnostic microbiology guidelines. Non-treponemal tests (VDRL/RPR) detect reagin antibodies produced during active tissue damage; they provide a quantitative titer that rises in active disease and falls after successful antibiotic treatment. However, they can produce biological false positives from viral infections or autoimmune conditions. Treponemal tests (TPHA/TPPA) detect specific antibodies to Treponema pallidum, confirming whether syphilis infection has truly occurred."
  },
  {
    q: "Can a routine urine test detect all sexually transmitted infections?",
    a: "No. Routine urine analysis (routine & microscopy) only looks for non-specific white blood cells or red blood cells. A molecular urine test (PCR / NAAT) is required to detect the specific DNA of Chlamydia trachomatis and Neisseria gonorrhoeae. Furthermore, urine PCR only tests the urinary tract; it cannot detect syphilis, HIV, or hepatitis (which require blood draws), nor can it detect throat or rectal infections from oral or anal intimacy (which require site-specific mucosal swabs)."
  },
  {
    q: "How should I collect a first-catch urine sample for an STI PCR test?",
    a: "Unlike routine urine tests where midstream urine is preferred, STI PCR requires 'first-catch' (initial void) urine. You should not have urinated for at least 1 hour (preferably 2 hours) prior to sample collection. Collect the first 20 to 30 mL of urine that exits your body directly into the sterile container. Do not discard the initial stream, as it washes the urethral epithelial cells containing Chlamydia and Gonorrhea into the cup."
  },
  {
    q: "Is home sample collection safe and confidential for STD testing?",
    a: "Yes. QXL Diagnostics provides discrete doorstep sample collection across Bengaluru through trained phlebotomy specialists. Our phlebotomists arrive in non-descript medical attire with sealed, tamper-evident collection tubes. For urine tests, sterile containers with pre-labeled barcode IDs are provided. Samples are maintained in strict temperature-controlled cold chains until delivery at our central NABL Accredited laboratory."
  }
];

