import Link from "next/link";

import { getCategories } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8">
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold font-sora text-primary">
            Categorías
          </h1>
        </section>

        {categories.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Todavia no hay categorias cargadas.
          </p>
        ) : (
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                className="rounded-xl border border-primary p-6 shadow-sm transition-all duration-300 hover:bg-primary hover:text-secondary text-primary"
                href={`/category/${category._id}`}
              >
                <h2 className="text-xl font-semibold font-sora">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm">
                  {category.description || "Sin descripcion"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
