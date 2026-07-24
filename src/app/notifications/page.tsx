import GenericPage from "@/components/GenericPage";

export default function NotificationsPage() {
  return (
    <GenericPage
      title="Patient Alerts & Notifications"
      subtitle="View your appointment reminders, report readiness alerts, and health tips."
      badge="Alert Center"
      contentParagraphs={[
        "No unread notifications at this time. All updates are delivered instantly via SMS and WhatsApp.",
      ]}
      ctaText="View Appointments"
      ctaLink="/dashboard/appointments"
    />
  );
}
