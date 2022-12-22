import { Row, Col } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

const TicketInfo = ({ ticketInfo }) => {
  return (
    <div className="px-5">
      <Row>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Name:</th>
                <td className="ps-4 pb-3 align-top">{ticketInfo.ticketName}</td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Full Name:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketCreator.fullName ||
                  ticketInfo.ticketCreator.fullName !== ""
                    ? ticketInfo.ticketCreator.fullName
                    : "No Name"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Owner:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketOwner.fullName ||
                  ticketInfo.ticketOwner.fullName !== ""
                    ? ticketInfo.ticketOwner.fullName
                    : "No Owner Name"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Customer:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketCustomer.organizationName ||
                  ticketInfo.ticketCustomer.organizationName !== ""
                    ? ticketInfo.ticketCustomer.organizationName
                    : "No Customer Name"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket End Customer:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketEndCustomer.organizationName ||
                  ticketInfo.ticketEndCustomer.organizationName !== ""
                    ? ticketInfo.ticketEndCustomer.organizationName
                    : "No End Customer Name"}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Title:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketTitle || ticketInfo.ticketTitle !== ""
                    ? ticketInfo.ticketTitle
                    : "No Title"}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top"> Ticket Priority:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketPriority}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">Ticket Status:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.ticketStatus}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col sm={12} md={4}>
          <table>
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Meta Product Line:</th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.meta.productline}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">
                  <BsIcons.BsCalendarDate /> Date Created:
                </th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.creationtime}
                </td>
              </tr>
              <tr className="pb-4">
                <th className="pb-3 align-top">
                  <BsIcons.BsCalendarDate /> Date Modified:
                </th>
                <td className="ps-4 pb-3 align-top">
                  {ticketInfo.modifiedtime}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default TicketInfo;
