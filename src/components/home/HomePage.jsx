import { NavBar } from "../nav-bar/NavBar";
import { useEffect, useState, useContext } from "react";
// import { ownerData } from "../Database/Data";
// import PieChart from "../components/charts/PieChart";
// import DataView from "../components/tables/DataView";
// import StaticBox from "../components/static-box/StaticBox";
import Calendar from "../calendar/Calendar";
import BarChart from "../charts/BarChart";
import APIClient from "../../api/APIClient";
import Loading from "../loading/Loading";
import * as FACET_VALUES from '../../common/Values'
import { ErrorContext } from "../../contexts/ErrorContext";
import { useDispatch } from "react-redux";
import { fetchFacetsSuccess } from "../../redux/facet/facetActions";
import CustomizedTable from "../tables/CustomizedTable";
import { useMemo } from "react";
import { fetchPageDataSuccess } from "../../redux/page/pageActions";
import {
  fetchRuntimeSuccess,
  fetchRuntimeUpdate,
} from "../../redux/runtime/runtimeActions";

export const HomePage = () => {
  const reqBody = useMemo(
    () => ({
      appPath: "Report",
      q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
      start: "1",
      view: "all",
    }),
    []
  );
  // const [selectStat, setSelectStat] = useState("owner");
  const [apiClient] = useState(() => new APIClient());
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState();
  const [departmentData, setDepartmentData] = useState();
  const [priorityData, setPriorityData] = useState();
  const [initialFacets, setInitialFacets] = useState([]);
  // const [ownerD, setOwnerD] = useState();
  const { setError } = useContext(ErrorContext);
  // const facets = useSelector((state) => {
  //   return state.facet.facets;
  // });
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        sessionStorage.setItem("count", 1);
        dispatch(
          fetchPageDataSuccess({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.ceil(res.data.total / res.data["page-length"]),
            next: 1,
            prev: 1,
            start: res.data.start,
          })
        );
        setInitialFacets(res.data.facets);
        setStatusData({
          labels: res.data.facets[FACET_VALUES.STATUS]?.facetValues?.map((d) => d.name),
          datasets: [
            {
              label: "Status",
              data: res.data.facets[FACET_VALUES.STATUS]?.facetValues?.map(
                (data) => data.count
              ),
              backgroundColor: ["#ff984e"],
              borderColor: ["#ff984e"],
              borderWidth: 1,
            },
          ],
        });
        setPriorityData({
          labels: res.data.facets[FACET_VALUES.PRIORITY]?.facetValues?.map(
            (d) => d.name
          ),
          datasets: [
            {
              label: "Priority",
              data: res.data.facets[FACET_VALUES.PRIORITY]?.facetValues?.map(
                (data) => data.count
              ),
              backgroundColor: ["#42d4f4"],
              borderColor: ["#42d4f4"],
              borderWidth: 1,
            },
          ],
        });
        setDepartmentData({
          labels: res.data.facets[FACET_VALUES.DEPARTMENT]?.facetValues?.map(
            (data) => data.name
          ),
          datasets: [
            {
              label: "Department",
              data: res.data.facets[FACET_VALUES.DEPARTMENT]?.facetValues?.map(
                (data) => data.count
              ),
              backgroundColor: ["#f5d881"],
              borderColor: ["#f5d881"],
              borderWidth: 1,
            },
          ],
        });
        // setOwnerD({
        //   labels: res.data.facets[FACET_VALUES.OWNER].facetValues?.map(
        //     (data) => data.name
        //   ),
        //   datasets: [
        //     {
        //       label: "Owner",
        //       data: res.data.facets[FACET_VALUES.OWNER].facetValues?.map(
        //         (data) => data.count
        //       ),
        //       backgroundColor: ["#70d8c1"],
        //       borderColor: ["#70d8c1"],
        //       borderWidth: 1,
        //     },
        //   ],
        // });
        dispatch(fetchFacetsSuccess(res.data));
        dispatch(fetchRuntimeSuccess(res.data));
        dispatch(fetchRuntimeUpdate(res.data));
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err.response.data);
      });
    setLoading(false);
  }, [apiClient.entityService, dispatch, setError, reqBody]);

  return (
    <>
      <NavBar />
      {!loading && statusData && departmentData && priorityData ? (
        <>
          <div className="date-cont">
            <Calendar />
          </div>
          <div className="d-flex align-items-center justify-content-evenly mb-5 top-home">
            {/* <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#70d8c1" }}
              // onClick={() => setSelectStat("Owner")}
            >
              <BarChart
                chartData={ownerData}
                className="bar-chart"
                title={"Ticket status by Owner"}
              />
            </button> */}

            <button
              className="data-box-btn mt-5 align-center"
              style={{ borderColor: "#f5d881" }}
              // onClick={() => setSelectStat("Department")}
            >
              <BarChart
                chartData={departmentData}
                className="bar-chart"
                title={"Ticket status by Department"}
              />
            </button>

            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#ff984e" }}
              // onClick={() => setSelectStat("Status")}
            >
              <BarChart
                chartData={statusData}
                className="bar-chart"
                title={"Ticket status by Status"}
              />
            </button>

            <button
              className="data-box-btn mt-5"
              style={{ borderColor: "#42d4f4" }}
              // onClick={() => setSelectStat("Priority")}
            >
              <BarChart
                chartData={priorityData}
                className="bar-chart"
                title={"Ticket status by Priority"}
              />
            </button>
          </div>
          {/* <div className="d-flex">
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
                    <PieChart chartData={ownerData} className="pie-chart" />
                  )}
                </div>
              }
            />
          </div> */}
          <CustomizedTable
            loading={loading}
            setLoading={setLoading}
            initialFacets={initialFacets}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
