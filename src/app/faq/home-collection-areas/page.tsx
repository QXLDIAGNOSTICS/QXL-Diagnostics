import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ShieldCheck, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Home Blood Sample Collection Coverage Areas Bengaluru | QXL Diagnostics",
  description: "Check QXL Diagnostics free home blood collection coverage across Bengaluru: Kengeri, Yelahanka, Jayanagar, Indiranagar, Whitefield, Koramangala, and 40+ localities.",
  alternates: { canonical: `${SITE_URL}/faq/home-collection-areas` },
};

const COVERAGE_ZONES = [
  { zone: "West Bengaluru", areas: ["Kengeri", "Rajarajeshwari Nagar (RR Nagar)", "Nagarabhavi", "Vijayanagar", "Malleshwaram", "Rajajinagar"] },
  { zone: "North Bengaluru", areas: ["Yelahanka", "Vidyaranyapura", "Hebbal", "Jalahalli", "Sahakara Nagar", "Devanahalli Road"] },
  { zone: "South Bengaluru", areas: ["Jayanagar", "JP Nagar", "Banashankari", "Uttarahalli", "BTM Layout", "HSR Layout", "Koramangala"] },
  { zone: "East & IT Corridor", areas: ["Whitefield", "Indiranagar", "Marathahalli", "Electronic City", "Sarjapur Road", "KR Puram", "Bellandur"] },
];

export default function HomeCollectionAreasPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which areas in Bengaluru are covered for home blood sample collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "QXL Diagnostics covers all major zones in Bengaluru including Kengeri, Rajarajeshwari Nagar, Yelahanka, Jayanagar, JP Nagar, Indiranagar, Koramangala, Whitefield, HSR Layout, Electronic City, and surrounding pin codes."
        }
      },
      {
        "@type": "Question",
        "name": "Is there an extra charge for home blood collection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Home sample collection is FREE for all standard health packages and orders meeting the minimum booking threshold. Phlebotomists arrive with sterile single-use equipment and cold-chain boxes."
        }
      }
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-[#0d2e42] to-[#0f2d5e] text-white py-12">
        <div className="max-w-[1000px] mx-auto px-4">
          <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Service Coverage
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white" style={{ color: '#ffffff' }}>
            Home Blood Sample Collection Coverage Areas
          </h1>
          <p className="text-sky-100 text-sm sm:text-base font-medium max-w-2xl">
            Doorstep phlebotomy coverage across all 4 zones of Bengaluru with temperature-controlled cold-chain sample transport to our NABL Accredited central lab.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1000px] mx-auto px-4 space-y-8">
          
          <div className="grid sm:grid-cols-2 gap-6">
            {COVERAGE_ZONES.map((z, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <MapPin className="w-5 h-5 text-[#2563eb]" />
                  <h2 className="text-base font-extrabold text-[#0f2d5e]">{z.zone}</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  {z.areas.map(area => (
                    <span key={area} className="bg-sky-50 text-[#0f2d5e] px-3 py-1.5 rounded-full border border-sky-100">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0f2d5e] text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-extrabold text-sm">Don't see your locality listed?</p>
              <p className="text-xs text-sky-200">Our phlebotomy runners cover all 6-digit Bengaluru pincodes. Call {PHONE_DISPLAY}</p>
            </div>
            <Link href="/book" className="bg-[#2563eb] text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-600 shrink-0">
              Book Home Visit →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
