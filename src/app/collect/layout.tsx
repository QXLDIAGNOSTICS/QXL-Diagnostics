import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QXL Collect – Home Blood Collection Service | Bengaluru',
  description:
    'Book home blood sample collection in Bengaluru with QXL Collect: choose a slot, see the collection charge, and track your sample from doorstep pickup to laboratory accessioning and report release.',
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

