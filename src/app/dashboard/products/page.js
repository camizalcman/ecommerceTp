import ProductDashboardContainer from "@/containers/ProductDashboardContainer";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default function DashboardProductsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-primary">
            <Link href="/dashboard" className="text-sm text-primary">
                      Volver al dashboard
            </Link>
      <div className="mx-auto max-w-6xl mt-2">
        <h1 className="text-3xl font-semibold mb-8 font-sora">Productos y Categorías</h1>
        <ProductDashboardContainer />
      </div>
    </main>
  );
}