import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { diagnosticLabBangalore } from "@/lib/seoPages/data/diagnosticLabBangalore";

export const metadata: Metadata = {
  title: "Diagnostic Lab in Bangalore | NABL Certified | QXL Diagnostics",
  description: "QXL Diagnostics — doctor-led NABL Certified diagnostic lab in Bangalore. 300+ tests, free home collection, same-day reports. Book online or call +91 9964 639 639.",
  alternates: {
    canonical: "https://qxldiagnostics.com/diagnostic-lab-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={diagnosticLabBangalore} />;
}
