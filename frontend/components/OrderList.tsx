import OrderCard from "./OrderCard";

interface Order {
  id: string;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
}

interface OrderListProps {
  orders: Order[];
  onUpdateStatus?: (id: string) => void; // Optional for Delivery Partner
}

export default function OrderList({ orders, onUpdateStatus }: OrderListProps) {
  return (
    <div>
      {orders.length === 0 ? (
        <p className="text-muted">No orders available.</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            orderId={order.id}
            status={order.status}
            location={order.location}
            onUpdateStatus={
              onUpdateStatus ? () => onUpdateStatus(order.id) : undefined
            }
          />
        ))
      )}
    </div>
  );
}
