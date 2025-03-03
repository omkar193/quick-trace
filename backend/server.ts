import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import dotenv from "dotenv";
import { connectDB } from "@/config/db";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = createServer((req, res) => handle(req, res));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("🔥 New WebSocket Connection:", socket.id);

  // Listen for order status updates
  socket.on("orderUpdated", (order) => {
    console.log("📦 Order Updated:", order);
    io.emit("orderStatusChanged", order); // Broadcast update to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket Disconnected:", socket.id);
  });
});

// Start Next.js server with WebSocket
app.prepare().then(() => {
  server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
    connectDB();
  });
});
