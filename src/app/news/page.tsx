import GenericPage from "@/components/GenericPage";

export default function NewsPage() {
  return (
    <GenericPage
      title="QXL Diagnostics News & Announcements"
      subtitle="Latest updates on diagnostic technology, clinical accreditations, and health initiatives."
      badge="Press & News"
      contentParagraphs={[
        "Stay informed about QXL Diagnostics' technological advancements, laboratory expansions, and new specialized testing panels.",
        "QXL Diagnostics continues to pioneer AI-assisted precision diagnostics and NABL quality Assessor-led clinical testing in Bengaluru.",
      ]}
      ctaText="Read Health Blogs"
      ctaLink="/blog"
    />
  );
}
