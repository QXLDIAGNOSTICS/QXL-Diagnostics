import GenericPage from "@/components/GenericPage";

export default function CookiesPage() {
  return (
    <GenericPage
      title="Cookie Policy"
      subtitle="How QXL Diagnostics uses essential browser cookies for session security and site performance."
      badge="Cookie Preferences"
      contentParagraphs={[
        "QXL Diagnostics uses essential first-party cookies to securely maintain patient authentication, cart state, and AI chat sessions.",
        "No personal health information is shared with unauthorized third parties.",
      ]}
      ctaText="Manage Privacy"
      ctaLink="/privacy-policy"
    />
  );
}
