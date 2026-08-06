import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    const user = await User.findOne({ email: body.email }).lean();

    if (!user) {
      return Response.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    if (user.password !== body.password) {
      return Response.json({ message: "Contraseña incorrecta." }, { status: 401 });
    }

    return Response.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}