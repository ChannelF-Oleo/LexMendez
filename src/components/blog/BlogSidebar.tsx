import ContactForm from "@/components/contacto/ContactForm";
import { site, telefonos } from "@/data/site";

/**
 * Columna lateral del índice del blog: formulario de contacto compacto (el
 * mismo componente de /contacto, sin duplicar la lógica de envío) más los datos
 * de contacto del bufete.
 */
export default function BlogSidebar() {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-purple/10 bg-cream p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-purple">
          ¿Tienes una consulta?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-purpleSoft">
          Escríbenos y te respondemos por correo con la orientación que necesitas.
        </p>
        <div className="mt-5">
          <ContactForm compact />
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-purple to-purpleDeep p-6">
        <h2 className="font-serif text-lg font-semibold text-cream">
          Contacto directo
        </h2>
        <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
          {telefonos.map((t) => (
            <li key={t.href}>
              <a href={t.href} className="transition-colors hover:text-gold1">
                {t.numero}
              </a>
              <span className="ml-1.5 text-xs text-cream/40">{t.pais}</span>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-gold1"
            >
              {site.email}
            </a>
          </li>
          <li>{site.ciudad}, Rep. Dom.</li>
        </ul>
      </div>
    </aside>
  );
}
