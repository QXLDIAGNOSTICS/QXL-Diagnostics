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

/** Anything with a `role` field (the full `AuthUser`), optionally carrying
 * the server-computed, DB-aware tier booleans. Accepting either a plain role
 * string or this shape keeps old call sites working while new ones get
 * correct behaviour for super-admin-created custom roles. */
export interface RoleAware {
  role?: string | null;
  is_staff?: boolean;
  is_admin?: boolean;
  is_super_admin?: boolean;
}

type RoleInput = RoleAware | string | null | undefined;

/** Custom roles (created on the Roles page) aren't in the static sets above,
 * so prefer the server-computed booleans on the `AuthUser` object whenever
 * they're available — only fall back to the static role-string sets when a
 * bare role string is passed in (e.g. code that hasn't been updated yet). */
export function isStaff(input: RoleInput): boolean {
  if (input == null) return false;
  if (typeof input === "string") return STAFF_ROLES.has(input);
  if (typeof input.is_staff === "boolean") return input.is_staff;
  return !!input.role && STAFF_ROLES.has(input.role);
}

export function isAdmin(input: RoleInput): boolean {
  if (input == null) return false;
  if (typeof input === "string") return ADMIN_ROLES.has(input);
  if (typeof input.is_admin === "boolean") return input.is_admin;
  return !!input.role && ADMIN_ROLES.has(input.role);
}

export function isSuperAdmin(input: RoleInput): boolean {
  if (input == null) return false;
  if (typeof input === "string") return input === ROLE_SUPER_ADMIN;
  if (typeof input.is_super_admin === "boolean") return input.is_super_admin;
  return input.role === ROLE_SUPER_ADMIN;
}

export function canManageUsers(input: RoleInput): boolean {
  return isAdmin(input);
}

export function canDeleteAppointments(input: RoleInput): boolean {
  return isAdmin(input);
}

export function canExportAppointments(input: RoleInput): boolean {
  return isAdmin(input);
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

export function canAccessNav(input: RoleInput, access: NavAccess): boolean {
  if (access === "staff") return isStaff(input);
  if (access === "admin") return isAdmin(input);
  if (access === "super_admin") return isSuperAdmin(input);
  return false;
}
