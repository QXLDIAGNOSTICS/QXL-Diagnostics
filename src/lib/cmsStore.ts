"use client";
 

// CMS Store to manage local state and mock database in the browser using localStorage.

const isClient = typeof window !== 'undefined';

const defaultBanners = [
  {
    id: "banner-1",
    imageOnly: true,
    image: "/image/food_intolerance_banner.jpg",
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
    image: "/image/franchise_banner.png",
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
    image: "/image/user_female_microscope.jpg",
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
    image: "/image/family_clinic_consult.png",
    imageFit: "cover",
    bgFrom: "#f0f9ff",
    bgTo: "#e0f2fe",
    features: ["86+ Tests", "1+1 Offer", "Save 50%", "Home Collection"]
  }
];

const defaultDoctors = [
  { id: "doc-1", name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "/image/dr_shantakumar_v4.jpg" },
  { id: "doc-2", name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "/image/dr_pritilata_v4.jpg" },
  { id: "doc-3", name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "/image/dr_ajitha_latest.jpg" },
  { id: "doc-4", name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "/image/dr_naveen_latest.jpg" }
];

const defaultPackages = [
  {
    id: "pkg-1",
    name: "Quick Fit Package",
    price: "1770",
    old_price: "4696",
    save_amount: "2926",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    parameters: "13+ Parameters",
    tag: "QUICK",
    benefits: ["Quick overall health snapshot", "Check basic organ functions", "Assess immunity & vitamins"],
    who_should_take: "Working professionals with limited time wanting a quick basic checkup.",
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
    tag: "PRO",
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
  { id: "faq-1", question: "How do I book a home collection?", answer: "Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 639639), or select a health package and complete the check-out." },
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
    image: "/image/slide_womens_wellness.png"
  },
  {
    id: "blog-3",
    title: "Allergy Testing: Identifying Your Hidden Triggers",
    excerpt: "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
    content: "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\n\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\n\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
    author: "Dr. Ajitha Pillai",
    date: "June 05, 2026",
    image: "/image/slide_immunity_test_new.png"
  },
  {
    id: "blog-4",
    title: "Beyond Cholesterol: Advanced Cardiac Risk Assessment",
    excerpt: "A standard lipid profile isn't always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.",
    content: "For decades, the standard lipid profile (Total Cholesterol, LDL, HDL) has been the gold standard for assessing heart disease risk. However, up to 50% of heart attacks occur in individuals with 'normal' cholesterol levels. This is where advanced cardiac risk assessment comes in.\n\nAt QXL Diagnostics, we test for deeper risk markers such as High-Sensitivity C-Reactive Protein (hs-CRP), which measures dangerous inflammation in the arteries, and Lipoprotein(a), a genetic lipid particle highly associated with early heart disease.\n\nBy looking beyond basic cholesterol, we provide cardiologists with a comprehensive picture of your cardiovascular health, allowing for truly preventative, personalized heart care.",
    author: "Dr. Shantakumar Muruda",
    date: "May 28, 2026",
    image: "/image/slide_heart_health.png"
  },
  {
    id: "blog-5",
    title: "The Science of Kidney Stones: Diagnosis and Analysis",
    excerpt: "Kidney stones are incredibly painful, but analyzing them can prevent future occurrences. Learn about our stone analysis tests.",
    content: "Passing a kidney stone is often described as one of the most painful experiences a person can endure. Unfortunately, if you've had one stone, you are highly likely to develop another. The key to prevention lies in understanding exactly what the stone is made of.\n\nQXL Diagnostics offers advanced Kidney Stone Analysis. If you catch a passed stone, our lab can determine its chemical composition—whether it's calcium oxalate, uric acid, struvite, or cystine.\n\nCoupled with our 24-hour urine metabolic workup and serum kidney function tests, this analysis allows your urologist to prescribe specific dietary changes and medications that effectively stop new stones from forming.",
    author: "Dr. Naveen Kumar N",
    date: "May 15, 2026",
    image: "/image/slide_liver_kidney.png"
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
    image: "/image/dr_shantakumar_v4.jpg"
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
    image: "/image/dr_shantakumar_v4.jpg"
  },
  {
    id: "blog-13",
    title: "QXL Diagnostics: Pioneering Precision Medicine in Bangalore",
    excerpt: "Learn how precision medicine and genomics are being made accessible to patient care in Bangalore through advanced diagnostic panels.",
    content: "Precision medicine is transforming how we treat diseases by tailoring therapies to individual genetic profiles. At QXL Diagnostics, we are proud to be pioneering this field in Bangalore. By offering advanced genomics, oncological markers, and specialized molecular assays, we provide clinicians with the deep insights needed for personalized treatment plans. Whether it's selecting the most effective chemotherapy agent or identifying genetic risk factors for cardiovascular diseases, our lab provides the high-precision data that makes personalized care a reality.",
    author: "Dr. Ajitha Pillai",
    date: "February 05, 2026",
    image: "/image/slide_molecular.png"
  }
];

const defaultSettings = {
  siteName: "QXL Diagnostics",
  logoText: "QXL",
  logoImage: "/image/Logo (1).png",
  contactPhone: "+91 99646 39639",
  supportEmail: "qxldiagnostics@gmail.com",
  hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
  northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
  workingHours: "Open 24x7",
  whatsappNumber: "+91 99646 39639",
  copyrightText: "© 2026 QXL Diagnostics. All rights reserved.",
  footerDesc: "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals.",
  navItems: [
    { label: "Home", href: "/", visible: true },
    { label: "About Us", href: "/about", visible: true },
    { label: "Founder & Consultants", href: "/founder", visible: true },
    { label: "Our Specialities", href: "/specialities", visible: true },
    { label: "Packages", href: "/packages", visible: true },
    { label: "Book a Test", href: "/book", visible: true },
    { label: "Find Nearest Centre", href: "/centers", visible: true },
    { label: "Download Report", href: "/report", visible: true },
    { label: "Collaborate with us", href: "/franchise", visible: true },
    { label: "Login", href: "/login", visible: true }
  ]
};

export const cmsStore = {
  // Read operations
  getAll: (key: string): any[] => {
    if (!isClient) return [];
    
    // Always serve the latest packages from defaults so updates show immediately
    if (key === "packages") return defaultPackages;

    if (key === "doctors") {
      try {
        const data = localStorage.getItem("qxl_cms_doctors");
        if (data) {
          const parsed = JSON.parse(data);
          let healed = false;
          const healedDocs = parsed.map((doc: any) => {
            if (doc.image && (doc.image.includes("dr_pritilata_latest.jpg") || doc.image.includes("dr_pritilata_latest_bak.jpg") || doc.image.includes("dr_pritilata_v3.jpg"))) {
              doc.image = "/image/dr_pritilata_v4.jpg";
              healed = true;
            }
            if (doc.image && (doc.image.includes("dr_shantakumar_latest.jpg") || doc.image.includes("dr_shantakumar_latest_bak.jpg") || doc.image.includes("dr_shantakumar_v3.jpg"))) {
              doc.image = "/image/dr_shantakumar_v4.jpg";
              healed = true;
            }
            return doc;
          });
          if (healed) {
            localStorage.setItem("qxl_cms_doctors", JSON.stringify(healedDocs));
          }
          return healedDocs;
        }
      } catch (e) {
        console.error("CMS doctors heal error", e);
      }
      return defaultDoctors;
    }

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
            if (b.image === "/image/food_intolerance_banner.png" || b.id === "banner-1") {
              if (b.image !== "/image/food_intolerance_banner.jpg" || b.bgFrom !== "#06558f" || b.bgTo !== "#128bc7") {
                b.image = "/image/food_intolerance_banner.jpg";
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

      // Force update navbar label to "Founder & Consultants" if it is still "Founder & Advisors"
      if (parsed.navItems && Array.isArray(parsed.navItems)) {
        parsed.navItems = parsed.navItems.map((item: any) => {
          if (item.label === "Founder & Advisors") {
            item.label = "Founder & Consultants";
            healed = true;
          }
          if (item.href === "/franchise" && (item.label === "Franchise" || item.label === "Collab with us")) {
            item.label = "Collaborate with us";
            healed = true;
          }
          return item;
        });
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
  }
};
