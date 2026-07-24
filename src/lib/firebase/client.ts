import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import {
  getAnalytics,
  isSupported,
  type Analytics,
} from "firebase/analytics";

/**
 * Configuración de Firebase (cliente). Los valores se toman de variables
 * NEXT_PUBLIC_* para no incrustar credenciales en el código; ver .env.example.
 * Estas claves son de cliente y no son secretas, pero se mantienen en .env.local
 * (ignorado por git) por higiene.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * App de Firebase como singleton: reutiliza la instancia existente para evitar
 * reinicializaciones (Fast Refresh en desarrollo, múltiples imports, etc.).
 */
export const firebaseApp: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

/** Instancias de los servicios de cliente, reutilizables en client components. */
export const db: Firestore = getFirestore(firebaseApp);
export const auth: Auth = getAuth(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);

/**
 * Inicializa Analytics solo en el navegador y solo si el entorno lo soporta
 * (getAnalytics falla en SSR porque necesita `window`). Devuelve null cuando
 * no aplica (servidor, entorno no soportado o measurementId ausente).
 */
export async function getAnalyticsClient(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!firebaseConfig.measurementId) return null;
  if (!(await isSupported())) return null;
  return getAnalytics(firebaseApp);
}
