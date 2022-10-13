import { Modal, Button, Accordion } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { updateTableCols } from "../../redux/tableMeta/tableAction";
import "./TicketPopup.css";
const TicketPopup = ({ showPopup, setShowPopup, allColumns }) => {
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
                            />
                            <label htmlFor={column.id}>
                              {column.Header.split("-")[1]}
                            </label>
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
                            />
                            <label htmlFor={column.id}>
                              {column.Header.split("-")[1]}
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
          style={{ borderColor: "#060b26" }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default TicketPopup;
