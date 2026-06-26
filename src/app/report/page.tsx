"use client";
import React, { useState } from 'react';
import { Download, FileText, Search, ShieldCheck } from 'lucide-react';

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
    // Mock simple validation
    if (formData.bookingId.length > 3 && formData.phone.length > 5) {
      setReportFound(true);
    } else {
      setReportFound(false);
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Download Diagnostic Reports</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Enter your booking reference credentials to securely retrieve and download your clinical test results.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10 justify-center">
          
          {/* Query Form */}
          <div className="w-full lg:w-1/2 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h3 className="text-slate-800 text-lg font-bold mb-4 border-b border-gray-100 pb-2">Access Portal</h3>
            
            <form onSubmit={handleSearch} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Booking ID / Reference ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. QXL-90871"
                  value={formData.bookingId}
                  onChange={(e) => setFormData({...formData, bookingId: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Registered Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md"
              >
                Search Report
              </button>
            </form>

            {/* Results Display */}
            {searched && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                {reportFound ? (
                  <div className="bg-green-50/50 border border-green-200 rounded-2xl p-4 flex items-start gap-4 justify-between">
                    <div className="flex items-start gap-3">
                      <FileText className="w-8 h-8 text-green-600 mt-0.5" />
                      <div>
                        <span className="text-xs font-extrabold text-slate-800 block">QXL Diagnostic Report</span>
                        <span className="text-[10px] text-slate-400 font-semibold block">ID: {formData.bookingId} • Status: Approved</span>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert("PDF Report download initiated successfully."); }}
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-[10px] uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                ) : (
                  <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 text-center">
                    <span className="text-xs font-bold text-red-700 block">No Records Found</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">Please verify the Booking ID and registered mobile number.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className="w-full lg:w-1/3 bg-gray-50/50 border border-gray-150 rounded-3xl p-6 h-fit space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-[#0f2d5e]" />
              <span>Report Security</span>
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Patient reports contain confidential medical profiles. Our systems ensure secure transmission:
            </p>
            <ul className="space-y-2 text-[10px] text-slate-500 font-bold">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#0f2d5e]"></span>
                Double authentication verification
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#0f2d5e]"></span>
                Encrypted database storage
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#0f2d5e]"></span>
                24/7 technical coordinator assistance
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
