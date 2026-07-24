/**
 * Convierte un texto en un slug URL-friendly: minúsculas, sin acentos, con
 * guiones en lugar de espacios/símbolos.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita diacríticos combinantes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // solo alfanumérico, espacios y guiones
    .replace(/[\s_-]+/g, "-") // colapsa separadores en un guion
    .replace(/^-+|-+$/g, ""); // sin guiones al inicio/fin
}
