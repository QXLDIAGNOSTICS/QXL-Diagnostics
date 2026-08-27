import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { nablAccreditedLabBangalore } from "@/lib/seoPages/data/nablAccreditedLabBangalore";

export const metadata: Metadata = {
  title: "NABL Accredited Lab in Bangalore | MC-6849 | QXL Diagnostics",
  description: "QXL Diagnostics is a NABL accredited laboratory (MC-6849) in Bangalore following ISO 15189:2022 standards. Independently audited accuracy you can verify.",
  alternates: {
    canonical: "https://qxldiagnostics.com/nabl-accredited-lab-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={nablAccreditedLabBangalore} />;
}
