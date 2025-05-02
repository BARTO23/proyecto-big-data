import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  producto_id: String,
  usuario_id: String,
  comentario: String,
  calificacion: Number,
  fecha: Date,
  pais: String,
});

const Comentario = mongoose.model("Comentario", comentarioSchema);
export default Comentario;
