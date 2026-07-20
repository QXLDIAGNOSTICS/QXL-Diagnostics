import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Specialities | 10 Super Speciality Diagnostic Panels",
  description:
    "Explore QXL Diagnostics' 10 super speciality diagnostic panels — neurology, hematology, cardiology, urology, endocrinology, oncology, infectious diseases, women's health, gastroenterology, and bone disorders.",
  alternates: { canonical: "/specialities" },
  openGraph: {
    title: "Our Specialities | QXL Diagnostics",
    description: "10 super speciality diagnostic panels reviewed by expert consultants in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities",
  },
};

export default function SpecialitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
