"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { api, type BlogPost } from "../../lib/api";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { items } = await api.blog.list(50, 0);
        if (!cancelled) setBlogs(items);
      } catch {
        if (!cancelled) setBlogs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff] py-12">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Header section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
            Health Insights
          </span>
          <h1 className="text-[#0f2d5e] text-3xl md:text-4xl font-extrabold mb-3">
            Blogs
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Stay updated with the latest medical insights, wellness tips, and health news from our team of experts.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-5" />
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(blogs.length > 0 ? blogs : [
              {
                id: "b1",
                title: "Fasting Guidelines Before Blood Tests: Fasting Sugar, Lipid Profile & Liver Assays",
                slug: "blood-test-fasting-guidelines-bangalore",
                excerpt: "Complete preparation guide for fasting blood sugar (FBS), lipid profiles, and liver panels. Learn why fasting matters and what you can drink before collection.",
                created_at: "2026-08-15T10:00:00Z",
                author: "Dr. Shantakumar Muruda (MD Biochemistry)"
              },
              {
                id: "b2",
                title: "Understanding Your Complete Blood Count (CBC) Report: RBC, WBC & Platelets",
                slug: "understanding-cbc-blood-count-report",
                excerpt: "A clear breakdown of CBC parameters — hemoglobin, total leukocyte count (TLC), differential count, and platelet count, reviewed by consultant pathologists.",
                created_at: "2026-08-18T10:00:00Z",
                author: "Dr. Naveen Kumar N (DNB Pathology)"
              },
              {
                id: "b3",
                title: "HbA1c vs. Fasting Blood Glucose: Which Diabetes Test Do You Need?",
                slug: "hba1c-vs-fasting-blood-glucose-diabetes",
                excerpt: "Compare 3-month average glycated hemoglobin (HPLC HbA1c) against daily fasting blood sugar. When to test, reference ranges, and diabetic risk mapping.",
                created_at: "2026-08-20T10:00:00Z",
                author: "Dr. Shantakumar Muruda (MD Biochemistry)"
              },
              {
                id: "b4",
                title: "Vitamin D3 & B12 Deficiency in Bengaluru: Symptoms, Testing & Ranges",
                slug: "vitamin-d3-b12-deficiency-symptoms-testing",
                excerpt: "Discover why urban desk lifestyles lead to widespread Vitamin D3 and B12 deficiency, common symptoms like fatigue and bone pain, and correct screening panels.",
                created_at: "2026-08-22T10:00:00Z",
                author: "Dr. Ajitha Pillai (MD Microbiology)"
              },
              {
                id: "b5",
                title: "NABL Accreditation & ISO 15189 Standards: Why Laboratory Quality Matters",
                slug: "nabl-accreditation-iso-15189-lab-quality-standards",
                excerpt: "An insider's view into NABL ISO 15189:2022 laboratory quality controls, Westgard multi-rules, cold-chain transport, and consultant doctor sign-off.",
                created_at: "2026-08-25T10:00:00Z",
                author: "Dr. Shantakumar Muruda (NABL Lead Assessor)"
              }
            ]).map((blog) => (
              <div 
                key={blog.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                      {new Date(blog.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0d2e42] mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mb-4 line-clamp-3 flex-1 leading-relaxed font-medium">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full">
                      {"author" in blog ? blog.author : "QXL Editorial Team"}
                    </span>
                    <Link 
                      href={`/blog/${blog.slug}`} 
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
