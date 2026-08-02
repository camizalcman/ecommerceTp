import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET /api/users/123/favorites → obtener favoritos del usuario
export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const user = await User.findById(id).populate("favorites").lean();

    if (!user) {
      return Response.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    const favorites = user.favorites.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      image: product.image,
      sizes: product.sizes,
      categories: product.categories,
    }));

    return Response.json({ favorites });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// POST /api/users/123/favorites → agregar favorito
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    await User.findByIdAndUpdate(id, {
      $addToSet: { favorites: body.productId },
    });

    return Response.json({ ok: true, message: "Favorito agregado." });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// PUT /api/users/123/favorites → sincronizar favoritos
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    await User.findByIdAndUpdate(id, {
      $addToSet: { favorites: { $each: body.productIds } },
    });

    return Response.json({ ok: true, message: "Favoritos sincronizados." });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}