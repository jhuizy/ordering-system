"use client"

// src/components/orders/OrderCard.tsx
import { type RouterOutputs } from "~/trpc/react";
import { CheckCircle2, Clock, Coffee, Droplets, PillIcon, FileWarning } from "lucide-react";

type Order = RouterOutputs["orders"]["getAll"][number];

const StatusBadge = ({ status }: { status: string }) => {
  const style = {
    "placed": "bg-yellow-100 text-yellow-800",
    "making": "bg-blue-100 text-blue-800",
    "delivered": "bg-green-100 text-green-800",
  }[status] ?? "bg-gray-100 text-gray-800";

  const icon = {
    "placed": <Clock className="h-4 w-4" />,
    "making": <Coffee className="h-4 w-4" />,
    "delivered": <CheckCircle2 className="h-4 w-4" />,
  }[status] ?? <PillIcon className="h-4 w-4" />;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

type OrderCardProps = {
  order: Order;
  showControls?: boolean;
  onUpdateStatus?: (orderId: number, status: Order["status"]) => Promise<void>;
};

export function OrderCard({ order, showControls = false, onUpdateStatus }: OrderCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">{order.userName}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Coffee className="h-4 w-4" />
          <span>{order.drink.name}</span>
        </div>
        {order.milk && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Droplets className="h-4 w-4" />
            <span>{order.milk.name}</span>
          </div>
        )}
        {order.sugar && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PillIcon className="h-4 w-4" />
            <span>{order.sugar.name}</span>
          </div>
        )}
      </div>

      {showControls && onUpdateStatus && order.status !== "delivered" && (
        <div className="mt-4 flex justify-end gap-2">
          {order.status === "placed" && (
            <button
              onClick={() => onUpdateStatus(order.id, "making")}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start Making
            </button>
          )}
          {order.status === "making" && (
            <button
              onClick={() => onUpdateStatus(order.id, "delivered")}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Mark Delivered
            </button>
          )}
        </div>
      )}
    </div>
  );
}
