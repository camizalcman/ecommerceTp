import { connectDB } from "@/lib/mongodb";
import Sauce from "@/models/Sauces";

function serializeSauce(sauce) {
  return {
    _id: sauce._id.toString(),
    name: sauce.name,
    image: sauce.image,
    createdAt: sauce.createdAt?.toISOString(),
    updatedAt: sauce.updatedAt?.toISOString(),
  };
}

export async function getSauces() {
  await connectDB();
  const sauces = await Sauce.find().sort({ createdAt: -1 }).lean();
  return sauces.map(serializeSauce);
}