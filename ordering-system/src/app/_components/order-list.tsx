"use client";

// src/components/orders/OrdersList.tsx
import { type RouterOutputs } from "~/trpc/react";
import { OrderCard } from "./order-card";

type Order = RouterOutputs["orders"]["getAll"][number];

type OrdersListProps = {
  orders: Order[];
  showControls?: boolean;
  onUpdateStatus?: (orderId: number, status: Order["status"]) => Promise<void>;
  emptyMessage?: string;
};

export function OrdersList({ 
  orders, 
  showControls = false, 
  onUpdateStatus,
  emptyMessage = "No orders found" 
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          showControls={showControls}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}