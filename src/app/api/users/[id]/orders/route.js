import { getOrdersByUser } from "@/lib/orders";

// GET /api/users/123/orders → órdenes del usuario
export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const orders = await getOrdersByUser(id);
    return Response.json({ orders });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}