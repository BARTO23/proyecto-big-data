import mongoose from "mongoose";

export async function conectarDB() {
  console.log("⏳ Conectando a MongoDB...");
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/proyecto_big_data");
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}
