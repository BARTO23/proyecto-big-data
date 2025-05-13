import { useState } from 'react';
import BotonGenerar from './components/BotonGenerar';
import BotonConsultar from './components/BotonConsultar';
import TablaComentarios from './components/TablaComentarios';
import GraficosComentarios from './components/GraficosComentarios';

function App() {
  const [datos, setDatos] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proyecto Big Data - Comentarios</h1>
      <BotonGenerar />
      <BotonConsultar setDatos={setDatos} />
      <TablaComentarios datos={datos} />
      {datos.length > 0 && <GraficosComentarios datos={datos} />}
    </div>
  );
}

export default App;
