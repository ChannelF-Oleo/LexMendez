"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/posts";

/** Botón de borrado con confirmación. */
export default function DeletePostButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`¿Eliminar el artículo “${title}”? Esta acción no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    try {
      const result = await deletePost(id);
      if (result.ok) {
        router.refresh();
      } else {
        window.alert(result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 outline-none transition-colors hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-60"
    >
      {loading ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
