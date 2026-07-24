import React from "react";
import Link from "next/link";
import { healthConditions } from "@/lib/conditionsData";
import { Activity, ArrowRight, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Health Conditions & Disease Diagnostics | QXL Diagnostics",
  description: "Explore our specialized diagnostic testing hubs for diabetes, thyroid disorders, heart disease, anemia, and more in Bengaluru.",
  alternates: {
    canonical: "https://qxldiagnostics.com/conditions",
  }
};

export default function ConditionsDirectoryPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm">Condition Hubs</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-4">Health Conditions</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Find the right tests and diagnostic packages for managing specific health conditions. We offer expert testing with NABL-accredited precision.
          </p>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthConditions.map((condition) => (
              <div key={condition.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-24 h-24" />
                </div>
                
                <div className="flex-1 z-10">
                  <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0f2d5e] mb-2 pr-8 group-hover:text-[#2563eb] transition-colors">{condition.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                    {condition.description}
                  </p>
                </div>
                
                <Link 
                  href={`/conditions/${condition.slug}`} 
                  className="w-full bg-[#f0f9ff] text-[#2563eb] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#2563eb] group-hover:text-white transition-colors text-sm uppercase tracking-wider relative z-10"
                >
                  View Tests <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
