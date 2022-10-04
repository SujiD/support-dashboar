import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateTableCols } from "../../redux/tableMeta/tableAction";
import "./TicketPopup.css";
const TicketPopup = ({ showPopup, setShowPopup, Cols }) => {
  const tableCols = useSelector((state) => {
    return state.table;
  });
  const dispatch = useDispatch();

  const InactiveCols = tableCols.tableInactiveCols;

  const [activeCols, setActiveCols] = useState([]);
  useEffect(() => {
    setActiveCols(tableCols.tableActiveCols);
  }, [dispatch, activeCols]);

  const handleClick = (colName) => {};
  let testCols = ["test1", "test2"];

  return (
    <Modal size="lg" centered show={showPopup}>
      <Modal.Header>
        <Modal.Title>Table Layout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around">
          <div className="active-cols">
            <ul className="active-col-names">
              {activeCols?.map((col, i = 0) => {
                return (
                  <li key={i} className="active-names">
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                    />
                    <span>{col}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="available-cols">
            <Accordion className="acc">
              <Accordion.Item eventKey="0" className="acc-item">
                <Accordion.Header className="acc-header">
                  Ticket
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="available-col-names">
                    {InactiveCols.map((col, i = 0) => {
                      return (
                        <li
                          key={i}
                          className="available-names d-flex gap-1 align-items-center"
                          onClick={handleClick(col)}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ cursor: "pointer" }}
                          />
                          <span>{col.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="acc">
              <Accordion.Item eventKey="0" className="acc-item">
                <Accordion.Header className="acc-header">
                  Survey
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="available-col-names">
                    {testCols.map((col, i = 0) => {
                      return (
                        <li
                          key={i}
                          className="available-names d-flex gap-1 align-items-center"
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ cursor: "pointer" }}
                            // onClick={handleClick(col)}
                          />
                          <span>{col}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <Button
          onClick={() => {
            setShowPopup(false);
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default TicketPopup;
