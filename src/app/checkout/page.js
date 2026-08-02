"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, activeUser } = useAppContext();
  const router = useRouter();

  const [form, setForm] = useState({
    name: activeUser?.name || "",
    email: activeUser?.email || "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: activeUser
            ? { _id: activeUser._id, name: activeUser.name, email: activeUser.email }
            : { _id: null, name: form.name, email: form.email },
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            customizations: item.customizations,
            subtotal: item.subtotal,
          })),
          total: cartTotal(),
          contactInfo: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            notes: form.notes,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      clearCart();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch {
      setError("Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary font-sora">Tu carrito está vacío</h1>
          <p className="mt-2 text-slate-600">Agregá productos antes de continuar.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12">

        {/* Formulario */}
        <div>
          <h1 className="text-3xl font-bold text-primary font-sora">Checkout</h1>
          <p className="mt-2 text-slate-600">Completá tus datos para finalizar la compra.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-slate-600">Nombre</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary text-sm"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary text-sm"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Teléfono</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary text-sm"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Dirección</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary text-sm"
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Observaciones</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary text-sm min-h-24"
                name="notes"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-secondary py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </form>
        </div>

        {/* Resumen del carrito */}
        <div>
          <h2 className="text-xl font-semibold text-primary font-sora">Tu pedido</h2>

          <div className="mt-4 space-y-4">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm">
                <img
                  src={item.image ? `/images/products/${item.image}` : "/images/products/pizza.png"}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {item.customizations?.size && (
                    <p className="text-xs text-slate-500">Tamaño: {item.customizations.size.name}</p>
                  )}
                  {item.customizations?.dough && (
                    <p className="text-xs text-slate-500">Masa: {item.customizations.dough.name}</p>
                  )}
                  {item.customizations?.sauce && (
                    <p className="text-xs text-slate-500">Salsa: {item.customizations.sauce.name}</p>
                  )}
                  {item.customizations?.mozzarella && (
                    <p className="text-xs text-slate-500">Mozzarella: {item.customizations.mozzarella.name}</p>
                  )}
                  {item.customizations?.toppings?.length > 0 && (
                    <p className="text-xs text-slate-500">
                      Toppings: {item.customizations.toppings.map(t => t.name).join(", ")}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold text-primary">${item.subtotal}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between bg-white rounded-xl p-4 shadow-sm">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-primary">${cartTotal()}</span>
          </div>
        </div>

      </div>
    </main>
  );
}