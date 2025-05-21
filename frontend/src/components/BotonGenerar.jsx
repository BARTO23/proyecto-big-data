import { useState } from 'react';

function BotonGenerar() {
  const [isLoading, setIsLoading] = useState(false);

  const generarComentarios = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/comentarios/generar', { 
        method: 'POST' 
      });
      
      if (!response.ok) throw new Error("Error en la generación");
      
      alert('Comentarios generados ✅');
    } catch (error) {
      console.error("Error:", error);
      alert('Error al generar comentarios');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={generarComentarios}
      disabled={isLoading}
      className={`
        bg-blue-600 hover:bg-blue-700 text-white
        font-medium py-2 px-4 rounded-lg
        transition-all duration-200 ease-in-out
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        active:scale-95
        flex items-center justify-center
        min-w-[180px]
        ${isLoading ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generando...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generar Comentarios
        </>
      )}
    </button>
  );
}

export default BotonGenerar;