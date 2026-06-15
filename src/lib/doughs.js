import { connectDB } from "@/lib/mongodb";
import Dough from "@/models/Dough";

function serializeDough(dough) {
  return {
    _id: dough._id.toString(),
    name: dough.name,
    image: dough.image,
    createdAt: dough.createdAt?.toISOString(),
    updatedAt: dough.updatedAt?.toISOString(),
  };
}

export async function getDoughs() {
  await connectDB();
  const doughs = await Dough.find().sort({ createdAt: -1 }).lean();
  return doughs.map(serializeDough);
}