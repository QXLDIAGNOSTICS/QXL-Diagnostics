import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { liverFunctionTest } from "@/lib/seoPages/data/liverFunctionTest";

export const metadata: Metadata = {
  title: "Liver Function Test (LFT) in Bangalore | QXL Diagnostics",
  description: "Liver function test in Bangalore — SGPT, SGOT, GGT, bilirubin & proteins. Fatty liver & hepatitis screening. Free home collection, same-day reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/liver-function-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={liverFunctionTest} />;
}
