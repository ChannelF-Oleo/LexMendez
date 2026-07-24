import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import LoginForm from "@/components/admin/LoginForm";

// Lee cookies -> siempre dinámica; no debe cachearse.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acceso admin — LexMendez Global",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Si ya hay sesión admin válida, evita mostrar el login.
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purpleDeep via-purple to-purpleSoft px-4 py-16">
      <LoginForm />
    </section>
  );
}
