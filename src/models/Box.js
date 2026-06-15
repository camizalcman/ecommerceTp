import mongoose from "mongoose";

const boxSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Box = mongoose.models.Box || mongoose.model("Box", boxSchema);
export default Box;