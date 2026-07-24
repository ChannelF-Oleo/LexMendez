/**
 * Constantes de sesión compartidas. Este módulo NO es server-only a propósito:
 * el middleware (edge runtime) necesita el nombre de la cookie y no puede
 * importar código que dependa de firebase-admin.
 */

/** Nombre de la cookie de sesión del panel admin. */
export const SESSION_COOKIE = "lmg_session";

/** Duración de la sesión: 5 días en milisegundos. */
export const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;
