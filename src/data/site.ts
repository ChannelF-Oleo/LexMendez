/** Datos de identidad y contacto del bufete, reutilizables en todo el sitio. */
export const site = {
  nombre: "LexMendez Global",
  tagline: "Soluciones legales. Visión global.",
  telefonoRD: "+1 (849) 472-5115",
  telefonoRDHref: "tel:+18494725115",
  telefonoES: "+34 627 908 556",
  telefonoESHref: "tel:+34627908556",
  email: "info@lexmendezglobal.com",
  web: "www.lexmendezglobal.com",
  ciudad: "Azua de Compostela",
  fundadora: "Lic. Mery Jenifer Méndez Beltre",
  cargo: "Socia Fundadora",
} as const;

/** Los dos teléfonos del bufete, listos para renderizar en cualquier bloque. */
export const telefonos = [
  { pais: "Rep. Dominicana", numero: site.telefonoRD, href: site.telefonoRDHref },
  { pais: "España", numero: site.telefonoES, href: site.telefonoESHref },
] as const;
