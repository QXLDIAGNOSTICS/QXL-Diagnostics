import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Cardiology Testing: Cardiac Risk & Heart Health Panels Bengaluru";
const DESCRIPTION =
  "Comprehensive lipid panels, cardiac biomarkers (Troponin, NT-proBNP), inflammation markers, and advanced cardiovascular risk profiling in Bengaluru — expert-reviewed, home sample collection.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/cardiology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/cardiology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}
