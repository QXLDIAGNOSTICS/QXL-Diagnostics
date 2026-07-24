import GenericPage from "@/components/GenericPage";

export default function TermsAndConditionsPage() {
  return (
    <GenericPage
      title="Terms and Conditions"
      subtitle="Legal terms governing diagnostic testing services, sample collection, and digital report delivery."
      badge="Legal & Compliance"
      contentParagraphs={[
        "By accessing QXL Diagnostics services or requesting sample collection, you agree to comply with our clinical terms and laboratory policies.",
        "Diagnostic reports are provided for informational and clinical guidance. Patients are advised to review test reports with a licensed medical practitioner.",
      ]}
      ctaText="View Privacy Policy"
      ctaLink="/privacy-policy"
    />
  );
}
