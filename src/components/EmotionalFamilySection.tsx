"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EmotionalFamilySection() {
  const familyStories = [
    {
      role: "FATHER",
      title: "Always Postpones His Health Check",
      quote: "“I'm working non-stop, I'll get checked up next month when I have time.”",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150119/Assets-QXL/legacy-assets/image/doctor_patient_consult.jpg"
    },
    {
      role: "MOTHER",
      title: "Puts Everyone Else Before Herself",
      quote: "“As long as my children and family are healthy, I don't need any test.”",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg"
    },
    {
      role: "YOUNG ADULT",
      title: "Thinks Youth Means Immunity",
      quote: "“I feel active and fit every day, why do I need blood parameters checked?”",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg"
    },
    {
      role: "GRANDPARENT",
      title: "Ignores Early Warning Signs",
      quote: "“It's just age catching up, no need to trouble anyone for a doctor visit.”",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150236/Assets-QXL/legacy-assets/image/senior_bp_check.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#fff7ed] via-white to-[#f0fdf4] text-slate-900 relative overflow-hidden border-y border-amber-200/50">
      {/* Subtle Tricolour Gradient Waves Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/50 via-sky-100/50 to-emerald-200/50 blur-3xl pointer-events-none" />

      <div className="max-w-[1260px] mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-800 font-extrabold text-xs tracking-widest uppercase mb-3 inline-block bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
            🇮🇳 HEALTH FREEDOM FOR YOUR FAMILY
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-[#0284c7]">
            “I’M FINE. I’LL GET TESTED LATER.”
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed">
            How many times have your loved ones said this? Preventive screening catches metabolic silent risks before symptoms appear.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {familyStories.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/90 border border-amber-200/80 hover:border-amber-400 rounded-3xl p-6 backdrop-blur-lg flex flex-col justify-between group hover:shadow-xl transition-all shadow-md"
            >
              <div>
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 relative bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2563eb] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {item.role}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0284c7] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs italic font-semibold leading-relaxed mb-4">
                  {item.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner callout */}
        <div className="bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 border-2 border-amber-400/50 rounded-3xl p-8 md:p-10 text-center max-w-4xl mx-auto backdrop-blur-xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-black text-[#0284c7] mb-3">
            This Independence Day, turn “later” into “today.”
          </h3>
          <p className="text-slate-700 text-sm md:text-base font-bold mb-6 max-w-xl mx-auto">
            Give your parents, spouse, and children the freedom to know their health parameters with the QXL Freedom 80 Checkup.
          </p>
          <Link
            href="/book?package=QXL%20Freedom%2080%20Health%20Check"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-8 py-4 rounded-full text-base shadow-xl hover:shadow-amber-500/20 active:scale-95 transition-all text-center uppercase tracking-wider"
          >
            Book a Health Check for Your Family →
          </Link>
        </div>
      </div>
    </section>
  );
}
