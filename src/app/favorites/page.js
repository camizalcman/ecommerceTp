
"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import Product from "@/components/Product";

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
              <Product
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}