import Link from "next/link";
import { getOrders } from "@/lib/orders";
import { getUsers } from "@/lib/users";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [orders, users] = await Promise.all([
    getOrders(),
    getUsers(),
  ]);

  const lastOrders = orders.slice(0, 5);
  const lastUsers = users.slice(0, 5);

  const now = new Date();
  const totalThisMonth = orders
    .filter((order) => {
      const date = new Date(order.createdAt);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, order) => acc + order.total, 0);

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <h1 className="text-3xl font-semibold font-sora text-primary">Dashboard</h1>
          <p className="mt-1 text-slate-500">Resumen administrativo del ecommerce.</p>
        </div>

        {/* Links rápidos con foto */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
          <Link
            href="/dashboard/products"
            className="relative overflow-hidden rounded-xl h-36 flex items-end group text-secondary"
          >
            <img
              src="/images/dashProductos.jpg"
              alt="Productos"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="relative z-10 p-6 flex items-center justify-between w-full">
              <div className="text-secondary">
                <h2 className="font-sora text-3xl font-semibold">Productos y categorías</h2>
                <p className="text-sm">Crear y editar productos y categorías</p>
              </div>
              <ArrowRight className="text-secondary w-6 h-6" />
            </div>
          </Link>

          <Link
            href="/dashboard/orders"
            className="relative overflow-hidden rounded-xl h-36 flex items-end group"
          >
            <img
              src="/images/dashOrdenes.jpg"
              alt="Órdenes"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="relative z-10 p-6 flex items-center justify-between w-full">
              <div className="text-secondary">
                <h2 className="font-sora text-3xl font-semibold">Órdenes</h2>
                <p className="text-sm">Ver y gestionar pedidos</p>
              </div>
              <ArrowRight className="text-secondary w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-primary rounded-xl p-6 shadow-sm">
            <p className="text-sm text-secondary/80">Total vendido este mes</p>
            <p className="mt-2 text-3xl font-bold text-secondary font-sora">${totalThisMonth}</p>
          </div>
          <div className="border border-primary rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Órdenes totales</p>
            <p className="mt-2 text-3xl font-bold text-primary font-sora">{orders.length}</p>
          </div>
          <div className="border border-primary rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Usuarios registrados</p>
            <p className="mt-2 text-3xl font-bold text-primary font-sora">{users.length}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Últimas 5 órdenes */}
          <div className="bg-primary/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-secondary font-sora text-lg">Últimas órdenes</h2>
              <Link href="/dashboard/orders" className="text-sm text-secondary">
                Ver todas
              </Link>
            </div>
            {lastOrders.length === 0 ? (
              <p className="text-secondary text-sm">No hay órdenes todavía.</p>
            ) : (
              <div className="space-y-3">
                {lastOrders.map((order) => (
                  <Link
                    key={order._id}
                    href={`/dashboard/order/${order._id}`}
                    className="flex items-center justify-between hover:bg-slate-50 rounded-lg p-2 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">#{order.orderNumber}</p>
                      <p className="text-xs text-slate-500">{order.user?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">${order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
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
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Últimos 5 usuarios */}
          <div className="bg-primary/70 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-secondary mb-4 font-sora text-lg">Últimos usuarios</h2>
            {lastUsers.length === 0 ? (
              <p className="text-secondary text-sm">No hay usuarios todavía.</p>
            ) : (
              <div className="space-y-3">
                {lastUsers.map((user) => (
                  <div key={user._id} className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary">{user.name}</p>
                      <p className="text-xs text-secondary">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}