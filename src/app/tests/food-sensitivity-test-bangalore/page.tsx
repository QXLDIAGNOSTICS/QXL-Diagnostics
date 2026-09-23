import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  Stethoscope,
  Phone,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, BUSINESS_LEGAL_NAME } from "@/lib/businessInfo";
import { MASTER_CATALOGUE } from "@/lib/masterCatalogue";

const testData = MASTER_CATALOGUE.find((t) => t.id === "food-sensitivity-287") || {
  id: "food-sensitivity-287",
  name: "Comprehensive Food-Specific IgG Panel (287 Foods)",
  shortName: "Food Sensitivity Test (287 Foods)",
  category: "Allergy & Sensitivity",
  price: 14500,
  mrp: 18500,
  parametersCount: 287,
  paramText: "287 Food Antigens",
  fasting: false,
  fastingInstruction: "No Fasting Required",
  sampleType: "Serum",
  tat: "3–5 Days",
  slug: "/food-sensitivity-test-bangalore",
  icon: "🥗",
  popular: true,
  aliases: [
    "food sensitivity test",
    "food intolerance test bangalore",
    "287 food sensitivity test",
    "food sensitivity blood test",
    "food intolerance blood test",
    "igg food sensitivity test",
  ],
  homeCollectionAvailable: true,
  kind: "test",
};

export const metadata: Metadata = {
  title: "287 Food Sensitivity Test, Food Intolerance & Bloating FAQs | QXL Diagnostics",
  description:
    "Evidence-based answers from QXL Diagnostics about 287 food sensitivity testing, food intolerance, post-meal bloating, lactose intolerance, celiac serology, and home collection in Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/tests/food-sensitivity-test-bangalore`,
  },
  openGraph: {
    title: "287 Food Sensitivity Test & Intolerance FAQs | QXL Diagnostics",
    description:
      "Advanced food-specific IgG blood testing (287 food antigens) with home sample collection across Bengaluru and doctor-led diagnostic reporting.",
    url: `${SITE_URL}/tests/food-sensitivity-test-bangalore`,
    type: "website",
    siteName: "QXL Diagnostics",
  },
};

const FOOD_SENSITIVITY_FAQS = [
  {
    name: "What is the difference between food allergy, food intolerance and food sensitivity?",
    text: "Food allergy, food intolerance and food sensitivity are not the same diagnosis. IgE-mediated food allergy is an immune reaction that can occur rapidly and may cause hives, swelling, wheeze or anaphylaxis. Food intolerance usually reflects impaired digestion or absorption, while IBS and other gut disorders can mimic food-triggered symptoms. IgE-mediated food allergy involves allergen-specific IgE against food proteins. Food intolerance generally does not involve the classic IgE pathway; lactose intolerance, for example, results from inadequate intestinal lactase activity. Food sensitivity is a broad consumer term that may include IBS, dyspepsia, constipation, FODMAP-related symptoms or non-celiac wheat sensitivity."
  },
  {
    name: "How can I tell whether bloating after meals is IBS, food intolerance or SIBO?",
    text: "Bloating after meals can occur with IBS, lactose or other carbohydrate malabsorption, SIBO, dyspepsia, constipation and several other conditions. IBS is identified from a characteristic symptom pattern, whereas SIBO and specific intolerances require selective testing when clinically appropriate. No single blood test can reliably distinguish all of these causes. IBS may involve recurrent abdominal pain with altered bowel habits. Food intolerance is more likely when symptoms reproducibly follow a particular food or carbohydrate. SIBO should be considered selectively in an appropriate clinical context and may be evaluated using glucose or lactulose breath testing."
  },
  {
    name: "Is lactose intolerance the same as milk allergy?",
    text: "Lactose intolerance is caused by reduced lactase activity, so unabsorbed lactose draws water into the intestine and is fermented by bacteria, producing gas, bloating, pain or diarrhoea. Milk allergy is an immune reaction to milk proteins, not lactose, and may cause hives, swelling, wheeze, vomiting or, rarely, anaphylaxis. Lactose intolerance is therefore a digestive problem, while milk allergy follows an immune-allergy pathway. A2 milk still contains lactose and does not eliminate lactose exposure."
  },
  {
    name: "What is the difference between gluten intolerance, celiac disease and wheat allergy?",
    text: "Celiac disease, wheat allergy and non-celiac wheat sensitivity are different conditions. Celiac disease is an immune-mediated enteropathy triggered by gluten; wheat allergy is usually IgE-mediated; and non-celiac wheat or gluten sensitivity is considered only after celiac disease and wheat allergy have been excluded. A gluten-free diet should not replace proper evaluation. Initial celiac testing commonly includes tissue transglutaminase IgA together with total IgA. There is no single validated blood test that independently proves non-celiac wheat sensitivity."
  },
  {
    name: "Can food sensitivity cause only bloating and gas without a rash or allergy symptoms?",
    text: "Yes. Bloating, gas, abdominal pain or loose stools can occur after particular foods without hives or breathing symptoms, but this does not automatically mean a food allergy. Lactose or FODMAP malabsorption, IBS, constipation, dyspepsia and other gastrointestinal disorders are often more plausible explanations for isolated, recurrent digestive symptoms. Immediate allergy becomes more concerning when symptoms are accompanied by hives, facial swelling, wheezing, throat tightness or faintness."
  },
  {
    name: "Why am I still bloated when my endoscopy, ultrasound and routine blood tests are normal?",
    text: "Normal endoscopy, ultrasound or routine blood tests do not rule out all causes of chronic bloating. IBS and other disorders of gut-brain interaction can produce real symptoms through altered motility, visceral hypersensitivity and impaired handling of intestinal gas even when structural tests are normal. Persistent or changing symptoms still require clinical review. Other possibilities include constipation, lactose or fructose malabsorption, functional dyspepsia, selected cases of SIBO, medication effects and dietary triggers."
  },
  {
    name: "Which symptoms after eating need medical assessment instead of a food sensitivity test?",
    text: "Seek prompt medical assessment rather than relying on a food-sensitivity panel if post-meal symptoms include gastrointestinal bleeding, unexplained weight loss, persistent vomiting, fever, progressive swallowing difficulty, significant anaemia, nocturnal symptoms, a new persistent change in bowel habits or features of anaphylaxis such as breathing difficulty, throat swelling or faintness. Severe or progressively worsening abdominal pain and marked nutritional deficiency also require appropriate clinical assessment."
  },
  {
    name: "Can irregular work hours and late-night meals cause bloating in Bengaluru professionals?",
    text: "Irregular hybrid-work schedules, skipped meals, late-night eating, poor sleep, stress and inconsistent hydration can aggravate reflux, constipation, dyspepsia and IBS symptoms. These habits do not create a new food allergy by themselves, but they can change gut motility and symptom perception, making ordinary meals seem increasingly difficult to tolerate. Lifestyle factors can therefore amplify an underlying functional or gastrointestinal problem without proving food allergy."
  },
  {
    name: "Can sitting all day at a desk cause post-meal bloating or constipation?",
    text: "A desk-bound lifestyle does not directly cause food allergy or food intolerance, but prolonged inactivity can contribute to constipation, reduced bowel regularity and post-meal discomfort in susceptible people. When bloating is driven by slow transit or IBS, regular movement, hydration and appropriate dietary adjustments may improve symptoms without unnecessary food exclusions. Tracking stool frequency, stool form, activity, hydration, meal size and symptom timing can help identify patterns."
  },
  {
    name: "Can frequent Swiggy or Zomato meals cause food intolerance or bloating?",
    text: "Frequent Swiggy or Zomato meals do not themselves cause food intolerance. However, restaurant and delivery foods can vary in portion size, fat, spice, fermentable carbohydrates, dairy, onion, garlic, sweeteners and additives. In someone with IBS, lactose intolerance, reflux or another gastrointestinal disorder, these meal characteristics can reproducibly trigger symptoms. A structured food-and-symptom diary is generally more informative than randomly excluding many foods."
  },
  {
    name: "Why does a high-protein diet or protein powder make me bloated?",
    text: "High-protein diets can cause bloating when protein powders or packaged foods also contain lactose, sugar alcohols, inulin, gums or other fermentable ingredients. Large portions, rapid dietary changes and reduced carbohydrate or fibre balance can also alter bowel habits. Symptoms should be linked to ingredients and timing rather than assuming that protein itself is an allergy. Mixing protein powder with milk can also increase lactose exposure."
  },
  {
    name: "Can millets or gluten-free foods actually make bloating worse?",
    text: "Millets and gluten-free foods are not automatically easier to digest. A sudden rise in fibre, large portions, legumes, resistant starches or fermentable carbohydrates can increase gas and bloating in susceptible people. Millets are naturally gluten-free, but improvement after switching grains does not by itself prove celiac disease, wheat allergy or gluten intolerance. Celiac disease should ideally be evaluated before starting a strict gluten-free diet when clinically suspected."
  },
  {
    name: "Should I try a low-FODMAP diet, elimination diet or probiotics for bloating?",
    text: "A low-FODMAP diet can improve global IBS symptoms for selected patients, but it should usually be a limited, structured trial followed by systematic food reintroduction rather than a permanent highly restrictive diet. Probiotics and elimination diets should also be individualized because benefits vary and unnecessary restriction can reduce nutritional quality and dietary diversity. Indian meal planning should account for foods such as idli, dosa, sambar, dal, rajma, chole, milk, curd, paneer, chapati and millet preparations."
  },
  {
    name: "What tests should I do if I am bloated after almost every meal?",
    text: "The right test for persistent bloating depends on the clinical pattern rather than the symptom alone. A clinician may consider celiac serology, lactose breath testing, targeted evaluation for SIBO, inflammatory markers, stool tests or other investigations depending on diarrhoea, constipation, weight loss, anaemia, food-specific reactions and alarm features. Routine broad testing is rarely appropriate. Rapid allergy-like reactions require a different pathway from chronic digestive symptoms."
  },
  {
    name: "Are IgG food sensitivity or food intolerance blood tests accurate?",
    text: "Food-specific IgG panels should not be treated as a diagnostic test for food allergy or food intolerance. Major allergy organizations state that IgG to foods commonly reflects exposure and may be associated with tolerance. A positive result does not prove that a food causes symptoms, so large exclusion diets based only on IgG can be misleading. Immediate food allergy, lactose intolerance, celiac disease, IBS and SIBO each require different diagnostic approaches. The QXL 287 Food Sensitivity Test should therefore be interpreted in clinical context and should not be presented as a stand-alone test proving food allergy, intolerance or the cause of bloating."
  },
  {
    name: "When is a hydrogen or methane breath test useful for lactose intolerance or SIBO?",
    text: "Hydrogen and methane breath tests are non-invasive tools used selectively for carbohydrate malabsorption and suspected SIBO. For lactose intolerance, symptoms are interpreted alongside gas production after a lactose load. For SIBO, glucose or lactulose may be used, but false positives and false negatives occur, so results must be interpreted within the clinical context. Preparation, recent antibiotics, bowel transit, altered anatomy and substrate choice can influence results."
  },
  {
    name: "What blood tests diagnose celiac disease, and should I stop gluten before testing?",
    text: "Celiac disease is usually screened with tissue transglutaminase IgA together with assessment of total IgA; IgG-based tests are used when IgA deficiency is present. Most adults with positive serology still require gastroenterology evaluation and small-bowel biopsy confirmation. Do not start a gluten-free diet before testing, because it can reduce diagnostic sensitivity. Removing gluten can lower antibody levels and reduce intestinal inflammatory findings."
  },
  {
    name: "Can food intolerance or gut tests be done through home sample collection in Bengaluru?",
    text: "Home blood collection can improve convenience for tests that are valid on venous samples, such as celiac serology or clinically selected allergen-specific IgE, but convenience does not make an inappropriate test clinically useful. Breath tests require standardized preparation and timed samples. Digital gastroenterology consultations can support triage, but alarm symptoms may require in-person assessment. QXL Diagnostics provides information about laboratory testing and home sample collection in Bengaluru at https://www.qxldiagnostics.com/."
  },
  {
    name: "Is a gut microbiome test useful for diagnosing food intolerance, IBS or chronic bloating?",
    text: "Commercial gut microbiome tests can describe microbial patterns, but they are not currently a validated stand-alone diagnostic test for food intolerance, IBS or the cause of bloating. Results may vary with diet, medications and laboratory methods. Clinically established tests should guide diagnosis first, while microbiome reports should be interpreted cautiously and not used to justify extensive restriction. Microbiome profiles should not independently diagnose food allergy, SIBO, leaky gut or the exact cause of abdominal bloating."
  }
];

export default function FoodSensitivityTestPage() {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#webpage`,
        url: `${SITE_URL}/tests/food-sensitivity-test-bangalore`,
        name: "Food Sensitivity Test in Bangalore | QXL Diagnostics",
        headline: "Food Sensitivity Test in Bangalore (Bengaluru) – Comprehensive 287 IgG Food Panel",
        description:
          "Complete information on 287 food-specific IgG blood testing, panel coverage, fasting requirements, transparent pricing, and home sample collection in Bengaluru.",
        inLanguage: "en-IN",
        lastReviewed: "2026-09-22",
        dateModified: "2026-09-22",
        reviewedBy: {
          "@type": "Person",
          "@id": `${SITE_URL}/#founder`,
          name: "Dr. Shantakumar Muruda",
          jobTitle: "Founder & Chief Clinical Biochemist",
        },
        about: {
          "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#test`,
        },
        publisher: {
          "@id": `${SITE_URL}/#diagnosticlab`,
        },
        breadcrumb: {
          "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#breadcrumb`,
        },
      },
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#test`,
        name: testData.name,
        alternateName: testData.aliases,
        description:
          "A multiplex blood test measuring food-specific IgG antibody reactivity against a broad panel of 287 food antigens. IgG reactivity provides clinical insight for dietary management alongside clinical evaluation.",
        url: `${SITE_URL}/tests/food-sensitivity-test-bangalore`,
        mainEntityOfPage: {
          "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#webpage`,
        },
      },
      {
        "@type": ["DiagnosticLab", "LocalBusiness"],
        "@id": `${SITE_URL}/#diagnosticlab`,
        name: BUSINESS_LEGAL_NAME,
        url: `${SITE_URL}/`,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          streetAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560060",
          addressCountry: "IN",
        },
        availableTest: {
          "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#test`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#food-sensitivity-faq`,
        url: `${SITE_URL}/tests/food-sensitivity-test-bangalore`,
        name: "287 Food Sensitivity Test, Food Intolerance & Post-Meal Bloating FAQs",
        description:
          "Evidence-based answers from QXL Diagnostics about food sensitivity, food intolerance, post-meal bloating, lactose intolerance, gluten-related symptoms, IBS, SIBO, diagnostic testing and home sample collection in Bengaluru.",
        publisher: {
          "@type": "MedicalOrganization",
          name: BUSINESS_LEGAL_NAME,
          url: `${SITE_URL}/`,
        },
        mainEntity: FOOD_SENSITIVITY_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.name,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.text,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/tests/food-sensitivity-test-bangalore#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tests", item: `${SITE_URL}/tests` },
          { "@type": "ListItem", position: 3, name: "Food Sensitivity Test", item: `${SITE_URL}/tests/food-sensitivity-test-bangalore` },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* ── HERO & BREADCRUMB ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sky-300 mb-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <Link href="/tests" className="hover:text-white transition-colors">Tests</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white font-bold truncate">Food Sensitivity Test Bangalore</span>
          </nav>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#D69A18] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  287 FOOD ANTIGEN PANEL
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-3 py-1 rounded-full">
                  Free Home Collection Included
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Food Sensitivity Test in Bangalore
              </h1>

              <p className="text-sky-100 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                Comprehensive IgG antibody blood panel measuring reactivity against 287 food antigens. Includes phlebotomist home collection across Bengaluru and doctor-reviewed reporting.
              </p>

              {/* Direct AEO Summary Answer Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-sky-50 text-sm leading-relaxed font-medium">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Quick Diagnostic Overview</span>
                </p>
                A Food Sensitivity Test measures food-specific Immunoglobulin G (IgG) antibody levels in blood to evaluate delayed immune responses to 287 foods. Fasting is not required, and same-day doorstep blood collection is available across all Bengaluru pin codes through QXL Diagnostics.
              </div>
            </div>

            {/* Price & Booking Card */}
            <div className="md:col-span-4">
              <div className="bg-white rounded-3xl p-6 text-slate-800 shadow-xl border border-slate-200">
                <div className="text-center pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Single Transparent Price</span>
                  <div className="flex items-baseline justify-center gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#0f2d5e]">₹{testData.price}</span>
                    <span className="text-base font-semibold text-slate-400 line-through">₹{testData.mrp}</span>
                  </div>
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-extrabold px-3 py-0.5 rounded-full mt-2 border border-emerald-200">
                    Save ₹{testData.mrp - testData.price} (21% OFF)
                  </span>
                </div>

                <div className="py-4 space-y-2.5 text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Panel Scope:</span>
                    <span className="font-bold text-slate-800">287 Food Antigens</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Specimen:</span>
                    <span className="font-bold text-slate-800">{testData.sampleType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Fasting:</span>
                    <span className="font-bold text-slate-800">{testData.fastingInstruction}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Report TAT:</span>
                    <span className="font-bold text-slate-800">{testData.tat}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/book?test=${testData.id}`}
                    className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>Book Home Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://wa.me/919964639639?text=Hi%2C%20I%20want%20to%20book%20a%20Food%20Sensitivity%20Test%20(287%20Foods)%20in%20Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIMEN & TEST SPECIFICATION TABLE ── */}
      <section className="py-12 max-w-[1240px] mx-auto px-4">
        <h2 className="text-2xl font-black text-[#0f2d5e] mb-6">Test Specifications &amp; Parameters</h2>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[#0f2d5e] font-black uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Specification</th>
                  <th className="py-3.5 px-6">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-slate-700 font-medium">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Test Name</td>
                  <td className="py-3.5 px-6">{testData.name}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Methodology</td>
                  <td className="py-3.5 px-6">Multiplex Microarray Food-Specific IgG Immunoassay</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Antigens Tested</td>
                  <td className="py-3.5 px-6">287 Foods (Dairy, Grains, Meats, Poultry, Seafood, Vegetables, Fruits, Nuts, Seeds, Spices, Teas, Additives)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Specimen Required</td>
                  <td className="py-3.5 px-6">3 mL Serum (EDTA / Plain Tube)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Pre-Test Preparation</td>
                  <td className="py-3.5 px-6">No fasting required. Maintain normal diet prior to testing for accurate antibody baseline.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Home Collection</td>
                  <td className="py-3.5 px-6 text-emerald-700 font-extrabold">Available across all Bengaluru localities (Free Doorstep Visit)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#0f2d5e]">Reporting Time</td>
                  <td className="py-3.5 px-6">{testData.tat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── MEDICAL REVIEWER & EEAT CONNECTIVITY ── */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0B2545] text-amber-400 flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                DS
              </div>
              <div>
                <span className="text-[10px] font-black text-[#D69A18] uppercase tracking-wider block">CLINICAL REVIEWER</span>
                <h3 className="text-lg font-black text-[#0f2d5e]">Dr. Shantakumar Muruda, MD</h3>
                <p className="text-xs text-slate-500 font-semibold">Founder &amp; Chief Clinical Biochemist, NABL Lead Assessor</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/team"
                className="bg-slate-100 hover:bg-slate-200 text-[#0f2d5e] font-extrabold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4 text-[#D69A18]" />
                <span>View Specialist Profile</span>
              </Link>
              <Link
                href="/health/bloating-causes"
                className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
              >
                <span>Related Symptom: Bloating &amp; Fatigue ›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (19 EVIDENCE-BASED AEO FAQS) ── */}
      <section className="py-12 max-w-[1240px] mx-auto px-4">
        <div className="mb-8">
          <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
            EVIDENCE-BASED MEDICAL FAQS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-[#D69A18]" />
            <span>287 Food Sensitivity Test, Food Intolerance &amp; Post-Meal Bloating FAQs</span>
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Clinical guidance from QXL Diagnostics regarding food allergy, IgG sensitivities, IBS, lactose intolerance, and celiac testing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {FOOD_SENSITIVITY_FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-[#D69A18] transition-colors">
              <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2 leading-snug">{faq.name}</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">{faq.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
