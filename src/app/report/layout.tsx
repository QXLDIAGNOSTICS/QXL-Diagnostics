import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Reports | QXL Diagnostics',
  description: 'Download your diagnostic reports securely from QXL Diagnostics.',
  alternates: {
    canonical: 'https://qxldiagnostics.com/report',
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
