import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Partnerships for Hospitals",
  description:
    "Partner with QXL Diagnostics for NABL-certified pathology, microbiology, and molecular diagnostics support for your hospital or clinic in Bengaluru.",
  alternates: { canonical: "/for-hospitals" },
  openGraph: {
    title: "Diagnostic Partnerships for Hospitals | QXL Diagnostics",
    description: "NABL-certified pathology and diagnostics partnership for hospitals and clinics.",
    url: "https://qxldiagnostics.com/for-hospitals",
  },
};

export default function ForHospitalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
