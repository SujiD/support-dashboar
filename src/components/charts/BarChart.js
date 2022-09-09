import {Bar} from "react-chartjs-2";


const BarChart = ({chartData, title}) => {


   const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false
        }
      },
      y:{
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        position: "top"
    }
    },
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-evenly gap-5">
        <div><Bar data={chartData} width={250} height={150} options={options}/></div>
      </div>
  
    </>
  )
}

export default BarChart;