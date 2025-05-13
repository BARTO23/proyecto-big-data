import { useState } from "react";

function TablaComentarios({ datos }) {
  const [expandida, setExpandida] = useState(false);
  const maxFilas = 5;

  const datosMostrados = expandida ? datos : datos.slice(0, maxFilas);

  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left text-white bg-zinc-900 rounded-lg overflow-hidden">
        <thead className="bg-zinc-800 text-gray-300">
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Comentario</th>
            <th className="px-4 py-2">Calificación</th>
            <th className="px-4 py-2">País</th>
          </tr>
        </thead>
        <tbody>
          {datosMostrados.map((item, index) => (
            <tr key={index} className="border-t border-zinc-700">
              <td className="px-4 py-2">{item.producto_id}</td>
              <td className="px-4 py-2">{item.usuario_id}</td>
              <td className="px-4 py-2">{item.comentario}</td>
              <td className="px-4 py-2">{item.calificacion}</td>
              <td className="px-4 py-2">{item.pais}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {datos.length > maxFilas && (
        <div className="text-center mt-2">
          <button
            onClick={() => setExpandida(!expandida)}
            className="text-sm text-blue-400 hover:underline"
          >
            {expandida
              ? "Ver menos comentarios ▲"
              : "Ver todos los comentarios ▼"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TablaComentarios;
