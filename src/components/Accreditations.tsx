"use client";
import React from 'react';
import { NABL_CERTIFICATE, ISO_STANDARD } from '@/lib/businessInfo';

type Props = { decorativeHeading?: boolean };

export default function Accreditations({ decorativeHeading = false }: Props) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  return (
    <section className="py-16 bg-[#0d2e42] border-t border-blue-900">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <span className="inline-block bg-[#2563eb]/20 text-blue-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Quality & Trust</span>
            <Heading className="text-white !text-white text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: '#ffffff' }}>Certified for Excellence</Heading>
            <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
              QXL Diagnostics is proud to be accredited by the highest national and international regulatory bodies. Our commitment to stringent quality control ensures that your health is always in safe, reliable hands.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">NABL Accredited ({NABL_CERTIFICATE})</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-white text-sm font-bold">{ISO_STANDARD} Certified Medical Lab</span>
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
          
          <div className="md:w-1/2 flex items-center justify-center md:justify-end">
            <div className="bg-white p-4 rounded-3xl shadow-xl transform hover:-translate-y-1 transition-transform overflow-hidden max-w-md">
              <img
                src="/images/nabl_certified.png"
                alt="NABL Accredited Lab and ISO Certified Company"
                className="w-full h-auto object-contain max-h-[180px] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
