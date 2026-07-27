import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Prescription | QXL Diagnostics',
  description: "Upload your doctor's prescription and book your diagnostic tests with QXL Diagnostics.",
  alternates: {
    canonical: 'https://qxldiagnostics.com/upload-prescription',
  },
};

export default function UploadPrescriptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
