import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import ProductGrid from "@/components/ProductGrid";
import { getCategoryById } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function CategoryProductsPage({ params }) {
  const { idcat } = await params;
  const category = await getCategoryById(idcat);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category._id);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link
          className="text-sm font-medium flex"
          href="/"
        >
          <ChevronLeft className="w-6 h-6" />
          Volver al catalogo
        </Link>

        <section className="mb-8 mt-6">
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold font-sora text-primary">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              {category.description}
            </p>
          ) : null}
        </section>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
