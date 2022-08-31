import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
const DataView = (props) => {
  return (
     <div className="table-container">
        <CSVLink data={props.viewData} target="_blank" filename={props.table + ".csv"} className="download-icon fa-lg">
            <FontAwesomeIcon icon={faDownload} /> 
        </CSVLink>
        <Table striped bordered hover size="sm" className="table">
            <thead>
            <tr>
                    <th>ID</th>
                    {props.table === "Priority" ? <th>Priority</th> 
                    : (
                        props.table === "Status" ? <th>Status</th>
                        : (
                            props.table === "Product" ? <th>Department</th>
                            : <th>Owner</th>
                        )
                    )
                    
                    }
                    <th>Count</th>
            </tr>
            </thead>
            <tbody>
                {props.viewData.map((data, i=0)=>{
                    return(  
                    <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.count}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>
   
  )
}

export default DataView;