import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiVoiceAssistantPage() {
  return (
    <AiFeaturePage
      title="AI Health Voice Assistant"
      subtitle="Speak directly to the QXL AI Assistant in English, Kannada, or Hindi for hands-free diagnostic queries."
      badge="Voice Medical Intelligence"
      featureKey="voice"
      iconName="mic"
      sampleInputPlaceholder="Tap microphone or type your voice transcript here..."
      defaultPrompt="Book a home collection blood test for tomorrow morning"
      actionText="Book Home Collection"
      actionLink="/book"
    />
  );
}
