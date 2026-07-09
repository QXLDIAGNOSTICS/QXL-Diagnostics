import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Checkup Packages | Full Body & Speciality Panels",
  description:
    "Explore QXL Diagnostics' full body checkup packages, diabetes, cardiac, women's health and speciality panels — NABL certified, home sample collection across Bengaluru.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Health Checkup Packages | QXL Diagnostics",
    description: "Full body checkup and speciality health packages with home sample collection in Bengaluru.",
    url: "https://qxldiagnostics.com/packages",
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
