// {chartData, index}
import { useState } from "react";
import { DepartmentData } from "../Data";
import { Table } from "react-bootstrap";
import { Download } from "../components/Download";
const DataView = () => {
    // console.log(chartData.datasets);
    const [dept, setDept] = useState(DepartmentData);
  return (
    <Table striped bordered hover size="sm">
        <thead>
            <Download />
           <tr>
                <th>ID</th>
                <th>Department</th>
                <th>Unresolved</th>
           </tr>
        </thead>
        <tbody>
            {dept.map((data)=>{
                return(  
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.department}</td>
                    <td>{data.unresolved}</td>
                </tr>
                )
            })}
        </tbody>
    </Table>
  )
}

export default DataView;