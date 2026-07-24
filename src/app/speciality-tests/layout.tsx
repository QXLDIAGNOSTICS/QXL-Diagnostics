import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Speciality Tests | QXL Diagnostics',
  description: 'Explore our wide range of speciality diagnostic tests at QXL Diagnostics.',
  alternates: {
    canonical: 'https://qxldiagnostics.com/speciality-tests',
  },
};

export default function SpecialityTestsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
