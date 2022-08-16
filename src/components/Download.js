import { CSVLink } from "react-csv";
import { DepartmentData} from "../Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export const Download = () => {
  return (
    <CSVLink data={DepartmentData} target="_blank" filename="table.csv" className="download-icon fa-lg">
        <FontAwesomeIcon icon={faDownload} /> 
    </CSVLink>
  )
}
