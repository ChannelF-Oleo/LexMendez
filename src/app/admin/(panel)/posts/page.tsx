import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsAdmin } from "@/lib/posts-admin";
import { formatDate } from "@/lib/format";
import DeletePostButton from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artículos — Panel LexMendez Global",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-purple">Artículos</h1>
          <p className="mt-1 text-sm text-purpleSoft">
            {posts.length} {posts.length === 1 ? "artículo" : "artículos"} en total.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold1 via-gold2 to-gold3 px-6 py-3 text-sm font-semibold text-purple shadow-md outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold2/30 focus-visible:ring-2 focus-visible:ring-gold1/80"
        >
          + Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-purple/10 bg-cream p-12 text-center">
          <p className="text-purpleSoft">Aún no hay artículos. Crea el primero.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-purple/10 bg-cream">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-purple/10 bg-cream2/60 text-xs uppercase tracking-wide text-purpleSoft">
              <tr>
                <th className="px-5 py-3 font-semibold">Título</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Categoría</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Actualizado</th>
                <th className="px-5 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-cream2/40">
                  <td className="px-5 py-4">
                    <span className="font-medium text-purple">{post.title}</span>
                    <span className="block font-mono text-xs text-purpleSoft/60">
                      /{post.slug}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-purpleSoft sm:table-cell">
                    {post.category}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {post.status === "published" ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-purpleSoft/70 md:table-cell">
                    {formatDate(post.updatedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === "published" ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="rounded-full border border-purple/20 px-3 py-1.5 text-xs font-semibold text-purple transition-colors hover:bg-purple/5"
                        >
                          Ver
                        </Link>
                      ) : null}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded-full border border-purple/20 px-3 py-1.5 text-xs font-semibold text-purple transition-colors hover:bg-purple/5"
                      >
                        Editar
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
