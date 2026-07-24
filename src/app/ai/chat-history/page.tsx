import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiChatHistoryPage() {
  return (
    <AiFeaturePage
      title="AI Chat History & Conversations"
      subtitle="Access securely stored chat logs and medical triage conversations across sessions."
      badge="Secure Conversation Store"
      featureKey="chat-history"
      iconName="history"
      sampleInputPlaceholder="Search conversation transcripts by keyword..."
      defaultPrompt="Retrieve transcript of my conversation about fasting blood sugar"
      actionText="Start New AI Chat"
      actionLink="/ai/chat"
    />
  );
}
