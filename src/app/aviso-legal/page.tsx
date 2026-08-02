/**
 * TEXTO BASE — NO PUBLICAR SIN REVISIÓN.
 *
 * Redacción estándar de aviso legal orientada a la LSSI-CE 34/2002 (España) y a
 * la normativa dominicana equivalente. Debe ser revisado y validado por la
 * abogada antes de su publicación.
 *
 * Los datos entre corchetes ([RAZÓN SOCIAL], [NIF/RNC], [COLEGIO DE ABOGADOS]…)
 * son marcadores: se han dejado sin rellenar a propósito para no inventar
 * información legal, fiscal ni colegial.
 */
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Aviso legal — LexMendez Global",
  description:
    "Titularidad del sitio, condiciones de uso, propiedad intelectual y legislación aplicable de LexMendez Global.",
};

const content = `## 1. Titular del sitio

En cumplimiento del deber de información, se hacen constar los siguientes datos
del titular de este sitio web:

- **Titular:** [RAZÓN SOCIAL / TITULAR]
- **Nombre comercial:** ${site.nombre}
- **Identificación fiscal:** [NIF / RNC]
- **Domicilio:** [DIRECCIÓN FISCAL], ${site.ciudad}
- **Correo electrónico:** ${site.email}
- **Teléfonos:** ${site.telefonoRD} (Rep. Dominicana) · ${site.telefonoES} (España)
- **Colegiación profesional:** [COLEGIO DE ABOGADOS Y NÚMERO DE COLEGIADA]

## 2. Objeto y condiciones de uso

Este sitio tiene una finalidad **informativa** sobre los servicios jurídicos de
${site.nombre}. El acceso es libre y gratuito, y supone la aceptación de las
condiciones recogidas en este aviso legal.

La persona usuaria se compromete a hacer un uso lícito del sitio y a no
emplearlo para fines contrarios a la ley, a la buena fe o al orden público, ni a
realizar acciones que puedan dañar, sobrecargar o impedir su normal
funcionamiento.

## 3. El contenido no constituye asesoramiento legal

La información publicada en esta web —incluidas las entradas del blog— tiene
carácter **general y divulgativo**. No sustituye al asesoramiento jurídico
individualizado ni crea, por sí sola, una relación abogada-cliente.

Cada caso requiere un análisis propio: antes de tomar cualquier decisión con
efectos jurídicos, consulta con un profesional. Puedes escribirnos a través de
la [página de contacto](/contacto).

## 4. Propiedad intelectual e industrial

Todos los contenidos del sitio (textos, marca, logotipo, isotipo, diseño,
imágenes y código) son titularidad de [RAZÓN SOCIAL / TITULAR] o se utilizan con
la debida autorización, y están protegidos por la normativa de propiedad
intelectual e industrial.

Queda prohibida su reproducción, distribución, comunicación pública o
transformación sin autorización previa y por escrito, salvo el uso personal y
privado. Se permite citar contenidos del blog indicando la fuente y enlazando a
la página original.

## 5. Limitación de responsabilidad

Procuramos que la información sea exacta y esté actualizada, pero no podemos
garantizar la ausencia de errores ni que los contenidos reflejen en todo momento
el estado vigente de la legislación.

En la medida permitida por la ley, ${site.nombre} no se responsabiliza de:

- Las decisiones adoptadas basándose únicamente en la información de esta web.
- Las interrupciones, fallos técnicos o indisponibilidad temporal del sitio.
- Los contenidos de sitios de terceros a los que se pueda acceder mediante
  enlaces, cuya inclusión no implica recomendación ni respaldo.

## 6. Enlaces de terceros

Este sitio puede contener enlaces a páginas externas. No controlamos ni
respondemos de sus contenidos ni de sus políticas de privacidad; al acceder a
ellas quedas sujeto a sus propias condiciones.

## 7. Protección de datos

El tratamiento de los datos personales recogidos a través de este sitio se rige
por nuestra [política de privacidad](/politica-de-privacidad).

## 8. Legislación aplicable y jurisdicción

Este aviso legal se rige por la legislación de [JURISDICCIÓN APLICABLE:
REPÚBLICA DOMINICANA Y/O ESPAÑA]. Para la resolución de cualquier controversia,
las partes se someten a los juzgados y tribunales de [FUERO ACORDADO], salvo que
la normativa aplicable establezca otro fuero imperativo.

**Última actualización:** [FECHA DE PUBLICACIÓN]
`;

export default function AvisoLegalPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Aviso <span className="text-gold-gradient">legal.</span>
        </>
      }
      description="Titularidad del sitio, condiciones de uso y responsabilidad sobre los contenidos."
      content={content}
    />
  );
}
