import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Isotype from "@/components/brand/Isotype";

export default function BlogNotFound() {
  return (
    <section className="relative -mt-20 flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-b from-purpleDeep via-purple to-purpleSoft md:-mt-24">
      <Isotype
        className="pointer-events-none absolute -right-12 top-1/2 h-96 w-96 -translate-y-1/2 opacity-[0.06]"
        title=""
      />
      <Container className="relative py-32 text-center">
        <Isotype className="mx-auto h-16 w-16" title="LexMendez Global" />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold-gradient">
          Artículo no encontrado
        </p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
          Este artículo no existe o fue movido.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/75">
          Puede que el enlace esté desactualizado. Explora el resto de nuestros
          artículos jurídicos.
        </p>
        <div className="mt-8 flex justify-center">
          <Button as="link" href="/blog" variant="gold">
            Volver al blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
