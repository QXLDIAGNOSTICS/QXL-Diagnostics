"use client";
import React, { useState } from 'react';
import { MapPin, Microscope, Calendar, User, Phone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PHONE_DISPLAY } from '../lib/businessInfo';

export default function StickyBookingForm() {
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [selectedTest, setSelectedTest] = useState('Full Body Checkup (80 Params)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="sticky top-[90px] z-30 w-full text-left">
      <div className="bg-white/95 backdrop-blur-2xl border border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D69A18] via-[#E08500] to-[#D69A18]" />

        <div className="mb-4 pt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[9.5px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              Quick Appointment
            </span>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NABL MC-6849
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#0f2d5e] leading-tight">
            Book a Test / <span className="text-[#D69A18]">Home Collection</span>
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Free sample pickup across Bengaluru. Same-day reports.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center my-4"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-extrabold text-emerald-900 text-sm">Booking Request Sent!</h4>
            <p className="text-xs text-emerald-700 font-medium mt-1">
              Our phlebotomist team will call you back shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Location selector */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#D69A18] absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#FFF8EB]/50 border border-[#F3DBA7] rounded-xl pl-9 pr-3 h-10 text-xs font-extrabold text-[#0f2d5e] focus:outline-none focus:border-[#D69A18] transition-colors cursor-pointer appearance-none"
                >
                  <option value="Bengaluru">Bengaluru (All Localities)</option>
                  <option value="Kengeri">Kengeri Main Lab</option>
                  <option value="Yelahanka">Yelahanka Hub</option>
                  <option value="Nagarabhavi">Nagarabhavi</option>
                  <option value="Vijayanagar">Vijayanagar</option>
                  <option value="RR Nagar">RR Nagar</option>
                </select>
              </div>
            </div>

            {/* Test or Package selector */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                Select Test / Package
              </label>
              <div className="relative">
                <Microscope className="w-4 h-4 text-[#D69A18] absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full bg-[#FFF8EB]/50 border border-[#F3DBA7] rounded-xl pl-9 pr-3 h-10 text-xs font-extrabold text-[#0f2d5e] focus:outline-none focus:border-[#D69A18] transition-colors cursor-pointer appearance-none truncate"
                >
                  <optgroup label="── Popular Health Packages ──">
                    <option value="Full Body Checkup (80 Params)">Full Body Checkup (80 Params) - ₹800</option>
                    <option value="Quick Fit Package">Quick Fit Package - ₹1,770</option>
                    <option value="Q-Screen Diabetes Package">Q-Screen Diabetes Package - ₹1,900</option>
                    <option value="Q-Master Health Pro Package">Q-Master Health Pro Package - ₹4,600</option>
                    <option value="Q-Advanced Arthritis Panel">Q-Advanced Arthritis Panel - ₹6,900</option>
                    <option value="Executive Senior Citizen Checkup">Executive Senior Citizen Checkup - ₹2,999</option>
                    <option value="Women Wellness Checkup">Women Wellness Checkup - ₹2,499</option>
                  </optgroup>

                  <optgroup label="── Popular Blood Tests ──">
                    <option value="CBC Blood Test">Complete Blood Count (CBC) - ₹200</option>
                    <option value="HbA1c Diabetes Profile">HbA1c Diabetes Profile - ₹350</option>
                    <option value="Thyroid Total Panel">Thyroid Total Panel (T3, T4, TSH) - ₹650</option>
                    <option value="Lipid Profile">Lipid Profile (Cholesterol) - ₹750</option>
                    <option value="Liver Function Test">Liver Function Test (LFT) - ₹600</option>
                    <option value="Kidney Function Test">Kidney Function Test (KFT) - ₹600</option>
                    <option value="Vitamin D & B12 Combo">Vitamin D3 &amp; B12 Combo - ₹1,200</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 h-10 text-xs font-bold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 9964 639 639"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 h-10 text-xs font-bold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18]"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                Preferred Collection Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 h-10 text-xs font-bold text-[#0f2d5e] focus:outline-none focus:border-[#D69A18]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D69A18] to-[#E08500] hover:from-[#C58B12] hover:to-[#C67300] text-white font-black py-3 px-5 rounded-xl shadow-md active:scale-95 hover:scale-[1.01] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Schedule Home Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span className="text-slate-500 font-medium">Free Doorstep Pickup</span>
          <a href={`tel:${PHONE_DISPLAY}`} className="text-[#0f2d5e] hover:underline font-black">
            Call +91 9964 639 639
          </a>
        </div>
      </div>
    </div>
  );
}
