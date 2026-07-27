import GenericPage from "@/components/GenericPage";

export default function GalleryPage() {
  return (
    <GenericPage
      title="Laboratory Facility Gallery"
      subtitle="Visual tour of QXL Super Speciality Diagnostic Laboratories and automated equipment."
      badge="Facility Tour"
      contentParagraphs={[
        "Examine our state-of-the-art diagnostic analyzers, automated hematology suites, molecular PCR workstations, and cold-chain sample storage units.",
        "QXL Diagnostics maintains ISO 15189 compliance with strict Lead Assessor-backed quality controls.",
      ]}
      ctaText="Visit Main Lab Center"
      ctaLink="/centers"
    />
  );
}
