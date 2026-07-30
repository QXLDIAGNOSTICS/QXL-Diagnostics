"use client";
import React from 'react';
import Link from 'next/link';
import {
  Heart, Brain, Activity,
  Droplet, TestTube, Baby,
  Dna, Shield, Eye, Ear, BrainCircuit,
  Smile, Microscope, Stethoscope, AlertTriangle, ArrowRight, BookOpen, ChevronRight
} from 'lucide-react';

export default function SymptomGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <BookOpen size={16} className="text-blue-600" />
            <span className="text-[#0f2d5e]">QXL Diagnostics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f2d5e] mb-4">
            Symptom &amp; Test Guide
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Find the right diagnostic tests based on your symptoms, organised by body system.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: Heart, label: "Cardiovascular", href: "/faq#CV", desc: "Heart, blood pressure, cholesterol" },
            { icon: Brain, label: "Neurological", href: "/faq#NE", desc: "Headaches, migraines, memory" },
            { icon: Droplet, label: "Blood Disorders", href: "/faq#HE", desc: "Anemia, clotting, CBC" },
            { icon: Activity, label: "Endocrine", href: "/faq#EN", desc: "Diabetes, thyroid, hormones" },
            { icon: TestTube, label: "Liver & GI", href: "/faq#GI", desc: "Liver function, digestion, hepatitis" },
            { icon: Dna, label: "Infectious Diseases", href: "/faq#ID", desc: "Fever, infections, immunity" },
            { icon: Eye, label: "Ophthalmology", href: "/faq#OC", desc: "Diabetic retinopathy, eye health" },
            { icon: Ear, label: "ENT", href: "/faq#AU", desc: "Ear infections, sinus, throat" },
            { icon: Baby, label: "Women's Health", href: "/faq#RH", desc: "PCOS, fertility, pregnancy" },
            { icon: BrainCircuit, label: "Mental Health", href: "/faq#MH", desc: "Depression, anxiety, mood" },
            { icon: Smile, label: "Oral Health", href: "/faq#OD", desc: "Dental, oral bacteria" },
            { icon: Microscope, label: "Oncology", href: "/faq#ON", desc: "Tumour markers, cancer screening" },
          ].map(({ icon: Icon, label, href, desc }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-[#0f2d5e] text-[15px]">{label}</p>
                <p className="text-slate-500 text-[13px] mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-extrabold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View Full FAQ Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
