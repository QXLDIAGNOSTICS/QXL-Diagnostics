import GenericPage from "@/components/GenericPage";

export default function ResultsPage() {
  return (
    <GenericPage
      title="Test Results & Diagnostic Reports"
      subtitle="Access your pathologically verified digital laboratory test results online."
      badge="Verified Results"
      contentParagraphs={[
        "Enter your booking reference ID or registered phone number to access and download your secure PDF diagnostic reports.",
      ]}
      ctaText="View Dashboard Reports"
      ctaLink="/dashboard/reports"
    />
  );
}
