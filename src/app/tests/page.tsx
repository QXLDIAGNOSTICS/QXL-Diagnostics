"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles, Filter } from "lucide-react";
import { NABL_CERTIFICATE, PHONE_DISPLAY, WHATSAPP_LINK } from "@/lib/businessInfo";

export interface TestDirectoryItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  mrp: number;
  parametersCount: string;
  sampleType: string;
  fasting: string;
  tat: string;
  icon: string;
  popular?: boolean;
  aliases: string[];
}

export const CATEGORIES = [
  "All Categories",
  "Popular Tests",
  "Blood Tests",
  "Diabetes",
  "Thyroid",
  "Heart",
  "Liver",
  "Kidney",
  "Vitamins",
  "Hormones",
  "Women's Health",
  "Fertility",
  "Pregnancy Screening",
  "Autoimmune",
  "Allergy",
  "Food Intolerance",
  "Cancer Markers",
  "Infectious Diseases",
  "Molecular Diagnostics",
  "Neurology",
  "Gastroenterology",
  "Advanced Reference Tests"
] as const;

export const ALL_DIRECTORY_TESTS: TestDirectoryItem[] = [
  // ── Routine & Blood Tests ──
  {
    id: "cbc",
    slug: "/tests/cbc-test-bangalore",
    name: "Complete Blood Count (CBC / Hemogram)",
    shortName: "CBC",
    category: "Blood Tests",
    price: 350,
    mrp: 500,
    parametersCount: "24 Parameters",
    sampleType: "EDTA Blood",
    fasting: "No Fasting Required",
    tat: "4–6 Hours",
    icon: "🩸",
    popular: true,
    aliases: ["CBC", "Hemogram", "Haemogram", "Complete Blood Picture", "CBP", "FBC"]
  },
  {
    id: "esr",
    slug: "/tests/esr-test-bangalore",
    name: "Erythrocyte Sedimentation Rate (ESR)",
    shortName: "ESR",
    category: "Blood Tests",
    price: 180,
    mrp: 250,
    parametersCount: "1 Parameter",
    sampleType: "EDTA Blood",
    fasting: "No Fasting Required",
    tat: "4–6 Hours",
    icon: "🧪",
    popular: true,
    aliases: ["ESR", "Sed Rate", "Westergren ESR"]
  },
  {
    id: "crp",
    slug: "/tests/crp-test-bangalore",
    name: "C-Reactive Protein (CRP Quantitative)",
    shortName: "CRP",
    category: "Blood Tests",
    price: 450,
    mrp: 650,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "⚡",
    popular: true,
    aliases: ["CRP", "C Reactive Protein", "Quantitative CRP"]
  },
  {
    id: "urine-routine",
    slug: "/tests/urine-routine-test-bangalore",
    name: "Complete Urine Examination (CUE / Routine)",
    shortName: "Urine Routine",
    category: "Blood Tests",
    price: 250,
    mrp: 350,
    parametersCount: "18 Parameters",
    sampleType: "Spot Urine",
    fasting: "No Fasting Required",
    tat: "4 Hours",
    icon: "💧",
    popular: true,
    aliases: ["Urine Routine", "CUE", "Urine Analysis", "Urinalysis"]
  },

  // ── Diabetes ──
  {
    id: "hba1c",
    slug: "/tests/hba1c-test-bangalore",
    name: "HbA1c (Glycated Haemoglobin)",
    shortName: "HbA1c",
    category: "Diabetes",
    price: 350,
    mrp: 500,
    parametersCount: "Glycated Hb + eAG",
    sampleType: "EDTA Blood",
    fasting: "No Fasting Required",
    tat: "4–6 Hours",
    icon: "🍬",
    popular: true,
    aliases: ["HbA1c", "Glycated Hemoglobin", "3 Month Sugar Test", "A1c", "Glycosylated Hb"]
  },
  {
    id: "fbs",
    slug: "/tests/blood-sugar-test-bangalore",
    name: "Fasting Blood Sugar (FBS)",
    shortName: "FBS",
    category: "Diabetes",
    price: 150,
    mrp: 220,
    parametersCount: "1 Parameter",
    sampleType: "Fluoride Plasma",
    fasting: "8-10 Hrs Fasting Required",
    tat: "4 Hours",
    icon: "🩸",
    popular: true,
    aliases: ["FBS", "Fasting Glucose", "Fasting Blood Sugar"]
  },
  {
    id: "ppbs",
    slug: "/tests/ppbs-test-bangalore",
    name: "Post Prandial Blood Sugar (PPBS)",
    shortName: "PPBS",
    category: "Diabetes",
    price: 150,
    mrp: 220,
    parametersCount: "1 Parameter",
    sampleType: "Fluoride Plasma",
    fasting: "2 Hrs Post Meal",
    tat: "4 Hours",
    icon: "🍽️",
    popular: false,
    aliases: ["PPBS", "Post Prandial Glucose", "2 Hour Sugar"]
  },
  {
    id: "fasting-insulin",
    slug: "/tests/fasting-insulin-test-bangalore",
    name: "Fasting Insulin Test",
    shortName: "Fasting Insulin",
    category: "Diabetes",
    price: 650,
    mrp: 950,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "10-12 Hrs Fasting Required",
    tat: "12 Hours",
    icon: "💉",
    popular: false,
    aliases: ["Fasting Serum Insulin", "Insulin Resistance"]
  },
  {
    id: "homa-ir",
    slug: "/tests/homa-ir-test-bangalore",
    name: "HOMA-IR Insulin Resistance Index",
    shortName: "HOMA-IR",
    category: "Diabetes",
    price: 800,
    mrp: 1200,
    parametersCount: "Fasting Glucose + Insulin + HOMA Ratio",
    sampleType: "Serum & Plasma",
    fasting: "10-12 Hrs Fasting Required",
    tat: "12 Hours",
    icon: "📊",
    popular: false,
    aliases: ["HOMA-IR", "Insulin Resistance Panel", "HOMA Index"]
  },

  // ── Thyroid ──
  {
    id: "thyroid-profile",
    slug: "/tests/thyroid-test-bangalore",
    name: "Thyroid Profile Total (T3, T4, TSH)",
    shortName: "Thyroid Profile",
    category: "Thyroid",
    price: 550,
    mrp: 800,
    parametersCount: "3 Parameters",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🦋",
    popular: true,
    aliases: ["Thyroid Profile", "T3 T4 TSH", "Total Thyroid Panel"]
  },
  {
    id: "tsh",
    slug: "/tests/tsh-test-bangalore",
    name: "Thyroid Stimulating Hormone (TSH Ultrasensitive)",
    shortName: "TSH",
    category: "Thyroid",
    price: 250,
    mrp: 400,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "4–6 Hours",
    icon: "🦋",
    popular: true,
    aliases: ["TSH", "Ultrasensitive TSH", "Thyrotropin"]
  },
  {
    id: "ft3-ft4",
    slug: "/tests/free-thyroid-profile-bangalore",
    name: "Free Thyroid Profile (FT3 & FT4)",
    shortName: "FT3 / FT4",
    category: "Thyroid",
    price: 750,
    mrp: 1100,
    parametersCount: "2 Parameters",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🔬",
    popular: false,
    aliases: ["Free T3", "Free T4", "FT3", "FT4"]
  },
  {
    id: "anti-tpo",
    slug: "/tests/anti-tpo-test-bangalore",
    name: "Anti-TPO Antibody (Thyroid Peroxidase Ab)",
    shortName: "Anti-TPO",
    category: "Thyroid",
    price: 1100,
    mrp: 1600,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🛡️",
    popular: false,
    aliases: ["Anti TPO", "Thyroid Peroxidase Antibodies", "Hashimoto Ab"]
  },

  // ── Heart / Cardiovascular ──
  {
    id: "lipid-profile",
    slug: "/tests/lipid-profile-test-bangalore",
    name: "Lipid Profile (Cholesterol Panel)",
    shortName: "Lipid Profile",
    category: "Heart",
    price: 650,
    mrp: 950,
    parametersCount: "8 Parameters",
    sampleType: "Serum",
    fasting: "10-12 Hrs Fasting Required",
    tat: "6 Hours",
    icon: "❤️",
    popular: true,
    aliases: ["Lipid Profile", "Cholesterol Test", "Lipid Panel", "Triglycerides", "HDL LDL"]
  },
  {
    id: "hs-crp",
    slug: "/tests/hs-crp-test-bangalore",
    name: "hs-CRP (High-Sensitivity C-Reactive Protein)",
    shortName: "hs-CRP",
    category: "Heart",
    price: 600,
    mrp: 900,
    parametersCount: "Cardiac Marker",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🫀",
    popular: false,
    aliases: ["hs-CRP", "High Sensitivity CRP", "Cardiac Risk Marker"]
  },
  {
    id: "homocysteine",
    slug: "/tests/homocysteine-test-bangalore",
    name: "Serum Homocysteine Test",
    shortName: "Homocysteine",
    category: "Heart",
    price: 1200,
    mrp: 1800,
    parametersCount: "Cardiovascular Biomarker",
    sampleType: "Serum",
    fasting: "10-12 Hrs Fasting Required",
    tat: "12 Hours",
    icon: "⚡",
    popular: false,
    aliases: ["Homocysteine", "Plasma Homocysteine", "Vascular Marker"]
  },
  {
    id: "apob",
    slug: "/tests/apob-test-bangalore",
    name: "Apolipoprotein B (ApoB)",
    shortName: "ApoB",
    category: "Heart",
    price: 850,
    mrp: 1300,
    parametersCount: "Atherogenic Particle Count",
    sampleType: "Serum",
    fasting: "10-12 Hrs Fasting Required",
    tat: "24 Hours",
    icon: "🩸",
    popular: false,
    aliases: ["ApoB", "Apolipoprotein B100", "Atherogenic Lipoprotein"]
  },
  {
    id: "lpa",
    slug: "/tests/lp-a-test-bangalore",
    name: "Lipoprotein(a) [Lp(a)] Test",
    shortName: "Lp(a)",
    category: "Heart",
    price: 1100,
    mrp: 1700,
    parametersCount: "Genetic Cardiac Risk Factor",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "24 Hours",
    icon: "🧬",
    popular: false,
    aliases: ["Lp(a)", "Lipoprotein a", "Lp little a"]
  },
  {
    id: "troponin-i",
    slug: "/tests/troponin-test-bangalore",
    name: "Troponin I Quantitative (Cardiac Troponin)",
    shortName: "Troponin I",
    category: "Heart",
    price: 1400,
    mrp: 2100,
    parametersCount: "Acute Myocardial Biomarker",
    sampleType: "Serum / Heparin Plasma",
    fasting: "No Fasting Required",
    tat: "2–4 Hours (Urgent)",
    icon: "🚨",
    popular: false,
    aliases: ["Troponin I", "cTnI", "Cardiac Troponin", "Myocardial Infarction Marker"]
  },

  // ── Liver ──
  {
    id: "lft",
    slug: "/tests/liver-function-test-bangalore",
    name: "Liver Function Test (LFT Complete)",
    shortName: "LFT",
    category: "Liver",
    price: 750,
    mrp: 1100,
    parametersCount: "11 Parameters",
    sampleType: "Serum",
    fasting: "8 Hrs Fasting Recommended",
    tat: "6 Hours",
    icon: "🧪",
    popular: true,
    aliases: ["LFT", "Liver Function Test", "SGOT SGPT Bilirubin", "Hepatic Panel"]
  },
  {
    id: "sgpt",
    slug: "/tests/sgpt-alt-test-bangalore",
    name: "SGPT (ALT - Alanine Aminotransferase)",
    shortName: "SGPT / ALT",
    category: "Liver",
    price: 220,
    mrp: 350,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "4 Hours",
    icon: "💧",
    popular: false,
    aliases: ["SGPT", "ALT", "Alanine Transaminase"]
  },

  // ── Kidney ──
  {
    id: "kft",
    slug: "/tests/kidney-function-test-bangalore",
    name: "Kidney Function Test (KFT / RFT Complete)",
    shortName: "KFT / RFT",
    category: "Kidney",
    price: 690,
    mrp: 1050,
    parametersCount: "8 Parameters",
    sampleType: "Serum & Urine",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "💧",
    popular: true,
    aliases: ["KFT", "RFT", "Kidney Function Test", "Renal Function Test", "Urea Creatinine"]
  },
  {
    id: "creatinine",
    slug: "/tests/creatinine-test-bangalore",
    name: "Serum Creatinine & eGFR Calculation",
    shortName: "Creatinine",
    category: "Kidney",
    price: 220,
    mrp: 350,
    parametersCount: "2 Parameters",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "4 Hours",
    icon: "🧪",
    popular: true,
    aliases: ["Creatinine", "Serum Creatinine", "eGFR"]
  },
  {
    id: "uric-acid",
    slug: "/tests/uric-acid-test-bangalore",
    name: "Serum Uric Acid Test (Gout Screening)",
    shortName: "Uric Acid",
    category: "Kidney",
    price: 250,
    mrp: 380,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "4 Hours",
    icon: "🦴",
    popular: false,
    aliases: ["Uric Acid", "Gout Test", "Serum Urate"]
  },

  // ── Vitamins & Nutrients ──
  {
    id: "vit-d",
    slug: "/tests/vitamin-d-test-bangalore",
    name: "Vitamin D3 (25-OH Hydroxy Vitamin D)",
    shortName: "Vitamin D",
    category: "Vitamins",
    price: 990,
    mrp: 1500,
    parametersCount: "25-OH Vitamin D Total",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "☀️",
    popular: true,
    aliases: ["Vitamin D", "25 OH Vitamin D", "Vitamin D3", "Calcidiol"]
  },
  {
    id: "vit-b12",
    slug: "/tests/vitamin-b12-test-bangalore",
    name: "Vitamin B12 (Serum Cobalamin)",
    shortName: "Vitamin B12",
    category: "Vitamins",
    price: 890,
    mrp: 1300,
    parametersCount: "Serum Cobalamin",
    sampleType: "Serum",
    fasting: "8 Hrs Fasting Recommended",
    tat: "6 Hours",
    icon: "⚡",
    popular: true,
    aliases: ["Vitamin B12", "B12 Test", "Cobalamin"]
  },
  {
    id: "iron-profile",
    slug: "/tests/iron-profile-test-bangalore",
    name: "Iron Profile (Serum Iron, TIBC, % Saturation)",
    shortName: "Iron Profile",
    category: "Vitamins",
    price: 850,
    mrp: 1300,
    parametersCount: "4 Parameters",
    sampleType: "Serum",
    fasting: "10-12 Hrs Fasting Required",
    tat: "6 Hours",
    icon: "🩸",
    popular: false,
    aliases: ["Iron Profile", "Fe TIBC", "Iron Panel", "Transferrin Saturation"]
  },
  {
    id: "ferritin",
    slug: "/tests/ferritin-test-bangalore",
    name: "Serum Ferritin Test (Iron Storage Marker)",
    shortName: "Ferritin",
    category: "Vitamins",
    price: 650,
    mrp: 980,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🧲",
    popular: false,
    aliases: ["Ferritin", "Serum Ferritin", "Iron Stores"]
  },

  // ── Hormones & Women's Health & Fertility ──
  {
    id: "amh",
    slug: "/tests/amh-test-bangalore",
    name: "Anti-Mullerian Hormone (AMH - Ovarian Reserve)",
    shortName: "AMH",
    category: "Women's Health",
    price: 1950,
    mrp: 2800,
    parametersCount: "Ovarian Reserve Biomarker",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🥚",
    popular: true,
    aliases: ["AMH", "Anti Mullerian Hormone", "Ovarian Reserve Test", "Fertility Reserve"]
  },
  {
    id: "pcos-profile",
    slug: "/tests/pcos-test-bangalore",
    name: "PCOS Diagnostic Panel (LH, FSH, Prolactin, Testosterone)",
    shortName: "PCOS Panel",
    category: "Women's Health",
    price: 1850,
    mrp: 2700,
    parametersCount: "6 Hormone Parameters",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🌸",
    popular: true,
    aliases: ["PCOS Test", "PCOS Profile", "Polycystic Ovarian Syndrome Panel"]
  },
  {
    id: "testosterone",
    slug: "/tests/testosterone-test-bangalore",
    name: "Total & Free Testosterone Profile",
    shortName: "Testosterone",
    category: "Hormones",
    price: 950,
    mrp: 1400,
    parametersCount: "Total + Free Testosterone",
    sampleType: "Serum",
    fasting: "Morning Sample Preferred",
    tat: "12 Hours",
    icon: "💪",
    popular: false,
    aliases: ["Testosterone", "Total Testosterone", "Free Testosterone", "Androgen Profile"]
  },
  {
    id: "prolactin",
    slug: "/tests/prolactin-test-bangalore",
    name: "Serum Prolactin Test",
    shortName: "Prolactin",
    category: "Hormones",
    price: 450,
    mrp: 700,
    parametersCount: "1 Parameter",
    sampleType: "Serum",
    fasting: "Morning Rested Sample",
    tat: "6 Hours",
    icon: "🥛",
    popular: false,
    aliases: ["Prolactin", "PRL Test", "Hyperprolactinemia"]
  },

  // ── Pregnancy / Maternal Screening ──
  {
    id: "double-marker",
    slug: "/tests/double-marker-test-bangalore",
    name: "First Trimester Double Marker (PAPP-A + Free β-hCG)",
    shortName: "Double Marker",
    category: "Pregnancy Screening",
    price: 2200,
    mrp: 3200,
    parametersCount: "2 Biomarkers + FMF Software Risk Calculation",
    sampleType: "Serum + NT Scan Data",
    fasting: "No Fasting Required",
    tat: "24 Hours",
    icon: "👶",
    popular: true,
    aliases: ["Double Marker", "PAPP-A", "Free Beta hCG", "First Trimester Screening"]
  },
  {
    id: "beta-hcg",
    slug: "/tests/beta-hcg-test-bangalore",
    name: "Beta hCG Quantitative (Pregnancy Blood Test)",
    shortName: "Beta hCG",
    category: "Pregnancy Screening",
    price: 650,
    mrp: 950,
    parametersCount: "Quantitative β-hCG",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "4–6 Hours",
    icon: "👶",
    popular: true,
    aliases: ["Beta hCG", "hCG Quantitative", "Pregnancy Blood Test"]
  },

  // ── Autoimmune Diagnostics ──
  {
    id: "ana-ifa",
    slug: "/tests/ana-test-bangalore",
    name: "ANA Profile (HEp-2 IFA Pattern + 12 ENA Antibodies)",
    shortName: "ANA Profile",
    category: "Autoimmune",
    price: 1450,
    mrp: 2200,
    parametersCount: "12 Parameters (IFA Pattern + Titer)",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "24 Hours",
    icon: "🔬",
    popular: true,
    aliases: ["ANA Test", "ANA IFA", "Antinuclear Antibodies", "HEp-2 IFA", "SLE Screening"]
  },
  {
    id: "anti-ccp",
    slug: "/tests/anti-ccp-test-bangalore",
    name: "Anti-CCP Antibody (Rheumatoid Arthritis Marker)",
    shortName: "Anti-CCP",
    category: "Autoimmune",
    price: 1400,
    mrp: 2000,
    parametersCount: "Cyclic Citrullinated Peptide Ab",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🦴",
    popular: false,
    aliases: ["Anti CCP", "ACPA", "Rheumatoid Arthritis Antibody"]
  },

  // ── Advanced Reference Tests (SPEP, IFE, Light Chains) ──
  {
    id: "spep",
    slug: "/tests/spep-test-bangalore",
    name: "Serum Protein Electrophoresis (SPEP / M-Band)",
    shortName: "SPEP Test",
    category: "Advanced Reference Tests",
    price: 1600,
    mrp: 2400,
    parametersCount: "6 Electrophoretic Fractions + Densitometry",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "24–48 Hours",
    icon: "⚡",
    popular: true,
    aliases: ["SPEP", "Serum Protein Electrophoresis", "M Band Test", "Monoclonal Gammopathy", "Multiple Myeloma Screen"]
  },
  {
    id: "immunofixation",
    slug: "/tests/immunofixation-test-bangalore",
    name: "Serum Immunofixation Electrophoresis (IFE)",
    shortName: "IFE Test",
    category: "Advanced Reference Tests",
    price: 3200,
    mrp: 4500,
    parametersCount: "Heavy & Light Chain Identification",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "48 Hours",
    icon: "🧪",
    popular: false,
    aliases: ["Immunofixation", "IFE", "Serum IFE", "Myeloma Heavy Light Chain"]
  },
  {
    id: "free-light-chains",
    slug: "/tests/serum-free-light-chains-bangalore",
    name: "Serum Free Light Chains (Kappa / Lambda Ratio)",
    shortName: "Free Light Chains",
    category: "Advanced Reference Tests",
    price: 3800,
    mrp: 5200,
    parametersCount: "Free Kappa, Free Lambda & Ratio",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "24–48 Hours",
    icon: "🔬",
    popular: false,
    aliases: ["Serum Free Light Chains", "Kappa Lambda Ratio", "FLC Assay"]
  },

  // ── Cancer Markers ──
  {
    id: "psa",
    slug: "/tests/psa-test-bangalore",
    name: "Prostate Specific Antigen Total (PSA)",
    shortName: "PSA Total",
    category: "Cancer Markers",
    price: 750,
    mrp: 1100,
    parametersCount: "Total PSA Marker",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🎗️",
    popular: true,
    aliases: ["PSA", "Total PSA", "Prostate Antigen", "Prostate Cancer Screen"]
  },
  {
    id: "ca-125",
    slug: "/tests/ca-125-test-bangalore",
    name: "CA-125 (Ovarian Cancer & Endometriosis Marker)",
    shortName: "CA-125",
    category: "Cancer Markers",
    price: 1100,
    mrp: 1600,
    parametersCount: "Serum CA-125 Level",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🎗️",
    popular: true,
    aliases: ["CA 125", "CA125", "Ovarian Cancer Marker"]
  },
  {
    id: "cea",
    slug: "/tests/cea-test-bangalore",
    name: "Carcinoembryonic Antigen (CEA Tumor Marker)",
    shortName: "CEA",
    category: "Cancer Markers",
    price: 950,
    mrp: 1400,
    parametersCount: "Serum CEA Level",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "12 Hours",
    icon: "🎗️",
    popular: false,
    aliases: ["CEA", "Carcinoembryonic Antigen", "Colorectal Tumor Marker"]
  },

  // ── Allergy & Intolerance ──
  {
    id: "total-ige",
    slug: "/tests/total-ige-test-bangalore",
    name: "Total IgE Antibody (Allergy Screening)",
    shortName: "Total IgE",
    category: "Allergy",
    price: 650,
    mrp: 950,
    parametersCount: "Serum Total IgE",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "6 Hours",
    icon: "🌾",
    popular: false,
    aliases: ["Total IgE", "IgE Test", "Allergy Antibody"]
  },
  {
    id: "food-intolerance",
    slug: "/tests/food-intolerance-panel-bangalore",
    name: "Comprehensive Food Intolerance Panel (IgG4 200+ Foods)",
    shortName: "Food Intolerance",
    category: "Food Intolerance",
    price: 7500,
    mrp: 11000,
    parametersCount: "210+ Food Antigens",
    sampleType: "Serum",
    fasting: "No Fasting Required",
    tat: "3–4 Days",
    icon: "🥑",
    popular: false,
    aliases: ["Food Intolerance", "Food IgG4", "Food Sensitivity Panel"]
  }
];

export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTests = useMemo(() => {
    return ALL_DIRECTORY_TESTS.filter((test) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories"
          ? true
          : selectedCategory === "Popular Tests"
          ? test.popular === true
          : test.category === selectedCategory;

      // Search filter (Name, Short Name, Category, Aliases)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.shortName.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q) ||
        test.aliases.some((alias) => alias.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Diagnostic Tests Directory — QXL Diagnostics Bengaluru",
    "description": "Complete list of NABL-accredited diagnostic blood tests, hormone panels, and advanced reference assays available at QXL Diagnostics Bengaluru.",
    "numberOfItems": filteredTests.length,
    "itemListElement": filteredTests.slice(0, 30).map((t, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": t.name,
      "url": `https://qxldiagnostics.com${t.slug}`
    }))
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Banner Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-10 lg:py-14 border-b border-sky-950 shadow-md">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-400/90 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  NABL ACCREDITED ({NABL_CERTIFICATE})
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                  Free Doorstep Collection
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
                Diagnostic Tests at QXL Diagnostics Bengaluru
              </h1>
              <p className="text-sky-100 text-xs sm:text-sm font-medium leading-relaxed">
                Explore our comprehensive laboratory test inventory—from routine blood counts and HbA1c to advanced immunofluorescence, SPEP, and fetal screening assays. All tests reviewed by consultant pathologists.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shrink-0 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ISO 15189:2022 Quality Assured</span>
              </div>
              <p className="text-slate-200 font-semibold">Same-Day Reports on WhatsApp &amp; Email</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs transition-all uppercase text-[11px] tracking-wide"
              >
                Booking Helpline: {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="mt-8 relative max-w-3xl">
            <input
              type="text"
              placeholder="Search by test name, short code, symptom, or alias (e.g. CBC, HbA1c, TSH, SPEP, ANA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-semibold px-5 py-3.5 rounded-2xl border-2 border-amber-400/60 focus:border-amber-400 focus:outline-none shadow-lg pr-12"
            />
            <Search className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Category Pills Slider */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1260px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-[#0f2d5e] text-white shadow-xs scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Directory Listing */}
      <main className="max-w-[1260px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2d5e] tracking-tight">
              {selectedCategory === "All Categories" ? "All Diagnostic Tests" : selectedCategory}
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Showing {filteredTests.length} test{filteredTests.length !== 1 ? "s" : ""} available in Bengaluru
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-700 hover:underline font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredTests.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
            <p className="text-3xl mb-3">🔍</p>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">No matching tests found</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
              We couldn't find a test matching &quot;{searchQuery}&quot;. Contact our central laboratory team directly for custom assay inquiries.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0f2d5e] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider"
            >
              Ask Lab Desk on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon, Name, Category */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {test.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {test.category}
                        </span>
                        <Link href={test.slug} className="block mt-1">
                          <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-[#0f2d5e] transition-colors">
                            {test.name}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Aliases Pill */}
                  {test.aliases.length > 0 && (
                    <p className="text-[10.5px] text-slate-500 font-semibold mb-3 leading-normal">
                      <span className="font-bold text-slate-700">Also known as:</span> {test.aliases.slice(0, 4).join(" · ")}
                    </p>
                  )}

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[9.5px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                      🔬 {test.sampleType}
                    </span>
                    <span className="text-[9.5px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      ⏳ {test.fasting}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      ⚡ Report: {test.tat}
                    </span>
                    <span className="text-[9.5px] font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                      📊 {test.parametersCount}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-[#0f2d5e]">₹{test.price}</span>
                      <span className="text-[11px] text-slate-400 line-through font-semibold">₹{test.mrp}</span>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">Home Collection Included</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={test.slug}
                      className="text-[11px] font-extrabold text-slate-600 hover:text-[#0f2d5e] underline px-2 py-1"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/book?test=${encodeURIComponent(test.name)}`}
                      className="bg-[#D69A18] hover:bg-amber-600 !text-white text-[11px] font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                      style={{ color: '#ffffff' }}
                    >
                      Book <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* SEO Content Footer Box */}
      <section className="max-w-[1260px] mx-auto px-4 mt-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-[#0f2d5e]">
            Why Search &amp; Book Diagnostic Tests at QXL Diagnostics Bengaluru?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-600 font-medium leading-relaxed">
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Pathologist-Led Validation
              </h3>
              <p>Every test parameter is analyzed using automated analyzer platforms and verified by consultant pathologists and clinical biochemists under NABL MC-6849 quality controls.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" /> Doorstep Phlebotomy Across Bengaluru
              </h3>
              <p>Free home blood sample collection available across Kengeri, Yelahanka, RR Nagar, Nagarabhavi, Vijayanagar, JP Nagar, Whitefield, HSR, and all major areas with cold-chain transport.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" /> Same-Day Digital Delivery
              </h3>
              <p>Receive clear, doctor-reviewed PDF reports directly on your WhatsApp and Email within 4 to 12 hours for routine diagnostics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
