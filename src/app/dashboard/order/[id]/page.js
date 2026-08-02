"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardOrderPage({ params }) {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const { id } = await params;
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  async function handleStatusChange(newStatus) {
    setUpdating(true);
    const { id } = await params;
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrder({ ...order, status: newStatus });
    setUpdating(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <Link href="/dashboard/orders" className="text-sm text-primary hover:underline">
          ← Volver a órdenes
        </Link>

        {/* Encabezado */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Orden #{order.orderNumber}</h1>
              <p className="text-sm text-slate-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString("es-AR", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              order.status === "active" ? "bg-yellow-100 text-yellow-800" :
              order.status === "shipped" ? "bg-blue-100 text-blue-800" :
              order.status === "closed" ? "bg-green-100 text-green-800" :
              "bg-red-100 text-red-800"
            }`}>
              {order.status === "active" ? "Activa" :
               order.status === "shipped" ? "Enviada" :
               order.status === "closed" ? "Finalizada" : "Cancelada"}
            </span>
          </div>

          {/* Cambiar estado */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-2">Cambiar estado:</p>
            <div className="flex gap-2 flex-wrap">
              {["active", "shipped", "closed", "canceled"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={updating || order.status === status}
                  className={`px-4 py-2 text-sm rounded-full border transition ${
                    order.status === status
                      ? "bg-primary text-secondary border-primary"
                      : "border-slate-300 hover:border-primary hover:text-primary"
                  }`}
                >
                  {status === "active" ? "Activa" :
                   status === "shipped" ? "Enviada" :
                   status === "closed" ? "Finalizada" : "Cancelada"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Datos usuario */}
        <div className="mt-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-3">Datos del cliente</h2>
          <div className="space-y-1 text-sm text-slate-600">
            <p><span className="font-medium">Nombre:</span> {order.contactInfo?.name}</p>
            <p><span className="font-medium">Email:</span> {order.contactInfo?.email}</p>
            <p><span className="font-medium">Teléfono:</span> {order.contactInfo?.phone}</p>
            <p><span className="font-medium">Dirección:</span> {order.contactInfo?.address}</p>
            {order.contactInfo?.notes && (
              <p><span className="font-medium">Observaciones:</span> {order.contactInfo.notes}</p>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="mt-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Productos</h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div key={index} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
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
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-primary">${order.total}</span>
          </div>
        </div>

      </div>
    </main>
  );
}