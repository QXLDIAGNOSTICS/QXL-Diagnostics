import React from "react";
import Link from "next/link";
import { homeCollectionAreas } from "@/lib/locationsData";
import { MapPin, ArrowRight, Activity, Clock } from "lucide-react";

export const metadata = {
  title: "Service Areas | Home Collection Locations in Bengaluru",
  description: "View all areas covered by QXL Diagnostics for home blood sample collection in Bengaluru. Fast, reliable, and NABL certified.",
  alternates: {
    canonical: "https://qxldiagnostics.com/locations",
  }
};

export default function LocationsDirectoryPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm">Coverage Area</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-4">Bengaluru Service Areas</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            QXL Diagnostics provides fast, hygienic, and free home sample collection across all major areas in Bengaluru. Select your location to book a test.
          </p>
        </div>
      </section>

      {/* Physical Labs */}
      <section className="py-12 border-b border-gray-200 bg-slate-50">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#2563eb]" />
            Our Physical Laboratories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/centers/kengeri" className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2 group-hover:text-[#2563eb] transition-colors">Mysore Road Main Lab</h3>
              <p className="text-sm text-slate-600 mb-4">3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060</p>
              <span className="text-[#2563eb] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                View Lab Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link href="/centers/yelahanka" className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2 group-hover:text-[#2563eb] transition-colors">Yelahanka North Hub</h3>
              <p className="text-sm text-slate-600 mb-4">L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064</p>
              <span className="text-[#2563eb] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                View Lab Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Home Collection Areas Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#2563eb]" />
            Home Collection Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {homeCollectionAreas.map((loc) => (
              <div key={loc.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col group">
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2">{loc.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
                    <Clock className="w-3.5 h-3.5" /> Same-day reports
                  </div>
                </div>
                <Link 
                  href={`/locations/${loc.slug}`} 
                  className="w-full bg-[#f0f9ff] text-[#2563eb] font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#2563eb] group-hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  Book Here <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
