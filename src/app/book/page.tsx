"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, MapPin, Search, ChevronRight, Shield, Plus, X } from 'lucide-react';
import { packagesData } from '../../data/packages';
import { api } from '../../lib/api';

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    collectionType: 'home' // 'home' or 'center'
  });
  const [testNames, setTestNames] = useState<string[]>([]);
  const [testInput, setTestInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const multiple = params.getAll('tests').map(t => t.trim()).filter(Boolean);
    const single = params.get('package');
    if (multiple.length) {
      setTestNames(multiple);
    } else if (single) {
      setTestNames([single]);
    }
  }, []);

  const addTest = () => {
    const value = testInput.trim();
    if (!value) return;
    setTestNames(prev => (prev.includes(value) ? prev : [...prev, value]));
    setTestInput('');
  };

  const removeTest = (name: string) => {
    setTestNames(prev => prev.filter(t => t !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setError(null);
    setSubmitting(true);
    try {
      await api.bookings.create({
        patient_name: formData.name,
        patient_phone: formData.phone,
        test_name: testNames.length ? testNames.join(', ') : null,
        collection_type: formData.collectionType === 'center' ? 'center' : 'home',
        collection_address: formData.collectionType === 'home' ? formData.address || null : null,
        preferred_date: formData.date || null,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission failed', err);
      setError('We could not submit your booking. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPackageDetailsList = testNames
    .map(name => packagesData.find(p => p.name === name))
    .filter((p): p is (typeof packagesData)[number] => Boolean(p));

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
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', address: '', date: '', collectionType: 'home' }); setTestNames([]); setTestInput(''); }} 
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

                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-[#0f2d5e]" /> Tests / Packages to Book
                  </label>
                  {testNames.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {testNames.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#0f2d5e] text-xs font-bold pl-3 pr-2 py-1.5 rounded-full"
                        >
                          {name}
                          <button
                            type="button"
                            onClick={() => removeTest(name)}
                            className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Complete Blood Count (CBC) — press Enter to add"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTest();
                        }
                      }}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                    <button
                      type="button"
                      onClick={addTest}
                      className="shrink-0 bg-[#0f2d5e] text-white font-bold px-4 rounded-xl hover:bg-[#0f2d5e]/90 transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {testNames.length === 0 && (
                    <p className="text-[11px] text-slate-400 mt-2 font-medium">
                      Add one or more tests/packages, or leave blank and our team will help you choose.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {error && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
                )}

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit Booking Request'}
                </button>
              </form>
            )}
          </div>

          {/* Right Info Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {selectedPackageDetailsList.map((pkg) => (
              <div key={pkg.name} className="bg-white border border-[#2563eb]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#2563eb] text-white px-3 py-1 rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider">
                  Selected
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-lg mb-2 pr-16">{pkg.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#2563eb]">₹{pkg.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{pkg.old_price}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-[11px] text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#0f2d5e]" /> {pkg.parameters}
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    <strong>Includes:</strong> {pkg.includes}
                  </p>
                </div>
              </div>
            ))}
            
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
