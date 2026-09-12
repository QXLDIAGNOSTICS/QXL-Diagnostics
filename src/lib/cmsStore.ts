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
    id: "blog-new-1",
    title: "Hospital Laboratory Management (HLM): Transforming Diagnostic Models in India",
    slug: "hospital-laboratory-management-transforming-models",
    excerpt: "Explore how hybrid onsite-reference laboratory management helps hospitals optimize operating costs while delivering rapid 24x7 emergency diagnostic testing.",
    content: "Hospital Laboratory Management (HLM) is rapidly emerging as an essential operational strategy for healthcare providers in India. Hospitals face rising capital costs for advanced diagnostic equipment, ongoing maintenance contracts, reagent waste from minimum order quantities, and 24×7 staffing challenges.\n\nAt QXL Diagnostics, our HLM model resolves these operational pressures through a flexible hybrid structure:\n\n1. **Onsite Emergency Laboratory:** High-frequency, stat investigations (CBC, Blood Sugar, Electrolytes, Troponin, Basic Coagulation) remain inside the hospital for immediate clinical decision-making.\n2. **Reference Laboratory Integration:** Low-volume, specialised investigations (autoimmune profiles, molecular diagnostics, special chemistry, immunohistochemistry) are transferred directly to QXL's NABL-accredited reference laboratory.\n3. **Quality & Governance:** Full NABL ISO 15189:2022 quality systems, IQC, EQAS, equipment calibration, and senior consultant oversight are integrated into hospital operations.\n\nThis partnership allows hospital administrators to convert fixed laboratory overhead into predictable operational costs while offering patients a comprehensive 1500+ test menu.",
    author: "Dr. Shantakumar Muruda",
    date: "September 12, 2026",
    created_at: "2026-09-12T08:00:00Z",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-new-2",
    title: "Understanding 19 Key Health Symptoms: When to Get Blood Biomarker Screening",
    slug: "understanding-19-key-health-symptoms-blood-screening",
    excerpt: "From chronic fatigue and dizziness to unexplained weight loss and joint pain, learn how targeted blood testing guides clinical diagnosis.",
    content: "Symptoms like persistent tiredness, recurrent headaches, unexpected weight changes, or hair fall are common reasons patients seek medical care. While symptoms describe how you feel, objective laboratory testing reveals what is occurring at a cellular and metabolic level.\n\nOur medical team has created comprehensive diagnostic guides for 19 core symptoms, explaining:\n\n- **Fatigue & Weakness:** Evaluation of Vitamin D (25-OH), Vitamin B12, Serum Ferritin, Thyroid Stimulating Hormone (TSH), and Complete Blood Count (CBC).\n- **Headaches & Dizziness:** Screening for metabolic imbalance, severe anemia, electrolyte shifts, and glycemic fluctuations.\n- **Unexplained Weight Loss:** Investigating Fasting Glucose, HbA1c, Thyroid Profile, Liver Function, and Inflammatory Markers (ESR/CRP).\n- **Joint & Muscle Aches:** Testing Uric Acid, Rheumatoid Factor (RF), Anti-CCP, ANA, and Bone Mineral Panels.\n\nUnderstanding these biomarker pathways empowers patients to have informed clinical discussions with their treating physicians.",
    author: "Dr. Pritilata Rout",
    date: "September 10, 2026",
    created_at: "2026-09-10T10:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-new-3",
    title: "NABL ISO 15189:2022 Accreditation: What It Means for Sample Precision",
    slug: "nabl-iso-15189-2022-accreditation-sample-precision",
    excerpt: "Learn about internal quality controls (IQC), EQAS proficiency testing, and medical laboratory standards that ensure accurate test reporting.",
    content: "When a doctor makes a clinical decision—whether diagnosing diabetes, monitoring kidney function, or planning cancer therapy—the accuracy of the laboratory report is paramount. NABL Accreditation (MC-6849) under ISO 15189:2022 is the benchmark for medical laboratory competence.\n\nAt QXL Diagnostics, quality assurance encompasses three critical phases:\n\n1. **Pre-Analytical:** Temperature-controlled sample transport, barcoded primary tube validation, and standardized sample preparation.\n2. **Analytical:** Daily Internal Quality Control (IQC) using multi-level controls, regular calibration, and participation in External Quality Assessment Schemes (EQAS).\n3. **Post-Analytical:** Multi-layer result verification and clinical sign-off by senior consultant doctors (MD Pathologists, Biochemists, Microbiologists).\n\nThis rigorous framework ensures that every report delivered to patients and doctors meets international scientific standards.",
    author: "Dr. Shantakumar Muruda",
    date: "September 08, 2026",
    created_at: "2026-09-08T09:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-new-4",
    title: "Master Health Checkup Packages: Selecting the Right Full Body Profile",
    slug: "selecting-right-full-body-health-package",
    excerpt: "Comparing Quick Fit, Q-Screen Diabetes, and Q-Master Pro checkups to find the optimal screening for your age and risk profile.",
    content: "Preventive diagnostic screening helps detect asymptomatic metabolic conditions long before clinical complications arise. However, choosing the right checkup profile depends on your age, family history, and lifestyle factors.\n\n- **Quick Fit Package (₹1,770):** 14+ core parameters (FBS, HbA1c, Lipid Profile, LFT, KFT, TSH, Vit D, CBC) ideal for routine annual wellness screening in young adults.\n- **Q-Screen Diabetes Profile (₹1,900):** 16+ targeted parameters including Urine Microalbumin, C-Peptide, and Glycemic Markers for individuals with a family history of diabetes.\n- **Q-Master Health Pro (₹4,600):** 92 comprehensive parameters incorporating Electrolytes, Vit B12, hs-CRP, and H. Pylori IgG for in-depth adult health assessment.\n- **Ultra Full Body Checkup (₹4,999):** 117 parameters adding Homocysteine, Lipoprotein(a), and Complete Iron Panel for advanced cardiovascular risk evaluation.",
    author: "Dr. Ajitha Pillai",
    date: "September 05, 2026",
    created_at: "2026-09-05T11:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-new-5",
    title: "Free Doorstep Sample Collection Across Bengaluru: Safety & Sample Integrity",
    slug: "free-doorstep-home-sample-collection-bengaluru",
    excerpt: "How certified phlebotomists maintain cold chain storage and tube integrity from your home to our central reference laboratory.",
    content: "Doorstep home collection offers immense convenience, but maintaining sample integrity requires strict technical protocols. From vacuum tube collection to temperature management, every step matters.\n\nQXL Diagnostics provides 100% Free Doorstep Collection across all 60+ Bengaluru localities. Our trained phlebotomists:\n\n- Use pre-labeled, barcoded vacuum collection tubes (BD Vacutainer).\n- Transport samples in insulated thermal cold-chain bags with calibrated gel packs to prevent hemolysis or enzymatic degradation.\n- Deliver samples directly to our 24×7 central reference laboratory in Kengeri for immediate processing.\n\nThis ensures that home-collected blood samples achieve identical analytical accuracy to walk-in laboratory visits.",
    author: "Dr. Naveen Kumar N",
    date: "September 02, 2026",
    created_at: "2026-09-02T08:30:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
  },
  {
    id: "blog-1",
    title: "The Future is Now: AI-Assisted Diagnostics at QXL",
    slug: "blood-test-fasting-guidelines-bangalore",
    excerpt: "Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.",
    content: "Artificial Intelligence is transforming healthcare, and at QXL Diagnostics, we are at the forefront of this revolution. By integrating AI algorithms into our diagnostic workflows, our pathologists can identify cellular abnormalities with enhanced analytical precision under senior pathologist supervision.\n\nAI doesn't replace our expert doctors; it acts as a powerful second set of eyes, rapidly analyzing thousands of data points in blood smears and tissue samples to flag potential issues. This reduces human error and significantly decreases turnaround times, meaning you get your results faster without compromising on accuracy.\n\nWhether it's a routine CBC or a complex histopathology report, AI-assisted diagnostics ensure that your doctor receives the most reliable data to guide your treatment.",
    author: "Dr. Shantakumar Muruda",
    date: "August 28, 2026",
    created_at: "2026-08-28T10:00:00Z",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-2",
    title: "Understanding AMH: Your Guide to Fertility Testing",
    slug: "understanding-amh-fertility-testing",
    excerpt: "Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.",
    content: "Anti-Mullerian Hormone (AMH) is a protein produced by the cells inside the ovarian follicles. Measuring AMH levels in the blood is currently the most accurate way to assess a woman's ovarian reserve—essentially, the number of eggs she has remaining.\n\nUnlike other fertility hormones, AMH levels remain relatively stable throughout the menstrual cycle, meaning the test can be taken on any day. It's an invaluable tool for women planning for pregnancy, those considering IVF, or those experiencing symptoms of PCOS (where AMH is typically elevated).\n\nAt QXL Diagnostics, we use advanced CLIA technology to provide highly accurate AMH results, empowering women with the knowledge they need to make informed family planning decisions.",
    author: "Dr. Pritilata Rout",
    date: "August 24, 2026",
    created_at: "2026-08-24T10:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
  },
  {
    id: "blog-3",
    title: "Allergy Testing: Identifying Your Hidden Triggers",
    slug: "allergy-testing-identifying-triggers",
    excerpt: "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
    content: "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\n\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\n\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
    author: "Dr. Ajitha Pillai",
    date: "August 20, 2026",
    created_at: "2026-08-20T10:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg"
  },
  {
    id: "blog-4",
    title: "Beyond Cholesterol: Advanced Cardiac Risk Assessment",
    slug: "beyond-cholesterol-cardiac-risk-assessment",
    excerpt: "A standard lipid profile isn't always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.",
    content: "For decades, the standard lipid profile (Total Cholesterol, LDL, HDL) has been the gold standard for assessing heart disease risk. However, up to 50% of heart attacks occur in individuals with 'normal' cholesterol levels. This is where advanced cardiac risk assessment comes in.\n\nAt QXL Diagnostics, we test for deeper risk markers such as High-Sensitivity C-Reactive Protein (hs-CRP), which measures dangerous inflammation in the arteries, and Lipoprotein(a), a genetic lipid particle highly associated with early heart disease.\n\nBy looking beyond basic cholesterol, we provide cardiologists with a comprehensive picture of your cardiovascular health, allowing for truly preventative, personalized heart care.",
    author: "Dr. Shantakumar Muruda",
    date: "August 15, 2026",
    created_at: "2026-08-15T10:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg"
  },
  {
    id: "blog-5",
    title: "The Science of Kidney Stones: Diagnosis and Analysis",
    slug: "science-of-kidney-stones-diagnosis",
    excerpt: "Kidney stones are incredibly painful, but analyzing them can prevent future occurrences. Learn about our stone analysis tests.",
    content: "Passing a kidney stone is often described as one of the most painful experiences a person can endure. Unfortunately, if you've had one stone, you are highly likely to develop another. The key to prevention lies in understanding exactly what the stone is made of.\n\nQXL Diagnostics offers advanced Kidney Stone Analysis. If you catch a passed stone, our lab can determine its chemical composition—whether it's calcium oxalate, uric acid, struvite, or cystine.\n\nCoupled with our 24-hour urine metabolic workup and serum kidney function tests, this analysis allows your urologist to prescribe specific dietary changes and medications that effectively stop new stones from forming.",
    author: "Dr. Naveen Kumar N",
    date: "August 10, 2026",
    created_at: "2026-08-10T10:00:00Z",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg"
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
