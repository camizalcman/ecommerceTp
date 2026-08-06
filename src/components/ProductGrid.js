import Product from "@/components/Product"

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Todavía no hay productos cargados.
      </p>
    );
  }
  
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Product
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}
