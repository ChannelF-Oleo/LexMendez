import Link from "next/link";
import Logo from "@/components/brand/Logo";
import Container from "@/components/ui/Container";
import { navLinks, practiceAreas } from "@/data/nav";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77c-.55.56-1.11.9-1.77 1.16-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77.55-.56 1.11-.9 1.77-1.16.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 8.48a3.34 3.34 0 1 0 0-6.68 3.34 3.34 0 0 0 0 6.68Zm5.34-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-purpleDeep text-cream/80">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* a) Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" href="/" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Bufete de abogados en Santo Domingo, República Dominicana,
              comprometido con soluciones legales de excelencia.
            </p>
            <p className="mt-4 font-serif text-base italic text-gold1">
              Soluciones legales. Visión global.
            </p>
          </div>

          {/* b) Navegación */}
          <div>
            <h2 className="mb-4 font-serif text-lg text-cream">Navegación</h2>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 transition-colors hover:text-gold1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* c) Práctica */}
          <div>
            <h2 className="mb-4 font-serif text-lg text-cream">Práctica</h2>
            <ul className="space-y-2.5 text-sm">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <Link
                    href="/areas"
                    className="text-cream/70 transition-colors hover:text-gold1"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* d) Contacto */}
          <div>
            <h2 className="mb-4 font-serif text-lg text-cream">Contacto</h2>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li>
                <a href="tel:+18494725115" className="transition-colors hover:text-gold1">
                  +1 (849) 472-5115
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lexmendezglobal.com"
                  className="transition-colors hover:text-gold1"
                >
                  info@lexmendezglobal.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.lexmendezglobal.com"
                  className="transition-colors hover:text-gold1"
                >
                  www.lexmendezglobal.com
                </a>
              </li>
              <li>Santo Domingo, Rep. Dom.</li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/60">
            © 2026 LexMendez Global. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-cream/60 outline-none transition-colors hover:text-gold1 focus-visible:ring-2 focus-visible:ring-gold1/70"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
