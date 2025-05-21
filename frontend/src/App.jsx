import { useState } from "react";
import BotonConsultar from "./components/BotonConsultar";
import BotonGenerar from "./components/BotonGenerar";
import GraficosComentarios from "./components/GraficosComentarios";
import TablaComentarios from "./components/TablaComentarios";

function App() {
  const [datos, setDatos] = useState([]);

  return (
    <div className="p-6 bg-slate-700">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Proyecto Big Data - Comentarios
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <BotonGenerar />
        <BotonConsultar setDatos={setDatos} />
      </div>
      <TablaComentarios datos={datos} />
      {datos.length > 0 && <GraficosComentarios datos={datos} />}
    </div>
  );
}

export default App;
