import { getCategories } from "@/lib/categories";
import CategoryCard from "@/components/CategoryCard";

export const dynamic = "force-dynamic";

const categoryImages = {
  "Armá tu pizza": "/images/categories/cat1.jpg",
  "Clásicas": "/images/categories/cat2.jpg",
  "Especiales": "/images/categories/cat3.jpg",
  "Veganas": "/images/categories/cat4.jpg",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8">
          <h1 className="mt-4 max-w-3xl font-sora text-4xl font-semibold text-primary">
            Categorías
          </h1>
        </section>

        {categories.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Todavía no hay categorías cargadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                name={category.name}
                description={category.description}
                image={categoryImages[category.name]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}