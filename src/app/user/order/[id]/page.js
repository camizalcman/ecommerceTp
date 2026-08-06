// app/user/order/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function UserOrderPage({ params }) {
  const { activeUser } = useAppContext();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeUser) {
      router.push("/login");
      return;
    }

    const fetchOrder = async () => {
      const { id } = await params;
      const res = await fetch(`/api/users/${activeUser._id}/orders/${id}`);
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [activeUser]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-slate-500">Orden no encontrada.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/user"
          className="text-sm text-primary"
        >
        Volver a mis pedidos
        </Link>

        {/* Encabezado */}
        <div className="mt-6 bg-primary/70 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary font-sora">
                Orden #{order.orderNumber}
              </h1>
              <p className="text-sm text-secondary mt-1">
                {new Date(order.createdAt).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
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
        </div>

        {/* Datos de contacto */}
        <div className="mt-4 bg-background border border-primary rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-3">Datos de entrega</h2>
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
        <div className="mt-4 bg-primary/10 border border-primary rounded-2xl p-6 shadow-sm">
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

          {/* Total */}
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-primary">${order.total}</span>
          </div>
        </div>

      </div>
    </main>
  );
}