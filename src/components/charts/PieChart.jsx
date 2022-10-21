import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = ({ chartData, facetId }) => {
  console.log(facetId);
  // const legendClick = (event, legendItem, legend) => {
  //   console.log(legendItem)
  // }

  const chartRef = useRef();
  const options = {
    plugins: {
      legend: {
        // onClick: (event, legendItem, legend) =>
        // legendClick(event, legendItem, legend),
        labels: {
          usePointStyle: true,
          boxWidth: 400,
          boxHeight: 400,
        },
        position: "right",
        align: "start",
      },
    },
    responsive: true,
  };
  return (
    <>
      {/* <ul>
        {
          chartData.labels.map((label, index) => (
            <li key={index}>{label}</li>
          ))
        }
      </ul> */}
      <Doughnut
        data={chartData}
        className="pie-chart"
        options={options}
        // onClick={(event) => handleClick(event)}
        ref={chartRef}
      />
    </>
  );
};

export default PieChart;
