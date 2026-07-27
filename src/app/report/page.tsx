"use client";
import React, { useState } from 'react';
import { Download, FileText, ShieldCheck } from 'lucide-react';

export default function ReportPage() {
  const [formData, setFormData] = useState({
    bookingId: '',
    phone: ''
  });
  const [reportFound, setReportFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (formData.bookingId.length > 3 && formData.phone.length > 5) {
      setReportFound(true);
    } else {
      setReportFound(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Page Hero */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="glass-panel p-8 md:p-12 rounded-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">Patient Portal</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c4a6e] mb-3">Download Diagnostic Reports</h1>
            <p className="text-slate-700 text-sm md:text-base max-w-xl font-medium">
              Enter your booking reference credentials to securely retrieve and download your clinical test results.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 mb-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10 justify-center">
          
          {/* Query Form */}
          <div className="w-full lg:w-1/2 glass-card p-8 rounded-3xl">
            <h3 className="text-[#0c4a6e] text-lg font-extrabold mb-6 border-b border-sky-200/40 pb-3">Access Portal</h3>
            
            <form onSubmit={handleSearch} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-slate-600 mb-1.5 uppercase tracking-wider">Booking ID / Reference ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. QXL-90871"
                  value={formData.bookingId}
                  onChange={(e) => setFormData({...formData, bookingId: e.target.value})}
                  className="glass-pill px-4 py-3 text-xs text-[#0c4a6e] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-slate-600 mb-1.5 uppercase tracking-wider">Registered Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="glass-pill px-4 py-3 text-xs text-[#0c4a6e] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>

              <button 
                type="submit" 
                className="btn-sky w-full py-3.5 text-xs shadow-md mt-2"
              >
                Search Report
              </button>
            </form>

            {/* Results Display */}
            {searched && (
              <div className="mt-8 pt-6 border-t border-sky-200/40">
                {reportFound ? (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-4 justify-between shadow-sm">
                    <div className="flex items-start gap-3">
                      <FileText className="w-8 h-8 text-emerald-600 mt-0.5" />
                      <div>
                        <span className="text-xs font-extrabold text-[#0c4a6e] block">QXL Diagnostic Report</span>
                        <span className="text-[10px] text-slate-600 font-semibold block">ID: {formData.bookingId} • Status: Approved</span>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert("PDF Report download initiated successfully."); }}
                      className="bg-emerald-600 text-white font-extrabold py-2 px-4 rounded-full text-[10px] uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                ) : (
                  <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 text-center">
                    <span className="text-xs font-extrabold text-rose-700 block">No Records Found</span>
                    <span className="text-[10px] text-slate-600 font-semibold block mt-1">Please verify the Booking ID and registered mobile number.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className="w-full lg:w-1/3 glass-panel p-8 rounded-3xl h-fit space-y-4">
            <h4 className="font-extrabold text-[#0c4a6e] text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0284c7]" />
              <span>Report Security</span>
            </h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Patient reports contain confidential medical profiles. Our systems ensure secure transmission:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                Double authentication verification
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                Encrypted database storage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                24/7 technical coordinator assistance
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
