import { Table } from "react-bootstrap";
import tableMeta from "../../Database/table-meta.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import TicketPopup from "../popups/TicketPopup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchTableCols,
  fetchTableReq,
} from "../../redux/tableMeta/tableAction";

const CustomizedTable = () => {
  const cols = tableMeta.results[0].applicationTable.dataFields;
  const ticketCols = cols.filter(
    (data) => data.field.split(".")[0] === "ticket"
  );
  const surveyCols = cols.filter(
    (data) => data.field.split(".")[0] === "survey"
  );
  const [showTicketPopup, setshowTicketPopup] = useState(false);
  const tableCols = useSelector((state) => {
    return state.table;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTableReq());
    dispatch(fetchTableCols(ticketCols));
  }, [dispatch]);

  // console.log(tableCols.tableInactiveCols);
  return (
    <>
      <FontAwesomeIcon
        icon={faGear}
        className="fa-2x"
        onClick={() => {
          setshowTicketPopup(true);
        }}
        style={{ cursor: "pointer" }}
      />
      <Table striped className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
      <TicketPopup
        showPopup={showTicketPopup}
        setShowPopup={setshowTicketPopup}
        Cols={tableCols.tableInactiveCols}
      />
    </>
  );
};

export default CustomizedTable;
