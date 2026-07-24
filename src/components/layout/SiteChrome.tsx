"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Envuelve el contenido con el Header/Footer públicos, EXCEPTO en /admin, que
 * tiene su propio shell. Vive en un client component porque necesita el
 * pathname; los componentes Header/Footer no se modifican.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      {/* pt compensa el header fijo (~88px arriba). */}
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer />
    </>
  );
}
