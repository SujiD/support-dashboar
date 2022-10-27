import { Modal, Button, Spinner } from "react-bootstrap";
import PieChart from "../charts/PieChart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIClient from "../../api/APIClient";
import { fetchFacetsUpdate } from "../../redux/facet/facetActions";
import { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";

const PieChartPopup = ({
  size,
  facetData,
  setShowPopup,
  showPopup,
  title,
  setLoading,
  loading,
}) => {
  const [showUpdate, setShowUpdate] = useState(true);
  const { setError } = useContext(ErrorContext);
  const [apiClient] = useState(() => new APIClient());

  const dispatch = useDispatch();
  const facets = useSelector((state) => {
    return state.facet.facets;
  });
  let heading = title.split("-")[1];
  let reqBody = {
    appPath: "Report",
    q: "0ca72f154fc71e0bc6fa75772b925e7c-reportType:survey",
    start: "1",
    view: "all",
  };

  const handleUpdate = () => {
    setLoading(true);
    // setRefresh(!refresh);
    setShowUpdate(true);
    reqBody.facets = facets.facets;
    apiClient.entityService
      .getAllSearchData(reqBody)
      .then((res) => {
        dispatch(fetchFacetsUpdate(res.data));
        setLoading(false);
        setShowPopup(true);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <Modal centered size={size} show={showPopup}>
      <Modal.Header>
        <h1 className="w-100 text-center">
          {heading && heading.charAt(0).toUpperCase() + heading.slice(1)}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          {!loading ? (
            <PieChart
              chartData={facetData}
              facetId={title}
              setShowUpdate={setShowUpdate}
            />
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </div>
        <Button
          onClick={() => {
            setShowPopup(false);
          }}
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
          onClick={() => handleUpdate()}
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
