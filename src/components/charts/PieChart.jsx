import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = ({ chartData }) => {
  const chartRef = useRef();
  const options = {
    plugins: {
      legend: {
        // onClick: (event, legendItem, legend) =>
        //   legendClick(event, legendItem, legend),
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
    animation: {
      duration: 0,
    },
    hover: {
      animationDuration: 0,
    },
    responsiveAnimationDuration: 0,
  };
  return (
    <>
      {/* <select>
      <option>
        Test
      </option>
      {
        chartData.labels.map((label) => {
          <option>{label}</option>
        })
      }
    </select> */}
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
