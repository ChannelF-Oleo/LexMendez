"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import Isotype from "@/components/brand/Isotype";

const fieldClasses =
  "mt-1.5 w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream " +
  "outline-none transition-colors placeholder:text-cream/40 " +
  "focus:border-gold2 focus:ring-2 focus:ring-gold2/30";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Envía el ID token a la API para crear la session cookie y entra al panel. */
  async function establishSession(cred: UserCredential) {
    const idToken = await cred.user.getIdToken();
    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }

    // No autorizado: cerrar la sesión de Firebase en el cliente.
    await signOut(auth).catch(() => {});
    if (res.status === 403) {
      setError("Esta cuenta no tiene acceso al panel.");
    } else {
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    }
  }

  function friendlyError(err: unknown): string {
    const code =
      typeof err === "object" && err && "code" in err
        ? String((err as { code: unknown }).code)
        : "";
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
      case "auth/invalid-email":
        return "Credenciales inválidas.";
      case "auth/too-many-requests":
        return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return "Se canceló el inicio con Google.";
      case "auth/operation-not-allowed":
        return "El proveedor no está habilitado en Firebase Auth.";
      default:
        return "No se pudo iniciar sesión. Inténtalo de nuevo.";
    }
  }

  async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await establishSession(cred);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      await establishSession(cred);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-cream/10 bg-purpleSoft/40 p-8 shadow-2xl backdrop-blur-sm md:p-10">
      <div className="flex flex-col items-center text-center">
        <Isotype className="h-14 w-14" title="LexMendez Global" />
        <h1 className="mt-5 font-serif text-2xl font-semibold text-cream">
          Panel de administración
        </h1>
        <p className="mt-2 text-sm text-cream/60">
          Acceso restringido al equipo de LexMendez Global.
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      <form onSubmit={handleEmailLogin} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-cream/90">
            Correo
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-cream/90">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={fieldClasses}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-gold1 via-gold2 to-gold3 px-6 py-3 text-sm font-semibold text-purple shadow-md outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold2/30 focus-visible:ring-2 focus-visible:ring-gold1/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Ingresando…" : "Iniciar sesión"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-cream/10" />
        <span className="text-xs uppercase tracking-wide text-cream/40">o</span>
        <span className="h-px flex-1 bg-cream/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-cream/20 bg-cream px-6 py-3 text-sm font-semibold text-purple outline-none transition-colors hover:bg-cream/90 focus-visible:ring-2 focus-visible:ring-gold1/70 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
          <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24z" />
          <path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.5l4-3.1z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z" />
        </svg>
        Continuar con Google
      </button>

      <p className="mt-8 text-center text-xs text-cream/40">
        <Link href="/" className="transition-colors hover:text-gold1">
          ← Volver al sitio
        </Link>
      </p>
    </div>
  );
}
