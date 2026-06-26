"use client";
import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, Droplet, Star, Shield, ChevronRight } from 'lucide-react';

export default function HealthConditionsPage() {
  const conditions = [
    {
      name: "Diabetes & Thyroid Profile",
      description: "Manage blood sugar levels, thyroid hormone imbalances, and metabolic rates.",
      icon: <Activity className="w-8 h-8 text-[#2563eb]" />,
      tests: ["HbA1c Glycated Hemoglobin", "Thyroid Comprehensive Panel", "Diabetic Profile Comprehensive"],
      link: "/specialities/endocrinology"
    },
    {
      name: "Hypertension & Heart Health",
      description: "Track elevated blood pressure, lipid abnormalities, and cardiac markers.",
      icon: <Heart className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Lipid Profile Extended", "Advanced Cardiac Panel", "Hypertension Panel Comprehensive"],
      link: "/specialities/cardiology"
    },
    {
      name: "Arthritis & Bone Metabolism",
      description: "Assess chronic joint pain, systemic autoimmune indicators, and calcium loss.",
      icon: <Star className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Arthritis Profile", "Bone Health (Osteoscreen)", "Rheumatoid Arthritis Panel"],
      link: "/specialities/bone-disorders"
    },
    {
      name: "Gastrointestinal & Digestive issues",
      description: "Diagnose malabsorption, viral hepatitis, celiac sensitivity, and inflammatory bowel diseases.",
      icon: <Shield className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Celiac Disease Profile", "Inflammatory Bowel Disease Panel", "Wilson Disease Panel"],
      link: "/specialities/gastroenterology"
    },
    {
      name: "Kidney & Renal Disorders",
      description: "Monitor glomerular filtration rate (eGFR), creatinine ratio, and urine microalbumin.",
      icon: <ShieldAlert className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Kidney Function Test (KFT)", "Calcium/Creatinine Ratio Urine", "Urine Complete Examination"],
      link: "/specialities/urology"
    },
    {
      name: "Allergies & Immunodeficiency",
      description: "Screen for environmental and dietary allergens, antibody levels, and immune deficiencies.",
      icon: <Droplet className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Phadiatop Allergy Test", "WBC Disorders Profile", "Multiple Myeloma Diagnostic Panel"],
      link: "/specialities/hematology"
    }
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Health Conditions</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
              Search diagnostic profiles tailored specifically to manage, monitor, and diagnose chronic and acute health conditions.
            </p>
            <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img src="/images/banners/health_conditions_set.png" alt="Health Conditions Overview" className="w-full max-w-[360px] h-auto object-contain drop-shadow-md rounded-3xl border border-white/50" />
          </div>
        </div>
      </section>

      {/* Grid of Conditions */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((cond, idx) => (
              <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
                    {cond.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{cond.name}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{cond.description}</p>
                  
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <span className="text-[11px] font-bold text-[#0f2d5e] tracking-wider uppercase block mb-2">Key Test Panels</span>
                    <ul className="space-y-1">
                      {cond.tests.map((test, tid) => (
                        <li key={tid} className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link href={cond.link} className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline uppercase tracking-wider">
                  Explore Specialties <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
