import Link from "next/link";
import PostCover from "./PostCover";
import { formatDate } from "@/lib/format";
import type { Post } from "@/types/post";

/** Bloque destacado para el post más reciente (2 columnas en desktop). */
export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple to-purpleDeep">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Portada */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
          <PostCover
            coverImageUrl={post.coverImageUrl}
            alt={post.title}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-gold1/15 px-3 py-1 font-semibold uppercase tracking-wide text-gold1">
              {post.category}
            </span>
            {post.publishedAt ? (
              <time
                dateTime={new Date(post.publishedAt).toISOString()}
                className="text-cream/60"
              >
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-cream md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/75">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold1 via-gold2 to-gold3 px-6 py-3 text-sm font-semibold text-purple shadow-md outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold2/30 focus-visible:ring-2 focus-visible:ring-gold1/80"
          >
            Leer artículo completo
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
