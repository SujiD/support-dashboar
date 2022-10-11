import { NavBar } from "../components/nav-bar/NavBar";
import { useEffect, useState, useContext } from "react";
import { ownerData, colors } from "../Database/Data";
import PieChart from "../components/charts/PieChart";
import DataView from "../components/tables/DataView";
import { Form } from "react-bootstrap";
import Calendar from "../components/calendar/Calendar";
import BarChart from "../components/charts/BarChart";
import StaticBox from "../components/static-box/StaticBox";
import APIClient from "../api/APIClient";
import Loading from "../components/loading/Loading";
import IDs from "../common/values";
import { ErrorContext } from "../contexts/ErrorContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFacetsReq,
  fetchFacetsSuccess,
} from "../redux/facet/facetActions";
import CustomizedTable from "../components/tables/CustomizedTable";
import { fetchTableCols } from "../redux/tableMeta/tableAction";

export const HomePage = () => {
  const [selectStat, setSelectStat] = useState("owner");
  const [apiClient] = useState(() => new APIClient());
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState();
  const [departmentData, setDepartmentData] = useState();
  const [priorityData, setPriorityData] = useState();
  const [ownerD, setOwnerD] = useState();
  const { setError } = useContext(ErrorContext);
  const facets = useSelector((state) => {
    return state.facet.facets;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchFacetsReq());
    apiClient.entityService
      .getAllSearchData()
      .then((res) => {
        setStatusData({
          labels: res.data.facets[IDs.status].facetValues?.map((d) => d.name),
          datasets: [
            {
              label: "Status",
              data: res.data.facets[IDs.status].facetValues?.map(
                (data) => data.count
              ),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        });
        dispatch(fetchFacetsSuccess(res.data.facets));
        dispatch(fetchTableCols(res.data.results));
        setPriorityData({
          labels: res.data.facets[IDs.priority].facetValues?.map((d) => d.name),
          datasets: [
            {
              label: "Priority",
              data: res.data.facets[IDs.priority].facetValues?.map(
                (data) => data.count
              ),
              backgroundColor: colors.map((color) => color),
              borderColor: colors.map((color) => color),
              borderWidth: 1,
            },
          ],
        });

        setDepartmentData({
          labels: res.data.facets[IDs.department].facetValues?.map(
            (data) => data.name
          ),
          datasets: [
            {
              label: "Department",
              data: res.data.facets[IDs.department].facetValues?.map(
                (data) => data.count
              ),
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
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err.response.data);
      });
    setLoading(false);
  }, [apiClient.entityService, dispatch, setError]);

  // console.log(statusFacets);
  const handleChange = (event) => {
    setSelectStat(event.target.value);
  };
  return (
    <>
      <NavBar />
      {!loading && statusData && departmentData && priorityData ? (
        <>
          <div className="date-cont">
            <Calendar />
          </div>
          <div className="d-flex align-items-center justify-content-evenly mb-5 top-home">
            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#060b26" }}
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
              style={{ borderColor: "#060b26" }}
              onClick={() => setSelectStat("Department")}
            >
              <BarChart
                chartData={departmentData}
                className="bar-chart"
                title={"Ticket status by Department"}
              />
            </button>

            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#060b26" }}
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
              style={{ borderColor: "#060b26" }}
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
                    <option value="Department">Department</option>
                    <option value="Status">Status</option>
                    <option value="Priority">Priority</option>
                  </Form.Select>
                  {selectStat === "Priority" ? (
                    <PieChart chartData={priorityData} className="pie-chart" />
                  ) : selectStat === "Status" ? (
                    <PieChart chartData={statusData} className="pie-chart" />
                  ) : selectStat === "Department" ? (
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
                  <DataView
                    viewData={facets[IDs.priority].facetValues}
                    table={selectStat}
                  />
                ) : selectStat === "Status" ? (
                  <DataView
                    viewData={facets[IDs.status].facetValues}
                    table={selectStat}
                  />
                ) : selectStat === "Department" ? (
                  <DataView
                    viewData={facets[IDs.department].facetValues}
                    table={selectStat}
                  />
                ) : (
                  <DataView viewData={ownerData} table={selectStat} />
                )
              }
            />
          </div>
          <CustomizedTable />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
