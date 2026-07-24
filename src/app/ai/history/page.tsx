import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiHistoryPage() {
  return (
    <AiFeaturePage
      title="AI Evaluation History"
      subtitle="Review past AI prescription scans, report explanations, and health risk assessments."
      badge="Encrypted History"
      featureKey="history"
      iconName="history"
      sampleInputPlaceholder="Filter past AI evaluations by date or category..."
      defaultPrompt="Display all past AI prescription extractions and test recommendations"
      actionText="Upload New Prescription"
      actionLink="/upload-prescription"
    />
  );
}
