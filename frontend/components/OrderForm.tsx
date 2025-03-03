import { useState } from "react";

interface OrderFormProps {
  onSubmit: (productId: string, quantity: number, location: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productId, quantity, location);
    setProductId("");
    setQuantity(1);
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h3 className="text-success">Place New Order</h3>

      <div className="mb-3">
        <label className="form-label">Product ID</label>
        <input
          type="text"
          className="form-control"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Delivery Location</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        Place Order
      </button>
    </form>
  );
}
