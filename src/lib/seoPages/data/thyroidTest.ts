import type { SeoLandingData } from "../types";

export const thyroidTest: SeoLandingData = {
  slug: "/thyroid-test",
  breadcrumbLabel: "Thyroid Test",
  pageType: "test",
  medicalTestName: "Thyroid Profile (T3, T4, TSH) Test",
  price: 450,
  originalPrice: 750,
  synonyms: ["Thyroid Test", "TFT", "Thyroid Profile", "T3 T4 TSH", "Thyroid Function Test"],
  reportTat: "6–12 Hours (Same Day)",
  fastingRequired: false,
  sampleType: "Serum Venous Blood",
  parametersCount: 3,
  reviewerName: "Dr. Shantakumar Muruda",
  reviewerSlug: "dr-shantakumar-muruda",
  reviewerQuals: "MD Biochemistry, NABL Lead Assessor",
  publishedDate: "2026-01-15",
  lastReviewedDate: "August 2026",
  references: [
    "American Thyroid Association (ATA) Guidelines for Diagnosis and Management of Thyroid Disease.",
    "Indian Thyroid Society (ITS) Consensus Guidelines for Thyroid Disorders in India.",
    "NABL ISO 15189:2022 Immunoassay Reference Standards."
  ],
  heroBadge: "TSH + FT3 + FT4 Complete Profile | Home Collection",
  h1Lead: "Thyroid Test in Bangalore —",
  h1Highlight: "Answers for Fatigue, Weight & Mood Changes",
  heroIntro:
    "A complete thyroid profile at QXL Diagnostics measures TSH with Free T3 and Free T4 — the full picture your doctor needs to diagnose hypothyroidism, hyperthyroidism and autoimmune thyroid disease. Home collection across Bengaluru, same-day reports.",
  aiOverviewTitle: "What does a thyroid profile include?",
  aiOverview:
    "QXL's thyroid test in Bangalore measures Thyroid Stimulating Hormone (TSH) plus Free T3 and Free T4, with Anti-TPO antibodies available for autoimmune thyroiditis (Hashimoto's/Graves'). Testing is done on chemiluminescence immunoassay platforms at our NABL-accredited laboratory, with free home sample collection across Bengaluru.",
  aiOverviewPoints: [
    "TSH, FT3, FT4 Complete Profile",
    "Anti-TPO Antibody Available",
    "CLIA Platform Precision",
    "Same-Day Digital Report",
  ],
  highlights: [
    {
      icon: "thermometer",
      title: "Complete, Not Just TSH",
      desc: "TSH alone misses central hypothyroidism and doesn't show hormone levels directly — we report the full axis.",
    },
    {
      icon: "shield",
      title: "Autoimmune Screening",
      desc: "Anti-TPO antibodies detect Hashimoto's thyroiditis — the most common cause of hypothyroidism in Indian women.",
    },
    {
      icon: "activity",
      title: "Pregnancy-Safe Monitoring",
      desc: "Thyroid disorders in pregnancy affect both mother and baby; we support the tighter monitoring schedules obstetricians require.",
    },
    {
      icon: "fileText",
      title: "Dose-Adjustment Ready Reports",
      desc: "Consistent methodology visit-to-visit means your levothyroxine dose changes are based on comparable numbers.",
    },
  ],
  sections: [
    {
      heading: "Why Thyroid Disorders Are So Common — and So Missed",
      paragraphs: [
        "The thyroid gland regulates how every cell in your body uses energy. When it underperforms (hypothyroidism), everything slows: fatigue, weight gain, cold intolerance, constipation, dry skin, hair fall, low mood, irregular periods. When it overperforms (hyperthyroidism), everything accelerates: palpitations, weight loss, anxiety, heat intolerance, tremor, sleep disturbance. Because these symptoms overlap with ordinary urban life stress, millions of Indians — women especially — carry undiagnosed thyroid disease for years.",
        "A blood test resolves the ambiguity objectively. TSH is the sensitive first signal (rising when the thyroid slows, falling when it races), while Free T3 and Free T4 show actual circulating hormone. Adding Anti-TPO antibodies identifies autoimmune causes that change long-term management.",
      ],
    },
    {
      heading: "Who Should Get a Thyroid Test?",
      paragraphs: [
        "Test if you have persistent fatigue, unexplained weight change, hair thinning, menstrual irregularities, infertility concerns, high cholesterol, depression or anxiety with physical symptoms, or a family history of thyroid disease. Women planning pregnancy or already pregnant should test early — untreated maternal hypothyroidism affects fetal development. Annual screening is sensible for women over 35 and for anyone on thyroid medication (typically every 6–8 weeks after dose changes).",
      ],
    },
    {
      heading: "Understanding Your Results",
      paragraphs: ["Typical patterns your doctor will interpret:"],
      bullets: [
        "High TSH + Low FT4 — primary hypothyroidism; treatment almost always needed",
        "High TSH + Normal FT4 — subclinical hypothyroidism; monitoring or treatment depending on levels and symptoms",
        "Low TSH + High FT4/FT3 — hyperthyroidism; requires prompt medical attention",
        "Positive Anti-TPO — autoimmune thyroiditis; predicts future thyroid failure risk",
        "Normal TSH but persistent symptoms — discuss central hypothyroidism and non-thyroid causes with your doctor",
      ],
    },
    {
      heading: "Preparation and Timing",
      paragraphs: [
        "No fasting is required, though morning collection is traditional and fine to combine with other fasting tests. If you take levothyroxine, ideally collect your sample before the morning tablet (or 12+ hours after) so TSH reflects steady state — mention your medication when booking. Biotin supplements can interfere with immunoassays; pause them a few days before testing if your doctor agrees.",
      ],
    },
  ],
  featureGroup: {
    title: "What Your Thyroid Report Includes",
    items: [
      {
        title: "TSH (Ultrasensitive)",
        desc: "Third-generation assay capable of distinguishing subtle suppression and elevation — essential for dose fine-tuning.",
      },
      {
        title: "Free T4",
        desc: "The active thyroxine fraction not bound to proteins — direct measure of available hormone.",
      },
      {
        title: "Free T3",
        desc: "The more biologically active hormone; disproportionately elevated in hyperthyroid states.",
      },
      {
        title: "Anti-TPO (Optional Add-On)",
        desc: "Antibodies against thyroid peroxidase — marker of Hashimoto's and predictive of future hypothyroidism.",
      },
      {
        title: "Reference Ranges by Context",
        desc: "Ranges vary in pregnancy and age; our reports flag values clearly so your doctor can interpret correctly.",
      },
      {
        title: "Trend Comparison",
        desc: "Repeat tests display previous values side-by-side — making medication effects visible at a glance.",
      },
    ],
  },
  steps: [
    { title: "Book Your Profile", desc: "Choose TSH-only or the complete T3/T4/TSH panel; add Anti-TPO if advised." },
    { title: "Home Collection", desc: "Morning slots preferred for those on thyroid medication; otherwise any time works." },
    { title: "CLIA Analysis", desc: "Chemiluminescence immunoassay at our NABL-accredited Bengaluru laboratory." },
    { title: "Same-Day Report", desc: "Digital delivery with clear flags; abnormal results reviewed by our medical team." },
  ],
  faqs: [
    {
      q: "What is the thyroid test price in Bangalore?",
      a: "Prices vary by panel depth — TSH alone costs less than a complete T3/T4/TSH profile with antibodies. QXL Diagnostics confirms exact pricing at booking, and thyroid profiles are included in most health checkup packages. WhatsApp +91 9964 639 639 for current rates.",
    },
    {
      q: "Is fasting required for a thyroid test?",
      a: "No fasting is required. However, if you take thyroid tablets, collecting blood before your morning dose (or ~12 hours after) gives the most consistent TSH values. Mention your medication when booking and we'll schedule accordingly.",
    },
    {
      q: "Which test is better — TSH alone or full profile?",
      a: "For first-time diagnosis, a complete profile (TSH + FT3 + FT4) gives your doctor the full picture immediately. For routine monitoring on stable medication doses, TSH alone often suffices — follow your doctor's preference.",
    },
    {
      q: "Can thyroid problems cause weight gain and hair loss?",
      a: "Yes — an underactive thyroid slows metabolism causing weight gain, and both hypo- and hyperthyroidism can cause hair thinning. These are among the most common reversible causes we detect through thyroid testing.",
    },
    {
      q: "How often should thyroid levels be checked during pregnancy?",
      a: "Pregnancy demands tighter thyroid control with different reference ranges. Women on thyroid medication typically test every 4–6 weeks in early pregnancy. Share your pregnancy status when booking so reports use appropriate ranges.",
    },
    {
      q: "What do Anti-TPO antibodies mean?",
      a: "Positive Anti-TPO indicates autoimmune thyroiditis (Hashimoto's), the leading cause of hypothyroidism. It predicts higher risk of eventual thyroid failure even when current hormones are normal — guiding how closely your doctor monitors you.",
    },
  ],
  relatedLinks: [
    { label: "CBC Test", href: "/cbc-test", desc: "Anaemia often coexists with thyroid disease" },
    { label: "Vitamin D Test", href: "/vitamin-d-test", desc: "Fatigue workup companion" },
    { label: "Vitamin B12 Test", href: "/vitamin-b12-test", desc: "Overlapping symptoms with hypothyroidism" },
    { label: "Women's Health Checkup", href: "/health-checkup-packages-bangalore", desc: "Panels including thyroid & hormones" },
    { label: "Full Body Checkup", href: "/full-body-checkup-bangalore", desc: "Thyroid included in annual screening" },
    { label: "Book a Test", href: "/book", desc: "Schedule your thyroid profile" },
  ],
};
