import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function serializeUser(user) {
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    favorites: (user.favorites || []).map((fav) =>
      typeof fav === "object" && fav._id ? fav._id.toString() : fav.toString()
    ),
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
}

export async function getUserById(id) {
  await connectDB();
  const user = await User.findById(id).lean();
  return user ? serializeUser(user) : null;
}

export async function getUserByEmail(email) {
  await connectDB();
  const user = await User.findOne({ email }).lean();
  return user ? serializeUser(user) : null;
}

export async function getUsers() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).lean();
  return users.map(serializeUser);
}