import { redirect } from "next/navigation";

// Compatibilità: i vecchi link/QR a /index.html (inclusi ?g= personalizzati e ?lang=)
// atterrano sulla nuova Home, preservando la query.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  redirect("/" + (url.search || ""));
}
