import { NextResponse } from 'next/server';
import { SITE_URL, BUSINESS_NAME, NABL_CERTIFICATE, ISO_STANDARD, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

/**
 * GET /api/tests-catalogue
 *
 * Machine-readable JSON catalogue of QXL Diagnostics test offerings.
 * Designed for:
 *  - AI crawler ingestion (Gemini, GPT, Perplexity)
 *  - Schema.org structured data enrichment
 *  - Aggregator/comparison site feeds
 *
 * Returns: application/json with proper CORS headers for public crawlers.
 */

const TESTS_CATALOGUE = [
  // ── Priority 1–10: Core patient acquisition ─────────────────────────────
  { slug: "cbc-test-bangalore",           name: "Complete Blood Count (CBC)",        category: "Haematology",      price: 350,  oldPrice: 500,  fasting: false,  sampleType: "EDTA Whole Blood",   turnaround: "4-6 hours",  parameters: 24, homeCollection: true },
  { slug: "hba1c-test-bangalore",         name: "HbA1c (Glycated Haemoglobin)",      category: "Diabetes",         price: 350,  oldPrice: 500,  fasting: false,  sampleType: "EDTA Whole Blood",   turnaround: "6 hours",    parameters: 2,  homeCollection: true },
  { slug: "thyroid-test-bangalore",       name: "Thyroid Profile (T3, T4, TSH)",     category: "Endocrinology",    price: 550,  oldPrice: 800,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 3,  homeCollection: true },
  { slug: "vitamin-d-test-bangalore",     name: "Vitamin D (25-OH) Test",            category: "Nutrition",        price: 990,  oldPrice: 1500, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "vitamin-b12-test-bangalore",   name: "Vitamin B12 (Cobalamin) Test",      category: "Nutrition",        price: 890,  oldPrice: 1300, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "lipid-profile-test-bangalore", name: "Lipid Profile (Full Cholesterol Panel)", category: "Cardiology",  price: 650,  oldPrice: 950,  fasting: true,   sampleType: "Serum",              turnaround: "6 hours",    parameters: 8,  homeCollection: true },
  { slug: "liver-function-test-bangalore",name: "Liver Function Test (LFT)",         category: "Hepatology",       price: 750,  oldPrice: 1100, fasting: true,   sampleType: "Serum",              turnaround: "6 hours",    parameters: 11, homeCollection: true },
  { slug: "kidney-function-test-bangalore",name:"Kidney Function Test (KFT / RFT)", category: "Nephrology",       price: 690,  oldPrice: 1000, fasting: false,  sampleType: "Serum & Plasma",     turnaround: "6 hours",    parameters: 10, homeCollection: true },
  { slug: "blood-sugar-test-bangalore",   name: "Fasting Blood Sugar / Plasma Glucose", category: "Diabetes",     price: 150,  oldPrice: 250,  fasting: true,   sampleType: "Fluoride Plasma",    turnaround: "4 hours",    parameters: 1,  homeCollection: true },
  { slug: "crp-test-bangalore",           name: "CRP (C-Reactive Protein)",          category: "Inflammation",     price: 450,  oldPrice: 700,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Priority 11–25: Routine & metabolic ────────────────────────────────
  { slug: "esr-test-bangalore",           name: "ESR (Erythrocyte Sedimentation Rate)", category: "Inflammation", price: 150,  oldPrice: 250,  fasting: false,  sampleType: "Anticoagulated Blood", turnaround: "4 hours",  parameters: 1,  homeCollection: true },
  { slug: "uric-acid-test-bangalore",     name: "Serum Uric Acid (Gout Test)",       category: "Metabolic",        price: 250,  oldPrice: 400,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "creatinine-test-bangalore",    name: "Serum Creatinine & eGFR",           category: "Nephrology",       price: 250,  oldPrice: 400,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 2,  homeCollection: true },
  { slug: "iron-profile-test-bangalore",  name: "Iron Profile (Iron Studies)",       category: "Haematology",      price: 750,  oldPrice: 1100, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 4,  homeCollection: true },
  { slug: "ferritin-test-bangalore",      name: "Serum Ferritin",                    category: "Haematology",      price: 690,  oldPrice: 1000, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "tsh-test-bangalore",           name: "TSH (Thyroid Stimulating Hormone)", category: "Endocrinology",    price: 350,  oldPrice: 500,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Autoimmune ──────────────────────────────────────────────────────────
  { slug: "ana-test-bangalore",           name: "ANA (Antinuclear Antibody) Test",   category: "Autoimmune",       price: 950,  oldPrice: 1500, fasting: false,  sampleType: "Serum",              turnaround: "24-48 hours",parameters: 1,  homeCollection: true },
  { slug: "anti-ccp-test-bangalore",      name: "Anti-CCP (Rheumatoid Arthritis)",   category: "Autoimmune",       price: 1200, oldPrice: 1800, fasting: false,  sampleType: "Serum",              turnaround: "24 hours",   parameters: 1,  homeCollection: true },
  { slug: "rheumatoid-factor-test-bangalore", name: "Rheumatoid Factor (RF)",        category: "Autoimmune",       price: 350,  oldPrice: 550,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Hormones & Reproductive ─────────────────────────────────────────────
  { slug: "amh-test-bangalore",           name: "AMH (Anti-Müllerian Hormone) Fertility Test", category: "Reproductive", price: 1800, oldPrice: 2800, fasting: false, sampleType: "Serum",         turnaround: "24 hours",   parameters: 1,  homeCollection: true },
  { slug: "testosterone-test-bangalore",  name: "Total Testosterone (Male Hormone)", category: "Endocrinology",    price: 750,  oldPrice: 1200, fasting: true,   sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "prolactin-test-bangalore",     name: "Prolactin (PRL) Hormone Test",      category: "Endocrinology",    price: 450,  oldPrice: 700,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "pcos-test-bangalore",          name: "PCOS Hormone Profile",              category: "Reproductive",     price: 2500, oldPrice: 4000, fasting: true,   sampleType: "Serum",              turnaround: "24 hours",   parameters: 8,  homeCollection: true },
  // ── Prenatal ────────────────────────────────────────────────────────────
  { slug: "double-marker-test-bangalore", name: "Double Marker Test (Prenatal Screening)", category: "Prenatal",  price: 2200, oldPrice: 3500, fasting: false,  sampleType: "Serum",              turnaround: "24-48 hours",parameters: 2,  homeCollection: true },
  { slug: "beta-hcg-test-bangalore",      name: "Beta-hCG (Pregnancy Blood Test)",   category: "Reproductive",     price: 650,  oldPrice: 1000, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Oncology ────────────────────────────────────────────────────────────
  { slug: "psa-test-bangalore",           name: "PSA (Prostate Specific Antigen)",   category: "Oncology",         price: 750,  oldPrice: 1100, fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "ca-125-test-bangalore",        name: "CA-125 Tumour Marker",              category: "Oncology",         price: 950,  oldPrice: 1500, fasting: false,  sampleType: "Serum",              turnaround: "24 hours",   parameters: 1,  homeCollection: true },
  { slug: "cea-test-bangalore",           name: "CEA (Carcinoembryonic Antigen)",    category: "Oncology",         price: 850,  oldPrice: 1300, fasting: false,  sampleType: "Serum",              turnaround: "24 hours",   parameters: 1,  homeCollection: true },
  // ── Cardiac ─────────────────────────────────────────────────────────────
  { slug: "troponin-test-bangalore",      name: "High-Sensitivity Troponin (hs-Troponin)", category: "Cardiology", price: 1200, oldPrice: 1800, fasting: false, sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "d-dimer-test-bangalore",       name: "D-Dimer Test",                      category: "Cardiology",       price: 1200, oldPrice: 1800, fasting: false,  sampleType: "Citrate Plasma",     turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Infectious Disease ──────────────────────────────────────────────────
  { slug: "dengue-test-bangalore",        name: "Dengue NS1 Antigen + IgM/IgG",      category: "Infectious Disease",price: 600, oldPrice: 900,  fasting: false,  sampleType: "Serum",              turnaround: "3-6 hours",  parameters: 3,  homeCollection: true },
  { slug: "typhoid-test-bangalore",       name: "Typhoid Test (Widal / Typhidot)",   category: "Infectious Disease",price: 400, oldPrice: 600,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 2,  homeCollection: true },
  { slug: "hepatitis-b-test-bangalore",   name: "Hepatitis B Surface Antigen (HBsAg)", category: "Infectious Disease", price: 350, oldPrice: 550, fasting: false, sampleType: "Serum",            turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  { slug: "hiv-test-bangalore",           name: "HIV 1&2 Antibody Test",             category: "Infectious Disease",price: 350, oldPrice: 550,  fasting: false,  sampleType: "Serum",              turnaround: "6 hours",    parameters: 1,  homeCollection: true },
  // ── Health Packages ─────────────────────────────────────────────────────
  { slug: "full-body-checkup-bangalore",  name: "Full Body Health Checkup (80 Parameters)", category: "Preventive Package", price: 800, oldPrice: 1600, fasting: true, sampleType: "Blood & Urine", turnaround: "6-12 hours", parameters: 80, homeCollection: true },
  { slug: "diabetes-profile-test-bangalore", name: "Diabetes Profile Package",       category: "Preventive Package", price: 1900, oldPrice: 4960, fasting: true, sampleType: "Blood & Urine",     turnaround: "6-12 hours", parameters: 18, homeCollection: true },
];

export async function GET() {
  const catalogue = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${BUSINESS_NAME} — Complete Diagnostic Test Catalogue`,
    "description": `Full list of laboratory tests offered by ${BUSINESS_NAME}, a NABL-accredited (${NABL_CERTIFICATE}, ${ISO_STANDARD}) super-speciality diagnostic laboratory in Bengaluru, Karnataka, India.`,
    "url": `${SITE_URL}/api/tests-catalogue`,
    "numberOfItems": TESTS_CATALOGUE.length,
    "provider": {
      "@type": "DiagnosticLab",
      "name": BUSINESS_NAME,
      "alternateName": "QXL Diagnostics Super Speciality Lab",
      "legalName": "Qualitify Healthtech Pvt Ltd",
      "url": SITE_URL,
      "telephone": "+919964639639",
      "email": EMAIL,
      "hasCredential": `NABL ${NABL_CERTIFICATE}`,
      "iso": ISO_STANDARD,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560060",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 12.9113827, "longitude": 77.4850301 },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "07:00",
        "closes": "21:00"
      }
    },
    "itemListElement": TESTS_CATALOGUE.map((test, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "MedicalTest",
        "name": test.name,
        "url": `${SITE_URL}/tests/${test.slug}`,
        "description": `${test.name} at QXL Diagnostics Bangalore. Price: ₹${test.price}. Category: ${test.category}. Sample: ${test.sampleType}. Reports in ${test.turnaround}. ${test.homeCollection ? 'Free home collection available.' : ''}`,
        "offers": {
          "@type": "Offer",
          "price": test.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31",
          "seller": { "@type": "Organization", "name": BUSINESS_NAME }
        },
        "preparation": test.fasting ? "8-10 hours overnight fasting required" : "No fasting required",
        "relevantSpecialty": { "@type": "MedicalSpecialty", "name": test.category },
        "howPerformed": `Blood sample collected at your home across Bengaluru or at QXL lab, processed at NABL-accredited laboratory (${NABL_CERTIFICATE}).`,
        "normalRange": "Refer to test page for reference ranges",
        "usesDevice": { "@type": "MedicalDevice", "name": "Automated Clinical Chemistry / Immunoassay Analyser" }
      }
    })),
    "meta": {
      "generated": new Date().toISOString(),
      "version": "1.0",
      "totalTestsOffered": "300+",
      "note": "Prices are indicative and subject to change. Confirm current pricing at qxldiagnostics.com or call +91 9964 639 639."
    }
  };

  return NextResponse.json(catalogue, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'X-Robots-Tag': 'index, follow',
    }
  });
}
