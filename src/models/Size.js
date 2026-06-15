import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Size = mongoose.models.Size || mongoose.model("Size", sizeSchema);
export default Size;