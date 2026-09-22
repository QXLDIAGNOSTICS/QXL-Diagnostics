"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { api, type BlogPost } from "../lib/api";

export default function BlogSlider({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const Heading = decorativeHeading ? 'p' : 'h2';

  const fallbackBlogs: BlogPost[] = [
    {
      id: 'b-new-1',
      title: 'Hospital Laboratory Management (HLM): Transforming Diagnostic Models in India',
      slug: 'hospital-laboratory-management-transforming-models',
      excerpt: 'Explore how hybrid onsite-reference laboratory management helps hospitals optimize operating costs while delivering rapid 24x7 emergency diagnostic testing.',
      created_at: '2026-09-22T08:00:00.000Z'
    },
    {
      id: 'b-new-2',
      title: 'Understanding 19 Key Health Symptoms: When to Get Blood Biomarker Screening',
      slug: 'understanding-19-key-health-symptoms-blood-screening',
      excerpt: 'From chronic fatigue and dizziness to unexplained weight loss and joint pain, learn how targeted blood testing guides clinical diagnosis.',
      created_at: '2026-09-21T10:00:00.000Z'
    },
    {
      id: 'b-new-3',
      title: 'NABL ISO 15189:2022 Accreditation: What It Means for Sample Precision',
      slug: 'nabl-iso-15189-2022-accreditation-sample-precision',
      excerpt: 'Learn about internal quality controls (IQC), EQAS proficiency testing, and medical laboratory standards that ensure accurate test reporting.',
      created_at: '2026-09-20T09:30:00.000Z'
    },
    {
      id: 'b-new-4',
      title: 'Master Health Checkup Packages: Selecting the Right Full Body Profile',
      slug: 'selecting-right-full-body-health-package',
      excerpt: 'Comparing Quick Fit, Q-Screen Diabetes, and Q-Master Pro checkups to find the optimal screening for your age and risk profile.',
      created_at: '2026-09-19T11:00:00.000Z'
    },
    {
      id: 'b-new-5',
      title: 'Free Doorstep Sample Collection Across Bengaluru: Safety & Sample Integrity',
      slug: 'free-doorstep-home-sample-collection-bengaluru',
      excerpt: 'How certified phlebotomists maintain cold chain storage and tube integrity from your home to our central reference laboratory.',
      created_at: '2026-09-18T08:30:00.000Z'
    },
    {
      id: 'b1',
      title: 'The Future is Now: AI-Assisted Diagnostics at QXL',
      slug: 'ai-assisted-diagnostics',
      excerpt: 'Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.',
      created_at: '2026-09-17T00:00:00.000Z'
    },
    {
      id: 'b2',
      title: 'Understanding AMH: Your Guide to Fertility Testing',
      slug: 'understanding-amh-fertility-testing',
      excerpt: 'Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.',
      created_at: '2026-09-16T00:00:00.000Z'
    },
    {
      id: 'b3',
      title: 'Allergy Testing: Identifying Your Hidden Triggers',
      slug: 'allergy-testing-hidden-triggers',
      excerpt: 'Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.',
      created_at: '2026-09-15T00:00:00.000Z'
    },
    {
      id: 'b4',
      title: 'Beyond Cholesterol: Advanced Cardiac Risk Assessment',
      slug: 'beyond-cholesterol-cardiac-risk',
      excerpt: 'A standard lipid profile isn\'t always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.',
      created_at: '2026-09-14T00:00:00.000Z'
    },
    {
      id: 'b5',
      title: 'Role of Vitamin D in Immunity and Bone Health',
      slug: 'role-of-vitamin-d-immunity-bone-health',
      excerpt: 'Understand why Vitamin D is more than just a vitamin. Learn about its massive role in regulating your immune system and preventing bone loss.',
      created_at: '2026-09-12T00:00:00.000Z'
    }
  ].map(b => ({
    content: null,
    author: null,
    category: null,
    image_url: null,
    tags: null,
    is_published: true,
    sort_order: 0,
    ...b
  }));

  useEffect(() => {
    let cancelled = false;
    api.blog
      .list(8, 0)
      .then(({ items }) => {
        if (!cancelled && items && items.length > 0) {
          setBlogs(items);
        } else if (!cancelled) {
          setBlogs(fallbackBlogs);
        }
      })
      .catch((err) => {
        console.error("Failed to load blog posts, using fallback", err);
        if (!cancelled) setBlogs(fallbackBlogs);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-10 bg-white border-t border-blue-100">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        {/* Heading */}
        <div className="flex justify-between items-end mb-7">
          <div>
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
              Health Insights
            </span>
            <Heading className="text-[#0f2d5e] text-2xl font-extrabold mt-0.5">Latest From Our Blog</Heading>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Read up on health tips, medical news, and wellness advice from experts.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex border border-[#D69A18] text-[#D69A18] hover:bg-[#FFF8EB] font-extrabold px-6 py-2 rounded-xl text-xs transition-colors"
          >
            View all blog articles
          </Link>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-lg transition-all group snap-start flex flex-col"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D69A18]" />{" "}
                    {new Date(blog.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0d2e42] mb-2 line-clamp-2 leading-snug group-hover:text-[#D69A18] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#D69A18] hover:bg-amber-600 transition-colors px-4 py-2.5 rounded-xl w-full shadow-xs"
                  >
                    Read: {blog.title.length > 42 ? `${blog.title.slice(0, 42)}…` : blog.title}
                    <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-2 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-block border-2 border-[#D69A18] text-[#D69A18] bg-white hover:bg-[#FFF8EB] font-extrabold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
          >
            View all blog articles
          </Link>
        </div>

      </div>
    </section>
  );
}
