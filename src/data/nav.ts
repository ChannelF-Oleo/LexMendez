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

/** Áreas de práctica listadas en el footer (todas apuntan a /areas). */
export const practiceAreas: string[] = [
  "Derecho Civil",
  "Derecho de Familia",
  "Sucesiones y Herencias",
  "Derecho Inmobiliario",
  "Migratorio y Extranjería",
];
