import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { cbcTest } from "@/lib/seoPages/data/cbcTest";

export const metadata: Metadata = {
  title: "CBC Test in Bangalore | Complete Blood Count | QXL Diagnostics",
  description: "Book a CBC test in Bangalore — anaemia, infection & immunity screening. No fasting needed, free home collection, same-day NABL Certified report.",
  alternates: {
    canonical: "https://qxldiagnostics.com/cbc-test",
  },
};

export default function Page() {
  return <SeoLandingPage data={cbcTest} />;
}
