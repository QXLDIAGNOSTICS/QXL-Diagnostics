"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, Users, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from "../../lib/api";

const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    name: "Quick Fit Package",
    tag: "QUICK",
    price: 1770,
    old_price: 4696,
    save_amount: 2926,
    parameters: "13 Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "All adults",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    most_booked: true,
    benefits: ["Complete metabolic screening", "Same-day electronic reports"]
  },
  {
    id: "pkg-2",
    name: "Q-Screen Diabetes Package",
    tag: "DIABETES",
    price: 1900,
    old_price: 4960,
    save_amount: 3060,
    parameters: "12 Parameters",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "Diabetic & pre-diabetic individuals",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["Detailed diabetic monitoring", "Microalbumin screening included"]
  },
  {
    id: "pkg-3",
    name: "Q-Master Health Pro Package",
    tag: "MOST BOOKED",
    price: 4600,
    old_price: 9600,
    save_amount: 5000,
    parameters: "20 Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.",
    who_should_take: "Advanced full body assessment",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    most_booked: true,
    benefits: ["Apolipoproteins assessment", "Gastritis & H. pylori screen"]
  },
  {
    id: "pkg-4",
    name: "Q-Oncoscreen Package",
    tag: "ONCOSCREEN",
    price: 7900,
    old_price: 13600,
    save_amount: 5700,
    parameters: "10 Parameters",
    includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.",
    who_should_take: "Cancer risk screening",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: false,
    home_collection_available: true,
    benefits: ["Key cancer tumor markers", "Stool calprotectin screening"]
  },
  {
    id: "pkg-5",
    name: "Q-Advanced Arthritis and Autoimmune Panel",
    tag: "ARTHRITIS",
    price: 6900,
    old_price: 12660,
    save_amount: 5760,
    parameters: "22 Parameters",
    includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "Joint pain & swelling concerns",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: false,
    home_collection_available: true,
    benefits: ["Rheumatoid Factor & Anti-CCP", "Bone & Joint markers", "ANA autoimmune check"]
  },
  {
    id: "pkg-6",
    name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
    tag: "CARDIAC",
    price: 9000,
    old_price: 18900,
    save_amount: 9900,
    parameters: "25 Parameters",
    includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.",
    who_should_take: "Cardiovascular health assessment",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["NT-proBNP cardiac marker", "Lp(a), Homocysteine & Fibrinogen", "Apo-A1 & Apo-B ratio"]
  }
];

export default function PackagesPage() {
  const sortedDefault = [...DEFAULT_PACKAGES].sort((a, b) => Number(a.price) - Number(b.price));
  const [packages, setPackages] = useState<any[]>(sortedDefault);
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setCartItems(JSON.parse(localStorage.getItem('qxl_cart') || '[]'));
      } catch {}
    }

    let cancelled = false;
    api.packages
      .list()
      .then((res: any) => {
        if (cancelled) return;
        // Handle both direct array and paginated { items: [] } structures
        const data = Array.isArray(res) ? res : (res?.items || []);
        
        const fetched = data.map((p: any) => {
          let parsedBenefits = [];
          try {
            parsedBenefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits || []);
          } catch (e) {
            // fallback if benefits is just a comma separated string
            parsedBenefits = typeof p.benefits === 'string' ? p.benefits.split(',').map((s: string) => s.trim()) : [];
          }
          return {
            ...p,
            age: p.age_group || p.age,
            benefits: parsedBenefits,
          };
        });
        
        // Merge fetched packages into defaults, keeping defaults as baseline
        const merged: any[] = [...DEFAULT_PACKAGES];
        for (const f of fetched) {
          if (!merged.some(m => m.name.toLowerCase() === f.name.toLowerCase())) {
            merged.push(f);
          }
        }
        merged.sort((a, b) => Number(a.price) - Number(b.price));
        setPackages(merged);
      })
      .catch((err) => {
        console.error("Failed to load packages, using defaults", err);
        // Ensure we always render the default packages on failure
        setPackages([...DEFAULT_PACKAGES].sort((a, b) => Number(a.price) - Number(b.price)));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggleCart = (name: string) => {
    let updated: string[];
    if (cartItems.includes(name)) {
      updated = cartItems.filter(item => item !== name);
      localStorage.setItem('qxl_cart', JSON.stringify(updated));
    } else {
      updated = [...cartItems, name];
      localStorage.setItem('qxl_cart', JSON.stringify(updated));
    }
    setCartItems(updated);
    window.dispatchEvent(new CustomEvent('cartChange'));
  };

  const handleBookNow = (name: string) => {
    if (typeof window !== 'undefined') {
      try {
        const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
        if (!cart.includes(name)) {
          cart.push(name);
          localStorage.setItem('qxl_cart', JSON.stringify(cart));
          window.dispatchEvent(new CustomEvent('cartChange'));
        }
      } catch {}
    }
    window.location.href = `/cart`;
  };

  const Card = ({ name, price, old_price, parameters, includes, tag, save_amount, benefits, who_should_take, age, gender, doctor_recommended, most_booked }: any) => {
    const isInCart = cartItems.includes(name);
    return (
      <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-[0_12px_30px_rgba(37,99,235,0.15)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between h-full relative group">
        <div className="absolute top-0 left-0 right-0 flex justify-between z-10">
          {most_booked && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-br-lg rounded-tl-xl uppercase tracking-wider shadow-md flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Most Booked
            </div>
          )}
          {doctor_recommended && (
            <div className="bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider ml-auto">
              Doctor Recommended
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-3 pr-12">
            {tag && (!most_booked || tag.toUpperCase() !== "MOST BOOKED") && (
              <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-2 border border-blue-100">{tag}</span>
            )}
            <h3 className="font-bold text-slate-800 text-base leading-snug">{name}</h3>
          </div>

          <p className="text-[11px] text-slate-600 font-medium mb-3 flex items-start gap-1.5 bg-blue-50/50 p-2 rounded-md border border-blue-50">
            <Users className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" /> 
            <span>
              <strong className="text-slate-800 block mb-0.5 text-[10px] uppercase tracking-wider">Ideal For</strong>
              {who_should_take} ({age}, {gender})
            </span>
          </p>

          {benefits && benefits.length > 0 && (
            <div className="mb-3">
              <ul className="space-y-1">
                {benefits.map((b: string, i: number) => (
                  <li key={i} className="text-[10px] text-slate-600 flex items-start gap-1.5 font-medium leading-tight">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="my-3 pt-3 border-t border-dashed border-gray-200">
            <p className="text-[10px] text-slate-500 font-medium line-clamp-2 hover:line-clamp-none transition-all cursor-pointer leading-relaxed">
              <strong className="text-slate-700">Includes:</strong> {includes}
            </p>
          </div>

        </div>

        <div className="pt-3 mt-auto border-t border-gray-100">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-[10px] text-slate-400 line-through block mb-0.5">₹{old_price}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">₹{price}</span>
              </div>
            </div>
            {save_amount && (
              <div className="text-right">
                <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block">
                  Save ₹{save_amount}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleToggleCart(name)}
              className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                isInCart
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isInCart ? "✓ Added" : "+ Add to Cart"}
            </button>
            <button
              onClick={() => handleBookNow(name)}
              className="flex-1 flex items-center justify-center gap-1 bg-[#2563eb] text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Light Blue Simple Hero */}
      <section className="bg-[#e0f2fe] py-12 relative overflow-hidden border-b border-blue-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
              Comprehensive Health
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">Expert Health Check <br/>Packages for Everyone</h1>
            <p className="text-blue-800 text-sm font-medium mb-6 opacity-90">
              Browse our clinical packages and blood tests, certified with NABL-level quality. Free home collection and same-day electronic reports included.
            </p>

          </div>
        </div>
      </section>

      {/* Recommended Packages Section */}
      <section className="py-12 bg-[#f8faff]">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-[#0f2d5e] text-2xl font-bold mb-1 tracking-tight">Health Packages</h2>
              <p className="text-slate-500 text-xs font-medium">Popular choices tailored for your specific needs.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Card {...p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
