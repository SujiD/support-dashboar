// import { useEffect } from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addRuntimeHiddenCols,
  removeRuntimeHiddenCols,
} from "../../redux/runtime/runtimeActions";
import "./TicketPopup.css";
const TicketPopup = ({ showPopup, setShowPopup, allColumns }) => {
  const dispatch = useDispatch();
  const updateHiddenCols = (e, columnId) => {
    if (!e.target.checked) {
      dispatch(addRuntimeHiddenCols(columnId));
    } else {
      dispatch(removeRuntimeHiddenCols(columnId));
    }
  };
  return (
    <Modal size="lg" centered show={showPopup}>
      <Modal.Header>
        <Modal.Title>Table Layout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="available-cols d-flex align-items-center justify-content-around mb-5">
          <Accordion className="acc" defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="acc-item">
              <Accordion.Header className="acc-header">Ticket</Accordion.Header>
              <Accordion.Body className="acc-body">
                <ul className="active-col-names">
                  {allColumns
                    .filter((column) => column.id.split(".")[0] !== "survey")
                    .map((column) => {
                      return (
                        <li key={column.id} className="active-li">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id={column.id}
                              {...column.getToggleHiddenProps()}
                              onClick={(e) => updateHiddenCols(e, column.id)}
                            />
                            <label htmlFor={column.id}>{column.Header}</label>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="acc" defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="acc-item">
              <Accordion.Header className="acc-header">Survey</Accordion.Header>
              <Accordion.Body className="acc-body">
                <ul className="active-col-names">
                  {allColumns
                    .filter((column) => column.id.split(".")[0] === "survey")
                    .map((column) => {
                      return (
                        <li key={column.id} className="active-li">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id={column.id}
                              {...column.getToggleHiddenProps()}
                              onClick={(e) => updateHiddenCols(e, column.id)}
                            />
                            <label
                              htmlFor={column.id}
                              // onClick={() =>
                              //   dispatch(
                              //     updateRuntimeHiddenCols(getCurrentHiddenCols())
                              //   )
                              // }
                            >
                              {column.Header}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <Button
          className="main-btn ms-3"
          onClick={() => {
            setShowPopup(false);
          }}
          style={{
            backgroundColor: "#060b26",
            borderColor: "#060b26",
            float: "right",
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default TicketPopup;
