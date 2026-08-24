/**
 * Single Configuration Source for QXL Diagnostics Raksha Bandhan Campaign
 * 
 * Marketing team can update campaign parameters, prices, package inclusions,
 * contact numbers, and validity dates from this single file.
 */

export interface RakshaCampaignConfig {
  campaignBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  offerHeading: string;
  offerTitle: string;
  specialPrice: number;
  originalPrice: number;
  currencySymbol: string;
  discountBadgeText: string;
  parameterCount: number;
  offerValidityText: string;
  disclaimerText: string;
  contactPhoneDisplay: string;
  contactPhoneE164: string;
  whatsappNumber: string;
  labLocation: string;
  nablCertNumber: string;
  isHomeSampleCollectionAvailable: boolean;
  heroImage: string;
  bannerImage: string;
  packageInclusions: {
    category: string;
    count: number;
    items: string[];
  }[];
  siblingPackages: {
    id: string;
    title: string;
    subtitle: string;
    targetGender: 'Women' | 'Men';
    specialPrice: number;
    originalPrice: number;
    parametersCount: number;
    highlights: string[];
    testCategories: string[];
  }[];
  faqItems: {
    question: string;
    answer: string;
  }[];
}

export const RAKSHA_CAMPAIGN_CONFIG: RakshaCampaignConfig = {
  campaignBadge: "7-DAY SPECIAL OFFER @ ₹800",
  heroHeadline: "This Raksha Bandhan, Gift Health.",
  heroSubheadline: "Celebrate the bond that lasts a lifetime with an 80-parameter preventive health check from QXL Diagnostics.",
  offerHeading: "7-Day Exclusive Raksha Bandhan Offer",
  offerTitle: "Raksha Bandhan Health Checkup (80 Parameters)",
  specialPrice: 800,
  originalPrice: 5800,
  currencySymbol: "₹",
  discountBadgeText: "86% OFF (SAVE ₹5,000)",
  parameterCount: 80,
  offerValidityText: "EXCLUSIVE 7-DAY OFFER • VALID TILL SLOTS LAST",
  disclaimerText: "Offer validity and package inclusions are subject to availability. Please confirm details before booking.",
  contactPhoneDisplay: "+91 9964 639 639",
  contactPhoneE164: "+919964639639",
  whatsappNumber: "919964639639",
  labLocation: "Bengaluru, Karnataka",
  nablCertNumber: "MC-6849",
  isHomeSampleCollectionAvailable: true,
  heroImage: "/images/raksha_bandhan_hero.png",
  bannerImage: "/images/raksha_bandhan_banner.png",

  packageInclusions: [
    {
      category: "Complete Blood Count (CBC)",
      count: 26,
      items: ["Hemoglobin", "RBC Count", "WBC Total Count", "Differential Count (5 Parameters)", "Platelet Count", "MCV", "MCH", "MCHC", "RDW-CV", "PCV/Hematocrit", "ESR"],
    },
    {
      category: "Diabetes Profile",
      count: 3,
      items: ["Fasting Blood Sugar (FBS)", "HbA1c (Glycated Hemoglobin)", "Average Blood Glucose"],
    },
    {
      category: "Lipid / Heart Health Profile",
      count: 8,
      items: ["Total Cholesterol", "HDL Cholesterol (Good)", "LDL Cholesterol (Bad)", "VLDL Cholesterol", "Triglycerides", "TC/HDL Ratio", "LDL/HDL Ratio", "Non-HDL Cholesterol"],
    },
    {
      category: "Liver Function Test (LFT)",
      count: 11,
      items: ["Bilirubin Total", "Bilirubin Direct", "Bilirubin Indirect", "SGOT / AST", "SGPT / ALT", "Alkaline Phosphatase (ALP)", "Total Protein", "Albumin", "Globulin", "A/G Ratio", "Gamma GT"],
    },
    {
      category: "Kidney Function Test (KFT)",
      count: 8,
      items: ["Blood Urea", "BUN (Blood Urea Nitrogen)", "Serum Creatinine", "Uric Acid", "BUN/Creatinine Ratio", "Serum Calcium", "Serum Phosphorus", "eGFR calculation"],
    },
    {
      category: "Thyroid Screening",
      count: 3,
      items: ["TSH (Thyroid Stimulating Hormone)", "Total T3", "Total T4"],
    },
    {
      category: "Urine Routine Examination",
      count: 5,
      items: ["Urine Colour & Appearance", "pH", "Specific Gravity", "Urine Sugar & Protein", "Microscopic Examination"],
    },
  ],

  siblingPackages: [
    {
      id: "womens-health-check",
      title: "Women's Health Check",
      subtitle: "Tailored preventive screening for sisters to monitor thyroid, iron levels, bone health & metabolic wellness.",
      targetGender: "Women",
      specialPrice: 800,
      originalPrice: 2400,
      parametersCount: 64,
      highlights: ["Complete Hemogram (Anaemia Screening)", "Thyroid Profile (TSH, T3, T4)", "Calcium & Vitamin Screening", "Diabetes & Kidney Wellness"],
      testCategories: ["CBC 26 Tests", "HbA1c & Blood Sugar", "Thyroid Profile", "Kidney & Liver Panel", "Lipid Profile"],
    },
    {
      id: "mens-health-check",
      title: "Men's Health Check",
      subtitle: "Comprehensive health evaluation for brothers focused on cardiac markers, liver health, sugar & vital parameters.",
      targetGender: "Men",
      specialPrice: 800,
      originalPrice: 2400,
      parametersCount: 64,
      highlights: ["Lipid Profile (Heart Care)", "Liver & Kidney Vitality", "Fasting Glucose & HbA1c", "Uric Acid & Electrolyte Balance"],
      testCategories: ["CBC 26 Tests", "Heart Lipid Panel", "Liver Function", "Renal Function", "Glycemic Index"],
    },
  ],

  faqItems: [
    {
      question: "What is the Raksha Bandhan health offer?",
      answer: "The Raksha Bandhan health offer is a specially curated preventive health checkup package provided by QXL Diagnostics at a campaign price of ₹800 (worth ₹5,800). It covers 80 essential health parameters across 8 major health areas including CBC, HbA1c, Liver Function, Kidney Function, Thyroid Profile, Lipid Profile, Bone/Mineral Health, and Urine Routine.",
    },
    {
      question: "What tests are included in the package?",
      answer: "The Raksha Bandhan health package includes 80 comprehensive diagnostic parameters across 8 major health areas: Complete Blood Count, HbA1c & Fasting Sugar, Heart & Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Screening, Bone & Mineral Health, and Urinary Routine.",
    },
    {
      question: "How can I book the health check?",
      answer: "You can book easily online using the booking form on this page, or by calling QXL Diagnostics directly at +91 9964 639 639 or reaching out via WhatsApp. Our team will confirm your slot and sample collection details promptly.",
    },
    {
      question: "Is home sample collection available?",
      answer: "Yes! QXL Diagnostics offers convenient Home Sample Collection across Bengaluru. Our trained phlebotomists maintain strict cold-chain safety protocols to collect samples right from the comfort of your home.",
    },
    {
      question: "Can siblings book together?",
      answer: "Absolutely! You can book health checks for both yourself and your sibling in a single request. We offer scheduled home collection visits for multiple family members together.",
    },
    {
      question: "Where is QXL Diagnostics located?",
      answer: "QXL Diagnostics is a premier NABL Accredited Laboratory based in Bengaluru, Karnataka, with hub centers in Kengeri (Mysore Road) and Yelahanka, along with full home collection coverage across all major Bengaluru localities.",
    },
    {
      question: "How do I receive my report?",
      answer: "Your test reports will be processed at our NABL-accredited central laboratory (MC-6849) and sent directly to your registered WhatsApp and email within 6 to 12 hours. Hard copies can also be provided upon request.",
    },
    {
      question: "How long is the Raksha Bandhan offer valid?",
      answer: "The Raksha Bandhan Special Offer is a limited-time festive promotion valid throughout the campaign duration. Slots are subject to daily availability, so early booking is recommended.",
    },
  ],
};
