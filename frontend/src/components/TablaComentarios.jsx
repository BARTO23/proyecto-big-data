function TablaComentarios({ datos }) {
  return (
    <table className="w-full text-sm text-left mt-4">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Usuario</th>
          <th>Comentario</th>
          <th>Calificación</th>
          <th>País</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item, index) => (
          <tr key={index}>
            <td>{item.producto_id}</td>
            <td>{item.usuario_id}</td>
            <td>{item.comentario}</td>
            <td>{item.calificacion}</td>
            <td>{item.pais}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaComentarios;
