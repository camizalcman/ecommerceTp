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
      if (selectedToppings.length >= 4) return;
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

  // Calcula cuántos pasos están completos, para la barra de progreso
  const steps = isCustomizable
    ? [
        !!selectedSize,
        !!selectedDough,
        !!selectedSauce,
        !!selectedMozzarella,
        selectedToppings.length > 0,
        quantity > 0,
      ]
    : [!!selectedSize];

  // si el usuario eligió una masa, usás esa
  // si no eligió ninguna, se muestra la "Común" por defecto (sin necesidad de seleccionarla)
  const doughToShow = selectedDough || options.doughs?.find(d => d.name === "Común");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Imagen fija con capas */}
        <div className="w-full lg:w-1/2">
          <div className="lg:sticky lg:top-24 flex justify-center items-center">
            <div className="relative w-[600px] h-[600px] aspect-square">

              {!isCustomizable && (
                <img
                  src="/images/products/pizza.png"
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {isCustomizable && doughToShow && (
                <img
                  src={`/images/doughs/${doughToShow.image}`}
                  alt={doughToShow.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {isCustomizable && selectedSauce && (
                <img
                  src={`/images/sauces/${selectedSauce.image}`}
                  alt={selectedSauce.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {isCustomizable && selectedMozzarella && (
                <img
                  src={`/images/mozzarellas/${selectedMozzarella.image}`}
                  alt={selectedMozzarella.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {isCustomizable && selectedToppings.map((topping) => (
                <img
                  key={topping._id}
                  src={`/images/toppings/${topping.image}`}
                  alt={topping.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ))}

            </div>
          </div>
        </div>

        {/* Contenido con línea de progreso */}
        <div className="w-full lg:w-1/2 relative">

          <h1 className="text-3xl font-bold mt-10 text-primary font-sora">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>

          <div className="relative mt-10 pl-8">

            {/* Línea base */}
            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-slate-200" />

            {/* Tamaños */}
            <div className="relative mb-12">
              <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${
                selectedSize ? "bg-primary border-primary" : "bg-white border-primary"
              }`} />
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
                <div className="relative mb-12">
                  <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${
                    selectedDough ? "bg-primary border-primary" : "bg-white border-primary"
                  }`} />
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
                <div className="relative mb-12">
                  <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${
                    selectedSauce ? "bg-primary border-primary" : "bg-white border-primary"
                  }`} />
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
                <div className="relative mb-12">
                  <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${
                    selectedMozzarella ? "bg-primary border-primary" : "bg-white border-primary"
                  }`} />
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
                <div className="relative mb-12">
                  <span className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${
                    selectedToppings.length > 0 ? "bg-primary border-primary" : "bg-white border-primary"
                  }`} />
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
            <div className="relative mb-16">
              <span className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 bg-primary border-primary" />
              <h2 className="font-semibold text-lg">Cantidad</h2>
              <div className="flex items-center gap-4 mt-2">
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
            </div>

          </div>

          {/* Agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="mb-16 mt-4 w-full bg-primary text-secondary py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
          >
            Agregar al carrito
          </button>

        </div>
      </div>
    </div>
  );
}