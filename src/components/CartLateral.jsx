"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

export default function CartLateral() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useAppContext();

   if (!isCartOpen) return null;

   return (
    <div className="fixed inset-0 z-[100] flex justify-end">

      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />

      {/* Panel lateral */}
      <div className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col">

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-primary font-sora">Tu carrito</h2>
          <button onClick={closeCart} className="text-2xl text-slate-500 hover:text-slate-900">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-500 text-center mt-10">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image ? `/images/products/${item.image}` : "/images/products/pizza.png"}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>

                  {item.customizations?.size && (
                    <p className="text-xs text-slate-500">
                      {item.customizations.size.name}
                    </p>
                  )}
                  {item.customizations?.dough && (
                    <p className="text-xs text-slate-500">
                      Masa: {item.customizations.dough.name}
                    </p>
                  )}
                  {item.customizations?.sauce && (
                    <p className="text-xs text-slate-500">
                      Salsa: {item.customizations.sauce.name}
                    </p>
                  )}
                  {item.customizations?.mozzarella && (
                    <p className="text-xs text-slate-500">
                      Mozzarella: {item.customizations.mozzarella.name}
                    </p>
                  )}
                  {item.customizations?.toppings?.length > 0 && (
                    <p className="text-xs text-slate-500">
                      Toppings: {item.customizations.toppings.map(t => t.name).join(", ")}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 border rounded-full text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-7 h-7 border rounded-full text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-primary">${item.subtotal}</p>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-xs text-red-500 mt-2 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-primary">${cartTotal()}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center bg-primary text-secondary py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Ver carrito completo
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}