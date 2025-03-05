import OrderCard from "./OrderCard";

interface Order {
  id: string;
  product: string;
  quantity: number;
  status: "Delivered";
  location: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div className="card p-4 mt-4">
      <h3 className="text-success">Order History</h3>
      {orders.length === 0 ? (
        <p className="text-muted">No past orders.</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            orderId={order.id}
            product={order.product}
            quantity={order.quantity}
            status={order.status}
            location={order.location}
          />
        ))
      )}
    </div>
  );
}
