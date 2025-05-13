function BotonConsultar({ setDatos }) {
  const consultarComentarios = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/comentarios/consultar');
    if (!res.ok) throw new Error("La ruta no respondió correctamente");
    const data = await res.json();
    setDatos(data);
  } catch (error) {
    console.error("Error al consultar:", error);
  }
};


  return (
    <button className="bg-green-500 text-white p-2 m-2 cursor-pointer" onClick={consultarComentarios}>
      Consultar Comentarios
    </button>
  );
}

export default BotonConsultar;
