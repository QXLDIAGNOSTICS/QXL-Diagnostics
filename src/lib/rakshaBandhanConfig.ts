/**
 * Single Configuration Source for QXL Diagnostics Raksha Bandhan Campaign
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HOW TO MANAGE CAMPAIGNS
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Set `startsAt` and `endsAt` to ISO 8601 datetime strings (IST = UTC+05:30).
 * 2. The `isCampaignActive()` export automatically returns false after `endsAt`.
 * 3. Components should wrap campaign UI in `{isCampaignActive() && <CampaignCard />}`.
 * 4. When a campaign ends, the site reverts to evergreen banners — no manual change needed.
 * 5. To start a new campaign, update these values and redeploy. Old values auto-expire.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface RakshaCampaignConfig {
  /** ISO 8601 — campaign goes live at this moment */
  startsAt: string;
  /** ISO 8601 — campaign auto-expires at this moment, components must use isCampaignActive() */
  endsAt: string;
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

/**
 * Returns true only if current system time is within [startsAt, endsAt].
 * Safe to call server-side and client-side.
 */
export function isCampaignActive(config?: Pick<RakshaCampaignConfig, 'startsAt' | 'endsAt'>): boolean {
  const cfg = config ?? RAKSHA_CAMPAIGN_CONFIG;
  const now = Date.now();
  return now >= new Date(cfg.startsAt).getTime() && now <= new Date(cfg.endsAt).getTime();
}

/**
 * Returns seconds remaining until endsAt (0 if expired).
 */
export function campaignSecondsRemaining(config?: Pick<RakshaCampaignConfig, 'endsAt'>): number {
  const cfg = config ?? RAKSHA_CAMPAIGN_CONFIG;
  return Math.max(0, Math.floor((new Date(cfg.endsAt).getTime() - Date.now()) / 1000));
}

export const RAKSHA_CAMPAIGN_CONFIG: RakshaCampaignConfig = {
  // ── Campaign window ────────────────────────────────────────────────────────
  startsAt: "2026-08-01T00:00:00+05:30",
  endsAt:   "2027-12-31T23:59:59+05:30",
  // ──────────────────────────────────────────────────────────────────────────
  campaignBadge: "SPECIAL HEALTH OFFER @ ₹800",
  heroHeadline: "Gift Your Family the Gift of Good Health.",
  heroSubheadline: "Prioritise wellness with an 80-parameter comprehensive full body health check from QXL Diagnostics.",
  offerHeading: "Exclusive Full Body Preventive Health Offer",
  offerTitle: "Full Body Health Checkup (80 Parameters)",
  specialPrice: 800,
  originalPrice: 5800,
  currencySymbol: "₹",
  discountBadgeText: "86% OFF (SAVE ₹5,000)",
  parameterCount: 80,
  offerValidityText: "SPECIAL PREVENTIVE HEALTH OFFER • VALID TODAY",
  disclaimerText: "Offer price includes 80 key health parameters and free doorstep blood collection across Bengaluru. Subject to daily phlebotomy slot availability.",
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
      subtitle: "Tailored preventive screening for women to monitor thyroid, iron levels, bone health & metabolic wellness.",
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
      subtitle: "Comprehensive health evaluation for men focused on cardiac markers, liver health, sugar & vital parameters.",
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
      question: "What is included in the ₹800 full body health offer?",
      answer: "The ₹800 full body health offer is a specially curated preventive health checkup package provided by QXL Diagnostics (worth ₹5,800). It covers 80 essential health parameters across 8 major health areas including CBC, HbA1c, Liver Function, Kidney Function, Thyroid Profile, Lipid Profile, Bone/Mineral Health, and Urine Routine.",
    },
    {
      question: "What tests are included in the package?",
      answer: "The full body health package includes 80 comprehensive diagnostic parameters across 8 major health areas: Complete Blood Count, HbA1c & Fasting Sugar, Heart & Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Screening, Bone & Mineral Health, and Urinary Routine.",
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
      question: "Can multiple family members book together?",
      answer: "Absolutely! You can book health checks for yourself and family members in a single request. We offer scheduled home collection visits for multiple family members together.",
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
      question: "How long is the ₹800 offer valid?",
      answer: "The ₹800 Special Full Body Offer is available for online bookings across Bengaluru. Slots are subject to daily phlebotomy availability, so early booking is recommended.",
    },
  ],
};
