import mongoose from "mongoose";

//Guarda un contador para generar números de orden secuenciales para las órdenes
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
export default Counter;