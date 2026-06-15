import { getToppings } from "@/lib/toppings";

export async function GET() {
  try {
    const toppings = await getToppings();
    return Response.json({ toppings });
  } catch (error) {
    return Response.json({ error: "Error al obtener toppings" }, { status: 500 });
  }
}