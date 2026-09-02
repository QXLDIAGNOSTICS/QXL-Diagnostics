"use client";

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function HomeCollectionClientForm() {
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
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs">
      {submitted ? (
        <div className="text-center py-6 flex flex-col items-center">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">Home Collection Requested!</h3>
          <p className="text-xs text-slate-600 mb-5 font-medium">
            Thank you, <strong>{formData.name}</strong>. Our team will contact you at <strong>{formData.phone}</strong> shortly to confirm your slot.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', address: '', date: '', tests: '' }); }}
            className="bg-[#D69A18] text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-xs"
          >
            Book Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <h3 className="text-slate-900 text-sm font-black border-b border-gray-100 pb-2">
            Patient &amp; Address Details
          </h3>

          <div>
            <label className="text-[10.5px] font-extrabold text-slate-600 mb-1 block uppercase tracking-wider">
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
            <label className="text-[10.5px] font-extrabold text-slate-600 mb-1 block uppercase tracking-wider">
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
            <label className="text-[10.5px] font-extrabold text-slate-600 mb-1 block uppercase tracking-wider">
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
            <label className="text-[10.5px] font-extrabold text-slate-600 mb-1 block uppercase tracking-wider">
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

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="dpdp-consent-homecol"
              required
              className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#D69A18] focus:ring-[#D69A18] cursor-pointer shrink-0"
            />
            <label htmlFor="dpdp-consent-homecol" className="text-[10.5px] text-slate-500 font-medium leading-tight cursor-pointer">
              I consent to QXL Diagnostics contacting me &amp; processing address data per DPDP guidelines and <a href="/privacy-policy" target="_blank" className="text-blue-600 underline font-semibold">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all mt-2 cursor-pointer"
          >
            Confirm Home Collection
          </button>
        </form>
      )}
    </div>
  );
}
