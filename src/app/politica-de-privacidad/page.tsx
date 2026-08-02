/**
 * TEXTO BASE — NO PUBLICAR SIN REVISIÓN.
 *
 * Redacción estándar orientada al RGPD (UE 2016/679) y la LOPDGDD 3/2018 para
 * España, y a la Ley 172-13 de protección de datos de República Dominicana.
 * Debe ser revisado y validado por la abogada antes de su publicación.
 *
 * Los datos entre corchetes ([RAZÓN SOCIAL], [NIF/RNC], [DIRECCIÓN FISCAL]…)
 * son marcadores: se han dejado sin rellenar a propósito para no inventar
 * información legal ni fiscal.
 */
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidad — LexMendez Global",
  description:
    "Cómo LexMendez Global trata los datos personales de quienes visitan la web o escriben a través del formulario de contacto.",
};

const content = `Esta política explica cómo se tratan los datos personales de las
personas que visitan este sitio web o contactan con nosotros a través de él.

## 1. Responsable del tratamiento

- **Titular:** [RAZÓN SOCIAL / TITULAR]
- **Identificación fiscal:** [NIF / RNC]
- **Domicilio:** [DIRECCIÓN FISCAL], ${site.ciudad}
- **Correo de contacto:** ${site.email}
- **Sitio web:** ${site.web}

## 2. Datos que recogemos

Solo tratamos los datos que nos facilitas voluntariamente:

- **Formulario de contacto:** nombre, correo electrónico, área de interés y el
  contenido del mensaje que escribes.
- **Comunicaciones directas:** los datos que incluyas al escribirnos por correo
  electrónico o teléfono.
- **Datos técnicos de navegación:** información agregada de uso del sitio
  (páginas visitadas, dispositivo y navegador) obtenida mediante herramientas de
  analítica. [CONFIRMAR HERRAMIENTA DE ANALÍTICA Y SI SE USAN COOKIES PROPIAS]

No recogemos categorías especiales de datos a través de la web. Si tu consulta
implica información sensible, te recomendamos no incluirla en el formulario y
esperar a que abramos un canal seguro contigo.

## 3. Finalidad y base legítima

| Finalidad | Base legítima |
| --- | --- |
| Responder a tu consulta y valorar si podemos ayudarte | Consentimiento y aplicación de medidas precontractuales |
| Gestionar la relación profesional si contratas nuestros servicios | Ejecución del contrato |
| Cumplir obligaciones legales (fiscales, contables, deontológicas) | Obligación legal |

No utilizamos tus datos para elaborar perfiles ni para tomar decisiones
automatizadas, ni te enviaremos comunicaciones comerciales sin tu
consentimiento previo.

## 4. Destinatarios y encargados del tratamiento

Para prestar el servicio nos apoyamos en proveedores tecnológicos que actúan
como encargados del tratamiento y solo tratan los datos siguiendo nuestras
instrucciones:

- **Resend** — envío de los mensajes del formulario de contacto a nuestro buzón.
- **Google Firebase** — alojamiento de la web, base de datos y analítica.

Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico
Europeo. En esos casos, las transferencias se amparan en las garantías
previstas por la normativa aplicable (cláusulas contractuales tipo u otro
mecanismo válido). [CONFIRMAR PROVEEDORES Y GARANTÍAS CON LA ABOGADA]

Fuera de estos casos, no cedemos tus datos a terceros salvo obligación legal o
requerimiento de autoridad competente.

## 5. Plazo de conservación

Conservamos los datos de tu consulta el tiempo necesario para atenderla. Si no
llegamos a iniciar una relación profesional, los eliminamos transcurrido
[PLAZO, p. ej. 1 año]. Si sí la iniciamos, conservamos la documentación durante
los plazos de prescripción legal y deontológica aplicables.

## 6. Tus derechos

Puedes ejercer en cualquier momento los derechos de **acceso, rectificación,
supresión, oposición, limitación del tratamiento y portabilidad**, así como
retirar el consentimiento prestado, escribiendo a ${site.email} e indicando el
derecho que deseas ejercer.

- En **España**, si consideras que no hemos atendido correctamente tu solicitud,
  puedes reclamar ante la Agencia Española de Protección de Datos
  (www.aepd.es).
- En **República Dominicana**, puedes dirigirte a la autoridad competente en
  materia de protección de datos conforme a la Ley 172-13.

## 7. Seguridad

Aplicamos medidas técnicas y organizativas razonables para proteger los datos
frente a pérdida, acceso no autorizado o uso indebido, y exigimos garantías
equivalentes a nuestros proveedores.

## 8. Cambios en esta política

Podemos actualizar esta política para reflejar cambios legales o en la forma de
prestar nuestros servicios. La versión vigente será siempre la publicada en
esta página.

**Última actualización:** [FECHA DE PUBLICACIÓN]
`;

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Política de <span className="text-gold-gradient">privacidad.</span>
        </>
      }
      description="Cómo tratamos tus datos personales cuando visitas esta web o nos escribes."
      content={content}
    />
  );
}
