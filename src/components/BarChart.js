import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from "chart.js";
import { getDatasetAtEvent, getElementAtEvent, getElementsAtEvent} from 'react-chartjs-2';
import { useRef, useState } from "react";
import DataView from "./DataView";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
)

const BarChart = ({chartData}) => {
  const chartRef = useRef(null);
  // const [barData, setbarData] = useState(chartData);
  const [data, setData] = useState({dept: "", ur: 0});

  // const printDatasetAtEvent = (dataset) => {
  //   if (!dataset.length) return;
  //   const datasetIndex = dataset[0].datasetIndex;
  //   console.log(chartData.datasets[datasetIndex].label);
  // };
  
  const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    setData({...data, 
      dept: chartData.labels[index],
        ur: chartData.datasets[datasetIndex].data[index]
      });
    console.log(chartData.labels[index], chartData.datasets[datasetIndex].data[index]);
  };
  
  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;
    console.log(elements)
  };
  
  const generateData = (event) =>{
    const chart = chartRef.current;
  
    if(!chart){
      return;
    }
    // printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    // printElementsAtEvent(getElementsAtEvent(chart, event));
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-evenly gap-5">
        <div><Bar data={chartData} ref={chartRef} onClick={generateData} width={200} height={175}/></div>
      </div>
      {/* <DataView /> */}
    </>
  )
}

export default BarChart;