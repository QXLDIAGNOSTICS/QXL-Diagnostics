import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { nablAccreditedLabBangalore } from "@/lib/seoPages/data/nablAccreditedLabBangalore";

export const metadata: Metadata = {
  title: "NABL Accredited Lab in Bangalore | NABLM1126KA10694 | QXL Diagnostics",
  description: "QXL Diagnostics is a NABL Accredited laboratory (NABLM1126KA10694) in Bangalore following ISO 15189:2022 standards. Independently audited accuracy you can verify.",
  alternates: {
    canonical: "https://qxldiagnostics.com/nabl-accredited-lab-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={nablAccreditedLabBangalore} />;
}
