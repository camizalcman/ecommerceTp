"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardCharts({ ordersData, revenueData, usersData, pizzasData }) {
  const charts = [
    { title: "Órdenes por mes", data: ordersData, key: "value", color: "#14537E" },
    { title: "Facturación por mes", data: revenueData, key: "value", color: "#14537E", prefix: "$" },
    { title: "Usuarios registrados por mes", data: usersData, key: "value", color: "#14537E" },
    { title: "Pizzas vendidas por mes", data: pizzasData, key: "value", color: "#14537E" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold font-sora text-primary mb-6">Métricas</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full">
        {charts.map((chart) => (
          <div key={chart.title} className="bg-white rounded-2xl p-6 shadow-sm w-full">
            <h3 className="font-semibold text-primary font-sora mb-4">{chart.title}</h3>
            <ResponsiveContainer width="100%" height={200}>
            <BarChart width={500} height={200} data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false}/>
                <Tooltip
                  formatter={(value) => chart.prefix ? `${chart.prefix}${value}` : value}
                />
                <Bar dataKey="value" fill={chart.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}