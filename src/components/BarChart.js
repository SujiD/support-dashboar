import {Bar} from "react-chartjs-2";


const BarChart = ({chartData}) => {


   const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-evenly gap-5">
        <div><Bar data={chartData} width={150} height={100} options={options}/></div>
      </div>
  
    </>
  )
}

export default BarChart;