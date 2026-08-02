import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// DELETE /api/users/123/favorites/456 → quitar favorito
export async function DELETE(_request, { params }) {
  try {
    const { id, productId } = await params;
    await connectDB();

    await User.findByIdAndUpdate(id, {
      $pull: { favorites: productId },
    });

    return Response.json({ ok: true, message: "Favorito eliminado." });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}