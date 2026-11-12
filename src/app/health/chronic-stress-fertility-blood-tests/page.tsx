import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  FlaskConical,
  Activity,
  FileText,
  Sparkles,
  Heart,
  Baby,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Can Chronic Stress Affect Fertility? Hormones & Blood Tests | QXL",
  description:
    "Dr Shantakumar Muruda explains the stress-cortisol-fertility axis, warning signs, female & male reproductive hormone blood tests, AMH, and semen analysis in Bengaluru.",
  alternates: {
    canonical: "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  },
  openGraph: {
    type: "article",
    title: "Can Chronic Stress Affect Your Fertility? Hormonal Imbalance, Warning Signs & Essential Blood Tests",
    description:
      "Dr Shantakumar Muruda explains how chronic cortisol elevation disrupts GnRH, LH, FSH and ovulation, warning signs, male/female tests, and identifying treatable conditions like PCOS and thyroid dysfunction.",
    url: "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests",
    siteName: "QXL Diagnostics",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg",
        width: 1200,
        height: 675,
        alt: "Stress and fertility hormone blood tests by QXL Diagnostics"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Can Chronic Stress Affect Fertility? Hormones & Blood Tests",
    description:
      "Evidence-based clinical guide to cortisol, reproductive hormones, female/male fertility blood tests, and medical causes of delayed conception.",
    images: ["https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"]
  }
};

const articleLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "MedicalOrganization"],
      "@id": "https://qxldiagnostics.com/#organization",
      "name": "QXL Diagnostics Super Speciality Laboratory",
      "url": "https://qxldiagnostics.com/",
      "telephone": "+91 9964 639 639",
      "areaServed": {
        "@type": "City",
        "name": "Bengaluru"
      }
    },
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/dr-shantakumar-muruda#person",
      "name": "Dr. Shantakumar Muruda, MD (Medical Biochemistry)",
      "url": "https://qxldiagnostics.com/dr-shantakumar-muruda",
      "jobTitle": "Founder & Chief Clinical Biochemist",
      "affiliation": {
        "@id": "https://qxldiagnostics.com/#organization"
      }
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests#webpage",
      "url": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests",
      "name": "Can Chronic Stress Affect Your Fertility? Hormonal Imbalance, Warning Signs & Essential Blood Tests",
      "description": "Evidence-based clinical explanation of the stress-cortisol reproductive axis, female and male fertility laboratory blood tests, and separating psychological stress from treatable conditions.",
      "inLanguage": "en-IN",
      "lastReviewed": "2026-11-06",
      "reviewedBy": {
        "@id": "https://qxldiagnostics.com/dr-shantakumar-muruda#person"
      }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests#article",
      "url": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests",
      "mainEntityOfPage": {
        "@id": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests#webpage"
      },
      "headline": "Can Chronic Stress Affect Your Fertility? Hormonal Imbalance, Warning Signs & Essential Blood Tests",
      "description": "Evidence-based explanation of how chronic cortisol elevation disrupts GnRH, LH, FSH and ovulation, warning signs, male/female tests, and identifying treatable conditions like PCOS and thyroid dysfunction.",
      "datePublished": "2026-11-06T09:00:00+05:30",
      "dateModified": "2026-11-06T09:00:00+05:30",
      "inLanguage": "en-IN",
      "author": {
        "@id": "https://qxldiagnostics.com/dr-shantakumar-muruda#person"
      },
      "publisher": {
        "@id": "https://qxldiagnostics.com/#organization"
      },
      "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://qxldiagnostics.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Health Guides",
          "item": "https://qxldiagnostics.com/health/symptoms-causes"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stress & Fertility Blood Tests",
          "item": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://qxldiagnostics.com/health/chronic-stress-fertility-blood-tests#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can emotional stress completely prevent ovulation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Severe acute or chronic emotional stress activates the hypothalamic-pituitary-adrenal (HPA) axis, elevating cortisol and CRH. This suppresses pulsatile GnRH release from the hypothalamus, blunting the pituitary LH surge needed to trigger ovulation and causing functional hypothalamic anovulation."
          }
        },
        {
          "@type": "Question",
          "name": "Does high cortisol directly harm sperm quality in men?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Persistently elevated cortisol inhibits testosterone production by testicular Leydig cells. It also increases systemic oxidative stress, damaging sperm membrane lipids and elevating DNA fragmentation, which impairs sperm count, progressive motility, and morphology."
          }
        },
        {
          "@type": "Question",
          "name": "What is Anti-Müllerian Hormone (AMH) and when should it be tested?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AMH is a glycoprotein hormone secreted by granulosa cells of preantral and small antral ovarian follicles. It directly reflects remaining ovarian reserve. Because it remains stable throughout the menstrual cycle, AMH can be measured via a simple blood draw on any cycle day."
          }
        },
        {
          "@type": "Question",
          "name": "Why is semen analysis necessary if the female partner has irregular cycles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Male reproductive factors contribute to 40% to 50% of all infertility cases. Even if female cycle irregularities exist, evaluating both partners concurrently prevents months of delayed diagnosis and ensures a comprehensive, effective clinical treatment plan."
          }
        },
        {
          "@type": "Question",
          "name": "Can thyroid disorders mimic stress-related fertility problems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Both subclinical and overt hypothyroidism alter prolactin regulation, disrupt menstrual regularity, cause fatigue, and impair luteal phase progesterone. A basic TSH and Free T4 blood test readily determines whether symptoms are thyroid-driven."
          }
        }
      ]
    }
  ]
};

export default function ChronicStressFertilityPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-900">
      <Script
        id="stress-fertility-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Top Breadcrumb & Metadata Header */}
      <header className="bg-gradient-to-b from-[#eaf3fe] via-[#f0f7ff] to-white text-[#0B2545] pt-8 pb-12 px-4 sm:px-6 border-b border-blue-200">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#2563eb] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/health/symptoms-causes" className="hover:text-[#2563eb] transition-colors">
              Health Guides
            </Link>
            <span>/</span>
            <span className="text-[#2563eb] font-bold truncate">Stress &amp; Fertility</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/30 px-3 py-1 rounded-full text-[#1e40af] text-xs font-black uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Reproductive Endocrinology &amp; Clinical Biochemistry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0f2d5e]">
            Can Chronic Stress Affect Your Fertility? Warning Signs, Hormonal Imbalances &amp; Essential Blood Tests
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            A clinician-reviewed guide by Dr. Shantakumar Muruda on how chronic stress influences the neuroendocrine reproductive axis, which tests to order, and why you shouldn't dismiss fertility hurdles as "just stress."
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-slate-200 pt-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-black flex items-center justify-center text-xs">
                SM
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Medical Reviewer</span>
                <Link
                  href="/dr-shantakumar-muruda"
                  className="font-bold text-[#0f2d5e] hover:text-[#2563eb] transition-colors"
                >
                  Dr. Shantakumar Muruda, MD
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
              <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Published 6 Nov 2026</span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>NABL Accredited Review (MC-6849)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Key Takeaways Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-[#0B2545] font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Clinical Summary at a Glance</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            <strong>Chronic psychological stress and sleep deprivation directly elevate cortisol</strong>, which suppresses the hypothalamic release of Gonadotropin-Releasing Hormone (GnRH). In women, this blunts LH and FSH secretion, leading to irregular menses, delayed ovulation, or luteal phase defects. In men, elevated cortisol impairs testosterone production and increases sperm oxidative stress. 
            However, <strong>stress is rarely the sole cause of infertility</strong>. Underlying physical conditions—including Polycystic Ovary Syndrome (PCOS), thyroid disorders, hyperprolactinaemia, or sperm abnormalities—require objective laboratory blood tests and semen analysis.
          </p>
        </div>

        {/* Section 1: The Neuroendocrine Mechanism */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#2563eb]" />
            1. How Chronic Stress Interferes with Reproductive Hormones
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The human body features two closely linked neuroendocrine pathways: the <strong>Hypothalamic–Pituitary–Adrenal (HPA) axis</strong> (which governs the stress response) and the <strong>Hypothalamic–Pituitary–Gonadal (HPG) axis</strong> (which governs reproduction).
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            During prolonged periods of work burnout, emotional distress, or severe physical stress, high levels of Corticotropin-Releasing Hormone (CRH) and Cortisol suppress the HPG axis at three distinct biological levels:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-rose-100 text-rose-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">Hypothalamus</span>
              <h3 className="text-sm font-black text-slate-900">GnRH Suppression</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Elevated cortisol inhibits the pulsatile frequency of GnRH secretion, reducing the primary stimulus needed for pituitary reproductive hormone output.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-sky-100 text-sky-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">Pituitary</span>
              <h3 className="text-sm font-black text-slate-900">Blunted LH &amp; FSH Surge</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Without optimal GnRH signals, the pituitary gland fails to trigger the sharp mid-cycle LH surge essential for follicle rupture and egg release.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">Gonads</span>
              <h3 className="text-sm font-black text-slate-900">Progesterone &amp; Testosterone</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Leads to deficient corpus luteum progesterone production in women (implantation failure) and reduced Leydig cell testosterone synthesis in men.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 6 Warning Signs */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            2. Six Warning Signs You Shouldn't Ignore
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            While temporary stress around a life event is normal, ongoing symptoms indicate an underlying hormonal or metabolic disruption that warrants objective evaluation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Irregular, Delayed, or Absent Periods</h4>
                <p className="text-xs text-slate-600 mt-0.5">Cycles under 21 days, over 35 days, or skipped months (oligomenorrhoea / hypothalamic amenorrhoea).</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Persistent Fatigue &amp; Sleep Disruption</h4>
                <p className="text-xs text-slate-600 mt-0.5">Waking unrefreshed, nocturnal awakenings, and exhaustion driven by altered cortisol diurnal rhythm.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Acne, Hirsutism, or Unexplained Weight Gain</h4>
                <p className="text-xs text-slate-600 mt-0.5">Physical markers of androgen excess or insulin resistance, characteristic of Polycystic Ovary Syndrome (PCOS).</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Reduced Libido &amp; Sexual Difficulties</h4>
                <p className="text-xs text-slate-600 mt-0.5">Blunted sexual desire and erectile difficulty caused by lower bioavailable sex steroids and sympathetic overload.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Difficulty Conceiving After Timed Cycles</h4>
                <p className="text-xs text-slate-600 mt-0.5">Inability to conceive after 12 months (or 6 months for women aged 35+) of regular, unprotected intercourse.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Symptoms Overlapping with Thyroid Disease</h4>
                <p className="text-xs text-slate-600 mt-0.5">Cold sensitivity, sluggishness, dry skin, and hair fall that mimic burnout but stem from thyroid underactivity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Female Fertility Panel */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#2563eb]" />
            3. Essential Female Fertility Blood Tests
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A comprehensive female endocrine assessment evaluates ovarian reserve, cycle coordination, and systemic hormonal glands:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-black">
                  <th className="p-3">Investigation</th>
                  <th className="p-3">Testing Timing</th>
                  <th className="p-3">Clinical Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-900">TSH &amp; Free T4</td>
                  <td className="p-3">Morning draw (any day)</td>
                  <td className="p-3">Even subclinical hypothyroidism (TSH &gt; 2.5–4.0 µIU/mL) triggers anovulation and elevates early miscarriage risk.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Serum Prolactin</td>
                  <td className="p-3">Fasting morning (resting)</td>
                  <td className="p-3">Stress or pituitary microadenomas elevate prolactin, directly shutting down GnRH pulsatility and menses.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">FSH &amp; LH</td>
                  <td className="p-3">Day 2 to Day 3 of menses</td>
                  <td className="p-3">Evaluates baseline pituitary gonadotropin reserve and helps diagnose PCOS (elevated LH:FSH ratio).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Serum Estradiol (E2)</td>
                  <td className="p-3">Day 2 to Day 3 of menses</td>
                  <td className="p-3">Confirms true baseline ovarian quiescence; high early estradiol can falsely mask elevated FSH.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Mid-Luteal Progesterone</td>
                  <td className="p-3">Day 21 (or 7 days post-ovulation)</td>
                  <td className="p-3">Progesterone &gt; 10 ng/mL objectively confirms that ovulation occurred and luteal phase support is adequate.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Anti-Müllerian Hormone (AMH)</td>
                  <td className="p-3">Any day of menstrual cycle</td>
                  <td className="p-3">Directly measures remaining primordial ovarian follicle pool (ovarian reserve); completely unaffected by cycle day.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Quantitative Beta-hCG</td>
                  <td className="p-3">When menses are delayed</td>
                  <td className="p-3">Confirms or rules out early gestation, ectopic pregnancy, or biochemical pregnancy.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Male Fertility Tests */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#2563eb]" />
            4. Essential Male Fertility Investigations
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Male factor subfertility contributes to approximately <strong>40% to 50% of all infertility cases</strong>. Chronic psychological stress, nicotine, and poor sleep impair testicular spermatogenesis:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Comprehensive Semen Analysis (WHO 6th Edition)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Evaluates semen volume, sperm concentration (&gt;15 million/mL), total motility (&gt;40%), progressive motility (&gt;32%), and strict morphology (&gt;4% normal forms) following 2 to 5 days of sexual abstinence.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Morning Total &amp; Free Testosterone</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Drawn between 8:00 AM and 10:00 AM to capture peak diurnal androgen secretion. Unrelenting stress, visceral adiposity, and sleep apnea significantly suppress morning testosterone levels.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-xs sm:text-sm font-black text-slate-900">FSH, LH &amp; Serum Prolactin</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Differentiates primary testicular failure (elevated FSH/LH with low testosterone) from secondary pituitary hypogonadism. Elevated prolactin in men causes erectile dysfunction and oligospermia.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Metabolic Co-factors */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#2563eb]" />
            5. Crucial Metabolic &amp; Nutritional Co-factors
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Gamete quality and endometrial receptivity depend heavily on systemic cellular health:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <h4 className="text-xs sm:text-sm font-black text-emerald-950">Fasting Insulin &amp; HbA1c</h4>
              <p className="text-xs text-emerald-800 mt-0.5">Insulin resistance drives theca cell hyperandrogenism in PCOS, preventing follicle rupture and maturation.</p>
            </div>

            <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-200">
              <h4 className="text-xs sm:text-sm font-black text-sky-950">CBC &amp; Serum Ferritin</h4>
              <p className="text-xs text-sky-800 mt-0.5">Cellular iron deficiency (ferritin &lt; 30 ng/mL) impairs ovulatory efficiency and cellular oxygenation even without overt anaemia.</p>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200">
              <h4 className="text-xs sm:text-sm font-black text-amber-950">Vitamin D (25-OH)</h4>
              <p className="text-xs text-amber-800 mt-0.5">Receptors exist in ovarian tissue, endometrium, and testes. Low vitamin D (&lt;20 ng/mL) correlates with poor IVF outcomes and reduced sperm motility.</p>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200">
              <h4 className="text-xs sm:text-sm font-black text-purple-950">Vitamin B12 &amp; Folate</h4>
              <p className="text-xs text-purple-800 mt-0.5">Essential one-carbon methylation cofactors required for accurate DNA replication during rapid cellular cleavage and gametogenesis.</p>
            </div>
          </div>
        </section>

        {/* Section 6: 5 Lifestyle Habits */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            6. Five Evidence-Based Habits That Support Reproductive Health
          </h2>
          <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
            <p><strong>1. Prioritise 7 to 9 Hours of Sleep:</strong> Melatonin acts as a potent intra-follicular antioxidant that shields maturing oocytes from free-radical damage.</p>
            <p><strong>2. Daily Vagus Nerve &amp; Stress Modulation:</strong> 15 minutes of slow diaphragmatic breathing (4-7-8 breathing) or progressive muscle relaxation restores parasympathetic tone.</p>
            <p><strong>3. Anti-Inflammatory Mediterranean Diet:</strong> Emphasise dark greens, nuts, pulses, whole grains, and omega-3s while minimizing refined carbohydrates and trans fats.</p>
            <p><strong>4. Moderate, Consistent Physical Activity:</strong> 30 minutes of brisk walking or swimming 4–5 days a week boosts insulin sensitivity without spiking cortisol.</p>
            <p><strong>5. Timely Medical Consultation:</strong> Seek specialist evaluation if pregnancy has not occurred after 12 months (or 6 months if age 35+).</p>
          </div>
        </section>

        {/* Section 7: Booking CTA */}
        <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0f7ff] to-[#dbeafe] border border-blue-200 text-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-md">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
              Get Objective Fertility &amp; Hormone Answers in Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Book doctor-reviewed female and male reproductive blood panels with temperature-controlled home blood collection or visit our NABL-accredited Central Reference Laboratory in Kengeri or North Hub in Yelahanka.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/book"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              Book Home Blood Collection →
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=919964639639"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +91 9964 639 639
            </a>
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#2563eb]" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Can emotional stress completely prevent ovulation?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Yes. Severe acute or chronic emotional stress activates the hypothalamic-pituitary-adrenal (HPA) axis, elevating cortisol and CRH. This suppresses pulsatile GnRH release from the hypothalamus, blunting the pituitary LH surge needed to trigger ovulation and causing functional hypothalamic anovulation.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Does high cortisol directly harm sperm quality in men?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Yes. Persistently elevated cortisol inhibits testosterone production by testicular Leydig cells. It also increases systemic oxidative stress, damaging sperm membrane lipids and elevating DNA fragmentation, which impairs sperm count, progressive motility, and morphology.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-900">What is Anti-Müllerian Hormone (AMH) and when should it be tested?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                AMH is a glycoprotein hormone secreted by granulosa cells of preantral and small antral ovarian follicles. It directly reflects remaining ovarian reserve. Because it remains stable throughout the menstrual cycle, AMH can be measured via a simple blood draw on any cycle day.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Why is semen analysis necessary if the female partner has irregular cycles?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Male reproductive factors contribute to 40% to 50% of all infertility cases. Even if female cycle irregularities exist, evaluating both partners concurrently prevents months of delayed diagnosis and ensures a comprehensive, effective clinical treatment plan.
              </p>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Can thyroid disorders mimic stress-related fertility problems?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Yes. Both subclinical and overt hypothyroidism alter prolactin regulation, disrupt menstrual regularity, cause fatigue, and impair luteal phase progesterone. A basic TSH and Free T4 blood test readily determines whether symptoms are thyroid-driven.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: References */}
        <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">Primary Scientific References</h4>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Practice Committee of the American Society for Reproductive Medicine (ASRM). Diagnostic evaluation of the infertile male. <em>Fertil Steril</em>. 2015;103(3):e18–e25.</li>
            <li>Practice Committee of the ASRM. Testing and interpreting measures of ovarian reserve. <em>Fertil Steril</em>. 2020;114(6):1151–1157.</li>
            <li>World Health Organization. WHO laboratory manual for the examination and processing of human semen, sixth edition. Geneva: WHO; 2021.</li>
            <li>Berga SL, Loucks TL. Use of cognitive behavior therapy for functional hypothalamic amenorrhea. <em>Ann N Y Acad Sci</em>. 2006;1092(1):342–349.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
