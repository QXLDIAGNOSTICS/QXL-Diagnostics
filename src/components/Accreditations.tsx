"use client";
import React from 'react';
import { NABL_CERTIFICATE, ISO_STANDARD } from '@/lib/businessInfo';

type Props = { decorativeHeading?: boolean };

export default function Accreditations({ decorativeHeading = false }: Props) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #075985 100%)' }}>
      {/* Glass orb decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position:'absolute', top:'-60px', right:'-40px', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'-40px', left:'-30px', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle, rgba(147,210,255,0.12) 0%, transparent 70%)', filter:'blur(30px)' }} />
      </div>
      <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <span className="inline-block bg-[#38bdf8]/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Quality & Trust</span>
            <Heading className="!text-white text-3xl font-extrabold mb-4 drop-shadow-sm">Certified for Excellence</Heading>
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
          
          <div className="md:w-1/2 flex items-center justify-center md:justify-end gap-6">
            {/* NABL Badge */}
            <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col items-center justify-center w-40 h-40 transform hover:-translate-y-2 transition-transform relative">
              <img src="https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150212/Assets-QXL/legacy-assets/image/nabl.png" alt="NABL Accredited Lab" className="w-full h-auto object-contain" />
              <span className="text-black font-extrabold text-[11px] mt-2 text-center absolute bottom-2">{NABL_CERTIFICATE.replace('-', ' - ')}</span>
            </div>
            
            {/* ISO Badge */}
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-center w-40 h-40 transform hover:-translate-y-2 transition-transform delay-75">
              <div className="w-[100px] h-[100px] rounded-full border-[6px] border-[#1b4b8a] flex flex-col items-center justify-center relative">
                <div className="absolute inset-[3px] rounded-full border-2 border-[#1b4b8a]"></div>
                <span className="text-[#1b4b8a] font-extrabold text-[9px] tracking-[0.1em] absolute top-[12px]">CERTIFIED</span>
                <span className="text-[#1b4b8a] font-black text-3xl tracking-tight leading-none mt-1">ISO</span>
                <span className="text-[#1b4b8a] font-bold text-[10px] leading-none mt-0.5">15189:2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
