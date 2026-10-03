import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, ChevronRight, Award, Building2 } from "lucide-react";
import { NABL_CERTIFICATE, PHONE_DISPLAY, WHATSAPP_LINK } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "QXL Diagnostic Centres & Hubs | Bengaluru",
  description:
    "Explore QXL Diagnostics super speciality labs and express collection hubs across Bengaluru. NABL Accredited (MC-6849) diagnostics in Kengeri, Yelahanka, and doorstep home collection.",
};

export default function QXlIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 px-4">
        <div className="max-w-[1260px] mx-auto text-center space-y-4">
          <span className="bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            NABL ACCREDITED ({NABL_CERTIFICATE})
          </span>
          <h1 className="text-3xl sm:text-5xl font-black !text-white" style={{ color: '#ffffff' }}>
            QXL Diagnostics Hubs &amp; Centres
          </h1>
          <p className="text-sky-100 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Find QXL super speciality diagnostic labs and doorstep home collection hubs across Bengaluru.
          </p>
        </div>
      </section>

      <section className="max-w-[1260px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* North Hub Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-sky-50 text-[#2563eb] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  NORTH BENGALURU HUB
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  NABL ACCREDITED
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#0f2d5e] mb-2">QXL Yelahanka North Hub</h2>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                Express diagnostic hub opposite RMZ Galleria Mall, Yelahanka. Serving Yelahanka, Sahakarnagar, Hebbal, Vidyaranyapura, Jakkur &amp; North Bengaluru.
              </p>
              <div className="space-y-2 text-xs text-slate-700 font-semibold mb-6">
                <p>📍 L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064</p>
                <p>⏰ Walk-in: 7:00 AM – 8:00 PM (Mon–Sun)</p>
                <p>📞 Phone: {PHONE_DISPLAY}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/qxl/northhub"
                className="flex-1 text-center bg-[#2563eb] hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                View North Hub Details →
              </Link>
              <Link
                href="/qxl/yelahanka"
                className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-[#0f2d5e] font-black py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Yelahanka Centre Page →
              </Link>
            </div>
          </div>

          {/* Kengeri Main Lab Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-50 text-[#D69A18] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  CENTRAL REFERENCE LAB
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  24×7 OPERATIONS
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#0f2d5e] mb-2">QXL Kengeri Main Lab</h2>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                Our central reference laboratory and super speciality pathology facility on Mysore Road, Kengeri.
              </p>
              <div className="space-y-2 text-xs text-slate-700 font-semibold mb-6">
                <p>📍 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060</p>
                <p>⏰ 24 Hours, 7 Days a Week</p>
                <p>📞 Phone: {PHONE_DISPLAY}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/locations/kengeri-main-lab"
                className="flex-1 text-center bg-[#2563eb] hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                View Kengeri Main Lab →
              </Link>
              <Link
                href="/centers"
                className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-[#0f2d5e] font-black py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                All 11 Centres →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
