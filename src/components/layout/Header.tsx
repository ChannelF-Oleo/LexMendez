"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { navLinks } from "@/data/nav";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fondo morado + blur al hacer scroll más allá de 40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear el scroll del body mientras el drawer está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-purple/85 shadow-lg shadow-purpleDeep/30 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Logo variant="light" href="/" />

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative font-sans text-sm font-medium tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold1/70 ${
                  active ? "text-gold1" : "text-cream/85 hover:text-cream"
                } after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gradient-to-r after:from-gold1 after:to-gold3 after:transition-all after:duration-300 ${
                  active ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button as="link" href="/contacto" variant="outline" className="px-6 py-2.5">
            Agenda tu cita
          </Button>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md text-cream outline-none focus-visible:ring-2 focus-visible:ring-gold1/70 md:hidden"
        >
          <span className="sr-only">Menú</span>
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </Container>

      {/* Overlay + drawer lateral (móvil) */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-purpleDeep/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-40 flex h-full w-72 max-w-[80vw] flex-col gap-2 bg-purple px-6 pb-8 pt-24 shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Móvil">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-3 font-sans text-base font-medium tracking-wide transition-colors ${
                  active
                    ? "bg-purpleSoft text-gold1"
                    : "text-cream/85 hover:bg-purpleSoft/60 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Button
          as="link"
          href="/contacto"
          variant="gold"
          className="mt-4 w-full"
          onClick={() => setMenuOpen(false)}
        >
          Agenda tu cita
        </Button>
      </div>
    </header>
  );
}
