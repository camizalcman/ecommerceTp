import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: Number, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "closed", "shipped", "canceled"],
      default: "active",
    },
    user: {
      _id: String,
      name: String,
      email: String,
    },
    items: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        customizations: Object,
        subtotal: Number,
      }
    ],
    total: { type: Number, required: true },
    contactInfo: {
      name: String,
      email: String,
      phone: String,
      address: String,
      notes: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;