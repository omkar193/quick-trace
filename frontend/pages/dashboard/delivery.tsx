import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { getAuthHeaders, getUser } from "@/utils/auth";
import OrderList from "@/components/OrderList";
import "bootstrap/dist/css/bootstrap.min.css";

interface Order {
  id: string;
  product: string;
  quantity: number;
  status: "Pending" | "Accepted" | "Out for Delivery" | "Delivered";
  location: string;
}

export default function DeliveryDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useRef(getUser()); // ✅ Store user in useRef to avoid re-renders

  // ✅ Fetch pending orders (only when necessary)
  const fetchOrders = useCallback(async () => {
    if (!user.current) return; // Prevent unnecessary calls

    const headers = getAuthHeaders();
    try {
      console.log("Fetching pending orders...");
      const res = await fetch("http://localhost:3000/api/orders/pending", {
        headers,
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, []); // ✅ No dependencies → function does not recreate

  // ✅ Accept an order (Pending → Accepted)
  const acceptOrder = async (orderId: string) => {
    try {
      console.log(`Accepting order ${orderId}...`);
      const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ status: "Accepted" }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to accept order");
      }

      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Accept Order Error:", error);
    }
  };

  // ✅ Update order status (Accepted → Out for Delivery → Delivered)
  const updateOrderStatus = async (orderId: string, currentStatus: string) => {
    const nextStatusMap: Record<string, string> = {
      Accepted: "Out for Delivery",
      "Out for Delivery": "Delivered",
    };

    const nextStatus = nextStatusMap[currentStatus];
    if (!nextStatus) return; // Prevent updating if already "Delivered"

    try {
      console.log(`Updating order ${orderId} to ${nextStatus}...`);
      const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Update Order Error:", error);
    }
  };

  useEffect(() => {
    if (!user.current) {
      router.push("/auth/login");
      return;
    }

    if (user.current.role !== "delivery") {
      router.push("/dashboard/customer");
      return;
    }

    fetchOrders();
  }, [router, fetchOrders]); // ✅ fetchOrders does NOT change, preventing infinite calls

  return (
    <div className="container mt-5">
      <h1 className="text-center">Delivery Dashboard</h1>

      {/* ✅ List of Pending Orders */}
      <div className="card p-4">
        <h3 className="text-warning">Pending Orders</h3>
        <OrderList
          orders={orders}
          userRole="delivery"
          onAcceptOrder={acceptOrder}
          onUpdateStatus={updateOrderStatus}
        />
      </div>
    </div>
  );
}
