import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Subhero from "@/components/layout/Subhero";
import CtaBand from "@/components/layout/CtaBand";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogListing from "@/components/blog/BlogListing";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { getPublishedPosts, getFeaturedPost } from "@/lib/posts";

// ISR: la página se regenera como máximo cada 5 minutos.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog jurídico — LexMendez Global",
  description:
    "Artículos y guías prácticas sobre derecho civil, familia, migración y más, del equipo de LexMendez Global.",
};

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([
    getPublishedPosts(),
    getFeaturedPost(),
  ]);

  // El destacado se muestra en su propio bloque; se excluye del grid para no
  // duplicarlo. El resto (incluidas todas las categorías) va al listado filtrable.
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  return (
    <>
      <Subhero
        eyebrow="Blog jurídico"
        title={
          <>
            Información legal <span className="text-gold-gradient">clara y útil.</span>
          </>
        }
        description="Guías y artículos prácticos para entender tus derechos y tomar mejores decisiones."
      />

      <Section>
        <Container>
          {/* Dos columnas en desktop; en móvil el sidebar cae debajo. */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2">
              {featured ? (
                <div className="mb-14">
                  <FeaturedPost post={featured} />
                </div>
              ) : null}

              <BlogListing posts={rest} />
            </div>

            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
