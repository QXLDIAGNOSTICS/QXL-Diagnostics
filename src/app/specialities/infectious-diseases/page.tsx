import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Infectious Disease Testing: Serology & Molecular PCR Bengaluru";
const DESCRIPTION =
  "Rapid multiplex PCR assays, automated culture systems, and sensitive serology panels for precise viral, bacterial, and parasitic identification — NABL-certified lab in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/infectious-diseases` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/infectious-diseases`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}
