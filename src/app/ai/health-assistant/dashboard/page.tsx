import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiHealthAssistantDashboardPage() {
  return (
    <AiFeaturePage
      title="AI Health Assistant Dashboard"
      subtitle="Comprehensive view of your biomarker metrics, risk scores, report history, and diagnostic recommendations."
      badge="Health Executive Dashboard"
      featureKey="dashboard"
      iconName="heart"
      sampleInputPlaceholder="Query your health trend graphs or set new health targets"
      defaultPrompt="Display my complete health score, blood sugar trend, and cholesterol risk ratio"
      actionText="Book Next Checkup"
      actionLink="/book"
    />
  );
}
