import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Neurology Testing: Autoimmune Neurology & Neuropathy Panels";
const DESCRIPTION =
  "Neuropathy panels, autoimmune encephalitis workup, CSF analysis, myasthenia gravis testing, and paraneoplastic antibody profiling in Bengaluru — expert-reviewed reports with home sample collection.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/neurology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/neurology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}
