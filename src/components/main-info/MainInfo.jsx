import { Row, Col } from "react-bootstrap";

const MainInfo = ({ info }) => {
  return (
    <div className="px-5">
      <Row>
        <Col sm={12} md={4}>
          <table className="text">
            <tbody>
              <tr className="pb-4">
                <th className="pb-3 align-top">Creator Full Name:</th>
                <td className="ps-4 pb-3 align-top">{info?.fullName}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default MainInfo;
