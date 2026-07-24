import Link from "next/link";
import Isotype from "./Isotype";

type LogoProps = {
  /** "light": texto claro para fondos oscuros. "dark": texto morado para fondos claros. */
  variant?: "light" | "dark";
  /** Si se pasa, el logo se envuelve en un enlace. Por defecto enlaza al inicio. */
  href?: string;
  className?: string;
};

/**
 * Logo horizontal de marca: isotipo + wordmark ("LexMendez" serif + "GLOBAL" sans).
 */
export default function Logo({
  variant = "light",
  href = "/",
  className,
}: LogoProps) {
  const wordColor = variant === "light" ? "text-cream" : "text-purple";
  const subColor = variant === "light" ? "text-gold1" : "text-gold3";

  const content = (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Isotype className="h-11 w-11 shrink-0" title="LexMendez Global" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-2xl font-semibold tracking-tight ${wordColor}`}>
          LexMendez
        </span>
        <span
          className={`font-sans text-[0.7rem] font-medium uppercase tracking-[0.42em] ${subColor}`}
        >
          Global
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="LexMendez Global — Inicio"
        className="inline-flex rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold1/70"
      >
        {content}
      </Link>
    );
  }

  return content;
}
