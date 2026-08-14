"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Freedom80CampaignSection() {
  const healthAreas = [
    { title: "Diabetes & Blood Sugar", icon: "🩸", desc: "FBS, HbA1c & eAG for 3-month glycemic control." },
    { title: "General Health & Anaemia", icon: "🩺", desc: "Complete Blood Count, ESR, Haemoglobin & Iron." },
    { title: "Heart & Cholesterol", icon: "❤️", desc: "Lipid Profile, HDL, LDL, Triglycerides & Cardiac Ratios." },
    { title: "Thyroid Health", icon: "🦋", desc: "TSH, T3 & T4 screening for endocrine balance." },
    { title: "Liver Health", icon: "🧬", desc: "12 LFT parameters including Bilirubin, SGOT, SGPT & ALP." },
    { title: "Kidney Health", icon: "💧", desc: "12 KFT parameters including Creatinine, BUN & Electrolytes." },
    { title: "Bone, Mineral & Joint", icon: "🦴", desc: "Calcium, Phosphorus & ALP bone density markers." },
    { title: "Urinary Health", icon: "🔬", desc: "Complete 11-parameter Urine Physical & Microscopy." }
  ];

  return (
    <section id="freedom80-details" className="py-16 bg-white relative">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-[#0f2d5e] text-amber-400 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
            🇮🇳 80th INDEPENDENCE DAY CAMPAIGN
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f2d5e] mb-4">
            QXL FREEDOM 80 HEALTH CHECK
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed">
            Celebrate India's 80th Independence Day with the freedom and confidence of knowing your health.
          </p>
        </div>

        {/* 3 Large Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-sky-50 to-blue-50/60 border border-blue-200/80 rounded-3xl p-8 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#2563eb]" />
            <div className="text-6xl font-black text-[#2563eb] mb-2 group-hover:scale-105 transition-transform">80</div>
            <div className="text-lg font-black text-[#0f2d5e] uppercase tracking-wider mb-1">Health Parameters</div>
            <p className="text-slate-500 text-xs font-medium">Comprehensive blood, metabolic & urinary profile.</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/80 rounded-3xl p-8 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
            <div className="text-6xl font-black text-amber-600 mb-2 group-hover:scale-105 transition-transform">8</div>
            <div className="text-lg font-black text-[#0f2d5e] uppercase tracking-wider mb-1">Major Health Areas</div>
            <p className="text-slate-500 text-xs font-medium">Covering every essential organ system.</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200/80 rounded-3xl p-8 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
            <div className="text-5xl font-black text-emerald-600 mb-2 group-hover:scale-105 transition-transform">₹800</div>
            <div className="text-lg font-black text-[#0f2d5e] uppercase tracking-wider mb-1">Special Offer</div>
            <p className="text-slate-500 text-xs font-medium">Regular / Market Value: <span className="line-through font-bold text-slate-400">₹5,800</span> (Save 86%)</p>
          </div>
        </div>

        {/* 8 Health Areas Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mb-2">
            8 Major Health Areas Screened
          </h3>
          <p className="text-slate-500 text-sm font-semibold">
            Every card features targeted organ evaluation backed by specialist medical review.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {healthAreas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Tricolour Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: idx % 3 === 0 ? '#FF9933' : idx % 3 === 1 ? '#000080' : '#138808'
                }}
              />
              <div>
                <div className="text-3xl mb-3">{area.icon}</div>
                <h4 className="font-extrabold text-[#0f2d5e] text-base mb-1.5 leading-snug">
                  {area.title}
                </h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  {area.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/book?package=QXL%20Freedom%2080%20Health%20Check"
            className="inline-block bg-[#2563eb] hover:bg-blue-700 text-white font-black px-8 py-4 rounded-full text-sm sm:text-base shadow-xl active:scale-95 transition-all uppercase tracking-wider"
          >
            Book Your Freedom 80 Check @ ₹800 →
          </Link>
        </div>

      </div>
    </section>
  );
}
