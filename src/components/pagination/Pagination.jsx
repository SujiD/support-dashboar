import { Form, Row } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({ dataperPage, totalData, paginate, paginatePageSize }) => {
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
              className="page-link page-btn mx-2"
              onClick={() => paginate(1)}
              style={{ cursor: "pointer" }}
            >{`<<`}</li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className="page-link mx-1"
                onClick={() => paginate(number)}
                style={{ cursor: "pointer" }}
              >
                {number}
              </li>
            ))}
            <li
              className="page-link page-btn mx-2"
              onClick={() => paginate(lastPage)}
              style={{ cursor: "pointer" }}
            >{`>>`}</li>
          </ul>
        </nav>
      </Row>

      <Form.Select
        onChange={(event) => paginatePageSize(event.target.value)}
        className="select-btn"
      >
        <option value={3}>3 per page</option>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </Form.Select>
    </div>
  );
};

export default Pagination;
