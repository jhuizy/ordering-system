// src/app/orders/my-orders/page.tsx
"use client";

import { api } from "~/trpc/react";
import { OrdersList } from "./order-list";

export default function MyOrders() {
  const { data: orders } = api.orders.getAllForUser.useQuery({}, { refetchInterval: 2000 });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

      {orders ? (
        <OrdersList
          orders={orders}
          emptyMessage="You haven't placed any orders yet"
        />
      ) : (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}