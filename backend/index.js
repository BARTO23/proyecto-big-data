import cors from "cors";
import express from "express";
import { conectarDB } from "./config/db.js"; // <--- Aquí
import comentarioRoutes from "./routes/comentarios.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
conectarDB(); // <--- Aquí la llamada

// Rutas
app.use("/api/comentarios", comentarioRoutes);

// Servidor
app.listen(3000, () => {
  console.log("🚀 Backend escuchando en el puerto 3000");
});
