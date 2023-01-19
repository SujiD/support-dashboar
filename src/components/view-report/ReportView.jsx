import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Modal, Tab, Tabs, Button } from "react-bootstrap";
import MainInfo from "../main-info/MainInfo";
import TicketInfo from "../ticket-info/TicketInfo";
import SurveyInfo from "../../survey-info/SurveyInfo";
import "./ReportView.css";

const ReportView = ({ viewID, size, showPopup, setShowPopup }) => {
  const originalViewData = useSelector((state) => {
    return state.facet.facets.results;
  });

  const viewData = useMemo(() => {
    return originalViewData.filter((data) => data.id === viewID)[0];
  }, [originalViewData, viewID]);

  return (
    viewData && (
      <>
        <Modal centered size={size} show={showPopup}>
          <Modal.Header>Report View</Modal.Header>
          <Modal.Body>
            <>
              <MainInfo
                info={viewData.reportCreator}
                reportType={viewData.reportType}
              />
              <Tabs
                defaultActiveKey="ticket-elements"
                className="mb-3 bootstrap-tab-container mt-5"
              >
                <Tab
                  eventKey="ticket-elements"
                  title="Ticket Details"
                  tabClassName="bootstrap-single-tab mx-4"
                >
                  <div className="bootstrap-tab-content">
                    <TicketInfo ticketInfo={viewData.ticket} />
                  </div>
                </Tab>
                <Tab
                  eventKey="survey-elements"
                  title="Survey Details"
                  tabClassName="bootstrap-single-tab"
                >
                  <div className="bootstrap-tab-content">
                    <SurveyInfo surveyInfo={viewData.survey} />
                  </div>
                </Tab>
              </Tabs>
            </>
          </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default ReportView;
