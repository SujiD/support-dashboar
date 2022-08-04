import { DataBox } from "../components/Data-Box/DataBox"
import { NavBar } from "../components/NavBar"
export const HomePage = () => {
  return (
    <>
        <NavBar />
        <div className="d-flex align-items-center justify-content-evenly">
            <DataBox heading={"567,879"} text={"Ticket counts by owner"} color={"#70d8c1"} />
            <DataBox heading={"23,665"} text={"Ticket counts by product"} color={"#f5d881"} />
            <DataBox heading={"980,340"} text={"Ticket counts by status"} color={"#ffbd8e"} />
            <DataBox heading={"567,879"} text={"Ticket counts by priority"} color={"#ff984e"} />
        </div>
        <div className="center">
            <h2> In Progressss.....</h2>
        </div>
    </>
    
  )
}
