import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const ALL_PACKAGES = [
  {
    id: "raksha-bandhan-800",
    name: "Raksha Bandhan Special Health Checkup",
    price: "800",
    old_price: "5800",
    save_amount: "5000",
    discountPercent: "86% OFF",
    parameters: "80 Parameters",
    includes: "CBC (26), HbA1c & Fasting Sugar (3), Lipid Profile (8), Liver Function (11), Kidney Function (8), Thyroid Profile (3), Bone & Urinary Markers (21).",
    tag: "RAKSHA BANDHAN OFFER",
    most_booked: true,
    benefits: ["80 Health Parameters", "8 Major Organ Systems", "Free Doorstep Home Collection"]
  },
  {
    id: "pkg-fit",
    name: "Quick Fit Package",
    price: "1770",
    old_price: "4696",
    save_amount: "2926",
    discountPercent: "62% OFF",
    parameters: "12+ Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine.",
    tag: "FITNESS",
    most_booked: true,
    benefits: ["Essential fitness screening", "Diabetes & lipid baseline", "Liver & kidney health"]
  },
  {
    id: "pkg-2",
    name: "Q-Screen Diabetes Package",
    price: "1900",
    old_price: "4960",
    save_amount: "3060",
    discountPercent: "62% OFF",
    parameters: "15+ Parameters",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium), TSH, CBC, ESR, Urine Routine.",
    tag: "DIABETES",
    most_booked: false,
    benefits: ["Early diabetes detection", "Monitor blood sugar control", "Assess kidney impact from diabetes"]
  },
  {
    id: "pkg-3",
    name: "Q-Master Health Pro Package",
    price: "4600",
    old_price: "9600",
    save_amount: "5000",
    discountPercent: "52% OFF",
    parameters: "25+ Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine, Gastritis Screen (H. pylori IgG), hs-CRP.",
    tag: "MOST BOOKED PRO",
    most_booked: true,
    benefits: ["Complete systemic evaluation", "Heart risk assessment", "Extensive vitamin & thyroid checks"]
  },
  {
    id: "pkg-5",
    name: "Q-Advanced Arthritis & Autoimmune Panel",
    price: "6900",
    old_price: "12660",
    save_amount: "5760",
    discountPercent: "45% OFF",
    parameters: "22 Parameters",
    includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine.",
    tag: "ADVANCED AUTOIMMUNE",
    most_booked: false,
    benefits: ["Autoimmune joint screening", "Inflammatory markers (hs-CRP, ESR)", "Bone & iron metabolism"]
  },
  {
    id: "pkg-4",
    name: "Q-Oncology Biomarker Panel",
    price: "7900",
    old_price: "13600",
    save_amount: "5700",
    discountPercent: "42% OFF",
    parameters: "15+ Parameters",
    includes: "Tumour Biomarkers (AFP, CEA, Beta HCG, PSA Male / CA-125 Female, CA 19-9), CBC, ESR, Urine Routine, Calprotectin in Stool, FOBT, Protein Electrophoresis.",
    tag: "SPECIALIST ONCOLOGY",
    most_booked: false,
    benefits: ["Physician-directed tumour markers", "Monoclonal protein screening", "Stool calprotectin & occult blood"]
  },
  {
    id: "pkg-6",
    name: "Q-Cardiovascular Risk Assessment Package",
    price: "9000",
    old_price: "18900",
    save_amount: "9900",
    discountPercent: "52% OFF",
    parameters: "25+ Parameters",
    includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen, Cortisol, Serum Magnesium.",
    tag: "CARDIOVASCULAR PRO",
    most_booked: false,
    benefits: ["Complete cardiac biomarker profiling", "Lp(a), ApoB, Homocysteine & NT-proBNP", "Endothelial & metabolic risk"]
  }
];

export default function PopularPackagesGrid() {
  return (
    <section className="py-14 bg-[#f8faff] border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="bg-blue-100 text-blue-900 border border-blue-200 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            Complete Diagnostic Packages
          </span>
          <h2 className="text-3xl font-black text-[#0f2d5e] mt-2">All Doctor-Curated Health Checkup Packages</h2>
          <p className="text-slate-600 text-sm mt-1">
            Choose the package depth that fits your health goals. Free home sample collection across Bengaluru &amp; same-day reports included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="mb-3 pt-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 border bg-blue-50 text-blue-700 border-blue-100">
                      {pkg.tag}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{pkg.name}</h3>
                  </div>

                  <div className="mb-3">
                    <ul className="space-y-1.5">
                      {pkg.benefits.map((b, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="my-3 pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      <strong className="text-slate-800 font-bold">Includes:</strong> {pkg.includes}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-xs text-slate-400 line-through block mb-0.5">₹{pkg.old_price}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{pkg.price}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Save ₹{pkg.save_amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/book?package=${encodeURIComponent(pkg.name)}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  >
                    Book Package @ ₹{pkg.price} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
