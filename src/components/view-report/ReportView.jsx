import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../nav-bar/NavBar";
import MainInfo from "../main-info/MainInfo";
import { Tab, Tabs } from "react-bootstrap";
import TicketInfo from "../ticket-info/TicketInfo";
import * as ROUTES from "../../common/routes";
import "./ReportView.css";

const ReportView = () => {
  const { viewID } = useParams();
  let navigate = useNavigate();
  const originalViewData = useSelector((state) => {
    return state.facet.facets.results;
  });

  const viewData = useMemo(() => {
    return originalViewData.filter((data) => data.id === viewID)[0];
  }, [originalViewData, viewID]);

  console.log(viewData);

  return (
    <>
      <NavBar />
      <div className="p-5">
        <p
          className="link"
          role="button"
          onClick={() => navigate(`${ROUTES.HOME}`)}
        >
          {"<"} Back to HomePage
        </p>
        <h1 className="heading">Report View</h1>
      </div>
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
            <TicketInfo ticketInfo={viewData.ticket} />
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default ReportView;
