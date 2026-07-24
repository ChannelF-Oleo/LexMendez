"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { areas } from "@/data/areas";

const fieldClasses =
  "mt-1.5 w-full rounded-xl border border-purple/15 bg-cream px-4 py-3 text-sm text-purple " +
  "outline-none transition-colors placeholder:text-purpleSoft/50 " +
  "focus:border-gold2 focus:ring-2 focus:ring-gold2/30";

const labelClasses = "text-sm font-medium text-purple";

/**
 * Formulario de contacto — SOLO UI. El submit hace preventDefault y muestra un
 * estado visual temporal; la integración de envío (Resend) llega en la Fase 6.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sin envío real todavía: solo feedback visual.
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nombre" className={labelClasses}>
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre completo"
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="correo" className={labelClasses}>
          Correo
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="area" className={labelClasses}>
          Área de interés
        </label>
        <select id="area" name="area" defaultValue="" className={fieldClasses}>
          <option value="" disabled>
            Selecciona un área
          </option>
          {areas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.titulo}
            </option>
          ))}
          <option value="otra">Otra área</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClasses}>
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="Cuéntanos brevemente sobre tu consulta"
          className={`${fieldClasses} resize-y`}
        />
      </div>

      <Button type="submit" variant="gold" className="w-full">
        Enviar mensaje
      </Button>

      {sent ? (
        <p
          role="status"
          className="rounded-xl border border-gold2/40 bg-gold1/15 px-4 py-3 text-sm text-purple"
        >
          ¡Gracias! Hemos recibido tu interés. El envío del formulario se conectará
          próximamente.
        </p>
      ) : (
        <p className="text-xs text-purpleSoft/70">
          El envío del formulario se conectará próximamente.
        </p>
      )}
    </form>
  );
}
