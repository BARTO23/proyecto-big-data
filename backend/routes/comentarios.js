import express from 'express';
import { generarComentarios } from '../utils/generarDatos.js';
import Comentario from '../models/Comentario.js';

const router = express.Router();

// ✅ Ruta GET para consultar comentarios
router.get('/consultar', async (req, res) => {
  try {
    const comentarios = await Comentario.find().limit(1000);
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Error al consultar comentarios:", error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
});

// ✅ Ruta POST para generar comentarios
router.post('/generar', async (req, res) => {
  console.log('🔁 Ruta /generar llamada');
  const cantidad = parseInt(req.query.cantidad) || 10000;

  try {
    const total = await generarComentarios(cantidad);
    res.json({ mensaje: `✅ Generados ${total} comentarios correctamente.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Error al generar comentarios' });
  }
});

export default router;
