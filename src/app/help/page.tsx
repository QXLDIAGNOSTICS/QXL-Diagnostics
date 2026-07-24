import GenericPage from "@/components/GenericPage";

export default function HelpPage() {
  return (
    <GenericPage
      title="QXL Patient Help Center"
      subtitle="Guides on downloading reports, tracking sample collection, and scheduling appointments."
      badge="Help & Guidance"
      contentParagraphs={[
        "Welcome to the QXL Diagnostics Help Center. Here you can find step-by-step instructions on booking blood tests, uploading doctor prescriptions, and tracking your phlebotomist.",
        "Need instant help? Our AI Assistant is available 24x7 to answer clinical questions or guide your booking.",
      ]}
      ctaText="Open Live Support Chat"
      ctaLink="/contact"
    />
  );
}
