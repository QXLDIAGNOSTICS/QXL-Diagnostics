import type { SeoLandingData } from "../types";

export const cbcTest: SeoLandingData = {
  slug: "/cbc-test",
  breadcrumbLabel: "CBC Test",
  pageType: "test",
  medicalTestName: "Complete Blood Count (CBC) Test",
  price: 299,
  originalPrice: 450,
  synonyms: ["CBC", "Hemogram", "Complete Blood Count", "CBP", "Full Blood Count", "Haemogram"],
  reportTat: "6 Hours (Same Day)",
  fastingRequired: false,
  sampleType: "EDTA Venous Blood",
  parametersCount: 26,
  reviewerName: "Dr. Naveen Kumar N",
  reviewerSlug: "dr-naveen-kumar-n",
  reviewerQuals: "DCP, DNB Pathology",
  publishedDate: "2026-01-15",
  lastReviewedDate: "August 2026",
  references: [
    "World Health Organization (WHO). Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity. WHO/NMH/NHD/MNM/11.1.",
    "Clinical and Laboratory Standards Institute (CLSI). H20-A2: Quantitative Hematology: Performance Guidelines for Automated Hematology Analyzers.",
    "NABL ISO 15189:2022 Quality Guidelines for Hematology Reference Laboratories."
  ],
  heroBadge: "Complete Blood Count | No Fasting Required | Home Collection",
  h1Lead: "CBC Test in Bangalore —",
  h1Highlight: "Essential Blood Health Assessment",
  heroIntro:
    "The Complete Blood Count (CBC) provides key cellular insights — assisting in evaluation of anaemia, infections, immunity and general health. Book with QXL Diagnostics for home collection across Bengaluru and same-day NABL Accredited reports.",
  aiOverviewTitle: "What does a CBC test measure?",
  aiOverview:
    "A CBC (Complete Blood Count) measures haemoglobin, red blood cells, white blood cells and platelets, plus derived indices like MCV, MCH and MCHC. It detects anaemia, identifies infections and inflammation, and may identify cellular abnormalities requiring further clinical evaluation. At QXL Diagnostics Bangalore it requires no fasting, takes minutes to collect at home, and is reported the same day.",

  aiOverviewPoints: [
    "24+ Parameters in One Test",
    "No Fasting Needed",
    "Same-Day Digital Report",
    "Pathologist-Reviewed Abnormal Smears",
  ],
  highlights: [
    {
      icon: "droplet",
      title: "Anaemia Detection",
      desc: "Haemoglobin, RBC count and indices (MCV, MCH, MCHC) reveal iron, B12 or chronic-disease anaemia patterns.",
    },
    {
      icon: "shield",
      title: "Infection & Inflammation",
      desc: "Total and differential WBC counts flag bacterial or viral infection and immune activation early.",
    },
    {
      icon: "activity",
      title: "Clotting & Bleeding Risk",
      desc: "Platelet count screens for dangerous lows (dengue season) and abnormal clotting tendencies.",
    },
    {
      icon: "microscope",
      title: "Expert Smear Back-Up",
      desc: "Unusual counts trigger a peripheral smear examined by our consultant pathologist before reporting.",
    },
  ],
  sections: [
    {
      heading: "What Is a CBC Test?",
      paragraphs: [
        "The Complete Blood Count examines the three main cellular components of your blood. Red blood cells carry oxygen (measured via haemoglobin and RBC indices); white blood cells fight infection (total count plus neutrophils, lymphocytes, monocytes, eosinophils and basophils); platelets control bleeding. Because every organ depends on these cells, deviations from normal show up here first — which is why doctors reach for a CBC before almost any other investigation.",
        "At QXL Diagnostics, CBC samples are analysed on automated haematology analysers under daily quality control. Counts outside expected ranges are cross-checked with a peripheral blood smear read by Dr. Naveen Kumar N, Consultant Pathologist, so you receive an interpreted result rather than raw numbers alone.",
      ],
    },
    {
      heading: "Who Should Get a CBC — and When",
      paragraphs: [
        "A CBC is recommended when you have fatigue, weakness, frequent infections, unexplained fever, easy bruising or bleeding, breathlessness on exertion, or pale skin. It's also part of routine annual health checkups, pre-surgical workups, pregnancy care, dengue-season monitoring (platelet tracking), and follow-up of known anaemia or blood disorders. There is no age limit — from infants to seniors, it remains the safest first test.",
      ],
    },
    {
      heading: "Key Parameters Reported",
      paragraphs: ["Your CBC report includes:"],
      bullets: [
        "Haemoglobin (Hb), RBC count, Haematocrit (PCV)",
        "Red cell indices — MCV, MCH, MCHC, RDW (anaemia classification)",
        "Total WBC count with differential (neutrophils, lymphocytes, monocytes, eosinophils, basophils)",
        "Platelet count, MPV and platelet distribution width",
      ],
    },
    {
      heading: "Preparation and Collection",
      paragraphs: [
        "No fasting is required — eat and drink normally unless combined with other fasting tests. Collection takes under five minutes by venipuncture; at-home slots are available across Bengaluru throughout the day. Results are typically ready the same day, delivered on WhatsApp and email with reference ranges and flags on abnormal values.",
      ],
    },
  ],
  featureGroup: {
    title: "Understanding Your CBC Report",
    items: [
      {
        title: "Low Haemoglobin",
        desc: "Suggests anaemia. Low MCV points toward iron deficiency; high MCV toward B12/folate deficiency — further tests like iron studies confirm.",
      },
      {
        title: "High WBC Count",
        desc: "Often bacterial infection or inflammation; marked elevation needs clinical correlation and sometimes smear review.",
      },
      {
        title: "Low WBC Count",
        desc: "Can occur with viral infections or marrow suppression; persistent low counts warrant medical evaluation.",
      },
      {
        title: "Low Platelets",
        desc: "Common in dengue and viral fevers; significantly low values are treated as critical and communicated immediately.",
      },
      {
        title: "High Eosinophils",
        desc: "Frequently linked to allergies, asthma or parasitic infection — a clue that allergy testing may help.",
      },
      {
        title: "Abnormal Smear Comment",
        desc: "When our pathologist adds smear findings, they carry diagnostic weight — discuss them with your doctor.",
      },
    ],
  },
  steps: [
    { title: "Book Online or on WhatsApp", desc: "Choose home collection or walk-in at Kengeri/Yelahanka. No fasting needed." },
    { title: "Quick Sample Draw", desc: "A trained phlebotomy specialist collects a small blood sample in sterile EDTA tubes." },
    { title: "Automated Analysis + QC", desc: "Counts run on calibrated haematology analysers with same-shift quality control." },
    { title: "Same-Day Report", desc: "Digital report with all parameters, reference ranges and pathologist comments where relevant." },
  ],
  faqs: [
    {
      q: "What is the cost of a CBC test in Bangalore?",
      a: "CBC pricing in Bangalore varies by laboratory and whether a smear review is included. QXL Diagnostics confirms exact transparent pricing at booking, and the CBC is included in most full body checkup packages at better value. Call or WhatsApp +91 9964 639 639 for today's price.",
    },
    {
      q: "Is fasting required for a CBC test?",
      a: "No. A CBC does not require fasting — you can eat and drink normally beforehand. Only if your doctor has ordered additional fasting tests alongside should you stay fasted.",
    },
    {
      q: "How long does a CBC report take?",
      a: "At QXL Diagnostics, CBC reports are typically available the same day. Samples collected in the morning are usually reported within hours, delivered digitally via WhatsApp and email.",
    },
    {
      q: "Can a CBC detect dengue?",
      a: "A CBC cannot diagnose dengue directly, but falling platelet counts and rising haematocrit during fever strongly support the clinical picture. Confirm dengue with NS1 antigen or IgM/IgG antibody tests, which we also offer with home collection.",
    },
    {
      q: "What do low haemoglobin levels mean?",
      a: "Low haemoglobin indicates anaemia. The CBC's red cell indices help classify it — microcytic (often iron deficiency) versus macrocytic (often B12/folate deficiency). Iron studies, ferritin or vitamin B12 tests usually identify the cause; consult your doctor for interpretation.",
    },
    {
      q: "How often should I get a CBC done?",
      a: "For healthy adults, once a year as part of an annual health checkup is reasonable. During fevers, anaemia treatment, dengue outbreaks or medication monitoring, your doctor may advise more frequent repeats.",
    },
  ],
  relatedLinks: [
    { label: "Iron Profile Test", href: "/blood-test-bangalore", desc: "Find the cause of iron-deficiency anaemia" },
    { label: "Vitamin B12 Test", href: "/vitamin-b12-test", desc: "Macrocytic anaemia & nerve health" },
    { label: "Full Body Checkup", href: "/full-body-checkup-bangalore", desc: "CBC included in complete screening" },
    { label: "Blood Test Bangalore", href: "/blood-test-bangalore", desc: "All 300+ tests with home collection" },
    { label: "Thyroid Test", href: "/thyroid-test", desc: "Fatigue workup partner to CBC" },
    { label: "Book a Test", href: "/book", desc: "Schedule your CBC now" },
  ],
};
