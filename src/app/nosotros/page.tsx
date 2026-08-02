import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Subhero from "@/components/layout/Subhero";
import CtaBand from "@/components/layout/CtaBand";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Nosotros — LexMendez Global",
  description:
    "Firma jurídica moderna y cercana en Azua de Compostela, con visión internacional del derecho.",
};

const valores = [
  {
    titulo: "Integridad",
    texto: "Actuamos con honestidad y ética en cada gestión.",
  },
  {
    titulo: "Confianza",
    texto: "Cuidamos tu información con absoluta confidencialidad.",
  },
  {
    titulo: "Excelencia Profesional",
    texto: "Rigor técnico y actualización constante en cada área.",
  },
  {
    titulo: "Visión Internacional",
    texto: "Entendemos los trámites que cruzan fronteras.",
  },
  {
    titulo: "Cercanía",
    texto: "Un trato humano que te acompaña en todo el proceso.",
  },
  {
    titulo: "Compromiso",
    texto: "Nos involucramos personalmente con cada caso.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Subhero
        eyebrow="Sobre nosotros"
        title={
          <>
            Cerca de ti, con{" "}
            <span className="text-gold-gradient">visión global.</span>
          </>
        }
        description="Conoce a la firma que combina el conocimiento jurídico tradicional con una perspectiva internacional del derecho."
      />

      {/* Historia + foto */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Nuestra historia" title="Quiénes somos" />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-purpleSoft">
                <p>
                  {site.nombre} es una firma moderna, cercana y especializada que
                  combina el conocimiento jurídico tradicional con una visión
                  internacional del derecho. Nacimos para ofrecer soluciones claras
                  y estratégicas a personas y familias.
                </p>
                <p>
                  Nos orientamos especialmente a clientes con necesidades
                  migratorias y trámites entre República Dominicana y otros países.
                  Al frente está{" "}
                  <span className="font-semibold text-purple">{site.fundadora}</span>,
                  {" "}{site.cargo}, con un compromiso personal en cada caso que
                  asumimos.
                </p>
              </div>
            </div>

            {/* Foto editorial de la abogada */}
            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-purple/20 ring-1 ring-purple/10">
                <Image
                  src="/assets/images/mery-mendez.jpeg"
                  alt={`Retrato de ${site.fundadora}, ${site.cargo} de ${site.nombre}`}
                  fill
                  sizes="(max-width: 1024px) 24rem, 24rem"
                  className="object-cover object-top"
                  priority
                />
                {/* Badge nombre + cargo */}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-purple/85 px-5 py-4 backdrop-blur-md">
                  <p className="font-serif text-lg font-semibold text-cream">
                    {site.fundadora}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-gold1">
                    {site.cargo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Valores */}
      <Section alt>
        <Container>
          <SectionHeading
            center
            eyebrow="Lo que nos guía"
            title="Nuestros valores"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((valor, i) => (
              <div
                key={valor.titulo}
                className="rounded-2xl border border-purple/10 bg-cream p-7"
              >
                <span className="font-serif text-sm font-semibold text-gold-gradient">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold text-purple">
                  {valor.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-purpleSoft">
                  {valor.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="¿Trabajamos juntos en tu caso?"
        text="Cuéntanos tu situación y te acompañaremos con cercanía y visión global."
        buttonLabel="Agenda tu cita"
      />
    </>
  );
}
