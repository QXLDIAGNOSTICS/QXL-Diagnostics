import type { SeoLandingData } from "../types";

export const doubleMarkerTest: SeoLandingData = {
  slug: "/tests/double-marker-test-bangalore",
  breadcrumbLabel: "Double Marker Test",
  pageType: "test",
  medicalTestName: "First Trimester Double Marker Screening Test",
  price: 2200,
  originalPrice: 3200,
  synonyms: ["Double Marker Test", "First Trimester Screening", "PAPP-A and Free Beta HCG", "NT Double Marker"],
  reportTat: "24–48 Hours",
  fastingRequired: false,
  sampleType: "Serum Blood + NT Ultrasound Scan Inputs",
  parametersCount: 2,
  reviewerName: "Dr. Ajitha Pillai",
  reviewerSlug: "dr-ajitha-pillai",
  reviewerQuals: "MD Microbiology & Serology Specialist",
  references: ["Fetal Medicine Foundation (FMF) First Trimester Guidelines 2025", "ACOG Clinical Practice Guideline"],
  heroBadge: "First Trimester Prenatal Screening (11–13.6 Weeks) | FMF Software Risk Calculation",
  h1Lead: "Double Marker Test in Bangalore —",
  h1Highlight: "First Trimester Maternal Risk Screening",
  heroIntro:
    "The Double Marker test measures Free β-hCG and PAPP-A in maternal blood between 11 and 13.6 weeks of pregnancy. Combined with NT ultrasound measurements, it calculates risk for Down Syndrome (Trisomy 21), Edwards Syndrome (Trisomy 18), and Patau Syndrome (Trisomy 13).",
  aiOverviewTitle: "When should the Double Marker test be performed?",
  aiOverview:
    "The Double Marker blood test must be collected between 11 weeks + 0 days and 13 weeks + 6 days of gestation (ideal CRL 45–84 mm). It provides a statistical risk ratio (e.g. 1:2500) rather than a diagnostic confirmation.",
  aiOverviewPoints: [
    "PAPP-A & Free β-hCG Chemiluminescent Immunoassay",
    "FMF-Calibrated Software Risk Calculation",
    "Screening for Trisomy 21, 18, and 13",
    "Same-Day or 24-Hour Express Report Delivery",
  ],
  highlights: [
    {
      icon: "baby",
      title: "First Trimester Safety Window",
      desc: "Optimal screening window between 11w0d and 13w6d gestation for early risk assessment.",
    },
    {
      icon: "activity",
      title: "Dual Marker Precision",
      desc: "Quantifies Pregnancy-Associated Plasma Protein A (PAPP-A) and Free Beta hCG in MoM values.",
    },
    {
      icon: "shield",
      title: "FMF Accredited Software",
      desc: "Risk algorithms incorporate maternal age, weight, smoking status, IVF status, and NT scan millimeter inputs.",
    },
    {
      icon: "home",
      title: "Home Collection Available",
      desc: "Phlebotomist collects blood at your home in Bengaluru with prompt cold-chain lab delivery.",
    },
  ],
  sections: [
    {
      heading: "Interpreting Double Marker Screening Results",
      paragraphs: [
        "Results are expressed as Multiples of the Median (MoM) adjusted for gestational age and maternal weight. In Down Syndrome pregnancies, Free β-hCG MoM is typically elevated (around 2.0 MoM) while PAPP-A MoM is decreased (around 0.5 MoM).",
        "A result categorized as 'Screen Negative' or 'Low Risk' (e.g., 1:1500) indicates a low statistical probability of chromosomal abnormality. If a result is 'Screen Positive' or 'High Risk' (e.g., >1:250), your obstetrician may recommend NIPT (Non-Invasive Prenatal Testing) or diagnostic amniocentesis.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the price of Double Marker test in Bangalore?",
      a: "The Double Marker test at QXL Diagnostics costs ₹2,200, including FMF risk calculation software reporting and free home sample collection across Bengaluru.",
    },
    {
      q: "Do I need an ultrasound scan before taking the Double Marker blood test?",
      a: "Yes. An NT (Nuchal Translucency) ultrasound scan performed within the 11–13.6 week window provides the exact CRL (Crown-Rump Length) and NT measurement in mm, which are required for the risk software calculation.",
    },
  ],
  relatedLinks: [
    { label: "Prenatal Speciality", href: "/specialities/womens-health", desc: "Complete maternal health tests" },
    { label: "Thyroid Test", href: "/thyroid-test", desc: "First trimester TSH monitoring" },
    { label: "Book Double Marker", href: "/book", desc: "Book home sample collection" },
  ],
};
