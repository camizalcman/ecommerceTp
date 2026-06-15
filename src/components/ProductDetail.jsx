"use client";

import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

export default function ProductDetail({ product, isCustomizable, options }) {
  const { addToCart } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState(null);
  const [selectedMozzarella, setSelectedMozzarella] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
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
          mozzarella: selectedMozzarella,
          toppings: selectedToppings,
          box: selectedBox,
        }
      : { size: selectedSize };

    addToCart(product, customizations, quantity);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Info del producto */}
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">desde ${product.price}</p>

      {/* Tamaños — siempre se muestran */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg">Tamaño</h2>
        <div className="flex gap-3 mt-2">
          {options.sizes?.map(size => (
            <button
              key={size._id}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border ${
                selectedSize?._id === size._id
                  ? "bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              {size.name} — ${size.price}
            </button>
          ))}
        </div>
      </div>

      {/* Opciones solo para pizza personalizable */}
      {isCustomizable && (
        <>
          {/* Masa */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Masa</h2>
            <div className="flex gap-3 mt-2">
              {options.doughs?.map(dough => (
                <button
                  key={dough._id}
                  onClick={() => setSelectedDough(dough)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedDough?._id === dough._id
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {dough.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mozzarella */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Mozzarella</h2>
            <div className="flex gap-3 mt-2">
              {options.mozzarellas?.map(mozzarella => (
                <button
                  key={mozzarella._id}
                  onClick={() => setSelectedMozzarella(mozzarella)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedMozzarella?._id === mozzarella._id
                      ? "bg-black text-white"
                      : "border-gray-300"
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
                  className={`px-4 py-2 rounded-lg border ${
                    selectedToppings.some(t => t._id === topping._id)
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {topping.name}
                </button>
              ))}
            </div>
          </div>

          {/* Caja */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Caja</h2>
            <div className="flex gap-3 mt-2">
              {options.boxes?.map(box => (
                <button
                  key={box._id}
                  onClick={() => setSelectedBox(box)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedBox?._id === box._id
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {box.name}
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
          className="px-3 py-1 border rounded-lg"
        >-</button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-1 border rounded-lg"
        >+</button>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className="mt-8 w-full bg-primary text-secondary py-3 rounded-lg font-semibold"
      >
        Agregar al carrito
      </button>

    </div>
  );
}