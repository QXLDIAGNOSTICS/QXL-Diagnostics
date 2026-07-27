import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiReportExplainerPage() {
  return (
    <AiFeaturePage
      title="AI Diagnostic Report Explainer"
      subtitle="Upload or paste your laboratory test results for an instant, plain-language clinical summary."
      badge="Report Summary Engine"
      featureKey="explainer"
      iconName="file"
      sampleInputPlaceholder="e.g. Hemoglobin 11.2, Ferritin 12, TSH 4.8"
      defaultPrompt="Analyze my CBC and Thyroid test report parameters"
      actionText="Upload Report PDF"
      actionLink="/upload-prescription"
    />
  );
}
