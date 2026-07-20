"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FaqSection from '@/components/FaqSection';

export default function HomeSampleCollectionPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Home Sample Collection
          </h1>
          <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold">
            <Link href="/" className="hover:text-[#2563eb]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#2563eb]">Home Sample Collection</span>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="prose prose-lg prose-blue max-w-none text-slate-700">
            <p className="text-xl font-medium text-slate-600 mb-8 leading-relaxed">
              Explore our comprehensive home sample collection services at QXL Diagnostics. 
              Our NABL accredited laboratories are equipped with the latest technology to ensure precise and reliable results.
            </p>
            <p>
              Please contact us at +91 99646 39639 or email qxldiagnostics@gmail.com for more detailed information about this service. 
              We are constantly updating our digital resources to serve you better.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
