import GenericPage from "@/components/GenericPage";

export default function ReportUploadPage() {
  return (
    <GenericPage
      title="Upload Medical Reports & Prescriptions"
      subtitle="Upload doctor prescriptions or previous lab reports for AI extraction and instant booking."
      badge="Report Upload Portal"
      contentParagraphs={[
        "Upload your prescription or previous lab reports to automatically extract recommended tests and schedule home sample collection.",
      ]}
      ctaText="Upload Prescription"
      ctaLink="/upload-prescription"
    />
  );
}
