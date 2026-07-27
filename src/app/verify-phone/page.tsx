import GenericPage from "@/components/GenericPage";

export default function VerifyPhonePage() {
  return (
    <GenericPage
      title="Verify Mobile Phone Number"
      subtitle="Mobile OTP verification for home sample collection updates."
      badge="Mobile Verification"
      contentParagraphs={[
        "Your phone number is verified. You will receive WhatsApp notifications for home collection tracking and report readiness.",
      ]}
      ctaText="Go to Dashboard"
      ctaLink="/dashboard"
    />
  );
}
