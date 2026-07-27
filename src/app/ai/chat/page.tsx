import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiChatPage() {
  return (
    <AiFeaturePage
      title="AI Clinical Chat"
      subtitle="Ask questions regarding blood tests, fasting guidelines, normal report ranges, and home sample collection."
      badge="24/7 AI Triage"
      featureKey="chat"
      iconName="mic"
      sampleInputPlaceholder="e.g. Do I need to fast before a Thyroid Profile test?"
      defaultPrompt="What tests should I take for chronic fatigue and vitamin deficiency?"
      actionText="Book Recommended Panel"
      actionLink="/book"
    />
  );
}
