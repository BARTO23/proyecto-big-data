import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

function agruparConPorcentaje(datos, clave) {
  const total = datos.length;
  const conteo = {};
  datos.forEach((item) => {
    const valor = item[clave];
    conteo[valor] = (conteo[valor] || 0) + 1;
  });
  const etiquetas = Object.keys(conteo);
  const valores = Object.values(conteo);
  const porcentajes = valores.map((v) => ((v / total) * 100).toFixed(2));
  return { etiquetas, valores, porcentajes };
}

const colores = [
  "#4ade80",
  "#60a5fa",
  "#f87171",
  "#fbbf24",
  "#a78bfa",
  "#38bdf8",
  "#f472b6",
  "#c084fc",
];

function GraficosComentarios({ datos }) {
  const [filtroProducto, setFiltroProducto] = useState("todos");

  const productosDisponibles = [...new Set(datos.map((d) => d.producto_id))];

  const datosFiltrados =
    filtroProducto === "todos"
      ? datos
      : datos.filter((d) => d.producto_id === filtroProducto);

  const porProducto = agruparConPorcentaje(datosFiltrados, "producto_id");
  const porCalificacion = agruparConPorcentaje(datosFiltrados, "calificacion");
  const porPais = agruparConPorcentaje(datosFiltrados, "pais");

  const generarDataset = (grupo, label) => ({
    labels: grupo.etiquetas,
    datasets: [
      {
        label: `${label} (%)`,
        data: grupo.porcentajes,
        backgroundColor: colores,
      },
    ],
  });

  return (
    <div className="mt-10">
      <div className="mb-4">
        <label className="text-white text-sm mr-2">Filtrar por producto:</label>
        <select
          className="bg-zinc-800 text-white px-2 py-1 rounded"
          value={filtroProducto}
          onChange={(e) => setFiltroProducto(e.target.value)}
        >
          <option value="todos">Todos</option>
          {productosDisponibles.map((prod) => (
            <option key={prod} value={prod}>
              {prod}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
          <h3 className="text-white text-sm mb-2">
            📦 Comentarios por Producto
          </h3>
          <Bar data={generarDataset(porProducto, "Productos")} />
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
          <h3 className="text-white text-sm mb-2">⭐ Calificaciones</h3>
          <Pie data={generarDataset(porCalificacion, "Calificaciones")} />
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-md col-span-2">
          <h3 className="text-white text-sm mb-4">🌍 Comentarios por País</h3>
          <Bar
            data={generarDataset(porPais, "Países")}
            options={{
              indexAxis: "y", // Barras horizontales
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => context.raw + " %",
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    callback: (val) => val + " %",
                    color: "#fff",
                  },
                  grid: { color: "#333" },
                },
                y: {
                  ticks: { color: "#fff" },
                  grid: { color: "#333" },
                },
              },
            }}
          />
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
          <h3 className="text-white text-sm mb-2">📊 Calificaciones (línea)</h3>
          <Line data={generarDataset(porCalificacion, "Calificaciones")} />
        </div>
      </div>
    </div>
  );
}

export default GraficosComentarios;
