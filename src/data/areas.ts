import type { Area } from "@/types";

/** Áreas de práctica del bufete (contenido real). */
export const areas: Area[] = [
  {
    n: "01",
    slug: "derecho-civil",
    titulo: "Derecho Civil",
    descripcion:
      "Contratos, compraventas y responsabilidad civil con asesoría clara y estratégica.",
    servicios: [
      "Contratos personales",
      "Poderes y compraventa",
      "Traspasos de vehículos",
      "Responsabilidad civil",
      "Reclamaciones y litigios civiles",
    ],
  },
  {
    n: "02",
    slug: "derecho-de-familia",
    titulo: "Derecho de Familia",
    descripcion:
      "Acompañamiento cercano en los asuntos más importantes de tu familia, incluidas las sucesiones.",
    servicios: [
      "Sucesiones y donaciones",
      "Determinación de herederos",
      "Partición",
      "Divorcios",
      "Separaciones de bienes",
      "Guarda y custodia",
      "Paternidad y filiación",
      "Reconocimiento e impugnación",
      "Cambios de nombre",
      "Permisos de salida",
      "Rectificación de actas",
      "Interdicción",
    ],
  },
  {
    n: "03",
    slug: "derecho-inmobiliario",
    titulo: "Derecho Inmobiliario",
    descripcion: "Seguridad jurídica para tus inmuebles y proyectos.",
    servicios: [
      "Transferencia de inmuebles",
      "Deslindes y mensuras",
      "Saneamiento catastral",
      "Constitución de condominio",
      "Litis sobre derecho registrado",
      "Constitución de bien de familia",
    ],
  },
  {
    n: "04",
    slug: "derecho-migratorio-y-extranjeria",
    titulo: "Derecho Migratorio y Extranjería",
    descripcion:
      "Visión internacional para tus trámites migratorios en RD, España y Estados Unidos.",
    servicios: [
      "Familiar comunitario",
      "Familiar cuidado España",
      "Nacionalidad por residencia",
      "Nacionalidad por opción",
      "Formulario DS-160 – Estados Unidos",
      "Solicitud ESTA – Estados Unidos",
      "Visados (República Dominicana y España)",
      "Residencias y renovaciones",
      "Reagrupación familiar",
      "Registro civil",
    ],
  },
  {
    n: "05",
    slug: "derecho-corporativo",
    titulo: "Derecho Corporativo",
    descripcion: "Acompañamiento en la creación y gestión de tu empresa.",
    servicios: [
      "Cómo constituir empresa",
      "Constitución de sociedades",
      "Asesoría corporativa",
    ],
  },
  {
    n: "06",
    slug: "servicios-adicionales",
    titulo: "Servicios Adicionales",
    descripcion:
      "Traducciones y documentación para completar tus gestiones legales.",
    servicios: ["Traducciones", "Documentos generales y documentos legales"],
    nota: "Las traducciones se entregan legalizadas; la apostilla debe solicitarla usted, ya que es opcional.",
  },
];
