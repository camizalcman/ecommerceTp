import ProductDashboardContainer from "@/containers/ProductDashboardContainer";

export const dynamic = "force-dynamic";

export default function DashboardProductsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-primary">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold mb-8 font-sora">Productos y Categorías</h1>
        <ProductDashboardContainer />
      </div>
    </main>
  );
}