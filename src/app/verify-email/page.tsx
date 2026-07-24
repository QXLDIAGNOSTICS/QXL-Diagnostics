import GenericPage from "@/components/GenericPage";

export default function VerifyEmailPage() {
  return (
    <GenericPage
      title="Verify Email Address"
      subtitle="Email verification confirmation for QXL Patient Portal."
      badge="Verification Portal"
      contentParagraphs={[
        "Your email address has been verified for secure digital report delivery.",
      ]}
      ctaText="Go to Dashboard"
      ctaLink="/dashboard"
    />
  );
}
