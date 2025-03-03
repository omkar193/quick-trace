import { useEffect, useState } from "react";
import { getAuthHeaders, getUser } from "@/utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";

interface Order {
  _id: string;
  product: string;
  quantity: number;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
}

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = getUser(); // ✅ Get logged-in user

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.error("No user found. Please log in.");
        return;
      }

      const headers = getAuthHeaders();
      if (!headers.Authorization) {
        console.error("No authorization token found.");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/orders/customer/${user.id}`,
          {
            headers: headers as HeadersInit, // ✅ Ensuring correct type
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        }

        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Customer Dashboard</h1>
      <div className="card p-4">
        <h3 className="text-primary">Your Orders</h3>
        <ul className="list-group">
          {orders.length > 0 ? (
            orders.map((order) => (
              <li key={order._id} className="list-group-item">
                {order.product} - {order.status}
              </li>
            ))
          ) : (
            <li className="list-group-item">No orders found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
