import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Counter from "@/models/Counter";

function serializeOrder(order) {
  return {
    _id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: order.status,
    user: order.user,
    items: order.items,
    total: order.total,
    contactInfo: order.contactInfo,
    createdAt: order.createdAt?.toISOString(),
    updatedAt: order.updatedAt?.toISOString(),
  };
}

//Genera el próximo número de orden secuencial
export async function getNextOrderNumber() {
  await connectDB();
  const counter = await Counter.findByIdAndUpdate(
    "orderNumber",
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

export async function getOrders() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return orders.map(serializeOrder);
}

export async function getOrderById(id) {
  await connectDB();
  const order = await Order.findById(id).lean();
  return order ? serializeOrder(order) : null;
}

export async function getOrdersByUser(userId) {
  await connectDB();
  const orders = await Order.find({ "user._id": userId })
    .sort({ createdAt: -1 })
    .lean();
  return orders.map(serializeOrder);
}