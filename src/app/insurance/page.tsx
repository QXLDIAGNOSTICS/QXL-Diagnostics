import GenericPage from "@/components/GenericPage";

export default function InsurancePage() {
  return (
    <GenericPage
      title="Health Insurance & Cashless Claims"
      subtitle="Comprehensive diagnostic reimbursement & insurance claim support."
      badge="Insurance & Claims"
      contentParagraphs={[
        "QXL Diagnostics provides NABL accredited, itemized tax invoices and test reports required for OPD health insurance reimbursement claims across all major insurance providers in India.",
      ]}
      ctaText="Download Invoices"
      ctaLink="/dashboard/invoices"
    />
  );
}
