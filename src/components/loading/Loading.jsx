import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center"> 
      <div className="loading" data-loading-text="Loading..." ><Spinner animation="border" size="lg" style={{color: "#060b26"}}/></div>
    </div>
  );
};

export default Loading;
