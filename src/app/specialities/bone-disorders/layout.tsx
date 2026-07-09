import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bone Disorders & Arthritis Testing | Joint Health Diagnostics",
  description:
    "Comprehensive arthritis panels, parathyroid mapping, autoimmune profiles (Anti-CCP, HLA-B27), and advanced bone turnover markers for precision metabolic health in Bengaluru.",
  alternates: { canonical: "/specialities/bone-disorders" },
  openGraph: {
    title: "Bone Disorders & Arthritis Testing | QXL Diagnostics",
    description: "Arthritis panels, parathyroid mapping, and bone turnover markers in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/bone-disorders",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
