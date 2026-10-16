import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { defaultBlogs, getDefaultBlogBySlug } from "@/lib/blogsData";
import ShareButton from "@/components/ShareButton";
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
  const imageUrl = (blog as any).image || "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
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

  const displayDate = (blog as any).date
    ? (blog as any).date
    : (blog as any).created_at && !isNaN(new Date((blog as any).created_at).getTime())
    ? new Date((blog as any).created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "October 16, 2026";

  const reviewer = (blog as any).reviewer || "Dr. Shantakumar Muruda, MD (Biochemistry)";

  const related = defaultBlogs.filter((b: any) => b.slug !== blog.slug && b.id !== blog.id).slice(0, 4);

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

  return (
    <div className="min-h-screen bg-[#f8faff] py-12">
      <div className="max-w-[760px] mx-auto px-4 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-[240px] md:max-w-none">{blog.title}</span>
        </nav>

        <Link href="/blog" className="inline-flex items-center gap-2 text-[#2563eb] font-bold text-sm mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <span className="inline-block bg-[#dbeafe] text-[#2563eb] text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            {(blog as any).category || "Pregnancy & Maternal Health"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0d2e42] leading-[1.2] mb-4 tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-6 bg-blue-50/60 p-3 rounded-xl border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Clinical review by <strong className="text-slate-900">{reviewer}</strong> · Updated {displayDate}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-semibold border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              {displayDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563eb]" />
              11 min read
            </div>
            <ShareButton title={blog.title} />
          </div>
        </header>

        {/* Hero Image */}
        {(blog as any).image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <img
              src={(blog as any).image}
              alt="Personalised pregnancy testing and prenatal blood sampling in Bengaluru - QXL Diagnostics"
              width={1200}
              height={675}
              className="w-full h-auto max-h-[440px] object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg prose-blue max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-700 mb-8 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-150">
            {blog.excerpt}
          </p>

          <div className="markdown-content leading-loose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d2e42] mt-10 mb-4 tracking-tight border-b border-slate-100 pb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl md:text-2xl font-bold text-[#0d2e42] mt-8 mb-3" {...props} />
                ),
                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-slate-700" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
                li: ({ node, ...props }) => <li className="text-slate-700 leading-relaxed" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="my-6 border-l-4 border-blue-600 bg-blue-50/70 p-4 rounded-r-xl text-slate-800 font-medium italic" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 border border-gray-200 rounded-xl shadow-xs">
                    <table className="w-full text-left border-collapse text-sm" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th className="bg-slate-100 text-slate-800 p-4 font-bold border-b border-gray-200" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="p-4 border-b border-gray-200 text-slate-600" {...props} />
                ),
                strong: ({ node, ...props }) => <strong className="font-bold text-[#0f2d5e]" {...props} />,
                a: ({ node, ...props }) => (
                  <a className="text-[#2563eb] hover:underline font-semibold" target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props} />
                ),
                hr: ({ node, ...props }) => <hr className="my-10 border-gray-200" {...props} />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-xs">
            <h4 className="text-amber-800 font-bold mb-1 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-extrabold">Medical Disclaimer</span>
            </h4>
            <p className="text-amber-800/90 text-sm font-medium leading-relaxed">
              This article is educational and does not replace consultation, ultrasound assessment, prenatal genetic counselling or obstetric management. Clinical suitability and test availability must be confirmed individually. Never begin or alter any medication or test schedule solely on the basis of online content.
            </p>
          </div>
        </article>

        {/* Related Blogs Section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h3 className="text-2xl font-extrabold text-[#0d2e42] mb-6">Related Clinical Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="block bg-white border border-gray-150 p-4 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <span className="text-xs font-bold text-blue-600 mb-1 block">{rel.category || "Health Guide"}</span>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
