import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight, Activity, Heart, Users, Sparkles, FileText, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CategoryData {
  slug: string;
  title: string;
  heading: string;
  subtitle: string;
  badge: string;
  description: string;
  packages: {
    name: string;
    parameters: string;
    tat: string;
    price: number;
    originalPrice: number;
    discount: string;
    slug: string;
    includes: string;
  }[];
  popularTests: {
    name: string;
    parameters: string;
    tat: string;
    price: number;
    originalPrice: number;
    slug: string;
  }[];
}

const CATEGORIES_DATA: Record<string, CategoryData> = {
  women: {
    slug: 'women',
    title: "Women's Health Checkup Packages Bangalore | QXL Diagnostics",
    heading: "Women's Specialized Health & Diagnostic Checkups",
    subtitle: "Doctor-curated preventive and diagnostic health profiles designed specifically for women of all age groups across Bengaluru.",
    badge: "WOMEN'S WELLNESS",
    description: "From hormonal balance (Thyroid, PCOD/PCOS, LH, FSH) and reproductive vitality to bone health (Calcium, Vitamin D) and anaemia detection — our NABL-accredited diagnostic panels offer accurate, confidential testing with free doorstep blood collection.",
    packages: [
      {
        name: "Full Body Checkup - Complete (Women)",
        parameters: "115 Parameters",
        tat: "12 hours",
        price: 4999,
        originalPrice: 18588,
        discount: "73% Off",
        slug: "packages",
        includes: "Thyroid (TSH, T3, T4), Iron Studies & Ferritin, Complete Haemogram, Liver, Kidney, Lipid, Calcium & Vitamin D."
      },
      {
        name: "Ultra Full Body Checkup - Female",
        parameters: "136 Parameters",
        tat: "24 hours",
        price: 14999,
        originalPrice: 45529,
        discount: "67% Off",
        slug: "packages",
        includes: "Comprehensive female hormonal profile, bone mineral markers, cancer screening markers (CA-125), full cardiovascular & metabolic mapping."
      },
      {
        name: "Hair Fall & Scalp Health Trigger Checkup",
        parameters: "45 Parameters",
        tat: "6 hours",
        price: 2399,
        originalPrice: 5800,
        discount: "58% Off",
        slug: "conditions/hair-fall",
        includes: "Ferritin, Thyroid (TSH), Vitamin D3, Vitamin B12, Serum Iron & Total Blood Count."
      }
    ],
    popularTests: [
      { name: "Thyroid Function Test (TFT)", parameters: "3 Parameters", tat: "6 hours", price: 500, originalPrice: 589, slug: "thyroid-test" },
      { name: "Vitamin D, Total (25-OH)", parameters: "1 Parameter", tat: "6 hours", price: 990, originalPrice: 1500, slug: "vitamin-d-test" },
      { name: "Serum Ferritin (Iron Storage)", parameters: "1 Parameter", tat: "6 hours", price: 550, originalPrice: 750, slug: "tests" },
      { name: "Complete Blood Count (CBC)", parameters: "26 Parameters", tat: "6 hours", price: 250, originalPrice: 350, slug: "cbc-test" }
    ]
  },
  seniors: {
    slug: 'seniors',
    title: "Senior Citizen Health Checkups Bangalore | QXL Diagnostics",
    heading: "Senior Citizen Comprehensive Health Profiles",
    subtitle: "Holistic, gentle at-home blood collection and specialized geriatric diagnostic screenings for parents and elders.",
    badge: "SENIOR CITIZEN CARE",
    description: "Designed to monitor vital cardiac markers, kidney function, diabetes control, arthritis markers, and bone density in seniors — ensuring proactive care and doctor-consulted diagnostic accuracy.",
    packages: [
      {
        name: "Senior Citizen Comprehensive Health Panel",
        parameters: "92 Parameters",
        tat: "12 hours",
        price: 3499,
        originalPrice: 9600,
        discount: "64% Off",
        slug: "packages",
        includes: "Complete Diabetic screen (HbA1c, FBS), Cardiac Lipids, Renal markers (Creatinine, BUN), Liver, Bone Calcium, Vit D & B12."
      },
      {
        name: "Ultra Full Body Checkup - Master",
        parameters: "131 Parameters",
        tat: "24 hours",
        price: 14999,
        originalPrice: 42729,
        discount: "65% Off",
        slug: "packages",
        includes: "Advanced cardiac risk (Homocysteine, Lp-a), Iron profile, comprehensive metabolic, thyroid, electrolytes and organ screening."
      },
      {
        name: "Arthritis & Joint Pain Profile",
        parameters: "22 Parameters",
        tat: "6 hours",
        price: 1899,
        originalPrice: 4200,
        discount: "55% Off",
        slug: "conditions/joint-pain",
        includes: "RA Factor, Serum Uric Acid, Calcium, Vitamin D, hs-CRP, ESR and Complete Blood Count."
      }
    ],
    popularTests: [
      { name: "Glycosylated Haemoglobin (HbA1c)", parameters: "2 Parameters", tat: "6 hours", price: 490, originalPrice: 618, slug: "hba1c-test" },
      { name: "Kidney Function Test (KFT)", parameters: "10 Parameters", tat: "6 hours", price: 425, originalPrice: 1150, slug: "kidney-function-test" },
      { name: "Lipid Profile (Cholesterol Panel)", parameters: "8 Parameters", tat: "6 hours", price: 336, originalPrice: 800, slug: "lipid-profile-test" },
      { name: "Serum Uric Acid (Gout)", parameters: "1 Parameter", tat: "6 hours", price: 250, originalPrice: 400, slug: "tests" }
    ]
  },
  men: {
    slug: 'men',
    title: "Men's Executive Health Checkup Packages Bangalore | QXL",
    heading: "Men's Executive & Proactive Health Checkups",
    subtitle: "Comprehensive metabolic, cardiac, liver, and prostate screenings for active working professionals and men of all ages.",
    badge: "MEN'S HEALTH",
    description: "Sedentary lifestyle, high stress, and metabolic strain make proactive testing vital. Screen for cholesterol, liver enzyme stress, heart health, testosterone baseline, and early prostate markers with same-day reports.",
    packages: [
      {
        name: "Full Body Checkup - Essential",
        parameters: "90 Parameters",
        tat: "6 hours",
        price: 1599,
        originalPrice: 5998,
        discount: "73% Off",
        slug: "packages",
        includes: "Cardiac lipid profile, Liver Function (LFT), Kidney Function (KFT), Fasting Blood Sugar, TSH, Vitamin D, CBC & Urine Analysis."
      },
      {
        name: "Ultra Full Body Checkup - Male",
        parameters: "131 Parameters",
        tat: "24 hours",
        price: 14999,
        originalPrice: 42729,
        discount: "65% Off",
        slug: "packages",
        includes: "Advanced cardiac risk panel (Homocysteine, Apo B, Lipoprotein-a), Prostate PSA marker, complete organ profile and vitamins."
      },
      {
        name: "Executive Heart & Fitness Profile",
        parameters: "80 Parameters",
        tat: "6 hours",
        price: 1770,
        originalPrice: 4696,
        discount: "62% Off",
        slug: "packages",
        includes: "FBS, HbA1c, Lipid Profile, Liver Function, Kidney Function, TSH, Vitamin D, CBC, ESR, Urine Routine."
      }
    ],
    popularTests: [
      { name: "Lipid Profile Test", parameters: "8 Parameters", tat: "6 hours", price: 336, originalPrice: 800, slug: "lipid-profile-test" },
      { name: "Liver Function Test (LFT)", parameters: "11 Parameters", tat: "6 hours", price: 425, originalPrice: 780, slug: "liver-function-test" },
      { name: "HbA1c Blood Sugar", parameters: "2 Parameters", tat: "6 hours", price: 490, originalPrice: 618, slug: "hba1c-test" },
      { name: "Vitamin B12 Assay", parameters: "1 Parameter", tat: "6 hours", price: 990, originalPrice: 1400, slug: "vitamin-b12-test" }
    ]
  },
  kids: {
    slug: 'kids',
    title: "Child & Pediatric Blood Tests Bangalore | QXL Diagnostics",
    heading: "Pediatric & Child Health Diagnostic Profiles",
    subtitle: "Gentle phlebotomy and gentle pediatric sample draws by specially trained pediatric technicians.",
    badge: "PEDIATRIC HEALTH",
    description: "From routine growth baselines (Iron, Calcium, Vitamin D) and pediatric allergy panels to complete blood counts and blood grouping — comfortable doorstep collection ensures zero stress for your little one.",
    packages: [
      {
        name: "Child Wellness & Growth Screen",
        parameters: "35 Parameters",
        tat: "6 hours",
        price: 1299,
        originalPrice: 3200,
        discount: "60% Off",
        slug: "packages",
        includes: "CBC with Platelets, Blood Grouping & Rh, Calcium, Vitamin D3, Serum Iron & Urine Routine."
      },
      {
        name: "Pediatric Fever & Infection Panel",
        parameters: "27 Parameters",
        tat: "6 hours",
        price: 600,
        originalPrice: 660,
        discount: "9% Off",
        slug: "conditions/fever-season",
        includes: "Complete Blood Count, ESR, Dengue NS1 & Platelets, Urine examination."
      },
      {
        name: "Child Allergy & Total IgE Screen",
        parameters: "15 Parameters",
        tat: "12 hours",
        price: 1450,
        originalPrice: 2800,
        discount: "48% Off",
        slug: "conditions/allergy",
        includes: "Total IgE Allergy level, Absolute Eosinophil Count, CBC, and environmental hypersensitivity markers."
      }
    ],
    popularTests: [
      { name: "Complete Blood Count (CBC)", parameters: "26 Parameters", tat: "6 hours", price: 250, originalPrice: 350, slug: "cbc-test" },
      { name: "Blood Grouping & Rh Type", parameters: "2 Parameters", tat: "6 hours", price: 150, originalPrice: 250, slug: "tests" },
      { name: "Serum Calcium & Vit D3", parameters: "2 Parameters", tat: "6 hours", price: 850, originalPrice: 1500, slug: "vitamin-d-test" },
      { name: "Total IgE Allergy Screen", parameters: "1 Parameter", tat: "6 hours", price: 600, originalPrice: 900, slug: "speciality-tests" }
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_DATA[slug];
  if (!category) return { title: "Health Checkup Categories | QXL Diagnostics" };

  return {
    title: category.title,
    description: category.subtitle,
    alternates: {
      canonical: `https://qxldiagnostics.com/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES_DATA[slug];
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col text-slate-900">
      <Header />
      
      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="bg-white border-b border-amber-100/60 py-10 sm:py-14">
          <div className="max-w-[1260px] mx-auto px-4">
            <span className="inline-block bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-[10.5px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-2xs">
              {category.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0f2d5e] leading-tight mb-3">
              {category.heading}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-3xl leading-relaxed mb-4">
              {category.subtitle}
            </p>
            <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
              {category.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-6">
              <Link
                href="/book"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Book Doorstep Collection →
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=919964639639"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-slate-300 hover:border-[#2563EB] text-[#0f2d5e] font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                Chat with Doctor on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Recommended Packages */}
        <section className="py-10 max-w-[1260px] mx-auto px-4">
          <div className="mb-6">
            <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">
              Curated for {slug.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e] mt-1">
              Recommended Health Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {category.packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl rounded-[26px] p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-3">
                    {pkg.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INCLUDES</span>
                      <span className="font-black text-slate-900">{pkg.parameters}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REPORTS IN</span>
                      <span className="font-black text-slate-900">{pkg.tat}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    {pkg.includes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-semibold line-through">₹{pkg.originalPrice}</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{pkg.discount}</span>
                    </div>
                    <div className="text-xl font-black text-slate-900">₹{pkg.price}</div>
                  </div>

                  <Link
                    href={`/book?package=${encodeURIComponent(pkg.name)}`}
                    className="bg-white border-2 border-[#f97316] hover:bg-[#fff7ed] text-[#f97316] font-bold text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1"
                  >
                    <span>+ Add</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Most Common Individual Tests */}
        <section className="py-6 max-w-[1260px] mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">
                Routine Screening
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e] mt-1">
                Frequently Booked Individual Tests
              </h2>
            </div>
            <Link href="/tests" className="text-xs font-black text-[#2563EB] hover:underline flex items-center gap-1">
              View All Tests →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.popularTests.map((test, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-[#2563EB] transition-all shadow-2xs"
              >
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-tight mb-2">
                    {test.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-semibold mb-3">
                    <span>{test.parameters}</span> · <span>⚡ {test.tat}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-slate-900">₹{test.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{test.originalPrice}</span>
                  </div>
                  <Link
                    href={`/${test.slug}`}
                    className="bg-white border border-[#f97316] text-[#f97316] hover:bg-[#fff7ed] font-bold text-xs px-3 py-1 rounded-full"
                  >
                    + Add
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
