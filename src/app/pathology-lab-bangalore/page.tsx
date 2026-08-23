import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { pathologyLabBangalore } from "@/lib/seoPages/data/pathologyLabBangalore";

export const metadata: Metadata = {
  title: "Pathology Lab in Bangalore | Consultant-Reported | QXL Diagnostics",
  description: "Super-speciality pathology lab in Bangalore — histopathology, FNAC, PAP smear & clinical pathology reported by senior consultant pathologists. NABL accredited.",
  alternates: {
    canonical: "https://qxldiagnostics.com/pathology-lab-bangalore",
  },
};

export default function Page() {
  return <SeoLandingPage data={pathologyLabBangalore} />;
}
