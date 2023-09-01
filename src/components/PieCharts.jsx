import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const PieCharts = () => {
  const data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [300, 50, 100, 90],
        fill: false,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 108, 256)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = data.labels[context.dataIndex];
            const value = data.datasets[0].data[context.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
    legend: {
      display: false, // Hide the legend
    },
  };
  return (
    <div style={{ width: "244px", height: "244px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieCharts;
