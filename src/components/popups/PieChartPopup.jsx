import { Modal, Button } from "react-bootstrap";
import PieChart from "../charts/PieChart";
const PieChartPopup = ({ size, facetData, setShowPopup, showPopup, title }) => {
  let heading = title.split("-")[1];
  let id = title.split("-")[0];
  return (
    <Modal centered size={size} show={showPopup}>
      <Modal.Header>
        <h1 className="w-100 text-center">
          {heading && heading.charAt(0).toUpperCase() + heading.slice(1)}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <PieChart chartData={facetData} facetId={id} />
        </div>
        <Button
          onClick={() => setShowPopup(false)}
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

export default PieChartPopup;
