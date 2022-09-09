import "./Calendar.css";
import { useState } from "react";

const Calendar = () => {
  var today = new Date();
  const [day, setDay] = useState(String(today.getDate()).padStart(2, "0"));
  const [month, setMonth] = useState(String(today.getMonth() + 1));

  const [isVisible, setisVisible] = useState(false);

  var yy = String(today.getFullYear());

  const handleDate = (event) => {
    if (event.target.value !== "") {
      setDay(String(event.target.value.split("-")[2]));
      setMonth(String(event.target.value.split("-")[1][1]));
    }
  };

  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="position-relative">
      <div
        className="cal m-3 mt-4 "
        onClick={() => setisVisible(!isVisible)}
        style={{ cursor: "pointer" }}
      >
        <div className="month">{monthNames[month]}</div>
        <div className="date">{day}</div>
      </div>
      {/* {isVisible ? ( */}
      <div className="d-flex justify-content-center align-items-center">
        <input
          type="date"
          value={yy + "-" + month.padStart(2, "0") + "-" + day}
          onChange={(e) => handleDate(e)}
          className="calendar position-absolute"
        />
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default Calendar;
