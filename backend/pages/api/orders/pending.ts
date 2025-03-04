import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ✅ Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Allow frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ Allow preflight requests
  }

  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ Extract & Verify Token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid token format" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;

    if (decoded.role !== "delivery") {
      return res.status(403).json({
        error: "Access Denied. Only delivery partners can view orders.",
      });
    }

    // ✅ Fetch Pending Orders
    const orders = await Order.find({ status: "Pending" });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
