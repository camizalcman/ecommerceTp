import { connectDB } from "@/lib/mongodb";
import Size from "@/models/Size";

function serializeSize(size) {
  return {
    _id: size._id.toString(),
    name: size.name,
    price: size.price,
    image: size.image,
    createdAt: size.createdAt?.toISOString(),
    updatedAt: size.updatedAt?.toISOString(),
  };
}

export async function getSizes() {
  await connectDB();
  const sizes = await Size.find().sort({ createdAt: -1 }).lean();
  return sizes.map(serializeSize);
}