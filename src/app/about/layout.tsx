import type { Metadata } from "next";
import { enAlternates } from "@/content/kn/common";

export const metadata: Metadata = {
  title: "About QXL Diagnostics | NABL Lab Bengaluru",
  description:
    "Learn about QXL Diagnostics — NABL Accredited (NABLM1126KA10694) ISO 15189:2022 super speciality diagnostic laboratory in Bengaluru founded by Dr. Shantakumar Muruda. Mission, centres, and clinical excellence.",
  alternates: enAlternates("/about"),
  openGraph: {
    title: "About QXL Diagnostics | NABL Lab Bengaluru",
    description:
      "Doctor-driven NABL diagnostic lab in Bengaluru with home collection and same-day reports.",
    url: "https://qxldiagnostics.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
