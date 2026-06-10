import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import "./StockChart.css";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

function StockChart({ inventory }) {

  const colors = [
  "#51C255",
  "#347E37",
  "#A5D6A7",
  "#66BB6A",
  "#81C784"
];

  const data = {
  labels: inventory.map(item => item.nombre),
  datasets: [
    {
      label: "Cantidad en Stock",
      data: inventory.map(item => item.cantidad),

      backgroundColor: inventory.map((_, i) => colors[i % colors.length]),
      borderColor: "#e0e0e0",
      borderWidth: 1,
      borderRadius: 8
    }
  ]
};



  const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#666",
        font: {
          size: 13
        }
      }
    },

    title: {
      display: true,
      text: "Stock de Productos",
      font: {
        size: 18,
        weight: "bold"
      },
      color: "#222222"
    }
  },

  scales: {
    x: {
      ticks: {
        color: "#666"
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#666"
      }
    }
  },
  animation: {
    duration: 1200,
    easing: "easeOutQuart"
  }

};



  return (

    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>

  );

}

export default StockChart;