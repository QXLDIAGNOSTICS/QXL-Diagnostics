import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Control Centre | QXL Diagnostics Release Management',
  description:
    'Internal Technical Release, QA Verification, Clinical Governance, and Go-Live Signoff Delivery Control Centre.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeliveryControlCentreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
