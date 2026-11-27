import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronRight } from "lucide-react";
import type { KnBlogPost } from "@/content/kn/blog/posts";
import { KnButton } from "./KnPage";
import { callBtn, waBtn } from "@/content/kn/common";

const md: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-extrabold leading-snug text-slate-900 sm:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-10 text-2xl font-bold leading-snug text-[#12365a]">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 text-lg font-bold leading-snug text-[#12365a]">{children}</h3>,
  p: ({ children }) => <p className="mt-4 leading-[1.9] text-slate-800">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 leading-[1.9] text-slate-800">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 leading-[1.9] text-slate-800">{children}</ol>,
  strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="bg-slate-50 px-3 py-2 font-bold">{children}</th>,
  td: ({ children }) => <td className="border-t border-slate-100 px-3 py-2">{children}</td>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-semibold text-[#075e91] underline-offset-2 hover:underline [overflow-wrap:anywhere]">
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#075e91] underline-offset-2 hover:underline [overflow-wrap:anywhere]">
        {children}
      </a>
    ),
};

/** Keep the booking box above the reference list. */
function splitReferences(markdown: string) {
  const marker = "\n## ವೈದ್ಯಕೀಯ ಉಲ್ಲೇಖಗಳು";
  const i = markdown.indexOf(marker);
  return i === -1 ? { body: markdown, refs: "" } : { body: markdown.slice(0, i), refs: markdown.slice(i) };
}

export default function KnArticle({ post }: { post: KnBlogPost & { markdown: string } }) {
  const { body, refs } = splitReferences(post.markdown);
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="ಬ್ರೆಡ್‌ಕ್ರಂಬ್" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/kn" className="hover:text-[#2563eb]">ಮುಖಪುಟ</Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" aria-hidden />
              <Link href="/kn/blog/laboratory-tests-guide" className="hover:text-[#2563eb]">ಕನ್ನಡ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿ</Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" aria-hidden />
              <span aria-current="page" className="text-slate-700">{post.enName}</span>
            </li>
          </ol>
        </nav>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
          {body}
        </ReactMarkdown>
        <aside className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <p className="font-bold text-slate-900">ಈ ಪರೀಕ್ಷೆಯನ್ನು ಬುಕ್ ಮಾಡಬೇಕೇ?</p>
          <p className="mt-1 text-sm text-slate-700">ದರ, ಲಭ್ಯತೆ ಮತ್ತು ಮನೆ ಮಾದರಿ ಸಂಗ್ರಹಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ತುರ್ತು ಲಕ್ಷಣಗಳಿದ್ದರೆ ಮನೆ ಸಂಗ್ರಹಕ್ಕಾಗಿ ಕಾಯದೆ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <KnButton link={{ label: "ಪರೀಕ್ಷೆ ಬುಕ್ ಮಾಡಿ", href: post.bookHref, variant: "primary" }} />
            <KnButton link={waBtn()} />
            <KnButton link={callBtn()} />
          </div>
        </aside>
        {refs && (
          <div className="mt-6 text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
              {refs}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}
