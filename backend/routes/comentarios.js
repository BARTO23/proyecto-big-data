import express from 'express';
import { faker } from '@faker-js/faker';
import Comentario from '../models/Comentario.js';

const router = express.Router();

// Ruta para generar datos
router.post('/generar', async (req, res) => {
  try {
    const comentarios = [];

    for (let i = 0; i < 5000; i++) {
      comentarios.push({
        producto_id: "P" + faker.number.int({ min: 100, max: 999 }),
        usuario_id: "U" + faker.number.int({ min: 10000, max: 99999 }),
        comentario: faker.lorem.sentence(),
        calificacion: faker.number.int({ min: 1, max: 5 }),
        fecha: faker.date.recent(30),
        pais: faker.location.country()
      });
    }

    await Comentario.insertMany(comentarios);
    res.json({ mensaje: '✅ 5000 comentarios generados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando comentarios' });
  }
});

// Ruta para consultar datos
router.get('/consultar', async (req, res) => {
  try {
    const comentarios = await Comentario.find().limit(100); // Limitar para no saturar
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error consultando comentarios' });
  }
});

export default router;
