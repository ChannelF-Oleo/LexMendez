/**
 * Seed de posts de ejemplo en Firestore (colección "posts").
 *
 * Standalone: NO importa src/lib/firebase/admin.ts (ese módulo usa "server-only"
 * y solo funciona dentro del bundler de Next). Aquí inicializamos nuestra propia
 * instancia del Admin SDK leyendo las credenciales de .env.local.
 *
 * Ejecutar:  npm run seed
 * Requiere en .env.local: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL,
 * FIREBASE_ADMIN_PRIVATE_KEY (con \n escapados).
 *
 * Idempotente: usa el slug como id de documento; si ya existe, actualiza sin
 * duplicar y preserva createdAt.
 */
import { loadEnvConfig } from "@next/env";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { POST_CATEGORIES } from "../src/types/post";

// Carga .env.local / .env (Next no está corriendo en un script standalone).
loadEnvConfig(process.cwd());

type SeedPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl: string;
  publishedAt: number;
};

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

// Fechas distintas para probar el orden (el más reciente queda destacado).
const seedPosts: SeedPost[] = [
  {
    title: "Guía práctica del divorcio en República Dominicana",
    slug: "guia-practica-divorcio-rd",
    category: "Familia",
    excerpt:
      "Tipos de divorcio, documentos necesarios y qué esperar del proceso en RD, explicado en lenguaje claro.",
    coverImageUrl: "", // sin portada: se prueba el fallback con isotipo.
    publishedAt: now - 20 * DAY,
    content: `## ¿Qué tipos de divorcio existen?

En República Dominicana el divorcio puede tramitarse por varias vías. Las más comunes son:

- **Divorcio por mutuo consentimiento**: ambos cónyuges están de acuerdo.
- **Divorcio por causa determinada**: cuando existe una causa legal (p. ej. incompatibilidad de caracteres).

### Documentos habituales

1. Acta de matrimonio.
2. Documentos de identidad de ambos cónyuges.
3. Acuerdo sobre bienes y, si aplica, sobre los hijos.

> El acompañamiento legal temprano evita errores que retrasan el proceso.

Si quieres orientación sobre tu caso, puedes [escribirnos](/contacto) y te explicamos los pasos.`,
  },
  {
    title: "Cómo constituir una empresa en RD: primeros pasos",
    slug: "como-constituir-empresa-rd",
    category: "Contratos",
    excerpt:
      "Del nombre comercial al registro mercantil: una hoja de ruta para formalizar tu negocio en República Dominicana.",
    coverImageUrl: "",
    publishedAt: now - 10 * DAY,
    content: `## Antes de empezar

Constituir una empresa implica decisiones que conviene tomar bien desde el inicio, como el **tipo societario** y la estructura de socios.

### Pasos generales

1. Registro del **nombre comercial** ante la ONAPI.
2. Redacción de los **estatutos** y documentos constitutivos.
3. Registro Mercantil en la Cámara de Comercio.
4. Inscripción en la **DGII** (RNC).

Cada paso tiene requisitos propios y plazos que conviene coordinar. Puedes ver más en nuestras [áreas de práctica](/areas).

> Una buena estructura legal desde el día uno protege a los socios y facilita el crecimiento.`,
  },
  {
    title: "Residencia en España: rutas y requisitos",
    slug: "residencia-espana-rutas-requisitos",
    category: "Migración",
    excerpt:
      "Reagrupación familiar, arraigo, estudios o trabajo: un panorama de las principales vías de residencia y sus requisitos.",
    coverImageUrl: "",
    publishedAt: now - 2 * DAY,
    content: `## Principales vías de residencia

Existen varias rutas según tu situación personal y profesional:

- **Reagrupación familiar**: para familiares de residentes.
- **Arraigo** (social, laboral o familiar).
- **Estudios**: con posterior posibilidad de modificación.
- **Trabajo por cuenta ajena o propia**.

### Requisitos frecuentes

1. Documentación personal **apostillada** y, si aplica, **traducida**.
2. Antecedentes penales.
3. Medios económicos o contrato de trabajo, según la vía.

> Elegir la vía correcta desde el inicio ahorra tiempo y evita denegaciones.

¿Tienes trámites entre **RD y España**? [Conversemos sobre tu caso](/contacto).`,
  },
];

async function main() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      "\n[seed] Faltan credenciales admin en .env.local " +
        "(FIREBASE_ADMIN_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY). Abortando.\n",
    );
    process.exit(1);
  }

  // Aviso suave si alguna categoría no está en POST_CATEGORIES (no bloquea).
  for (const p of seedPosts) {
    if (!POST_CATEGORIES.includes(p.category)) {
      console.warn(`[seed] Aviso: categoría "${p.category}" no está en POST_CATEGORIES.`);
    }
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore(app);

  for (const p of seedPosts) {
    // id de documento = slug -> idempotencia sin duplicar.
    const ref = db.collection("posts").doc(p.slug);
    const existing = await ref.get();
    const createdAt = existing.exists
      ? (existing.data()?.createdAt as number | undefined) ?? now
      : now;

    await ref.set(
      {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImageUrl: p.coverImageUrl,
        category: p.category,
        status: "published",
        createdAt,
        updatedAt: now,
        publishedAt: p.publishedAt,
      },
      { merge: true },
    );

    console.log(`[seed] ${existing.exists ? "actualizado" : "creado"}: ${p.slug}`);
  }

  console.log(`\n[seed] Listo. ${seedPosts.length} posts procesados.\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("[seed] Error:", err);
  process.exit(1);
});

// Para usar una portada real: sube la imagen a Storage en `posts/<archivo>` y
// pon su getDownloadURL() en `coverImageUrl` (el dominio ya está permitido en
// next.config.ts).
