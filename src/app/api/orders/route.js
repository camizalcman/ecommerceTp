import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getNextOrderNumber } from "@/lib/orders";
import { sendOrderConfirmationEmail } from "@/lib/email";

// POST /api/orders → crear orden
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    const orderNumber = await getNextOrderNumber();

    const order = await Order.create({
      orderNumber,
      status: "active",
      user: body.user,
      items: body.items,
      total: body.total,
      contactInfo: body.contactInfo,
    });

    try {
      await sendOrderConfirmationEmail({
        to: body.contactInfo.email,
        orderNumber: order.orderNumber,
        items: body.items,
        total: body.total,
        contactInfo: body.contactInfo,
      });
      console.log("Email enviado correctamente");
    } catch (emailError) {
      console.error("Error enviando email:", emailError.message);
    }

    return Response.json({
      _id: order._id.toString(),
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// GET /api/orders → listar todas las órdenes (admin)
export async function GET() {
  try {
    const { getOrders } = await import("@/lib/orders");
    const orders = await getOrders();
    return Response.json(orders);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}