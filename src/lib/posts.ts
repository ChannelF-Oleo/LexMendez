import "server-only";

import type { DocumentData } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { Post, PostStatus } from "@/types/post";

const COLLECTION = "posts";

/** Convierte un valor de Firestore (número o Timestamp) a epoch ms, o fallback. */
function toMillis(value: unknown, fallback: number | null = null): number | null {
  if (typeof value === "number") return value;
  if (
    value &&
    typeof value === "object" &&
    "toMillis" in value &&
    typeof (value as { toMillis: unknown }).toMillis === "function"
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }
  return fallback;
}

/** Mapea un documento de Firestore a la interfaz Post de forma tipada. */
export function docToPost(id: string, data: DocumentData | undefined): Post {
  const d = data ?? {};
  return {
    id,
    title: typeof d.title === "string" ? d.title : "",
    slug: typeof d.slug === "string" ? d.slug : "",
    excerpt: typeof d.excerpt === "string" ? d.excerpt : "",
    content: typeof d.content === "string" ? d.content : "",
    coverImageUrl: typeof d.coverImageUrl === "string" ? d.coverImageUrl : "",
    category: typeof d.category === "string" ? d.category : "General",
    status: (d.status === "published" ? "published" : "draft") as PostStatus,
    createdAt: toMillis(d.createdAt, 0) ?? 0,
    updatedAt: toMillis(d.updatedAt, 0) ?? 0,
    publishedAt: toMillis(d.publishedAt, null),
  };
}

/**
 * Posts publicados, ordenados por publishedAt descendente.
 *
 * Se filtra por un único campo (status) y se ordena en memoria para no exigir
 * un índice compuesto en Firestore en esta fase de fundación.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("status", "==", "published")
    .get();

  if (snap.empty) return [];

  return snap.docs
    .map((doc) => docToPost(doc.id, doc.data()))
    .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0));
}

/** Primer post con el slug dado, o null si no existe. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return docToPost(doc.id, doc.data());
}

/** Post publicado más reciente, o null si no hay publicados. */
export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getPublishedPosts();
  return posts[0] ?? null;
}
