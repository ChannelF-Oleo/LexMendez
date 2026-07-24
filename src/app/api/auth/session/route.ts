import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, NotAdminError } from "@/lib/auth/session";
import { SESSION_COOKIE, SESSION_DURATION_MS } from "@/lib/auth/constants";

// La sesión se resuelve en cada request (nada estático).
export const dynamic = "force-dynamic";

/** POST: crea la session cookie a partir de un ID token (solo si el uid es admin). */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { idToken?: unknown }
      | null;
    const idToken = body?.idToken;

    if (typeof idToken !== "string" || !idToken) {
      return NextResponse.json(
        { ok: false, error: "Falta el idToken." },
        { status: 400 },
      );
    }

    const sessionCookie = await createSessionCookie(idToken);
    const jar = await cookies();
    jar.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof NotAdminError) {
      return NextResponse.json(
        { ok: false, error: "Esta cuenta no tiene acceso al panel." },
        { status: 403 },
      );
    }
    // Token inválido/expirado u otros fallos de verificación.
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, error: "No se pudo iniciar sesión.", detail: message },
      { status: 401 },
    );
  }
}

/** DELETE: cierra sesión borrando la cookie. */
export async function DELETE() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
