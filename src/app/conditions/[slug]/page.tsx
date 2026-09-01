import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight, Activity, Stethoscope, AlertTriangle, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MedicalReviewerBadge from '@/components/MedicalReviewerBadge';
import { CONDITIONS_DATA } from '@/lib/conditionsData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CONDITIONS_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = CONDITIONS_DATA[slug];
  if (!condition) return { title: "Condition Diagnostics | QXL Diagnostics" };

  return {
    title: condition.title,
    description: condition.subtitle,
    alternates: {
      canonical: `https://qxldiagnostics.com/conditions/${slug}`,
    },
  };
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const condition = CONDITIONS_DATA[slug];
  if (!condition) notFound();

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2d5e] to-[#1e3a8a] text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <span className="inline-block bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            {condition.category} Clinical Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{condition.h1Title}</h1>
          <p className="text-blue-100 text-base max-w-3xl mt-2 leading-relaxed">{condition.subtitle}</p>

          <div className="mt-6">
            <MedicalReviewerBadge />
          </div>
        </div>
      </section>

      <section className="py-12 max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left main content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Clinical Overview
            </h2>
            {condition.overview.map((paragraph, idx) => (
              <p key={idx} className="text-sm text-slate-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* Symptoms */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Common Symptoms & Clinical Indicators
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Tests */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" /> Recommended Laboratory Investigations
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {condition.recommendedTests.map((t, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{t.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-lg font-black text-slate-900">₹{t.price}</span>
                    <Link
                      href={`/${t.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 uppercase tracking-wider"
                    >
                      View Test <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-lg font-extrabold text-white">Book Home Sample Collection</h3>
            <p className="text-xs text-blue-100">Sample draw by trained phlebotomy specialists. NABL Accredited processing with 6-hour report delivery.</p>
            <Link
              href="/home-blood-collection-bangalore"
              className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Book Home Collection
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
