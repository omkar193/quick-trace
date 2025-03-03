import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Out for Delivery", "Delivered"],
    default: "Pending",
  },
  location: { type: String, required: true },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
