import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import "./DataView.css";

const DataView = (props) => {
  const [pageSize, setPageSize] = useState(3); // initial value is three
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(props.viewData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPaginatedData(props.viewData);
    setLoading(false);
  }, [props, currentPage]);

  const indexOfLastData = currentPage * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = paginatedData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeSize = (size) => setPageSize(size);

  return (
    <>
      {!loading ? (
        <div className="table-container">
          <CSVLink
            data={props.viewData}
            target="_blank"
            filename={props.table + ".csv"}
            className="download-icon fa-lg mb-3 "
          >
            Export <FontAwesomeIcon icon={faDownload} />
          </CSVLink>
          <Table size="sm" className="react-table">
            <thead>
              <tr>
                <th>ID</th>
                {props.table === "Priority" ? (
                  <th>Priority</th>
                ) : props.table === "Status" ? (
                  <th>Status</th>
                ) : props.table === "Department" ? (
                  <th>Department</th>
                ) : (
                  <th>Owner</th>
                )}
                <th>Number of Tickets</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((data, i = 0) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
            dataperPage={pageSize}
            totalData={paginatedData.length}
            paginate={paginate}
            paginatePageSize={changeSize}
          />
        </div>
      ) : (
        <div className="center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
  );
};

export default DataView;
