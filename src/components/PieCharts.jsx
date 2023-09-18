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
const PieCharts = ({ subscriptions }) => {
  const categories = useSelector((state) => state.category);
  const currentDate = new Date();
  const categoryColors = categories.map((category) => category.color);
  const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
  const currentYear = currentDate.getFullYear();
  const filteredSubscriptions = subscriptions?.filter((subscription) => {
    const dueDate = new Date(subscription.next_payment_due);
    const dueMonth = dueDate.getMonth() + 1;
    const dueYear = dueDate.getFullYear();
    // console.log(dueMonth === currentMonth && dueYear === currentYear);
    return dueMonth === currentMonth && dueYear === currentYear;
  });
  // Calculate the total cost for the current month
  const totalCostCurrentMonth = filteredSubscriptions?.reduce(
    (total, subscription) => total + parseFloat(subscription.cost),
    0
  );
  // Calculate the total cost for each category
  const categoryCosts = {};
  // console.log("filterede", filteredSubscriptions);
  filteredSubscriptions?.forEach((subscription) => {
    const { category, cost } = subscription;
    if (!categoryCosts[category]) {
      categoryCosts[category] = parseFloat(cost);
    } else {
      categoryCosts[category] += parseFloat(cost);
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
        backgroundColor: categoryColors,
        hoverOffset: 1,
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 1, // Set borderWidth to 0
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
                        backgroundColor: ["#ccc"], // Gray color
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                      },
                      // tooltip: {
                      //   enabled: false, // Disable tooltip for the placeholder
                      // },
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
                  <th className="graph-t-data">$ {totalCostCurrentMonth}</th>
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
                {/* {Object.keys(categoryCosts).map((category, index) => (
                  <tr key={index} className="br-none">
                    <td>
                      <span className="res-head">
                        <div className={`small-color-box-${2}`}></div>
                      </span>
                    </td>
                    <td className="res-head graph-t-data-active w-250">
                      {category}
                    </td>
                    <td className="graph-t-data">
                      <span className="res-head ">
                        $ {categoryCosts[category].toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PieCharts;
