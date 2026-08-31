import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { nablAccreditedLabBangalore } from "@/lib/seoPages/data/nablAccreditedLabBangalore";

export const metadata: Metadata = {
  title: "NABL Certified Lab in Bangalore | MC-10025 | QXL Diagnostics",
  description: "QXL Diagnostics is a NABL Certified laboratory (MC-10025) in Bangalore following ISO 15189:2022 standards. Independently audited accuracy you can verify.",
  alternates: {
    canonical: "https://qxldiagnostics.com/nabl-accredited-lab-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={nablAccreditedLabBangalore} />;
}
