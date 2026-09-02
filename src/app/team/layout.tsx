import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder & Consultants | Dr. Shantakumar Muruda — QXL Diagnostics",
  description:
    "Meet QXL Diagnostics leadership: Founder Dr. Shantakumar Muruda (MD Biochemistry, NABL Lead Assessor) and consultant pathologists, microbiologists, and clinical experts in Bengaluru.",
  alternates: { canonical: "https://qxldiagnostics.com/team" },
  openGraph: {
    title: "Leadership & Clinical Advisory Team | QXL Diagnostics",
    description: "Meet Dr. Shantakumar Muruda (MD) and our team of senior pathologists, microbiologists and biochemists leading QXL Diagnostics in Bengaluru.",
    url: "https://qxldiagnostics.com/team",
  },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
