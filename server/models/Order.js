import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "user" },
    items: [
      {
        product: {
          type: String,
          required: true,
          ref: "product",
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: "address" },
    status: { type: String, default: "Order Placed" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    payemntGateway: { type: String },
    paymentLog: { type: Array, default: [] },
  },
  { timestamps: true },
);

const Order = mongoose.model.order || mongoose.model("order", orderSchema);

export default Order;