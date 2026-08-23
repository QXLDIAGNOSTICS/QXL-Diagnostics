import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { fullBodyCheckupBangalore } from "@/lib/seoPages/data/fullBodyCheckupBangalore";

export const metadata: Metadata = {
  title: "Full Body Checkup in Bangalore | QXL Diagnostics",
  description: "Comprehensive full body checkup in Bangalore — CBC, HbA1c, lipids, liver, kidney, thyroid & vitamins. Free home collection, NABL lab, same-day reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/full-body-checkup-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={fullBodyCheckupBangalore} />;
}
