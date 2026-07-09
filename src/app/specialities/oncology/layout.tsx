import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oncology Testing | Cancer Marker Screening & Biomarkers",
  description:
    "Comprehensive cancer biomarker panels including PSA, CEA, CA-125, CA-19-9, and AFP for early detection support and treatment monitoring in Bengaluru.",
  alternates: { canonical: "/specialities/oncology" },
  openGraph: {
    title: "Oncology Testing | QXL Diagnostics",
    description: "Cancer biomarker panels and tumor marker screening in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/oncology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
