import GenericPage from "@/components/GenericPage";

export default function HealthCheckupsPage() {
  return (
    <GenericPage
      title="Preventative Health Checkup Packages"
      subtitle="NABL certified full body health packages tailored for individuals, families, senior citizens, and corporates."
      badge="Full Body Health Screening"
      contentParagraphs={[
        "Preventative health screening is the cornerstone of early disease detection and longevity. QXL Diagnostics offers comprehensive health checkup packages covering up to 86+ essential parameters.",
        "Packages include Full Body Screening, Q-Master Health Pro, Senior Citizen Health Panel, Women's Health Screen, Cardiac Risk Profile, and Diabetes Assessment with free home sample collection across Bengaluru.",
      ]}
      ctaText="Explore Health Packages"
      ctaLink="/packages"
    />
  );
}
