import { areas } from "@/data/areas";

/** Enlaces de navegación principal, compartidos por Header y Footer. */
export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Áreas de Práctica", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

/**
 * Áreas de práctica listadas en el footer (todas apuntan a /areas). Se derivan
 * de `areas` para que footer y página de áreas nunca se desincronicen.
 */
export const practiceAreas: string[] = areas.map((area) => area.titulo);

/** Enlaces legales/corporativos del footer. */
export const companyLinks: NavLink[] = [
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Aviso legal", href: "/aviso-legal" },
];
