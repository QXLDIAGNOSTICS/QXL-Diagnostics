import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiHealthAssistantPage() {
  return (
    <AiFeaturePage
      title="Personal AI Health Assistant"
      subtitle="Track your diagnostic trends over time, monitor key blood biomarkers, and receive automated health reminders."
      badge="Comprehensive Health Hub"
      featureKey="health-assistant"
      iconName="stethoscope"
      sampleInputPlaceholder="e.g. View my HbA1c progression over the last 12 months"
      defaultPrompt="Summarize my health biomarker history and upcoming checkup schedule"
      actionText="Open Health Dashboard"
      actionLink="/ai/health-assistant/dashboard"
    />
  );
}
