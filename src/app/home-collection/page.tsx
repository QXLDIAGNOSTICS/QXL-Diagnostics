"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCheck, ShieldCheck, Clock, CheckCircle, User, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';
import MobileTrustBadges from '@/components/MobileTrustBadges';

export default function HomeCollectionPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    tests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen pb-16">
      {/* Page Header (Clean White Design without duplicate back button) */}
      <div className="bg-white border-b border-slate-100 p-4 shadow-2xs">
        <span className="font-black text-lg tracking-tight text-[#0f2d5e]">Home Collection</span>
      </div>

      {/* ── Mobile Screen 3 Mockup Hero & Feature Checklist ── */}
      <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
        {/* Phlebotomist Scooter Banner Illustration Card */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-5 border border-[#F3DBA7] shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          {/* Scooter Visual Icon/Graphic */}
          <div className="w-32 h-28 relative mb-3 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#FFF8EB] border-2 border-[#E9C47A] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-5xl">🛵</span>
            </div>
          </div>

          <h2 className="text-xl font-black text-slate-900 mb-1">Book Home Collection</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mb-4">
            Safe, reliable and convenient sample collection from the comfort of your home.
          </p>

          {/* Feature Checklist matching Screen 3 */}
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

          {/* Schedule Button in #D69A18 */}
          <a
            href="#booking-form"
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

        {/* ── Form Section ── */}
        <div id="booking-form" className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm mt-2">
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Home Collection Requested!</h3>
              <p className="text-xs text-slate-600 mb-6 font-medium">
                Thank you, <strong>{formData.name}</strong>. Our team will contact you at <strong>{formData.phone}</strong> shortly to confirm your preferred slot.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', address: '', date: '', tests: '' }); }}
                className="bg-[#D69A18] text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-slate-900 text-base font-black border-b border-gray-100 pb-2">
                Patient & Address Details
              </h3>

              <div>
                <label className="text-[11px] font-extrabold text-slate-700 mb-1 block uppercase tracking-wider">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D69A18] bg-gray-50/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-700 mb-1 block uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Contact number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D69A18] bg-gray-50/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-700 mb-1 block uppercase tracking-wider">
                  Tests Required (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CBC, Thyroid, Lipid Profile"
                  value={formData.tests}
                  onChange={(e) => setFormData({ ...formData, tests: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D69A18] bg-gray-50/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-700 mb-1 block uppercase tracking-wider">
                  Complete Address in Bengaluru *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="House No, Street, Area, Pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D69A18] bg-gray-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all mt-2"
              >
                Confirm Home Collection
              </button>
            </form>
          )}
        </div>
      </div>

      <MobileTrustBadges />
    </div>
  );
}
