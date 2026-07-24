import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Isotype from "@/components/brand/Isotype";
import Subhero from "@/components/layout/Subhero";
import ContactForm from "@/components/contacto/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto — LexMendez Global",
  description:
    "Escríbenos o agenda una consulta. Santo Domingo, República Dominicana.",
};

const iconos = {
  telefono: (
    <path d="M4 5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-.8-1l-3.4-.7a1 1 0 0 0-1 .3l-1.2 1.2a12 12 0 0 1-5.4-5.4l1.2-1.2a1 1 0 0 0 .3-1L9.5 3.8a1 1 0 0 0-1-.8H6a2 2 0 0 0-2 2z" />
  ),
  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21c4-4 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 3 7 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
};

export default function ContactoPage() {
  const contactos = [
    { icon: iconos.telefono, label: "Teléfono", value: site.telefono, href: "tel:+18494725115" },
    { icon: iconos.correo, label: "Correo", value: site.email, href: `mailto:${site.email}` },
    { icon: iconos.ubicacion, label: "Ubicación", value: site.ciudad, href: undefined },
    { icon: iconos.web, label: "Web", value: site.web, href: `https://${site.web}` },
  ];

  return (
    <>
      <Subhero
        eyebrow="Hablemos"
        title={
          <>
            Estamos aquí para{" "}
            <span className="text-gold-gradient">ayudarte.</span>
          </>
        }
        description="Cuéntanos sobre tu consulta y te responderemos con la prontitud y confidencialidad que mereces."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* a) Panel de información */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple to-purpleDeep p-8 md:p-10">
              <Isotype
                className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 opacity-10"
                title=""
              />
              <h2 className="font-serif text-2xl font-semibold text-cream">
                Información de contacto
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">
                {site.tagline}
              </p>

              <ul className="mt-8 space-y-6">
                {contactos.map((c) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/10">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-gold1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {c.icon}
                        </svg>
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.2em] text-cream/50">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-cream">
                          {c.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="flex items-center gap-4 outline-none transition-opacity hover:opacity-80 focus-visible:opacity-80"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* b) Formulario (solo UI) */}
            <div className="rounded-3xl border border-purple/10 bg-cream p-8 shadow-sm md:p-10">
              <h2 className="font-serif text-2xl font-semibold text-purple">
                Envíanos un mensaje
              </h2>
              <p className="mt-2 text-sm text-purpleSoft">
                Completa el formulario y nos pondremos en contacto contigo.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
