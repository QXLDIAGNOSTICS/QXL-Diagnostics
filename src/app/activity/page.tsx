import PortalPage from "@/components/PortalPage";

export default function ActivityPage() {
  return <PortalPage portalName="System Activity Log" portalRole="System Admin" description="System audit log tracking user logins, report uploads, and data changes." activeTabKey="activity" />;
}
