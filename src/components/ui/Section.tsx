type SectionProps = {
  className?: string;
  children: React.ReactNode;
  /** Si es true, usa el fondo crema alternativo (cream-2). */
  alt?: boolean;
};

/** Sección de página con padding vertical estándar (móvil / desktop). */
export default function Section({ className, children, alt = false }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${alt ? "bg-cream2" : ""} ${className ?? ""}`}>
      {children}
    </section>
  );
}
