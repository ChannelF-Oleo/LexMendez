import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth } from "@/lib/firebase/admin";
import { isAdminUid } from "./adminAllowlist";
import { SESSION_DURATION_MS } from "./constants";

/** Error de autorización: token válido pero uid no autorizado como admin. */
export class NotAdminError extends Error {
  constructor() {
    super("NOT_ADMIN");
    this.name = "NotAdminError";
  }
}

/**
 * Verifica un ID token, exige que el uid sea admin y crea una session cookie.
 * @throws NotAdminError si el uid no está en la allowlist.
 * @throws otros errores si el ID token es inválido.
 */
export async function createSessionCookie(idToken: string): Promise<string> {
  const decoded = await adminAuth.verifyIdToken(idToken);
  if (!isAdminUid(decoded.uid)) {
    throw new NotAdminError();
  }
  return adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });
}

/**
 * Verifica una session cookie y revalida que el uid siga siendo admin.
 * Devuelve el token decodificado o null si es inválida / no-admin.
 * El segundo argumento `true` fuerza el chequeo de revocación.
 */
export async function verifySession(
  cookieValue: string,
): Promise<DecodedIdToken | null> {
  try {
    const decoded = await adminAuth.verifySessionCookie(cookieValue, true);
    if (!isAdminUid(decoded.uid)) return null;
    return decoded;
  } catch {
    return null;
  }
}
