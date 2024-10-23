// src/app/orders/page.tsx
import IncomingOrders from "../_components/incoming-orders";
import Overlay from "../_components/overlay";

export default function OrdersPage() {
  return (
      <Overlay>
        <IncomingOrders />
      </Overlay>
  );
}