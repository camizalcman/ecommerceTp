import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

// GET /api/users/123/orders/456 → detalle de orden del usuario
export async function GET(_request, { params }) {
  try {
    const { id, orderId } = await params;
    await connectDB();

    const order = await Order.findOne({
      _id: orderId,
      "user._id": id,
    }).lean();

    if (!order) {
      return Response.json({ message: "Orden no encontrada." }, { status: 404 });
    }

    return Response.json({
      _id: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
      user: order.user,
      items: order.items,
      total: order.total,
      contactInfo: order.contactInfo,
      createdAt: order.createdAt?.toISOString(),
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}