import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import Logo from "@/components/brand/Logo";
import LogoutButton from "@/components/admin/LogoutButton";

// Verifica la sesión con Admin SDK en cada request.
export const dynamic = "force-dynamic";

/**
 * Layout del panel: protege TODO lo que cuelga del grupo (panel). El login vive
 * en /admin/login (fuera de este grupo), por lo que NO queda bloqueado aquí y
 * se evita el bucle de redirección login <-> panel.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const email = admin.email ?? "Administrador";

  return (
    <div className="flex min-h-screen flex-col bg-cream2">
      {/* Barra superior del panel */}
      <header className="sticky top-0 z-40 border-b border-cream/10 bg-purple/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-4">
          <Logo variant="light" href="/admin" />
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-sm text-cream/70 sm:inline">{email}</span>
            <Link
              href="/"
              className="text-sm font-medium text-cream/80 outline-none transition-colors hover:text-gold1 focus-visible:ring-2 focus-visible:ring-gold1/70"
            >
              Volver al sitio
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
