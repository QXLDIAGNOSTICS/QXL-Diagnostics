import { topTests } from '../testsData';

export interface DynamicPageData {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1Title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  discountPercent: string;
  parametersCount: string;
  sampleType: string;
  fastingRequired: string;
  turnaroundTime: string;
  overview: string[];
  parametersList: string[];
  whyImportant: string[];
  faqs: { question: string; answer: string }[];
  category: string;
}

export function getDynamicPageData(slug: string): DynamicPageData {
  const cleanSlug = slug.toLowerCase().replace(/^\/|\/$/g, '');
  
  // Format readable title from slug
  const titleWords = cleanSlug
    .replace(/-bangalore$/, '')
    .replace(/-test$/, '')
    .replace(/-checkup$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1));
  
  const rawTitle = titleWords.join(' ');

  // Match with existing topTests if possible
  const matchedTest = topTests.find(t => 
    t.slug === cleanSlug || 
    cleanSlug.includes(t.slug) || 
    t.slug.includes(cleanSlug.replace(/-bangalore$/, ''))
  );

  if (matchedTest) {
    return {
      slug: cleanSlug,
      title: `${matchedTest.name} in Bangalore | Price, Fasting & Home Collection | QXL Diagnostics`,
      metaDescription: `Book ${matchedTest.name} at home in Bangalore. NABL accredited lab, same-day reports, 100% sterile sample collection. Starting at ₹${matchedTest.price}.`,
      badge: "NABL ACCREDITED LAB · FREE HOME COLLECTION",
      h1Title: `${matchedTest.name} in Bangalore`,
      subtitle: matchedTest.description,
      price: matchedTest.price,
      oldPrice: (Number(matchedTest.price) * 1.4).toFixed(0),
      discountPercent: "30% OFF",
      parametersCount: `${matchedTest.parameters} Parameter${matchedTest.parameters > 1 ? 's' : ''}`,
      sampleType: matchedTest.sampleType,
      fastingRequired: matchedTest.preparation,
      turnaroundTime: matchedTest.turnaround || "6 to 12 Hours",
      overview: [
        `${matchedTest.name} is a vital diagnostic test conducted by QXL Diagnostics across Bangalore using automated, high-precision analyzer instruments.`,
        `Samples are collected directly at your home by NABL-certified phlebotomists using sterile single-use vacuum tubes and transported in temperature-controlled cold-chain kits.`
      ],
      parametersList: [
        `${matchedTest.name} Core Parameters`,
        "Sample Quality & Hemolysis Checks",
        "Reference Range Validation by Consultant Pathologists"
      ],
      whyImportant: [
        "Provides accurate baseline clinical data for your doctor.",
        "Detects early underlying health changes before symptoms develop.",
        "Processed at NABL-accredited ISO 15189:2022 laboratory (MC-6849)."
      ],
      faqs: matchedTest.faqs || [
        { question: `Do I need to fast for ${matchedTest.name}?`, answer: matchedTest.preparation },
        { question: "How soon will I receive my digital report?", answer: "Your digital report will be sent directly to your WhatsApp and Email within 6 to 12 hours." }
      ],
      category: "Diagnostic Blood Test"
    };
  }

  // Fallback generator for custom/specialized SEO slugs
  let category = "Specialised Health Test";
  let fasting = "Fasting for 8-10 hours is recommended for accurate results.";
  let testPrice = "499";
  let paramsCount = "15+ Parameters";

  if (cleanSlug.includes("sugar") || cleanSlug.includes("hba1c") || cleanSlug.includes("diabetes")) {
    category = "Diabetes Diagnostics";
    fasting = cleanSlug.includes("hba1c") ? "No fasting required." : "Fasting for 8 to 10 hours required.";
    testPrice = "350";
  } else if (cleanSlug.includes("thyroid") || cleanSlug.includes("tsh") || cleanSlug.includes("t3") || cleanSlug.includes("t4")) {
    category = "Hormonal & Thyroid Panel";
    fasting = "No fasting required.";
    testPrice = "550";
  } else if (cleanSlug.includes("vitamin")) {
    category = "Nutritional & Vitamin Panel";
    fasting = "No fasting required.";
    testPrice = "990";
  } else if (cleanSlug.includes("lipid") || cleanSlug.includes("cholesterol") || cleanSlug.includes("heart") || cleanSlug.includes("cardiac")) {
    category = "Cardiovascular Health";
    fasting = "10 to 12 hours strict fasting required. Water allowed.";
    testPrice = "650";
  } else if (cleanSlug.includes("liver") || cleanSlug.includes("lft") || cleanSlug.includes("sgpt") || cleanSlug.includes("sgot")) {
    category = "Hepatic (Liver) Profile";
    fasting = "Fasting for 8 hours recommended.";
    testPrice = "750";
  } else if (cleanSlug.includes("kidney") || cleanSlug.includes("kft") || cleanSlug.includes("creatinine") || cleanSlug.includes("renal")) {
    category = "Renal (Kidney) Profile";
    fasting = "No fasting required.";
    testPrice = "690";
  } else if (cleanSlug.includes("full-body") || cleanSlug.includes("health-checkup") || cleanSlug.includes("wellness")) {
    category = "Comprehensive Health Package";
    fasting = "8 to 10 hours overnight fasting required.";
    testPrice = "800";
    paramsCount = "80 Parameters";
  }

  const formattedName = rawTitle.length > 2 ? rawTitle : "Diagnostic Test";

  return {
    slug: cleanSlug,
    title: `${formattedName} in Bangalore | QXL Diagnostics NABL Lab`,
    metaDescription: `Book ${formattedName} in Bangalore. NABL accredited lab (MC-6849), free doorstep sample collection, same-day reports on WhatsApp & Email.`,
    badge: `NABL ACCREDITED · FREE DOORSTEP COLLECTION`,
    h1Title: `${formattedName} in Bangalore`,
    subtitle: `High-accuracy ${formattedName} performed by QXL Diagnostics with NABL-accredited precision, fast doorstep blood collection, and doctor-validated reports.`,
    price: testPrice,
    oldPrice: (Number(testPrice) * 1.5).toFixed(0),
    discountPercent: "33% OFF",
    parametersCount: paramsCount,
    sampleType: cleanSlug.includes("urine") ? "Urine" : "Blood",
    fastingRequired: fasting,
    turnaroundTime: "Same Day (6–12 Hours)",
    overview: [
      `${formattedName} is an essential investigation offered by QXL Diagnostics for patients in Bangalore.`,
      `Samples are collected at home by certified phlebotomists using sterile single-use vacuum tubes and transported in temperature-controlled cooler containers to our NABL accredited main laboratory.`
    ],
    parametersList: [
      `${formattedName} Primary Parameters`,
      "Biochemical / Hematological Analysis",
      "Doctor Verification & Quality Controls"
    ],
    whyImportant: [
      "Provides actionable health insights for early diagnosis.",
      "Conducted at NABL accredited ISO 15189 laboratory (MC-6849).",
      "Doctor-reviewed PDF report sent directly to your WhatsApp and Email."
    ],
    faqs: [
      { question: `How do I prepare for ${formattedName}?`, answer: fasting },
      { question: "Is home sample collection available for this test?", answer: "Yes! QXL Diagnostics provides free doorstep blood sample collection across all localities in Bangalore." },
      { question: "When will I get my report?", answer: "Digital PDF reports are sent to your WhatsApp and Email within 6 to 12 hours on the same day." }
    ],
    category
  };
}
