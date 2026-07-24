import "server-only";

import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { verifySession } from "./session";
import { SESSION_COOKIE } from "./constants";

/**
 * Lee la cookie de sesión y devuelve el admin decodificado, o null si no hay
 * sesión válida de un uid admin. Reutilizable en Server Components y layouts.
 */
export async function getCurrentAdmin(): Promise<DecodedIdToken | null> {
  const jar = await cookies();
  const cookie = jar.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  return verifySession(cookie);
}
