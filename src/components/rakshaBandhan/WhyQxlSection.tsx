"use client";

import React from "react";
import { ShieldCheck, Activity, Home, Layers, CalendarCheck, UserCheck } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

export default function WhyQxlSection() {
  const features = [
    {
      title: "NABL Certified Laboratory",
      description: `Formal accreditation (MC-6849) adhering strictly to ISO 15189:2022 medical quality standards.`,
      icon: ShieldCheck,
      badge: "NABL ACCREDITED",
    },
    {
      title: "Reliable Diagnostic Testing",
      description: "Advanced automated analyzers with stringent multi-level internal and external quality controls.",
      icon: Activity,
      badge: "HIGH PRECISION",
    },
    {
      title: "Home Sample Collection",
      description: "Trained, vaccinated phlebotomists providing hygienic blood sample collection across Bengaluru.",
      icon: Home,
      badge: "DOORSTEP SERVICE",
    },
    {
      title: "Wide Range of Tests",
      description: "Comprehensive catalog covering routine blood tests, organ profiles, specialized hormones & health panels.",
      icon: Layers,
      badge: "3000+ TESTS",
    },
    {
      title: "Convenient Booking",
      description: "Instant online scheduling, WhatsApp booking, and direct telephone support for hassle-free slots.",
      icon: CalendarCheck,
      badge: "EASY SLOTS",
    },
    {
      title: "Experienced Healthcare Team",
      description: "Doctor-led operations supervised by qualified pathologists, biochemists, and senior lab technologists.",
      icon: UserCheck,
      badge: "DOCTOR-LED",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FC] relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 text-[#00A8A8] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ACCUMULATED TRUST & EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose QXL Diagnostics?
          </h2>

          <p className="text-base text-slate-600 font-medium max-w-2xl mx-auto">
            Combining medical accuracy, modern diagnostic technology, and compassionate patient care in Bengaluru.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-teal-50 text-[#00A8A8]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#0A5DAA] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span>QXL Standard Operating Procedure</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
