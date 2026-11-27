import type { Metadata } from "next";
import { enAlternates } from "@/content/kn/common";

// Own title: this page previously inherited the homepage title.
export const metadata: Metadata = {
  title: "Upload Prescription & Book Lab Tests | QXL Diagnostics",
  description:
    "Upload a photo or PDF of your doctor's prescription, or send it on WhatsApp. QXL identifies the prescribed tests and confirms them with you before booking home collection or a lab visit in Bengaluru.",
  alternates: enAlternates("/upload-prescription"),
};

export default function UploadPrescriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
