"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

function getProductImageSrc(image) {
  if (!image) return "";

  if (image.startsWith("/")) return image;

  return `/images/products/${image}`;
}

export default function Product({ product }) {
  const { addFavorite, removeFavorite, isFavorite } = useAppContext();

  const toggleFavorite = () => {
    if (isFavorite(product._id)) {
      removeFavorite(product._id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block rounded-xl p-4"
    >
      <article>
        <div className="relative aspect-square flex items-center justify-center overflow-visible">
          {product.image ? (
            <Image
              alt={product.name}
              src={getProductImageSrc(product.image)}
              fill
              className="object-contain transition-transform duration-700 group-hover:rotate-12"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Sin imagen
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-primary font-sora">
              {product.name}
            </h2>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
            >
              <Heart
                className={`h-5 w-5 text-primary ${
                  isFavorite(product._id) ? "fill-primary" : ""
                }`}
              />
            </button>
          </div>

          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {product.description || "Sin descripción"}
          </p>

          {product.categories?.length > 0 && (
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
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {product.sizes.map((size) => (
                <div key={size.label}>
                  <div className="flex justify-between text-base text-primary">
                    <span>{size.label}</span>
                    <span className="font-semibold">${size.price}</span>
                  </div>
                  <hr className="my-1 border-gray-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}