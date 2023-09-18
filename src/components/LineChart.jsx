import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";

Chart.register(Filler);

const LineChart = ({ subscriptions }) => {
  const generateWeekLabels = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const labels = [];

    // Initialize the date to the first day of the current month
    const startDate = new Date(currentYear, currentMonth, 1);

    // Generate labels for the four weeks of the current month
    for (let i = 0; i <= 4; i++) {
      // Calculate the end date of the week (6 days later)
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      // Format the label as "start date / end date"
      const label = `${startDate.getDate()}/${endDate.getDate()}`;
      labels.push(label);

      // Move to the next week
      startDate.setDate(endDate.getDate() + 1);

      // Break if we have reached the end of the current month
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
  // Memoize the weakRange function
  const weakRange = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const weeklyCosts = [0, 0, 0, 0, 0];
    let CurrentMonthTotal = 0;
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
      gradient.addColorStop(0, "rgb(112, 112, 112,0.7"); // Starting color (black)
      gradient.addColorStop(0.9, "rgb(197, 195, 195,0.1)"); // Ending color (white)
    } else {
      gradient.addColorStop(0, "rgb(47, 150, 7,0.5)"); // Starting color (black)
      gradient.addColorStop(0.9, "rgb(47, 150, 7,0.1)"); // Ending color (white)
    }

    return gradient;
  };

  const data = {
    labels: weaklabel,
    datasets: [
      {
        label: "weekly Cost",
        data: weakRange(),
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          // Get the index of the current data point
          const dataIndex = context.dataIndex;
          // Use the updated getGradient function to get the gradient color
          const gradientColor = getGradient(chart, dataIndex, "black");
          // Return the gradientColor as the background color
          return gradientColor;
        },
        borderColor: "rgb(98, 98, 98)",
        tension: 0.5,
      },
      {
        label: "weekly Average",
        data: CurrentMonthAverage,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          // Get the index of the current data point
          const dataIndex = context.dataIndex;
          // Use the updated getGradient function to get the gradient color
          const gradientColor = getGradient(chart, dataIndex, "green");
          // Return the gradientColor as the background color
          return gradientColor;
        },
        borderColor: "rgb(47, 150, 7)",
        tension: 0.1,
      },
    ],
  };

  //   id: "shadingArea",
  //   beforeDatasetsDraw(chart, args, pluginsOptions) {
  //     const {
  //       ctx,
  //       chartArea: { top, bottom, left, right, width, height },
  //       scales: { x, y },
  //     } = chart;
  //     ctx.save();
  //     const tickHeight = y.height / y._valueRange;

  //     const datapointsLength = chart.data.labels.length;
  //     const datapoints = (datapointsLength - 1) * 2;
  //     ctx.beginPath();
  //     ctx.strokeStyle = `rgba(0,0,0,1)`;
  //     ctx.fillStyle = `rgb(98, 98, 98)`;
  //     ctx.moveTo(
  //       chart.getDatasetMeta(0).data[0].x,
  //       chart.getDatasetMeta(0).data[0].y +
  //         tickHeight * chart.data.datasets[0].shadingRange.min
  //     );
  //     for (let i = 1; i < datapoints; i++) {
  //       ctx.bezierCurveTo(
  //         chart.getDatasetMeta(0).data[i - 1].x + width / datapoints,
  //         chart.getDatasetMeta(0).data[i - 1].y +
  //           tickHeight * chart.data.datasets[0].shadingRange[i - 1].min,
  //         chart.getDatasetMeta(0).data[i].x + width / datapoints,
  //         chart.getDatasetMeta(0).data[i].y +
  //           tickHeight * chart.data.datasets[0].shadingRange[i].min,
  //         chart.getDatasetMeta(0).data[i].x,
  //         chart.getDatasetMeta(0).data[i].y +
  //           tickHeight * chart.data.datasets[0].shadingRange[i].min
  //       );
  //     }

  //     ctx.stroke();
  //     ctx.fill();
  //   },
  // };
  // const shadingArea = {
  //   id: "shadingArea",
  //   beforeDraw(chart, args, options) {
  //     const {
  //       ctx,
  //       chartArea: { top, bottom, left, right },
  //       scales: { x, y },
  //       data: { datasets },
  //     } = chart;

  //     const dataset = datasets[0]; // Assuming shading is applied to the first dataset
  //     const fillColor = "rgba(98, 98, 98, 0.2)"; // Adjust color and opacity as needed

  //     ctx.save();
  //     ctx.fillStyle = fillColor;
  //     ctx.beginPath();

  //     dataset.data.forEach((value, index) => {
  //       const xValue = x.getPixelForValue(index);
  //       const yValue = y.getPixelForValue(value);

  //       if (index === 0) {
  //         ctx.moveTo(xValue, yValue);
  //       } else {
  //         ctx.lineTo(xValue, yValue);
  //       }
  //     });

  //     ctx.lineTo(x.getPixelForValue(dataset.data.length - 1), bottom);
  //     ctx.lineTo(x.getPixelForValue(0), bottom);
  //     ctx.closePath();
  //     ctx.fill();
  //     ctx.restore();
  //   },
  // };

  const options = {
    plugins: {
      legend: {
        display: false,
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
          stepSize: 10,
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
