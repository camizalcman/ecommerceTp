import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getOrderById } from "@/lib/orders";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return Response.json({ message: "Orden no encontrada." }, { status: 404 });
    }

    return Response.json(order);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const order = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!order) {
      return Response.json({ message: "Orden no encontrada." }, { status: 404 });
    }

    return Response.json({ ok: true, message: "Estado actualizado." });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}