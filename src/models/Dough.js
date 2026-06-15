import mongoose from "mongoose";

const doughSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Dough = mongoose.models.Dough || mongoose.model("Dough", doughSchema);
export default Dough;