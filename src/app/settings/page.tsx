import GenericPage from "@/components/GenericPage";

export default function GlobalSettingsPage() {
  return (
    <GenericPage
      title="Patient Preferences & Settings"
      subtitle="Manage security, address book, and report delivery preferences."
      badge="Account Settings"
      contentParagraphs={[
        "Configure your preferred home sample collection time slots, default delivery address in Bengaluru, and WhatsApp notification preferences.",
      ]}
      ctaText="Go to Dashboard Settings"
      ctaLink="/dashboard/settings"
    />
  );
}
