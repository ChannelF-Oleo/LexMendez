import "server-only";

import { adminDb } from "@/lib/firebase/admin";
import { docToPost } from "@/lib/posts";
import type { Post } from "@/types/post";

const COLLECTION = "posts";

/**
 * Todos los posts (borradores + publicados) para el panel admin, ordenados por
 * updatedAt descendente (en memoria, para no exigir índice compuesto).
 */
export async function getAllPostsAdmin(): Promise<Post[]> {
  const snap = await adminDb.collection(COLLECTION).get();
  if (snap.empty) return [];
  return snap.docs
    .map((doc) => docToPost(doc.id, doc.data()))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Un post por id de documento (incluye borradores). Null si no existe. */
export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  const doc = await adminDb.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return docToPost(doc.id, doc.data());
}
