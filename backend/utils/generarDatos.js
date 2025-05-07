import { faker } from '@faker-js/faker';
import Comentario from '../models/Comentario.js';

export async function generarComentarios(cantidad = 10000) {
  const comentarios = [];

  for (let i = 0; i < cantidad; i++) {
    comentarios.push({
      producto_id: "P" + faker.number.int({ min: 100, max: 999 }),
      usuario_id: "U" + faker.string.alphanumeric(6),
      comentario: faker.commerce.productDescription(),
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fecha: faker.date.recent(),
      pais: faker.location.country()
    });
  }

  await Comentario.insertMany(comentarios);
  return comentarios.length;
}
