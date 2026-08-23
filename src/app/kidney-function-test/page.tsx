import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { kidneyFunctionTest } from "@/lib/seoPages/data/kidneyFunctionTest";

export const metadata: Metadata = {
  title: "Kidney Function Test (KFT) in Bangalore | QXL Diagnostics",
  description: "Kidney function test in Bangalore — creatinine, urea, eGFR, uric acid & electrolytes. Diabetes & BP kidney protection. Free home collection.",
  alternates: {
    canonical: "https://qxldiagnostics.com/kidney-function-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={kidneyFunctionTest} />;
}
