type SectionHeadingProps = {
  /** Texto pequeño en mayúsculas con línea dorada. */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Centra el encabezado (y la línea del eyebrow). */
  center?: boolean;
  /** Colores claros para usar sobre fondos morados. */
  light?: boolean;
  className?: string;
};

/** Encabezado de sección reutilizable: eyebrow + título serif + subtítulo. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className ?? ""}`}
    >
      {eyebrow ? (
        <p
          className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-gold1 to-gold3" />
          <span className="text-gold-gradient">{eyebrow}</span>
        </p>
      ) : null}
      <h2
        className={`mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl ${
          light ? "text-cream" : "text-purple"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-cream/75" : "text-purpleSoft"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
