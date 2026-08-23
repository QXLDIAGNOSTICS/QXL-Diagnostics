import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { vitaminDTest } from "@/lib/seoPages/data/vitaminDTest";

export const metadata: Metadata = {
  title: "Vitamin D Test in Bangalore | 25-OH Vitamin D | QXL Diagnostics",
  description: "Vitamin D test in Bangalore — detect deficiency behind fatigue, bone pain & low immunity. No fasting, free home collection, same-day NABL report.",
  alternates: {
    canonical: "https://qxldiagnostics.com/vitamin-d-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={vitaminDTest} />;
}
