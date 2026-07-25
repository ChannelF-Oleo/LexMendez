import "server-only";

import { Resend } from "resend";

/**
 * Cliente de Resend con init perezoso: si falta RESEND_API_KEY, devuelve null
 * en vez de lanzar al construirse. Así el build no falla sin la clave y el
 * error se maneja con gracia en tiempo de request.
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

/** Destinatario del formulario de contacto (buzón del bufete). */
export const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "";
/** Remitente verificado en Resend. */
export const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? "";
