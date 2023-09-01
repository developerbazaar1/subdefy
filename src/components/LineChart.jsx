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
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First Dataset",
        data: [100, 150, 200, 250, 300, 350, 400],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  //   const options = {
  //     scales: {
  //       x: {
  //         type: "linear", // Specify 'linear' for the x-axis scale
  //         beginAtZero: false,
  //       },
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   };

  return (
    <div>
      {/* <h2>Line Chart Example</h2> */}
      <Line data={data} />
    </div>
  );
};

export default LineChart;
