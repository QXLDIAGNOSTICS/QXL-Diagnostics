import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Clock, MapPin, Phone, MessageSquare, ArrowRight, Award, UserCheck, ThermometerSnowflake, FileCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import BookingFormWidget from '@/components/BookingFormWidget';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileTrustBadges from '@/components/MobileTrustBadges';
import HomeCollectionClientForm from './HomeCollectionClientForm';

const SITE_URL = "https://qxldiagnostics.com";

export const metadata: Metadata = {
  title: "Home Blood Collection Bangalore | QXL Diagnostics",
  description: "Book home blood collection across Bengaluru. NABL Accredited diagnostic laboratory (MC-6849), trained phlebotomy specialists, temperature-controlled cold chain transport & same-day reports.",
  alternates: { canonical: `${SITE_URL}/home-blood-collection-bangalore` },
  openGraph: {
    title: "Home Blood Collection in Bangalore | QXL Diagnostics",
    description: "Book home blood collection across Bengaluru. NABL Accredited laboratory, trained phlebotomists & same-day reports.",
    url: `${SITE_URL}/home-blood-collection-bangalore`,
  },
};

export default function HomeBloodCollectionPage() {
  return (
    <main className="bg-[#f8faff] min-h-screen text-slate-900">
      {/* ── MOBILE VIEW (lg:hidden) — EXACT MATCH TO SCREENSHOT 3 ── */}
      <div className="lg:hidden flex flex-col w-full pb-16">
        {/* Mobile Amber Header (#D69A18) without duplicate back button */}
        <div className="bg-[#D69A18] text-white p-3.5 px-4 shadow-md">
          <span className="font-extrabold text-base tracking-wide text-white">Home Collection</span>
        </div>

        {/* Hero & Feature Checklist (Matching Screenshot 3) */}
        <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
          {/* Phlebotomist Scooter Banner Illustration Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-5 border border-[#F3DBA7] shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            {/* Scooter Visual Graphic */}
            <div className="w-32 h-28 relative mb-3 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#FFF8EB] border-2 border-[#E9C47A] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-5xl">🛵</span>
              </div>
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-1">Book Home Collection</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mb-4">
              Safe, reliable and convenient sample collection from the comfort of your home.
            </p>

            {/* Feature Checklist matching Screenshot 3 */}
            <div className="w-full bg-white rounded-2xl p-3.5 border border-gray-150 shadow-xs space-y-2.5 text-left mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-[#D69A18] shrink-0">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-extrabold text-slate-800">Trained phlebotomists</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-[#D69A18] shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-extrabold text-slate-800">Tamper-proof sample collection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-[#D69A18] shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-extrabold text-slate-800">Reports delivered on time</span>
              </div>
            </div>

            {/* Schedule Home Collection Button (#D69A18) */}
            <a
              href="#mobile-booking-form"
              className="w-full bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md uppercase text-xs tracking-wider transition-all text-center"
            >
              Schedule Home Collection
            </a>

            {/* Badge: 100% Safe & Hygienic */}
            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-extrabold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
              <ShieldCheck className="w-4 h-4 text-[#D69A18]" />
              <span>100% Safe & Hygienic</span>
            </div>
          </div>

          {/* Interactive Client Booking Form */}
          <div id="mobile-booking-form">
            <HomeCollectionClientForm />
          </div>
        </div>

        <MobileTrustBadges />
      </div>

      {/* ── DESKTOP VIEW (hidden lg:block) ── */}
      <div className="hidden lg:block">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0f2d5e] via-[#1b3d7a] to-[#2563eb] text-white py-14 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-300" />
                NABL Accredited Medical Laboratory (MC-6849)
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                Home Blood Sample Collection <br className="hidden sm:block" /> Across Bengaluru
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
                Professional, hygienic home blood draw by QXL-trained phlebotomy specialists. Samples transported in temperature-monitored cold chain containers to our NABL Accredited laboratory.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur border border-white/15 p-3 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-300 mb-1" />
                  <span className="block text-xs text-blue-200">Early Slot</span>
                  <span className="text-sm font-bold text-white">6:30 AM Onwards</span>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/15 p-3 rounded-xl">
                  <ThermometerSnowflake className="w-5 h-5 text-cyan-300 mb-1" />
                  <span className="block text-xs text-blue-200">Sample Transport</span>
                  <span className="text-sm font-bold text-white">Cold Chain Safe</span>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/15 p-3 rounded-xl">
                  <FileCheck className="w-5 h-5 text-emerald-300 mb-1" />
                  <span className="block text-xs text-blue-200">Report TAT</span>
                  <span className="text-sm font-bold text-white">Same Day (6 Hrs)</span>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/15 p-3 rounded-xl">
                  <UserCheck className="w-5 h-5 text-purple-300 mb-1" />
                  <span className="block text-xs text-blue-200">Reviewer</span>
                  <span className="text-sm font-bold text-white">MD Pathologist</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-3">
                <a href="tel:+919964639639" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm uppercase tracking-wider transition-all">
                  <Phone className="w-4 h-4" /> Call +91 9964 639 639
                </a>
                <a href="https://wa.me/919964639639?text=Hi%20QXL%2C%20I%20want%20to%20book%20home%20blood%20collection." target="_blank" rel="noopener noreferrer" className="bg-emerald-600/30 border border-emerald-400/50 hover:bg-emerald-600/50 text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm uppercase tracking-wider transition-all">
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Booking
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-blue-100">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-1">Book Home Sample Collection</h2>
              <p className="text-xs text-slate-500 mb-4">Select your required test or package below</p>
              <BookingFormWidget />
            </div>
          </div>
        </section>

        {/* Quality & Pre-Analytical Protocol */}
        <section className="py-14 max-w-[1200px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">Pre-Analytical Quality Protocol</span>
            <h2 className="text-3xl font-extrabold text-[#0f2d5e] mt-3">Why Patients Trust QXL Home Collection</h2>
            <p className="text-slate-600 text-sm mt-2">
              Sample integrity before reaching the laboratory analyzer is critical for accurate clinical results. QXL enforces strict pre-analytical handling protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-lg">1</div>
              <h3 className="font-bold text-slate-900 text-lg">QXL-Trained Phlebotomists</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every home draw is performed by qualified phlebotomy specialists adhering to sterile single-use vacuum tube equipment and patient comfort protocols.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center font-black text-lg">2</div>
              <h3 className="font-bold text-slate-900 text-lg">Cold-Chain Sample Transport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Blood specimens are immediately placed in temperature-monitored insulated transport containers, preserving cell stability and preventing ex-vivo degradation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black text-lg">3</div>
              <h3 className="font-bold text-slate-900 text-lg">NABL Lab Processing & MD Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Samples are processed on automated analyzers at our NABL Accredited facility (MC-6849), reviewed by consultant pathologists/biochemists, and delivered digitally.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
