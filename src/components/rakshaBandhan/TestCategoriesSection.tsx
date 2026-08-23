"use client";

import React from "react";
import { Activity, HeartPulse, Stethoscope, ShieldAlert, Droplet, Flame, Sun, Heart, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TestCategoriesSectionProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function TestCategoriesSection({ onOpenBooking }: TestCategoriesSectionProps) {
  const categories = [
    {
      title: "Full Body Health Check",
      desc: "Comprehensive 64-parameter health check for systemic wellness and organ monitoring.",
      icon: Activity,
      link: "/full-body-checkup-bangalore",
    },
    {
      title: "Diabetes Tests",
      desc: "HbA1c, Fasting Glucose, Postprandial Glucose & Insulin resistance panels.",
      icon: Droplet,
      link: "/hba1c-test",
    },
    {
      title: "Thyroid Tests",
      desc: "TSH, Free T3, Free T4, and Thyroid Antibody testing for hormonal balance.",
      icon: Flame,
      link: "/thyroid-test",
    },
    {
      title: "Heart Health Tests",
      desc: "Lipid Profile, Apolipoprotein, hs-CRP & Cardiac risk markers.",
      icon: HeartPulse,
      link: "/lipid-profile-test",
    },
    {
      title: "Liver Tests",
      desc: "SGOT, SGPT, Bilirubin & Protein panel for liver health evaluation.",
      icon: Stethoscope,
      link: "/liver-function-test",
    },
    {
      title: "Kidney Tests",
      desc: "Serum Creatinine, Blood Urea, Uric Acid, Electrolytes & eGFR.",
      icon: ShieldAlert,
      link: "/kidney-function-test",
    },
    {
      title: "Vitamin Tests",
      desc: "Vitamin D3 (25-OH) & Vitamin B12 deficiency screening.",
      icon: Sun,
      link: "/vitamin-d-test",
    },
    {
      title: "Women's Health Tests",
      desc: "Female hormone profiles, PCOD/PCOS screening, Iron & Bone health.",
      icon: Heart,
      link: "/packages",
    },
    {
      title: "Men's Health Tests",
      desc: "Prostate PSA, Cardiac Risk, Executive Health & Vital Biomarkers.",
      icon: User,
      link: "/packages",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0A5DAA] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>SPECIALIZED DIAGNOSTICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Explore Health Tests
          </h2>

          <p className="text-base text-slate-600 font-medium">
            Browse our essential diagnostic test panels available with home sample collection.
          </p>
        </div>

        {/* 9 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5F9FC] rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-white text-[#0A5DAA] border border-slate-100 shadow-sm w-fit mb-4 group-hover:bg-[#0A5DAA] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking(cat.title)}
                    className="text-xs font-bold text-[#0A5DAA] hover:text-[#00A8A8] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                  >
                    <span>EXPLORE TESTS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href={cat.link}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                  >
                    Learn More
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
