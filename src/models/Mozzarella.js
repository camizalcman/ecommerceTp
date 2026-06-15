import mongoose from "mongoose";

const mozzarellaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Mozzarella = mongoose.models.Mozzarella || mongoose.model("Mozzarella", mozzarellaSchema);
export default Mozzarella;