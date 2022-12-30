import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import APIClient from "../../api/APIClient";
import Loading from "../loading/Loading";
import { ErrorContext } from "../../contexts/ErrorContext";
import { fetchPageDataSuccess } from "../../redux/page/pageActions";
import { fetchFacetsUpdate } from "../../redux/facet/facetActions";

const CustomCalendar = ({ setLoading, loading }) => {
  const [date, setDate] = useState(new Date());
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const runtimeResults = useSelector((state) => {
    return state.runtime.results;
  });

  const pageStoreData = useSelector((state) => {
    return state.pageData;
  });

  let reqBody = {
    appPath: "Report",
    q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
    start: "1",
    view: "all",
  };

  const handleDateSearch = () => {
    setLoading(true);
    setShowCalendar(false);

    console.log(date[0].getDay());
    const startDate = `${date[0].getFullYear()}-${(
      "0" + date[0].getDate()
    ).slice(-2)}-${("0" + (date[0].getMonth() + 1)).slice(-2)}T00:00:00Z`;
    const finishDate = `${date[1].getFullYear()}-${(
      "0" + date[1].getDate()
    ).slice(-2)}-${("0" + (date[1].getMonth() + 1)).slice(-2)}T00:00:00Z`;

    reqBody[
      "q"
    ] += ` AND 93803cbe97e2b0a38b39c3f2016cfef5-creationtime GT ${startDate} AND 93803cbe97e2b0a38b39c3f2016cfef5-creationtime LT ${finishDate}`;
    reqBody.facets = runtimeResults.facets;
    console.log(reqBody);
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(fetchFacetsUpdate(res.data));
        dispatch(
          fetchPageDataSuccess({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.ceil(res.data.total / res.data["page-length"]),
            next: pageStoreData.next,
            prev: pageStoreData.prev,
            start: res.data.start,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return !loading ? (
    <div className="calendar-container mt-5">
      <div className="d-flex calendar-body flex-column date-container justify-content-evenly">
        <div className="date-text text-center mb-2">Select Date Range</div>
        <div className="d-flex align-items-center justify-content-between align-items-center">
          <div className="range-container">
            {date.length > 0 ? (
              <>
                <div className="start-container d-flex align-items-center justify-content-between">
                  <span className="container-date-text">Start Date:</span>
                  <span className="start-container-date">
                    {date[0].toDateString()}
                  </span>
                </div>
                <div className="finish-container d-flex align-items-center justify-content-between mt-3">
                  <span className="container-date-text">Finish Date:</span>
                  <span className="finish-container-date">
                    {date[1].toDateString()}
                  </span>
                </div>
              </>
            ) : (
              <div className="start-container d-flex align-items-center justify-content-between">
                <span className="container-date-text">Date:</span>
                <span className="start-container-date">
                  {date.toDateString()}
                </span>
              </div>
            )}
          </div>
          <FcIcons.FcCalendar
            size={40}
            onClick={() => setShowCalendar(!showCalendar)}
            role="button"
          />
        </div>
        <button
          className={`search-date mt-3 ${
            date.length > 0 ? "main-btn" : "disable-btn"
          }`}
          disabled={!(date.length > 0)}
          onClick={() => handleDateSearch()}
        >
          Search Date <FaIcons.FaSearch />
        </button>
      </div>
      {showCalendar ? (
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          maxDate={new Date()}
          minDetail="year"
          className="position-absolute custom-cal"
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default CustomCalendar;
