// import { DataBox } from "../components/Data-Box/DataBox";
import { NavBar } from "../components/nav-bar/NavBar";
import { useEffect, useState } from "react";
import { ownerData, colors } from "../Database/Data";
import PieChart from "../components/charts/PieChart";
import DataView from "../components/table/DataView";
import { Form } from "react-bootstrap";
import { pData, sData, dData } from "../common/filter";
import Calendar from "../components/calendar/Calendar";
import BarChart from "../components/charts/BarChart";
import StaticBox from "../components/static-box/StaticBox";
import APIClient from "../api/APIClient";
import Loading from "../components/loading/Loading";

export const HomePage = () => {
  const [selectStat, setSelectStat] = useState("owner");
  const [apiClient] = useState(() => new APIClient());
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState();
  const [departmentData, setDepartmentData] = useState();
  const [priorityData, setPriorityData] = useState();
  const [ownerD, setOwnerD] = useState();

  useEffect(() => {
    setLoading(true);
    apiClient.homeService
      .getAllData()
      .then((res) => {
        setStatusData({
          labels: res.data.facets[
            "a006520f657a093d428195c3e90f88d2-ticketStatus"
          ].facetValues?.map((d) => d.name),
          datasets: [
            {
              label: "Status",
              data: res.data.facets[
                "a006520f657a093d428195c3e90f88d2-ticketStatus"
              ].facetValues?.map((data) => data.count),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        });

        setPriorityData({
          labels: res.data.facets[
            "44afd627f7906b68cf6e73cb5c2f45c2-ticketPriority"
          ].facetValues?.map((d) => d.name),
          datasets: [
            {
              label: "Priority",
              data: res.data.facets[
                "44afd627f7906b68cf6e73cb5c2f45c2-ticketPriority"
              ].facetValues?.map((data) => data.count),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        });

        setDepartmentData({
          labels: res.data.facets[
            "d153ac4070bc83550ce78ff700b9ad56-productline"
          ].facetValues?.map((data) => data.name),
          datasets: [
            {
              label: "Department",
              data: res.data.facets[
                "d153ac4070bc83550ce78ff700b9ad56-productline"
              ].facetValues?.map((data) => data.count),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        });

        setOwnerD({
          labels: ownerData.map((d) => d.name),
          datasets: [
            {
              label: "Owner",
              data: ownerData.map((data) => data.count),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        })
      })
      .catch((err) => console.log(err.response.data));
    setLoading(false);
  }, [apiClient.homeService]);

  const handleChange = (event) => {
    setSelectStat(event.target.value);
  };
  return (
    <>
      <NavBar />
      {!loading && statusData ? (
        <>
          <div className="date-cont">
            <Calendar />
          </div>
          <div className="d-flex align-items-center justify-content-evenly mb-5 top-home">
            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#9A6324" }}
              onClick={() => setSelectStat("Owner")}
            >
              <BarChart
                chartData={ownerD}
                className="bar-chart"
                title={"Ticket status by Owner"}
              />
            </button>

            <button
              className="data-box-btn mt-5 align-center"
              style={{ borderColor: "#9A6324" }}
              onClick={() => setSelectStat("Product")}
            >
              <BarChart
                chartData={departmentData}
                className="bar-chart"
                title={"Ticket status by Department"}
              />
            </button>

            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#9A6324" }}
              onClick={() => setSelectStat("Status")}
            >
              <BarChart
                chartData={statusData}
                className="bar-chart"
                title={"Ticket status by Status"}
              />
            </button>

            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#9A6324" }}
              onClick={() => setSelectStat("Priority")}
            >
              <BarChart
                chartData={priorityData}
                className="bar-chart"
                title={"Ticket status by Priority"}
              />
            </button>
          </div>
          <div className="d-flex">
            <StaticBox
              heading={"What's new with entities"}
              content={
                <div className=" d-flex align-items-center chart-container">
                  <Form.Select
                    size="sm"
                    onChange={(event) => handleChange(event)}
                    value={selectStat}
                    className="select-btn"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Product">Product</option>
                    <option value="Status">Status</option>
                    <option value="Priority">Priority</option>
                  </Form.Select>
                  {selectStat === "Priority" ? (
                    <PieChart chartData={priorityData} className="pie-chart" />
                  ) : selectStat === "Status" ? (
                    <PieChart chartData={statusData} className="pie-chart" />
                  ) : selectStat === "Product" ? (
                    <PieChart
                      chartData={departmentData}
                      className="pie-chart"
                    />
                  ) : (
                    <PieChart chartData={ownerD} className="pie-chart" />
                  )}
                </div>
              }
            />
            <StaticBox
              heading={"Entity Table"}
              content={
                selectStat === "Priority" ? (
                  <DataView viewData={pData} table={selectStat} />
                ) : selectStat === "Status" ? (
                  <DataView viewData={sData} table={selectStat} />
                ) : selectStat === "Product" ? (
                  <DataView viewData={dData} table={selectStat} />
                ) : (
                  <DataView viewData={ownerData} table={selectStat} />
                )
              }
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
