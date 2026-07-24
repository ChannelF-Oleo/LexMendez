"use client";

import { useState } from "react";
import AreaModal from "./AreaModal";
import { areas } from "@/data/areas";
import type { Area } from "@/types";

type AreasGridProps = {
  /** Si se indica, muestra solo las primeras N áreas (p.ej. en la home). */
  limit?: number;
};

/** Grid de tarjetas de áreas; al hacer clic abre el modal de detalle. */
export default function AreasGrid({ limit }: AreasGridProps) {
  const [selected, setSelected] = useState<Area | null>(null);
  const visibles = typeof limit === "number" ? areas.slice(0, limit) : areas;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((area) => (
          <button
            key={area.slug}
            type="button"
            onClick={() => setSelected(area)}
            aria-label={`Ver servicios de ${area.titulo}`}
            className="group flex h-full flex-col items-start rounded-2xl border border-purple/10 bg-cream p-7 text-left outline-none transition-all duration-300 hover:-translate-y-1 hover:border-gold2/40 hover:shadow-xl hover:shadow-purple/10 focus-visible:ring-2 focus-visible:ring-gold2/60"
          >
            <span className="font-serif text-3xl font-semibold text-gold-gradient">
              {area.n}
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-purple">
              {area.titulo}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-purpleSoft">
              {area.descripcion}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold3 transition-colors group-hover:text-gold2">
              Ver servicios
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        ))}
      </div>

      <AreaModal area={selected} onClose={() => setSelected(null)} />
    </>
  );
}
