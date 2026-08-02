/** Estado de publicación de un post del blog. */
export type PostStatus = "draft" | "published";

/** Post del blog. El cuerpo (`content`) se almacena en Markdown. */
export interface Post {
  id: string;
  title: string;
  /** Único, URL-friendly (p.ej. "guia-divorcio-rd"). */
  slug: string;
  /** Extracto corto para listados y metadatos. */
  excerpt: string;
  /** Cuerpo del post en formato Markdown. */
  content: string;
  /** URL de la portada en Storage; puede ser "" si no tiene. */
  coverImageUrl: string;
  /** Categoría; ver POST_CATEGORIES. */
  category: string;
  status: PostStatus;
  /** Epoch en milisegundos. */
  createdAt: number;
  updatedAt: number;
  /** Epoch en milisegundos, o null si aún no se ha publicado. */
  publishedAt: number | null;
}

/**
 * Datos para crear o editar un post. Excluye los campos gestionados por el
 * sistema (id y marcas de tiempo de creación/actualización).
 */
export type PostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;

/**
 * Categorías del blog, alineadas con las áreas de práctica. "Todas" no se
 * almacena: es solo el filtro por defecto de los chips.
 */
export const POST_CATEGORIES: string[] = [
  "Civil",
  "Familia",
  "Migración",
  "Inmobiliario",
  "Traducciones",
  "Corporativo",
];
