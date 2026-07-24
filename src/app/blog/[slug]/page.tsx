import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PostCover from "@/components/blog/PostCover";
import Markdown from "@/components/blog/Markdown";
import { formatDate } from "@/lib/format";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

// ISR: regenerar cada 5 minutos.
export const revalidate = 300;

type Params = { slug: string };

/** Prerender de los slugs publicados en build. */
export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado — LexMendez Global" };

  return {
    title: `${post.title} — LexMendez Global`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.coverImageUrl ? { images: [{ url: post.coverImageUrl }] } : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // El detalle solo muestra publicados; un borrador (o slug inexistente) -> 404.
  if (!post || post.status !== "published") notFound();

  return (
    <article className="pb-8">
      {/* Encabezado */}
      <header className="border-b border-purple/10 bg-cream2/50">
        <Container className="max-w-[760px] py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold3 transition-colors hover:text-gold2"
          >
            ← Volver al blog
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-purple/10 px-3 py-1 font-semibold uppercase tracking-wide text-purple">
              {post.category}
            </span>
            {post.publishedAt ? (
              <time
                dateTime={new Date(post.publishedAt).toISOString()}
                className="text-purpleSoft/70"
              >
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-purple sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-4 text-lg leading-relaxed text-purpleSoft">
              {post.excerpt}
            </p>
          ) : null}
        </Container>
      </header>

      {/* Portada */}
      {post.coverImageUrl ? (
        <Container className="max-w-[760px] pt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <PostCover
              coverImageUrl={post.coverImageUrl}
              alt={post.title}
              sizes="(max-width: 760px) 100vw, 760px"
              priority
            />
          </div>
        </Container>
      ) : null}

      {/* Cuerpo Markdown */}
      <Container className="max-w-[760px] pt-6 pb-14">
        <Markdown content={post.content} />
      </Container>

      {/* Pie */}
      <Container className="max-w-[760px]">
        <div className="flex flex-col items-start gap-6 border-t border-purple/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold3 transition-colors hover:text-gold2"
          >
            ← Volver al blog
          </Link>
          <Button as="link" href="/contacto" variant="gold">
            Agenda una consulta
          </Button>
        </div>
      </Container>
    </article>
  );
}
