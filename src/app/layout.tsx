import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LexMendez Global — Soluciones legales. Visión global.",
  description:
    "LexMendez Global, bufete de abogados en Santo Domingo, República Dominicana. Soluciones legales con visión global.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        {/* pt compensa el header fijo (~88px arriba). */}
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <Footer />
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
