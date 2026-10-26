import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
  ThermometerSnowflake,
} from "lucide-react";
import { getBlogCategory, getReadingTime } from "@/lib/blogsData";

interface BlogSidebarProps {
  currentSlug: string;
  trendingBlogs: any[];
}

export default function BlogSidebar({ currentSlug, trendingBlogs }: BlogSidebarProps) {
  return (
    <aside aria-label="Laboratory services and trending guides" className="space-y-6">
      {/* Widget 1: Book Diagnostic Test at QXL Card */}
      <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-[#003882] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" /> Bengaluru Lab Care
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            NABL MC-6849
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-[#0d2e42] tracking-tight mb-2">
          Need Blood Tests or Home Collection in Bengaluru?
        </h3>

        <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
          Accurate prenatal markers, cardiac panels, diabetic profiles, and comprehensive health packages with zero compromise on precision.
        </p>

        {/* Value Highlights */}
        <div className="space-y-2.5 mb-5 text-xs text-slate-700 font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span>Temperature-Monitored 4°C Cold-Chain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span>100% Doctor-Verified Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span>Same-Day Delivery for Routine Tests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <span>Free Doorstep Collection across Bengaluru</span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="space-y-2">
          <Link
            href="/book"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#003882] hover:bg-[#00285a] text-white font-extrabold text-sm transition-all shadow-md group cursor-pointer"
          >
            <span>Book Home Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/919964639639?text=Hello%20QXL%20Diagnostics%2C%20I%20would%20like%20to%20book%20a%20blood%20test%20in%20Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Book via WhatsApp</span>
          </a>

          <a
            href="tel:+919964639639"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Call Helpline: +91 9964 639 639</span>
          </a>
        </div>
      </div>

      {/* Widget 2: Trending Clinical Articles */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-[#0d2e42] tracking-tight">
            Trending Clinical Guides
          </h3>
          <Link
            href="/blog"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {trendingBlogs.map((b) => {
            const category = getBlogCategory(b);
            const readTime = getReadingTime(b.content);
            const coverImage =
              b.image ||
              "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

            return (
              <Link
                key={b.slug || b.id}
                href={`/blog/${b.slug}`}
                className="group flex gap-3 items-start p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={coverImage}
                    alt={b.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wide block truncate mb-1">
                    {category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {b.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{readTime}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Widget 3: QXL Diagnostic Centers */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#0d2e42] tracking-tight mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Our Bengaluru Laboratory Hubs</span>
        </h3>

        <div className="space-y-3.5 text-xs text-slate-600">
          <div className="border-l-2 border-blue-600 pl-3">
            <strong className="text-slate-900 block font-bold">Kengeri Central Laboratory</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">
              3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              NABL Cert: MC-6849
            </span>
          </div>

          <div className="border-l-2 border-emerald-600 pl-3">
            <strong className="text-slate-900 block font-bold">Yelahanka Patient Collection Center</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Galleria Mall, Yelahanka, Bengaluru 560064
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Patient Walk-in &amp; Collection
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
          <Link href="/locations" className="hover:underline flex items-center gap-1">
            <span>View All Service Zones</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-slate-400">All 198 BBMP Wards</span>
        </div>
      </div>
    </aside>
  );
}
