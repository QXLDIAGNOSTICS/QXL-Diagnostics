import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Diagnostic Lab Locations in Bengaluru | Kengeri & Yelahanka",
  description:
    "Find QXL Diagnostics centres in Kengeri (Mysore Road) and Yelahanka, Bengaluru. NABL accredited lab, home sample collection, same-day reports.",
  alternates: { canonical: "https://qxldiagnostics.com/locations" },
};

export default function LocationsIndexPage() {
  return (
    <main className="max-w-[900px] mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-[#0f2d5e] mb-3">
        QXL Diagnostics Locations in Bengaluru
      </h1>
      <p className="text-slate-600 mb-8 text-sm leading-relaxed">
        Choose your nearest NABL-aligned diagnostic centre or book free home sample collection
        across Bengaluru.
      </p>
      <ul className="space-y-4">
        {LOCATIONS.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/locations/${loc.slug}`}
              className="block bg-white border border-blue-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <p className="font-extrabold text-[#0f2d5e] text-lg">{loc.name}</p>
              <p className="text-slate-600 text-sm mt-1">{loc.displayAddress}</p>
              <p className="text-[#2563eb] text-xs font-bold mt-2">View location guide →</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
