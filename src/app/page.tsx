import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Isotype from "@/components/brand/Isotype";
import AreasGrid from "@/components/areas/AreasGrid";
import CtaBand from "@/components/layout/CtaBand";
import { site } from "@/data/site";

const principios = [
  {
    titulo: "Confianza",
    texto: "Relaciones basadas en la transparencia y la confidencialidad absoluta.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    ),
  },
  {
    titulo: "Visión Global",
    texto: "Perspectiva internacional para acompañarte más allá de las fronteras.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
      </>
    ),
  },
  {
    titulo: "Cercanía",
    texto: "Un trato humano y personalizado en cada etapa de tu proceso legal.",
    icon: (
      <path d="M20 8.5a4 4 0 0 0-7-2.6A4 4 0 0 0 6 8.5c0 3.6 4.6 6.9 7 8.5 2.4-1.6 7-4.9 7-8.5z" />
    ),
  },
  {
    titulo: "Excelencia",
    texto: "Rigor técnico y dedicación para lograr los mejores resultados.",
    icon: (
      <path d="M12 3l2.5 5.3 5.5.8-4 4 1 5.6L12 16l-5 2.7 1-5.6-4-4 5.5-.8L12 3z" />
    ),
  },
];

const sobreFirmaChecks = [
  "Atención personalizada y confidencial",
  "Experiencia en trámites entre RD y el extranjero",
  "Acompañamiento en cada etapa del proceso",
];

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative -mt-20 flex min-h-[600px] items-center overflow-hidden bg-gradient-to-b from-purpleDeep via-purple to-purpleSoft md:-mt-24">
        <Isotype
          className="pointer-events-none absolute -right-16 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 opacity-[0.06] md:right-0"
          title=""
        />
        <Container className="relative w-full pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]">
              <span className="h-px w-8 bg-gradient-to-r from-gold1 to-gold3" />
              <span className="text-gold-gradient">Bufete jurídico · Santo Domingo</span>
            </p>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
              Tu tranquilidad legal, <span className="italic">nuestra</span>{" "}
              <span className="text-gold-gradient">misión.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
              En {site.nombre} combinamos rigor jurídico y una visión internacional
              para ofrecerte soluciones claras, cercanas y estratégicas.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <Button as="link" href="/contacto" variant="gold">
                Agenda una consulta
              </Button>
              <Button as="link" href="/areas" variant="ghost">
                Ver áreas de práctica
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/15 pt-7">
              {[
                { k: "7", v: "Áreas de práctica" },
                { k: "100%", v: "Confidencialidad" },
                { k: "RD", v: "Visión global" },
              ].map((stat) => (
                <div key={stat.v}>
                  <dt className="font-serif text-3xl font-semibold text-gold-gradient sm:text-4xl">
                    {stat.k}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wide text-cream/60">
                    {stat.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* 2. PRINCIPIOS */}
      <Section>
        <Container>
          <SectionHeading
            center
            eyebrow="Por qué elegirnos"
            title="Principios que nos definen"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principios.map((p) => (
              <div key={p.titulo} className="text-center sm:text-left">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-gold1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-purple">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-purpleSoft">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. SOBRE LA FIRMA */}
      <Section alt>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Izq: bloque morado */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple to-purpleDeep p-10 md:p-12">
              <Isotype
                className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 opacity-10"
                title=""
              />
              <Isotype className="h-16 w-16" title="LexMendez Global" />
              <blockquote className="mt-8 font-serif text-2xl font-medium leading-snug text-cream">
                “{site.tagline}”
              </blockquote>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold2/30 bg-cream/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-gold1" />
                <span className="text-sm text-cream/80">{site.ciudad}</span>
              </div>
            </div>

            {/* Der: texto */}
            <div>
              <SectionHeading
                eyebrow="Sobre la firma"
                title="Experiencia local, visión global"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-purpleSoft">
                <p>
                  Somos una firma moderna, cercana y especializada que combina el
                  conocimiento jurídico tradicional con una visión internacional del
                  derecho.
                </p>
                <p>
                  Acompañamos con especial dedicación a quienes tienen necesidades
                  migratorias y trámites entre República Dominicana y otros países,
                  con un compromiso personal en cada caso.
                </p>
              </div>
              <ul className="mt-7 space-y-3">
                {sobreFirmaChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-purple">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button as="link" href="/nosotros" variant="outline">
                  Conócenos más
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. ÁREAS DESTACADAS */}
      <Section>
        <Container>
          <SectionHeading center eyebrow="Lo que hacemos" title="Áreas de práctica" />
          <div className="mt-14">
            <AreasGrid limit={6} />
          </div>
          <div className="mt-12 text-center">
            <Button as="link" href="/areas" variant="outline">
              Ver todas las áreas
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5. CTA BAND */}
      <CtaBand />
    </>
  );
}
