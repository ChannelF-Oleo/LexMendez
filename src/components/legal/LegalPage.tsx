import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Subhero from "@/components/layout/Subhero";
import Markdown from "@/components/blog/Markdown";

type LegalPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Cuerpo del documento en Markdown. */
  content: string;
};

/**
 * Estructura común de las páginas legales: subhero de marca + contenedor de
 * lectura con la misma tipografía "prose" del blog, más el aviso de que el
 * texto es una base pendiente de validación por la abogada.
 */
export default function LegalPage({
  eyebrow,
  title,
  description,
  content,
}: LegalPageProps) {
  return (
    <>
      <Subhero eyebrow={eyebrow} title={title} description={description} />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="rounded-xl border border-gold2/30 bg-cream2/70 px-4 py-3 text-sm leading-relaxed text-purpleSoft">
              <span className="font-semibold text-purple">Aviso: </span>
              texto base pendiente de revisión y validación legal. Los datos
              entre corchetes deben completarse antes de su publicación
              definitiva.
            </p>
            <div className="mt-4">
              <Markdown content={content} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
