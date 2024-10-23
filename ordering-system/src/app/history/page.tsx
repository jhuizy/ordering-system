// src/app/orders/page.tsx
import MyOrders from "../_components/my-orders";
import Overlay from "../_components/overlay";

export default function OrdersPage() {
  return (
      <Overlay>
        <MyOrders />
      </Overlay>
  );
}