"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

export default function ProductSearch({ products }) {
  const [query, setQuery] = useState("");

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Input de búsqueda */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold font-sora text-primary">Productos</h1>
        <div className="relative w-1/4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <input
            type="text"
            placeholder="Buscar pizzas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border-2 border-primary pl-12 pr-4 py-2 outline-none focus:border-primary text-sm"
            />
        </div>
        </div>

      {/* Resultado */}
      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 mt-10">
          No encontramos pizzas con ese nombre.
        </p>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}