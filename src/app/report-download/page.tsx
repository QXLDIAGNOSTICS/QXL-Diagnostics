import GenericPage from "@/components/GenericPage";

export default function ReportDownloadPage() {
  return (
    <GenericPage
      title="Download Digital Diagnostic Reports"
      subtitle="Download NABL pathologically verified PDF test reports."
      badge="Report Download Portal"
      contentParagraphs={[
        "Enter your booking reference or sign in to download your official digitally signed PDF lab reports.",
      ]}
      ctaText="View Dashboard Reports"
      ctaLink="/dashboard/reports"
    />
  );
}
