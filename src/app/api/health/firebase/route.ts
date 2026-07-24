import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

// TODO: eliminar tras validar la conexión con Firebase (ruta de diagnóstico).

// Evita que Next intente evaluar/prerender esta ruta en build: la conexión a
// Firebase debe ocurrir en tiempo de request.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snap = await adminDb.collection("posts").count().get();
    return NextResponse.json({ ok: true, count: snap.data().count });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
