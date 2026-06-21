import mongoose from "mongoose";

const sauceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Sauce = mongoose.models.Sauce || mongoose.model("Sauce", sauceSchema);
export default Sauce;