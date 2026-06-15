import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Topping = mongoose.models.Topping || mongoose.model("Topping", toppingSchema);
export default Topping;