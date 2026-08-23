import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { healthCheckupPackagesBangalore } from "@/lib/seoPages/data/healthCheckupPackagesBangalore";

export const metadata: Metadata = {
  title: "Health Checkup Packages in Bangalore | QXL Diagnostics",
  description: "Doctor-curated health checkup packages in Bangalore — executive, senior citizen, women's, men's, diabetes & heart panels. Free home collection, NABL lab.",
  alternates: {
    canonical: "https://qxldiagnostics.com/health-checkup-packages-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={healthCheckupPackagesBangalore} />;
}
