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
    features: ["NABL Certified", "CAP Standards", "Highly Skilled Team", "100% Accurate"]
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
  { id: "doc-1", name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "/images/dr_shantakumar_new.jpg" },
  { id: "doc-2", name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://images.unsplash.com/photo-1594824436998-d70d90db3c80?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-3", name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-4", name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://images.unsplash.com/photo-1537368910025-7028500a2216?auto=format&fit=crop&q=80&w=400" }
];
const defaultPackages = [
  {
    id: "pkg-1",
    name: "QXL Freedom 80 Health Check",
    price: "800",
    old_price: "5800",
    save_amount: "5000",
    includes: "80 Parameters across 8 Major Health Areas: Blood Health (25), Diabetes (3), Liver (12), Kidney & Electrolytes (12), Heart (9), Thyroid (3), Iron & Minerals (5), Complete Urine Examination (11).",
    parameters: "80 Parameters",
    tag: "INDEPENDENCE OFFER",
    most_booked: true,
    benefits: ["80 Parameters Screened", "8 Major Health Areas", "86% OFF Promotional Price"],
    who_should_take: "Recommended for all adults & families for complete preventive care.",
    age: "18+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-fit",
    name: "Quick Fit Package",
    price: "1770",
    old_price: "4696",
    save_amount: "2926",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    parameters: "12+ Parameters",
    tag: "FITNESS",
    benefits: ["Essential fitness screening", "Diabetes & lipid baseline", "Liver & kidney health"],
    who_should_take: "Fitness enthusiasts and individuals seeking routine health screening.",
    age: "18+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-2",
    name: "Q-Screen Diabetes Package",
    price: "1900",
    old_price: "4960",
    save_amount: "3060",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.",
    parameters: "15+ Parameters",
    tag: "DIABETES",
    benefits: ["Early diabetes detection", "Monitor blood sugar control", "Assess kidney impact from diabetes"],
    who_should_take: "Diabetics, pre-diabetics, or those with a family history of diabetes.",
    age: "25+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-3",
    name: "Q-Master Health Pro Package",
    price: "4600",
    old_price: "9600",
    save_amount: "5000",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.",
    parameters: "25+ Parameters",
    tag: "MOST BOOKED",
    most_booked: true,
    benefits: ["Complete systemic evaluation", "Heart risk assessment", "Extensive vitamin & thyroid checks"],
    who_should_take: "Adults seeking a comprehensive annual full-body screening.",
    age: "30+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-4",
    name: "Q-Oncoscreen Package",
    price: "7900",
    old_price: "13600",
    save_amount: "5700",
    includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.",
    parameters: "15+ Parameters",
    tag: "ONCOSCREEN",
    benefits: ["Early detection of tumor markers", "Screening for major cancers", "Assess gastrointestinal health"],
    who_should_take: "Individuals with a family history of cancer or those advised by an oncologist.",
    age: "40+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-5",
    name: "Q-Advanced Arthritis and Autoimmune Panel",
    price: "6900",
    old_price: "12660",
    save_amount: "5760",
    includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.",
    parameters: "20+ Parameters",
    tag: "ARTHRITIS",
    benefits: ["Diagnose joint pain causes", "Assess autoimmune markers", "Comprehensive bone health check"],
    who_should_take: "Individuals experiencing joint pain, stiffness, or suspected autoimmune conditions.",
    age: "35+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  },
  {
    id: "pkg-6",
    name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
    price: "9000",
    old_price: "18900",
    save_amount: "9900",
    includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.",
    parameters: "22+ Parameters",
    tag: "CARDIAC",
    benefits: ["In-depth heart risk assessment", "Detect hidden cardiovascular threats", "Advanced lipid and stress markers"],
    who_should_take: "Individuals with high blood pressure, family history of heart disease, or high stress levels.",
    age: "40+ Years",
    gender: "Male / Female",
    doctor_recommended: true
  }
];

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
  { id: "faq-2", question: "How long does it take to receive reports?", answer: "Most routine report cards (like blood sugar, lipid profiles, and CBC) are delivered via email and WhatsApp within 6 to 12 hours." }
];

const defaultBlogs = [
  {
    id: "blog-1",
    title: "The Future is Now: AI-Assisted Diagnostics at QXL",
    excerpt: "Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.",
    content: "Artificial Intelligence is transforming healthcare, and at QXL Diagnostics, we are at the forefront of this revolution. By integrating AI algorithms into our diagnostic workflows, our pathologists can identify cellular abnormalities with unprecedented precision.\n\nAI doesn't replace our expert doctors; it acts as a powerful second set of eyes, rapidly analyzing thousands of data points in blood smears and tissue samples to flag potential issues. This reduces human error and significantly decreases turnaround times, meaning you get your results faster without compromising on accuracy.\n\nWhether it's a routine CBC or a complex histopathology report, AI-assisted diagnostics ensure that your doctor receives the most reliable data to guide your treatment.",
    author: "Dr. Shantakumar Muruda",
    date: "June 20, 2026",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-2",
    title: "Understanding AMH: Your Guide to Fertility Testing",
    excerpt: "Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.",
    content: "Anti-Mullerian Hormone (AMH) is a protein produced by the cells inside the ovarian follicles. Measuring AMH levels in the blood is currently the most accurate way to assess a woman's ovarian reserve—essentially, the number of eggs she has remaining.\n\nUnlike other fertility hormones, AMH levels remain relatively stable throughout the menstrual cycle, meaning the test can be taken on any day. It's an invaluable tool for women planning for pregnancy, those considering IVF, or those experiencing symptoms of PCOS (where AMH is typically elevated).\n\nAt QXL Diagnostics, we use advanced CLIA technology to provide highly accurate AMH results, empowering women with the knowledge they need to make informed family planning decisions.",
    author: "Dr. Pritilata Rout",
    date: "June 15, 2026",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-3",
    title: "Allergy Testing: Identifying Your Hidden Triggers",
    excerpt: "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
    content: "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\n\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\n\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
    author: "Dr. Ajitha Pillai",
    date: "June 05, 2026",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-4",
    title: "Beyond Cholesterol: Advanced Cardiac Risk Assessment",
    excerpt: "A standard lipid profile isn't always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.",
    content: "For decades, the standard lipid profile (Total Cholesterol, LDL, HDL) has been the gold standard for assessing heart disease risk. However, up to 50% of heart attacks occur in individuals with 'normal' cholesterol levels. This is where advanced cardiac risk assessment comes in.\n\nAt QXL Diagnostics, we test for deeper risk markers such as High-Sensitivity C-Reactive Protein (hs-CRP), which measures dangerous inflammation in the arteries, and Lipoprotein(a), a genetic lipid particle highly associated with early heart disease.\n\nBy looking beyond basic cholesterol, we provide cardiologists with a comprehensive picture of your cardiovascular health, allowing for truly preventative, personalized heart care.",
    author: "Dr. Shantakumar Muruda",
    date: "May 28, 2026",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-5",
    title: "The Science of Kidney Stones: Diagnosis and Analysis",
    excerpt: "Kidney stones are incredibly painful, but analyzing them can prevent future occurrences. Learn about our stone analysis tests.",
    content: "Passing a kidney stone is often described as one of the most painful experiences a person can endure. Unfortunately, if you've had one stone, you are highly likely to develop another. The key to prevention lies in understanding exactly what the stone is made of.\n\nQXL Diagnostics offers advanced Kidney Stone Analysis. If you catch a passed stone, our lab can determine its chemical composition—whether it's calcium oxalate, uric acid, struvite, or cystine.\n\nCoupled with our 24-hour urine metabolic workup and serum kidney function tests, this analysis allows your urologist to prescribe specific dietary changes and medications that effectively stop new stones from forming.",
    author: "Dr. Naveen Kumar N",
    date: "May 15, 2026",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
  },
  {
    id: "blog-6",
    title: "Histopathology: The Gold Standard in Cancer Diagnosis",
    excerpt: "Take a look inside the lab to understand how pathologists examine tissue biopsies to diagnose cancer with certainty.",
    content: "When a suspicious lump or lesion is found, imaging scans can only tell a doctor so much. The definitive diagnosis always relies on histopathology—the microscopic examination of a tissue biopsy.\n\nAt QXL Diagnostics, our highly trained histopathologists prepare tissue samples into wafer-thin slices, stain them, and meticulously examine the cellular architecture under powerful microscopes. We look for abnormal cell shapes, chaotic growth patterns, and invasion into surrounding tissues.\n\nIn cases of cancer, our histopathology reports determine the exact type and grade of the tumor, which is the most critical factor in deciding whether a patient needs surgery, chemotherapy, or radiation.",
    author: "Dr. Pritilata Rout",
    date: "May 02, 2026",
    image: "/image/slide_histopathology.png"
  },
  {
    id: "blog-7",
    title: "Multiplex PCR: Rapid Detection of Infectious Diseases",
    excerpt: "When every hour counts, Multiplex PCR testing identifies multiple viruses and bacteria simultaneously from a single sample.",
    content: "In cases of severe infections like meningitis or acute respiratory distress, waiting days for traditional bacterial cultures to grow is not an option. Doctors need answers immediately to start the correct life-saving antibiotics or antivirals.\n\nQXL Diagnostics utilizes state-of-the-art Multiplex PCR technology. This molecular technique amplifies the DNA or RNA of pathogens, allowing us to test for dozens of different viruses, bacteria, and fungi simultaneously from a single sample (like blood, sputum, or CSF).\n\nWithin hours, we can accurately identify the exact organism causing the infection, revolutionizing the speed and accuracy of infectious disease treatment.",
    author: "Dr. Ajitha Pillai",
    date: "April 20, 2026",
    image: "/image/slide_molecular.png"
  },
  {
    id: "blog-8",
    title: "Demystifying the ANA Test for Autoimmune Diseases",
    excerpt: "What does a positive ANA test mean? Learn how this crucial blood test helps diagnose Lupus, Rheumatoid Arthritis, and more.",
    content: "Autoimmune diseases occur when your immune system mistakenly attacks your own body. Because symptoms like joint pain and fatigue are so vague, diagnosing them can be a long, frustrating process. The Antinuclear Antibody (ANA) test is usually the first step.\n\nAn ANA test detects antibodies that target the nucleus of your own cells. A positive result is a strong indicator of autoimmune conditions like Systemic Lupus Erythematosus (SLE), Sjögren's syndrome, or Scleroderma.\n\nAt QXL Diagnostics, we use advanced Immunofluorescence techniques to not only detect ANA but also determine its 'pattern', providing rheumatologists with crucial clues to pinpoint your exact autoimmune diagnosis.",
    author: "Dr. Pritilata Rout",
    date: "April 08, 2026",
    image: "/image/slide_autoimmune.png"
  },
  {
    id: "blog-9",
    title: "What Makes a 'Super Speciality' Laboratory Different?",
    excerpt: "Not all labs are created equal. Discover the technology, expertise, and quality control that define a super speciality lab.",
    content: "You've likely seen many diagnostic centers in your neighborhood, but what exactly sets a 'Super Speciality' laboratory like QXL Diagnostics apart?\n\nThe difference lies in capabilities and expertise. While routine labs handle basic blood sugar and CBC tests, super speciality labs are equipped with high-end molecular platforms, flow cytometers, and automated immunohistochemistry stainers. We perform complex genetic, oncological, and autoimmune assays that require immense precision.\n\nFurthermore, these complex tests require interpretation by specialized doctors. Our reports are reviewed by consultant pathologists, microbiologists, and biochemists, ensuring that the data provided to your doctor is of the highest clinical standard.",
    author: "Dr. Shantakumar Muruda",
    date: "March 25, 2026",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-10",
    title: "The Importance of Expert-Reviewed Diagnostic Reports",
    excerpt: "A machine can generate numbers, but it takes an expert pathologist to provide a clinically meaningful diagnosis.",
    content: "In an era of automated healthcare, it is easy to assume that a blood test is simply a machine printing out numbers. However, context is everything in medicine.\n\nAt QXL Diagnostics, we mandate that all critical and specialized reports are reviewed by our panel of senior medical consultants before they reach your doctor. Our experts look for subtle discrepancies, correlate findings across different tests, and add clinical interpretation notes that guide treatment.\n\nWhen a borderline result could mean the difference between a cancer diagnosis and a benign condition, the trained eye of an expert pathologist is irreplaceable. This is our commitment to precision care.",
    author: "Dr. Naveen Kumar N",
    date: "March 10, 2026",
    image: "/images/dr_shantakumar_new.jpg"
  },
  {
    id: "blog-11",
    title: "Why AI-Driven Diagnostics in Bangalore is the New Gold Standard",
    excerpt: "Discover how artificial intelligence is changing the diagnostic landscape in Bangalore, led by QXL Diagnostics' advanced clinical protocols.",
    content: "Bangalore, the tech capital of India, is now leading the healthcare revolution with AI-driven diagnostics. Traditional testing methods rely heavily on manual checks, which, despite best efforts, can be subject to human fatigue. At QXL Diagnostics, we merge state-of-the-art laboratory instrumentation with AI-assisted review systems. This dual-verification model ensures that cell counting, pattern recognition in blood films, and tissue scan analyses are conducted with pixel-level precision. The integration of AI algorithms helps identify micro-anomalies that might be missed in early stages, making it the new gold standard for diagnostic care in Bengaluru.",
    author: "Dr. Shantakumar Muruda",
    date: "March 02, 2026",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-12",
    title: "Choosing the Best Super Speciality Lab in Bangalore: What to Look For",
    excerpt: "From NABL certifications to expert medical reviewers, here is why QXL Diagnostics stands out as Bangalore's premier diagnostic center.",
    content: "With diagnostic centers on every corner, choosing the best super speciality lab in Bangalore can be challenging. Key factors to look for include NABL certification, automated analytical platforms, trained phlebotomists for home blood collection, and, most importantly, on-site expert consultant reviews. QXL Diagnostics check all these boxes. We are equipped with Beckman Coulter chemistry lines, Sysmex hematology tracks, and specialized molecular diagnostics equipment. Moreover, every critical report undergoes review by our panel of MD Pathologists and Biochemists. This ensures that you don't just get numbers, but accurate, clinically verified answers for your health.",
    author: "Dr. Naveen Kumar N",
    date: "February 18, 2026",
    image: "/images/dr_shantakumar_new.jpg"
  },
  {
    id: "blog-13",
    title: "QXL Diagnostics: Pioneering Precision Medicine in Bangalore",
    excerpt: "Learn how precision medicine and genomics are being made accessible to patient care in Bangalore through advanced diagnostic panels.",
    content: "Precision medicine is transforming how we treat diseases by tailoring therapies to individual genetic profiles. At QXL Diagnostics, we are proud to be pioneering this field in Bangalore. By offering advanced genomics, oncological markers, and specialized molecular assays, we provide clinicians with the deep insights needed for personalized treatment plans. Whether it's selecting the most effective chemotherapy agent or identifying genetic risk factors for cardiovascular diseases, our lab provides the high-precision data that makes personalized care a reality.",
    author: "Dr. Ajitha Pillai",
    date: "February 05, 2026",
    image: "/image/slide_molecular.png"
  },
  {
    id: "blog-14",
    slug: "80th-independence-day-health-checkup-bengaluru",
    title: "80th Independence Day Health Checkup in Bengaluru – 80 Health Parameters for ₹800",
    excerpt: "Celebrate India's 80th Independence Day with QXL Diagnostics' Freedom 80 Health Check. Get 80 health parameters screened for just ₹800 in Bengaluru.",
    content: `This Independence Day, as India celebrates 80 remarkable years of freedom, QXL Diagnostics invites every Bengaluru family to celebrate the freedom to know your health. Our Freedom 80 Health Check is an Independence Day special campaign offering preventive health screening across 80 health parameters — for just ₹800.\n\nIndia's 80th Independence Day (15th August 2026) is a milestone that calls for reflection — not just on our nation's journey, but on our personal health. Preventive health screening helps you and your family stay informed about important health indicators before symptoms arise.\n\n## What Is the Freedom 80 Health Check?\n\nThe Freedom 80 Health Check is QXL Diagnostics' Independence Day preventive health screening campaign. It covers 80 health parameters across 8 major areas:\n\n- **Blood Health**: 25 parameters including Complete Blood Count (CBC), Haemoglobin, ESR\n- **Diabetes Screening**: Fasting Blood Sugar (FBS), HbA1c, eAG\n- **Liver Function**: 12 parameters including SGOT, SGPT, Bilirubin, Total Protein\n- **Kidney & Electrolytes**: 12 parameters including Creatinine, BUN, Urea, Sodium, Potassium\n- **Heart & Cholesterol**: 9-parameter Lipid Profile including LDL, HDL, Triglycerides\n- **Thyroid Screen**: TSH, Total T3, Total T4\n- **Iron & Minerals**: 5 parameters including Serum Iron, TIBC, Transferrin Saturation\n- **Complete Urine Examination**: 11 parameters\n\n## Why Preventive Health Checkups Matter\n\nMany important health indicators — blood sugar levels, cholesterol, thyroid function — may show changes over time before any noticeable symptoms appear. Routine preventive screening helps you and your doctor stay informed. The Freedom 80 package covers the most clinically relevant parameters for routine adult screening.\n\n## Who Should Consider a Health Checkup?\n\nThe Freedom 80 Health Check is designed for adults aged 18 and above. It is particularly recommended for:\n\n- Individuals who have not had a health check in the past 12 months\n- Adults with a family history of diabetes, thyroid conditions, or cardiac concerns\n- Working professionals in Bengaluru managing busy lifestyles\n- Parents who want to model proactive health habits for their families\n\n## Why Choose QXL Diagnostics in Bengaluru?\n\nQXL Diagnostics is a NABL-accredited (MC-6849) super speciality diagnostic laboratory in Bengaluru, led by Dr. Shantakumar Muruda (MD Biochemistry) and a team of experienced consultant pathologists and microbiologists.\n\n- **NABL Accredited Laboratory** (MC-6849)\n- **Doctor-Led Reporting** — every report reviewed by specialist consultants\n- **Free Home Sample Collection** across Bengaluru\n- **6-Hour Digital Report Delivery** via WhatsApp and email\n- **Two Bengaluru Locations** — Kengeri (Main Lab) and Yelahanka (North Hub)\n- **24×7 Booking & Support**\n\n## How to Book the ₹800 Freedom 80 Checkup?\n\n1. Call or WhatsApp: **+91 9964 639 639**\n2. Visit: **qxldiagnostics.com** and select the Freedom 80 package\n3. Choose home collection or visit our Kengeri or Yelahanka centre\n\n## Frequently Asked Questions\n\n**Is the Freedom 80 Health Check available in Bengaluru?**\nYes. The Freedom 80 Health Check is available for home collection across Bengaluru and at our Kengeri and Yelahanka centres.\n\n**What is included in the 80 health parameters?**\nThe 80 parameters cover Blood Health (25), Diabetes (3), Liver (12), Kidney & Electrolytes (12), Heart & Cholesterol (9), Thyroid (3), Iron & Minerals (5), and Complete Urine Examination (11).\n\n**How much does the Freedom 80 Health Check cost?**\nThe Independence Day promotional price is ₹800.\n\n**Is fasting required?**\nYes, a minimum 8-hour fast is recommended before the blood draw for accurate glucose and lipid readings.\n\n**Where can I book the ₹800 health checkup in Bengaluru?**\nCall +91 9964 639 639, WhatsApp us, or visit qxldiagnostics.com. This offer is valid until 15th August 2026.`,
    author: "Dr. Shantakumar Muruda",
    date: "August 13, 2026",
    category: "Independence Day",
    tags: "80th Independence Day health checkup Bengaluru, Freedom 80 health checkup, 80 health parameters, health checkup ₹800, QXL Diagnostics Bengaluru",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-15",
    slug: "freedom-80-health-checkup-bengaluru",
    title: "Freedom 80 Health Checkup – 80 Health Parameters for ₹800 in Bengaluru",
    excerpt: "Discover QXL Diagnostics' Freedom 80 Health Checkup in Bengaluru. Get 80 health parameters screened for ₹800 as part of the 80th Independence Day campaign.",
    content: `The QXL Diagnostics Freedom 80 Health Checkup is a special Independence Day preventive screening campaign designed to help Bengaluru residents take a comprehensive look at their health — covering 80 parameters across 8 health areas for just ₹800.\n\n## What Is the Freedom 80 Package?\n\nThe Freedom 80 Health Checkup is a curated preventive health panel specifically designed for Indian adults. It provides a broad overview of key health indicators in one affordable test bundle.\n\n### 80 Parameters Across 8 Health Areas\n\n| Health Area | Parameters | Count |\n|---|---|---|\n| Blood Health | CBC, Haemoglobin, Platelet Count, WBC Differential, ESR | 25 |\n| Diabetes Screening | Fasting Blood Sugar, HbA1c, eAG | 3 |\n| Liver Function | SGOT, SGPT, Alkaline Phosphatase, Bilirubin, Total Protein, Albumin | 12 |\n| Kidney & Electrolytes | Creatinine, BUN, Urea, Uric Acid, Sodium, Potassium, Chloride | 12 |\n| Heart & Cholesterol | Total Cholesterol, LDL, HDL, VLDL, Triglycerides, TC/HDL Ratio | 9 |\n| Thyroid Screen | TSH, Total T3, Total T4 | 3 |\n| Iron & Minerals | Serum Iron, TIBC, Transferrin Saturation, Serum Ferritin, UIBC | 5 |\n| Urine Examination | Colour, pH, Protein, Glucose, Ketones, Bilirubin, Urobilinogen, RBC, WBC, Casts, Crystals | 11 |\n\n**Total: 80 Parameters**\n\n## Why Is the Freedom 80 Checkup Being Offered at ₹800?\n\nTo celebrate India's 80th Independence Day (15 August 2026), QXL Diagnostics is offering this comprehensive preventive panel at a special promotional price of ₹800. The campaign theme is simple: **Freedom to Know Your Health.**\n\nThis campaign is about making preventive health screening accessible to all Bengaluru families — across all ages and backgrounds.\n\n## Why Preventive Health Screening Matters\n\nMany common health conditions — including high blood sugar, elevated cholesterol, thyroid imbalances, and anaemia — may not present obvious symptoms in the early stages. Routine screening helps individuals and their doctors track important health indicators over time.\n\nThe Freedom 80 Health Check is not a diagnostic test for specific diseases. It is a preventive screening panel designed to give you and your doctor useful baseline health information.\n\n## Who Can Take the Freedom 80 Checkup?\n\n- Adults aged 18 and above (male or female)\n- Individuals interested in routine preventive health screening\n- Families looking for an affordable annual health awareness tool\n- Those advised by their doctor to monitor blood sugar, cholesterol, or thyroid levels routinely\n\n## How to Book the Freedom 80 Health Checkup\n\n**Call or WhatsApp**: +91 9964 639 639\n**Online**: qxldiagnostics.com\n**Free Home Sample Collection** available across Bengaluru\n**Lab Centres**: Kengeri Main Lab (Mysore Road) | Yelahanka North Hub\n\n## Frequently Asked Questions\n\n**What is included in the Freedom 80 Health Check?**\n80 parameters across blood health, diabetes screening, liver, kidney, heart, thyroid, iron, and urine examination.\n\n**Who can take the Freedom 80 Checkup?**\nAdults aged 18 and above.\n\n**Is the ₹800 price a promotional offer?**\nYes. This is an Independence Day special offer, valid until 15th August 2026.\n\n**Can I get the sample collected at home?**\nYes. QXL Diagnostics offers free home sample collection across Bengaluru.\n\n**How long does it take to get my report?**\nDigital reports are delivered within 6 hours of sample receipt via WhatsApp and email.`,
    author: "Dr. Pritilata Rout",
    date: "August 13, 2026",
    category: "Independence Day",
    tags: "Freedom 80 health checkup, ₹800 health checkup, 80 parameter health checkup, Independence Day health package, QXL Diagnostics Bengaluru",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-16",
    slug: "independence-day-health-checkup-800-bengaluru",
    title: "Independence Day Special Health Checkup for ₹800 – Why This Offer Matters",
    excerpt: "This Independence Day, prioritize your health with an ₹800 health checkup from QXL Diagnostics. Explore the Freedom 80 package with 80 health parameters.",
    content: `Every year, 15th August prompts Indians across the country to reflect on freedom, sacrifice, and the future. This Independence Day — India's 80th — QXL Diagnostics believes that one of the most meaningful things you can do for your family is to understand your health.\n\nThat is the inspiration behind the Freedom 80 Health Check: an ₹800 Independence Day health checkup covering 80 health parameters at QXL Diagnostics, Bengaluru.\n\n## Why an Independence Day Health Checkup?\n\nThe connection between national well-being and individual health is real. A country's strength is built on the health of its families. This Independence Day, the Freedom 80 campaign invites every Bengaluru resident to take one meaningful step: know your numbers.\n\nBlood sugar. Cholesterol. Thyroid. Haemoglobin. Kidney function. Liver enzymes. These are numbers that can tell you a great deal about your health status — and the Freedom 80 checkup covers all of them.\n\n## What the ₹800 Freedom 80 Health Check Includes\n\nThe Freedom 80 Health Check covers 80 parameters across 8 health areas:\n\n**Blood & Hematology (25 parameters)**\nComplete Blood Count, Haemoglobin, Platelet Count, WBC with Differential, ESR, MCV, MCH, MCHC and more.\n\n**Diabetes Screening (3 parameters)**\nFasting Blood Glucose, HbA1c (Glycated Haemoglobin), estimated Average Glucose (eAG).\n\n**Liver Function (12 parameters)**\nSGOT, SGPT, Alkaline Phosphatase, GGT, Bilirubin (Total, Direct, Indirect), Total Protein, Albumin, Globulin, A/G Ratio.\n\n**Kidney & Electrolytes (12 parameters)**\nCreatinine, BUN, Urea, Uric Acid, Sodium, Potassium, Chloride, Calcium, Phosphorus, eGFR.\n\n**Heart & Cholesterol (9 parameters)**\nTotal Cholesterol, LDL, HDL, VLDL, Triglycerides, Non-HDL, TC/HDL Ratio, LDL/HDL Ratio, Atherogenic Index.\n\n**Thyroid Screen (3 parameters)**\nTSH, Total T3, Total T4.\n\n**Iron & Minerals (5 parameters)**\nSerum Iron, TIBC, Transferrin Saturation, Serum Ferritin, UIBC.\n\n**Complete Urine Examination (11 parameters)**\nPhysical characteristics, pH, Protein, Glucose, Ketones, Bilirubin, Urobilinogen, RBC, WBC, Epithelial Cells, Casts.\n\n## Is This a Diagnostic Test or a Preventive Screen?\n\nThe Freedom 80 Health Check is a **preventive health screening panel**. It provides useful baseline data about important health markers. It is not designed to diagnose specific diseases — your doctor will interpret your results in the context of your individual health history and symptoms.\n\n## Why Choose QXL Diagnostics for This Checkup?\n\nQXL Diagnostics is Bengaluru's NABL-accredited (MC-6849) super speciality diagnostic lab. Every report is reviewed by our consultant pathologist team, led by Dr. Shantakumar Muruda (MD Biochemistry).\n\n## How to Book\n\n📞 Call / WhatsApp: **+91 9964 639 639**\n🌐 Website: **qxldiagnostics.com**\n🏠 Free home sample collection across Bengaluru\n⏰ Offer valid until: **15th August 2026**\n\n## Frequently Asked Questions\n\n**Is this offer available for the whole family?**\nYes. Each person in the family can book the Freedom 80 Health Check at ₹800 per person.\n\n**What is the offer validity?**\nThe Independence Day promotional price is valid until 15th August 2026.\n\n**Is the home collection free?**\nYes. Home sample collection is complimentary across Bengaluru.\n\n**How do I receive my report?**\nDigital reports are sent within 6 hours to your WhatsApp and email.`,
    author: "Dr. Shantakumar Muruda",
    date: "August 13, 2026",
    category: "Independence Day",
    tags: "Independence Day health checkup, health offer Bengaluru, ₹800 health checkup Bengaluru, Independence Day medical checkup, health package ₹800",
    image: "/image/slide_heart_health.png"
  },
  {
    id: "blog-17",
    slug: "80-health-parameters-800-health-check",
    title: "80 Health Parameters for ₹800: What Does the Freedom 80 Health Check Include?",
    excerpt: "What is included in the Freedom 80 Health Check? A detailed look at the 80 health parameters covered in QXL Diagnostics' ₹800 Independence Day preventive screening package.",
    content: `One of the most common questions we receive about the Freedom 80 Health Check is: **what exactly are the 80 parameters?** This article provides a complete, transparent breakdown of everything included in QXL Diagnostics' Independence Day preventive screening campaign.\n\n## Understanding the 80-Parameter Framework\n\nThe Freedom 80 Health Check is organised around 8 health areas, each selected for their clinical relevance to routine adult preventive care. Here is a complete look at each category.\n\n---\n\n## 1. Blood Health & Hematology (25 Parameters)\n\nThe Complete Blood Count (CBC) is one of the most fundamental health screening tests, providing information about the cells that make up your blood.\n\nParameters included:\n- Haemoglobin (Hb)\n- RBC Count (Red Blood Cell Count)\n- WBC Count (White Blood Cell Count)\n- Platelet Count\n- Haematocrit (PCV)\n- MCV (Mean Corpuscular Volume)\n- MCH (Mean Corpuscular Haemoglobin)\n- MCHC (Mean Corpuscular Haemoglobin Concentration)\n- RDW-CV & RDW-SD\n- Neutrophils (Absolute & %)\n- Lymphocytes (Absolute & %)\n- Monocytes (Absolute & %)\n- Eosinophils (Absolute & %)\n- Basophils (Absolute & %)\n- ESR (Erythrocyte Sedimentation Rate)\n- MPV, PDW, PCT\n\n---\n\n## 2. Diabetes Screening (3 Parameters)\n\nDiabetes screening is a key preventive health priority for Indian adults.\n\n- **Fasting Blood Sugar (FBS)**: Measures blood glucose after an 8-hour fast\n- **HbA1c (Glycated Haemoglobin)**: Reflects average blood sugar over the past 2–3 months\n- **eAG (Estimated Average Glucose)**: Derived from HbA1c for practical understanding\n\nNote: These tests provide useful health data. A formal diabetes diagnosis requires clinical evaluation by a qualified doctor.\n\n---\n\n## 3. Liver Function Tests (12 Parameters)\n\nThe liver is involved in hundreds of metabolic processes. This panel screens key liver health markers:\n\n- SGOT (AST)\n- SGPT (ALT)\n- Alkaline Phosphatase (ALP)\n- Gamma-GT (GGT)\n- Total Bilirubin\n- Direct Bilirubin\n- Indirect Bilirubin\n- Total Protein\n- Albumin\n- Globulin\n- A/G Ratio\n- Total Bile Acids (optional per clinical protocol)\n\n---\n\n## 4. Kidney & Electrolytes (12 Parameters)\n\n- Creatinine (Serum)\n- eGFR (Estimated Glomerular Filtration Rate)\n- Blood Urea Nitrogen (BUN)\n- Urea\n- Uric Acid\n- Sodium\n- Potassium\n- Chloride\n- Calcium\n- Phosphorus\n- Bicarbonate\n- Anion Gap\n\n---\n\n## 5. Heart & Cholesterol — Lipid Profile (9 Parameters)\n\n- Total Cholesterol\n- LDL Cholesterol (Low-Density Lipoprotein)\n- HDL Cholesterol (High-Density Lipoprotein)\n- VLDL Cholesterol\n- Triglycerides\n- Non-HDL Cholesterol\n- TC/HDL Ratio\n- LDL/HDL Ratio\n- Atherogenic Index of Plasma\n\n---\n\n## 6. Thyroid Screen (3 Parameters)\n\n- TSH (Thyroid Stimulating Hormone)\n- Total T3 (Triiodothyronine)\n- Total T4 (Thyroxine)\n\n---\n\n## 7. Iron & Mineral Studies (5 Parameters)\n\n- Serum Iron\n- TIBC (Total Iron Binding Capacity)\n- Transferrin Saturation\n- Serum Ferritin\n- UIBC (Unsaturated Iron Binding Capacity)\n\n---\n\n## 8. Complete Urine Examination (11 Parameters)\n\n- Colour & Appearance\n- pH\n- Protein\n- Glucose\n- Ketones\n- Bilirubin\n- Urobilinogen\n- RBC (Red Blood Cells)\n- WBC (White Blood Cells)\n- Epithelial Cells\n- Casts & Crystals\n\n---\n\n## Total: 80 Parameters | Price: ₹800\n\nThis panel provides a broad view of your health across blood, metabolic, organ, and hormonal markers — all from a single sample collection appointment.\n\n## Important Note\n\nThe Freedom 80 Health Check is a **preventive screening panel**, not a diagnostic test. Results should always be interpreted by a qualified doctor in the context of your complete medical history.\n\n## How to Book\n\n📞 Call / WhatsApp: **+91 9964 639 639** | 🌐 qxldiagnostics.com\nFree home sample collection across Bengaluru. Offer valid until 15th August 2026.\n\n## Frequently Asked Questions\n\n**Are all 80 parameters from a single blood sample?**\nMost parameters are from a single blood draw plus a urine sample.\n\n**Is fasting required?**\nYes — a minimum 8-hour fast is required for the glucose and lipid parameters.\n\n**Who reviews the report?**\nAll QXL reports are reviewed by our specialist consultant team before delivery.`,
    author: "Dr. Naveen Kumar N",
    date: "August 13, 2026",
    category: "Health Education",
    tags: "80 health parameters ₹800, 80 parameter health check, comprehensive health checkup, blood tests package, Freedom 80 package",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-18",
    slug: "health-checkup-packages-bengaluru-under-1000",
    title: "Health Checkup Packages in Bengaluru Under ₹1,000: Why Consider the ₹800 Freedom 80?",
    excerpt: "Looking for an affordable health checkup in Bengaluru? Explore QXL Diagnostics' ₹800 Freedom 80 Health Check with 80 health parameters — the most comprehensive preventive screening package under ₹1,000.",
    content: `Finding a comprehensive, reliable health checkup package in Bengaluru at an affordable price can be challenging. Most multi-parameter packages at reputable NABL-accredited laboratories are priced significantly higher. The QXL Diagnostics Freedom 80 Health Check — available at ₹800 as an Independence Day special offer — covers 80 health parameters across 8 major areas.\n\nThis article explores what makes the Freedom 80 package a strong consideration if you are looking for health checkup packages in Bengaluru under ₹1,000.\n\n## Why Affordable Preventive Screening Matters\n\nHealth checkups at many diagnostic centres in India often carry a high price tag, making routine annual screening inaccessible for many families. The QXL Diagnostics Freedom 80 campaign is designed specifically to make comprehensive preventive screening accessible for all Bengaluru residents during this Independence Day period.\n\n## What Does the ₹800 Freedom 80 Package Include?\n\nFor ₹800, the Freedom 80 Health Check covers:\n\n| Health Area | Parameters Included | Count |\n|---|---|---|\n| Blood & Hematology | CBC, ESR, Haemoglobin, WBC Differential, Platelet | 25 |\n| Diabetes | FBS, HbA1c, eAG | 3 |\n| Liver Function | SGOT, SGPT, ALP, Bilirubin, Protein, Albumin | 12 |\n| Kidney & Electrolytes | Creatinine, BUN, Urea, Uric Acid, Electrolytes | 12 |\n| Heart & Cholesterol | Lipid Profile — LDL, HDL, Triglycerides | 9 |\n| Thyroid | TSH, T3, T4 | 3 |\n| Iron Studies | Serum Iron, Ferritin, TIBC, Transferrin | 5 |\n| Urine Examination | Physical, Chemical & Microscopy | 11 |\n| **Total** | | **80** |\n\n## What to Look for in a Health Checkup Package Under ₹1,000\n\nWhen comparing affordable health checkup packages in Bengaluru, consider the following:\n\n**1. NABL Accreditation**\nNABL (National Accreditation Board for Testing and Calibration Laboratories) accreditation ensures that the laboratory meets national quality standards for testing accuracy and safety. QXL Diagnostics is NABL accredited (MC-6849).\n\n**2. Doctor-Led Report Review**\nNot all diagnostic centres have consultant doctors reviewing reports. At QXL, all reports are reviewed by our specialist team including Dr. Shantakumar Muruda (MD Biochemistry) before delivery.\n\n**3. Number & Relevance of Parameters**\nA package with a lower price but fewer parameters may miss important screening markers. The Freedom 80 covers the most clinically relevant adult preventive parameters in one draw.\n\n**4. Home Collection Availability**\nFor busy working professionals and elderly individuals, home sample collection is a significant advantage. QXL Diagnostics offers **free home collection across Bengaluru**.\n\n**5. Report Turnaround**\nQXL delivers digital reports within **6 hours** of sample receipt via WhatsApp and email.\n\n## Is the Freedom 80 Package Right for You?\n\nThe Freedom 80 Health Check at ₹800 is appropriate for:\n- Adults aged 18 and above seeking an annual preventive baseline\n- Individuals with no specific health concern but wanting a broad health overview\n- Families who want an affordable, reliable screening option\n- Those recommended by their doctor for routine blood screening\n\n## Offer Details\n\nThe ₹800 Freedom 80 promotional price is part of the 80th Independence Day campaign. **This offer is valid until 15th August 2026.**\n\nAfter the campaign period, the package will revert to its regular pricing.\n\n## How to Book\n\n📞 Call / WhatsApp: **+91 9964 639 639**\n🌐 Website: **qxldiagnostics.com**\n📍 **Kengeri Main Lab**: 3rd Floor, SLN Complex, Mysore Road, Bengaluru – 560 060\n📍 **Yelahanka North Hub**: Opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064\n\n## Frequently Asked Questions\n\n**Is the ₹800 price the final price, with no hidden charges?**\nYes. The ₹800 covers all 80 parameters and home collection. No additional fees.\n\n**Can I book this package for my parents?**\nYes. The Freedom 80 package is suitable for adults of all ages including senior citizens.\n\n**Is this package available year-round?**\nThe ₹800 promotional price is an Independence Day special offer valid until 15th August 2026.`,
    author: "Dr. Shantakumar Muruda",
    date: "August 13, 2026",
    category: "Health Education",
    tags: "health checkup packages Bengaluru under 1000, affordable health checkup Bengaluru, health checkup under ₹1000, ₹800 health package Bengaluru",
    image: "/image/slide_liver_kidney.png"
  },
  {
    id: "blog-19",
    slug: "preventive-health-checkup-bengaluru",
    title: "Preventive Health Checkup in Bengaluru: Why Regular Testing Matters",
    excerpt: "Learn why preventive health checkups and routine laboratory testing can be an important part of maintaining your health. Explore QXL Diagnostics' Freedom 80 checkup.",
    content: `Preventive healthcare is one of the most discussed and yet one of the most underutilised aspects of wellness in India. While most people visit a doctor when they experience symptoms, a large proportion of important health indicators can change over time before any noticeable symptoms appear. This is why preventive health checkups — including routine laboratory testing — are considered an important part of proactive health management.\n\nThis article explores the concept of preventive health screening and why it matters, particularly for adults in Bengaluru.\n\n## What Is a Preventive Health Checkup?\n\nA preventive health checkup (also called a wellness checkup or health screening) is a routine medical evaluation performed on individuals who feel well — not in response to specific symptoms. The goal is to establish baseline health data and identify any changes in key health markers over time.\n\nPreventive health checkups typically include:\n- Blood tests (hematology, metabolic panel, lipid profile, thyroid, glucose)\n- Urine analysis\n- Blood pressure measurement\n- Physical examination by a doctor (in comprehensive packages)\n\n## Why Do Preventive Checkups Matter?\n\nSeveral common health conditions in India show gradual changes in laboratory markers before symptoms appear. These include:\n\n**Blood Sugar Changes**: The spectrum from normal blood sugar to elevated levels is a continuum. Routine HbA1c and fasting glucose testing helps individuals and their doctors monitor blood sugar trends over time.\n\n**Lipid Profile Changes**: Cholesterol and triglyceride levels can be managed more effectively when tracked regularly. The lipid profile is a key component of routine cardiovascular risk assessment.\n\n**Thyroid Function**: Thyroid conditions — including hypothyroidism and hyperthyroidism — are relatively common in India, particularly among women. Routine TSH screening helps identify changes in thyroid function.\n\n**Anaemia and Iron Status**: Iron deficiency is widespread in India, particularly among women and vegetarians. Routine haemoglobin, CBC, and iron studies provide useful data for monitoring.\n\n**Kidney and Liver Health**: Basic kidney and liver function parameters (creatinine, urea, liver enzymes) provide useful information about organ health trends.\n\n## How Often Should You Get a Preventive Checkup?\n\nThe frequency of preventive health screening varies depending on age, family history, and individual risk factors. As a general guide:\n\n- **Ages 18–30**: Once every 1–2 years\n- **Ages 30–45**: Once a year\n- **Ages 45+**: At least once a year, or as recommended by your doctor\n\nYour doctor is the best person to advise you on the appropriate screening frequency for your individual circumstances.\n\n## QXL Diagnostics' Freedom 80 Health Check\n\nTo mark India's 80th Independence Day, QXL Diagnostics is offering the Freedom 80 Health Check — 80 preventive health parameters for ₹800, valid until 15th August 2026.\n\nThe package covers the most clinically relevant adult preventive screening markers: blood health (CBC, ESR), diabetes (FBS, HbA1c), liver, kidney, heart (lipid profile), thyroid, iron studies, and urine examination.\n\n**Why QXL?**\n- NABL Accredited Laboratory (MC-6849)\n- Doctor-led report review\n- Free home sample collection across Bengaluru\n- 6-hour digital report delivery\n- Two convenient centres: Kengeri & Yelahanka\n\n## How to Book a Preventive Health Checkup in Bengaluru\n\n📞 **+91 9964 639 639** | 🌐 **qxldiagnostics.com**\n\n## Frequently Asked Questions\n\n**What is the difference between a preventive checkup and a diagnostic test?**\nA preventive checkup is done when you feel well, to screen important health markers as a baseline. A diagnostic test is ordered by a doctor to investigate specific symptoms or concerns.\n\n**Is fasting required for a preventive health checkup?**\nFor blood sugar and lipid tests (included in the Freedom 80 package), an 8-hour fast is recommended.\n\n**Can I book a preventive checkup for my elderly parents?**\nYes. The Freedom 80 Health Check is suitable for adults of all ages.`,
    author: "Dr. Pritilata Rout",
    date: "August 12, 2026",
    category: "Preventive Health",
    tags: "preventive health checkup Bengaluru, routine health checkup, annual health checkup, comprehensive health screening, blood test Bengaluru",
    image: "/image/slide_womens_wellness.png"
  },
  {
    id: "blog-20",
    slug: "health-checkup-for-parents-bengaluru",
    title: "Health Checkup for Parents: Why Preventive Testing Matters for Your Family",
    excerpt: "Give your parents the gift of preventive health this Independence Day. Explore QXL Diagnostics' Freedom 80 Health Check with 80 health parameters for ₹800 in Bengaluru.",
    content: `For many Indian families, taking care of parents' health becomes increasingly important as they grow older. Yet parents — particularly in India — often resist seeking medical attention unless they have clear symptoms. This Independence Day, one of the most meaningful gifts you can give your parents is a preventive health checkup: a way to understand their health proactively, without waiting for problems to become serious.\n\n## Why Preventive Health Screening Is Particularly Relevant for Parents\n\nAs adults age, the likelihood of changes in key health markers increases. Several important health indicators — blood sugar, cholesterol, thyroid function, kidney health, and haemoglobin — are worth monitoring routinely, particularly for individuals aged 45 and above.\n\nRoutine blood screening provides useful baseline data that helps both your parents and their doctor track health trends over time.\n\n## What Parameters Matter Most for Parents?\n\nBased on the clinical relevance for older adults, the following screening parameters are particularly useful:\n\n**Blood Health (CBC & ESR)**\nA Complete Blood Count can show changes in haemoglobin, white blood cells, and platelets — all important indicators for older adults.\n\n**Diabetes Screening (HbA1c & Fasting Glucose)**\nType 2 diabetes and pre-diabetes are relatively common among older adults in India. Routine HbA1c monitoring is helpful for anyone with a family history of diabetes or those already managing blood sugar.\n\n**Kidney Function (Creatinine, eGFR, BUN)**\nKidney function tends to decline gradually with age. Routine creatinine and eGFR monitoring helps track kidney health trends.\n\n**Thyroid Screen (TSH, T3, T4)**\nThyroid conditions — particularly hypothyroidism — are common in older adults and can cause symptoms like fatigue, weight changes, and cold intolerance that may be mistaken for normal aging.\n\n**Lipid Profile (Cholesterol & Triglycerides)**\nCardiovascular health monitoring is important for older adults, particularly those with lifestyle risk factors.\n\n**Iron Status (Serum Iron, Ferritin, TIBC)**\nAnaemia is more common in older adults, particularly older women. Iron studies can provide useful information about iron stores.\n\n## The QXL Freedom 80 Health Check: For Your Parents, This Independence Day\n\nAll of the parameters above are included in the QXL Diagnostics Freedom 80 Health Check — 80 parameters for ₹800, as part of our 80th Independence Day campaign.\n\n**For parents aged 45+**: The Freedom 80 panel covers the most clinically relevant routine screening parameters in one affordable package.\n\n**For parents aged 60+**: The Freedom 80 is a good starting point. Your parents' doctor may recommend additional specialised tests based on their individual health history.\n\n## Home Collection — No Travel Required\n\nQXL Diagnostics offers **free home sample collection across Bengaluru**. This means your parents don't need to travel to a diagnostic centre — our trained phlebotomist team comes to your home at your preferred time.\n\n## How to Book for Your Parents\n\n📞 Call / WhatsApp: **+91 9964 639 639**\n🌐 Website: **qxldiagnostics.com**\n\nThe Freedom 80 Health Check is ₹800 per person. For both parents, the cost is ₹1,600 total.\n\n**Offer valid until 15th August 2026.**\n\n## Frequently Asked Questions\n\n**Can my elderly parents (75+) take the Freedom 80 Health Check?**\nYes, but we recommend consulting their doctor first to confirm fasting suitability and whether any additional tests are needed.\n\n**Is there a senior citizen discount?**\nThe Freedom 80 at ₹800 is already an Independence Day special promotional price.\n\n**What if my parents have diabetes or are on medication?**\nPlease inform our collection team when booking. Our phlebotomist will guide you on any fasting adjustments needed.`,
    author: "Dr. Shantakumar Muruda",
    date: "August 12, 2026",
    category: "Family Health",
    tags: "health checkup for parents Bengaluru, health checkup for elderly parents, family health checkup Bengaluru, preventive tests for parents, senior health checkup",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-21",
    slug: "independence-day-family-health-checkup",
    title: "From Freedom to Good Health: 5 Health Checks Every Indian Family Should Consider",
    excerpt: "This Independence Day, make health part of your family priorities. Learn why preventive health checks can help families stay informed about their health.",
    content: `India's Independence Day is a time for reflection — on our nation's journey and on our personal priorities. For many Indian families, health often takes a back seat to work, family responsibilities, and daily routines. But this year, as India celebrates 80 years of freedom, QXL Diagnostics invites you to consider making preventive health a family priority.\n\nHere are 5 health checks that every Indian family should consider as part of routine preventive care.\n\n## 1. Blood Health & Anaemia Screen\n\n**Who It's For**: Everyone in the family, from teenagers to grandparents.\n\nA Complete Blood Count (CBC) with ESR and iron studies provides a broad overview of blood health. Iron deficiency anaemia is one of the most common nutritional deficiencies in India — affecting children, women of reproductive age, vegetarians, and older adults.\n\nParameters to include: CBC, ESR, Haemoglobin, Serum Iron, TIBC, Ferritin.\n\n**Why it matters**: Fatigue, weakness, and pale skin can sometimes be related to low haemoglobin or iron — routine screening helps identify these changes early.\n\n## 2. Diabetes Screening\n\n**Who It's For**: Adults aged 25 and above, particularly those with a family history of diabetes.\n\nIndia has one of the highest burdens of type 2 diabetes globally. Routine HbA1c and fasting glucose screening is an important preventive tool for Indian families.\n\nParameters to include: Fasting Blood Sugar (FBS), HbA1c, eAG.\n\n**Why it matters**: Blood sugar changes can occur gradually over time. Routine monitoring helps individuals and their doctors stay informed.\n\n## 3. Heart & Cholesterol Screen\n\n**Who It's For**: Adults aged 30 and above, or younger adults with a family history of heart disease.\n\nCardiovascular conditions are a major public health concern in India. A routine lipid profile — covering Total Cholesterol, LDL, HDL, and Triglycerides — provides important baseline data.\n\nParameters to include: Lipid Profile (9 parameters), hs-CRP (optional in advanced packages).\n\n**Why it matters**: Cholesterol levels can often be managed through lifestyle and medication when identified during routine screening.\n\n## 4. Thyroid Screen\n\n**Who It's For**: Women (particularly aged 25+), and anyone experiencing unexplained fatigue, weight changes, or mood changes.\n\nThyroid conditions — including hypothyroidism and hyperthyroidism — are relatively common in India and can affect energy, weight, mood, and metabolism.\n\nParameters to include: TSH, Total T3, Total T4.\n\n**Why it matters**: Thyroid conditions are manageable with proper medical treatment once identified.\n\n## 5. Kidney & Liver Function Screen\n\n**Who It's For**: Adults aged 30+, particularly those with diabetes, high blood pressure, or a history of medication use.\n\nKidney and liver function tests provide useful information about these vital organ systems. They are part of any comprehensive adult health screening.\n\nParameters to include: Kidney Function Tests (Creatinine, BUN, eGFR), Liver Function Tests (SGOT, SGPT, ALP, Bilirubin).\n\n**Why it matters**: Routine kidney and liver screening provides useful baseline data, particularly for older adults and those on long-term medications.\n\n---\n\n## All 5 Areas — In One Package, for ₹800\n\nThe QXL Diagnostics Freedom 80 Health Check covers all 5 of the above screening areas — plus thyroid, iron studies, and urine examination — across 80 parameters, for ₹800 as part of our Independence Day campaign.\n\nThis offer is valid until **15th August 2026**.\n\n📞 **+91 9964 639 639** | 🌐 **qxldiagnostics.com**\nFree home collection across Bengaluru.\n\n## Frequently Asked Questions\n\n**Can children take the Freedom 80 Health Check?**\nThe Freedom 80 is designed for adults aged 18 and above. For children, please consult a paediatrician for age-appropriate screening.\n\n**Can we book for the whole family together?**\nYes. Call +91 9964 639 639 to book family appointments on the same day.\n\n**Is this package a substitute for seeing a doctor?**\nNo. The Freedom 80 is a preventive screening tool. Your results should be reviewed by a qualified doctor.`,
    author: "Dr. Ajitha Pillai",
    date: "August 12, 2026",
    category: "Family Health",
    tags: "family health checkup, family health screening, Indian family health, preventive healthcare, health checkup for family, family blood tests",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-22",
    slug: "routine-blood-tests-health-checkup",
    title: "What Can Routine Blood Tests Tell You About Your Health?",
    excerpt: "Learn why routine blood testing can be useful for monitoring important aspects of health and why preventive testing should be part of regular healthcare in Bengaluru.",
    content: `Blood tests are among the most powerful tools in medicine — and one of the most accessible forms of health screening available. A routine blood test can provide your doctor with a wealth of information about your overall health, from blood cell counts and organ function to hormone levels and metabolic markers.\n\nThis article explains what routine blood tests measure, what they can indicate, and why they are a useful part of preventive health care.\n\n## What Is a Routine Blood Test?\n\nA routine blood test is a general term for a panel of blood tests ordered as part of preventive health screening — rather than in response to specific symptoms. Common routine blood tests include:\n\n- **Complete Blood Count (CBC)**: Measures red blood cells, white blood cells, haemoglobin, and platelets\n- **Metabolic Panel**: Covers kidney function (creatinine, BUN), liver enzymes (SGOT, SGPT), and electrolytes\n- **Lipid Profile**: Measures cholesterol and triglycerides\n- **Blood Glucose & HbA1c**: Measures blood sugar and 3-month average glucose\n- **Thyroid Function Tests (TSH, T3, T4)**: Assesses thyroid hormone levels\n- **Iron Studies**: Measures iron stores and binding capacity\n\n## What Can These Tests Indicate?\n\n### Complete Blood Count (CBC)\nA CBC provides information about blood cell populations. Changes in haemoglobin, white blood cell count, or platelet count can be relevant to a wide range of conditions — from anaemia and infection to other health changes.\n\n*Important*: A single test result should always be interpreted by a doctor in the context of your complete health history and symptoms. Routine values outside the reference range do not automatically indicate disease.\n\n### Blood Glucose & HbA1c\nFasting blood glucose measures blood sugar after an overnight fast. HbA1c reflects the average blood glucose level over the previous 2–3 months. Together, these two tests are commonly used by doctors for routine diabetes monitoring and preventive screening.\n\n### Lipid Profile\nThe lipid profile measures total cholesterol, LDL (low-density lipoprotein), HDL (high-density lipoprotein), VLDL, and triglycerides. These values contribute to cardiovascular risk assessment and help guide lifestyle and medical decisions.\n\n### Thyroid Function Tests\nTSH (Thyroid Stimulating Hormone) is the primary marker used to assess thyroid function. A TSH outside the normal range may prompt further thyroid evaluation by your doctor.\n\n### Kidney Function Tests\nCreatinine and eGFR (estimated Glomerular Filtration Rate) are key markers of kidney function. Routine monitoring of these values is useful for adults with diabetes, hypertension, or a family history of kidney conditions.\n\n### Liver Enzymes (SGOT & SGPT)\nALT (SGPT) and AST (SGOT) are enzymes that can rise when the liver is under stress. Routine liver enzyme screening is useful baseline data for adults, particularly those taking long-term medications.\n\n## How Often Should You Get Routine Blood Tests?\n\n- **Ages 18–30**: Every 1–2 years if healthy and asymptomatic\n- **Ages 30–45**: Annually\n- **Ages 45+**: Annually or as recommended by your doctor\n\n## The QXL Freedom 80 Health Check\n\nQXL Diagnostics' Freedom 80 Health Check covers all the major routine blood test categories — 80 parameters across 8 health areas — for ₹800 as part of our 80th Independence Day campaign.\n\nNABL Accredited | Doctor-Reviewed Reports | Free Home Collection Across Bengaluru\nOffer valid until **15th August 2026**.\n\n📞 **+91 9964 639 639** | 🌐 **qxldiagnostics.com**\n\n## Frequently Asked Questions\n\n**How should I prepare for a routine blood test?**\nFasting for 8 hours before the test is recommended for accurate glucose and lipid readings.\n\n**What does it mean if my test result is outside the reference range?**\nReference ranges are population-level statistical guides. A result outside the range does not automatically mean something is wrong — your doctor will interpret it in context.\n\n**Can I get routine blood tests done at home?**\nYes. QXL Diagnostics offers free home sample collection across Bengaluru.`,
    author: "Dr. Naveen Kumar N",
    date: "August 12, 2026",
    category: "Health Education",
    tags: "routine blood tests, blood tests Bengaluru, preventive blood tests, health screening blood tests, regular blood test, laboratory health checkup",
    image: "/image/slide_heart_health.png"
  },
  {
    id: "blog-23",
    slug: "independence-day-2026-health-offer-bengaluru",
    title: "Independence Day 2026 Health Offer in Bengaluru – Freedom 80 for ₹800",
    excerpt: "Celebrate Independence Day 2026 with QXL Diagnostics. Book the Freedom 80 Health Check in Bengaluru and get 80 health parameters screened for ₹800. Offer ends 15 August 2026.",
    content: `Independence Day 2026 marks India's 80th year of freedom — a milestone that calls for celebration, reflection, and meaningful action. At QXL Diagnostics, we believe that knowing your health is one of the most empowering steps you can take for yourself and your family.\n\nTo mark this special occasion, we are proud to present the **Freedom 80 Health Check**: 80 health parameters for ₹800, available for a limited time as part of our Independence Day 2026 campaign.\n\n**Offer Valid Until: 15th August 2026 (Midnight IST)**\n\n## The Freedom 80: India's Independence Day Health Campaign\n\nThe number 80 is at the heart of this campaign:\n\n- **80 years** of India's independence\n- **80 health parameters** screened in one visit\n- **₹800** — the campaign price\n\nThe Freedom 80 Health Check is our way of connecting India's journey as a nation with every family's journey toward better health awareness. The campaign theme is simple: **Freedom to Know Your Health.**\n\n## What Does the Freedom 80 Include?\n\nThe Freedom 80 Health Check covers 8 major health areas:\n\n**1. Blood Health (25 parameters)** — CBC, Haemoglobin, ESR, WBC Differential, Platelets\n**2. Diabetes Screening (3 parameters)** — FBS, HbA1c, eAG\n**3. Liver Function (12 parameters)** — SGOT, SGPT, ALP, Bilirubin, Protein, Albumin\n**4. Kidney & Electrolytes (12 parameters)** — Creatinine, BUN, eGFR, Sodium, Potassium\n**5. Heart & Cholesterol (9 parameters)** — Lipid Profile (LDL, HDL, Triglycerides, Total Cholesterol)\n**6. Thyroid Screen (3 parameters)** — TSH, Total T3, Total T4\n**7. Iron & Minerals (5 parameters)** — Serum Iron, Ferritin, TIBC, Transferrin Saturation\n**8. Complete Urine Examination (11 parameters)** — Physical, Chemical & Microscopic analysis\n\n**Total: 80 Parameters. Price: ₹800.**\n\n## Why QXL Diagnostics?\n\nQXL Diagnostics is Bengaluru's NABL-accredited (MC-6849) super speciality diagnostic laboratory.\n\n- **Doctor-Led Laboratory**: Founded and led by Dr. Shantakumar Muruda (MD Biochemistry), with a team of specialist consultant pathologists and microbiologists\n- **NABL Accreditation**: MC-6849 — ensuring quality, accuracy, and reliability\n- **Free Home Sample Collection** across all Bengaluru neighbourhoods\n- **6-Hour Digital Report Delivery** via WhatsApp and email\n- **24×7 Booking Support**: Call or WhatsApp +91 9964 639 639\n- **Two Bengaluru Centres**: Kengeri Main Lab (Mysore Road) | Yelahanka North Hub\n\n## Independence Day 2026: Make Health Part of Your Celebration\n\nThis August 15th, alongside the flag hoisting and national celebrations, consider making one more meaningful gesture: take the first step toward understanding your health.\n\nThe Freedom 80 Health Check is not a diagnostic test for any specific disease. It is a comprehensive preventive screening panel designed to give you and your doctor useful baseline health information.\n\n**Book today. Know your health. Celebrate your freedom.**\n\n## Campaign Offer Details\n\n- **Price**: ₹800 per person (Independence Day promotional price)\n- **Valid Until**: 15th August 2026 (midnight IST)\n- **Available**: Bengaluru (home collection + centre walk-in)\n- **Fasting**: 8-hour fast required for accurate glucose and lipid results\n- **Report Delivery**: Within 6 hours via WhatsApp & email\n\n## How to Book\n\n📞 **Call / WhatsApp**: +91 9964 639 639\n🌐 **Online**: qxldiagnostics.com\n📍 **Kengeri Lab**: 3rd Floor, SLN Complex, Mysore Road, Bengaluru – 560 060\n📍 **Yelahanka Hub**: Opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064\n\n## Frequently Asked Questions\n\n**When does the Independence Day offer end?**\nThe ₹800 Freedom 80 Health Check offer expires at midnight on 15th August 2026.\n\n**Is this offer available for home collection?**\nYes. Free home collection is available across Bengaluru.\n\n**Can I book for the entire family?**\nYes. Each family member can avail the ₹800 offer. Book via call or WhatsApp.\n\n**What happens after 15th August?**\nAfter the campaign period, the Freedom 80 package will be available at its regular price.\n\n**Is the Freedom 80 a diagnostic test?**\nNo. It is a preventive screening panel. All results should be reviewed and interpreted by your doctor.`,
    author: "Dr. Shantakumar Muruda",
    date: "August 13, 2026",
    category: "Independence Day",
    tags: "Independence Day 2026 health offer Bengaluru, Independence Day health checkup, August 15 health offer, Freedom 80 QXL Diagnostics, ₹800 health checkup Bengaluru",
    image: "/image/slide_lab_facility.png"
  }
];

const defaultSettings = {
  siteName: "QXL Diagnostics",
  logoText: "QXL",
  logoImage: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto,w_302,h_95,c_fit/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
    supportEmail: "qxldiagnostics@gmail.com",
  hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
  northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
  workingHours: "Open 24x7",
  copyrightText: "© 2026 QXL Diagnostics. All rights reserved.",
  footerDesc: "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals.",
  // Contact info — now comes from backend API via SiteSettings
  phone_display: "+91 9964 639 639",
  phone_e164: "+919964639639",
  whatsapp_number: "919964639639",
  navItems: [
    { label: "Home", href: "/", visible: true },
    { label: "About Us", href: "/about", visible: true },
    { label: "Founder & Consultants", href: "/founder", visible: true },
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

      // Force update navbar label to "Founder & Consultants" if it is still "Founder & Advisors"
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
            if (item.label === "Founder & Advisors") {
              item.label = "Founder & Consultants";
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
