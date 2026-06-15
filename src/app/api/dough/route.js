import { getDoughs } from "@/lib/doughs";

export async function GET() {
  try {
    const doughs = await getDoughs();
    return Response.json({ doughs });
  } catch (error) {
    return Response.json({ error: "Error al obtener doughs" }, { status: 500 });
  }
}