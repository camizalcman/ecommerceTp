import { getSauces } from "@/lib/sauces";

export async function GET() {
  try {
    const sauces = await getSauces();
    return Response.json({ sauces });
  } catch (error) {
    return Response.json({ error: "Error al obtener sauces" }, { status: 500 });
  }
}