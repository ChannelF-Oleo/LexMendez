import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Isotype from "@/components/brand/Isotype";

type CtaBandProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

/** Franja morada de llamada a la acción, reutilizada al pie de varias páginas. */
export default function CtaBand({
  title = "¿Necesitas asesoría legal?",
  text = "Agenda una consulta y conversemos sobre tu caso con la confidencialidad y el compromiso que mereces.",
  buttonLabel = "Agenda tu cita",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-purple">
      <Isotype
        className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 opacity-[0.07]"
        title=""
      />
      <Container className="relative py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-cream/75">{text}</p>
          </div>
          <Button as="link" href="/contacto" variant="gold" className="shrink-0">
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
