import React from "react";
import Link from "next/link";
import { topTests } from "@/lib/testsData";
import { Search, FlaskConical, ArrowRight } from "lucide-react";

export const metadata = {
  title: "A-Z Blood Tests Directory | QXL Diagnostics",
  description: "Browse our comprehensive A-Z directory of individual blood tests and diagnostic profiles available at QXL Diagnostics Bengaluru. Home collection available.",
  alternates: {
    canonical: "https://qxldiagnostics.com/tests",
  }
};

export default function TestsDirectoryPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm">Test Directory</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-4">A-Z Diagnostic Tests</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Browse our most frequently requested individual tests. From routine check-ups to advanced diagnostics, we ensure 100% accurate results with home sample collection across Bengaluru.
          </p>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTests.map((test) => (
              <div key={test.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-24 h-24" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2 pr-8">{test.name}</h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4">
                    {test.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600 mb-6">
                    <span className="bg-sky-50 text-[#2563eb] px-2.5 py-1 rounded-lg">
                      {test.parameters} Param{test.parameters > 1 ? 's' : ''}
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg">
                      ₹{test.price}
                    </span>
                  </div>
                </div>
                
                <Link 
                  href={`/tests/${test.slug}`} 
                  className="w-full bg-[#f0f9ff] text-[#2563eb] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#2563eb] group-hover:text-white transition-colors text-sm"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
