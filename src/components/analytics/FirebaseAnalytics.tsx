"use client";

import { useEffect } from "react";
import { getAnalyticsClient } from "@/lib/firebase/client";

/**
 * Inicializa Firebase Analytics en el cliente (una sola vez al montar).
 * No renderiza nada; es seguro en SSR porque la inicialización real ocurre
 * dentro de useEffect, que solo corre en el navegador.
 */
export default function FirebaseAnalytics() {
  useEffect(() => {
    void getAnalyticsClient();
  }, []);

  return null;
}
