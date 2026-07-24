import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostByIdAdmin } from "@/lib/posts-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editar artículo — Panel LexMendez Global",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/posts"
        className="text-sm font-semibold text-gold3 transition-colors hover:text-gold2"
      >
        ← Volver a artículos
      </Link>
      <h1 className="mt-4 mb-8 font-serif text-3xl font-semibold text-purple">
        Editar artículo
      </h1>
      <PostForm post={post} />
    </div>
  );
}
