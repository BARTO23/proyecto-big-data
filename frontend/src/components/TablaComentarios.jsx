import { useState } from "react";

function TablaComentarios({ datos }) {
  const [expandida, setExpandida] = useState(false);
  const [orden, setOrden] = useState(null);
  const [direccion, setDireccion] = useState('asc');
  const [filtro, setFiltro] = useState('');
  const maxFilas = 5;

  // Función para ordenar los datos
  const ordenarDatos = (campo) => {
    const esAscendente = orden === campo && direccion === 'asc';
    setOrden(campo);
    setDireccion(esAscendente ? 'desc' : 'asc');
  };

  // Función para filtrar los datos
  const datosFiltrados = datos.filter(item => 
    Object.values(item).some(valor => 
      String(valor).toLowerCase().includes(filtro.toLowerCase())
    )
  );

  // Aplicar ordenamiento si hay un campo seleccionado
  const datosOrdenados = orden 
    ? [...datosFiltrados].sort((a, b) => {
        const valorA = a[orden];
        const valorB = b[orden];
        
        if (valorA < valorB) return direccion === 'asc' ? -1 : 1;
        if (valorA > valorB) return direccion === 'asc' ? 1 : -1;
        return 0;
      })
    : datosFiltrados;

  const datosMostrados = expandida ? datosOrdenados : datosOrdenados.slice(0, maxFilas);

  // Estilo para los encabezados ordenables
  const estiloEncabezado = (campo) => 
    `px-4 py-3 cursor-pointer transition-colors hover:bg-slate-700 ${
      orden === campo ? 'text-emerald-400 font-semibold' : 'text-slate-300'
    }`;

  return (
    <div className="mt-6 space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar en comentarios..."
          className="w-full p-3 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-slate-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-lg">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="bg-slate-800 text-slate-400">
            <tr>
              <th 
                className={estiloEncabezado('producto_id')}
                onClick={() => ordenarDatos('producto_id')}
              >
                <div className="flex items-center">
                  Producto
                  {orden === 'producto_id' && (
                    <span className="ml-1">
                      {direccion === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className={estiloEncabezado('usuario_id')}
                onClick={() => ordenarDatos('usuario_id')}
              >
                <div className="flex items-center">
                  Usuario
                  {orden === 'usuario_id' && (
                    <span className="ml-1">
                      {direccion === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3">Comentario</th>
              <th 
                className={estiloEncabezado('calificacion')}
                onClick={() => ordenarDatos('calificacion')}
              >
                <div className="flex items-center">
                  Calificación
                  {orden === 'calificacion' && (
                    <span className="ml-1">
                      {direccion === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className={estiloEncabezado('pais')}
                onClick={() => ordenarDatos('pais')}
              >
                <div className="flex items-center">
                  País
                  {orden === 'pais' && (
                    <span className="ml-1">
                      {direccion === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {datosMostrados.length > 0 ? (
              datosMostrados.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-t border-slate-700 ${
                    index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'
                  } hover:bg-slate-700 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {item.producto_id}
                  </td>
                  <td className="px-4 py-3">{item.usuario_id}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={item.comentario}>
                    {item.comentario}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.calificacion 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-slate-500 fill-current'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-slate-400">
                        ({item.calificacion})
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 flex items-center">
                    <span className={`fi fi-${item.pais.toLowerCase()} mr-2`}></span>
                    {item.pais}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-slate-900">
                <td colSpan="5" className="px-4 py-6 text-center text-slate-400">
                  No se encontraron comentarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de la tabla */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
        <div>
          Mostrando {datosMostrados.length} de {datosFiltrados.length} comentarios
        </div>
        
        {datosFiltrados.length > maxFilas && (
          <button
            onClick={() => setExpandida(!expandida)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center"
          >
            {expandida ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                Mostrar menos
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                Mostrar todos ({datosFiltrados.length})
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default TablaComentarios;