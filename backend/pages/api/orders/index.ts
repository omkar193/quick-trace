import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the JWT Payload Type
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
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
    if (decoded.role !== "customer") {
      return res
        .status(403)
        .json({ error: "Access Denied. Only customers can place orders." });
    }

    const { product, quantity, location } = req.body;

    if (!product || !quantity || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new Order({
      customerId: decoded.userId,
      product,
      quantity,
      status: "Pending",
      location,
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
