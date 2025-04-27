import mongoose from "mongoose";

export async function conectarDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/proyecto_big_data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB", error);
    process.exit(1); // Detiene la app si falla la conexión
  }
}
