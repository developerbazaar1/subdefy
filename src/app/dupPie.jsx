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
import { useSelector } from "react-redux";
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

const DupPie = ({ subscriptions }) => {
  const categories = useSelector((state) => state.category);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
  const currentYear = currentDate.getFullYear();

  const filteredSubscriptions = subscriptions?.filter((subscription) => {
    const dueDate = new Date(subscription?.next_payment_due);
    const dueMonth = dueDate.getMonth() + 1;
    const dueYear = dueDate.getFullYear();
    // console.log(dueMonth === currentMonth && dueYear === currentYear);
    return dueMonth === currentMonth && dueYear === currentYear;
  });

  function ExtreactPriceNumber(price) {
    const costNumber = parseFloat(price.replace("$", ""));
    return costNumber;
  }
  // Calculate the total cost for the current month
  const totalCostCurrentMonth = filteredSubscriptions?.reduce(
    (total, subscription) => total + ExtreactPriceNumber(subscription.cost),
    0
  );

  const gradientColorMapping = {};
  filteredSubscriptions?.forEach((subscription) => {
    const category = subscription?.category;
    const categorydetails = subscription?.categorydetails;
    const gradientColor = categorydetails?.color;
    gradientColorMapping[category] = gradientColor;
  });

  // Calculate the total cost for each category
  const categoryCosts = {};
  // console.log("filterede", filteredSubscriptions);
  filteredSubscriptions?.forEach((subscription) => {
    const { category, cost } = subscription;
    if (!categoryCosts[category]) {
      categoryCosts[category] = ExtreactPriceNumber(cost);
    } else {
      categoryCosts[category] += ExtreactPriceNumber(cost);
    }
    // console.log(categoryCosts);
  });
  const data = {
    elements: {
      arc: {
        borderWidth: 0, // Set borderWidth to 0
      },
    },
    labels: Object.keys(categoryCosts),
    datasets: [
      {
        label: "",
        data: Object.values(categoryCosts),
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
          const gradientColor = getGradient(
            chart,
            dataIndex,
            gradientColorMapping
          );

          // Return the gradientColor as the background color
          return gradientColor;
        },
        hoverOffset: 4,
      },
    ],
  };

  // function parseGradient(gradientString) {
  //   const colorStops = gradientString?.match(/rgba?\([^)]+\)\s*\d*%?/g);

  //   if (!colorStops) {
  //     return [];
  //   }

  //   return colorStops.map((colorStop) => {
  //     const parts = colorStop?.match(/rgba?\(([^)]+)\)\s*(\d*%)?/);
  //     if (parts && parts.length >= 2) {
  //       const rgba = parts[1]
  //         .split(",")
  //         .map((value) => parseFloat(value.trim()));
  //       const position = parts[2] ? parseFloat(parts[2]) / 100 : null;
  //       const color = `rgba(${rgba.join(",")})`;
  //       return { color, position };
  //     }
  //     return null;
  //   });
  // }

  function getGradient(chart, index, gradientColorMapping) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    const categories = Object.keys(gradientColorMapping);
    const category = categories[index % categories.length];

    const gradientColor = gradientColorMapping[category];

    const gradient = (ctx.backgroundColor = gradientColor);

    return gradient;
  }

  const options = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const value = context.parsed;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };
  return (
    <div className="sub-box">
      <div className="sub-box-contnt">
        <div className="pt-4 main-sub-head text-center">
          <p>
            <strong>Recurring Expenditure by Month</strong>
          </p>
        </div>
        <div className="canvas-box cst-p">
          <div
            className="set-size charts-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "244px", height: "244px" }}>
              {filteredSubscriptions?.length > 0 ? (
                <Doughnut data={data} options={options} />
              ) : (
                <Doughnut
                  data={{
                    labels: ["No Data"],
                    datasets: [
                      {
                        label: "",
                        data: [1],
                        backgroundColor: ["#ccc"],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="canvas-data">
          <div className="graph-data-table">
            <table className="br-none mx-auto w-wide-80">
              <thead>
                <tr className="br-bottom">
                  <th></th>
                  <th className="bar-graph-t-head">
                    {currentDate.toLocaleString("default", { month: "long" })}{" "}
                    {currentYear}
                  </th>
                  <th className="graph-t-data">
                    $ {totalCostCurrentMonth?.toFixed(2)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat, index) => {
                  const categoryCost = categoryCosts[cat.name] || 0;
                  return (
                    <tr key={index} className="br-none">
                      <td>
                        <span className="res-head">
                          <div
                            className={`small-color-box-${2}`}
                            style={{
                              background: `${cat?.color}`,
                            }}
                          ></div>
                        </span>
                      </td>
                      <td
                        className="res-head  w-250"
                        style={{
                          fontSize: "13px",
                          letterSpacing: "1px",
                          paddingLeft: "8px",
                        }}
                      >
                        {cat.name}
                      </td>
                      <td
                        className="graph-t-data"
                        style={{
                          width: "68px",
                        }}
                      >
                        <span className="res-head ">
                          $ {categoryCost?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DupPie;
