// src/app/incoming/page.tsx
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { OrdersList } from "./order-list";

export default function IncomingOrders() {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("active");
  
  const { data: orders, refetch } = api.orders.getAllForOrg.useQuery({}, { refetchInterval: 2000 })
  const updateOrder = api.orders.update.useMutation({
    onSuccess: () => refetch()
  });

  const filteredOrders = orders?.filter((order) => {
    if (activeFilter === "active") return order.status !== "delivered";
    if (activeFilter === "completed") return order.status === "delivered";
    return true;
  });

  return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
            
            <div className="flex rounded-md shadow-sm">
              {(["all", "active", "completed"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${
                    filter === "all"
                      ? "rounded-l-md"
                      : filter === "completed"
                      ? "rounded-r-md"
                      : ""
                  } border`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {orders ? (
            <OrdersList
              orders={filteredOrders ?? []}
              showControls
              onUpdateStatus={async (orderId, status) =>
                { await updateOrder.mutateAsync({ orderId, status }) }
              }
              emptyMessage={`No ${activeFilter} orders`}
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
