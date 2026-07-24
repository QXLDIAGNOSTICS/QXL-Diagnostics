import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiSettingsPage() {
  return (
    <AiFeaturePage
      title="AI Preferences & Clinical Settings"
      subtitle="Customize AI response language, preferred measurement units (mg/dL or mmol/L), and notification alerts."
      badge="AI Preferences"
      featureKey="settings"
      iconName="settings"
      sampleInputPlaceholder="Configure AI language, notifications, or privacy controls"
      defaultPrompt="Set default AI language to English and unit system to mg/dL"
      actionText="Return to AI Suite"
      actionLink="/ai"
    />
  );
}
