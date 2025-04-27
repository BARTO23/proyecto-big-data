import { useState } from 'react';

function BotonConsultar({ setDatos }) {
  const consultarComentarios = async () => {
    const res = await fetch('http://localhost:3000/api/comentarios/consultar');
    const data = await res.json();
    setDatos(data);
  };

  return (
    <button className="bg-green-500 text-white p-2 m-2" onClick={consultarComentarios}>
      Consultar Comentarios
    </button>
  );
}

export default BotonConsultar;
