"use client";
import React, { useState } from 'react';
import { Calendar, User, Phone, MapPin, CheckCircle } from 'lucide-react';

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
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Book a Home Collection</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
            Get your blood tests done from the comfort of your home. Our certified phlebotomists will visit you at your preferred time.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="py-12">
        <div className="max-w-[800px] mx-auto px-4 w-full">
          
          <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#dbeafe] text-[#2563eb] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Home Collection Requested!</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium">
                  Thank you, <strong className="text-slate-700">{formData.name}</strong>. Our team will contact you at <strong className="text-slate-700">{formData.phone}</strong> shortly to confirm your booking and assign a phlebotomist to your address.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', address: '', date: '', tests: '' }); }} 
                  className="bg-[#2563eb] text-white font-bold px-8 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-sm uppercase tracking-wider"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-slate-800 text-xl font-bold mb-4">Patient Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0f2d5e]" /> Patient Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter patient name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0f2d5e]" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 Contact number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tests */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-[#0f2d5e] font-extrabold text-sm">🧪</span> Tests Required (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. CBC, Thyroid, Diabetes"
                      value={formData.tests}
                      onChange={(e) => setFormData({...formData, tests: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0f2d5e]" /> Preferred Date
                    </label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 text-slate-600"
                    />
                  </div>
                </div>

                {/* Home Address */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0f2d5e]" /> Complete Home Address
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Enter your full address in Bengaluru for home sample collection"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 resize-none"
                  />
                </div>

                <div className="bg-[#eff6ff] rounded-xl p-4 flex items-start gap-3 mt-4">
                  <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0 text-white font-bold text-xs mt-0.5">ℹ</div>
                  <p className="text-xs text-[#1e3a8a] font-medium leading-relaxed">
                    By submitting this form, you agree to a callback from our team. Home collection is free for orders above ₹1000 in Bengaluru. All our phlebotomists follow strict hygiene protocols.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-white font-extrabold py-3.5 rounded-xl hover:from-[#1d4ed8] hover:to-[#172554] transition-all uppercase tracking-widest text-[13px] shadow-lg mt-6"
                >
                  Confirm Home Collection
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
