import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define JWT Payload Type
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ✅ Fix CORS Policy
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // ✅ Handle CORS Preflight Request
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    await connectDB();

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    if (decoded.role !== "customer") {
      return res
        .status(403)
        .json({ error: "Access Denied. Only customers can view orders." });
    }

    const { id } = req.query; // ✅ Get customer ID from URL

    // ✅ Security Fix: Ensure customer can only fetch their own orders
    if (decoded.userId !== id) {
      return res
        .status(403)
        .json({ error: "Access Denied. You can only view your own orders." });
    }

    const orders = await Order.find({ customerId: decoded.userId });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error fetching customer orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
