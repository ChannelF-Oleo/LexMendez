import type { Metadata } from "next";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel — LexMendez Global",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  const email = admin?.email ?? "Administrador";

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-gradient">
        Panel de administración
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-purple sm:text-4xl">
        Hola, {email}
      </h1>
      <p className="mt-3 max-w-xl text-purpleSoft">
        Desde aquí gestionarás el contenido del sitio. Las herramientas de
        edición estarán disponibles próximamente.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-purple/10 bg-cream p-7">
          <h2 className="font-serif text-xl font-semibold text-purple">
            Gestión de artículos
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-purpleSoft">
            Crear, editar y publicar posts del blog.
          </p>
          <span className="mt-4 inline-block rounded-full bg-purple/10 px-3 py-1 text-xs font-semibold text-purple">
            Próximamente (Fase 5b)
          </span>
        </div>
      </div>
    </div>
  );
}
