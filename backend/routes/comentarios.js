import express from "express";
import Comentario from "../models/Comentario.js";

const router = express.Router();

// Ruta POST para guardar un nuevo comentario
router.post("/", async (req, res) => {
  try {
    const nuevoComentario = new Comentario(req.body);
    await nuevoComentario.save();
    res.status(201).json({ mensaje: "Comentario guardado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el comentario", detalle: error.message });
  }
});

// (Opcional) Ruta GET para probar desde navegador
router.get("/", (req, res) => {
  res.send("✅ Ruta /api/comentarios activa");
});

export default router;
