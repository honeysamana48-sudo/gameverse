"use client";

import { useEffect, useState } from "react";
import { fetchOrders } from "@/lib/adminOrders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  async function load() {
    const data = await fetchOrders();
    setOrders(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Orders Dashboard
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#111827] p-4 rounded-xl border border-gray-700"
          >

            <p className="font-bold">
              {order.game_name}
            </p>

            <p className="text-sm text-gray-400">
              ₹{order.price}
            </p>

            <p className="text-sm text-gray-400">
              {order.customer_name} ({order.customer_email})
            </p>

            <p className="text-sm text-gray-400">
              📅 {new Date(order.created_at).toLocaleString()}
            </p>

            <p className="text-sm mt-2">
              Status: {order.status}
            </p>

            <p className="text-sm">
              Fulfilled: {order.is_fulfilled ? "✅ Yes" : "❌ No"}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}