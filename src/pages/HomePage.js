import { DataBox } from "../components/Data-Box/DataBox";
import { NavBar } from "../components/nav-bar/NavBar";
import { useState } from "react";
import { DepartmentData, ownerData, colors, priorityData, statusData } from "../Data";
import PieChart from "../components/PieChart";
import DataView from "../components/DataView";
import { Form } from "react-bootstrap";
export const HomePage = () => {

  const [selectStat, setSelectStat] = useState("owner");
  const [productData, setProductData] = useState({
    labels: DepartmentData.map((data) => data.department),
    datasets: [
      {
        label: "Department",
        data: DepartmentData.map((data) => data.count),
        backgroundColor: colors.map((color) => color),
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ]
  });

  const [priorityD, setPriorityD] = useState({
    labels: priorityData.map((d) => d.priority),
    datasets: [
      {
        label: "Priority",
        data: priorityData.map((data) => data.count),
        backgroundColor: colors.map((color) => color),
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ]
  });

  const [statusD, setStatusD] = useState({
    labels: statusData.map((d) => d.status),
    datasets: [
      {
        label: "Status",
        data: statusData.map((data) => data.count),
        backgroundColor: colors.map((color) => color),
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ]
  });

  const [ownerD, setOwnerD] = useState({
    labels: ownerData.map((d) => d.owner),
    datasets: [
      {
        label: "Owner",
        data: ownerData.map((data) => data.count),
        backgroundColor: colors.map((color) => color),
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ]
  });

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth()) //January is 0!
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const handleChange = (event) => {
    setSelectStat(event.target.value)
  }
  return (
    <>
      <NavBar />
      <div className="cal m-3">
        <div className="month">{monthNames[mm]}</div>
        <div className="date">{dd}</div>
      </div>
      <div className="d-flex align-items-center justify-content-evenly mb-5">
        <button className="data-box-btn mt-5" style={{borderColor: "#70d8c1"}} onClick={() => setSelectStat("Owner")}>
          <DataBox heading={"567,879"} text={"Ticket counts by owner"}  />
        </button>
        <button className="data-box-btn mt-5" style={{borderColor: "#f5d881"}} onClick={() => setSelectStat("Product")}>
          <DataBox heading={"23,665"} text={"Ticket counts by product"}  />
        </button>
        <button className="data-box-btn mt-5" style={{borderColor: "#ffbd8e"}} onClick={() => setSelectStat("Status")}>
          <DataBox heading={"980,340"} text={"Ticket counts by status"} />
        </button>
        <button className="data-box-btn mt-5" style={{borderColor: "#ff984e"}} onClick={() => setSelectStat("Priority")}>
          <DataBox heading={"567,879"} text={"Ticket counts by priority"} />
        </button>
        
      </div>
      <div className="d-flex align-items-start gap-5 justify-content-evenly">
        <div className="charts d-flex flex-column justify-content-center align-items-start">
          <span className="chart-text"><b>What's new with entities</b></span>
          <div className=" d-flex align-items-center justify-content-evenly chart-container">
            <Form.Select size="sm" onChange={(event) => handleChange(event)}>
              <option value="Owner">Owner</option>
              <option value="Product">Product</option>
              <option value="Status">Status</option>
              <option value="Priority">Priority</option>
            </Form.Select>
            {
              selectStat === "Priority" ? <PieChart chartData={priorityD} className="pie-chart" />
                : (selectStat === "Status" ?
                  <PieChart chartData={statusD} className="pie-chart" />
                  : (
                    selectStat === "Product" ?
                      <PieChart chartData={productData} className="pie-chart" />
                      :
                      <PieChart chartData={ownerD} className="pie-chart" />
                  )
                )
            }
          </div>
        </div>

        {
          selectStat === "Priority" ? <DataView viewData={priorityData} table={selectStat} />
            : (selectStat === "Status" ?
              <DataView viewData={statusData} table={selectStat} />
              : (
                selectStat === "Product" ?
                  <DataView viewData={DepartmentData} table={selectStat} />
                  :
                  <DataView viewData={ownerData} table={selectStat} />
              )
            )
        }
      </div>
    </>

  )
}
