import express from 'express';
import { generarComentarios } from '../utils/generarDatos.js';

const router = express.Router();

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
