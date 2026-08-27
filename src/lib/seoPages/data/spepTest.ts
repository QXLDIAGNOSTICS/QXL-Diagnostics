import type { SeoLandingData } from "../types";

export const spepTest: SeoLandingData = {
  slug: "/tests/spep-test-bangalore",
  breadcrumbLabel: "SPEP Test",
  pageType: "test",
  medicalTestName: "Serum Protein Electrophoresis (SPEP) Test",
  price: 1600,
  originalPrice: 2400,
  synonyms: ["SPEP", "Serum Protein Electrophoresis", "M Spike Test", "Monoclonal Band Test", "Serum Immunofixation"],
  reportTat: "24–48 Hours",
  fastingRequired: false,
  sampleType: "Serum Blood",
  parametersCount: 6,
  reviewerName: "Dr. Pritilata Rout",
  reviewerSlug: "dr-pritilata-rout",
  reviewerQuals: "MD Pathology (NIMHANS)",
  references: ["College of American Pathologists (CAP) SPEP Protocol 2025", "International Myeloma Working Group (IMWG) Criteria"],
  heroBadge: "Agarose Gel Electrophoresis | M-Band & Myeloma Screening",
  h1Lead: "SPEP Test in Bangalore —",
  h1Highlight: "Serum Protein Electrophoresis & M-Spike Analysis",
  heroIntro:
    "Serum Protein Electrophoresis (SPEP) separates serum proteins into Albumin, Alpha-1, Alpha-2, Beta, and Gamma globulin fractions to detect monoclonal gammopathies, Multiple Myeloma, Amyloidosis, and immune protein disorders.",
  aiOverviewTitle: "What does an M-Band on SPEP indicate?",
  aiOverview:
    "An M-Band (Monoclonal Spike) on SPEP indicates clonal proliferation of plasma cells producing identical immunoglobulins. It warrants immunofixation electrophoresis (IFE) and serum free light chain (Kappa/Lambda) measurement to evaluate Multiple Myeloma or MGUS.",
  aiOverviewPoints: [
    "Albumin & 5 Globulin Fraction Quantification",
    "M-Spike Densitometric Quantification",
    "Reflex Immunofixation Confirmation",
    "Pathologist Reviewed Densitometer Traces",
  ],
  highlights: [
    {
      icon: "microscope",
      title: "Densitometer Trace Analysis",
      desc: "High-resolution gel electrophoresis with electronic densitometry for exact protein fraction quantification.",
    },
    {
      icon: "shield",
      title: "Multiple Myeloma Workup",
      desc: "Essential screening assay for patients presenting with bone pain, unexplained anaemia, hypercalcemia, or renal dysfunction.",
    },
    {
      icon: "userCheck",
      title: "Senior Histopathologist Review",
      desc: "All abnormal protein bands are reviewed and interpreted by Senior Consultant Pathologists.",
    },
    {
      icon: "home",
      title: "Home Sample Collection",
      desc: "Sample collection across Bengaluru with temperature-regulated cold chain delivery.",
    },
  ],
  sections: [
    {
      heading: "Clinical Indications for SPEP and Immunofixation",
      paragraphs: [
        "SPEP is requested when physicians suspect monoclonal gammopathy of undetermined significance (MGUS), Multiple Myeloma, Waldenström's Macroglobulinemia, or AL Amyloidosis. It is also valuable in evaluating unexplained nephrotic syndrome, chronic liver failure, or severe unexplained hypogammaglobulinemia.",
        "When an M-spike is observed, Immunofixation Electrophoresis (IFE) is performed to type the heavy chain (IgG, IgA, IgM) and light chain (Kappa or Lambda) components, establishing a precise baseline for therapy monitoring.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the cost of SPEP test in Bangalore?",
      a: "Serum Protein Electrophoresis (SPEP) at QXL Diagnostics costs ₹1,600. If Immunofixation Electrophoresis (IFE) is added for M-band characterization, full pricing is confirmed at booking.",
    },
    {
      q: "Is fasting required for SPEP blood test?",
      a: "Fasting is not mandatory for SPEP, though morning collection is recommended to minimize lipemic serum interference.",
    },
  ],
  relatedLinks: [
    { label: "Histopathology Department", href: "/specialities/histopathology-bengaluru", desc: "Tissue & bone marrow biopsy interpretation" },
    { label: "CBC Test", href: "/cbc-test", desc: "Anaemia & rouleaux screening" },
    { label: "Book SPEP Test", href: "/book", desc: "Schedule home sample collection" },
  ],
};
