import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// POST /api/users → registro
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    const exists = await User.findOne({ email: body.email });
    if (exists) {
      return Response.json({ message: "El email ya está registrado." }, { status: 400 });
    }

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return Response.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}