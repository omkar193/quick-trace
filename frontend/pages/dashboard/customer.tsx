import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { getAuthHeaders, getUser } from "@/utils/auth";
import OrderForm from "@/components/OrderForm";
import OrderList from "@/components/OrderList";
import "bootstrap/dist/css/bootstrap.min.css";

interface Order {
  id: string;
  product: string;
  quantity: number;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState(getUser()); // ✅ Maintain user in state

  // ✅ Fetch customer orders
  const fetchOrders = useCallback(async () => {
    if (!user?.id) return;

    const headers = getAuthHeaders();
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/customer/${user.id}`,
        { headers }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [user]); // ✅ `user` added as dependency

  // ✅ Handle new order placement
  const handlePlaceOrder = async (
    product: string,
    quantity: number,
    location: string
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ product, quantity, location }),
      });

      if (!res.ok) {
        throw new Error("Order placement failed");
      }

      fetchOrders(); // ✅ Refresh orders after placement
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  useEffect(() => {
    setUser(getUser()); // ✅ Ensure user is always up-to-date

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role !== "customer") {
      router.push("/dashboard/delivery");
      return;
    }

    fetchOrders();
  }, [router, user, fetchOrders]); // ✅ `user` is now properly included

  return (
    <div className="container mt-5">
      <h1 className="text-center">Customer Dashboard</h1>

      {/* ✅ Order Placement Form */}
      <OrderForm onSubmit={handlePlaceOrder} />

      {/* ✅ List of Orders */}
      <div className="card p-4 mt-4">
        <h3 className="text-primary">Your Orders</h3>
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
