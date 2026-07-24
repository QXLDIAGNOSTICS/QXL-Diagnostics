import GenericPage from "@/components/GenericPage";

export default function ResetPasswordPage() {
  return (
    <GenericPage
      title="Reset Account Password"
      subtitle="Set a new secure password for your QXL Diagnostics account."
      badge="Password Reset"
      contentParagraphs={[
        "Enter your new password below. Ensure it is at least 8 characters long for account security.",
      ]}
      ctaText="Sign In Now"
      ctaLink="/login"
    />
  );
}
