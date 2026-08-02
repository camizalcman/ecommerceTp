import mongoose from "mongoose";

// Esta colección guarda un contador para generar
// números de orden secuenciales (1000, 1001, 1002...)
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
export default Counter;