import { getBoxes } from "@/lib/boxes";

export async function GET() {
  try {
    const boxes = await getBoxes();
    return Response.json({ boxes });
  } catch (error) {
    return Response.json({ error: "Error al obtener boxes" }, { status: 500 });
  }
}