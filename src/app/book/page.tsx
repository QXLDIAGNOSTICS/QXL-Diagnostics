"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, MapPin, Search, ChevronRight, Shield } from 'lucide-react';
import { packagesData } from '../../data/packages';

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    testName: '',
    address: '',
    date: '',
    collectionType: 'home' // 'home' or 'center'
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageName = params.get('package');
    if (packageName) {
      setFormData(prev => ({ ...prev, testName: packageName }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  const selectedPackageDetails = packagesData.find(p => p.name === formData.testName);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Book a Health Test</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Schedule a certified home sample collection or request an appointment at our laboratory in Bengaluru.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
          
          {/* Left Form */}
          <div className="w-full lg:w-2/3 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#dbeafe] text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold">✓</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Request Received!</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium">
                  Thank you, <strong className="text-slate-700">{formData.name}</strong>. Our clinical coordinator will call you back at <strong className="text-slate-700">{formData.phone}</strong> within 15 minutes to confirm your test slot.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', testName: '', address: '', date: '', collectionType: 'home' }); }} 
                  className="bg-[#2563eb] text-white font-bold px-8 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-sm uppercase tracking-wider"
                >
                  Book Another Test
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-slate-800 text-xl font-bold mb-4">Patient & Test Information</h2>
                
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
                  {/* Test Selection */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-[#0f2d5e]" /> Selected Test or Package
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Complete Blood Count (CBC)"
                      value={formData.testName}
                      onChange={(e) => setFormData({...formData, testName: e.target.value})}
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

                {/* Collection Method */}
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wider block">Sample Collection Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer border border-gray-150 rounded-xl p-4 flex-1 hover:bg-gray-50/50 transition-colors">
                      <input 
                        type="radio" 
                        name="collectionType" 
                        value="home"
                        checked={formData.collectionType === 'home'}
                        onChange={(e) => setFormData({...formData, collectionType: e.target.value})}
                        className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Home Collection</span>
                        <span className="text-[10px] text-slate-400 font-semibold block">We collect sample from your address</span>
                      </div>
                    </label>
                    
                    <label className="flex items-center cursor-pointer border border-gray-150 rounded-xl p-4 flex-1 hover:bg-gray-50/50 transition-colors">
                      <input 
                        type="radio" 
                        name="collectionType" 
                        value="center"
                        checked={formData.collectionType === 'center'}
                        onChange={(e) => setFormData({...formData, collectionType: e.target.value})}
                        className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Walk-in Lab Center</span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Visit our Kengeri lab in Bengaluru</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Home Address */}
                {formData.collectionType === 'home' && (
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0f2d5e]" /> Home Address
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Enter full address for sample collection in Bengaluru"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 resize-none"
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md mt-6"
                >
                  Submit Booking Request
                </button>
              </form>
            )}
          </div>

          {/* Right Info Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {selectedPackageDetails && (
              <div className="bg-white border border-[#2563eb]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#2563eb] text-white px-3 py-1 rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider">
                  Selected
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-lg mb-2 pr-16">{selectedPackageDetails.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#2563eb]">₹{selectedPackageDetails.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{selectedPackageDetails.old_price}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-[11px] text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#0f2d5e]" /> {selectedPackageDetails.parameters}
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    <strong>Includes:</strong> {selectedPackageDetails.includes}
                  </p>
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-br from-[#0f2d5e] to-[#0e4253] text-white rounded-3xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Why Book with QXL?</h3>
              <ul className="space-y-4 text-xs font-semibold">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Advanced NABL accredited standards with expert validation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>100% sterile vacuum containers for collection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Cold-chain logistics ensures sample integrity</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Secure digital PDF reports directly on WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)] text-center">
              <h3 className="font-bold text-slate-800 text-sm mb-2">Need Instant Help?</h3>
              <p className="text-slate-500 text-xs mb-4 font-semibold">Speak directly with our test booking coordinators</p>
              <a href="tel:+919964639639" className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#2563eb] font-extrabold px-6 py-2.5 rounded-full text-xs hover:bg-[#d5e8ed] transition-colors">
                <Phone className="w-4 h-4" /> Call +91 9964 639639
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
