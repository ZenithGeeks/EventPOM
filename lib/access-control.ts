export type Role = "ADMIN" | "ORGANIZER" | "STAFF" | "USER"

export const PageAccess: Record<string, Role[]> = {
  "/landing-page": ["ADMIN", "ORGANIZER", "STAFF"],
  "/admin": ["ADMIN"],
  "/organization": ["ADMIN", "ORGANIZER"],
  "/user-wallet": ["ADMIN", "ORGANIZER"],

  "/profile": ["ADMIN", "ORGANIZER", "STAFF", "USER"],
  "/settings": ["ADMIN"],
}