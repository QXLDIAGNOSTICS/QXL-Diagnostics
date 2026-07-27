import GenericPage from "@/components/GenericPage";

export default function CategoriesPage() {
  return (
    <GenericPage
      title="Test Categories & Clinical Specialities"
      subtitle="Browse diagnostic testing panels categorized by organ system, medical speciality, and health condition."
      badge="Speciality Directory"
      contentParagraphs={[
        "QXL Diagnostics offers over 300+ specialized blood, urine, and molecular diagnostic tests categorized across Cardiology, Endocrinology, Neurology, Oncology, Women's Health, Infectious Diseases, Gastroenterology, Haematology, Bone Disorders, and Urology.",
        "Select a speciality category to view individual tests, turnaround times, preparation requirements, and transparent pricing with free home collection in Bengaluru.",
      ]}
      ctaText="Browse Test Catalog"
      ctaLink="/tests"
    />
  );
}
