import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { lipidProfileTest } from "@/lib/seoPages/data/lipidProfileTest";

export const metadata: Metadata = {
  title: "Lipid Profile Test in Bangalore | Cholesterol Panel | QXL Diagnostics",
  description: "Lipid profile test in Bangalore — LDL, HDL, triglycerides & risk ratios. Heart-risk screening with free home collection and same-day NABL reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/lipid-profile-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={lipidProfileTest} />;
}
