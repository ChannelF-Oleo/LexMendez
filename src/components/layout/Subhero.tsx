import Container from "@/components/ui/Container";
import Isotype from "@/components/brand/Isotype";

type SubheroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * Cabecera morada de las páginas interiores. Usa margen negativo + padding
 * superior para extenderse detrás del header fijo (glass) sin dejar franja.
 */
export default function Subhero({ eyebrow, title, description }: SubheroProps) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-gradient-to-b from-purpleDeep via-purple to-purpleSoft md:-mt-24">
      <Isotype
        className="pointer-events-none absolute -right-12 top-1/2 h-96 w-96 -translate-y-1/2 opacity-[0.06]"
        title=""
      />
      <Container className="relative pb-16 pt-32 md:pb-20 md:pt-44">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]">
          <span className="h-px w-8 bg-gradient-to-r from-gold1 to-gold3" />
          <span className="text-gold-gradient">{eyebrow}</span>
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
