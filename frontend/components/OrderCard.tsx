import StatusBadge from "./StatusBadge";

interface OrderCardProps {
  orderId: string;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
  onUpdateStatus?: () => void; // Optional for Delivery Partners
}

export default function OrderCard({
  orderId,
  status,
  location,
  onUpdateStatus,
}: OrderCardProps) {
  return (
    <div className="card p-3 shadow-sm mb-3">
      <h5 className="card-title">Order #{orderId}</h5>
      <p className="card-text">
        <strong>Location:</strong> {location}
      </p>
      <StatusBadge status={status} />

      {/* Show Update Button Only If onUpdateStatus Exists (For Delivery Partner) */}
      {onUpdateStatus && (
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
