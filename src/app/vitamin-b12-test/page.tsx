import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { vitaminB12Test } from "@/lib/seoPages/data/vitaminB12Test";

export const metadata: Metadata = {
  title: "Vitamin B12 Test in Bangalore | Serum B12 | QXL Diagnostics",
  description: "Vitamin B12 test in Bangalore — essential for vegetarians, seniors & metformin users. Detect deficiency early. Free home collection, same-day report.",
  alternates: {
    canonical: "https://qxldiagnostics.com/vitamin-b12-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={vitaminB12Test} />;
}
