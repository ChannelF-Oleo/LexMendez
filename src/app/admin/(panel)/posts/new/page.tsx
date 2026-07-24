import type { Metadata } from "next";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nuevo artículo — Panel LexMendez Global",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <Link
        href="/admin/posts"
        className="text-sm font-semibold text-gold3 transition-colors hover:text-gold2"
      >
        ← Volver a artículos
      </Link>
      <h1 className="mt-4 mb-8 font-serif text-3xl font-semibold text-purple">
        Nuevo artículo
      </h1>
      <PostForm />
    </div>
  );
}
