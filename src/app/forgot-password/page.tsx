import GenericPage from "@/components/GenericPage";

export default function ForgotPasswordPage() {
  return (
    <GenericPage
      title="Forgot Password"
      subtitle="Reset your password via verified mobile OTP or registered email."
      badge="Account Recovery"
      contentParagraphs={[
        "Enter your registered mobile phone number or email address. We will send a secure verification code to reset your account password.",
      ]}
      ctaText="Back to Login"
      ctaLink="/login"
    />
  );
}
