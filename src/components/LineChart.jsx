import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";

Chart.register(Filler, {
  id: "customBackground",
  beforeDraw: function (chart, easing) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(left, top, right - left, bottom - top);
    ctx.restore();
  },
});

const LineChart = ({ subscriptions }) => {
  const generateWeekLabels = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const labels = [];

    const startDate = new Date(currentYear, currentMonth, 1);
    const options = { weekday: "short" };
    for (let i = 0; i <= 4; i++) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      const label = `${startDate.toLocaleDateString(
        "en-US",
        options
      )} ${startDate.getDate()}/${currentMonth + 1}`;
      labels.push(label);
      startDate.setDate(endDate.getDate() + 1);
      if (startDate.getMonth() !== currentMonth) {
        break;
      }
    }

    return labels;
  };

  const weaklabel = useMemo(() => generateWeekLabels(), []);

  function ExtreactPriceNumber(price) {
    const costNumber = parseFloat(price.replace("$", ""));
    return costNumber;
  }
  let CurrentMonthAverage = [0, 0, 0, 0, 0];
  let CurrentMonthTotal = 0;
  const weakRange = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const weeklyCosts = [0, 0, 0, 0, 0];

    subscriptions?.forEach((subscription) => {
      const nextPaymentDue = new Date(subscription.next_payment_due);
      if (
        nextPaymentDue.getFullYear() === currentYear &&
        nextPaymentDue.getMonth() === currentMonth
      ) {
        CurrentMonthTotal += ExtreactPriceNumber(subscription.cost);
        const subDate = nextPaymentDue.getDate();

        if (subDate >= 1 && subDate <= 7) {
          weeklyCosts[0] += ExtreactPriceNumber(subscription.cost);
        } else if (subDate >= 8 && subDate <= 14) {
          weeklyCosts[1] += ExtreactPriceNumber(subscription.cost);
        } else if (subDate >= 15 && subDate <= 21) {
          weeklyCosts[2] += ExtreactPriceNumber(subscription.cost);
        } else if (subDate >= 22 && subDate <= 28) {
          weeklyCosts[3] += ExtreactPriceNumber(subscription.cost);
        } else if (subDate >= 29 && subDate <= 31) {
          weeklyCosts[4] += ExtreactPriceNumber(subscription.cost);
        }
      }
    });
    CurrentMonthAverage.fill(CurrentMonthTotal / 4);
    return weeklyCosts;
  };

  const getGradient = (chart, index, colorCode) => {
    const {
      ctx,
      chartArea: { top, bottom },
    } = chart;

    // Calculate the height of the chart area

    // Create a linear gradient from top to bottom
    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
    if (colorCode === "black") {
      gradient.addColorStop(0, "rgb(112, 112, 112,0.7)"); // Starting color (black)
      gradient.addColorStop(0.9, "rgb(197, 195, 195,0.1)"); // Ending color (white)
    } else {
      gradient.addColorStop(0, "rgb(47, 150, 7,0.8)"); // Starting color (black)
      gradient.addColorStop(0.9, "rgb(47, 150, 7,0.1)"); // Ending color (white)
    }

    return gradient;
  };

  const dataPoint = (context) => {
    // console.log(context);
    const chart = context.chart;
    const { chartArea } = chart;
    if (!chartArea) {
      return null;
    }
    // Get the index of the current data point
    const dataIndex = context.dataIndex;
    // Use the updated getGradient function to get the gradient color
    const gradientColor = getGradient(chart, dataIndex, "black");
    // Return the gradientColor as the background color
    return gradientColor;
  };

  const data = {
    labels: weaklabel,
    datasets: [
      {
        label: "weekly Cost",
        data: weakRange(),
        fill: true,
        backgroundColor: dataPoint,
        borderColor: "rgb(98, 98, 98)",
        tension: 0.5,
      },
      {
        label: "weekly Average",
        data: CurrentMonthAverage,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const dataIndex = context.dataIndex;
          const gradientColor = getGradient(chart, dataIndex, "green");

          return gradientColor;
        },
        borderColor: "rgb(47, 150, 7)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      customBackground: {
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.8)",
      },
    },
    scales: {
      x: {
        type: "category",
        beginAtZero: false,
      },
      y: {
        // max: 50,
        beginAtZero: true,
        ticks: {
          stepSize: (CurrentMonthTotal / 5).toFixed(2),
          callback: function (label, index, labels) {
            return `$ ${label}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
