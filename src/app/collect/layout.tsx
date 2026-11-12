import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QXL Collect — Eight-Stage Home Sample Collection Platform | Bengaluru',
  description:
    'Integrated home blood collection platform connecting patients, dispatchers, phlebotomists, cold-chain logistics, and ITDOSE laboratory accessioning in Bengaluru.',
  alternates: {
    canonical: 'https://qxldiagnostics.com/collect'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function CollectLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f8faff]">{children}</div>;
}

