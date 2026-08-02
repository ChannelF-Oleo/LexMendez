"use client";

import { useMemo, useState } from "react";
import CategoryChips, { ALL } from "./CategoryChips";
import PostCard from "./PostCard";
import { POST_CATEGORIES, type Post } from "@/types/post";

/**
 * Listado de posts con filtro por categoría en el cliente (sin refetch): recibe
 * todos los posts publicados y filtra la lista visible según el chip activo.
 */
export default function BlogListing({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>(ALL);

  // Categorías oficiales en su orden canónico. Si algún post arrastra una
  // categoría antigua, se añade al final para que siga siendo alcanzable.
  const categories = useMemo(() => {
    const extra: string[] = [];
    for (const p of posts) {
      if (p.category && !POST_CATEGORIES.includes(p.category) && !extra.includes(p.category)) {
        extra.push(p.category);
      }
    }
    return [...POST_CATEGORIES, ...extra];
  }, [posts]);

  const visible = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-purple/10 bg-cream2/60 px-8 py-20 text-center">
        <h3 className="font-serif text-2xl font-semibold text-purple">
          Pronto publicaremos contenido
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-purpleSoft">
          Estamos preparando artículos con información jurídica útil. Vuelve pronto.
        </p>
      </div>
    );
  }

  return (
    <div>
      <CategoryChips categories={categories} active={active} onChange={setActive} />

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-sm text-purpleSoft">
          No hay artículos en esta categoría todavía.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
