import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * SDK Admin de Firebase — SOLO servidor.
 *
 * El import de "server-only" hace que el build falle si este módulo se importa
 * (directa o indirectamente) desde un client component, evitando filtrar las
 * credenciales privadas al navegador.
 */

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
// La clave privada llega con los saltos de línea escapados (\n) dentro de
// comillas en .env; hay que restaurarlos para que cert() la acepte.
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

/**
 * App admin como singleton. Inicialización PEREZOSA: no se inicializa al
 * importar el módulo, sino en el primer uso real. Así el build (que solo
 * importa el módulo) no falla si faltan credenciales; el error de credenciales
 * aparece en tiempo de request y puede capturarse con try/catch.
 */
let cachedApp: App | null = null;
function getAdminApp(): App {
  if (cachedApp) return cachedApp;
  cachedApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
  return cachedApp;
}

/**
 * Envuelve un servicio admin en un Proxy que difiere su creación (y la de la
 * app) hasta el primer acceso a una propiedad. Preserva los nombres de export
 * `adminDb` / `adminAuth` con inicialización perezosa.
 */
function lazyService<T extends object>(factory: () => T): T {
  let instance: T | null = null;
  return new Proxy({} as T, {
    get(_target, prop) {
      instance ??= factory();
      const value = (instance as Record<string | symbol, unknown>)[prop];
      return typeof value === "function"
        ? (value as (...args: unknown[]) => unknown).bind(instance)
        : value;
    },
  });
}

export const adminDb: Firestore = lazyService(() => getFirestore(getAdminApp()));
export const adminAuth: Auth = lazyService(() => getAuth(getAdminApp()));
