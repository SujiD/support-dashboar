import { DataBox } from "../components/Data-Box/DataBox";
import { NavBar } from "../components/nav-bar/NavBar";
import { useState } from "react";
import { DepartmentData, ownerData, colors, priorityData, statusData} from "../Data";
import PieChart from "../components/PieChart";
import DataView from "../components/DataView";
import { Form } from "react-bootstrap";
export const HomePage = () => {

const [selectStat, setSelectStat] = useState("owner");
const [productData, setProductData] = useState({
  labels: DepartmentData.map((data)=>data.department),
  datasets: [
    {
    label: "Department",
    data: DepartmentData.map((data)=>data.count),
    backgroundColor: colors.map((color) =>color),
    borderColor: "black",
    borderWidth: 1,
  },
]});

const [priorityD, setPriorityD] = useState({
  labels: priorityData.map((d) => d.priority),
  datasets:[
    {
      label: "Priority",
      data: priorityData.map((data)=>data.count),
      backgroundColor: colors.map((color) =>color),
      borderColor: "black",
      borderWidth: 1,
    },
  ]
});

const [statusD, setStatusD] = useState({
  labels: statusData.map((d) => d.status),
  datasets:[
    {
      label: "Status",
      data: statusData.map((data)=>data.count),
      backgroundColor: colors.map((color) =>color),
      borderColor: "black",
      borderWidth: 1,
    },
  ]
});

const [ownerD, setOwnerD] = useState({
  labels: ownerData.map((d) => d.owner),
  datasets:[
    {
      label: "Owner",
      data: ownerData.map((data)=>data.count),
      backgroundColor: colors.map((color) =>color),
      borderColor: "black",
      borderWidth: 1,
    },
  ]
});

const handleChange = (event) =>{
  setSelectStat(event.target.value)
}
  return (
    <>
        <NavBar/>
        <div className="d-flex align-items-center justify-content-evenly mb-5">
            <DataBox heading={"567,879"} text={"Ticket counts by owner"} color={"#70d8c1"} />
            <DataBox heading={"23,665"} text={"Ticket counts by product"} color={"#f5d881"} />
            <DataBox heading={"980,340"} text={"Ticket counts by status"} color={"#ffbd8e"} />
            <DataBox heading={"567,879"} text={"Ticket counts by priority"} color={"#ff984e"} />
        </div>
        <div className="d-flex align-items-start gap-5 justify-content-evenly">
          <div className="charts d-flex flex-column justify-content-center align-items-start">
            <span className="chart-text"><b>What's new with entities</b></span>
            <div className=" d-flex align-items-center justify-content-evenly chart-container">
              <Form.Select size="sm" onChange={(event) => handleChange(event)}>
                <option>Owner</option>
                <option>Product</option>  
                <option>Status</option>
                <option>Priority</option>
              </Form.Select>
            {
              selectStat === "Priority" ? <PieChart chartData={priorityD} className="pie-chart"/>
              : (selectStat === "Status" ? 
                <PieChart chartData={statusD} className="pie-chart"/>
              : (
                  selectStat === "Product" ?
                  <PieChart chartData={productData} className="pie-chart"/>
              :
              <PieChart chartData={ownerD} className="pie-chart"/>
                ) 
              )
            }
            </div>
          </div>
        
        {
            selectStat === "Priority" ? <DataView viewData={priorityData} table={selectStat}/>
            : (selectStat === "Status" ? 
                <DataView viewData={statusData} table={selectStat}/>
            : (
                selectStat === "Product" ?
                <DataView viewData={DepartmentData} table={selectStat}/>
            :
            <DataView viewData={ownerData} table={selectStat}/>
              ) 
            )
        }
        </div>
    </>
    
  )
}
