import "./Calendar.css";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-calendar/dist/Calendar.css";
import * as FaIcons from "react-icons/fa";
import APIClient from "../../api/APIClient";
import Calendar from "react-calendar";
import { ErrorContext } from "../../contexts/ErrorContext";
import { fetchPageDataSuccess } from "../../redux/page/pageActions";
import { fetchFacetsUpdate } from "../../redux/facet/facetActions";
import { updateSearch } from "../../redux/runtime/runtimeActions";

const CustomCalendar = ({ setLoading }) => {
  var today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [apiClient] = useState(() => new APIClient());
  const { setError } = useContext(ErrorContext);
  const dispatch = useDispatch();

  const runtimeResults = useSelector((state) => {
    return state.runtime.results;
  });

  const pageStoreData = useSelector((state) => {
    return state.pageData;
  });

  const runtimeSearch = useSelector((state) => {
    return state.runtime.search;
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
    const startDate = `${date[0].getFullYear()}-${(
      "0" + date[0].getDate()
    ).slice(-2)}-${("0" + (date[0].getMonth() + 1)).slice(-2)}T00:00:00Z`;
    const finishDate = `${date[1].getFullYear()}-${(
      "0" + date[1].getDate()
    ).slice(-2)}-${("0" + (date[1].getMonth() + 1)).slice(-2)}T00:00:00Z`;

    const newSearch = `93803cbe97e2b0a38b39c3f2016cfef5-creationtime GT ${startDate} AND 93803cbe97e2b0a38b39c3f2016cfef5-creationtime LT ${finishDate}`;
    reqBody.q += ` AND ${newSearch}`;
    dispatch(updateSearch({ value: newSearch, type: "date" }));
    reqBody.facets = runtimeResults.facets;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(fetchFacetsUpdate(res.data));
        dispatch(
          fetchPageDataSuccess({
            pageSize: res.data["page-length"],
            totalLength: res.data.total,
            numOfPages: Math.ceil(res.data.total / res.data["page-length"]),
            next: runtimeSearch.value === newSearch ? pageStoreData.next : 1,
            prev: runtimeSearch.value === newSearch ? pageStoreData.next : 1,
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
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <div className="position-relative">
        <div className="d-flex flex-column">
          <div
            className="cal m-3 mt-4"
            role="button"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {date.length > 0 ? (
              <>
                <div className="month">{`${
                  monthNames[date[0].getMonth()]
                }, ${date[0].getFullYear().toString().slice(2, 5)} - ${
                  monthNames[date[1].getMonth()]
                }, ${date[1].getFullYear().toString().slice(2, 5)}`}</div>
                <div className="date">{`${date[0].getDate()}-${date[1].getDate()}`}</div>
              </>
            ) : (
              <>
                <div className="month">{monthNames[month - 1]}</div>
                <div className="date">{day}</div>
              </>
            )}
          </div>
          {date.length > 0 ? (
            <button className="main-btn" onClick={() => handleDateSearch()}>
              Search <FaIcons.FaSearch size={25} />
            </button>
          ) : (
            <></>
          )}
        </div>
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
    </>
  );
};

export default CustomCalendar;
