// src/app/orders/page.tsx
import { CreateOrderForm } from "../_components/create-order-form";
import Overlay from "../_components/overlay";

export default function OrdersPage() {
  return (
      <Overlay>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Place an Order</h1>
            <p className="mt-1 text-sm text-gray-500">
              Select your drink and customize it to your liking.
            </p>
          </div>
          <CreateOrderForm />
        </div>
      </Overlay>
  );
}