import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neurology Testing | Autoimmune & Neuropathy Diagnostics",
  description:
    "Neuropathy panels, autoimmune encephalitis workup, CSF analysis, myasthenia gravis testing, and paraneoplastic antibody profiling in Bengaluru — expert-reviewed reports and home sample collection.",
  alternates: { canonical: "/specialities/neurology" },
  openGraph: {
    title: "Neurology Testing | QXL Diagnostics",
    description: "Neuropathy panels, autoimmune encephalitis workup, and CSF analysis in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/neurology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
