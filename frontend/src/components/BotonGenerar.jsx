function BotonGenerar() {
  const generarComentarios = async () => {
    await fetch('http://localhost:3000/api/comentarios/generar', { method: 'POST' });
    alert('Comentarios generados ✅');
  };

  return (
    <button className="bg-blue-500 text-white p-2 m-2 cursor-pointer" onClick={generarComentarios}>
      Generar Comentarios
    </button>
  );
}

export default BotonGenerar;
