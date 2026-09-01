import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { bloodTestBangalore } from "@/lib/seoPages/data/bloodTestBangalore";

export const metadata: Metadata = {
  title: "Blood Test in Bangalore | Home Collection | QXL Diagnostics",
  description: "Book blood tests in Bangalore with QXL Diagnostics. 300+ tests, NABL Accredited lab, free home sample collection across Bengaluru, same-day digital reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/blood-test-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={bloodTestBangalore} />;
}
