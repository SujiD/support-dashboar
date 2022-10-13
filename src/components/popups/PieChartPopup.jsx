import { Modal, Button } from "react-bootstrap";
import PieChart from "../charts/PieChart";
const PieChartPopup = ({ size, facetData, setShowPopup, showPopup }) => {
  return (
    <Modal centered size={size} show={showPopup}>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <PieChart chartData={facetData} />
        </div>
        <Button
          onClick={() => setShowPopup(false)}
          style={{ backgroundColor: "#060b26", borderColor: "#060b26" }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PieChartPopup;
