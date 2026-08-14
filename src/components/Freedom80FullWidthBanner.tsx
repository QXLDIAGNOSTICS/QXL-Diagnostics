"use client";
import React from 'react';
import Link from 'next/link';

export default function Freedom80FullWidthBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#fff7ed] via-white to-[#f0fdf4] text-slate-900 relative overflow-hidden border-y-2 border-amber-300 shadow-md">
      {/* Flowing Tricolour Animated Ribbon Background */}
      <div 
        className="absolute inset-0 opacity-25 animate-tricolour-wave"
        style={{
          background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      <div className="max-w-[1260px] mx-auto px-4 relative z-10 text-center">
        <div className="text-4xl mb-3">🇮🇳</div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight max-w-4xl mx-auto text-[#0284c7]">
          THIS INDEPENDENCE DAY, CHOOSE THE FREEDOM TO KNOW YOUR HEALTH.
        </h2>
        
        <div className="inline-flex items-center gap-3 bg-white border border-amber-300 px-6 py-2 rounded-full mb-8 shadow-sm">
          <span className="text-amber-600 font-black text-sm sm:text-base">QXL FREEDOM 80</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-700 text-xs sm:text-sm font-bold">80 Parameters | 8 Health Areas | ₹800</span>
        </div>

        <div>
          <Link
            href="/book?package=QXL%20Freedom%2080%20Health%20Check"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-9 py-4 rounded-full text-base shadow-2xl active:scale-95 transition-all uppercase tracking-wider"
          >
            Book Now @ ₹800 →
          </Link>
        </div>
      </div>
    </section>
  );
}
