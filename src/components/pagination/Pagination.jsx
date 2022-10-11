import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({ dataperPage, totalData, paginate, paginatePageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];
  const lastPage = Math.ceil(totalData / dataperPage);
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-evenly align-items-center">
      <Row>
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination align-items-center">
            <li
              className={
                currentPage !== 1 ? "main-btn mx-2" : "disable-btn mx-2"
              }
              onClick={() => {
                setCurrentPage(1);
                paginate(1);
              }}
              style={{ cursor: "pointer" }}
            >{`<<`}</li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={
                  currentPage !== number ? "main-btn mx-1" : "disable-btn mx-1"
                }
                onClick={() => {
                  setCurrentPage(number);
                  paginate(number);
                }}
                style={{ cursor: "pointer" }}
              >
                {number}
              </li>
            ))}
            <li
              className={
                currentPage !== lastPage ? "main-btn mx-2" : "disable-btn mx-2"
              }
              onClick={() => {
                setCurrentPage(lastPage);
                paginate(lastPage);
              }}
              style={{ cursor: "pointer" }}
            >{`>>`}</li>
          </ul>
        </nav>
      </Row>

      <Form.Select
        onChange={(event) => paginatePageSize(event.target.value)}
        className="select-btn"
      >
        <option value={3}>Show 3</option>
        <option value={5}>Show 5</option>
        <option value={10}>Show 10</option>
        <option value={20}>Show 20</option>
      </Form.Select>
    </div>
  );
};

export default Pagination;
