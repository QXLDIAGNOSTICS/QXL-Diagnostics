import KnLanguageBar from "@/components/kn/KnLanguageBar";

/**
 * Kannada section. Hand-translated text, so Google Translate is told to leave it alone
 * (translate="no" + notranslate). Noto Sans Kannada gives full conjunct support.
 */
export default function KannadaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="kn-IN" translate="no" className="notranslate" style={{ fontFamily: "'Noto Sans Kannada', 'Noto Sans', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700;800&display=swap"
        precedence="default"
      />
      <KnLanguageBar />
      {children}
    </div>
  );
}
