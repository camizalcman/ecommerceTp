import { getUserById } from "@/lib/users";

// GET /api/users/123 → obtener usuario por ID
export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return Response.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}