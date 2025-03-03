interface StatusBadgeProps {
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusColors = {
    Pending: "badge bg-warning text-dark",
    Accepted: "badge bg-primary",
    "Out for Delivery": "badge bg-info",
    Delivered: "badge bg-success",
  };

  return (
    <span className={statusColors[status] || "badge bg-secondary"}>
      {status}
    </span>
  );
}
