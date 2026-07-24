import Link from "next/link";
import PostCover from "./PostCover";
import { formatDate } from "@/lib/format";
import type { Post } from "@/types/post";

/** Tarjeta de post para el grid del blog. Toda la tarjeta enlaza al detalle. */
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-purple/10 bg-cream outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple/10 focus-visible:ring-2 focus-visible:ring-gold2/60"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <PostCover
          coverImageUrl={post.coverImageUrl}
          alt={post.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-purple/10 px-3 py-1 font-semibold uppercase tracking-wide text-purple">
            {post.category}
          </span>
          {post.publishedAt ? (
            <time dateTime={new Date(post.publishedAt).toISOString()} className="text-purpleSoft/70">
              {formatDate(post.publishedAt)}
            </time>
          ) : null}
        </div>

        <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-purple">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-purpleSoft">
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold3 transition-colors group-hover:text-gold2">
          Leer más
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
