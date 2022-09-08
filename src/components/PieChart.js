import React from 'react'
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import {
  getElementAtEvent,
} from 'react-chartjs-2';
import { useRef } from "react";
const PieChart = ({chartData}) => {
  const chartRef = useRef(null);

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(chartData.datasets[datasetIndex].label);
  };
  
  const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(chartData.labels[index], chartData.datasets[datasetIndex].data[index]);
  };
  
  
  const generateData = (event) =>{
    const chart = chartRef.current;
  
    if(!chart){
      return;
    }
    // printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
  }
  return (
    <Doughnut data={chartData} ref={chartRef} onClick={generateData} className="pie-chart"/>
  )
}

export default PieChart;