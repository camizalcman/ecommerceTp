import { connectDB } from "@/lib/mongodb";
import Topping from "@/models/Topping";

function serializeTopping(topping) {
  return {
    _id: topping._id.toString(),
    name: topping.name,
    image: topping.image,
    createdAt: topping.createdAt?.toISOString(),
    updatedAt: topping.updatedAt?.toISOString(),
  };
}

export async function getToppings() {
  await connectDB();
  const toppings = await Topping.find().sort({ createdAt: -1 }).lean();
  return toppings.map(serializeTopping);
}