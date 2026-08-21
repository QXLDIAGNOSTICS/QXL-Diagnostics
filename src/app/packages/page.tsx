"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, Users, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from "../../lib/api";
import { packagesData } from '../../data/packages';
import PopularPackagesGrid from '@/components/PopularPackagesGrid';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    // Using static packagesData instead of API for now
    setPackages(
      packagesData.map((p: any) => ({
        ...p,
        age: p.age_group || p.age,
        benefits: typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits || []),
      }))
    );
  }, []);

  const Card = ({ name, price, old_price, parameters, includes, tag, save_amount, benefits, who_should_take, age, gender, doctor_recommended, most_booked }: any) => {
    const isFreedom80 = name?.toLowerCase().includes("freedom 80") || price === "800" || price === 800;

    return (
      <div className={`bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full relative group ${
        isFreedom80 
          ? "border-amber-400 ring-2 ring-amber-400/50 shadow-xl bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30 scale-[1.02]" 
          : "border-blue-100 hover:shadow-lg hover:border-blue-300"
      }`}>
        {isFreedom80 && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5 z-20">
            🔥 INDEPENDENCE SPECIAL OFFER — 86% OFF
          </div>
        )}

        {doctor_recommended && !isFreedom80 && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider z-10">
            Doctor Recommended
          </div>
        )}
        
        <div>
          <div className="mb-3 pr-12 pt-2">
            <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 border ${
              isFreedom80 
                ? "bg-amber-100 text-amber-900 border-amber-300" 
                : "bg-blue-50 text-blue-700 border-blue-100"
            }`}>
              {tag || (isFreedom80 ? "INDEPENDENCE SPECIAL" : "WELLNESS")}
            </span>
            <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{name}</h3>
          </div>

          {benefits && benefits.length > 0 && (
            <div className="mb-3">
              <ul className="space-y-1.5">
                {benefits.map((b: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                    <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isFreedom80 ? "text-amber-600" : "text-emerald-500"}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="my-3 pt-3 border-t border-dashed border-gray-200">
            <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
              <strong className="text-slate-800 font-bold">Includes:</strong> {includes}
            </p>
          </div>
        </div>

        <div className="pt-4 mt-auto border-t border-gray-100">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-xs text-slate-400 line-through block mb-0.5">₹{old_price || "5800"}</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-black ${isFreedom80 ? "text-emerald-600" : "text-slate-900"}`}>₹{price}</span>
                {isFreedom80 && <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Save ₹5,000</span>}
              </div>
            </div>
            {save_amount && !isFreedom80 && (
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block">
                  Save ₹{save_amount}
                </span>
              </div>
            )}
          </div>
          
          <Link 
            href={`/book?package=${encodeURIComponent(name)}`}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md ${
              isFreedom80
                ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/25"
                : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            }`}
          >
            Book Now @ ₹{price} <ArrowRight className="w-4 h-4" />
          </Link>
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
      <PopularPackagesGrid />
    </div>
  );
}
