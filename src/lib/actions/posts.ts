"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { slugify } from "@/lib/slug";
import type { PostStatus } from "@/types/post";

const COLLECTION = "posts";

/** Datos que envía el formulario del panel (portada ya subida a Storage). */
export type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: PostStatus;
  coverImageUrl: string;
};

export type ActionResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

/** Revalida las rutas públicas afectadas + la lista del panel. */
function revalidate(slugs: string[]) {
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  for (const s of slugs) {
    if (s) revalidatePath(`/blog/${s}`);
  }
}

/** Normaliza y valida el payload del formulario. */
function normalize(input: PostFormData): { data: PostFormData } | { error: string } {
  const title = input.title?.trim() ?? "";
  const slug = slugify(input.slug || input.title || "");
  const excerpt = input.excerpt?.trim() ?? "";
  const content = input.content?.trim() ?? "";
  const category = input.category?.trim() ?? "";
  const status: PostStatus = input.status === "published" ? "published" : "draft";
  const coverImageUrl = input.coverImageUrl?.trim() ?? "";

  if (!title) return { error: "El título es obligatorio." };
  if (!slug) return { error: "El slug es obligatorio (revisa el título)." };
  if (!excerpt) return { error: "El extracto es obligatorio." };
  if (!content) return { error: "El contenido es obligatorio." };
  if (!category) return { error: "La categoría es obligatoria." };

  return { data: { title, slug, excerpt, content, category, status, coverImageUrl } };
}

/** Verifica que exista sesión admin válida; devuelve true/false. */
async function isAuthorized(): Promise<boolean> {
  const admin = await getCurrentAdmin();
  return admin !== null;
}

/** ¿El slug ya está usado por OTRO documento distinto de `exceptId`? */
async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .get();
  return snap.docs.some((d) => d.id !== exceptId);
}

/** Crea un post nuevo. */
export async function createPost(input: PostFormData): Promise<ActionResult> {
  if (!(await isAuthorized())) return { ok: false, error: "No autorizado." };

  const result = normalize(input);
  if ("error" in result) return { ok: false, error: result.error };
  const data = result.data;

  if (await slugTaken(data.slug)) {
    return { ok: false, error: "Ya existe un artículo con ese slug." };
  }

  const now = Date.now();
  const ref = adminDb.collection(COLLECTION).doc(); // id autogenerado
  await ref.set({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    coverImageUrl: data.coverImageUrl,
    status: data.status,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === "published" ? now : null,
  });

  revalidate([data.slug]);
  return { ok: true, id: ref.id, slug: data.slug };
}

/** Actualiza un post existente. */
export async function updatePost(
  id: string,
  input: PostFormData,
): Promise<ActionResult> {
  if (!(await isAuthorized())) return { ok: false, error: "No autorizado." };

  const result = normalize(input);
  if ("error" in result) return { ok: false, error: result.error };
  const data = result.data;

  const ref = adminDb.collection(COLLECTION).doc(id);
  const existing = await ref.get();
  if (!existing.exists) return { ok: false, error: "El artículo no existe." };

  if (await slugTaken(data.slug, id)) {
    return { ok: false, error: "Ya existe otro artículo con ese slug." };
  }

  const prev = existing.data() ?? {};
  const prevSlug = typeof prev.slug === "string" ? prev.slug : "";
  const prevPublishedAt =
    typeof prev.publishedAt === "number" ? prev.publishedAt : null;
  const now = Date.now();

  // Al publicar por primera vez se fija publishedAt; en otros casos se conserva.
  const publishedAt =
    data.status === "published" ? prevPublishedAt ?? now : prevPublishedAt;

  await ref.update({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    coverImageUrl: data.coverImageUrl,
    status: data.status,
    updatedAt: now,
    publishedAt,
  });

  // Revalida el slug nuevo y el anterior (por si cambió).
  revalidate([data.slug, prevSlug]);
  return { ok: true, id, slug: data.slug };
}

/** Elimina un post. */
export async function deletePost(id: string): Promise<ActionResult> {
  if (!(await isAuthorized())) return { ok: false, error: "No autorizado." };

  const ref = adminDb.collection(COLLECTION).doc(id);
  const existing = await ref.get();
  const slug =
    existing.exists && typeof existing.data()?.slug === "string"
      ? (existing.data()!.slug as string)
      : "";

  await ref.delete();
  revalidate([slug]);
  return { ok: true, id, slug };
}
