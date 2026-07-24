import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * Primera barrera para /admin: comprueba solo la PRESENCIA de la cookie de
 * sesión y redirige a /admin/login si falta. NO valida la cookie con el Admin
 * SDK (el middleware corre en edge runtime y firebase-admin no está disponible
 * ahí). La verificación REAL de validez + uid admin la hace el layout server
 * del panel con getCurrentAdmin(). /admin/login queda excluido para no crear
 * un bucle de redirección.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!request.cookies.has(SESSION_COOKIE)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
