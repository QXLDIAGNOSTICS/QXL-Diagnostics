import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardiology Testing | Heart Risk & Cardiac Biomarker Diagnostics",
  description:
    "Advanced cardiac risk profiling and biomarker testing including troponin, BNP, extended lipid profile, Lp(a), and hs-CRP for heart disease detection and monitoring in Bengaluru.",
  alternates: { canonical: "/specialities/cardiology" },
  openGraph: {
    title: "Cardiology Testing | QXL Diagnostics",
    description: "Cardiac risk profiling and biomarker testing in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/cardiology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
