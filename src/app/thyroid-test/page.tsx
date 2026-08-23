import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { thyroidTest } from "@/lib/seoPages/data/thyroidTest";

export const metadata: Metadata = {
  title: "Thyroid Test in Bangalore | TSH FT3 FT4 Profile | QXL Diagnostics",
  description: "Complete thyroid test in Bangalore — TSH, Free T3, Free T4 & Anti-TPO. CLIA precision at our NABL lab, free home collection, same-day reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/thyroid-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={thyroidTest} />;
}
