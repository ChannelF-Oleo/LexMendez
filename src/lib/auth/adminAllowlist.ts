import "server-only";

/**
 * Allowlist de administradores por UID. La autorización se basa en que el uid
 * del usuario esté en ADMIN_UIDS (variable de entorno de servidor). Estar
 * autenticado NO es suficiente.
 */

/** UIDs autorizados, parseados de ADMIN_UIDS (separados por coma). */
export function getAdminUids(): string[] {
  return (process.env.ADMIN_UIDS ?? "")
    .split(",")
    .map((uid) => uid.trim())
    .filter(Boolean);
}

/** True si el uid está en la allowlist de administradores. */
export function isAdminUid(uid: string): boolean {
  return getAdminUids().includes(uid);
}
