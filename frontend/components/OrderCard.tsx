import StatusBadge from "./StatusBadge";

interface OrderCardProps {
  orderId: string;
  product: string;
  quantity: number;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
  onUpdateStatus?: () => void; // Optional for Delivery Partners
  onAcceptOrder?: () => void; // ✅ New: Accept order button
}

export default function OrderCard({
  orderId,
  product,
  quantity,
  status,
  location,
  onUpdateStatus,
  onAcceptOrder,
}: OrderCardProps) {
  return (
    <div className="card p-3 shadow-sm mb-3">
      <h5 className="card-title">Order #{orderId}</h5>
      <p className="card-text">
        <strong>Product:</strong> {product} <br />
        <strong>Quantity:</strong> {quantity} <br />
        <strong>Location:</strong> {location}
      </p>
      <StatusBadge status={status} />

      {/* ✅ Accept Order (For Delivery Partner) */}
      {status === "Pending" && onAcceptOrder && (
        <button onClick={onAcceptOrder} className="btn btn-warning btn-sm mt-2">
          Accept Order
        </button>
      )}

      {/* ✅ Update Status (For Delivery Partner) */}
      {onUpdateStatus && status !== "Delivered" && (
        <button
          onClick={onUpdateStatus}
          className="btn btn-primary btn-sm mt-2"
        >
          Update Status
        </button>
      )}
    </div>
  );
}
