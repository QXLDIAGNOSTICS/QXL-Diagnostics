import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { homeSampleCollectionBangalore } from "@/lib/seoPages/data/homeSampleCollectionBangalore";

export const metadata: Metadata = {
  title: "Home Sample Collection in Bangalore | Free | QXL Diagnostics",
  description: "Free home sample collection across Bangalore by certified phlebotomists. Cold-chain transport to our NABL lab, same-day reports. Book on WhatsApp +91 9964 639 639.",
  alternates: {
    canonical: "https://qxldiagnostics.com/home-sample-collection-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={homeSampleCollectionBangalore} />;
}
