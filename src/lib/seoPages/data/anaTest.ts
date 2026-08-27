import type { SeoLandingData } from "../types";

export const anaTest: SeoLandingData = {
  slug: "/tests/ana-test-bangalore",
  breadcrumbLabel: "ANA Test",
  pageType: "test",
  medicalTestName: "Antinuclear Antibody (ANA by IFA) Profile Test",
  price: 1450,
  originalPrice: 2200,
  synonyms: ["ANA Test", "ANA IFA", "ANA Profile", "Antinuclear Antibody Test", "HEp-2 ANA"],
  reportTat: "24 Hours (Next Day)",
  fastingRequired: false,
  sampleType: "Serum Blood",
  parametersCount: 12,
  reviewerName: "Dr. Naveen Kumar N",
  reviewerSlug: "dr-naveen-kumar-n",
  reviewerQuals: "DCP, DNB Pathology",
  references: ["ICAP International Consensus on ANA Patterns 2025", "ACR Guidelines for Rheumatology 2024"],
  heroBadge: "ANA Immunofluorescence (HEp-2 IFA) | Specialist Autoimmune Screening",
  h1Lead: "ANA Profile Test in Bangalore —",
  h1Highlight: "Advanced Autoimmune Disease Screening",
  heroIntro:
    "Antinuclear Antibody (ANA) testing by Indirect Immunofluorescence (IFA) on HEp-2 cells is the gold standard for diagnosing systemic autoimmune conditions including Lupus (SLE), Scleroderma, Sjogren's Syndrome, and Mixed Connective Tissue Disease.",
  aiOverviewTitle: "What does a positive ANA test mean?",
  aiOverview:
    "An ANA (Antinuclear Antibody) test detects autoantibodies targeting cellular nuclei. A positive ANA by IFA (titer ≥ 1:80) indicates immune activation, but must be correlated with staining patterns (homogeneous, speckled, nucleolar, centromere) and an ENA profile before diagnosing autoimmune disease.",
  aiOverviewPoints: [
    "Gold Standard HEp-2 IFA Substrate Assay",
    "Staining Pattern & Titer Interpretation",
    "Followed by ENA 12-Antibody Correlation",
    "Pathologist Reviewed Abnormal Patterns",
  ],
  highlights: [
    {
      icon: "microscope",
      title: "Gold Standard HEp-2 IFA",
      desc: "Uses Indirect Immunofluorescence on HEp-2 substrate for accurate nuclear pattern visualization.",
    },
    {
      icon: "dna",
      title: "12-Parameter ENA Correlation",
      desc: "Pairs with ENA profiles to identify specific autoantibodies (Anti-dsDNA, Sm, SSA/Ro, SSB/La, Scl-70, Jo-1).",
    },
    {
      icon: "userCheck",
      title: "Consultant Pathologist Signed",
      desc: "All immunofluorescence patterns are evaluated and signed off by senior consultant pathologists.",
    },
    {
      icon: "home",
      title: "Home Sample Collection",
      desc: "Free sample collection across all Bengaluru localities under strict cold-chain preservation.",
    },
  ],
  sections: [
    {
      heading: "Understanding ANA Staining Patterns and Titers",
      paragraphs: [
        "Antinuclear antibodies are directed against structures within human cell nuclei. At QXL Diagnostics, ANA testing is performed using HEp-2 cell substrates under fluorescence microscopy. When antibodies bind, distinct patterns emerge under ultraviolet light: homogeneous patterns correlate with SLE and drug-induced lupus; speckled patterns with Sjogren's, SLE, and mixed connective tissue disease; nucleolar patterns with scleroderma; and centromere patterns with CREST syndrome.",
        "Titer strength matters significantly: a low positive titer (1:40 or 1:80) is frequently seen in healthy individuals or non-autoimmune inflammatory states, whereas titers of 1:160, 1:320 or higher carry stronger diagnostic weight when combined with clinical symptoms.",
      ],
    },
    {
      heading: "Who Should Take an ANA Test?",
      paragraphs: [
        "Your physician or rheumatologist may order an ANA profile if you experience persistent joint pain, unexplained fever, malar (butterfly) facial rash, photosensitivity, Raynaud's phenomenon (fingers turning white/blue in cold), chronic fatigue, dry eyes/mouth, or unexplained proteinuria.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the cost of an ANA test in Bangalore?",
      a: "ANA IFA and ANA Profile tests at QXL Diagnostics range from ₹1,200 to ₹1,800 depending on whether an extended ENA blot panel is included. Free home collection across Bengaluru is included.",
    },
    {
      q: "Does a positive ANA always mean I have lupus or an autoimmune disease?",
      a: "No. Up to 15% of healthy individuals have a low-titer positive ANA. A positive result must be interpreted in conjunction with your clinical symptoms and specific ENA autoantibody profiling.",
    },
    {
      q: "How long does the ANA test report take?",
      a: "Because ANA by IFA requires immunofluorescence incubation and expert microscopic review, reports are delivered within 24 hours via WhatsApp and Email.",
    },
  ],
  relatedLinks: [
    { label: "Autoimmune Speciality", href: "/specialities/autoimmune-testing-bengaluru", desc: "Complete immunopathology services" },
    { label: "CBC Test", href: "/cbc-test", desc: "Check white cell & platelet counts" },
    { label: "Doctor Partnership", href: "/doctor-partnership", desc: "B2B referral details for rheumatologists" },
    { label: "Book a Test", href: "/book", desc: "Schedule ANA collection at home" },
  ],
};
