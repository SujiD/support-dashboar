import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from "chart.js";


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
// )

const BarChart = ({chartData}) => {

  return (
    <>
      <div className="d-flex align-items-center justify-content-evenly gap-5">
        <div><Bar data={chartData} width={200} height={175}/></div>
      </div>
  
    </>
  )
}

export default BarChart;