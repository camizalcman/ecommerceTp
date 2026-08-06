import ProductGrid from "@/components/ProductGrid";
import Hero from "@/components/Hero"
import { getProducts } from "@/lib/products";
import ProductSearch from "@/components/ProductSearch";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Hero/>
        <section id="menu" className="mb-8 mt-16">
          <ProductSearch products={products} />
        </section>
      </div>
    </main>
  );
}
