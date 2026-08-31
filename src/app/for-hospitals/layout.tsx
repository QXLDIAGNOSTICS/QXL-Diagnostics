import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Partnerships for Hospitals",
  description:
    "Partner with QXL Diagnostics for NABL Certified pathology, microbiology, and molecular diagnostics support for your hospital or clinic in Bengaluru.",
  alternates: { canonical: "/for-hospitals" },
  openGraph: {
    title: "Diagnostic Partnerships for Hospitals | QXL Diagnostics",
    description: "NABL Certified pathology and diagnostics partnership for hospitals and clinics.",
    url: "https://qxldiagnostics.com/for-hospitals",
  },
};

export default function ForHospitalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
