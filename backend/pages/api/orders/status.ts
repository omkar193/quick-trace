import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Server } from "socket.io";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

// Keep a reference to WebSocket Server
let io: Server;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;
    if (decoded.role !== "delivery") {
      return res.status(403).json({
        error: "Access Denied. Only delivery partners can update orders.",
      });
    }

    const { orderId, status } = req.body;
    const validStatuses = ["Accepted", "Out for Delivery", "Delivered"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status update" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    order.deliveryPartnerId = decoded.userId;
    await order.save();

    // Emit WebSocket event when order status is updated
    if (!io) {
      io = new Server();
    }
    io.emit("orderStatusChanged", order);

    return res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
