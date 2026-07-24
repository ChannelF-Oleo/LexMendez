/** Área de práctica del bufete, con su listado de servicios. */
export type Area = {
  /** Número de orden mostrado en la tarjeta (p.ej. "01"). */
  n: string;
  /** Identificador estable para keys y anclas. */
  slug: string;
  titulo: string;
  descripcion: string;
  servicios: string[];
};
