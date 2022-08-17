import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
const DataView = (props) => {
  return (
     <div className="table-container">
         {/* <span className="chart-text"><b>Table</b></span> */}
        <CSVLink data={props.viewData} target="_blank" filename={props.table + ".csv"} className="download-icon fa-lg">
            <FontAwesomeIcon icon={faDownload} /> 
        </CSVLink>
        <Table striped bordered hover size="sm">
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
                    <th>Unresolved</th>
            </tr>
            </thead>
            <tbody>
                {props.viewData.map((data)=>{
                    return(  
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        {props.table === "Priority" ? <td>{data.priority}</td> 
                    : (
                        props.table === "Status" ? <td>{data.status}</td>
                        : (
                            props.table === "Product" ? <td>{data.department}</td>
                            : <td>{data.owner}</td>
                        )
                    )
                    
                    }
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