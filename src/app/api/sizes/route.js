import { getSizes } from "@/lib/sizes";

export async function GET() {
  try {
    const sizes = await getSizes();
    return Response.json({ sizes });
  } catch (error) {
    return Response.json({ error: "Error al obtener sizes" }, { status: 500 });
  }
}