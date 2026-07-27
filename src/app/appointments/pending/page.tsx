import AppointmentsSubPage from "@/components/AppointmentsSubPage";

export default function AppointmentsPendingPage() {
  return <AppointmentsSubPage title="Pending Appointments" subtitle="Appointments awaiting phlebotomist assignment or sample arrival" statusFilterTarget="pending" />;
}
