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
  if (total === 0) return { etiquetas: [], valores: [], porcentajes: [] };
  
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
  "rgba(74, 222, 128, 0.8)",
  "rgba(96, 165, 250, 0.8)",
  "rgba(248, 113, 113, 0.8)",
  "rgba(251, 191, 36, 0.8)",
  "rgba(167, 139, 250, 0.8)",
  "rgba(56, 189, 248, 0.8)",
  "rgba(244, 114, 182, 0.8)",
  "rgba(192, 132, 252, 0.8)",
];

const borderColors = colores.map(color => color.replace('0.8', '1'));

const chartOptions = {
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#e2e8f0',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}%`
      },
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      titleColor: '#f8fafc',
      bodyColor: '#e2e8f0',
      borderColor: '#334155',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(71, 85, 105, 0.5)' },
      ticks: { color: '#e2e8f0' }
    },
    y: {
      grid: { color: 'rgba(71, 85, 105, 0.5)' },
      ticks: { 
        color: '#e2e8f0',
        callback: (value) => `${value}%`
      }
    }
  }
};

function GraficosComentarios({ datos }) {
  const [filtroProducto, setFiltroProducto] = useState("todos");
  const [activeChart, setActiveChart] = useState('bar');

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
        label: `${label}`,
        data: grupo.porcentajes,
        backgroundColor: colores,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: colores.map(color => color.replace('0.8', '0.6')),
        hoverBorderColor: borderColors,
      },
    ],
  });

  const renderCalificacionesChart = () => {
    switch(activeChart) {
      case 'pie':
        return <Pie data={generarDataset(porCalificacion, "Calificaciones")} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={generarDataset(porCalificacion, "Calificaciones")} options={chartOptions} />;
      case 'line':
        return <Line data={generarDataset(porCalificacion, "Calificaciones")} options={chartOptions} />;
      default:
        return <Bar data={generarDataset(porCalificacion, "Calificaciones")} options={chartOptions} />;
    }
  };

  return (
    <div className="mt-10 p-4">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">Filtrar por producto:</label>
          <select
            className="bg-slate-800 text-slate-200 px-3 py-2 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={filtroProducto}
            onChange={(e) => setFiltroProducto(e.target.value)}
          >
            <option value="todos">Todos los productos</option>
            {productosDisponibles.map((prod) => (
              <option key={prod} value={prod}>
                Producto {prod}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-slate-400 text-sm">
          Mostrando {datosFiltrados.length} de {datos.length} comentarios
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Productos */}
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center">
              <span className="inline-block mr-2">📦</span> Distribución por Producto
            </h3>
          </div>
          <div className="h-64">
            <Bar 
              data={generarDataset(porProducto, "Porcentaje")} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false }
                }
              }} 
            />
          </div>
        </div>

        {/* Gráfico de Calificaciones */}
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center">
              <span className="inline-block mr-2">⭐</span> Calificaciones
            </h3>
            <div className="flex space-x-1">
              {['bar', 'pie', 'doughnut', 'line'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveChart(type)}
                  className={`p-1 rounded-md text-xs ${activeChart === type 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            {renderCalificacionesChart()}
          </div>
        </div>

        {/* Gráfico de Países */}
        <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <span className="inline-block mr-2">🌍</span> Comentarios por País
          </h3>
          <div className="h-80">
            <Bar
              data={generarDataset(porPais, "Porcentaje")}
              options={{
                ...chartOptions,
                indexAxis: "y",
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraficosComentarios;