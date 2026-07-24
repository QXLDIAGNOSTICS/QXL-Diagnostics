import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { healthConditions } from "@/lib/conditionsData";
import { topTests } from "@/lib/testsData";
import { ArrowRight, Activity, ShieldCheck, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const condition = healthConditions.find((c) => c.slug === slug);
  if (!condition) return { title: "Condition Not Found" };

  return {
    title: `${condition.name} Testing & Diagnostics in Bengaluru | QXL Diagnostics`,
    description: `Comprehensive diagnostic testing for ${condition.name} at QXL Diagnostics Bengaluru. ${condition.description}`,
    alternates: {
      canonical: `https://qxldiagnostics.com/conditions/${slug}`,
    }
  };
}

export default async function ConditionHubPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const condition = healthConditions.find((c) => c.slug === slug);

  if (!condition) {
    notFound();
  }

  // Get rich test objects for related tests
  const relatedTestsData = condition.relatedTests
    .map(testId => topTests.find(t => t.id === testId))
    .filter(Boolean);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#e0f2fe] to-[#fbf8f5] py-12 lg:py-16 border-b border-sky-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Health Condition Hub</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-4">{condition.name} Diagnostics</h1>
          <p className="text-slate-700 font-medium max-w-2xl mx-auto text-sm md:text-base">
            {condition.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/book" className="bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-full hover:bg-[#1d4ed8] transition-all shadow-md text-sm">
              Book a Health Check
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Activity className="w-6 h-6 text-[#2563eb]" /> Recommended Tests for {condition.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedTestsData.map((test: any) => (
                  <Link href={`/tests/${test.slug}`} key={test.id} className="border border-gray-100 rounded-2xl p-4 hover:border-[#2563eb] hover:shadow-md transition-all group bg-slate-50">
                    <h3 className="font-extrabold text-[#0f2d5e] text-sm group-hover:text-[#2563eb] transition-colors mb-1">{test.name}</h3>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                      <span className="bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{test.parameters} Param{test.parameters > 1 ? 's' : ''}</span>
                      <span className="bg-white px-2 py-1 rounded shadow-sm border border-gray-100 text-emerald-600">₹{test.price}</span>
                    </div>
                    <span className="text-[#2563eb] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      View Test <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <ShieldCheck className="w-6 h-6 text-[#2563eb]" /> Recommended Comprehensive Packages
              </h2>
              
              <div className="space-y-3">
                {condition.relatedPackages.map((pkg, idx) => (
                  <div key={idx} className="bg-[#f0f9ff] border border-[#e0f2fe] p-4 rounded-xl flex items-center justify-between gap-4">
                    <span className="font-extrabold text-[#0f2d5e] text-sm">{pkg}</span>
                    <a href={`https://api.whatsapp.com/send?phone=919964639639&text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(pkg)}`} target="_blank" rel="noreferrer" className="bg-[#2563eb] text-white text-[10px] font-extrabold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap uppercase tracking-wider">
                      Book Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-[320px]">
            <div className="bg-[#0f2d5e] text-white rounded-3xl p-8 shadow-xl sticky top-24">
              <h3 className="text-lg font-extrabold mb-2">Need Expert Advice?</h3>
              <p className="text-sm text-sky-100 mb-6 font-medium">
                Not sure which tests you need for {condition.name}? Contact our diagnostic experts for guidance.
              </p>
              
              <div className="space-y-4">
                <a href="tel:+919964639639" className="w-full flex items-center justify-center gap-2 bg-white text-[#0f2d5e] font-extrabold py-3.5 rounded-xl hover:bg-sky-50 transition-colors text-sm shadow-md">
                  <Phone className="w-4 h-4" /> Call +91 99646 39639
                </a>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white font-extrabold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
