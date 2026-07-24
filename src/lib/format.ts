/** Formatea un epoch (ms) como fecha larga en español dominicano (es-DO). */
export function formatDate(epochMs: number | null): string {
  if (!epochMs) return "";
  return new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(epochMs));
}
