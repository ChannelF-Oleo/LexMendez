"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "@/lib/firebase/client";
import { createPost, updatePost, type PostFormData } from "@/lib/actions/posts";
import { slugify } from "@/lib/slug";
import { POST_CATEGORIES, type Post, type PostStatus } from "@/types/post";

type PostFormProps = {
  /** Post a editar; ausente en creación. */
  post?: Post;
};

const fieldClasses =
  "mt-1.5 w-full rounded-xl border border-purple/15 bg-white px-4 py-2.5 text-sm text-purple " +
  "outline-none transition-colors placeholder:text-purpleSoft/50 focus:border-gold2 focus:ring-2 focus:ring-gold2/30";
const labelClasses = "text-sm font-medium text-purple";

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const editing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [category, setCategory] = useState(post?.category ?? POST_CATEGORIES[0]);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // El slug sigue al título hasta que el usuario lo edita manualmente.
  const effectiveSlug = slugEdited ? slug : slugify(title);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  async function handleUpload(file: File) {
    setError(null);
    setUploading(true);
    try {
      await auth.authStateReady();
      if (!auth.currentUser) {
        setError("Tu sesión de Firebase expiró. Vuelve a iniciar sesión para subir imágenes.");
        return;
      }
      const ext = file.name.includes(".") ? `.${file.name.split(".").pop()}` : "";
      const path = `posts/${crypto.randomUUID()}${ext}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const url = await getDownloadURL(storageRef);
      setCoverImageUrl(url);
    } catch {
      setError("No se pudo subir la imagen. Revisa que tengas permisos (reglas de Storage).");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const data: PostFormData = {
        title,
        slug: effectiveSlug,
        excerpt,
        content,
        category,
        status,
        coverImageUrl,
      };
      const result = editing
        ? await updatePost(post!.id, data)
        : await createPost(data);

      if (result.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Ocurrió un error al guardar. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClasses}>Título</label>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={fieldClasses}
          placeholder="Título del artículo"
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClasses}>Slug (URL)</label>
        <input
          id="slug"
          value={effectiveSlug}
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(e.target.value);
          }}
          className={`${fieldClasses} font-mono`}
          placeholder="mi-articulo"
        />
        <p className="mt-1 text-xs text-purpleSoft/70">
          URL pública: /blog/{effectiveSlug || "…"}
        </p>
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClasses}>Extracto</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={`${fieldClasses} resize-y`}
          placeholder="Resumen corto que aparece en los listados"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClasses}>Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClasses}
          >
            {POST_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className={labelClasses}>Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus)}
            className={fieldClasses}
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      <div>
        <span className={labelClasses}>Portada</span>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-purple/10 bg-cream2">
            {coverImageUrl ? (
              <Image src={coverImageUrl} alt="Portada" fill className="object-cover" sizes="160px" />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-purpleSoft/60">
                Sin portada
              </span>
            )}
          </div>
          <div className="space-y-2">
            <input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
              className="block w-full text-sm text-purpleSoft file:mr-3 file:rounded-full file:border-0 file:bg-purple file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream hover:file:bg-purpleSoft"
            />
            {uploading ? <p className="text-xs text-purpleSoft">Subiendo…</p> : null}
            {coverImageUrl ? (
              <button
                type="button"
                onClick={() => setCoverImageUrl("")}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Quitar portada
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="content" className={labelClasses}>Contenido (Markdown)</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          className={`${fieldClasses} resize-y font-mono text-[0.9rem] leading-relaxed`}
          placeholder={"## Encabezado\n\nEscribe el artículo en Markdown…"}
        />
      </div>

      <div className="flex items-center gap-3 border-t border-purple/10 pt-6">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-gradient-to-r from-gold1 via-gold2 to-gold3 px-7 py-3 text-sm font-semibold text-purple shadow-md outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold2/30 focus-visible:ring-2 focus-visible:ring-gold1/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear artículo"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="rounded-full border border-purple/20 px-6 py-3 text-sm font-semibold text-purple outline-none transition-colors hover:bg-purple/5 focus-visible:ring-2 focus-visible:ring-gold2/60"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
