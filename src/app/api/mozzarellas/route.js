import { getMozzarellas } from "@/lib/mozzarellas";

export async function GET() {
  try {
    const mozzarellas = await getMozzarellas();
    return Response.json({ mozzarellas });
  } catch (error) {
    return Response.json({ error: "Error al obtener mozzarellas" }, { status: 500 });
  }
}