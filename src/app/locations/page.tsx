import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/businessInfo";
import { homeCollectionAreas } from "@/lib/locationsData";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Blood Test Locations in Bengaluru | Diagnostic Labs & Home Collection",
  description:
    "Find QXL Diagnostics lab locations and home blood sample collection coverage across 60+ areas in Bengaluru. NABL Certified, same-day reports.",
  alternates: { canonical: "https://qxldiagnostics.com/locations" },
};

export default function LocationsIndexPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-[1260px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
            Bengaluru Coverage Network
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-4">
            Diagnostic Labs & Home Collection Areas in Bengaluru
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Find your nearest QXL Diagnostics laboratory hub or book free home blood sample collection in your locality across 60+ Bengaluru areas.
          </p>
        </div>

        {/* Physical Main Labs */}
        <section className="mb-14">
          <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#2563eb]" /> Main Laboratory Hubs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="block bg-white border border-blue-150 rounded-3xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    NABL ACCREDITED
                  </span>
                  <span className="text-[#2563eb] text-xs font-bold group-hover:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-xl mb-2 group-hover:text-[#2563eb] transition-colors">
                  {loc.name}
                </h3>
                <p className="text-slate-600 text-sm mb-3 font-medium">{loc.displayAddress}</p>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                  <span>⏰ {loc.hours}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Home Collection Areas */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#0f2d5e] flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2563eb]" /> Doorstep Blood Sample Collection Areas ({homeCollectionAreas.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {homeCollectionAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-[#0f2d5e] text-sm group-hover:text-[#2563eb] transition-colors mb-1">
                    {area.name}
                  </h3>
                  <p className="text-[#0284c7] text-[11px] font-semibold mb-2">
                    Nearest: {area.nearestLab}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {area.pincodes.slice(0, 3).map((pin) => (
                      <span key={pin} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                        {pin}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[#2563eb] text-[11px] font-bold mt-2 inline-flex items-center gap-1 group-hover:underline">
                  Book Blood Test in {area.name.split(' ')[0]} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <div className="mt-16 bg-[#0f2d5e] text-white rounded-3xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-black mb-3">Don't see your specific locality?</h2>
          <p className="text-sky-200 text-sm max-w-xl mx-auto mb-6">
            We cover 100% of pin codes in Bengaluru urban & rural districts. Call or WhatsApp our helpline to schedule an immediate home collection sample pickup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className="bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold px-8 py-3 rounded-full text-sm">
              Book Online Now
            </Link>
            <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3 rounded-full text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp +91 9964 639 639
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
