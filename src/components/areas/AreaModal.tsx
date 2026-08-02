"use client";

import { useEffect, useId, useRef } from "react";
import Button from "@/components/ui/Button";
import Isotype from "@/components/brand/Isotype";
import type { Area } from "@/types";

type AreaModalProps = {
  area: Area | null;
  onClose: () => void;
};

/**
 * Modal accesible con el detalle de un área de práctica. Se renderiza solo
 * cuando `area` no es null. Cierra con botón, clic fuera y tecla Escape, y
 * bloquea el scroll del body mientras está abierto.
 */
export default function AreaModal({ area, onClose }: AreaModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape para cerrar + bloqueo de scroll del body mientras está abierto.
  useEffect(() => {
    if (!area) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Enfoca el botón de cierre al abrir.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [area, onClose]);

  if (!area) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-purpleDeep/70 backdrop-blur-sm animate-[lm-fade-in_0.2s_ease-out]"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-cream shadow-2xl animate-[lm-modal-in_0.25s_ease-out]">
        {/* Cabecera morada */}
        <div className="relative overflow-hidden bg-purple px-6 py-8 sm:px-8">
          <Isotype
            className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 opacity-10"
            title=""
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-cream/80 outline-none transition-colors hover:bg-cream/10 hover:text-cream focus-visible:ring-2 focus-visible:ring-gold1/70"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <span className="font-serif text-sm text-gold1">{area.n}</span>
          <h2 id={titleId} className="mt-1 font-serif text-2xl font-semibold text-cream sm:text-3xl">
            {area.titulo}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream/75">
            {area.descripcion}
          </p>
        </div>

        {/* Servicios */}
        <div className="px-6 py-7 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold3">
            Servicios
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {area.servicios.map((servicio) => (
              <li key={servicio} className="flex items-start gap-2.5 text-sm text-purpleSoft">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{servicio}</span>
              </li>
            ))}
          </ul>

          {area.nota ? (
            <p className="mt-6 rounded-xl border border-gold2/30 bg-cream2/70 px-4 py-3 text-sm leading-relaxed text-purpleSoft">
              <span className="font-semibold text-purple">Nota: </span>
              {area.nota}
            </p>
          ) : null}

          <div className="mt-8">
            <Button as="link" href="/contacto" variant="gold">
              Consultar sobre esta área
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
