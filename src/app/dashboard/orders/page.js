import { getOrders } from "@/lib/orders";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardOrdersPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold mb-8 text-primary font-sora">Órdenes</h1>

        {orders.length === 0 ? (
          <p className="text-slate-500">No hay órdenes todavía.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/dashboard/order/${order._id}`}
                className="block border border-primary bg-primary/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-primary/20 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Orden #{order.orderNumber}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {order.user?.name} — {order.user?.email}
                    </p>
                    <p className="text-sm text-slate-500">
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
    </main>
  );
}