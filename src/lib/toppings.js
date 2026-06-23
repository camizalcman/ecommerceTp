// Se importa la función que conecta con la base de datos MongoDB.
import { connectDB } from "@/lib/mongodb";

// Se importa el modelo de Mongoose para "Topping", que define la estructura
import Topping from "@/models/Topping";

// Esta función "traduce" un documento de Mongoose a un objeto JScript para enviar al front.
function serializeTopping(topping) {
  return {
    // _id viene como un ObjectId de Mongo, lo convertimos a string
    _id: topping._id.toString(),

    // name e image ya son strings normales, no necesitan conversión
    name: topping.name,
    image: topping.image,

    // Vienen como objetos Date de Mongo. El "?." (optional chaining) evita un error si el campo no existera por algún motivo.
    // toISOString() los convierte a string con formato estándar.
    createdAt: topping.createdAt?.toISOString(),
    updatedAt: topping.updatedAt?.toISOString(),
  };
}

// Función principal que se usa para obtener todos los toppings. Es "async" porque habla con la base de datos.
export async function getToppings() {
  await connectDB();

  // Buscamos TODOS los documentos de la colección "toppings".
  //   .find()                 -> sin filtro, trae todos
  //   .sort({ createdAt: -1 }) -> los ordena del más nuevo al más viejo
  //   .lean()                 -> le pide a Mongoose que devuelva objetos JS planos en vez de documentos "pesados"
  const toppings = await Topping.find().sort({ createdAt: -1 }).lean();
  return toppings.map(serializeTopping);
}