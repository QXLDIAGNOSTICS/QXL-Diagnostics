import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise Programme | QXL Diagnostics',
  description: 'Partner with QXL Diagnostics and start your own diagnostic centre franchise.',
  alternates: {
    canonical: 'https://qxldiagnostics.com/franchise',
  },
};

export default function FranchiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
