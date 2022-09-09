import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          boxWidth: 300,
        },
        position: "top",
      },
    },
  };
  return <Doughnut data={chartData} className="pie-chart" options={options} />;
};

export default PieChart;
