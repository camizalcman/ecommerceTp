"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useAppContext();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary font-sora">Tu carrito está vacío</h1>
        <p className="mt-4 text-slate-600">Todavía no agregaste ninguna pizza.</p>
        <Link
          href="/categories"
          className="mt-8 inline-block bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold text-primary font-sora mb-8">Tu carrito</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="flex gap-6 bg-white rounded-xl p-6 shadow-sm"
            >
              <img
                src={item.image ? `/images/products/${item.image}` : "/images/products/pizza.png"}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>

                <div className="mt-1 space-y-0.5">
                  {item.customizations?.size && (
                    <p className="text-sm text-slate-500">Tamaño: {item.customizations.size.name}</p>
                  )}
                  {item.customizations?.dough && (
                    <p className="text-sm text-slate-500">Masa: {item.customizations.dough.name}</p>
                  )}
                  {item.customizations?.sauce && (
                    <p className="text-sm text-slate-500">Salsa: {item.customizations.sauce.name}</p>
                  )}
                  {item.customizations?.mozzarella && (
                    <p className="text-sm text-slate-500">Mozzarella: {item.customizations.mozzarella.name}</p>
                  )}
                  {item.customizations?.toppings?.length > 0 && (
                    <p className="text-sm text-slate-500">
                      Toppings: {item.customizations.toppings.map(t => t.name).join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 border-2 border-primary rounded-full hover:bg-primary hover:text-secondary transition"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-8 h-8 border-2 border-primary rounded-full hover:bg-primary hover:text-secondary transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <p className="text-lg font-semibold text-primary">${item.subtotal}</p>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between bg-white rounded-xl p-6 shadow-sm">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-xl font-semibold text-primary">${cartTotal()}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block text-center bg-primary text-secondary py-4 rounded-full font-semibold hover:opacity-90 transition"
        >
          Continuar al checkout
        </Link>

      </div>
    </main>
  );
}