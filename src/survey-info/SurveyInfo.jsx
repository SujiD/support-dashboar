import { Row, Col } from "react-bootstrap";
import {capitalizeFirstLetter} from "../common/Helper";

const SurveyInfo = ({ surveyInfo }) => {
  return (
    <div className="px-5">
      <Row>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Resolution Did:</th>
                <td className="ps-4 pb-3 align-top">
                  {capitalizeFirstLetter(surveyInfo.resolutionDid)}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Resolution What:</th>
                <td className="ps-4 pb-3 align-top">
                  {capitalizeFirstLetter(surveyInfo.resolutionWhat)}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Resolution Who:</th>
                <td className="ps-4 pb-3 align-top">
                  {capitalizeFirstLetter(surveyInfo.resolutionWho)}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Resolution Comment:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.resolutionComment ||
                  surveyInfo.resolutionComment !== ""
                    ? (surveyInfo.resolutionComment)
                    : "No Resolution Comments"}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Collateral Available:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.collateralAvailable ||
                  surveyInfo.collateralAvailable !== ""
                    ? capitalizeFirstLetter(surveyInfo.collateralAvailable)
                    : "No Collateral Available"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Collateral Comment:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.collateralComment ||
                  surveyInfo.collateralComment !== ""
                    ? capitalizeFirstLetter(surveyInfo.collateralComment)
                    : "No Comments"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Functionality:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.functionality || surveyInfo.functionality !== ""
                    ? capitalizeFirstLetter(surveyInfo.functionality)
                    : "No Functionality"}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Complete:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.ticketComplete || surveyInfo.ticketComplete !== ""
                    ? capitalizeFirstLetter(surveyInfo.ticketComplete)
                    : "No"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Shipment Details Comment:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.shipmentDetailsComment ||
                  surveyInfo.shipmentDetailsComment !== ""
                    ? capitalizeFirstLetter(surveyInfo.shipmentDetailsComment)
                    : "No Comments"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Shipment Details Complete:</th>
                <td className="ps-4 pb-3 align-top">
                  {surveyInfo.shipmentDetailsComplete ||
                  surveyInfo.shipmentDetailsComplete !== ""
                    ? capitalizeFirstLetter(surveyInfo.shipmentDetailsComplete)
                    : "No Complete Details"}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default SurveyInfo;
