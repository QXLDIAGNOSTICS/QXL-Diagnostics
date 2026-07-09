import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urology Testing | Kidney & Prostate Health Diagnostics",
  description:
    "Comprehensive urological diagnostics including kidney function tests, PSA prostate screening, UTI panels, and kidney stone analysis in Bengaluru.",
  alternates: { canonical: "/specialities/urology" },
  openGraph: {
    title: "Urology Testing | QXL Diagnostics",
    description: "Kidney function tests, PSA screening, and kidney stone analysis in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/urology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
