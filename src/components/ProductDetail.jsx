"use client";

import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

export default function ProductDetail({ product, isCustomizable, options }) {
  const { addToCart } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState(null);
   const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedMozzarella, setSelectedMozzarella] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleToppingToggle = (topping) => {
    const exists = selectedToppings.some(t => t._id === topping._id);
    if (exists) {
      setSelectedToppings(selectedToppings.filter(t => t._id !== topping._id));
    } else {
      if (selectedToppings.length >= 4) return; // máximo 4
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    const customizations = isCustomizable
      ? {
          size: selectedSize,
          dough: selectedDough,
          sauce: selectedSauce,
          mozzarella: selectedMozzarella,
          toppings: selectedToppings,
        }
      : { size: selectedSize };

    addToCart(product, customizations, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* Imagen */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/images/products/pizza.png"
            alt={product.name}
            className="w-full max-w-md"
          />
        </div>

        {/* Contenido */}
        <div className="w-full lg:w-1/2">

          {/* Info del producto */}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>

          {/* Tamaños */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Tamaño</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              {options.sizes?.map(size => (
                <button
                  key={size._id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                    selectedSize?._id === size._id
                      ? "bg-primary border-primary text-secondary"
                      : "border-gray-300 hover:bg-primary hover:border-primary hover:text-secondary"
                  }`}
                >
                  {size.name} — ${size.price}
                </button>
              ))}
            </div>
          </div>

          {isCustomizable && (
            <>
              {/* Masa */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg">Masa</h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  {options.doughs?.map(dough => (
                    <button
                      key={dough._id}
                      onClick={() => setSelectedDough(dough)}
                      className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                        selectedDough?._id === dough._id
                          ? "bg-primary border-primary text-secondary"
                          : "border-gray-300 hover:bg-primary hover:border-primary hover:text-secondary"
                      }`}
                    >
                      {dough.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salsa */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg">Salsa</h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  {options.sauces?.map(sauce => (
                    <button
                      key={sauce._id}
                      onClick={() => setSelectedSauce(sauce)}
                      className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                        selectedSauce?._id === sauce._id
                          ? "bg-primary border-primary text-secondary"
                          : "border-gray-300 hover:bg-primary hover:border-primary hover:text-secondary"
                      }`}
                    >
                      {sauce.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mozzarella */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg">Mozzarella</h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  {options.mozzarellas?.map(mozzarella => (
                    <button
                      key={mozzarella._id}
                      onClick={() => setSelectedMozzarella(mozzarella)}
                      className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                        selectedMozzarella?._id === mozzarella._id
                          ? "bg-primary border-primary text-secondary"
                          : "border-gray-300 hover:bg-primary hover:border-primary hover:text-secondary"
                      }`}
                    >
                      {mozzarella.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toppings */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg">
                  Toppings (máximo 4) — {selectedToppings.length}/4
                </h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  {options.toppings?.map(topping => (
                    <button
                      key={topping._id}
                      onClick={() => handleToppingToggle(topping)}
                      className={`px-3 py-2 text-sm rounded-full border transition-all duration-300 ${
                        selectedToppings.some(t => t._id === topping._id)
                          ? "bg-primary border-primary text-secondary"
                          : "border-gray-300 hover:bg-primary hover:border-primary hover:text-secondary"
                      }`}
                    >
                      {topping.name}
                    </button>
                  ))}
                </div>
              </div>

            </>
          )}

          {/* Cantidad */}
          <div className="mt-6 flex items-center gap-4">
            <h2 className="font-semibold text-lg">Cantidad</h2>

            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 border-2 border-primary rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary"
            >
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 border-2 border-primary rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary"
            >
              +
            </button>
          </div>

          {/* Agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-primary text-secondary py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
          >
            Agregar al carrito
          </button>

        </div>
      </div>
    </div>
  );
}