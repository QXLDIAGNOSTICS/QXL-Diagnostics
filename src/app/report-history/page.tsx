import GenericPage from "@/components/GenericPage";

export default function ReportHistoryPage() {
  return (
    <GenericPage
      title="Patient Report History"
      subtitle="Complete longitudinal record of all diagnostic test reports."
      badge="Report History Archive"
      contentParagraphs={[
        "Access past test reports, biomarker trends, and comparative health evaluations across all your visits.",
      ]}
      ctaText="View Dashboard Reports"
      ctaLink="/dashboard/reports"
    />
  );
}
