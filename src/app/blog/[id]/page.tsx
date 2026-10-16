import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  MapPin,
  Building2,
  Stethoscope,
  ArrowRight,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { defaultBlogs, getDefaultBlogBySlug, getBlogCategory, getReadingTime } from "@/lib/blogsData";
import { extractHeadings, slugifyHeading } from "@/lib/blogUtils";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogShareBar from "@/components/blog/BlogShareBar";
import DoctorReviewerCard from "@/components/blog/DoctorReviewerCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import ClientBlogFallback from "@/components/ClientBlogFallback";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return defaultBlogs.map((b: any) => ({ id: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = getDefaultBlogBySlug(id);

  if (!blog) {
    return {
      title: "Blog Article | QXL Diagnostics",
      description: "Read evidence-based clinical articles and laboratory guides from QXL Diagnostics Bengaluru.",
    };
  }

  const title = (blog as any).seo_title || `${blog.title} | QXL Diagnostics`;
  const description = blog.excerpt;
  const canonical = `https://qxldiagnostics.com/blog/${blog.slug}/`;
  const imageUrl =
    (blog as any).image ||
    "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

  const reviewer = (blog as any).reviewer || "Dr. Shantakumar Muruda, MD (Biochemistry)";

  return {
    title: { absolute: title },
    description,
    keywords: [
      "personalised pregnancy testing Bengaluru",
      "pregnancy blood tests Bengaluru",
      "prenatal screening tests Bangalore",
      "double marker test Bangalore",
      "triple marker test Bangalore",
      "quadruple marker test Bangalore",
      "NIPT test Bangalore",
      "gestational diabetes test Bangalore",
      "QXL Diagnostics Bengaluru",
      "NABL accredited lab Bangalore",
      "home blood collection Bangalore",
    ],
    alternates: {
      canonical,
    },
    other: {
      "geo.region": "IN-KA",
      "geo.placename": "Bengaluru",
      "geo.position": "12.9177;77.4835",
      "ICBM": "12.9177, 77.4835",
      "medical-reviewed-by": reviewer,
      "nabl-accreditation": "MC-6849",
      "dc.coverage": "Bengaluru, Karnataka, India",
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: "en_IN",
      type: "article",
      publishedTime: (blog as any).created_at || "2026-10-16T12:00:00Z",
      authors: [blog.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = getDefaultBlogBySlug(id);

  if (!blog) {
    return <ClientBlogFallback slug={id} />;
  }

  const category = getBlogCategory(blog);
  const readTime = getReadingTime(blog.content);

  const displayDate = (blog as any).date
    ? (blog as any).date
    : (blog as any).created_at && !isNaN(new Date((blog as any).created_at).getTime())
    ? new Date((blog as any).created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "October 16, 2026";

  const reviewer = (blog as any).reviewer || "Dr. Shantakumar Muruda, MD (Biochemistry)";

  // Extract headings from markdown content for interactive Table of Contents
  const headings = extractHeadings(blog.content);

  // Trending blogs for sidebar (exclude current)
  const trendingBlogs = defaultBlogs
    .filter((b: any) => b.slug !== blog.slug && b.id !== blog.id)
    .slice(0, 4);

  // Related articles (matching category first)
  const relatedArticles = defaultBlogs
    .filter((b: any) => b.slug !== blog.slug && b.id !== blog.id)
    .sort((a: any, b: any) => {
      const aMatch = getBlogCategory(a) === category ? 1 : 0;
      const bMatch = getBlogCategory(b) === category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 4);

  const jsonLd = (blog as any).custom_schema || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://qxldiagnostics.com/blog/${blog.slug}/`,
    },
    headline: blog.title,
    description: blog.excerpt,
    image: (blog as any).image,
    author: {
      "@type": "Organization",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "QXL Diagnostics",
      url: "https://qxldiagnostics.com/",
    },
    datePublished: (blog as any).created_at || "2026-10-16T12:00:00+05:30",
    dateModified: "2026-10-16T12:00:00+05:30",
  };

  const coverImage =
    (blog as any).image ||
    "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-800">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 font-semibold">{category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <span className="text-slate-800 font-semibold truncate max-w-[280px] hidden sm:inline">
            {blog.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Health Articles</span>
          </Link>
        </div>

        {/* 2-Column Grid Layout: Main Article (8 cols) + Sticky Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Column */}
          <main className="lg:col-span-8 min-w-0">
            {/* Article Header Card */}
            <header className="mb-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-block bg-blue-100/80 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  {category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Clinical Guide
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0d2e42] leading-[1.2] mb-5 tracking-tight">
                {blog.title}
              </h1>

              {/* Medical Reviewer Callout */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 mb-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 p-3.5 rounded-2xl border border-blue-100">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span>
                    Clinically Reviewed by <strong className="text-slate-900">{reviewer}</strong>
                  </span>
                  <span className="block text-[11px] text-slate-500 font-normal">
                    Head of Biochemistry · QXL Diagnostics (NABL Lab MC-6849)
                  </span>
                </div>
              </div>

              {/* Metadata details row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-semibold border-t border-slate-150 pt-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{headings.length} Sections</span>
                </div>
              </div>
            </header>

            {/* Hero Cover Image */}
            {coverImage && (
              <div className="mb-8 rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 bg-white">
                <img
                  src={coverImage}
                  alt={`${blog.title} - QXL Diagnostics Bengaluru`}
                  width={1200}
                  height={675}
                  className="w-full h-auto max-h-[460px] object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* Top Share Bar */}
            <BlogShareBar title={blog.title} slug={blog.slug} author={blog.author} />

            {/* Interactive Table of Contents */}
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Article Content */}
            <article className="prose prose-lg prose-blue max-w-none text-slate-700 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
              {/* Lead Paragraph Excerpt */}
              <div className="text-lg sm:text-xl font-medium text-slate-800 mb-8 leading-relaxed bg-gradient-to-r from-blue-50/60 to-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 not-prose shadow-2xs">
                {blog.excerpt}
              </div>

              {/* AEO & GEO Fast-Answer / Trimester Matrix (Optimized for LLM Snippet Extraction & Patient Clarity) */}
              {blog.slug === "personalised-pregnancy-testing-bengaluru" && (
                <section
                  aria-label="Prenatal Testing Timeline Quick Reference"
                  className="my-8 bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/50 border border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-xs not-prose"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                      <Stethoscope className="w-3.5 h-3.5" /> AEO / GEO Clinical Summary
                    </span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2563eb]" /> Bengaluru Laboratory Hub (NABL
                      MC-6849)
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d2e42] mb-3 tracking-tight">
                    Quick Reference: Prenatal Blood Testing by Trimester in Bengaluru
                  </h2>

                  <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-slate-700 leading-relaxed font-medium shadow-xs">
                    <strong className="text-[#0d2e42] font-bold block mb-1">
                      Direct Clinical Answer:
                    </strong>
                    Personalised pregnancy testing in Bengaluru is a doctor-guided laboratory
                    protocol matching specific biochemical tests (Double Marker, NIPT, Triple/Quad
                    Screen, OGTT) to gestational age, maternal risk history, and ultrasound findings.
                    It does <em>not</em> mean ordering unnecessary test packages or using
                    experimental AI to replace obstetric evaluation.
                  </div>

                  {/* Trimester Matrix Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mb-6">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100/80 text-slate-900 border-b border-slate-200 font-extrabold">
                          <th className="p-3.5">Stage &amp; Window</th>
                          <th className="p-3.5">Key Blood Investigations</th>
                          <th className="p-3.5">Clinical Purpose</th>
                          <th className="p-3.5 text-right">QXL Test Page</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                            First Trimester
                            <br />
                            <span className="text-[11px] font-semibold text-blue-600">
                              11w 0d – 13w 6d
                            </span>
                          </td>
                          <td className="p-3.5">
                            <strong className="text-slate-900">Double Marker Test</strong> (PAPP-A +
                            Free β-hCG) with NT scan
                          </td>
                          <td className="p-3.5 text-xs">
                            Screens for Down syndrome (T21), Edwards (T18), Patau (T13). Low PAPP-A
                            provides early pre-eclampsia risk indicator.
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <Link
                              href="/double-marker-test-bangalore"
                              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              View Test <ArrowRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                            From 10+ Weeks
                            <br />
                            <span className="text-[11px] font-semibold text-slate-500">
                              Anytime 1st/2nd Tri
                            </span>
                          </td>
                          <td className="p-3.5">
                            <strong className="text-slate-900">NIPT / Cell-Free DNA</strong>{" "}
                            (Placental DNA in maternal blood)
                          </td>
                          <td className="p-3.5 text-xs">
                            High sensitivity (&gt;99%) for common trisomies. <em>Screening test</em>
                            ; screen-positive requires CVS/amniocentesis confirmation.
                          </td>
                          <td className="p-3.5 text-right text-xs text-slate-500 font-semibold whitespace-nowrap">
                            Doctor Guided
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                            Second Trimester
                            <br />
                            <span className="text-[11px] font-semibold text-blue-600">
                              15w 0d – 20w 6d
                            </span>
                          </td>
                          <td className="p-3.5">
                            <strong className="text-slate-900">Quadruple Marker</strong> (AFP, hCG,
                            uE3, Inhibin A) or <strong>Triple Marker</strong>
                          </td>
                          <td className="p-3.5 text-xs">
                            Preferred screen if 1st-trimester window was missed. Screens for Down
                            syndrome and Open Neural Tube Defects (Spina Bifida via AFP).
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <div className="flex flex-col items-end gap-1">
                              <Link
                                href="/triple-marker-test-bangalore"
                                className="font-bold text-blue-600 hover:underline text-xs"
                              >
                                Triple Marker
                              </Link>
                              <Link
                                href="/quadruple-marker-test-bangalore"
                                className="font-bold text-blue-600 hover:underline text-xs"
                              >
                                Quad Marker
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                            Mid Pregnancy
                            <br />
                            <span className="text-[11px] font-semibold text-slate-500">
                              24 – 28 Weeks
                            </span>
                          </td>
                          <td className="p-3.5">
                            <strong className="text-slate-900">
                              Gestational Diabetes (OGTT)
                            </strong>{" "}
                            75g Glucose Protocol
                          </td>
                          <td className="p-3.5 text-xs">
                            Screens for maternal glucose intolerance to prevent macrosomia and
                            obstetric complications.
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <Link
                              href="/book"
                              className="font-bold text-emerald-600 hover:underline text-xs"
                            >
                              Book Test
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Local Bengaluru Authority & Access Grounding */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div className="bg-white/70 p-3.5 rounded-xl border border-blue-100 flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-bold mb-0.5">
                          Central Lab &amp; Hub Locations
                        </strong>
                        <span>
                          Central Lab: 3rd Flr SLN Complex, Mysore Rd, Kengeri (560060) · North Hub:
                          Galleria Mall, Yelahanka (560064). NABL Certificate: MC-6849.
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/70 p-3.5 rounded-xl border border-blue-100 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-bold mb-0.5">
                          Doorstep Home Blood Collection
                        </strong>
                        <span>
                          Temperature-controlled cold-chain phlebotomy across all Bengaluru zones. Call
                          +91 9964 639 639.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Render Markdown Content with slugified Heading Anchors for TOC */}
              <div className="markdown-content leading-loose">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, children, ...props }) => {
                      const text = Array.isArray(children)
                        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                        : String(children || "");
                      const id = slugifyHeading(text);
                      return (
                        <h2
                          id={id}
                          className="text-2xl md:text-3xl font-extrabold text-[#0d2e42] mt-12 mb-4 tracking-tight border-b border-slate-150 pb-3 scroll-mt-24 group flex items-center justify-between"
                          {...props}
                        >
                          <span>{children}</span>
                          <a
                            href={`#${id}`}
                            className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 text-base font-normal ml-2 transition-opacity"
                            title="Direct link to this section"
                            aria-label={`Link to ${text}`}
                          >
                            #
                          </a>
                        </h2>
                      );
                    },
                    h3: ({ node, children, ...props }) => {
                      const text = Array.isArray(children)
                        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                        : String(children || "");
                      const id = slugifyHeading(text);
                      return (
                        <h3
                          id={id}
                          className="text-xl md:text-2xl font-bold text-[#0d2e42] mt-8 mb-3 tracking-tight scroll-mt-24 group flex items-center justify-between"
                          {...props}
                        >
                          <span>{children}</span>
                          <a
                            href={`#${id}`}
                            className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 text-sm font-normal ml-2 transition-opacity"
                            title="Direct link to this section"
                            aria-label={`Link to ${text}`}
                          >
                            #
                          </a>
                        </h3>
                      );
                    },
                    p: ({ node, ...props }) => (
                      <p className="mb-6 leading-relaxed text-slate-700" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-6 mb-6 space-y-2 text-slate-700 marker:text-blue-600"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal pl-6 mb-6 space-y-2 text-slate-700 marker:text-blue-600 font-medium"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-slate-700 leading-relaxed" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="my-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50/90 to-sky-50/50 p-5 rounded-r-2xl text-slate-800 font-medium not-italic shadow-2xs"
                        {...props}
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-xs bg-white">
                        <table className="w-full text-left border-collapse text-sm" {...props} />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="bg-slate-100 text-slate-900 p-4 font-bold border-b border-slate-200"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="p-4 border-b border-slate-100 text-slate-700" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#0d2e42]" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                        target={props.href?.startsWith("http") ? "_blank" : undefined}
                        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        {...props}
                      />
                    ),
                    hr: ({ node, ...props }) => (
                      <hr className="my-10 border-slate-200" {...props} />
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* Medical Disclaimer Callout */}
              <div className="mt-12 bg-amber-50/90 border border-amber-200 rounded-2xl p-6 shadow-xs not-prose">
                <h4 className="text-amber-900 font-extrabold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span className="bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded text-[11px] font-extrabold">
                    Medical &amp; Laboratory Disclaimer
                  </span>
                </h4>
                <p className="text-amber-900/90 text-xs sm:text-sm font-medium leading-relaxed">
                  This clinical article is published solely for patient education and informational
                  purposes. It does not replace personal medical advice, clinical diagnosis, prenatal
                  genetic counselling, or obstetric supervision. Appropriate laboratory investigations
                  must be determined by your treating physician based on your personal health
                  history.
                </p>
              </div>

              {/* Doctor Reviewer Bio Box */}
              <DoctorReviewerCard reviewer={reviewer} date={displayDate} />

              {/* Bottom Article Share Bar */}
              <div className="mt-8 pt-6 border-t border-slate-150">
                <BlogShareBar title={blog.title} slug={blog.slug} author={blog.author} />
              </div>
            </article>

            {/* Related Clinical Articles Grid */}
            <section
              aria-label="Related Health Guides"
              className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-150">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d2e42] tracking-tight">
                    Related Clinical Guides
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Explore more evidence-based diagnostic articles and testing guidelines
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline hidden sm:flex items-center gap-1"
                >
                  View All Guides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel: any) => {
                  const relCategory = getBlogCategory(rel);
                  const relReadTime = getReadingTime(rel.content);
                  const relImage =
                    rel.image ||
                    "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

                  return (
                    <Link
                      key={rel.slug || rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group flex flex-col bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-300 p-4 rounded-2xl transition-all shadow-2xs hover:shadow-md"
                    >
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
                        <img
                          src={relImage}
                          alt={rel.title}
                          width={400}
                          height={220}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wide mb-1 block">
                        {relCategory}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {rel.title}
                      </h4>
                      <div className="mt-auto flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-2 border-t border-slate-150">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {relReadTime}
                        </span>
                        <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform font-bold inline-flex items-center gap-0.5">
                          Read Guide <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 self-start">
            <BlogSidebar currentSlug={blog.slug} trendingBlogs={trendingBlogs} />
          </div>
        </div>
      </div>

      {/* JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
