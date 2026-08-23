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
    return (
      <div className="bg-white border border-blue-100 hover:shadow-lg hover:border-blue-300 rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full relative group">
        {doctor_recommended && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider z-10">
            Doctor Recommended
          </div>
        )}
        
        <div>
          <div className="mb-3 pr-12 pt-2">
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 border bg-blue-50 text-blue-700 border-blue-100">
              {tag || "WELLNESS"}
            </span>
            <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{name}</h3>
          </div>

          {benefits && benefits.length > 0 && (
            <div className="mb-3">
              <ul className="space-y-1.5">
                {benefits.map((b: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
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
              {old_price && <span className="text-xs text-slate-400 line-through block mb-0.5">₹{old_price}</span>}
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">₹{price}</span>
              </div>
            </div>
            {save_amount && (
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block">
                  Save ₹{save_amount}
                </span>
              </div>
            )}
          </div>
          
          <Link 
            href={`/book?package=${encodeURIComponent(name)}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
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
