"use server";

import { getResend, CONTACT_TO, CONTACT_FROM } from "@/lib/resend";
import { areas } from "@/data/areas";

export type ContactInput = {
  name: string;
  email: string;
  area: string;
  message: string;
  /** Honeypot anti-spam: debe llegar vacío. */
  company?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Etiqueta legible del área a partir del slug enviado por el formulario. */
function areaLabel(value: string): string {
  if (!value) return "No especificada";
  if (value === "otra") return "Otra área";
  return areas.find((a) => a.slug === value)?.titulo ?? value;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Envía el mensaje del formulario de contacto por email vía Resend. */
export async function sendContactMessage(
  input: ContactInput,
): Promise<ContactResult> {
  // Honeypot: si viene relleno, es un bot. Simulamos éxito sin enviar.
  if (input.company && input.company.trim() !== "") {
    return { ok: true };
  }

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const area = input.area?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (!name) return { ok: false, error: "Por favor indica tu nombre." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Ingresa un correo electrónico válido." };
  }
  if (message.length < 10) {
    return { ok: false, error: "Cuéntanos un poco más (mínimo 10 caracteres)." };
  }

  const resend = getResend();
  if (!resend || !CONTACT_TO || !CONTACT_FROM) {
    return {
      ok: false,
      error:
        "El envío no está configurado en este momento. Escríbenos directamente a nuestro correo.",
    };
  }

  const label = areaLabel(area);
  const text =
    `Nuevo mensaje del formulario de contacto\n\n` +
    `Nombre: ${name}\n` +
    `Correo: ${email}\n` +
    `Área de interés: ${label}\n\n` +
    `Mensaje:\n${message}\n`;

  const html =
    `<h2>Nuevo mensaje de contacto</h2>` +
    `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Correo:</strong> ${escapeHtml(email)}</p>` +
    `<p><strong>Área de interés:</strong> ${escapeHtml(label)}</p>` +
    `<p><strong>Mensaje:</strong></p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${name}`,
      text,
      html,
    });

    if (error) {
      return {
        ok: false,
        error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
    };
  }
}
