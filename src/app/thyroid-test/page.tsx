import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { thyroidTest } from "@/lib/seoPages/data/thyroidTest";

export const metadata: Metadata = {
  title: "Thyroid Test in Bangalore | T3, T4, TSH Profile ₹350 | QXL Diagnostics",
  description: "Thyroid profile in Bangalore: Total T3, Total T4 and TSH for ₹350, with Free T3/T4 (₹750) and Anti-TPO available. Home sample collection and same-day reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/thyroid-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={thyroidTest} />;
}
