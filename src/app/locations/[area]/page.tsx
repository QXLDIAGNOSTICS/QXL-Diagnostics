import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { homeCollectionAreas } from "@/lib/locationsData";
import { MapPin, Phone, CheckCircle2, ShieldCheck, Activity, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: { area: string } }) {
  const { area } = await params;
  const location = homeCollectionAreas.find((loc) => loc.slug === area);
  if (!location) return { title: "Location Not Found" };

  return {
    title: `Blood Test at Home in ${location.name} | QXL Diagnostics`,
    description: `Book a blood test with home collection in ${location.name}, Bengaluru. NABL certified lab, same-day reports, and safe sample transport.`,
    alternates: {
      canonical: `https://qxldiagnostics.com/locations/${area}`,
    }
  };
}

export default async function LocationAreaPage({ params }: { params: { area: string } }) {
  const { area } = await params;
  const location = homeCollectionAreas.find((loc) => loc.slug === area);

  if (!location) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": `QXL Diagnostics Home Collection - ${location.name}`,
    "description": location.description,
    "url": `https://qxldiagnostics.com/locations/${area}`,
    "telephone": "+91-99646-39639",
    "areaServed": {
      "@type": "Place",
      "name": location.name
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "QXL Diagnostics",
      "url": "https://qxldiagnostics.com"
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#e0f2fe] to-[#fbf8f5] py-12 lg:py-16 border-b border-sky-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Home Collection Service</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-4">Blood Test at Home in {location.name}</h1>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto text-sm md:text-base">
            {location.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/book" className="bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-full hover:bg-[#1d4ed8] transition-all shadow-md text-sm">
              Book Home Collection
            </Link>
            <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-[#25d366] text-[#25d366] bg-white font-extrabold px-8 py-3.5 rounded-full hover:bg-green-50 transition-all shadow-sm text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 border-b border-gray-100 pb-4">Why Choose QXL in {location.name}?</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm mb-1">NABL Accredited</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">Our main processing laboratories follow strict ISO 15189 quality guidelines.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm mb-1">Cold Chain Transport</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">Samples from {location.name} are securely transported in temperature-controlled kits to our {location.nearestLab}.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm mb-1">Same-Day Reports</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">Get accurate digital reports sent straight to your WhatsApp and Email.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm mb-1">300+ Tests Available</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">From routine health checkups to advanced hormonal and cancer marker tests.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6">Popular Health Packages in {location.name}</h2>
              <div className="space-y-4">
                <div className="border border-gray-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                  <div>
                    <h4 className="font-extrabold text-[#0f2d5e]">Quick Fit Package</h4>
                    <p className="text-xs text-slate-600 font-medium mt-1">13+ Parameters including Liver, Kidney, Sugar, and Thyroid.</p>
                  </div>
                  <Link href="/book" className="bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap text-center">
                    Book for ₹1770
                  </Link>
                </div>
                
                <div className="border border-gray-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                  <div>
                    <h4 className="font-extrabold text-[#0f2d5e]">Q-Master Health Pro</h4>
                    <p className="text-xs text-slate-600 font-medium mt-1">86+ Parameters for a complete head-to-toe body evaluation.</p>
                  </div>
                  <Link href="/book" className="bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap text-center">
                    Book for ₹4999
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-[350px] space-y-6">
            <div className="bg-[#0f2d5e] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb]/30 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-extrabold mb-4 border-b border-white/10 pb-4">Service Details</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-sky-200 uppercase font-bold tracking-wider block mb-1">Service Area</span>
                  <span className="font-semibold text-sm">{location.name}, Bengaluru</span>
                </div>
                
                <div>
                  <span className="text-[10px] text-sky-200 uppercase font-bold tracking-wider block mb-1">Pincodes Covered</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {location.pincodes.map(pin => (
                      <span key={pin} className="bg-white/10 px-2 py-1 rounded text-xs font-semibold">{pin}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-sky-200 uppercase font-bold tracking-wider block mb-1">Operating Hours</span>
                  <span className="font-semibold text-sm">7:00 AM – 9:00 PM</span>
                </div>

                <div>
                  <span className="text-[10px] text-sky-200 uppercase font-bold tracking-wider block mb-1">Processing Lab</span>
                  <span className="font-semibold text-sm">{location.nearestLab}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a href="tel:+919964639639" className="flex items-center gap-3 text-white hover:text-sky-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider block">Call For Booking</span>
                    <span className="font-extrabold text-base">+91 99646 39639</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
