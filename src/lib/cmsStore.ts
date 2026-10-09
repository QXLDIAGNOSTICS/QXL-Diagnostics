"use client";
 

// CMS Store to manage local state and mock database in the browser using localStorage.

const isClient = typeof window !== 'undefined';

const defaultBanners = [
  {
    id: "banner-1",
    imageOnly: true,
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg",
    bgFrom: "#06558f",
    bgTo: "#128bc7",
    title: "Food Intolerance",
    badge: "NEW",
    titleAccent: "",
    subtitle: "",
    subtitleAccent: "",
    description: "",
    cta: "",
    ctaLink: "",
    ctaSecondary: "",
    ctaSecondaryLink: "",
    imageFit: "contain",
    features: []
  },
  {
    id: "banner-2",
    imageOnly: true,
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150192/Assets-QXL/legacy-assets/image/franchise_banner.png",
    bgFrom: "#ffffff",
    bgTo: "#ffffff",
    title: "Collaborate with us",
    badge: "NEW",
    titleAccent: "",
    subtitle: "",
    subtitleAccent: "",
    description: "",
    cta: "",
    ctaLink: "",
    ctaSecondary: "",
    ctaSecondaryLink: "",
    imageFit: "contain",
    features: []
  },
  {
    id: "banner-3",
    badge: "LEADER IN DIAGNOSTICS",
    title: "AI-Powered Super Speciality",
    titleAccent: "Diagnostics Labs in Bengaluru",
    subtitle: "Advanced pathology, microbiology, immunology, molecular diagnostics, histopathology and precision testing",
    subtitleAccent: "with expert-reviewed reports and home sample collection across Bengaluru.",
    description: "Supported by state-of-the-art technology and a highly skilled team of pathologists, microbiologists, and biochemists.",
    cta: "Book Now",
    ctaLink: "/book",
    ctaSecondary: "Our Specialities",
    ctaSecondaryLink: "/speciality-tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg",
    imageFit: "cover",
    bgFrom: "#eff6ff",
    bgTo: "#dbeafe",
    features: ["NABL Accredited Medical Laboratory", "CAP Standards", "Highly Skilled Team", "ISO 15189 Precision Controls"]
  },
  {
    id: "banner-4",
    badge: "FAMILY CARE",
    title: "Double the Care",
    titleAccent: "Double the Savings",
    subtitle: "Full Body Comprehensive Health Check-up",
    subtitleAccent: "1+1 FAMILY OFFER",
    description: "Get comprehensive insights for two people for the price of one. 86+ Parameters included.",
    cta: "Book Now",
    ctaLink: "/book",
    ctaSecondary: "Learn More",
    ctaSecondaryLink: "/packages",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg",
    imageFit: "cover",
    bgFrom: "#f0f9ff",
    bgTo: "#e0f2fe",
    features: ["86+ Tests", "1+1 Offer", "Save 50%", "Home Collection"]
  }
];

const defaultDoctors = [
  { id: "doc-1", name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg" },
  { id: "doc-2", name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://images.unsplash.com/photo-1594824436998-d70d90db3c80?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-3", name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-4", name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://images.unsplash.com/photo-1537368910025-7028500a2216?auto=format&fit=crop&q=80&w=400" }
];
import { CANONICAL_PACKAGES } from '@/lib/packagesCatalogue';

const defaultPackages = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price ? String(pkg.price) : "Contact Us",
  old_price: pkg.mrp ? String(pkg.mrp) : "",
  save_amount: pkg.price && pkg.mrp ? String(pkg.mrp - pkg.price) : "",
  includes: pkg.includes,
  parameters: pkg.parametersLabel,
  tag: pkg.tag || "PREVENTIVE",
  benefits: pkg.highlights,
  who_should_take: pkg.mayHelpWhen || "Consult with doctor or reception before booking.",
  age: "All Ages",
  gender: "Male / Female",
  doctor_recommended: true,
  contactForPrice: !!pkg.contactForPrice,
  guidanceLevel: pkg.guidanceLevel,
}));

const defaultTests = [
  { id: "test-1", name: "BILE ACIDS - SERUM", price: "2500", old_price: "3333", parameters: "Single Parameter" },
  { id: "test-2", name: "COMPLETE BLOOD COUNT (CBC)", price: "395", old_price: "527", parameters: "24 Parameters" },
  { id: "test-3", name: "HBA1C, GLYCATED HEMOGLOBIN", price: "610", old_price: "813", parameters: "Single Parameter" },
  { id: "test-4", name: "LIPID PROFILE", price: "800", old_price: "1067", parameters: "9 Parameters" },
  { id: "test-5", name: "LIVER FUNCTION TEST (LFT)", price: "800", old_price: "1067", parameters: "11 Parameters" },
  { id: "test-6", name: "SEX HORMONE BINDING GLOBULIN (SHBG)", price: "2900", old_price: "3867", parameters: "Single Parameter" }
];

const defaultDepartments = [
  { id: "dept-1", title: "NEUROLOGY", desc: "Brain & Nervous System", href: "/specialities/neurology", iconName: "Brain" },
  { id: "dept-2", title: "HEMATOLOGY", desc: "Blood Disorders & CBC", href: "/specialities/hematology", iconName: "Droplet" },
  { id: "dept-3", title: "CARDIOLOGY", desc: "Heart & Cardiovascular", href: "/specialities/cardiology", iconName: "Heart" },
  { id: "dept-4", title: "UROLOGY", desc: "Kidney & Urinary Health", href: "/specialities/urology", iconName: "Shield" },
  { id: "dept-5", title: "ENDOCRINOLOGY", desc: "Thyroid, Diabetes & Hormones", href: "/specialities/endocrinology", iconName: "Activity" }
];

const defaultTestimonials = [
  { id: "t-1", name: "Ananth Raman", role: "Patient", feedback: "QXL team was very fast. Blood collector arrived on time in the morning. Electronic reports came by evening.", rating: 5 },
  { id: "t-2", name: "Preeti Sharma", role: "Corporate Professional", feedback: "Best diagnostic center in Bangalore. Extremely professional setup and NABL standard test precision.", rating: 5 }
];

const defaultFaqs = [
  { id: "faq-1", question: "How do I book a home collection?", answer: "Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 639 639), or select a health package and complete the check-out." },
  { id: "faq-2", question: "How long does it take to receive reports?", answer: "Most routine report cards (like blood sugar, lipid profiles, and CBC) are delivered via email and WhatsApp within 6 to 12 hours." },
  { id: "faq-3", question: "Which is the best diagnostic lab in Bangalore?", answer: "QXL Diagnostics is considered one of the best diagnostic labs in Bangalore, offering NABL Accredited, doctor-led super speciality testing." },
  { id: "faq-4", question: "Which diagnostic labs in Bangalore are NABL Accredited?", answer: "QXL Diagnostics is fully NABL Accredited, ensuring all pathology and diagnostic tests meet strict national and international quality standards." },
  { id: "faq-5", question: "Which lab provides home blood collection in Bangalore?", answer: "QXL Diagnostics provides free and fast home blood collection across Bangalore. Our trained phlebotomists collect samples from the comfort of your home." },
  { id: "faq-6", question: "Where can I get a blood test at home in Bangalore?", answer: "You can book a blood test at home anywhere in Bangalore with QXL Diagnostics by calling +91 9964 639 639 or booking online." },
  { id: "faq-7", question: "Which is a doctor-led diagnostic laboratory in Bangalore?", answer: "QXL Diagnostics is a doctor-led diagnostic laboratory, with all critical reports reviewed by our expert team of consultant pathologists and microbiologists." },
  { id: "faq-8", question: "Which lab does speciality tests in Bangalore?", answer: "QXL Diagnostics offers over 300 speciality tests including autoimmune panels, molecular diagnostics, allergy testing, and oncology markers." },
  { id: "faq-9", question: "Which is the best reference laboratory in Bangalore?", answer: "QXL Diagnostics serves as a trusted reference laboratory in Bangalore for many clinics and hospitals, thanks to our advanced molecular and histopathology capabilities." },
  { id: "faq-10", question: "Where can I get autoimmune tests in Bangalore?", answer: "QXL Diagnostics performs comprehensive autoimmune testing in Bangalore, including ANA profile, ANA IFA, ANCA, and ENA profile tests." },
  { id: "faq-11", question: "Where can I get an ANA IFA test in Bangalore?", answer: "You can get an accurate ANA IFA test done at QXL Diagnostics, which uses advanced immunofluorescence techniques for autoimmune disease detection." },
  { id: "faq-12", question: "Which lab does allergy testing in Bangalore?", answer: "QXL Diagnostics offers extensive allergy testing in Bangalore, including IgE panels, food allergy, and food intolerance testing." },
  { id: "faq-13", question: "Where can I get histopathology and biopsy testing in Bangalore?", answer: "QXL Diagnostics has a dedicated histopathology department led by Senior Consultant Histopathologist Dr. Pritilata Rout for highly accurate biopsy reporting." },
  { id: "faq-14", question: "Which lab performs advanced oncology testing in Bangalore?", answer: "QXL Diagnostics provides advanced oncology testing, including tumor markers like CEA, CA 125, CA 19-9, and PSA tests in Bangalore." },
  { id: "faq-15", question: "Which lab provides molecular diagnostic testing in Bangalore?", answer: "QXL Diagnostics is equipped with state-of-the-art molecular diagnostic testing, including PCR testing for rapid detection of infectious diseases." }
];

const defaultBlogs = [
  {
    id: "blog-new-19",
    title: "Advances in Clinical Diagnostics 2026: Next-Gen Molecular PCR & High-Throughput Immunoassays in Bengaluru",
    slug: "advances-in-clinical-diagnostics-2026-molecular-pcr-immunoassays",
    excerpt: "Explore the latest 2026 breakthroughs in sub-6-hour real-time PCR pathogen detection, automated chemiluminescence immunoassays, and doctor-led diagnostic protocols at QXL Diagnostics.",
    content: "Rapid clinical precision is transforming patient outcomes in South Bengaluru. As diagnostic technology evolves in 2026, QXL Diagnostics continues to lead with state-of-the-art automated immunoassay systems and multiplex real-time PCR molecular testing.\n\n### Key Clinical Innovations in 2026:\n1. **Sub-6-Hour Pathogen Molecular Panels:** Rapid multiplex PCR testing for respiratory, gastrointestinal, and systemic tropical fever infections.\n2. **High-Throughput Chemiluminescence (CLIA):** Precision hormonal, vitamin D (25-OH), and cardiac marker quantification with sub-nanogram sensitivity.\n3. **Daily Dual-Level Westgard IQC & EQAS Alignment:** Every batch undergoes automated statistical quality control under ISO 15189:2022 standards.\n\nEvery report generated is reviewed and authorized by our senior team of consultant pathologists, clinical biochemists, and microbiologists.",
    author: "Dr. Shantakumar Muruda",
    date: "October 9, 2026",
    created_at: "2026-10-09T08:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg"
  },
  {
    id: "blog-new-14",
    title: "Comprehensive Food-Specific IgG Sensitivity Microarray (287 Foods): A Doctor-Led Guide for Chronic Symptoms",
    slug: "food-specific-igg-287-foods-sensitivity-elimination-guide",
    excerpt: "Struggling with chronic bloating, IBS, migraines, or unexplained fatigue? Discover how high-throughput microarray IgG testing identifies delayed food sensitivities across 287 antigens under medical guidance.",
    content: "Chronic low-grade gut inflammation, irritable bowel symptoms, skin flare-ups, and unexplained lethargy often trace back to delayed non-IgE food sensitivities rather than immediate acute Type-1 allergies. While classical IgE antibodies trigger instant histamine reactions (such as hives or anaphylaxis), food-specific Immunoglobulin G (IgG) antibodies form circulating immune complexes that manifest 24 to 72 hours after consuming culprit foods.\n\n### Why 287-Food Microarray IgG Testing Leads Precision Clinical Nutrition\n1. **High-Throughput Antigens:** Evaluates 287 individual food items spanning dairy, gluten, grains, seafood, spices, nuts, and fruit proteins on advanced microarray platforms.\n2. **Quantitative Staining Ratios:** Pinpoints mild, moderate, and high antibody reactivity for structured elimination diets.\n3. **Clinical Guidance:** Reviewed by consultant biochemists to ensure nutritional adequacy during trial elimination and reintroduction phases.\n\nAt QXL Diagnostics, every food sensitivity report includes personalized dietary guidance validated by senior laboratory consultants.",
    author: "Dr. Shantakumar Muruda",
    date: "October 9, 2026",
    created_at: "2026-10-09T07:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg"
  },
  {
    id: "blog-new-15",
    title: "Emergency Cardiac Biomarkers: Understanding High-Sensitivity Troponin I, hs-CRP & NT-proBNP in Bengaluru",
    slug: "cardiac-biomarkers-hs-troponin-hscrp-nt-probnp-guide",
    excerpt: "Learn why emergency departments and cardiologists rely on high-sensitivity Cardiac Troponin I and hs-CRP for early myocardial injury and heart failure evaluation.",
    content: "Acute chest pressure, dyspnea on exertion, or unexplained palpitations demand immediate medical assessment. High-sensitivity Cardiac Troponin (hs-cTnI) detects subtle myocardial injury within 2 to 4 hours of symptom onset, providing clinicians with invaluable diagnostic clarity.\n\n### Key Cardiovascular Markers Explained:\n- **High-Sensitivity Troponin I (hs-TnI):** Specific biomarker for cardiac cell necrosis, reported with sub-4-hour turnaround for emergency triaging.\n- **hs-CRP (High-Sensitivity C-Reactive Protein):** Measures low-grade arterial wall inflammation and predicts long-term atherosclerotic plaque rupture risk.\n- **NT-proBNP:** Assesses ventricular wall stretch and congestive heart failure progression.\n- **Lipoprotein(a) & Homocysteine:** Independent genetic markers for premature coronary artery disease.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T09:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-new-16",
    title: "Speciality Kidney & Liver Function Testing: eGFR, Cystatin C, Microalbuminuria & Liver Enzyme Ratios",
    slug: "speciality-kidney-liver-function-egfr-cystatin-c-lft-guide",
    excerpt: "An in-depth guide to interpreting Liver Function Tests (LFT) and Kidney Function Tests (KFT), including AST/ALT ratios, eGFR filtration, and early microalbuminuria detection.",
    content: "Silent organ stress often develops without noticeable symptoms. Annual kidney and liver screening provides actionable metrics for early medical intervention.\n\n### Liver Function Test (LFT) Analytes:\n- **Bilirubin (Total, Direct, Indirect):** Assesses hepatic conjugation, bile flow clearance, and hemolytic states.\n- **SGOT (AST) & SGPT (ALT):** Intracellular enzymes indicating hepatocyte stress, alcoholic liver disease, or fatty liver (NAFLD).\n- **Alkaline Phosphatase (ALP) & GGT:** Biomarkers for biliary tract obstruction and cholestasis.\n\n### Kidney Function Test (KFT) Analytes:\n- **Serum Creatinine & eGFR (CKD-EPI):** Precision renal filtration capacity calculation.\n- **Urine Albumin-to-Creatinine Ratio (UACR):** Early detection marker for diabetic nephropathy before routine dipstick proteinuria.",
    author: "Dr. Naveen Kumar N",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
  },
  {
    id: "blog-new-17",
    title: "Allergy IgE Panels vs Food Intolerance: Deciphering Clinical Differences & Specialist Diagnostics",
    slug: "allergy-ige-vs-food-intolerance-clinical-diagnostics-guide",
    excerpt: "Understand the physiological differences between immediate IgE-mediated type-1 hypersensitivity and delayed non-IgE food intolerances for accurate diagnosis.",
    content: "Patients frequently confuse true food allergies with food intolerances. Understanding the distinct immunological pathways is vital for appropriate diagnostic selection.\n\n### IgE Allergy vs Non-IgE Sensitivity:\n- **Type 1 IgE Hypersensitivity:** Rapid onset (minutes to hours), involving mast cell histamine release. Tests: Total IgE & Specific IgE allergen panels.\n- **Enzymatic & Non-IgE Intolerance:** Slow onset (hours to days), involving delayed gastrointestinal sensitivity or enzyme deficiencies (e.g. lactase deficiency).\n\nQXL Diagnostics provides comprehensive specific IgE allergy profiles and 287-food IgG sensitivity panels with phlebotomy home collection across Bengaluru.",
    author: "Dr. Ajitha Pillai",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-new-18",
    title: "Doctor-Led NABL ISO 15189:2022 Diagnostics in Bengaluru: Quality Control & Patient Trust",
    slug: "doctor-led-nabl-iso-15189-2022-diagnostics-bengaluru-quality",
    excerpt: "Explore how QXL Diagnostics combines NABL accredited quality systems (MC-6849), daily Westgard IQC, and consultant doctor sign-offs across Bengaluru.",
    content: "Diagnostic reliability is the cornerstone of effective healthcare. At QXL Diagnostics, every sample collected at home or walk-in hubs undergoes multi-tier quality validation under NABL ISO 15189:2022 guidelines.\n\nFrom automated barcoding and cold-chain sample transit to multi-rule Westgard IQC and MD Pathologist verification, our process guarantees that every report delivered to patients meets strict medical standards.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T07:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-12",
    title: "QXL Yelahanka North Hub: Comprehensive Express Pathology & Home Sample Collection in North Bengaluru",
    slug: "qxl-yelahanka-north-hub-express-pathology-home-collection",
    excerpt: "QXL Diagnostics expands NABL accredited testing with the Yelahanka North Hub opposite RMZ Galleria Mall, offering walk-in diagnostics, 300+ tests, and doorstep collection across North Bengaluru.",
    content: "Residents and families across Yelahanka New Town, Yelahanka Old Town, Sahakarnagar, Hebbal, Vidyaranyapura, and Jakkur now have direct access to NABL Accredited (MC-6849) express pathology at QXL Diagnostics North Hub.\n\n### Strategic Location & Facilities at North Hub\nLocated at L Square, opposite RMZ Galleria Mall, Yelahanka (Bengaluru 560064), our North Hub facility provides:\n- **Walk-in Patient Desk:** 7:00 AM – 8:00 PM (Monday to Sunday) for routine blood draw and urine collection.\n- **Express Phlebotomy Dispatch:** Rapid doorstep sample collection servicing all pincodes in Yelahanka (560064, 560065, 560097, 560092).\n- **Temperature-Controlled Cold Chain Transit:** Samples are sealed in barcoded Vacutainers and transported in thermal carrier units to maintain 100% sample stability.\n\n### Popular Diagnostic Panels at Yelahanka\n- Complete Blood Count (CBC) with Automated Differential\n- HbA1c & Dual Glycemic Profile (Fasting + PP Glucose)\n- Thyroid Care Panel (Ultrasensitive TSH, Free T3, Free T4, Anti-TPO)\n- Quick Fit Package (12+ Parameters) & Executive Health Checkup (80+ Parameters)\n\nSame-day digital reports are delivered directly via WhatsApp and email, validated by senior consultant pathologists.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-13",
    title: "Preventive Full Body Health Checkup Guide 2026: Comparing 80-Parameter Packages vs Advanced Profiles",
    slug: "preventive-full-body-health-checkup-guide-2026-packages-comparison",
    excerpt: "Confused about choosing a health checkup package? Learn how to select between basic preventive screens and 117-parameter comprehensive risk profiles.",
    content: "Preventive health screening is the single most effective way to detect asymptomatic lifestyle disorders—such as fatty liver disease, prediabetes, subclinical thyroiditis, dyslipidemia, and renal strain—before clinical symptoms manifest.\n\n### Key Comparisons: Finding Your Ideal Package\n1. **Essential / Quick Fit Package (12–20 Parameters):** Ideal for young adults (aged 18–35) seeking annual routine monitoring of blood sugar, HbA1c, CBC, lipid ratios, and basic organ function.\n2. **Executive Health Checkup (80+ Parameters):** Recommended for working professionals (aged 30–50) to evaluate Vitamin D3, Vitamin B12, Cardiac Risk Markers (hs-CRP), LFT, KFT, and Thyroid profile.\n3. **Senior Citizen Wellness & Ultra Full Body (100+ Parameters):** Tailored for adults aged 50+ or individuals with family histories of diabetes or cardiovascular disease, including Homocysteine, Electrolytes, Uric Acid, Urine Microalbumin, and Prostate Specific Antigen (PSA) / AMH.\n\nEvery QXL Diagnostics health package includes free doorstep blood collection across Bengaluru and doctor-reviewed reports delivered within 6 to 12 hours.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-new-8",
    title: "Seamless Doorstep Blood Test Booking in Bengaluru with Instant Razorpay Online Payments",
    slug: "seamless-doorstep-blood-test-booking-bengaluru-razorpay",
    excerpt: "Learn how QXL Diagnostics enables 100% free home sample collection across 60+ Bengaluru localities with instant Razorpay online payments and same-day digital reports.",
    content: "Booking a blood test at home in Bengaluru should be effortless, secure, and transparent. With QXL Diagnostics, patients can select 300+ NABL accredited tests or master health checkups, choose a preferred time slot, and pay instantly online via Razorpay (UPI, Google Pay, PhonePe, Cards, Netbanking) or opt for Cash / UPI on collection.\n\n### Why Online Pre-Booking & Instant Razorpay Checkout Matters\n1. **Guaranteed Slot Reservation:** Pre-paying via Razorpay instantly confirms your phlebotomist appointment slot, including urgent early morning (6:00 AM – 8:00 AM) collections.\n2. **256-Bit SSL Encrypted Transactions:** All transactions are processed through Razorpay's PCI-DSS compliant secure payment gateway, ensuring zero fraud risk.\n3. **Transparent Billing:** Clear itemized digital receipts sent immediately to WhatsApp and email with zero hidden collection charges.\n\n### Cold-Chain Sample Transport Standards\nEvery doorstep sample collected in Bengaluru (from Kengeri, Yelahanka, Whitefield, Indiranagar, Koramangala to Electronic City) is immediately sealed in barcoded BD Vacutainer tubes and placed in certified cold-chain insulated transport boxes. Samples reach our central NABL processing lab within 90 minutes for same-day digital reporting.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-9",
    title: "NABL Accredited Diagnostic Centers in Kengeri & Yelahanka: Full Body Checkups with Same-Day Reports",
    slug: "nabl-diagnostic-centers-kengeri-yelahanka-full-body-checkups",
    excerpt: "Discover NABL-certified super speciality diagnostic testing at QXL Diagnostics Main Lab (Kengeri) and North Hub (Yelahanka), offering 300+ tests and 24x7 lab processing.",
    content: "Whether visiting our main lab on Mysore Road in Kengeri or our North Hub opposite RMZ Galleria Mall in Yelahanka, QXL Diagnostics offers state-of-the-art diagnostic facilities for individuals and families across Bengaluru.\n\n### Why Choose NABL Accredited (MC-6849) Testing?\n- **Doctor-Led Clinical Oversight:** Founded by Dr. Shantakumar Muruda, MD (Biochemistry), a senior Clinical Biochemist and NABL Lead Assessor.\n- **Advanced Technology:** Equipped with high-throughput immunoassay analyzers, molecular PCR setups, and automated hematology systems.\n- **Fast Turnaround Time (TAT):** Over 90% of routine diagnostic reports—including CBC, HbA1c, Thyroid Profile, Lipid Profile, LFT, and KFT—are delivered digitally on the same day.\n\n### Neighborhood Coverage Across Bengaluru\nResidents in Kengeri, Yelahanka, Whitefield, Indiranagar, Koramangala, Jayanagar, Nayandahalli, Nagarabhavi, and Vidyaranyapura can access walk-in collection centers or schedule free doorstep home sample collection daily.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-new-10",
    title: "Demystifying Autoimmune Diagnostics: Why ANA IFA & Immunofluorescence Panels Are the Gold Standard",
    slug: "autoimmune-diagnostics-ana-ifa-immunofluorescence-gold-standard",
    excerpt: "Explore how ANA IFA (Indirect Immunofluorescence Assay) detects systemic autoimmune conditions like Lupus (SLE), Sjogren's, and Systemic Sclerosis.",
    content: "Autoimmune disorders affect millions worldwide, occurring when the immune system mistakenly attacks healthy body tissues. Diagnosing conditions such as Systemic Lupus Erythematosus (SLE), Rheumatoid Arthritis, Sjogren's Syndrome, or Autoimmune Hepatitis requires precise laboratory evaluation.\n\n### Why ANA IFA is the Gold Standard\n1. **Superior Sensitivity:** Anti-Nuclear Antibody (ANA) testing by Indirect Immunofluorescence Assay (IFA) on HEp-2 cells is recommended by international rheumatology guidelines over standard ELISA screening.\n2. **Staining Pattern Analysis:** ANA IFA identifies distinct cellular fluorescence patterns—Nuclear Homogeneous, Speckled, Nucleolar, Centromere, and Cytoplasmic—which pinpoint specific autoantibody candidates.\n3. **Refinement via Immunoblotting:** When an ANA IFA test returns positive, QXL Diagnostics conducts comprehensive ENA (Extractable Nuclear Antigen) profile panels to detect anti-dsDNA, anti-SS-A/Ro, anti-SS-B/La, anti-Sm, and anti-Scl-70 antibodies.\n\nEarly autoimmune screening prevents irreversible joint, kidney, and vascular damage.",
    author: "Dr. Ajitha Pillai",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-new-11",
    title: "Rapid Molecular PCR Diagnostic Testing in Bengaluru: Accurate Pathogen Identification in 6 Hours",
    slug: "rapid-molecular-pcr-diagnostic-testing-bengaluru-pathogen-identification",
    excerpt: "Learn how real-time PCR panels rapidly detect viral, bacterial, and fungal pathogens in respiratory, gastrointestinal, and blood infections.",
    content: "Traditional microbial cultures can take 48 to 72 hours to yield definitive pathogen identification. In acute infections—such as severe respiratory illness, fever of unknown origin, viral gastroenteritis, or sepsis—every hour matters.\n\n### Advantages of Real-Time Molecular PCR\n- **Unmatched Sensitivity & Specificity:** Detects microbial DNA/RNA directly, even in low copy numbers or post-antibiotic treatment.\n- **Multiplex Capability:** Single sample testing for multiple pathogens simultaneously (e.g. Dengue, Malaria, Chikungunya, Typhoid, Influenza A/B, RSV).\n- **Sub-6-Hour Reporting:** Rapid turnaround allows treating physicians to initiate targeted antimicrobial therapy immediately, reducing unnecessary broad-spectrum antibiotic use.\n\nQXL Diagnostics operates state-of-the-art molecular diagnostic equipment in Bengaluru, certified under NABL ISO 15189:2022 standards.",
    author: "Dr. Naveen Kumar N",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
  },
  {
    id: "blog-new-6",
    title: "Thyroid Dysfunction & Vitamin D Deficiency: The Twin Silent Epidemics in Urban India",
    slug: "thyroid-dysfunction-vitamin-d-deficiency-twin-epidemics",
    excerpt: "Discover why over 70% of urban adults suffer from undetected Vitamin D and Thyroid hormone imbalances, and how early screening prevents chronic fatigue.",
    content: "Unexplained tiredness, muscle weakness, mood swings, weight fluctuations, and hair thinning are among the most common symptoms reported to general practitioners in urban India. Clinical pathology data from QXL Diagnostics reveals that over 70% of patients presenting with these vague symptoms suffer from concurrent Vitamin D (25-OH) deficiency and Subclinical Hypothyroidism.\n\n### Why Do These Deficiencies Co-Exist?\n1. **Sunlight Avoidance & Indoor Lifestyles:** Modern office routines limit natural UV-B exposure, leading to impaired cutaneous Vitamin D synthesis.\n2. **Autoimmune Interplay:** Low Vitamin D levels are strongly linked to autoimmune thyroiditis (Hashimoto's Thyroiditis). Vitamin D acts as an immunomodulator; its deficiency exacerbates autoimmune thyroid destruction.\n3. **Metabolic Downregulation:** Thyroid hormones regulate cellular energy expenditure. When T3 and T4 levels drop, bone metabolism and nutrient absorption slow down.\n\n### Recommended Biomarker Panel\n- **Serum 25-Hydroxy Vitamin D** (Optimum: 30–100 ng/mL)\n- **Thyroid Profile** (Total T3, Total T4, Ultrasensitive TSH)\n- **Anti-TPO Antibodies** (if TSH is > 4.5 µIU/mL)\n\nEarly identification via a simple fasting blood test enables targeted supplementation and hormonal balance, reversing fatigue before secondary bone loss or lipid derangement occurs.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-7",
    title: "HbA1c vs Fasting Blood Sugar: Why Dual Testing is Essential for Early Diabetes Screening",
    slug: "hba1c-vs-fasting-blood-sugar-dual-testing-diabetes",
    excerpt: "Learn why relying solely on Fasting Blood Glucose can miss early prediabetes, and how HbA1c provides a 90-day glycemic blueprint.",
    content: "India is often termed the diabetes capital of the world, with over 100 million individuals living with diabetes and another 136 million with prediabetes. Yet, many people still rely on a single point-in-time Fasting Blood Sugar (FBS) test for annual health checks.\n\n### The Difference Between FBS and HbA1c\n- **Fasting Blood Sugar (FBS):** Measures instantaneous glucose concentration in plasma after 8–10 hours of fasting. It is heavily influenced by stress, dinner composition, sleep quality, and physical activity the previous evening.\n- **HbA1c (Glycated Hemoglobin):** Measures the percentage of hemoglobin coated with glucose over the 90-day lifespan of red blood cells. It reflects true long-term glycemic control regardless of day-to-day acute fluctuations.\n\n### Clinical Insights: Why Test Both?\n- **Catching Early Prediabetes:** Up to 35% of individuals with normal Fasting Glucose (< 100 mg/dL) demonstrate an elevated HbA1c (5.7% – 6.4%), signifying early insulin resistance.\n- **Estimated Average Glucose (eAG):** Modern NABL laboratories report eAG alongside HbA1c, converting percentages into familiar mg/dL values for easy patient monitoring.\n- **Microvascular Risk Assessment:** Combining FBS, HbA1c, Urine Microalbumin, and Lipid Profile offers complete protection against diabetic nephropathy and cardiovascular complications.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-new-1",
    title: "Hospital Laboratory Management (HLM): Transforming Diagnostic Models in India",
    slug: "hospital-laboratory-management-transforming-models",
    excerpt: "Explore how hybrid onsite-reference laboratory management helps hospitals optimize operating costs while delivering rapid 24x7 emergency diagnostic testing.",
    content: "Hospital Laboratory Management (HLM) is rapidly emerging as an essential operational strategy for healthcare providers in India. Hospitals face rising capital costs for advanced diagnostic equipment, ongoing maintenance contracts, reagent waste from minimum order quantities, and 24×7 staffing challenges.\n\nAt QXL Diagnostics, our HLM model resolves these operational pressures through a flexible hybrid structure:\n\n1. **Onsite Emergency Laboratory:** High-frequency, stat investigations (CBC, Blood Sugar, Electrolytes, Troponin, Basic Coagulation) remain inside the hospital for immediate clinical decision-making.\n2. **Reference Laboratory Integration:** Low-volume, specialised investigations (autoimmune profiles, molecular diagnostics, special chemistry, immunohistochemistry) are transferred directly to QXL's NABL-accredited reference laboratory.\n3. **Quality & Governance:** Full NABL ISO 15189:2022 quality systems, IQC, EQAS, equipment calibration, and senior consultant oversight are integrated into hospital operations.\n\nThis partnership allows hospital administrators to convert fixed laboratory overhead into predictable operational costs while offering patients a comprehensive 1500+ test menu.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-new-2",
    title: "Understanding 19 Key Health Symptoms: When to Get Blood Biomarker Screening",
    slug: "understanding-19-key-health-symptoms-blood-screening",
    excerpt: "From chronic fatigue and dizziness to unexplained weight loss and joint pain, learn how targeted blood testing guides clinical diagnosis.",
    content: "Symptoms like persistent tiredness, recurrent headaches, unexpected weight changes, or hair fall are common reasons patients seek medical care. While symptoms describe how you feel, objective laboratory testing reveals what is occurring at a cellular and metabolic level.\n\nOur medical team has created comprehensive diagnostic guides for 19 core symptoms, explaining:\n\n- **Fatigue & Weakness:** Evaluation of Vitamin D (25-OH), Vitamin B12, Serum Ferritin, Thyroid Stimulating Hormone (TSH), and Complete Blood Count (CBC).\n- **Headaches & Dizziness:** Screening for metabolic imbalance, severe anemia, electrolyte shifts, and glycemic fluctuations.\n- **Unexplained Weight Loss:** Investigating Fasting Glucose, HbA1c, Thyroid Profile, Liver Function, and Inflammatory Markers (ESR/CRP).\n- **Joint & Muscle Aches:** Testing Uric Acid, Rheumatoid Factor (RF), Anti-CCP, ANA, and Bone Mineral Panels.\n\nUnderstanding these biomarker pathways empowers patients to have informed clinical discussions with their treating physicians.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-new-3",
    title: "NABL ISO 15189:2022 Accreditation: What It Means for Sample Precision",
    slug: "nabl-iso-15189-2022-accreditation-sample-precision",
    excerpt: "Learn about internal quality controls (IQC), EQAS proficiency testing, and medical laboratory standards that ensure accurate test reporting.",
    content: "When a doctor makes a clinical decision—whether diagnosing diabetes, monitoring kidney function, or planning cancer therapy—the accuracy of the laboratory report is paramount. NABL Accreditation (MC-6849) under ISO 15189:2022 is the benchmark for medical laboratory competence.\n\nAt QXL Diagnostics, quality assurance encompasses three critical phases:\n\n1. **Pre-Analytical:** Temperature-controlled sample transport, barcoded primary tube validation, and standardized sample preparation.\n2. **Analytical:** Daily Internal Quality Control (IQC) using multi-level controls, regular calibration, and participation in External Quality Assessment Schemes (EQAS).\n3. **Post-Analytical:** Multi-layer result verification and clinical sign-off by senior consultant doctors (MD Pathologists, Biochemists, Microbiologists).\n\nThis rigorous framework ensures that every report delivered to patients and doctors meets international scientific standards.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-4",
    title: "Master Health Checkup Packages: Selecting the Right Full Body Profile",
    slug: "selecting-right-full-body-health-package",
    excerpt: "Comparing Quick Fit, Q-Screen Diabetes, and Q-Master Pro checkups to find the optimal screening for your age and risk profile.",
    content: "Preventive diagnostic screening helps detect asymptomatic metabolic conditions long before clinical complications arise. However, choosing the right checkup profile depends on your age, family history, and lifestyle factors.\n\n- **Quick Fit Package (₹1,770):** 14+ core parameters (FBS, HbA1c, Lipid Profile, LFT, KFT, TSH, Vit D, CBC) ideal for routine annual wellness screening in young adults.\n- **Q-Screen Diabetes Profile (₹1,900):** 16+ targeted parameters including Urine Microalbumin, C-Peptide, and Glycemic Markers for individuals with a family history of diabetes.\n- **Q-Master Health Pro (₹4,600):** 92 comprehensive parameters incorporating Electrolytes, Vit B12, hs-CRP, and H. Pylori IgG for in-depth adult health assessment.\n- **Ultra Full Body Checkup (₹4,999):** 117 parameters adding Homocysteine, Lipoprotein(a), and Complete Iron Panel for advanced cardiovascular risk evaluation.",
    author: "Dr. Ajitha Pillai",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-new-5",
    title: "Free Doorstep Sample Collection Across Bengaluru: Safety & Sample Integrity",
    slug: "free-doorstep-home-sample-collection-bengaluru",
    excerpt: "How certified phlebotomists maintain cold chain storage and tube integrity from your home to our central reference laboratory.",
    content: "Doorstep home collection offers immense convenience, but maintaining sample integrity requires strict technical protocols. From vacuum tube collection to temperature management, every step matters.\n\nQXL Diagnostics provides 100% Free Doorstep Collection across all 60+ Bengaluru localities. Our trained phlebotomists:\n\n- Use pre-labeled, barcoded vacuum collection tubes (BD Vacutainer).\n- Transport samples in insulated thermal cold-chain bags with calibrated gel packs to prevent hemolysis or enzymatic degradation.\n- Deliver samples directly to our 24×7 central reference laboratory in Kengeri for immediate processing.\n\nThis ensures that home-collected blood samples achieve identical analytical accuracy to walk-in laboratory visits.",
    author: "Dr. Naveen Kumar N",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
  },
  {
    id: "blog-1",
    title: "The Future is Now: AI-Assisted Diagnostics at QXL",
    slug: "blood-test-fasting-guidelines-bangalore",
    excerpt: "Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.",
    content: "Artificial Intelligence is transforming healthcare, and at QXL Diagnostics, we are at the forefront of this revolution. By integrating AI algorithms into our diagnostic workflows, our pathologists can identify cellular abnormalities with enhanced analytical precision under senior pathologist supervision.\n\nAI doesn't replace our expert doctors; it acts as a powerful second set of eyes, rapidly analyzing thousands of data points in blood smears and tissue samples to flag potential issues. This reduces human error and significantly decreases turnaround times, meaning you get your results faster without compromising on accuracy.\n\nWhether it's a routine CBC or a complex histopathology report, AI-assisted diagnostics ensure that your doctor receives the most reliable data to guide your treatment.",
    author: "Dr. Shantakumar Muruda",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-2",
    title: "Understanding AMH: Your Guide to Fertility Testing",
    slug: "understanding-amh-fertility-testing",
    excerpt: "Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.",
    content: "Anti-Mullerian Hormone (AMH) is a protein produced by the cells inside the ovarian follicles. Measuring AMH levels in the blood is currently the most accurate way to assess a woman's ovarian reserve—essentially, the number of eggs she has remaining.\n\nUnlike other fertility hormones, AMH levels remain relatively stable throughout the menstrual cycle, meaning the test can be taken on any day. It's an invaluable tool for women planning for pregnancy, those considering IVF, or those experiencing symptoms of PCOS (where AMH is typically elevated).\n\nAt QXL Diagnostics, we use advanced CLIA technology to provide highly accurate AMH results, empowering women with the knowledge they need to make informed family planning decisions.",
    author: "Dr. Pritilata Rout",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-3",
    title: "Allergy Testing: Identifying Your Hidden Triggers",
    slug: "allergy-testing-identifying-triggers",
    excerpt: "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
    content: "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\n\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\n\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
    author: "Dr. Ajitha Pillai",
    date: "October 7, 2026",
    created_at: "2026-10-07T08:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  }
];

const defaultSettings = {
  siteName: "QXL Diagnostics",
  logoText: "QXL",
  logoImage: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto,w_302,h_95,c_fit/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
    supportEmail: "info@qxldiagnostics.com",
  hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
  northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
  workingHours: "Centres: Mon–Sat 7 AM–9 PM, Sun 7 AM–2 PM (24×7 Lab Processing)",
  copyrightText: "© 2026 QXL Diagnostics. All rights reserved.",
  footerDesc: "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals.",
  // Contact info — now comes from backend API via SiteSettings
  phone_display: "+91 9964 639 639",
  phone_e164: "+919964639639",
  whatsapp_number: "919964639639",
  navItems: [
    { label: "Home", href: "/", visible: true },
    { label: "About Us", href: "/about", visible: true },
    { label: "Founder & Consultants", href: "/team", visible: true },
    { label: "Our Specialities", href: "/specialities", visible: true },
    { label: "Packages", href: "/packages", visible: true },
    { label: "Find Nearest Centre", href: "/centers", visible: true },
    { label: "My Bookings", href: "/dashboard", visible: true },
    { label: "My Reports", href: "/report", visible: true },
    { label: "Login", href: "/login", visible: true }
  ]
};

export const cmsStore = {
  // Read operations
  getAll: (key: string): any[] => {
    if (!isClient) return [];
    
    // Always serve the latest packages from defaults so updates show immediately
    if (key === "packages") return defaultPackages;

    if (key === "doctors") return defaultDoctors;

    if (key === "blogs") {
      try {
        const data = localStorage.getItem("qxl_cms_blogs");
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.length < defaultBlogs.length) {
            const existingIds = new Set(parsed.map((b: any) => b.id));
            const missing = defaultBlogs.filter((b) => !existingIds.has(b.id));
            if (missing.length > 0) {
              const merged = [...parsed, ...missing];
              localStorage.setItem("qxl_cms_blogs", JSON.stringify(merged));
              return merged;
            }
          }
          return parsed;
        }
      } catch (e) {
        console.error("CMS blogs read error", e);
      }
      try {
        localStorage.setItem("qxl_cms_blogs", JSON.stringify(defaultBlogs));
      } catch (e) {}
      return defaultBlogs;
    }

    if (key === "banners") {
      try {
        const data = localStorage.getItem("qxl_cms_banners");
        if (data) {
          const parsed = JSON.parse(data);
          let healed = false;
          const healedBanners = parsed.map((b: any) => {
            if (b.image === "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg" || b.id === "banner-1") {
              if (b.image !== "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg" || b.bgFrom !== "#06558f" || b.bgTo !== "#128bc7") {
                b.image = "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg";
                b.bgFrom = "#06558f";
                b.bgTo = "#128bc7";
                healed = true;
              }
            }
            return b;
          });
          if (healed) {
            localStorage.setItem("qxl_cms_banners", JSON.stringify(healedBanners));
          }
          return healedBanners;
        }
      } catch (e) {
        console.error("CMS banners read error", e);
      }
      try {
        localStorage.setItem("qxl_cms_banners", JSON.stringify(defaultBanners));
      } catch (e) {}
      return defaultBanners;
    }

    try {
      const data = localStorage.getItem(`qxl_cms_${key}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("CMS read error for key", key, e);
      return [];
    }
  },

  getSettings: (): any => {
    if (!isClient) return defaultSettings;
    try {
      const data = localStorage.getItem("qxl_cms_settings");
      if (!data) return defaultSettings;
      const parsed = JSON.parse(data);
      
      // Auto-heal missing or empty critical settings
      let healed = false;
      for (const k of Object.keys(defaultSettings)) {
        const val = parsed[k];
        const defVal = (defaultSettings as any)[k];
        if (val === undefined || val === null || val === "" || (Array.isArray(defVal) && (!val || val.length === 0))) {
          parsed[k] = defVal;
          healed = true;
        }
      }
      // Keep legacy Header/Footer keys in sync with the API phone fields.
      if (parsed.phone_display && parsed.contactPhone !== parsed.phone_display) {
        parsed.contactPhone = parsed.phone_display;
        healed = true;
      }
      if (parsed.phone_display && parsed.whatsappNumber !== parsed.phone_display) {
        parsed.whatsappNumber = parsed.phone_display;
        healed = true;
      }
      // Force-migrate any cached copy of the retired number.
      const stale = /99646\s*36848|9964\s*636848|9964636848/;
      for (const key of ["phone_display", "contactPhone", "whatsappNumber", "phone_e164", "whatsapp_number"]) {
        if (typeof parsed[key] === "string" && stale.test(parsed[key])) {
          parsed[key] = (defaultSettings as any)[key] || defaultSettings.phone_display;
          healed = true;
        }
      }

      if (parsed.navItems && Array.isArray(parsed.navItems)) {
        // Auto-migrate menu structure if old items exist
        const hasBook = parsed.navItems.some((item: any) => item.label === "Book a Test");
        const hasDownloadReport = parsed.navItems.some((item: any) => item.label === "Download Report");
        const hasCollab = parsed.navItems.some((item: any) => item.label === "Collaborate with us" || item.label === "Franchise" || item.label === "Collab with us");
        
        if (hasBook || hasDownloadReport || hasCollab) {
          parsed.navItems = defaultSettings.navItems;
          healed = true;
        } else {
          parsed.navItems = parsed.navItems.map((item: any) => {
            if (item.label === "Founder & Advisors" || item.label === "Meet Our Team") {
              item.label = "Founder & Consultants";
              item.href = "/team";
              healed = true;
            }
            return item;
          });
        }
      }

      if (healed) {
        localStorage.setItem("qxl_cms_settings", JSON.stringify(parsed));
      }
      
      return parsed;
    } catch (e) {
      return defaultSettings;
    }
  },

  // Log activity
  logActivity: (action: string) => {
    if (!isClient) return;
    try {
      const logs = cmsStore.getAll("logs");
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: "Admin Manager",
        action
      };
      localStorage.setItem("qxl_cms_logs", JSON.stringify([newLog, ...logs].slice(0, 100)));
      window.dispatchEvent(new CustomEvent("cms-update", { detail: { key: "logs" } }));
    } catch (e) {
      console.error("Log error", e);
    }
  },

  // Save full state
  saveState: (key: string, data: any[]) => {
    if (!isClient) return;
    localStorage.setItem(`qxl_cms_${key}`, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("cms-update", { detail: { key } }));
  },

  // Add Item
  addItem: (key: string, item: any) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const newItem = { ...item, id: `${key.slice(0, 3)}-${Date.now()}` };
    items.unshift(newItem);
    cmsStore.saveState(key, items);
    cmsStore.logActivity(`Added new entry to ${key}: ${item.name || item.title || newItem.id}`);
    return newItem;
  },

  // Update Item
  updateItem: (key: string, id: string, updatedFields: any) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });
    cmsStore.saveState(key, updated);
    cmsStore.logActivity(`Updated ${key} entry: ${updatedFields.name || updatedFields.title || id}`);
  },

  // Delete Item
  deleteItem: (key: string, id: string) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const filtered = items.filter((item) => item.id !== id);
    cmsStore.saveState(key, filtered);
    cmsStore.logActivity(`Deleted entry from ${key} with ID: ${id}`);
  },

  // Save settings specifically
  saveSettings: (settings: any) => {
    if (!isClient) return;
    localStorage.setItem("qxl_cms_settings", JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent("cms-update", { detail: { key: "settings" } }));
    cmsStore.logActivity("Updated general settings");
  },

  // Sync settings from backend API (admin-configured values)
  syncSettingsFromAPI: async () => {
    if (!isClient) return;
    try {
      // Same-origin rewrite (next.config.ts) — avoids CORS / wrong-host failures
      // when NEXT_PUBLIC_API_URL is unset or points at a different origin.
      const response = await fetch("/api/v1/settings", { credentials: "include" });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const apiSettings = await response.json();
      
      // Merge API settings with existing settings. Also mirror the
      // phone_display / whatsapp_number fields onto the legacy
      // contactPhone / whatsappNumber keys that Header/Footer still read.
      const currentSettings = cmsStore.getSettings();
      const mergedSettings = {
        ...currentSettings,
        ...apiSettings, // Backend values override local defaults
        contactPhone: apiSettings.phone_display || currentSettings.contactPhone,
        whatsappNumber: apiSettings.phone_display || currentSettings.whatsappNumber,
      };
      
      cmsStore.saveSettings(mergedSettings);
    } catch (error) {
      // Silently fail — use cached settings if API is unavailable
      console.warn("Failed to sync settings from API:", error);
    }
  }
};
