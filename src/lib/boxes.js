import { connectDB } from "@/lib/mongodb";
import Box from "@/models/Box";

function serializeBox(box) {
  return {
    _id: box._id.toString(),
    name: box.name,
    image: box.image,
    createdAt: box.createdAt?.toISOString(),
    updatedAt: box.updatedAt?.toISOString(),
  };
}

export async function getBoxes() {
  await connectDB();
  const boxes = await Box.find().sort({ createdAt: -1 }).lean();
  return boxes.map(serializeBox);
}