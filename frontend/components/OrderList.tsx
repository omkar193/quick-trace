import StatusBadge from "./StatusBadge";

interface Order {
  id: string;
  product: string;
  quantity: number;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
}

interface OrderListProps {
  orders: Order[];
  userRole?: string; // ✅ Identify if user is delivery partner
  onAcceptOrder?: (id: string) => void;
  onUpdateStatus?: (id: string, currentStatus: string) => void;
}

export default function OrderList({
  orders,
  userRole,
  onAcceptOrder,
  onUpdateStatus,
}: OrderListProps) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-warning">
          <tr>
            <th>Order #</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
            {userRole === "delivery" && <th>Actions</th>}{" "}
            {/* ✅ Show actions only for delivery partners */}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.location}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>

                {/* ✅ Actions for Delivery Partner */}
                {userRole === "delivery" && (
                  <td>
                    {order.status === "Pending" ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => onAcceptOrder?.(order.id)}
                      >
                        Accept
                      </button>
                    ) : order.status !== "Delivered" ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onUpdateStatus?.(order.id, order.status)}
                      >
                        Update Status
                      </button>
                    ) : (
                      <span className="text-muted">Completed</span>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
