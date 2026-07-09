import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Bone Disorder Testing: Arthritis & Joint Diagnostics Bengaluru";
const DESCRIPTION =
  "Comprehensive arthritis panels, parathyroid mapping, autoimmune profiles (Anti-CCP, HLA-B27), and advanced bone turnover markers for precision metabolic health in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/bone-disorders` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/bone-disorders`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}
