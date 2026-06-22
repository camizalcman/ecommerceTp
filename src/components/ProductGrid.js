import Image from "next/image";
import Link from "next/link";

function getProductImageSrc(image) {
  if (!image) {
    return "";
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/images/products/${image}`;
}

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Todavia no hay productos cargados.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/product/${product._id}`}
          className="group block rounded-xl p-4"
        >
          <article>

            <div className="relative aspect-square flex items-center justify-center overflow-visible">
              {product.image ? (
                <Image
                  alt={product.name}
                  className="object-contain transition-transform duration-700 group-hover:rotate-12"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={getProductImageSrc(product.image)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="mt-4">

              <h2 className="text-xl font-semibold text-primary font-sora">
                {product.name}
              </h2>

              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {product.description || "Sin descripcion"}
              </p>

              {product.categories?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.categories.map((category) =>
                    typeof category === "string" ? null : (
                      <span
                        key={category._id}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {category.name}
                      </span>
                    )
                  )}
                </div>
              ) : null}

              {product.sizes?.length ? (
               <div className="mt-3 flex flex-col gap-2"> 
                {product.sizes.map((size) => (
                  <div key={size.label} className="flex gap-1 text-base font-normal text-primary justify-between">
                    <span>{size.label}</span>
                    <span className="font-semibold">${size.price}</span> 
                  </div>
                ))}
              </div>
              ) : null}

            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}