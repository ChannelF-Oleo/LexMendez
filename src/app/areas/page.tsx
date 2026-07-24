import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Subhero from "@/components/layout/Subhero";
import CtaBand from "@/components/layout/CtaBand";
import AreasGrid from "@/components/areas/AreasGrid";

export const metadata: Metadata = {
  title: "Áreas de Práctica — LexMendez Global",
  description:
    "Derecho civil, familia, sucesiones, inmobiliario, migratorio, contratos y traducciones.",
};

export default function AreasPage() {
  return (
    <>
      <Subhero
        eyebrow="Lo que hacemos"
        title={
          <>
            Áreas de <span className="text-gold-gradient">práctica.</span>
          </>
        }
        description="Asesoría integral en las materias que más importan a personas y familias. Explora cada área para ver sus servicios."
      />

      <Section>
        <Container>
          <AreasGrid />
        </Container>
      </Section>

      {/* ¿Otra área? */}
      <section className="bg-cream2">
        <Container className="py-16 md:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple to-purpleDeep p-10 text-center md:p-14">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream/10">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-gold1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3.5" />
                <path d="M12 17h.01" />
              </svg>
            </span>
            <h2 className="mt-6 font-serif text-2xl font-semibold text-cream sm:text-3xl">
              ¿Tu consulta es de otra área?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-cream/75">
              Si tu caso no encaja exactamente en estas áreas, escríbenos igualmente.
              Estudiaremos tu situación y te orientaremos sobre los pasos a seguir.
            </p>
            <div className="mt-8 flex justify-center">
              <Button as="link" href="/contacto" variant="gold">
                Consultar
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
