"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, Users, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from "../../lib/api";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    api.packages
      .list()
      .then((data) => {
        if (cancelled) return;
        setPackages(
          data.map((p) => ({
            ...p,
            age: p.age_group,
            benefits: p.benefits ? JSON.parse(p.benefits) : [],
          }))
        );
      })
      .catch((err) => console.error("Failed to load packages", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const Card = ({ name, price, old_price, parameters, includes, tag, save_amount, benefits, who_should_take, age, gender, doctor_recommended }: any) => (
    <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-[0_12px_30px_rgba(37,99,235,0.15)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between h-full relative group">
      {doctor_recommended && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider z-10">
          Doctor Recommended
        </div>
      )}
      
      <div>
        <div className="mb-3 pr-12">
          {tag && <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-2 border border-blue-100">{tag}</span>}
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
                  <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
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
        <div className="flex items-end justify-between mb-3">
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
        
        <Link 
          href={`/book?package=${encodeURIComponent(name)}`}
          className="flex items-center justify-center gap-1.5 w-full bg-[#2563eb] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all"
        >
          Book Now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );

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
