"use client";
import React from 'react';

export default function Accreditations() {
  return (
    <section className="py-16 bg-[#0d2e42] border-t border-blue-900">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <span className="inline-block bg-[#2563eb]/20 text-blue-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Quality & Trust</span>
            <h2 className="text-white text-3xl font-extrabold mb-4">Certified for Excellence</h2>
            <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
              QXL Diagnostics is proud to be accredited by the highest national and international regulatory bodies. Our commitment to stringent quality control ensures that your health is always in safe, reliable hands.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">NABL Accredited (MC-6849)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">ISO 9001:2015 Certified Company</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">Daily Internal Quality Control (IQC)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">External Quality Assessment Scheme (EQAS)</span>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2 flex items-center justify-center md:justify-end gap-6">
            {/* NABL Badge */}
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center w-40 h-40 transform hover:-translate-y-2 transition-transform">
              <span className="text-[#000080] font-black text-4xl tracking-tighter leading-none mb-2">NABL</span>
              <span className="text-black font-extrabold text-[10px] uppercase text-center leading-tight">Accredited Lab</span>
              <span className="text-black font-extrabold text-[11px] mt-1">MC - 6849</span>
            </div>
            
            {/* ISO Badge */}
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-center w-40 h-40 transform hover:-translate-y-2 transition-transform delay-75">
              <div className="w-[100px] h-[100px] rounded-full border-[6px] border-[#1b4b8a] flex flex-col items-center justify-center relative">
                <div className="absolute inset-[3px] rounded-full border-2 border-[#1b4b8a]"></div>
                <span className="text-[#1b4b8a] font-extrabold text-[9px] tracking-[0.1em] absolute top-[12px]">CERTIFIED</span>
                <span className="text-[#1b4b8a] font-black text-3xl tracking-tight leading-none mt-1">ISO</span>
                <span className="text-[#1b4b8a] font-bold text-[10px] leading-none mt-0.5">9001-2015</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
