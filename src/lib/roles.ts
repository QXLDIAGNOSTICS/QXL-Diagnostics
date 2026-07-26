/** Frontend mirror of backend ``app.core.roles`` — keep in sync. */

export const ROLE_PATIENT = "patient";
export const ROLE_FRONT_OFFICE = "front_office";
export const ROLE_STAFF = "staff";
export const ROLE_RECEPTION = "reception";
export const ROLE_MARKETING = "marketing";
export const ROLE_SALES = "sales";
export const ROLE_ADMIN = "admin";
export const ROLE_SUPER_ADMIN = "super_admin";

/** Front-desk/departmental roles — same permissions as Front Office, distinct
 * labels only so admins can tag accounts by department. */
export const FRONT_DESK_ROLES = new Set([
  ROLE_FRONT_OFFICE,
  ROLE_STAFF,
  ROLE_RECEPTION,
  ROLE_MARKETING,
  ROLE_SALES,
]);

export const STAFF_ROLES = new Set([...FRONT_DESK_ROLES, ROLE_ADMIN, ROLE_SUPER_ADMIN]);
export const ADMIN_ROLES = new Set([ROLE_ADMIN, ROLE_SUPER_ADMIN]);

export const ROLE_LABELS: Record<string, string> = {
  patient: "Patient",
  front_office: "Front Office",
  staff: "Staff",
  reception: "Reception",
  marketing: "Marketing",
  sales: "Sales",
  admin: "Administrator",
  super_admin: "Super Admin",
};

export type NavAccess = "staff" | "admin" | "super_admin";

export function isStaff(role: string | null | undefined): boolean {
  return !!role && STAFF_ROLES.has(role);
}

export function isAdmin(role: string | null | undefined): boolean {
  return !!role && ADMIN_ROLES.has(role);
}

export function isSuperAdmin(role: string | null | undefined): boolean {
  return role === ROLE_SUPER_ADMIN;
}

export function canManageUsers(role: string | null | undefined): boolean {
  return isAdmin(role);
}

export function canDeleteAppointments(role: string | null | undefined): boolean {
  return isAdmin(role);
}

export function canExportAppointments(role: string | null | undefined): boolean {
  return isAdmin(role);
}

/** Roles the current actor may assign when creating / updating staff. */
export function creatableRolesFor(actorRole: string | null | undefined): string[] {
  if (actorRole === ROLE_SUPER_ADMIN) {
    return [ROLE_FRONT_OFFICE, ROLE_STAFF, ROLE_RECEPTION, ROLE_MARKETING, ROLE_SALES, ROLE_ADMIN, ROLE_PATIENT];
  }
  if (actorRole === ROLE_ADMIN) {
    return [ROLE_FRONT_OFFICE, ROLE_STAFF, ROLE_RECEPTION, ROLE_MARKETING, ROLE_SALES];
  }
  return [];
}

export function canAccessNav(role: string | null | undefined, access: NavAccess): boolean {
  if (access === "staff") return isStaff(role);
  if (access === "admin") return isAdmin(role);
  if (access === "super_admin") return isSuperAdmin(role);
  return false;
}
