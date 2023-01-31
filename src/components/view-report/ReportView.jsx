import { Modal, Tab, Tabs, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import MainInfo from "../main-info/MainInfo";
import TicketInfo from "../ticket-info/TicketInfo";
import SurveyInfo from "../../survey-info/SurveyInfo";
import APIClient from "../../api/APIClient";
import "./ReportView.css";

const ReportView = ({  size, showPopup, setShowPopup, ticketID }) => {

  const [results, setResults] = useState();
  const [ticketData, setTicketData] = useState();
  const [surveyData, setSurveyData] = useState();
  const [loading, setLoading] = useState();
  const [apiClient] = useState(() => new APIClient());

  useEffect(() => {
    let reqBody = {
      appPath: "Report",
      q: `a1ef37e156073017195a56fc74ad0ba0-ticketId:${ticketID}`,
      start: "1",
      view: "all",
    };
    if (ticketID) {
      setLoading(true);
      apiClient.entityService
        .getAllSearchData(reqBody)
        .then((res) => {
          setResults(res.data.results);
          res.data.results.forEach((report) => {
            if (report.reportType === "issue") setTicketData(report.ticket);
            if (report.reportType === "survey") setSurveyData(report.survey);
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [ticketID, apiClient.entityService]);

  return (
    results && (
      <>
        <Modal centered size={size} show={showPopup} fullscreen='lg-down'>
          <Modal.Header>Report View</Modal.Header>
          <Modal.Body>
            {results && ticketData && surveyData && !loading ? (
              <>
                <MainInfo
                  info={results[0]?.reportCreator}
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
                      {ticketData.length > 0 ? (
                        <p>No Ticket Details</p>
                      ) : (
                        <TicketInfo ticketInfo={ticketData} />
                      )}
                    </div>
                  </Tab>
                  <Tab
                    eventKey="survey-elements"
                    title="Survey Details"
                    tabClassName="bootstrap-single-tab mx-4"
                  >
                    <div className="bootstrap-tab-content">
                      {surveyData?.length > 0 ? (
                        <p>No Survey Details</p>
                      ) : (
                        <SurveyInfo surveyInfo={surveyData} />
                      )}
                    </div>
                  </Tab>
                  <Tab
                    eventKey="summary-elements"
                    title="Summary Details"
                    tabClassName="bootstrap-single-tab"
                  >
                    <div>No Summary Details Yet</div>
                  </Tab>
                </Tabs>
              </>
            ) : (
              <Spinner />
            )}
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
