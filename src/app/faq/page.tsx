import GenericPage from "@/components/GenericPage";

export default function FaqPage() {
  return (
    <GenericPage
      title="Frequently Asked Questions (FAQ)"
      subtitle="Clear answers regarding home collection, fasting instructions, NABL certification, and digital reports."
      badge="Help & Knowledge Base"
      contentParagraphs={[
        "1. Is Home Collection Free?\nYes, QXL Diagnostics provides free home sample collection across Bengaluru for test bookings.",
        "2. When will I receive my report?\nMost routine blood tests (CBC, Thyroid, Blood Sugar, Lipid Profile) deliver same-day digital reports via email and WhatsApp.",
        "3. Is fasting required?\nFasting for 10-12 hours is usually required for Fasting Blood Sugar and Lipid Profile tests. Water is allowed.",
        "4. Is QXL Diagnostics NABL certified?\nYes, QXL Diagnostics holds NABL accreditation conforming to ISO 15189 standards.",
      ]}
      ctaText="Ask AI Assistant"
      ctaLink="/ai"
    />
  );
}
