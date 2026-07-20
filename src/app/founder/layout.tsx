import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder & Consultants | Dr. Shantakumar Muruda — QXL Diagnostics",
  description:
    "Meet QXL Diagnostics leadership: Founder Dr. Shantakumar Muruda (MD Biochemistry, NABL Lead Assessor) and consultant pathologists, microbiologists, and clinical experts in Bengaluru.",
  alternates: { canonical: "https://qxldiagnostics.com/founder" },
  openGraph: {
    title: "Founder & Medical Consultants | QXL Diagnostics",
    description:
      "Expert medical team behind QXL’s NABL laboratory — biochemistry, pathology, microbiology, histopathology.",
    url: "https://qxldiagnostics.com/founder",
  },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
