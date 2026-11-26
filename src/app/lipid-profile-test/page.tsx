import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { lipidProfileTest } from "@/lib/seoPages/data/lipidProfileTest";
import { findMasterBySlug } from "@/lib/masterCatalogue";
import { formatINR } from "@/lib/formatINR";

const CANONICAL = "https://qxldiagnostics.com/lipid-profile-test";
// Price comes from the master catalogue so the title never drifts from booking.
const master = findMasterBySlug("/lipid-profile-test");
const title = master
  ? `Lipid Profile Test in Bangalore – ${formatINR(master.price)} | QXL`
  : "Lipid Profile Test in Bangalore | QXL";
const description =
  "Lipid profile test in Bangalore: LDL, HDL, triglycerides and risk ratios. See price, fasting preparation, sample type and reporting time, and confirm home collection with QXL Diagnostics.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: CANONICAL },
  openGraph: { title, description, url: CANONICAL },
};

export default function Page() {
  return <SeoLandingPage data={lipidProfileTest} />;
}
