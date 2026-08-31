"use client";

import React from "react";
import { Laptop, Home, FileText, CheckCircle2 } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Book Online",
      text: "Choose your health package and book your appointment.",
      icon: Laptop,
    },
    {
      num: "02",
      title: "Sample Collection",
      text: "Visit a QXL centre or choose home sample collection where available.",
      icon: Home,
    },
    {
      num: "03",
      title: "Get Your Report",
      text: "Receive your diagnostic report through the available QXL delivery channels.",
      icon: FileText,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FC] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 text-[#00A8A8] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SIMPLE & CONVENIENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            How It Works
          </h2>

          <p className="text-base text-slate-600 font-medium">
            3 simple steps to get your health checkup completed seamlessly.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all text-left relative overflow-hidden"
              >
                {/* Large Background Step Number */}
                <span className="text-5xl font-black text-slate-100 font-mono absolute top-4 right-6 pointer-events-none">
                  {item.num}
                </span>

                <div className="p-4 rounded-2xl bg-cyan-50 text-[#00A8A8] w-fit mb-6">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="text-xs font-bold text-[#0A5DAA] uppercase tracking-widest mb-1">
                  Step {item.num}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
