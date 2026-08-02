// app/favorites/page.js
"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useAppContext();

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold text-primary font-sora">Mis favoritos</h1>
        <p className="mt-2 text-slate-600">Los productos que guardaste para después.</p>

        {favorites.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-slate-500">No tenés productos favoritos todavía.</p>
            <Link
              href="/categories"
              className="mt-6 inline-block bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col"
              >
                <Link href={`/product/${product._id}`}>
                  <img
                    src={product.image ? `/images/products/${product.image}` : "/images/products/pizza.png"}
                    alt={product.name}
                    className="w-full aspect-square object-contain"
                  />
                  <h2 className="mt-3 font-semibold text-primary font-sora">{product.name}</h2>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
                  {product.sizes?.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      {product.sizes.map((size) => (
                        <p key={size.label} className="text-sm font-semibold text-primary">
                          {size.label}: ${size.price}
                        </p>
                      ))}
                    </div>
                  )}
                </Link>

                <button
                  onClick={() => removeFavorite(product._id)}
                  className="mt-4 text-sm text-red-500 hover:underline"
                >
                  Quitar de favoritos
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}