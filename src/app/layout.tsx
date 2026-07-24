import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
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
        <SiteChrome>{children}</SiteChrome>
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
