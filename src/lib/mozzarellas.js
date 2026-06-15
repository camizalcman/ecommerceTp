import { connectDB } from "@/lib/mongodb";
import Mozzarella from "@/models/Mozzarella";

function serializeMozzarella(mozzarella) {
  return {
    _id: mozzarella._id.toString(),
    name: mozzarella.name,
    image: mozzarella.image,
    createdAt: mozzarella.createdAt?.toISOString(),
    updatedAt: mozzarella.updatedAt?.toISOString(),
  };
}

export async function getMozzarellas() {
  await connectDB();
  const mozzarellas = await Mozzarella.find().sort({ createdAt: -1 }).lean();
  return mozzarellas.map(serializeMozzarella);
}