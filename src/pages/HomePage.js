import { DataBox } from "../components/Data-Box/DataBox";
import { NavBar } from "../components/nav-bar/NavBar";
// import BarChart from "../components/BarChart";
import { useState } from "react";
import { DepartmentData, countData, colors, priorityData } from "../Data";
import PieChart from "../components/PieChart";
import DataView from "../components/DataView";
export const HomePage = () => {
  
const [userData, setUserData] = useState({
  labels: DepartmentData.map((data)=>data.department),
  datasets: [
    {
    label: "Department",
    data: DepartmentData.map((data)=>data.unresolved),
    backgroundColor: colors.map((color) =>color),
    borderColor: "black",
    borderWidth: 1,
  },
]});

const [countD, setCountD] = useState({
  labels: countData.map((d) => d.text),
  datasets:[
    {
      label: "Tickets",
      data: countData.map((data)=>data.count),
      backgroundColor: colors.map((color) =>color),
      borderColor: "black",
      borderWidth: 1,
    },
  ]
});

const [priorityD, setPriorityD] = useState({
  labels: priorityData.map((d) => d.status),
  datasets:[
    {
      label: "Tickets",
      data: priorityData.map((data)=>data.count),
      backgroundColor: colors.map((color) =>color),
      borderColor: "black",
      borderWidth: 1,
    },
  ]
})

  return (
    <>
        <NavBar />
        <div className="d-flex align-items-center justify-content-evenly">
            <DataBox heading={"567,879"} text={"Ticket counts by owner"} color={"#70d8c1"} />
            <DataBox heading={"23,665"} text={"Ticket counts by product"} color={"#f5d881"} />
            <DataBox heading={"980,340"} text={"Ticket counts by status"} color={"#ffbd8e"} />
            <DataBox heading={"567,879"} text={"Ticket counts by priority"} color={"#ff984e"} />
        </div>
        <div className="d-flex align-items-center justify-content-evenly">
          <div className="charts">
            <PieChart chartData={countD}/>
          </div>
          <div className="charts">
              <PieChart chartData={userData}/>
          </div>
          <div className="charts">
            <PieChart chartData={priorityD} />
          </div>
        </div>
        <DataView />
    </>
    
  )
}
