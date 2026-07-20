"use client";
import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Heart, Activity, Shield, Bone, Star, ChevronRight } from 'lucide-react';

export default function HealthRisksPage() {
  const riskGroups = [
    {
      title: "Cardiovascular Risks",
      description: "Assess heart health, lipid/cholesterol imbalance, and hypertension risks.",
      icon: <Heart className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Lipid Profile Extended", "Advanced Cardiac Panel", "Hypertension Panel Comprehensive"],
      link: "/specialities/cardiology"
    },
    {
      title: "Diabetes & Metabolic Risks",
      description: "Screen for insulin resistance, pre-diabetes, and type-1/type-2 diabetic conditions.",
      icon: <Activity className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Diabetic Profile Comprehensive", "HbA1c Glycated Hemoglobin", "Diabetes Type 1 Autoimmune Profile"],
      link: "/specialities/endocrinology"
    },
    {
      title: "Liver & Kidney Risks",
      description: "Monitor organ performance, metabolic waste filtration, and toxic accumulation.",
      icon: <Shield className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Autoimmune Liver Disease Panel"],
      link: "/specialities/gastroenterology"
    },
    {
      title: "Bone & Joint Disorders",
      description: "Evaluate mineral deficiencies, arthritis indicators, and calcium metabolism risks.",
      icon: <Bone className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Arthritis Profile", "Bone & Mineral Metabolism Panel", "Rheumatoid Arthritis Panel"],
      link: "/specialities/bone-disorders"
    },
    {
      title: "Age-Related & Geriatric Risks",
      description: "General body screenings designed specifically for senior age groups (both male and female).",
      icon: <Star className="w-8 h-8 text-[#2563eb]" />,
      tests: ["Senior Citizen Male Checkup", "Senior Citizen Female Checkup", "Nutritional Anemia Panel"],
      link: "/packages"
    }
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Health Risks Screenings</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Proactive health assessments grouped by risk profiles to help you identify and mitigate potential health concerns early.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Grid of Risk Groups */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskGroups.map((group, idx) => (
              <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
                    {group.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{group.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{group.description}</p>
                  
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <span className="text-[11px] font-bold text-[#0f2d5e] tracking-wider uppercase block mb-2">Recommended Tests</span>
                    <ul className="space-y-1">
                      {group.tests.map((test, tid) => (
                        <li key={tid} className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link href={group.link} className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline uppercase tracking-wider">
                  View Speciality Panels <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
