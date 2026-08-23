import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { hba1cTest } from "@/lib/seoPages/data/hba1cTest";

export const metadata: Metadata = {
  title: "HbA1c Test in Bangalore | No Fasting | QXL Diagnostics",
  description: "HbA1c test in Bangalore — your average blood sugar over 2-3 months. No fasting required, free home collection, same-day report from our NABL lab.",
  alternates: {
    canonical: "https://qxldiagnostics.com/hba1c-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={hba1cTest} />;
}
