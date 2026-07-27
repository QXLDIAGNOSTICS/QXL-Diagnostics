import GenericPage from "@/components/GenericPage";

export default function ReportsMainPage() {
  return (
    <GenericPage
      title="QXL Digital Laboratory Reports"
      subtitle="Pathologically verified digital diagnostic test results with AI explanation."
      badge="Digital Reports Portal"
      contentParagraphs={[
        "Access, download, and share your NABL accredited laboratory test reports online.",
      ]}
      ctaText="Access Patient Dashboard"
      ctaLink="/dashboard/reports"
    />
  );
}
