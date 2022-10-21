import { Modal, Button } from "react-bootstrap";
import PieChart from "../charts/PieChart";
import { useState } from "react";
import { useSelector } from "react-redux";
const PieChartPopup = ({ size, facetData, setShowPopup, showPopup, title }) => {
  const facets = useSelector((state) => {
    return state.facet.facets;
  });
  let heading = title.split("-")[1];
  const [showUpdate, setShowUpdate] = useState(true);
  return (
    <Modal centered size={size} show={showPopup}>
      <Modal.Header>
        <h1 className="w-100 text-center">
          {heading && heading.charAt(0).toUpperCase() + heading.slice(1)}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <PieChart
            chartData={facetData}
            facetId={title}
            setShowUpdate={setShowUpdate}
          />
        </div>
        <Button
          onClick={() => setShowPopup(false)}
          style={{
            backgroundColor: "#060b26",
            borderColor: "#060b26",
            float: "right",
          }}
          className="mx-3"
        >
          Close
        </Button>
        <Button
          onClick={() => {
            console.log("Updated Data", facets);
            setShowPopup(false);
            setShowUpdate(true);
          }}
          disabled={showUpdate}
          style={{
            backgroundColor: "#060b26",
            borderColor: "#060b26",
            float: "right",
          }}
        >
          Update
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PieChartPopup;
