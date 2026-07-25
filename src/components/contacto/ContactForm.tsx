"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { areas } from "@/data/areas";
import { sendContactMessage } from "@/lib/actions/contact";

const fieldClasses =
  "mt-1.5 w-full rounded-xl border border-purple/15 bg-cream px-4 py-3 text-sm text-purple " +
  "outline-none transition-colors placeholder:text-purpleSoft/50 " +
  "focus:border-gold2 focus:ring-2 focus:ring-gold2/30";

const labelClasses = "text-sm font-medium text-purple";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulario de contacto funcional: envía por Resend a través de un server
 * action. Validación en cliente (básica) y en servidor (autoritativa).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus("sending");
    setError(null);

    const result = await sendContactMessage({
      name: String(fd.get("nombre") ?? ""),
      email: String(fd.get("correo") ?? ""),
      area: String(fd.get("area") ?? ""),
      message: String(fd.get("mensaje") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
    });

    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  const sending = status === "sending";

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
          required
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
          required
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
          required
          placeholder="Cuéntanos brevemente sobre tu consulta"
          className={`${fieldClasses} resize-y`}
        />
      </div>

      {/* Honeypot anti-spam: oculto para humanos, tentador para bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">No rellenar</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="gold" className="w-full" disabled={sending}>
        {sending ? "Enviando…" : "Enviar mensaje"}
      </Button>

      {status === "sent" ? (
        <p
          role="status"
          className="rounded-xl border border-green-400/40 bg-green-500/10 px-4 py-3 text-sm text-green-800"
        >
          ¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos
          pronto.
        </p>
      ) : status === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
        >
          {error ?? "No se pudo enviar el mensaje."}
        </p>
      ) : (
        <p className="text-xs text-purpleSoft/70">
          Tu mensaje llega directamente a nuestro equipo. Te responderemos por
          correo.
        </p>
      )}
    </form>
  );
}
