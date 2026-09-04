import React from "react";
import type { Metadata } from "next";
import { Info, AlertCircle, FileText, Activity, ShieldCheck, ChevronRight } from "lucide-react";
import testGuideData from "@/lib/testGuideData.json";

export const metadata: Metadata = {
  title: "Comprehensive Diagnostic Test Guide",
  description: "Explore our comprehensive directory of diagnostic tests, health packages, and screening panels at QXL Diagnostics, Bengaluru. NABL Accredited.",
  keywords: ["diagnostic test directory", "health packages", "test guide", "QXL tests list", "Bangalore diagnostic packages"],
};

export default function DiagnosticGuidePage() {
  return (
    <div className="bg-slate-50/50 pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>NABL Accredited (MC-6849) | ISO 15189:2022</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Diagnostic Test Guide</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our detailed directory of diagnostic tests, from routine wellness screenings to doctor-directed speciality panels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="tel:+919964639639" className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Call Us: +91 9964 639 639
            </a>
            <a href="https://wa.me/919964639639" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition shadow-lg shadow-emerald-200">
              WhatsApp for Booking
            </a>
          </div>
        </div>

        {/* Guidance Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">SELF-REQUEST POSSIBLE</h3>
            <p className="text-slate-600 text-sm">Suitable for selected wellness or monitoring needs. Reception will confirm fasting, specimen and timing requirements.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">CONSULTATION RECOMMENDED</h3>
            <p className="text-slate-600 text-sm">Symptoms, medicines, age, menstrual-cycle timing or previous reports can change which tests are appropriate.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">DOCTOR-DIRECTED</h3>
            <p className="text-slate-600 text-sm">Pregnancy screening, clotting, cancer, infection and autoimmune panels require a defined clinical question.</p>
          </div>
        </div>

        {/* General Pre-requisites */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 mb-16 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" /> Before Sample Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">Confirm whether fasting is required; water is usually allowed unless advised otherwise.</p>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">Tell reception about medicines, supplements, pregnancy, cycle day and recent illness.</p>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">Bring previous reports and prescriptions for specialist or monitoring packages.</p>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 font-medium">Urgent symptoms require immediate medical assessment - not package testing.</p>
            </div>
          </div>
        </div>

        {/* Test Packages List Grouped by Category */}
        <div className="space-y-12">
          {Array.from(new Set(testGuideData.map(pkg => pkg.category))).map(category => (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b-2 border-blue-100 pb-2 inline-block">
                {category}
              </h2>
              <div className="grid gap-6">
                {testGuideData.filter(pkg => pkg.category === category).map((pkg, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-slate-900">{pkg.title}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                          pkg.guidanceLevel === "SELF-REQUEST POSSIBLE" ? "bg-green-100 text-green-700" :
                          pkg.guidanceLevel === "CONSULTATION RECOMMENDED" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {pkg.guidanceLevel} {pkg.id}
                        </div>
                      </div>
                      <p className="text-slate-600 mb-6">{pkg.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Tests / Components</h4>
                          <ul className="space-y-2">
                            {pkg.keyTests && pkg.keyTests.map((test, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span className="text-slate-700 text-sm">{test}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-6">
                          {pkg.mayHelpWhen && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">May Help When</h4>
                              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{pkg.mayHelpWhen}</p>
                            </div>
                          )}
                          
                          {pkg.beforeBooking && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Before Booking</h4>
                              <div className="flex gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                                <p className="text-sm text-blue-900">{pkg.beforeBooking}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
