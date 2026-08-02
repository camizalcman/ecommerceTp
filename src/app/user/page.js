"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const { activeUser } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeUser) {
      router.push("/login");
      return;
    }

    fetch(`/api/users/${activeUser._id}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, [activeUser]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Datos del usuario */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-primary font-sora">Mi cuenta</h1>
          <p className="mt-2 text-slate-600">{activeUser?.name}</p>
          <p className="text-slate-500 text-sm">{activeUser?.email}</p>
        </div>

        {/* Órdenes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-primary font-sora mb-4">Mis pedidos</h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <p className="text-slate-500">Todavía no realizaste ningún pedido.</p>
              <Link
                href="/categories"
                className="mt-4 inline-block bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  href={`/user/order/${order._id}`}
                  className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Orden #{order.orderNumber}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">${order.total}</p>
                      <span className={`mt-1 inline-block text-xs px-3 py-1 rounded-full font-medium ${
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
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}