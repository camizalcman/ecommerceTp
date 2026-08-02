import Link from "next/link";
import { getOrders } from "@/lib/orders";
import { getUsers } from "@/lib/users";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [orders, users, products] = await Promise.all([
    getOrders(),
    getUsers(),
    getProducts(),
  ]);

  // Últimas 5 órdenes
  const lastOrders = orders.slice(0, 5);

  // Últimos 5 usuarios
  const lastUsers = users.slice(0, 5);

  // Total vendido en el mes actual
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

  // Productos con stock bajo (stock 0 o 1) — por ahora vacío porque no tenemos stock
  const lowStockProducts = [];

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">

        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-slate-500">Resumen administrativo del ecommerce.</p>
        </div>

        {/* Links rápidos */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/products"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
          >
            <p className="text-2xl">🍕</p>
            <p className="mt-2 font-semibold text-slate-900">Productos</p>
            <p className="text-sm text-slate-500">Crear y editar productos</p>
          </Link>
          <Link
            href="/dashboard/orders"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
          >
            <p className="text-2xl">📦</p>
            <p className="mt-2 font-semibold text-slate-900">Órdenes</p>
            <p className="text-sm text-slate-500">Ver y gestionar pedidos</p>
          </Link>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total vendido este mes</p>
            <p className="mt-2 text-3xl font-bold text-primary">${totalThisMonth}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Órdenes totales</p>
            <p className="mt-2 text-3xl font-bold text-primary">{orders.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Usuarios registrados</p>
            <p className="mt-2 text-3xl font-bold text-primary">{users.length}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Últimas 5 órdenes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Últimas órdenes</h2>
              <Link href="/dashboard/orders" className="text-sm text-primary hover:underline">
                Ver todas
              </Link>
            </div>
            {lastOrders.length === 0 ? (
              <p className="text-slate-500 text-sm">No hay órdenes todavía.</p>
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
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4">Últimos usuarios</h2>
            {lastUsers.length === 0 ? (
              <p className="text-slate-500 text-sm">No hay usuarios todavía.</p>
            ) : (
              <div className="space-y-3">
                {lastUsers.map((user) => (
                  <div key={user._id} className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
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