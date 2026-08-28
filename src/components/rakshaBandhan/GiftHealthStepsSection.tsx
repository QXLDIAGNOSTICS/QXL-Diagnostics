"use client";

import React from "react";
import { Gift, CalendarCheck, Home, ArrowRight, Heart } from "lucide-react";

interface GiftHealthStepsSectionProps {
  onOpenBooking: () => void;
}

export default function GiftHealthStepsSection({ onOpenBooking }: GiftHealthStepsSectionProps) {
  const steps = [
    {
      step: "01",
      title: "Choose a Health Check",
      description: "Select our curated Raksha Bandhan Health Checkup (64 Parameters) or tailored Men's/Women's wellness panels.",
      icon: Gift,
      color: "bg-blue-50 text-[#0A5DAA]",
    },
    {
      step: "02",
      title: "Book Your Test",
      description: "Fill in patient details online or place a quick call/WhatsApp request to confirm your preferred date and time slot.",
      icon: CalendarCheck,
      color: "bg-teal-50 text-[#00A8A8]",
    },
    {
      step: "03",
      title: "Get Your Sample Collected",
      description: "Our trained phlebotomy specialist visits your home anywhere in Bengaluru for safe, hygienic blood collection.",
      icon: Home,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>MEANINGFUL CELEBRATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Don't Just Gift a Rakhi. Gift a Health Check.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            A thoughtful health check can be a meaningful way to show your loved ones that you care.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5F9FC] rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 relative text-left group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="py-4 px-8 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>GIFT A HEALTH CHECK NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
